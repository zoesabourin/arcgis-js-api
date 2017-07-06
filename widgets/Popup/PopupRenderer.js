// COPYRIGHT © 2017 Esri
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
// See http://js.arcgis.com/4.4/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","../support/widget","../Widget","./PopupRendererViewModel","../../core/requireUtils","dojo/i18n!./nls/PopupRenderer"],function(e,t,r,i,n,a,o,s,d,c){function p(e){return e&&e.isInstanceOf&&e.isInstanceOf(o)}function l(e){return e&&"function"==typeof e.postMixInProperties&&"function"==typeof e.buildRendering&&"function"==typeof e.postCreate&&"function"==typeof e.startup}function m(e,t){return void 0===t?_+"__"+e:_+"__"+e+"-"+t}var u={iconText:"esri-icon-font-fallback-text",iconLoading:"esri-icon-loading-indicator esri-rotating",iconDownload:"esri-icon-download",iconLeftTriangleArrow:"esri-icon-left-triangle-arrow",iconRightTriangleArrow:"esri-icon-right-triangle-arrow",iconMedia:"esri-icon-media",iconChart:"esri-icon-chart",base:"esri-popup-renderer",container:"esri-popup-renderer__size-container",main:"esri-popup-renderer__main-container",btn:"esri-popup-renderer__button",icon:"esri-popup-renderer__icon",content:"esri-popup-renderer__content",contentElement:"esri-popup-renderer__content-element",text:"esri-popup-renderer__text",showMediaPagination:"esri-popup-renderer--media-pagination-visible",attachments:"esri-popup-renderer__attachments",attachmentsTitle:"esri-popup-renderer__attachments-title",attachmentsItems:"esri-popup-renderer__attachments-items",attachmentsItem:"esri-popup-renderer__attachments-item",attachmentsItemLink:"esri-popup-renderer__attachments-item-link",attachmentsItemTitle:"esri-popup-renderer__attachments-item-title",attachmentsItemIcon:"esri-popup-renderer__attachments-item-icon",fields:"esri-popup-renderer__fields",fieldHeader:"esri-popup-renderer__field-header",fieldData:"esri-popup-renderer__field-data",fieldDataDate:"esri-popup-renderer__field-data--date",media:"esri-popup-renderer__media",mediaContainer:"esri-popup-renderer__media-container",mediaItemContainer:"esri-popup-renderer__media-item-container",mediaItem:"esri-popup-renderer__media-item",mediaItemTitle:"esri-popup-renderer__media-item-title",mediaItemCaption:"esri-popup-renderer__media-item-caption",mediaPrevious:"esri-popup-renderer__media-previous",mediaPreviousIconLTR:"esri-popup-renderer__media-previous-icon",mediaPreviousIconRTL:"esri-popup-renderer__media-previous-icon--rtl",mediaNext:"esri-popup-renderer__media-next",mediaNextIconLTR:"esri-popup-renderer__media-next-icon",mediaNextIconRTL:"esri-popup-renderer__media-next-icon--rtl",mediaSummary:"esri-popup-renderer__media-summary",mediaCount:"esri-popup-renderer__media-count",mediaImageSummary:"esri-popup-renderer__media-image-summary",mediaImageIcon:"esri-popup-renderer__media-image-icon",mediaChart:"esri-popup-renderer__media-chart",mediaChartSummary:"esri-popup-renderer__media-chart-summary",mediaChartIcon:"esri-popup-renderer__media-chart-icon",loadingSpinnerContainer:"esri-popup-renderer__loading-container",spinner:"esri-popup-renderer__loading-spinner"},h=/^\s*(https?:\/\/[^\s]+)\s*$/i,_="esri-popup-renderer",f=function(t){function i(e){var r=t.call(this)||this;return r._chartMap=new Map,r._activeMediaMap=new Map,r._chartRequirePromise=null,r._chartResizeTimer=null,r.graphic=null,r.title=null,r.viewModel=new s,r}return r(i,t),i.prototype.destroy=function(){clearTimeout(this._chartResizeTimer),this._chartResizeTimer=null,this._activeMediaMap.clear(),this._activeMediaMap=null,this._cancelChartModules(),this._destroyCharts()},i.prototype.resize=function(){this._resizeCharts(),this.emit("resize")},i.prototype.render=function(){var e=a.tsx("div",{key:m("loading-container"),"class":u.loadingSpinnerContainer},a.tsx("span",{"class":a.join(u.iconLoading,u.spinner)})),t=this.viewModel.waitingForContent?e:this._renderContent();return a.tsx("div",{"class":u.base},a.tsx("div",{"class":u.container},a.tsx("div",{"class":u.main},t)))},i.prototype.goToMedia=function(e,t){this._activeMediaMap.set(e,t),this.scheduleRender()},i.prototype.nextMedia=function(e){this._pageContentElementMedia(e,"next")},i.prototype.previousMedia=function(e){this._pageContentElementMedia(e,"previous")},i.prototype._cancelChartModules=function(){this._chartRequirePromise&&this._chartRequirePromise.cancel()},i.prototype._destroyChart=function(e){var t=this._chartMap.get(e);t&&(t.chart.destroy(),t.tooltip.destroy()),this._chartMap["delete"](e)},i.prototype._destroyCharts=function(){this._chartMap.forEach(function(e){e.chart.destroy(),e.tooltip.destroy()}),this._chartMap.clear()},i.prototype._resizeCharts=function(){this._chartMap.forEach(function(e){var t=e.chart,r=t.node;r&&r.offsetWidth&&r.offsetHeight&&t.resize()})},i.prototype._renderContent=function(){this._destroyCharts();var e=this.viewModel.content,t="content";if("string"==typeof e){var r=document.createElement("div");return r.innerHTML=e,a.tsx("div",{key:m(t),bind:r,afterCreate:this._attachToNode})}return p(e)?a.tsx("div",{key:m(t)},e.render()):e instanceof HTMLElement?a.tsx("div",{key:m(t),bind:e,afterCreate:this._attachToNode}):l(e)?a.tsx("div",{key:m(t),bind:e.domNode,afterCreate:this._attachToNode}):Array.isArray(e)?e.length?a.tsx("div",{key:m(t)},e.map(this._renderContentElement,this)):null:void 0},i.prototype._renderContentElement=function(e,t){var r=e.type,i=this.viewModel.contentTypes;switch(r){case i.attachments:return this._renderAttachments(e,t);case i.fields:return this._renderFields(e,t);case i.media:return this._renderMedia(e,t);case i.text:return this._renderText(e,t);default:return null}},i.prototype._renderAttachmentInfo=function(e,t){return a.tsx("li",{"class":u.attachmentsItem,key:m("attachment",t)},a.tsx("a",{"class":u.attachmentsItemLink,href:e.url,target:"_blank"},a.tsx("span",{"class":a.join(u.iconDownload,u.attachmentsItemIcon)}),a.tsx("span",{"class":u.attachmentsItemTitle},e.name||c.noTitle)))},i.prototype._renderAttachments=function(e,t){var r=e.attachmentInfos,i=r&&r.length;return i?a.tsx("div",{key:m("attachments-element"),"class":a.join(u.attachments,u.contentElement)},a.tsx("div",{"class":u.attachmentsTitle},c.attach),a.tsx("ul",{"class":u.attachmentsItems},r.map(this._renderAttachmentInfo))):null},i.prototype._renderFieldInfo=function(e,t){var r=this.viewModel,i=r.formattedAttributes.content[t]||r.formattedAttributes.global,n=e.fieldName,o=e.label||n,s=null==i[n]?"":i[n],d=!(!e.format||!e.format.dateFormat),p=s&&"string"==typeof s,l='<a target="_blank" href="$1" title="'+o+'">'+c.view+"</a>",_=p?s.replace(h,l):s,f=(v={},v[u.fieldDataDate]=d,v);return a.tsx("tr",{key:m("fields-element-info-row",t)},a.tsx("th",{key:m("fields-element-info-row-header",t),"class":u.fieldHeader},o),a.tsx("td",{key:m("fields-element-info-row-data",t),"class":u.fieldData,classes:f,innerHTML:_}));var v},i.prototype._renderFields=function(e,t){var r=this,i=e.fieldInfos;return i?a.tsx("div",{key:m("fields-element",t),"class":a.join(u.fields,u.contentElement)},a.tsx("table",{summary:c.fieldsSummary,key:m("fields-element-table",t)},a.tsx("tbody",{key:m("fields-element-table-body",t)},i.map(function(e){return r._renderFieldInfo(e,t)})))):null},i.prototype._shouldOpenInNewTab=function(e){void 0===e&&(e="");var t=/^(?:mailto:|tel:)/;return!t.test(e.trim().toLowerCase())},i.prototype._renderMediaInfoType=function(e,t){var r=e.value,i=e.title,n=void 0===i?"":i,o=e.type,s=r.sourceURL,d=r.linkURL,c=!this._shouldOpenInNewTab(d),p=c?"_blank":"_self";if("image"===o){var l=a.tsx("img",{alt:n,src:s}),h=d?a.tsx("a",{title:n,href:d,target:p},l):null;return h?h:l}return-1!==o.indexOf("chart")?a.tsx("div",{key:m("chart",t),bind:this,"data-media-info":e,"data-content-element-index":t,"class":u.mediaChart,afterCreate:this._getChartDependencies,afterUpdate:this._getChartDependencies}):void 0},i.prototype._getChartDependencies=function(t){var r=this,i=t["data-media-info"],n=t["data-content-element-index"],a=i.value,o=a.theme||"Claro",s=i.type,c=["dojox/charting/Chart2D","dojox/charting/action2d/Tooltip"],p=o;"string"==typeof o&&(p=o.replace(/\./g,"/"),-1===p.indexOf("/")&&(p="dojox/charting/themes/"+p)),c.push(p),this._cancelChartModules(),this._chartRequirePromise=d.when(e,c).then(function(e){var i=e[0],o=e[1],d=e[2];r._renderChart(t,n,s,a,i,o,d),clearTimeout(r._chartResizeTimer),r._chartResizeTimer=setTimeout(function(){return r.resize()},0),r._chartRequirePromise=null})},i.prototype._renderChart=function(e,t,r,i,n,a,o){var s=new n(e,{margins:{l:4,t:4,r:4,b:4}});switch(o&&s.setTheme(o),r){case"pie-chart":s.addPlot("default",{type:"Pie",labels:!1}),s.addSeries("Series A",i.fields);break;case"line-chart":s.addPlot("default",{type:"Markers"}),s.addAxis("x",{min:0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),s.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),i.fields.forEach(function(e,t){e.x=t+1}),s.addSeries("Series A",i.fields);break;case"column-chart":s.addPlot("default",{type:"Columns",gap:3}),s.addAxis("y",{includeZero:!0,vertical:!0,fixUpper:"minor"}),s.addSeries("Series A",i.fields);break;case"bar-chart":s.addPlot("default",{type:"Bars",gap:3}),s.addAxis("x",{includeZero:!0,fixUpper:"minor",minorLabels:!1}),s.addAxis("y",{vertical:!0,majorTicks:!1,minorTicks:!1,majorLabels:!1,minorLabels:!1}),s.addSeries("Series A",i.fields)}var d=new a(s);s.render(),this._chartMap.set(t,{chart:s,tooltip:d})},i.prototype._renderMediaInfo=function(e,t){this._destroyChart(t);var r=this._renderMediaInfoType(e,t),i=e.title?a.tsx("div",{key:m("media-title",t),"class":u.mediaItemTitle,innerHTML:e.title}):null,n=e.caption?a.tsx("div",{key:m("media-caption",t),"class":u.mediaItemCaption,innerHTML:e.caption}):null;return a.tsx("div",{key:m("media-container",t),"class":u.mediaItemContainer,bind:this,afterCreate:this.resize,afterUpdate:this.resize},a.tsx("div",{key:m("media-itme-container",t),"class":u.mediaItem},r),i,n)},i.prototype._renderMediaStatsItem=function(e,t,r){var i="chart"===r?a.join(u.mediaChartIcon,u.iconChart):a.join(u.mediaImageIcon,u.iconMedia);return a.tsx("li",{"class":u.mediaImageSummary},a.tsx("span",{"class":u.mediaCount,"aria-label":e},"("+t+")"),a.tsx("span",{"aria-hidden":"true","class":i}))},i.prototype._renderMediaPageButton=function(e,t){var r="previous"===e,i=r?c.previous:c.next,n=r?a.join(u.btn,u.mediaPrevious):a.join(u.btn,u.mediaNext),o=r?a.join(u.icon,u.mediaPreviousIconLTR,u.iconLeftTriangleArrow):a.join(u.icon,u.mediaNextIconLTR,u.iconRightTriangleArrow),s=r?a.join(u.icon,u.mediaPreviousIconRTL,u.iconRightTriangleArrow):a.join(u.icon,u.mediaNextIconRTL,u.iconLeftTriangleArrow),d=r?"previous":"next",p=r?this._previousClick:this._nextClick;return a.tsx("div",{key:m(d,t),title:i,tabIndex:0,role:"button","class":n,"data-content-element-index":t,bind:this,onclick:p},a.tsx("span",{"aria-hidden":"true","class":o}),a.tsx("span",{"aria-hidden":"true","class":s}),a.tsx("span",{"class":u.iconText},i))},i.prototype._renderMedia=function(e,t){var r=e.mediaInfos,i=this._getMediaStats(r),n=i.total,o=(_={},_[u.showMediaPagination]=i.total>1,_),s=this._renderMediaStatsItem(c.numImages,i.images,"image"),d=this._renderMediaStatsItem(c.numCharts,i.charts,"chart"),p=this._renderMediaPageButton("previous",t),l=this._renderMediaPageButton("next",t),h=this._activeMediaMap.get(t);return isNaN(h)&&(this._activeMediaMap.set(t,0),h=0),n?a.tsx("div",{key:m("media-element",t),"class":a.join(u.media,u.contentElement),classes:o},a.tsx("ul",{"class":u.mediaSummary},s,d),a.tsx("div",{key:m("media-element-container",t),"class":u.mediaContainer},p,this._renderMediaInfo(r[h],t),l)):null;var _},i.prototype._renderText=function(e,t){var r=e.text;return r?a.tsx("div",{key:m("text-element",t),innerHTML:e.text,"class":a.join(u.text,u.contentElement)}):null},i.prototype._attachToNode=function(e){var t=this;e.appendChild(t)},i.prototype._getMediaStats=function(e){var t=0,r=0;return e.forEach(function(e){var i=e.type;"image"===i?t++:-1!==i.indexOf("chart")&&r++}),{total:r+t,images:t,charts:r}},i.prototype._pageContentElementMedia=function(e,t){var r=this.viewModel.content,i=r&&r[e],n=i&&i.mediaInfos;if(n&&n.length){var a="previous"===t?-1:1,o=this._activeMediaMap.get(e)+a,s=(o+n.length)%n.length;this._activeMediaMap.set(e,s),this.scheduleRender()}},i.prototype._previousClick=function(e){var t=e.currentTarget,r=t["data-content-element-index"];this.previousMedia(r)},i.prototype._nextClick=function(e){var t=e.currentTarget,r=t["data-content-element-index"];this.nextMedia(r)},i}(n.declared(o));return i([n.aliasOf("viewModel.graphic")],f.prototype,"graphic",void 0),i([n.aliasOf("viewModel.title")],f.prototype,"title",void 0),i([n.property({type:s}),a.renderable(["viewModel.waitingForContent","viewModel.content"])],f.prototype,"viewModel",void 0),i([a.accessibleHandler()],f.prototype,"_previousClick",null),i([a.accessibleHandler()],f.prototype,"_nextClick",null),f=i([n.subclass("esri.widgets.Popup.PopupRenderer")],f)});