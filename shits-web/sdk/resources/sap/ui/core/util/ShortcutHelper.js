/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device','sap/ui/events/jquery/EventExtension'],function(D){"use strict";var k={plus:"+",space:" "};var d=1.1;var s=d.toLocaleString().substring(1,2);var E={Win:"Meta",Scroll:"ScrollLock",Spacebar:" ",Down:"ArrowDown",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Del:"Delete",Apps:"ContextMenu",Esc:"Escape",Multiply:"*",Decimal:s,OS:"Meta"};var m={"ctrl+l":"jump to address bar","ctrl+n":"new window, cannot be registered in Chrome","ctrl+shift+n":"new incognito window, cannot be registered in Chrome","ctrl+alt+shift+p":"UI5 Technical Info","ctrl+q":"quit Chrome in Mac","ctrl+alt+shift+s":"UI5 Support Popup","ctrl+t":"new tab, cannot be registered in Chrome","ctrl+shift+t":"reopen last tab, cannot be registered in Chrome","ctrl+w":"close tab, cannot be registered in Chrome","ctrl+shift+w":"close window, cannot be registered in Chrome","ctrl+0":"reset zoom","ctrl+-":"zoom out","ctrl++":"zoom in","ctrl+shift+=":"cannot be handled","tab":"TAB-based keyboard navigation","shift+tab":"TAB-based keyboard navigation","ctrl+tab":"cycling through tabs, cannot be registered in Chrome","ctrl+shift+tab":"cycling through tabs, cannot be registered in Chrome","ctrl+alt+delete":"nice try","ctrl+pageup":"cycling through tabs, cannot be registered in Chrome","ctrl+pagedown":"cycling through tabs, cannot be registered in Chrome","ctrl+alt+left":"cannot be handled in IE","ctrl+alt+right":"cannot be handled in IE","ctrl+f1":"always opens help menu in IE","ctrl+f4":"always closes tab in IE","f6":"F6-based group navigation","f11":"fullscreen, cannot be registered in Chrome","f12":"browser dev tools"};var l=false;document.addEventListener('keydown',function(e){try{if(e.keyCode===18){l=(typeof e.location!=="number"||e.location===1);return;}}catch(a){}});var S={findShortcut:function(o,n){var r=o.data("sap.ui.core.Shortcut");if(!r){return;}var M=r.filter(function(a){var b=a.shortcutSpec.key===n.key&&a.shortcutSpec.ctrlKey===n.ctrlKey&&a.shortcutSpec.altKey===n.altKey&&a.shortcutSpec.shiftKey===n.shiftKey&&a.shortcutSpec.metaKey===n.metaKey;return b;});return M[0];},getNormalizedShortcutSpec:function(v){var n;if(typeof v==="string"){n=S.parseShortcut(v);}else{var a=v.key;var V=/^([a-z0-9\.,\-\*\/= +]|Tab|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i.test(a);if(!V){throw new Error("Shortcut key '"+a+"' is not a valid shortcut key. It must match /^([a-z0-9\.,\-\*\/= +]|Tab|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i");}n={key:S.translateRegisteredKeyToStandard(a).toLowerCase(),ctrlKey:D.os.macintosh?false:!!v.ctrl,ctrlRequested:v.ctrl,altKey:!!v.alt,shiftKey:!!v.shift,metaKey:D.os.macintosh?!!v.ctrl:false};}return n;},parseShortcut:function(a){this.validateShortcutString(a);var p=a.toLowerCase().split("+");return{key:S.translateRegisteredKeyToStandard(p.pop()),ctrlKey:D.os.macintosh?false:p.indexOf("ctrl")>-1,ctrlRequested:p.indexOf("ctrl")>-1,altKey:p.indexOf("alt")>-1,shiftKey:p.indexOf("shift")>-1,metaKey:D.os.macintosh?p.indexOf("ctrl")>-1:false};},translateRegisteredKeyToStandard:function(K){return k.hasOwnProperty(K)?k[K]:K;},validateShortcutString:function(a){var v=/^((Ctrl|Shift|Alt)\+){0,3}([a-z0-9\.,\-\*\/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|Escape|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|F[1-9]|F1[0-2])$/i.test(a);if(!v){throw new Error("Shortcut '"+a+"' is not a valid shortcut string. It must be a '+'-separated list of modifier keys and the actual key, like 'Ctrl+Alt+S'. Or more generally, it must match the expression /^((Ctrl|Shift|Alt)\+){0,3}([a-z0-9\.,\-\*\/=]|Plus|Tab|Space|Enter|Backspace|Home|Delete|End|Pageup|Pagedown|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Escape|F[1-9]|F1[0-2])$/i.");}},validateKeyCombination:function(n){var N=n.ctrlRequested?"ctrl+":"";N+=n.altKey?"alt+":"";N+=n.shiftKey?"shift+":"";N+=n.key;if(m[N]){throw new Error("Registering the shortcut '"+N+"' is not allowed ("+m[N]+").");}if([".",",","-","+","=","*","/"].indexOf(n.key)>-1&&N.indexOf("shift")>-1){throw new Error("Registering the shortcut '"+N+"' is not allowed because the 'Shift' modifier changes the meaning of the "+n.key+" key on many keyboards.");}},getNormalizedShortcutString:function(n){var N=n.ctrlRequested?"ctrl+":"";N+=n.altKey?"alt+":"";N+=n.shiftKey?"shift+":"";N+=n.key;return N;},shortcutMayBeUsedHere:function(o,a){var t=a.tagName.toLowerCase();if((t==="input"||t==="textarea")&&o.key.includes("arrow")){return false;}return true;},handleKeydown:function(o,O,c,e){if(e.key==="Control"||e.key==="Shift"||e.key==="Alt"||e.key==="AltGraph"||e.key==="Meta"){return;}if(e.isMarked()){return;}if(e.altKey&&!l){return;}var a=E.hasOwnProperty(e.key)?E[e.key]:e.key;a=a.toLowerCase();if(a!==o.key||e.ctrlKey!==o.ctrlKey||e.altKey!==o.altKey||e.shiftKey!==o.shiftKey||e.metaKey!==o.metaKey){return;}if(!S.shortcutMayBeUsedHere(o,e.target||e.srcElement)){return;}e.preventDefault();e.setMarked();e.stopPropagation();var b={registeredShortcut:O,originalBrowserEvent:e.originalEvent||e};c(b);}};return S;});
