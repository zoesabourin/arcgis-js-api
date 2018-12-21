// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/extendsHelper","dojo/Deferred","../../../Graphic","../support/FeatureSet","../support/IdSet","../support/shared","../support/stats","../support/sha","../../../tasks/support/FeatureSet","../../../tasks/operations/query","../../../tasks/QueryTask","../../../tasks/support/Query","../../../tasks/support/StatisticDefinition","../../../layers/graphics/featureConversionUtils","../polyfill/FeatureLayerAndTable"],function(e,t,r,i,a,s,n,l,o,u,c,d,p,y,f,h,_){return function(e){function t(t){var r=e.call(this,t)||this;return r.declaredClass="esri.arcade.featureset.sources.FeatureLayerDynamic",r._removeGeometry=!1,r._overrideFields=null,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._layer=t.layer,r._wset=null,void 0!==t.outFields&&(r._overrideFields=t.outFields),void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return r(t,e),t.prototype._maxQueryRate=function(){return l.defaultMaxRecords},t.prototype.end=function(){return this._layer},t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype.convertQueryToLruCacheKey=function(e){var t=l.stableStringify(e.toJSON());return new u(t,"TEXT").getHash("SHA-1","B64")},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=new i),null!==this._layer&&(!0===this._layer.loaded?!1===this._loadPromise.isFulfilled()&&(this._initialiseFeatureSet(),this._loadPromise.resolve(this)):(this._layer.when(function(){try{e._initialiseFeatureSet(),e._loadPromise.resolve(e)}catch(t){e._loadPromise.reject(t)}},function(t){e._loadPromise.reject(t)}),this._layer.load())),this._loadPromise.promise},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0),1===this._layer.outFields.length&&"*"===this._layer.outFields[0]);else{for(var e=[],t=0,r=this.fields;t<r.length;t++){var i=r[t];if("oid"===i.type)e.push(i);else for(var a=0,s=this._layer.outFields;a<s.length;a++){var n=s[a];if(n.toLowerCase()===i.name.toLowerCase()){e.push(i);break}}}this.fields=e}if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{for(var e=[],o=[],u=0,c=this.fields;u<c.length;u++){var i=c[u];if("oid"===i.type)e.push(i),o.push(i.name);else for(var d=0,p=this._overrideFields;d<p.length;d++){var n=p[d];if(n.toLowerCase()===i.name.toLowerCase()){e.push(i),o.push(i.name);break}}}this.fields=e,this._overrideFields=o}if(this._layer.source&&this._layer.source.layerDefinition)if(!0===this._layer.source.layerDefinition.useStandardizedQueries)this._databaseType=l.FeatureServiceDatabaseType.Standardised;else{var y=this._layer.source.layerDefinition.currentVersion;void 0!==y&&null!==y&&y>=10.5&&(this._databaseType=l.FeatureServiceDatabaseType.Standardised,this._requestStandardised=!0)}this.objectIdField=this._layer.objectIdField,this.hasM=this._layer.supportsM,this.hasZ=this._layer.supportsZ,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(){return l.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e){var t=new i;return t.resolve(e),t.promise},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(){},t.prototype._getSet=function(e){var t=this,r=new i;return null===this._wset?this._ensureLoaded().then(l.callback(function(){t._getFilteredSet("",null,null,null,e).then(l.callback(function(e){t._wset=e,r.resolve(e)},r),l.errback(r))},r),l.errback(r)):r.resolve(this._wset),r.promise},t.prototype._runDatabaseProbe=function(e){var t=this,r=new i;return this._ensureLoaded().then(l.callback(function(){var i=new y;i.where=e.replace("OBJECTID",t._layer.objectIdField),t._layer.queryObjectIds(i).then(l.callback(function(){r.resolve(!0)},r),function(e){try{r.resolve(!1)}catch(e){r.reject(e)}})},r),l.errback(r)),r.promise},t.prototype._canUsePagination=function(){return!(!this._layer.capabilities||!this._layer.capabilities.query||!0!==this._layer.capabilities.query.supportsPagination)},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype.pbfSupportedForQuery=function(e){return!e.outStatistics&&this._layer&&this._layer.capabilities&&this._layer.capabilities.query&&!0===this._layer.capabilities.query.supportsFormatPBF},t.prototype.queryPBF=function(e,t){return e.quantizationParameters={mode:"edit"},d.executeQueryPBF(this._layer.parsedUrl,e,{type:"optimized"}).then(function(e){return c.fromJSON(h.convertToFeatureSet(e.data))})},t.prototype.executeQuery=function(e,t){var r=new p({url:this._layer.parsedUrl.path}),i="execute"===t&&this.pbfSupportedForQuery(e),a=null;if(this.recentlyUsedQueries){var s=this.convertQueryToLruCacheKey(e);a=this.recentlyUsedQueries.getFromCache(s),a&&a.isRejected()&&(a=null,this.recentlyUsedQueries.removeFromCache(s)),null===a&&(a=!0!==i?r[t](e):this.queryPBF(e,r),this.recentlyUsedQueries.addToCache(s,a))}return null===a&&(a=!0!==i?r[t](e):this.queryPBF(e,r)),a},t.prototype._getFilteredSet=function(e,t,r,a,s){var o=this,u=new i;return this.databaseType().then(l.callback(function(i){if(o.isTable()&&t&&null!==e&&""!==e){var c=new n([],[],!0,null);return void u.resolve(c)}if(o._canUsePagination())return void o._getFilteredSetUsingPaging(e,t,r,a,s).then(l.callback(function(e){u.resolve(e)},u),l.errback(u));var d="",p=!1;null!==a&&o._layer.capabilities&&o._layer.capabilities.query&&!0===o._layer.capabilities.query.supportsOrderBy&&(d=a.constructClause(),p=!0);var f=new y;f.where=null===r?null===t?"1=1":"":r.toWhereClause(i),o._requestStandardised&&(f.sqlFormat="standard"),f.spatialRelationship=o._makeRelationshipEnum(e),f.outSpatialReference=o.spatialReference,f.orderByFields=""!==d?d.split(","):null,f.geometry=null===t?null:t,f.relationParameter=o._makeRelationshipParam(e),o.executeQuery(f,"executeForIds").then(l.callback(function(e){null===e&&(e=[]),o._checkCancelled(s);var t=new n([],e,p,null);u.resolve(t)},u),l.errback(u))},u),l.errback(u)),u.promise},t.prototype._expandPagedSet=function(e,t,r,i,a){return this._expandPagedSetFeatureSet(e,t,r,i,a)},t.prototype._getFilteredSetUsingPaging=function(e,t,r,a,s){var o=this,u=new i;try{var c="",d=!1;null!==a&&this._layer.capabilities&&this._layer.capabilities.query&&!0===this._layer.capabilities.query.supportsOrderBy&&(c=a.constructClause(),d=!0),this.databaseType().then(l.callback(function(i){var a=null===r?null===t?"1=1":"":r.toWhereClause(i);o._layer.definitionExpression&&(a=""!==a?"(("+o._layer.definitionExpression+") AND ("+a+"))":o._layer.definitionExpression);var p=o._maxQueryRate();void 0!==o._layer.maxRecordCount&&o._layer.maxRecordCount<p&&(p=o._layer.maxRecordCount);var y=null;if(!0===o._pageJustIds)y=new n([],["GETPAGES"],d,{spatialRel:o._makeRelationshipEnum(e),relationParam:o._makeRelationshipParam(e),outFields:o._layer.objectIdField,resultRecordCount:p,resultOffset:0,geometry:null===t?null:t,where:a,orderByFields:c,returnGeometry:!1,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}});else{var f=!0;!0===o._removeGeometry&&(f=!1);var h=null!==o._overrideFields?o._overrideFields:o._fieldsIncludingObjectId(o._layer.outFields);y=new n([],["GETPAGES"],d,{spatialRel:o._makeRelationshipEnum(e),relationParam:o._makeRelationshipParam(e),outFields:h.join(","),resultRecordCount:p,resultOffset:0,geometry:null===t?null:t,where:a,orderByFields:c,returnGeometry:f,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}})}o._expandPagedSet(y,p,0,1,s).then(l.callback(function(){u.resolve(y)},u),l.errback(u))},u),l.errback(u))}catch(e){u.reject(e)}return u.promise},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,r){var a=this,s=new i;try{var n=e.pagesDefinition.internal.lastRetrieved,o=n,u=new y;this._requestStandardised&&(u.sqlFormat="standard"),u.spatialRelationship=e.pagesDefinition.spatialRel,u.relationParameter=e.pagesDefinition.relationParam,u.outFields=e.pagesDefinition.outFields.split(","),u.num=e.pagesDefinition.resultRecordCount,u.start=e.pagesDefinition.internal.lastRetrieved,u.geometry=e.pagesDefinition.geometry,u.where=e.pagesDefinition.where,u.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,u.returnGeometry=e.pagesDefinition.returnGeometry,u.outSpatialReference=this.spatialReference,this.executeQuery(u,"execute").then(l.callback(function(t){a._checkCancelled(r),e.pagesDefinition.internal.lastRetrieved!==n&&s.resolve("done");for(var i=0;i<t.features.length;i++)e.pagesDefinition.internal.set[o+i]=t.features[i].attributes[a._layer.objectIdField];if(!1===a._pageJustIds)for(var i=0;i<t.features.length;i++)a._featureCache[t.features[i].attributes[a._layer.objectIdField]]=t.features[i];t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=n+e.pagesDefinition.resultRecordCount,s.resolve("done")},s),l.errback(s))}catch(e){s.reject(e)}return s.promise},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,i=0,a=t;i<a.length;i++){if(a[i].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,r,a){var s=this,n=new i,o=[];try{if(-1!==t&&void 0===this._featureCache[t]&&o.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate(),a))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,a).then(l.callback(function(){s._getFeatures(e,t,r,a).then(l.callback(function(e){n.resolve(e)},n),l.errback(n))},n),l.errback(n)),n.promise;for(var u=0,c=e._lastFetchedIndex;c<e._known.length;c++){if(e._lastFetchedIndex+=1,u++,void 0===this._featureCache[e._known[c]]){var d=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var p=this._layer._mode;if(void 0!==p._featureMap[e._known[c]]){var f=p._featureMap[e._known[c]];null!==f&&(d=!0,this._featureCache[e._known[c]]=f)}}if(!1===d&&(e._known[c]!==t&&o.push(e._known[c]),o.length>=this._maxProcessingRate()-1))break}if(u>=r&&0===o.length)break}if(0===o.length)n.resolve("success");else try{var h=new y;this._requestStandardised&&(h.sqlFormat="standard"),h.objectIds=o,h.outFields=null!==this._overrideFields?this._overrideFields:this._fieldsIncludingObjectId(this._layer.outFields),h.returnGeometry=!0,!0===this._removeGeometry&&(h.returnGeometry=!1),h.outSpatialReference=this.spatialReference,this.executeQuery(h,"execute").then(l.callback(function(e){if(s._checkCancelled(a),void 0!==e.error)return void n.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)s._featureCache[e.features[t].attributes[s._layer.objectIdField]]=e.features[t];n.resolve("success")},n),l.errback(n))}catch(e){n.reject(e)}}catch(e){n.reject(e)}return n.promise},t.prototype._getDistinctPages=function(e,t,r,a,s,n,o,u,c){var d=this,p=new i;return this._ensureLoaded().then(l.callback(function(){for(var i=r.parseTree.column,f=0;f<d._layer.fields.length;f++)if(d._layer.fields[f].name.toLowerCase()===i.toLowerCase()){i=d._layer.fields[f].name;break}d.databaseType().then(l.callback(function(f){var h=new y;d._requestStandardised&&(h.sqlFormat="standard");var _=null===n?null===s?"1=1":"":n.toWhereClause(f);d._layer.definitionExpression&&(_=""!==_?"(("+d._layer.definitionExpression+") AND ("+_+"))":d._layer.definitionExpression),h.where=_,h.spatialRelationship=d._makeRelationshipEnum(a),h.relationParameter=d._makeRelationshipParam(a),h.geometry=null===s?null:s,h.returnDistinctValues=!0,h.returnGeometry=!1,h.outFields=[i],d.executeQuery(h,"execute").then(l.callback(function(y){if(d._checkCancelled(c),!y.hasOwnProperty("features"))return void p.reject(new Error("Unnexected Result querying statistics from layer"));for(var f=!1,h=0;h<d._layer.fields.length;h++)if(d._layer.fields[h].name===i){"date"===d._layer.fields[h].type&&(f=!0);break}for(var h=0;h<y.features.length;h++){if(f){var _=y.features[h].attributes[i];null!==_?u.push(new Date(_)):u.push(_)}else u.push(y.features[h].attributes[i]);if(u.length>=o)break}0===y.features.length?p.resolve(u):y.features.length===d._layer.maxRecordCount&&u.length<o?d._getDistinctPages(e+y.features.length,t,r,a,s,n,o,u,c).then(l.callback(function(e){p.resolve({calculated:!0,result:e})},p),l.errback(p)):p.resolve(u)},p),l.errback(p))},p),l.errback(p))},p),l.errback(p)),p.promise},t.prototype._distinctStat=function(e,t,r,i,a,s,n,o){this._getDistinctPages(0,t,r,i,a,s,n,[],o).then(l.callback(function(t){e.resolve({calculated:!0,result:t})},e),l.errback(e))},t.prototype.isTable=function(){return null===this._layer.geometryType||"table"===this._layer.type||""===this._layer.geometryType},t.prototype._countstat=function(e,t,r,i,a,s){var n=this;this.databaseType().then(l.callback(function(t){var s=new y;if(n._requestStandardised&&(s.sqlFormat="standard"),n.isTable()&&i&&null!==r&&""!==r)return void e.resolve({calculated:!0,result:0});var o=null===a?null===i?"1=1":"":a.toWhereClause(t);n._layer.definitionExpression&&(o=""!==o?"(("+n._layer.definitionExpression+") AND ("+o+"))":n._layer.definitionExpression),s.where=o,s.where=o,s.spatialRelationship=n._makeRelationshipEnum(r),s.relationParameter=n._makeRelationshipParam(r),s.geometry=null===i?null:i,s.returnGeometry=!1,n.executeQuery(s,"executeForCount").then(l.callback(function(t){e.resolve({calculated:!0,result:t})},e),l.errback(e))},e),l.errback(e))},t.prototype._stats=function(e,t,r,i,a,s,n,u){var c=this;this._ensureLoaded().then(l.callback(function(){var d=c._layer.capabilities&&c._layer.capabilities.query&&!0===c._layer.capabilities.query.supportsSqlExpression,p=c._layer.capabilities&&c._layer.capabilities.query&&!0===c._layer.capabilities.query.supportsStatistics,h=c._layer.capabilities&&c._layer.capabilities.query&&!0===c._layer.capabilities.query.supportsDistinct;"count"===t?h?c._countstat(e,t,i,a,s,u):e.resolve({calculated:!1}):!1===p||!1===r.isSingleField()&&!1===d||!1===r.isStandardized()?""!==i||null!==s?e.resolve({calculated:!1}):c._manualStat(t,r,n,u).then(l.callback(function(t){e.resolve(t)},e),l.errback(e)):"distinct"===t?!1===h?""!==i||null!==s?e.resolve({calculated:!1}):c._manualStat(t,r,n,u).then(l.callback(function(t){e.resolve(t)},e),l.errback(e)):c._distinctStat(e,t,r,i,a,s,n,u):c.databaseType().then(l.callback(function(n){if(c.isTable()&&a&&null!==i&&""!==i)return void e.resolve({calculated:!0,result:null});var u=new y;c._requestStandardised&&(u.sqlFormat="standard");var d=null===s?null===a?"1=1":"":s.toWhereClause(n);c._layer.definitionExpression&&(d=""!==d?"(("+c._layer.definitionExpression+") AND ("+d+"))":c._layer.definitionExpression),u.where=d,u.spatialRelationship=c._makeRelationshipEnum(i),u.relationParameter=c._makeRelationshipParam(i),u.geometry=null===a?null:a;var p=new f;p.statisticType=o.decodeStatType(t),p.onStatisticField=r.toWhereClause(n),p.outStatisticFieldName="FORMULA_STAT_RESULT",u.returnGeometry=!1,u.outStatistics=[p],c.executeQuery(u,"execute").then(l.callback(function(t){if(!t.hasOwnProperty("features")||0===t.features.length)return void e.reject(new Error("Unnexected Result querying statistics from layer"));for(var r=!1,i=0;i<t.fields.length;i++)if("FORMULA_STAT_RESULT"===t.fields[i].name.toUpperCase()){"esriFieldTypeDate"===t.fields[i].type&&(r=!0);break}if(r){var a=t.features[0].attributes.FORMULA_STAT_RESULT;null!==a&&(a=new Date(t.features[0].attributes.FORMULA_STAT_RESULT)),e.resolve({calculated:!0,result:a})}else e.resolve({calculated:!0,result:t.features[0].attributes.FORMULA_STAT_RESULT})},e),l.errback(e))},e),l.errback(e))},e),l.errback(e))},t.prototype._stat=function(e,t,r,a,s,n,l){var o=new i;try{this._stats(o,e,t,r,a,s,n,l)}catch(e){o.reject(e)}return o.promise},t.prototype._canDoAggregates=function(e,t,r,a,s){var n=this,o=new i;return this._ensureLoaded().then(l.callback(function(){var e=!1,r=n._layer.capabilities&&n._layer.capabilities.query&&!0===n._layer.capabilities.query.supportsSqlExpression;if(void 0!==n._layer.capabilities&&null!==n._layer.capabilities.query&&!0===n._layer.capabilities.query.supportsStatistics&&!0===n._layer.capabilities.query.supportsOrderBy&&(e=!0),e)for(var i=0;i<t.length-1;i++)null!==t[i].workingexpr&&(!1===t[i].workingexpr.isStandardized()?e=!1:!1===t[i].workingexpr.isSingleField()&&!1===r&&(e=!1));!1===e?o.resolve(!1):o.resolve(!0)},o),l.errback(o)),o.promise},t.prototype._makeRelationshipEnum=function(e){if(e.indexOf("esriSpatialRelRelation")>=0)return"relation";switch(e){case"esriSpatialRelRelation":return"relation";case"esriSpatialRelIntersects":return"intersects";case"esriSpatialRelContains":return"contains";case"esriSpatialRelOverlaps":return"overlaps";case"esriSpatialRelWithin":return"within";case"esriSpatialRelTouches":return"touches";case"esriSpatialRelCrosses":return"crosses";case"esriSpatialRelEnvelopeIntersects":return"envelope-intersects"}return e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,a,s,o,u){var c=this,d=new i;return this._ensureLoaded().then(l.callback(function(){c.databaseType().then(l.callback(function(i){var l="",p=!1,y=!1;null!==o&&c._layer.capabilities&&c._layer.capabilities.query&&!0===c._layer.capabilities.query.supportsOrderBy&&(l=o.constructClause(),y=!0),c._layer.capabilities&&c._layer.capabilities.query&&!1===c._layer.capabilities.query.supportsPagination&&(y=!1,p=!0,l=c._layer.objectIdField);for(var h=[],_=0;_<t.length;_++){var g=new f;g.onStatisticField=null!==t[_].workingexpr?t[_].workingexpr.toWhereClause(i):"",g.outStatisticFieldName=t[_].field,g.statisticType=t[_].toStatisticsName(),h.push(g)}""===l&&(l=e.join(","));var v=c._maxQueryRate();void 0!==c._layer.maxRecordCount&&c._layer.maxRecordCount<v&&(v=c._layer.maxRecordCount);var m=null===s?null===a?"1=1":"":s.toWhereClause(i);c._layer.definitionExpression&&(m=""!==m?"(("+c._layer.definitionExpression+") AND ("+m+"))":c._layer.definitionExpression);var b=new n([],["GETPAGES"],y,{groupbypage:!0,spatialRel:c._makeRelationshipEnum(r),relationParam:c._makeRelationshipParam(r),outFields:["*"],useOIDpagination:p,generatedOid:u,resultRecordCount:v,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:h,geometry:null===a?null:a,where:m,orderByFields:l,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,fullyResolved:!1}});d.resolve(b)},d),l.errback(d))},d),l.errback(d)),d.promise},t.prototype._getAgregagtePhysicalPage=function(e,t,r){var s=this,n=new i;try{var o=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(o=""!==o?"("+o+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var u=e.pagesDefinition.internal.lastRetrieved,c=u,d=new y;if(this._requestStandardised&&(d.sqlFormat="standard"),d.where=o,d.spatialRelationship=e.pagesDefinition.spatialRel,d.relationParameter=e.pagesDefinition.relationParam,d.outFields=e.pagesDefinition.outFields,d.outStatistics=e.pagesDefinition.outStatistics,d.geometry=e.pagesDefinition.geometry,d.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,d.num=e.pagesDefinition.resultRecordCount,d.start=e.pagesDefinition.internal.lastRetrieved,d.returnGeometry=e.pagesDefinition.returnGeometry,d.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&d.geometry&&d.spatialRelationship)return n.resolve([]),n.promise;this.executeQuery(d,"execute").then(l.callback(function(t){if(s._checkCancelled(r),!t.hasOwnProperty("features"))return void n.reject(new Error("Unnexected Result querying aggregates from layer"));var i=[];if(e.pagesDefinition.internal.lastRetrieved!==u)return void n.resolve([]);for(var l=0;l<t.features.length;l++)e.pagesDefinition.internal.set[c+l]=t.features[l].attributes[e.pagesDefinition.generatedOid];for(var l=0;l<t.features.length;l++)i.push(new a({attributes:t.features[l].attributes,geometry:null}));!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=u+e.pagesDefinition.resultRecordCount,n.resolve(i)},n),l.errback(n))}catch(e){n.reject(e)}return n.promise},t.create=function(e,r,i,a,s){var n={url:e,outFields:null===r?["*"]:r};return null!==i&&""!==i&&(n.token=i),new t({layer:new _(n),spatialReference:a,lrucache:s})},t.prototype.canBeBigDataFeatureSet=function(){return!0},t.prototype.shouldBeResolvedAsBigData=function(){return!1},t.prototype.expressAsArcadeScriptImpl=function(e,t,r){var i=this.arcadeAssignNextGlobalIdentifier(r);return t[i]={name:i,type:"FeatureLayer",params:{url:this._layer.parsedUrl.path,token:this._layer.token,definitionExpression:this._layer.definitionExpression,fields:this._layer.outFields}},r.featuresetsyms.push(i),""},t}(s)});