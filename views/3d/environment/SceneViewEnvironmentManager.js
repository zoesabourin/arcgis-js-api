// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.2/esri/copyright.txt for details.

define(["../../../core/declare","../../../core/Accessor","../../../core/Evented","../../../core/promiseUtils","../../../core/watchUtils","../../../core/HandleRegistry","../../../geometry/Point","../../../geometry/support/webMercatorUtils","../../../geometry/SpatialReference","../support/sunUtils","../support/earthUtils","./EnvironmentRenderer"],function(e,i,t,n,r,s,o,a,c,d,h,f){var u=new Date,l={hours:0,minutes:0,seconds:0},_=[.5773502691896258,-.5773502691896258,.5773502691896258],p=e([i,t],{declaredClass:"esri.views.3d.environment.SceneViewEnvironmentManager",referencePointUpdateDelay:200,referencePointUpdateInterval:3e3,referencePointUpdateDistThreshold:1e6,properties:{updating:{dependsOn:["noReferencePositionQueries"],readOnly:!0,get:function(){return!(this.noReferencePositionQueries||!this._referencePosUpdateQuery&&!this._referencePosMapCoordsRequested)}},noReferencePositionQueries:{},view:{},_environmentRenderer:{}},constructor:function(){this._viewHandles=new s,this._environmentRenderer=null,this._preserveAbsoluteDateTime=!1,this._trackingEnabled=!1,this._viewConnected=!1,this._referencePosResetPreserveAbsoluteTime=null,this._resetReferencePosition()},destroy:function(){this._viewHandles.destroy(),this.disposeRendering()},disposeRendering:function(){this._environmentRenderer&&(this._environmentRenderer.destroy(),this._environmentRenderer=null),this._resetReferencePosition(!0)},updateReadyChange:function(e){e&&!this._viewConnected?(this._viewConnected=!0,this.connectView(this.view)):!e&&this._viewConnected&&(this._viewConnected=!1,this.disconnectView(this.view))},connectView:function(e){this._environmentRenderer=new f({view:e}),this._viewHandles.add([r.on(this.view,"environment.lighting","date-will-change",this._lightingDateHandler.bind(this)),this.view.watch("interacting,stationary",this._interactingStationaryHandler.bind(this)),this.view.watch("environment.lighting.directShadowsEnabled,environment.lighting.ambientOcclusionEnabled",this._updateRenderParamsHandler.bind(this)),this.view.watch("spatialReference",this._spatialReferenceHandler.bind(this)),r.init(this.view,"viewingMode",this._viewingModeHandler.bind(this)),r.init(this.view,"environment.lighting.cameraTrackingEnabled",this._updateCameraTracking.bind(this),!0),this.watch("noReferencePositionQueries",this._cameraHandler.bind(this,null))]),this._updateRenderParamsHandler(),this._updateLightParams(),this._cameraHandler()},_updateCameraTracking:function(e){if(this._trackingEnabled=e,e){var i=r.on(this,"view.navigation","currentViewChanged",this._cameraHandler.bind(this,null),this._cameraHandler.bind(this,null),null,!0);this._viewHandles.add(i,"camera")}else{var t=this.get("view.environment.lighting");t&&(t.positionTimezoneInfo.autoUpdated=!1),this._viewHandles.remove("camera")}},disconnectView:function(e){this.disposeRendering(),this._viewHandles.removeAll()},_lightingDateHandler:function(e){var i=e.date;if(i){var t=this.view.environment.lighting;if(!t.positionTimezoneInfo.autoUpdated){this._preserveAbsoluteDateTime=!0;var n=this.view.spatialReference;if(!n.isWGS84&&!n.isWebMercator){var r=this.view.camera.position;if(!this._referencePosMapCoords||!this._referencePosMapCoords.equals(r))return void this._requestReferencePositionUpdate(r)}if(this._preupdateTracking(i),this._referencePosWGS84){var s=h.positionToTimezone(this._referencePosWGS84,l);t.autoUpdate(null,s),this._trackingEnabled&&(t.positionTimezoneInfo.autoUpdated=!0)}}this._updateLightParams(i)}},_preupdateTracking:function(e){!this._trackingEnabled&&this.get("view.environment.lighting.cameraTrackingEnabled")&&this._cameraHandler(e)},_cameraHandler:function(e){var i=this.view.camera;if(i){var t=this.view.spatialReference;t.isWGS84||t.isWebMercator?this._cameraHandlerGlobal(i,e):this._cameraHandlerLocal(i,e)}},_cameraHandlerGlobal:function(e,i){var t=e.position;this._referencePosWGS84||(this._referencePosWGS84=new o({spatialReference:c.WGS84})),t.spatialReference.isWebMercator?a.webMercatorToGeographic(t,!1,this._referencePosWGS84):(this._referencePosWGS84.x=t.x,this._referencePosWGS84.y=t.y),this._referencePosWGS84.z=t.z,this._autoUpdateTimezone(t,i)||this._updateLightParams(i)},_cameraHandlerLocal:function(e,i){var t=e.position;(!this._referencePosMapCoords||this._referencePosMapCoordsRequested||this._exceedsReferencePosDistThreshold(t))&&this._requestReferencePositionUpdate(t,!0),this.view.mapCoordsHelper&&this._referencePosWGS84&&(this._referencePosWGS84.z=t.z*this.view.mapCoordsHelper.unitInMeters,this._referencePosChanged())},_interactingStationaryHandler:function(){!this.view.interacting&&this.view.stationary&&this._executePendingReferencePositionUpdate()},_updateLightParams:function(e){var i=this.view.environment.lighting;e=e||i.date;var t,n=this.view._stage;this._referencePosWGS84?(t=d.computeColorAndIntensity(e,this._referencePosWGS84),d.computeDirection(e,this._referencePosWGS84,this.view.viewingMode,t.diffuse.direction)):t={diffuse:{color:[1,1,1],intensity:.5,direction:_},ambient:{color:[1,1,1],intensity:.5}},n.setDirectionalLight(t.diffuse),n.setAmbientLight(t.ambient),this._updateRenderParamsHandler()},_autoUpdateTimezone:function(e,i){if(!this.view.get("environment.lighting.cameraTrackingEnabled"))return!1;var t=u;t.setTime((i||this.view.environment.lighting.date).getTime());var n=h.positionToTimezone(e,l),r=this.view.environment.lighting.positionTimezoneInfo;if(r.autoUpdated){if(r.hours===n.hours&&r.minutes===n.minutes&&r.seconds===n.seconds)return!1}else r=n;var s=t.getUTCHours()-(n.hours-r.hours),o=t.getUTCMinutes()-(n.minutes-r.minutes),a=t.getUTCSeconds()-(n.seconds-r.seconds);return t.setUTCHours(s),t.setUTCMinutes(o),t.setUTCSeconds(a),i?!1:this.view.environment.lighting.autoUpdate(t,n)},_updateRenderParamsHandler:function(){var e=this.view._stage,i=!0;this._referencePosWGS84&&(i=d.computeShadowsEnabled(this._referencePosWGS84,this.view.viewingMode)),e&&e.setRenderParams({shadowMap:this.view.environment.lighting.directShadowsEnabled&&i,ssao:this.view.environment.lighting.ambientOcclusionEnabled})},_spatialReferenceHandler:function(){this._resetReferencePosition()},_viewingModeHandler:function(e){this._resetReferencePosition()},_resetReferencePosition:function(e){this._cancelReferencePosUpdates(),this._referencePosMapCoords=null,this._referencePosMapCoordsRequested=null,this._referencePosResetPreserveAbsoluteTime=null,this._referencePosWGS84=null,e||this.notifyChange("updating")},_requestReferencePositionUpdate:function(e,i){if(this.view.mapCoordsHelper.canProject()&&!this.noReferencePositionQueries&&(this._referencePosMapCoordsRequested?this._referencePosMapCoordsRequested.copy(e):this._referencePosMapCoordsRequested=e.clone(),this._referencePosResetPreserveAbsoluteTime=!!i,!this._referencePosUpdateQuery&&!this._referencePosUpdateTimer&&!this.view.interacting&&this.view.stationary)){var t=this,r=this._referencePosUpdateQuery=n.after(this.referencePointUpdateDelay).then(function(){if(t._referencePosUpdateQuery===r){var e=function(){return t._referencePosUpdateQuery!==r};return t._doReferencePositionUpdateQuery(e)}}).always(function(){t._referencePosUpdateQuery===r&&(t._referencePosUpdateQuery=null,t._referencePosUpdateTimer||t._executePendingReferencePositionUpdate(),t.notifyChange("updating"))}),s=this._referencePosUpdateTimer=n.after(this.referencePointUpdateInterval).then(function(){t._referencePosUpdateTimer===s&&(t._referencePosUpdateTimer=null,t._referencePosUpdateQuery||t._executePendingReferencePositionUpdate())});this.notifyChange("updating")}},_doReferencePositionUpdateQuery:function(e){return this._referencePosResetPreserveAbsoluteTime&&(this._preserveAbsoluteDateTime=!1),this._referencePosMapCoords?this._referencePosMapCoords.copy(this._referencePosMapCoordsRequested):this._referencePosMapCoords=this._referencePosMapCoordsRequested.clone(),this._referencePosResetPreserveAbsoluteTime=null,this._referencePosMapCoordsRequested=null,this.view.mapCoordsHelper.toGeographic(this._referencePosMapCoords).then(function(i){if(!e()&&!isNaN(i[0])&&!isNaN(i[1])){var t=this._referencePosMapCoords.z*this.view.mapCoordsHelper.unitInMeters;this._referencePosWGS84?(this._referencePosWGS84.x=i[0],this._referencePosWGS84.y=i[1],this._referencePosWGS84.z=t):this._referencePosWGS84=new o({x:i[0],y:i[1],z:t,spatialReference:c.WGS84}),this._referencePosChanged()}}.bind(this))},_executePendingReferencePositionUpdate:function(){var e=this._referencePosMapCoordsRequested;e&&this._requestReferencePositionUpdate(e,this._referencePosResetPreserveAbsoluteTime)},_referencePosChanged:function(){this._preserveAbsoluteDateTime?this._updateLightParams():this._autoUpdateTimezone(this._referencePosWGS84)||this._updateLightParams()},_exceedsReferencePosDistThreshold:function(e){if(this._referencePosMapCoords){var i=this._referencePosMapCoords.distance(e);return this.view.mapCoordsHelper&&(i*=this.view.mapCoordsHelper.unitInMeters),i>this.referencePointUpdateDistThreshold}return!0},_cancelReferencePosUpdates:function(){this._referencePosUpdateQuery=null,this._referencePosUpdateTimer=null}});return p.FIXED_LIGHT_DIRECTION=_,p});