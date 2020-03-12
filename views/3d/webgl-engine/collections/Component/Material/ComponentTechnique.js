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

define(["require","exports","../../../../../../core/tsSupport/assignHelper","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/tsSupport/decorateHelper","../../../../../../core/maybe","../../../../../../core/libs/gl-matrix-2/mat3f64","./shader/ComponentShader.glsl","../../../core/shaderLibrary/DiscardOrAdjustAlpha.glsl","../../../core/shaderLibrary/Slice.glsl","../../../core/shaderLibrary/attributes/VertexPosition.glsl","../../../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../../../core/shaderLibrary/util/DoublePrecision.glsl","../../../core/shaderTechnique/ReloadableShaderModule","../../../core/shaderTechnique/ShaderTechnique","../../../core/shaderTechnique/ShaderTechniqueConfiguration","../../../lib/DefaultTextureUnits","../../../materials/internal/MaterialUtil","../../../../../webgl/Program","../../../../../webgl/renderState"],function(e,r,t,o,a,i,n,s,l,u,d,c,p,m,h,b,f,x,g,T){Object.defineProperty(r,"__esModule",{value:!0});var v=function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return o(t,r),t.prototype.bindPass=function(e,r){var t=this.program;d.VertexPosition.bindViewProjTransform(t,r.viewTransform),u.Slice.bindUniforms(this.program,this.configuration,r.slicePlane),0===r.identifier&&(t.setUniformMatrix3fv("uTransformNormal_ViewFromGlobal",r.transformNormal_ViewFromGlobal),1===r.subPass&&t.setUniform2fv("uCameraNearFar",r.cameraNearFar),0===r.subPass&&(r.ambientOcclusionEnabled&&r.ambientOcclusion.bind(t),r.shadowsEnabled&&r.shadowMap.bind(t),r.lighting.setUniforms(this.program,r.integratedMesh))),1===r.identifier&&this.program.setUniform2fv("uCameraNearFar",r.cameraNearFar),2===r.identifier&&x.bindHighlightRendering(e,r,this.program)},t.prototype.bindDraw=function(e){d.VertexPosition.bindModelTransform(this.program,e),this.program.setUniformMatrix3fv("uTransformNormal_GlobalFromModel",e.transformNormal_GlobalFromModel)},t.prototype.bindMaterial=function(e,r){var t=this.program;t.setUniform4fv("uBaseColor",r.baseColor),t.setUniform1f("uObjectOpacity",r.objectOpacity),t.setUniform1f("textureAlphaCutoff",l.TEXTURE_ALPHA_CUTOFF_DEFAULT),1===r.componentParameters.type?r.componentParameters.texture.bind(t,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:1}):(t.setUniform4fv("uExternalColor",r.componentParameters.externalColor),t.setUniform1i("uExternalColorMixMode",r.componentParameters.externalColorMixMode)),i.isSome(r.baseColorTexture)&&r.baseColorTexture.bind(e,t,"uBaseColorTexture",f.DefaultTextureUnits.DIFFUSE,"uBaseColorTextureSize"),0===this.configuration.output&&(c.PhysicallyBasedRenderingParameters.bindUniforms(this.program,r),i.isSome(r.metallicRoughnessTexture)&&r.metallicRoughnessTexture.bind(e,t,"texMetallicRoughness",f.DefaultTextureUnits.METALLIC_ROUGHNESS,"texMetallicRoughnessSize"),i.isSome(r.emissionTexture)&&r.emissionTexture.bind(e,t,"texEmission",f.DefaultTextureUnits.EMISSION,"texEmissionSize"),i.isSome(r.occlusionTexture)&&r.occlusionTexture.bind(e,t,"texOcclusion",f.DefaultTextureUnits.OCCLUSION,"texOcclusionSize"),i.isSome(r.normalTexture)&&r.normalTexture.bind(e,t,"normalTexture",f.DefaultTextureUnits.NORMAL,"normalTextureSize"))},t.prototype.initializeProgram=function(e){var r=t.shader.get(),o=this.configuration,a=r.build({output:o.output,normalType:o.normalMode,attributeColor:o.vertexColors,attributeTextureCoordinates:o.vertexTextureCoordinates,componentData:o.componentData,alphaDiscardMode:3,baseColorTexture:o.baseColorTexture,doubleSidedMode:o.doubleSidedMode,receiveAmbientOcclusion:o.receiveAmbientOcclusion,receiveShadows:o.receiveShadows,slicePlaneEnabled:o.slicePlaneEnabled,sliceHighlightDisabled:o.sliceHighlightDisabled,viewingMode:e.viewingMode,vertexDiscardMode:o.vertexDiscardMode,usePBR:o.usePBR,hasMetalnessAndRoughnessTexture:o.hasMetalnessAndRoughnessTexture,hasEmissionTexture:o.hasEmissionTexture,hasOcclusionTexture:o.hasOcclusionTexture,hasNormalTexture:o.hasNormalTexture,vertexTangets:!1,useOldSceneLightInterface:!1,supportsTextureAtlas:!0,doublePrecisionRequiresObfuscation:p.doublePrecisionRequiresObfuscation(e.rctx)});return new g(e.rctx,a.generateSource("vertex"),a.generateSource("fragment"),r.attributeLocations)},t.prototype.initializePipeline=function(){var e=this.configuration;return T.makePipelineState({blending:0===e.output&&e.blendingEnabled?y:null,culling:P[e.cullFace],depthTest:{func:513},depthWrite:T.defaultDepthWriteParams,colorWrite:T.defaultColorWriteParams,stencilWrite:e.stencilWriteEnabled?C:null,stencilTest:e.stencilWriteEnabled?S:null,polygonOffset:e.polygonOffsetEnabled?M:null})},t.shader=new m.ReloadableShaderModule(s,"./shader/ComponentShader.glsl",e),t}(h.ShaderTechnique);r.ComponentTechnique=v;var y=T.separateBlendingParams(770,1,771,771),C={mask:255},S={function:{func:519,ref:1,mask:255},operation:{fail:7680,zFail:7680,zPass:7681}},M={factor:2,units:2},P=[];P[0]=null,P[2]={face:1029,mode:2305},P[1]={face:1028,mode:2305};var E=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.transformNormal_GlobalFromModel=n.mat3f64.create(),r}return o(r,e),r}(d.VertexPosition.ModelTransform);r.ComponentDrawParameters=E;var O=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.output=0,r.vertexColors=!1,r.normalMode=3,r.vertexTextureCoordinates=0,r.componentData=0,r.slicePlaneEnabled=!1,r.sliceHighlightDisabled=!1,r.cullFace=2,r.baseColorTexture=!1,r.receiveAmbientOcclusion=!0,r.receiveShadows=!0,r.vertexDiscardMode=0,r.doubleSidedMode=2,r.blendingEnabled=!0,r.stencilWriteEnabled=!1,r.polygonOffsetEnabled=!1,r.usePBR=!1,r.hasMetalnessAndRoughnessTexture=!1,r.hasEmissionTexture=!1,r.hasOcclusionTexture=!1,r.hasNormalTexture=!1,r}return o(r,e),a([b.parameter({count:6})],r.prototype,"output",void 0),a([b.parameter()],r.prototype,"vertexColors",void 0),a([b.parameter({count:4})],r.prototype,"normalMode",void 0),a([b.parameter({count:3})],r.prototype,"vertexTextureCoordinates",void 0),a([b.parameter({count:2})],r.prototype,"componentData",void 0),a([b.parameter()],r.prototype,"slicePlaneEnabled",void 0),a([b.parameter()],r.prototype,"sliceHighlightDisabled",void 0),a([b.parameter({count:3})],r.prototype,"cullFace",void 0),a([b.parameter()],r.prototype,"baseColorTexture",void 0),a([b.parameter()],r.prototype,"receiveAmbientOcclusion",void 0),a([b.parameter()],r.prototype,"receiveShadows",void 0),a([b.parameter({count:3})],r.prototype,"vertexDiscardMode",void 0),a([b.parameter({count:3})],r.prototype,"doubleSidedMode",void 0),a([b.parameter()],r.prototype,"blendingEnabled",void 0),a([b.parameter()],r.prototype,"stencilWriteEnabled",void 0),a([b.parameter()],r.prototype,"polygonOffsetEnabled",void 0),a([b.parameter()],r.prototype,"usePBR",void 0),a([b.parameter()],r.prototype,"hasMetalnessAndRoughnessTexture",void 0),a([b.parameter()],r.prototype,"hasEmissionTexture",void 0),a([b.parameter()],r.prototype,"hasOcclusionTexture",void 0),a([b.parameter()],r.prototype,"hasNormalTexture",void 0),r}(b.ShaderTechniqueConfiguration);r.ComponentTechniqueConfiguration=O});