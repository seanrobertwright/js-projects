/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','./TextViewRenderer','sap/ui/core/library','sap/base/security/encodeXML'],function(l,C,T,c,e){"use strict";var a=c.TextAlign;var b=l.TextViewColor;var d=l.TextViewDesign;var f=c.TextDirection;var g=C.extend("sap.ui.commons.TextView",{metadata:{interfaces:["sap.ui.commons.ToolbarItem","sap.ui.core.IFormContent"],library:"sap.ui.commons",properties:{text:{type:"string",defaultValue:'',bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:f.Inherit},enabled:{type:"boolean",group:"Behavior",defaultValue:true},helpId:{type:"string",group:"Behavior",defaultValue:''},accessibleRole:{type:"sap.ui.core.AccessibleRole",group:"Accessibility"},design:{type:"sap.ui.commons.TextViewDesign",group:"Data",defaultValue:d.Standard},wrapping:{type:"boolean",group:"Appearance",defaultValue:true},semanticColor:{type:"sap.ui.commons.TextViewColor",group:"Appearance",defaultValue:b.Default},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:a.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});g.prototype.setText=function(t){this.setProperty("text",t,true);var D=this.getDomRef();if(D){t=this.getText();D.innerHTML=e(t).replace(/&#xa;/g,"<br>");if(!this.getTooltip_AsString()){D.title=t;}}return this;};g.prototype.getAccessibilityInfo=function(){return{description:this.getText()};};return g;});
