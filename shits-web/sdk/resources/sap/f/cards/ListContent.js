/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library","sap/f/cards/BaseListContent","sap/m/List","sap/m/StandardListItem","sap/ui/base/ManagedObject","sap/f/cards/IconFormatter","sap/f/cards/BindingHelper"],function(l,B,s,S,M,I,a){"use strict";var A=l.cards.AreaType;var L=B.extend("sap.f.cards.ListContent",{renderer:{}});L.prototype._getList=function(){if(this._bIsBeingDestroyed){return null;}var o=this.getAggregation("_content");if(!o){o=new s({id:this.getId()+"-list",growing:false,showNoData:false,showSeparators:"None"});this.setAggregation("_content",o);}return o;};L.prototype.init=function(){B.prototype.init.apply(this,arguments);var o=this._getList();var t=this;o.attachUpdateFinished(function(){if(t._iVisibleItems){var b=o.getItems();for(var i=t._iVisibleItems+1;i<b.length;i++){b[i].setVisible(false);}}});this._oItemTemplate=new S({iconDensityAware:false});};L.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();this._oItemTemplate=null;}};L.prototype.setConfiguration=function(c){B.prototype.setConfiguration.apply(this,arguments);if(!c){return this;}if(c.items){this._setStaticItems(c.items);return this;}if(c.item){this._setItem(c.item);}return this;};L.prototype.onDataChanged=function(){this._checkHiddenNavigationItems(this.getConfiguration().item);};L.prototype._setItem=function(i){var m={iconDensityAware:false,title:i.title&&(i.title.value||i.title),description:i.description&&(i.description.value||i.description),highlight:i.highlight,info:i.info&&i.info.value,infoState:i.info&&i.info.state};if(i.icon&&i.icon.src){m.icon=a.formattedProperty(i.icon.src,function(v){return I.formatSrc(v,this._sAppId);}.bind(this));}this._oItemTemplate=new S(m);this._oActions.setAreaType(A.ContentItem);this._oActions.attach(i,this);var b={template:this._oItemTemplate};this._filterHiddenNavigationItems(i,b);this._bindAggregation("items",this._getList(),b);};L.prototype._setStaticItems=function(i){var o=this._getList();i.forEach(function(b){var c=new S({iconDensityAware:false,title:b.title?b.title:"",description:b.description?b.description:"",icon:b.icon?b.icon:"",infoState:b.infoState?b.infoState:"None",info:b.info?b.info:"",highlight:b.highlight?b.highlight:"None"});if(b.action){c.setType("Navigation");if(b.action.url){c.attachPress(function(){window.open(b.action.url,b.target||"_blank");});}}o.addItem(c);});this.fireEvent("_actionContentReady");};L.prototype.getInnerList=function(){return this._getList();};return L;});