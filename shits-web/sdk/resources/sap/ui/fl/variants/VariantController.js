/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/Change","sap/ui/fl/Variant","sap/base/util/ObjectPath","sap/base/util/includes","sap/base/util/merge","sap/base/Log"],function(U,L,C,V,O,i,m,a){"use strict";var _=function(){};var b=function(c,A,o){this._sComponentName=c||"";this._sAppVersion=A||U.DEFAULT_APP_VERSION;this._mVariantManagement={};this.setChangeFileContent(o,{});this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this.DEFAULT_AUTHOR="SAP";};b.prototype.getComponentName=function(){return this._sComponentName;};b.prototype.getAppVersion=function(){return this._sAppVersion;};b.prototype.setChangeFileContent=function(c){if(O.get("changes.variantSection",c)){Object.keys(c.changes.variantSection).forEach(function(v){if(!this._mVariantManagement[v]){this._mVariantManagement[v]=c.changes.variantSection[v];}}.bind(this));}};b.prototype.getChangeFileContent=function(){return this._mVariantManagement;};b.prototype.compareVariants=function(v,o){if(v.content.content.title.toLowerCase()<o.content.content.title.toLowerCase()){return-1;}else if(v.content.content.title.toLowerCase()>o.content.content.title.toLowerCase()){return 1;}return 0;};b.prototype.getVariants=function(v){var c=this._mVariantManagement[v]&&this._mVariantManagement[v].variants;return c||[];};b.prototype.getVariant=function(v,s){var o;var c=this.getVariants(v);c.some(function(d){if(d.content.fileName===s){o=d;return true;}});return o;};b.prototype.getVariantChanges=function(v,s,c){s=s||this._mVariantManagement[v].defaultVariant;var r=[];if(s&&typeof s==="string"){var o=this.getVariant(v,s);r=o.controlChanges;if(c){r=r.map(function(d,e){var f;if(!d.getDefinition){f=new C(d);o.controlChanges.splice(e,1,f);}else{f=d;}return f;});}}return r;};b.prototype._getReferencedChanges=function(v,c){var r=[];if(c.content.variantReference){r=this.getVariantChanges(v,c.content.variantReference,true);return r.filter(function(R){return L.compareAgainstCurrentLayer(R.getDefinition().layer,c.content.layer)===-1;});}return r;};b.prototype.setVariantChanges=function(v,s,c){if(!v||!s||!Array.isArray(c)){a.error("Cannot set variant changes without Variant reference");return undefined;}return this._mVariantManagement[v].variants.some(function(o){if(o.content.fileName===s){o.controlChanges=c;return true;}});};b.prototype._setVariantData=function(c,v,p){var d=this._mVariantManagement[v].variants;var o=d[p];Object.keys(c).forEach(function(P){if(o.content.content[P]){o.content.content[P]=c[P];}});if(o.content.fileName!==v){d.splice(p,1);var s=this._getIndexToSortVariant(d.slice(1),o);d.splice(s+1,0,o);return s+1;}d.splice(p,1,o);return p;};b.prototype._updateChangesForVariantManagementInMap=function(c,v,A){var o=this._mVariantManagement[v];var s=c.changeType;if(c.fileType==="ctrl_variant_change"){o.variants.some(function(d){if(d.content.fileName===c.selector.id){if(!d.variantChanges[s]){d.variantChanges[s]=[];}if(A){d.variantChanges[s].push(c);}else{d.variantChanges[s].some(function(e,I){if(e.fileName===c.fileName){d.variantChanges[s].splice(I,1);return true;}});}return true;}});}else if(c.fileType==="ctrl_variant_management_change"){if(!o.variantManagementChanges){o.variantManagementChanges={};}if(!o.variantManagementChanges[s]){o.variantManagementChanges[s]=[];}if(A){o.variantManagementChanges[s].push(c);}else{o.variantManagementChanges[s].some(function(e,I){if(e.fileName===c.fileName){o.variantManagementChanges[s].splice(I,1);return true;}});}}};b.prototype.loadInitialChanges=function(){return Object.keys(this._mVariantManagement).reduce(function(I,v){var c=this._mVariantManagement[v].currentVariant?"currentVariant":"defaultVariant";var o=this.getVariant(v,this._mVariantManagement[v][c]);if(!o||!o.content.content.visible){this._mVariantManagement[v][c]=v;}return I.concat(this.getVariantChanges(v,this._mVariantManagement[v][c],false));}.bind(this),[]);};b.prototype.getChangesForVariantSwitch=function(p){var c=this.getVariantChanges(p.variantManagementReference,p.currentVariantReference,true);var M=[];var d=[];Object.keys(p.changesMap).forEach(function(e){p.changesMap[e].forEach(function(o){M=M.concat(o);d=d.concat(o.getId());});});c=c.reduce(function(f,o){var e=d.indexOf(o.getDefinition().fileName);if(e>-1){f=f.concat(M[e]);}return f;},[]);var n=this.getVariantChanges(p.variantManagementReference,p.newVariantReference,true);var r=[];if(n.length>0){r=c.slice();c.some(function(o){if(n[0]&&o.getId()===n[0].getId()){n.shift();r.shift();}else{return true;}});}else{r=c;}var s={changesToBeReverted:r.reverse(),changesToBeApplied:n};return s;};b.prototype._applyChangesOnVariant=function(v){var c=v.variantChanges;var A;Object.keys(c).forEach(function(s){switch(s){case"setTitle":A=this._getActiveChange(s,c);if(A){v.content.content.title=A.getText("title");}break;case"setFavorite":A=this._getActiveChange(s,c);if(A){v.content.content.favorite=A.getContent().favorite;}break;case"setVisible":A=this._getActiveChange(s,c);if(A){v.content.content.visible=A.getContent().visible;}break;default:a.error("No valid changes on variant "+v.content.content.title+" available");}}.bind(this));};b.prototype._applyChangesOnVariantManagement=function(v){var c=v.variantManagementChanges;var A;if(Object.keys(c).length>0){A=this._getActiveChange("setDefault",c);if(A){v.defaultVariant=A.getContent().defaultVariant;}}};b.prototype._getActiveChange=function(c,d){var l=d[c].length-1;if(l>-1){return new C(d[c][l]);}return false;};b.prototype.fillVariantModel=function(){var v={};Object.keys(this._mVariantManagement).forEach(function(k){v[k]={defaultVariant:this._mVariantManagement[k].defaultVariant,variants:[]};if(this._mVariantManagement[k].currentVariant){v[k].currentVariant=this._mVariantManagement[k].currentVariant;}this.getVariants(k).forEach(function(o,c){v[k].variants[c]=JSON.parse(JSON.stringify({key:o.content.fileName,title:o.content.content.title,layer:o.content.layer,favorite:o.content.content.favorite,visible:o.content.content.visible,author:O.get("content.support.user",o)}));});}.bind(this));return v;};b.prototype.updateCurrentVariantInMap=function(v,n){this._mVariantManagement[v].currentVariant=n;};b.prototype.addChangeToVariant=function(c,v,s){var n=this.getVariantChanges(v,s,true);var d=n.map(function(c){return c.getDefinition().fileName;});var I=d.indexOf(c.getDefinition().fileName);if(I===-1){n.push(c);return this.setVariantChanges(v,s,n);}return false;};b.prototype.removeChangeFromVariant=function(c,v,s){var d=this.getVariantChanges(v,s,true);d=d.filter(function(o){return o.getId()!==c.getId();});return this.setVariantChanges(v,s,d);};b.prototype.addVariantToVariantManagement=function(v,s){var c=this._mVariantManagement[s].variants.slice().splice(1);var I=this._getIndexToSortVariant(c,v);if(v.content.variantReference){var r=this._getReferencedChanges(s,v);v.controlChanges=r.concat(v.controlChanges);}this._mVariantManagement[s].variants.splice(I+1,0,v);return I+1;};b.prototype._getIndexToSortVariant=function(v,o){var I=0;v.some(function(e,c){if(this.compareVariants(o,e)<0){I=c;return true;}I=c+1;}.bind(this));return I;};b.prototype.removeVariantFromVariantManagement=function(v,s){var I;var f=this._mVariantManagement[s].variants.some(function(c,d){var o=new V(c);if(o.getId()===v.getId()){I=d;return true;}});if(f){this._mVariantManagement[s].variants.splice(I,1);}return I;};b.prototype.assignResetMapListener=function(l){_=l;};b.prototype.resetMap=function(r){if(r){return Promise.resolve(_());}this._mVariantManagement={};return Promise.resolve();};b.prototype.checkAndSetVariantContent=function(c,t){var v=this.getChangeFileContent();var s=Object.keys(v).length===0||Object.keys(v).every(function(d){var e=v[d].variants;return e.length===1&&!e[0].content.layer&&e[0].controlChanges.length===0&&Object.keys(e[0].variantChanges).length===0;});if(s){this.setChangeFileContent(c,t);}};return b;},true);
