/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ToolbarRenderer","sap/ui/core/Renderer","sap/m/BarInPageEnabler","./library"],function(T,R,B,l){"use strict";var A=R.extend(T);A.apiVersion=2;var _=A._AnchorBarHierarchicalSelectMode={Icon:"icon",Text:"text"};A.renderBarContent=function(r,t){if(t._bHasButtonsBar){r.renderControl(t._getScrollArrowLeft());r.openStart("div",t.getId()+"-scrollContainer");if(t._bHideScrollContainer){r.style("display","none");}r.attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("ANCHOR_BAR_LABEL")).class("sapUxAPAnchorBarScrollContainer").openEnd();r.openStart("div",t.getId()+"-scroll").attr("role","menubar").openEnd();if(!t._bHideScrollContainer){A.renderBarItems(r,t);}r.close("div");r.close("div");r.renderControl(t._getScrollArrowRight());}B.addChildClassTo(t._oSelect,t);r.renderControl(t._oSelect);};A.renderBarItems=function(r,t){var s=t.getSelectedButton();t.getContent().forEach(function(c){B.addChildClassTo(c,t);if(c.getId()===s){c.addStyleClass("sapUxAPAnchorBarButtonSelected");}r.renderControl(c);});};A.decorateRootElement=function(r,t){T.decorateRootElement.apply(this,arguments);if(t._sHierarchicalSelectMode===_.Icon){r.class("sapUxAPAnchorBarOverflow");}if(t.getBackgroundDesign()){r.class("sapUxAPAnchorBar"+t.getBackgroundDesign());}};return A;},true);
