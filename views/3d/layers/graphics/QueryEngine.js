// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../geometry","../../../../core/Accessor","../../../../core/maybe","../../../../core/accessorSupport/decorators","../../../../geometry/Extent","../../../../layers/graphics/data/QueryEngine","../../../../tasks/support/FeatureSet","../../../../tasks/support/Query"],function(e,t,r,n,o,i,u,a,s,y,c,p,l,d){Object.defineProperty(t,"__esModule",{value:!0});var f=p.default,h=function(e){function t(t){var r=e.call(this,t)||this;return r._dataQueryEngineInstance=null,r}return n(t,e),Object.defineProperty(t.prototype,"queryGeometryType",{get:function(){switch(this.layer.geometryType){case"multipoint":case"point":case"polygon":case"polyline":return this.layer.geometryType;case"mesh":return"polygon";default:return}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"defaultQueryJSON",{get:function(){return new d({outSpatialReference:this.spatialReference}).toJSON()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataQueryEngine",{get:function(){return this.ensureDataQueryEngine()},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.clear()},t.prototype.clear=function(){return!!this._dataQueryEngineInstance&&(this._dataQueryEngineInstance.destroy(),this._dataQueryEngineInstance=null,!0)},t.prototype.executeQueryForIdSet=function(e,t){return i(this,void 0,void 0,function(){return o(this,function(r){return[2,this.dataQueryEngine.executeQueryForIdSet(this._ensureQueryJSON(e),t)]})})},t.prototype.executeQueryForCount=function(e,t){return i(this,void 0,void 0,function(){return o(this,function(r){return[2,this.dataQueryEngine.executeQueryForCount(this._ensureQueryJSON(e),t)]})})},t.prototype.executeQueryForExtent=function(e,t){return i(this,void 0,void 0,function(){var r,n,i,u;return o(this,function(o){switch(o.label){case 0:return[4,this.dataQueryEngine.executeQueryForExtent(this._ensureQueryJSON(e),t)];case 1:return r=o.sent(),n=r.count,i=r.extent,u=c.fromJSON(i),[2,{count:n,extent:u}]}})})},t.prototype.executeQueryForIds=function(e,t){return i(this,void 0,void 0,function(){return o(this,function(r){return[2,this.dataQueryEngine.executeQueryForIds(this._ensureQueryJSON(e),t)]})})},t.prototype.executeQuery=function(e,t){return i(this,void 0,void 0,function(){var r,n,i=this;return o(this,function(o){switch(o.label){case 0:return[4,this.dataQueryEngine.executeQuery(this._ensureQueryJSON(e),t)];case 1:return r=o.sent(),n=l.fromJSON(r),n.features.forEach(function(e){e.layer=i.layer,e.sourceLayer=i.layer}),[2,n]}})})},t.prototype._ensureQueryJSON=function(e){return s.isNone(e)?this.defaultQueryJSON:("outSpatialReference"in e&&!e.outSpatialReference&&(e.outSpatialReference=this.spatialReference),e.toJSON())},t.prototype.ensureDataQueryEngine=function(){if(this._dataQueryEngineInstance)return this._dataQueryEngineInstance;var e="timeInfo"in this.layer&&this.layer.timeInfo&&this.layer.timeInfo.toJSON()||null,t=this.layer.objectIdField,r=u.featureGeometryTypeKebabDictionary.toJSON(this.queryGeometryType),n=this.layer.fields.map(function(e){return e.toJSON()}),o=this.layerView.view.resourceController.scheduler,i=this.task,a=this.spatialReference.toJSON(),s=this.layerView.graphics3d.graphicsCore.featureStore,y=this.layerView,c=y.hasZ,p=y.hasM;return this._dataQueryEngineInstance=new f({hasZ:c,hasM:p,geometryType:r,fields:n,timeInfo:e,spatialReference:a,objectIdField:t,featureStore:s,scheduler:o,task:i}),this._dataQueryEngineInstance},r([y.property({constructOnly:!0})],t.prototype,"layerView",void 0),r([y.property({constructOnly:!0})],t.prototype,"task",void 0),r([y.property({readOnly:!0,aliasOf:"layerView.view.spatialReference"})],t.prototype,"spatialReference",void 0),r([y.property({readOnly:!0,aliasOf:"layerView.layer"})],t.prototype,"layer",void 0),r([y.property({readOnly:!0,dependsOn:["layer.geometryType"]})],t.prototype,"queryGeometryType",null),r([y.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"defaultQueryJSON",null),t=r([y.subclass("esri.views.3d.layers.graphics.QueryEngine")],t)}(y.declared(a));t.QueryEngine=h,t.default=h});