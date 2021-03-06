/*!
 * jQuery JavaScript Library v1.6.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu May 12 15:04:36 2011 -0400
 */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!cj[a]){var b=f("<"+a+">").appendTo("body"),d=b.css("display");b.remove();if(d==="none"||d===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),c.body.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write("<!doctype><html><body></body></html>");b=cl.createElement(a),cl.body.appendChild(b),d=f.css(b,"display"),c.body.removeChild(ck)}cj[a]=d}return cj[a]}function cu(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function ct(){cq=b}function cs(){setTimeout(ct,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bF.test(a)?d(a,e):b_(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bU,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bQ),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bD(a,b,c){var d=b==="width"?bx:by,e=b==="width"?a.offsetWidth:a.offsetHeight;if(c==="border")return e;f.each(d,function(){c||(e-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?e+=parseFloat(f.css(a,"margin"+this))||0:e-=parseFloat(f.css(a,"border"+this+"Width"))||0});return e}function bn(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bm(a){f.nodeName(a,"input")?bl(a):a.getElementsByTagName&&f.grep(a.getElementsByTagName("input"),bl)}function bl(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bk(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bj(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bi(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bh(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function X(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(S.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function W(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function O(a,b){return(a&&a!=="*"?a+".":"")+b.replace(A,"`").replace(B,"&")}function N(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(y,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function L(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function F(){return!0}function E(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"$1-$2").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function H(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(H,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=d.userAgent,x,y,z,A=Object.prototype.toString,B=Object.prototype.hasOwnProperty,C=Array.prototype.push,D=Array.prototype.slice,E=String.prototype.trim,F=Array.prototype.indexOf,G={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.1",length:0,size:function(){return this.length},toArray:function(){return D.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?C.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),y.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(D.apply(this,arguments),"slice",D.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:C,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;y.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!y){y=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",z,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",z),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&H()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):G[A.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;if(a.constructor&&!B.call(a,"constructor")&&!B.call(a.constructor.prototype,"isPrototypeOf"))return!1;var c;for(c in a);return c===b||B.call(a,c)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(b,c,d){a.DOMParser?(d=new DOMParser,c=d.parseFromString(b,"text/xml")):(c=new ActiveXObject("Microsoft.XMLDOM"),c.async="false",c.loadXML(b)),d=c.documentElement,(!d||!d.nodeName||d.nodeName==="parsererror")&&e.error("Invalid XML: "+b);return c},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:E?function(a){return a==null?"":E.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?C.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(F)return F.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=D.call(arguments,2),g=function(){return a.apply(c,f.concat(D.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){G["[object "+b+"]"]=b.toLowerCase()}),x=e.uaMatch(w),x.browser&&(e.browser[x.browser]=!0,e.browser.version=x.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?z=function(){c.removeEventListener("DOMContentLoaded",z,!1),e.ready()}:c.attachEvent&&(z=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",z),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g](h)}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};f=c.createElement("select"),g=f.appendChild(c.createElement("option")),h=a.getElementsByTagName("input")[0],j={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:h.value==="on",optSelected:g.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},h.checked=!0,j.noCloneChecked=h.cloneNode(!0).checked,f.disabled=!0,j.optDisabled=!g.disabled;try{delete a.test}catch(s){j.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function b(){j.noCloneEvent=!1,a.detachEvent("onclick",b)}),a.cloneNode(!0).fireEvent("onclick")),h=c.createElement("input"),h.value="t",h.setAttribute("type","radio"),j.radioValue=h.value==="t",h.setAttribute("checked","checked"),a.appendChild(h),k=c.createDocumentFragment(),k.appendChild(a.firstChild),j.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",l=c.createElement("body"),m={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"};for(q in m)l.style[q]=m[q];l.appendChild(a),b.insertBefore(l,b.firstChild),j.appendChecked=h.checked,j.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,j.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",j.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",n=a.getElementsByTagName("td"),r=n[0].offsetHeight===0,n[0].style.display="",n[1].style.display="none",j.reliableHiddenOffsets=r&&n[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(i=c.createElement("div"),i.style.width="0",i.style.marginRight="0",a.appendChild(i),j.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(i,null)||{marginRight:0}).marginRight,10)||0)===0),l.innerHTML="",b.removeChild(l);if(a.attachEvent)for(q in{submit:1,change:1,focusin:1})p="on"+q,r=p in a,r||(a.setAttribute(p,"return;"),r=typeof a[p]=="function"),j[q+"Bubbles"]=r;return j}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([a-z])([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g=f.expando,h=typeof c=="string",i,j=a.nodeType,k=j?f.cache:a,l=j?a[f.expando]:a[f.expando]&&f.expando;if((!l||e&&l&&!k[l][g])&&h&&d===b)return;l||(j?a[f.expando]=l=++f.uuid:l=f.expando),k[l]||(k[l]={},j||(k[l].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?k[l][g]=f.extend(k[l][g],c):k[l]=f.extend(k[l],c);i=k[l],e&&(i[g]||(i[g]={}),i=i[g]),d!==b&&(i[f.camelCase(c)]=d);if(c==="events"&&!i[c])return i[g]&&i[g].events;return h?i[f.camelCase(c)]:i}},removeData:function(b,c,d){if(!!f.acceptData(b)){var e=f.expando,g=b.nodeType,h=g?f.cache:b,i=g?b[f.expando]:f.expando;if(!h[i])return;if(c){var j=d?h[i][e]:h[i];if(j){delete j[c];if(!l(j))return}}if(d){delete h[i][e];if(!l(h[i]))return}var k=h[i][e];f.support.deleteExpando||h!=a?delete h[i]:h[i]=null,k?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=k):g&&(f.support.deleteExpando?delete b[f.expando]:b.removeAttribute?b.removeAttribute(f.expando):b[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u=/\:/,v,w;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.addClass(a.call(this,b,c.attr("class")||""))});if(a&&typeof a=="string"){var b=(a||"").split(o);for(var c=0,d=this.length;c<d;c++){var e=this[c];if(e.nodeType===1)if(!e.className)e.className=a;else{var g=" "+e.className+" ",h=e.className;for(var i=0,j=b.length;i<j;i++)g.indexOf(" "+b[i]+" ")<0&&(h+=" "+b[i]);e.className=f.trim(h)}}}return this},removeClass:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.removeClass(a.call(this,b,c.attr("class")))});if(a&&typeof a=="string"||a===b){var c=(a||"").split(o);for(var d=0,e=this.length;d<e;d++){var g=this[d];if(g.nodeType===1&&g.className)if(a){var h=(" "+g.className+" ").replace(n," ");for(var i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){var d=f(this);d.toggleClass(a.call(this,c,d.attr("class"),b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if((" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;return(e.value||"").replace(p,"")}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);c=j&&f.attrFix[c]||c,i=f.attrHooks[c],i||(!t.test(c)||typeof d!="boolean"&&d!==b&&d.toLowerCase()!==c.toLowerCase()?v&&(f.nodeName(a,"form")||u.test(c))&&(i=v):i=w);if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j)return i.get(a,c);h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.support.getSetAttribute?a.removeAttribute(b):(f.attr(a,b,""),a.removeAttributeNode(a.getAttributeNode(b))),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},tabIndex:{get:function(a){var c=a.getAttributeNode("tabIndex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);c=i&&f.propFix[c]||c,h=f.propHooks[c];return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==b?g:a[c]},propHooks:{}}),w={get:function(a,c){return a[f.propFix[c]||c]?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=b),a.setAttribute(c,c.toLowerCase()));return c}},f.attrHooks.value={get:function(a,b){if(v&&f.nodeName(a,"button"))return v.get(a,b);return a.value},set:function(a,b,c){if(v&&f.nodeName(a,"button"))return v.set(a,b,c);a.value=b}},f.support.getSetAttribute||(f.attrFix=f.propFix,v=f.attrHooks.name=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,c){var d=a.getAttributeNode(c);if(d){d.nodeValue=b;return b}}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var x=Object.prototype.hasOwnProperty,y=/\.(.*)$/,z=/^(?:textarea|input|select)$/i,A=/\./g,B=/ /g,C=/[^\w\s.|`]/g,D=function(a){return a.replace(C,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=E;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=E);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),D).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem
)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,O(a.origType,a.selector),f.extend({},a,{handler:N,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,O(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?F:E):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=F;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=F;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=F,this.stopPropagation()},isDefaultPrevented:E,isPropagationStopped:E,isImmediatePropagationStopped:E};var G=function(a){var b=a.relatedTarget;a.type=a.data;try{if(b&&b!==c&&!b.parentNode)return;while(b&&b!==this)b=b.parentNode;b!==this&&f.event.handle.apply(this,arguments)}catch(d){}},H=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?H:G,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?H:G)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=b.type;(c==="submit"||c==="image")&&f(b).closest("form").length&&L("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=b.type;(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&L("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var I,J=function(a){var b=a.type,c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},K=function(c){var d=c.target,e,g;if(!!z.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=J(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:K,beforedeactivate:K,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&K.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&K.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",J(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in I)f.event.add(this,c+".specialChange",I[c]);return z.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return z.test(this.nodeName)}},I=f.event.special.change.filters,I.focus=I.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var M={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||E,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=y.exec(h),k="",j&&(k=j[0],h=h.replace(y,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,M[h]?(a.push(M[h]+k),h=h+k):h=(M[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+O(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+O(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var P=/Until$/,Q=/^(?:parents|prevUntil|prevAll)/,R=/,/,S=/^.[^:#\[\.,]*$/,T=Array.prototype.slice,U=f.expr.match.POS,V={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(X(this,a,!1),"not",a)},filter:function(a){return this.pushStack(X(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=U.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=U.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a||typeof a=="string")return f.inArray(this[0],a?f(a):this.parent().children());return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(W(c[0])||W(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=T.call(arguments);P.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!V[a]?f.unique(e):e,(this.length>1||R.test(d))&&Q.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var Y=/ jQuery\d+="(?:\d+|null)"/g,Z=/^\s+/,$=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,_=/<([\w:]+)/,ba=/<tbody/i,bb=/<|&#?\w+;/,bc=/<(?:script|object|embed|option|style)/i,bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Y,""):null;if(typeof a=="string"&&!bc.test(a)&&(f.support.leadingWhitespace||!Z.test(a))&&!bg[(_.exec(a)||["",""])[1].toLowerCase()]){a=a.replace($,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bh(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bn)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i=b&&b[0]?b[0].ownerDocument||b[0]:c;a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!bc.test(a[0])&&(f.support.checkClone||!bd.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bj(a,d),e=bk(a),g=bk(d);for(h=0;e[h];++h)bj(e[h],g[h])}if(b){bi(a,d);if(c){e=bk(a),g=bk(d);for(h=0;e[h];++h)bi(e[h],g[h])}}return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||
b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!bb.test(k))k=b.createTextNode(k);else{k=k.replace($,"<$1></$2>");var l=(_.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=ba.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&Z.test(k)&&o.insertBefore(b.createTextNode(Z.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bm(k[i]);else bm(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bo=/alpha\([^)]*\)/i,bp=/opacity=([^)]*)/,bq=/-([a-z])/ig,br=/([A-Z]|^ms)/g,bs=/^-?\d+(?:px)?$/i,bt=/^-?\d/,bu=/^[+\-]=/,bv=/[^+\-\.\de]+/g,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB,bC=function(a,b){return b.toUpperCase()};f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{zIndex:!0,fontWeight:!0,opacity:!0,zoom:!0,lineHeight:!0,widows:!0,orphans:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d;if(h==="number"&&isNaN(d)||d==null)return;h==="string"&&bu.test(d)&&(d=+d.replace(bv,"")+parseFloat(f.css(a,c))),h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]},camelCase:function(a){return a.replace(bq,bC)}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){a.offsetWidth!==0?e=bD(a,b,d):f.swap(a,bw,function(){e=bD(a,b,d)});if(e<=0){e=bz(a,b,b),e==="0px"&&bB&&(e=bB(a,b,b));if(e!=null)return e===""||e==="auto"?"0px":e}if(e<0||e==null){e=a.style[b];return e===""||e==="auto"?"0px":e}return typeof e=="string"?e:e+"px"}},set:function(a,b){if(!bs.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bp.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle;c.zoom=1;var e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.filter=bo.test(g)?g.replace(bo,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,c){var d,e,g;c=c.replace(br,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bs.test(d)&&bt.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bE=/%20/g,bF=/\[\]$/,bG=/\r?\n/g,bH=/#.*$/,bI=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bJ=/^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bK=/^(?:about|app|app\-storage|.+\-extension|file|widget):$/,bL=/^(?:GET|HEAD)$/,bM=/^\/\//,bN=/\?/,bO=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bP=/^(?:select|textarea)/i,bQ=/\s+/,bR=/([?&])_=[^&]*/,bS=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bT=f.fn.load,bU={},bV={},bW,bX;try{bW=e.href}catch(bY){bW=c.createElement("a"),bW.href="",bW=bW.href}bX=bS.exec(bW.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bT)return bT.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bO,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bP.test(this.nodeName)||bJ.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bG,"\r\n")}}):{name:b.name,value:c.replace(bG,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?f.extend(!0,a,f.ajaxSettings,b):(b=a,a=f.extend(!0,f.ajaxSettings,b));for(var c in{context:1,url:1})c in b?a[c]=b[c]:c in f.ajaxSettings&&(a[c]=f.ajaxSettings[c]);return a},ajaxSettings:{url:bW,isLocal:bK.test(bX[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":"*/*"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML}},ajaxPrefilter:bZ(bU),ajaxTransport:bZ(bV),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a?4:0;var o,r,u,w=l?ca(d,v,l):b,x,y;if(a>=200&&a<300||a===304){if(d.ifModified){if(x=v.getResponseHeader("Last-Modified"))f.lastModified[k]=x;if(y=v.getResponseHeader("Etag"))f.etag[k]=y}if(a===304)c="notmodified",o=!0;else try{r=cb(d,w),c="success",o=!0}catch(z){c="parsererror",u=z}}else{u=c;if(!c||a)c="error",a<0&&(a=0)}v.status=a,v.statusText=c,o?h.resolveWith(e,[r,c,v]):h.rejectWith(e,[v,c,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,c]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bI.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bH,"").replace(bM,bX[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bQ),d.crossDomain==null&&(r=bS.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bX[1]&&r[2]==bX[2]&&(r[3]||(r[1]==="http:"?80:443))==(bX[3]||(bX[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bU,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bL.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bN.test(d.url)?"&":"?")+d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bR,"$1_="+x);d.url=y+(y===d.url?(bN.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", */*; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bV,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){status<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bE,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq,cr=a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cv(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cm.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=cn.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this),f.isFunction(d.old)&&d.old.call(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function h(a){return d.step(a)}var d=this,e=f.fx,g;this.startTime=cq||cs(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,h.elem=this.elem,h()&&f.timers.push(h)&&!co&&(cr?(co=1,g=function(){co&&(cr(g),e.tick())},cr(g)):co=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cq||cs(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){return this[0]?parseFloat(f.css(this[0],d,"padding")):null},f.fn["outer"+c]=function(a){return this[0]?parseFloat(f.css(this[0],d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c];return e.document.compatMode==="CSS1Compat"&&g||e.document.body["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var h=f.css(e,d),i=parseFloat(h);return f.isNaN(i)?h:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
/*!
 * jQuery UI 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function(c,j){function k(a,b){var d=a.nodeName.toLowerCase();if("area"===d){b=a.parentNode;d=b.name;if(!a.href||!d||b.nodeName.toLowerCase()!=="map")return false;a=c("img[usemap=#"+d+"]")[0];return!!a&&l(a)}return(/input|select|textarea|button|object/.test(d)?!a.disabled:"a"==d?a.href||b:b)&&l(a)}function l(a){return!c(a).parents().andSelf().filter(function(){return c.curCSS(this,"visibility")==="hidden"||c.expr.filters.hidden(this)}).length}c.ui=c.ui||{};if(!c.ui.version){c.extend(c.ui,{version:"1.8.13",
keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}});c.fn.extend({_focus:c.fn.focus,focus:function(a,b){return typeof a==="number"?this.each(function(){var d=this;setTimeout(function(){c(d).focus();
b&&b.call(d)},a)}):this._focus.apply(this,arguments)},scrollParent:function(){var a;a=c.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(c.curCSS(this,"position",1))&&/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(c.curCSS(this,"overflow",1)+c.curCSS(this,
"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0);return/fixed/.test(this.css("position"))||!a.length?c(document):a},zIndex:function(a){if(a!==j)return this.css("zIndex",a);if(this.length){a=c(this[0]);for(var b;a.length&&a[0]!==document;){b=a.css("position");if(b==="absolute"||b==="relative"||b==="fixed"){b=parseInt(a.css("zIndex"),10);if(!isNaN(b)&&b!==0)return b}a=a.parent()}}return 0},disableSelection:function(){return this.bind((c.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",
function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}});c.each(["Width","Height"],function(a,b){function d(f,g,m,n){c.each(e,function(){g-=parseFloat(c.curCSS(f,"padding"+this,true))||0;if(m)g-=parseFloat(c.curCSS(f,"border"+this+"Width",true))||0;if(n)g-=parseFloat(c.curCSS(f,"margin"+this,true))||0});return g}var e=b==="Width"?["Left","Right"]:["Top","Bottom"],h=b.toLowerCase(),i={innerWidth:c.fn.innerWidth,innerHeight:c.fn.innerHeight,outerWidth:c.fn.outerWidth,
outerHeight:c.fn.outerHeight};c.fn["inner"+b]=function(f){if(f===j)return i["inner"+b].call(this);return this.each(function(){c(this).css(h,d(this,f)+"px")})};c.fn["outer"+b]=function(f,g){if(typeof f!=="number")return i["outer"+b].call(this,f);return this.each(function(){c(this).css(h,d(this,f,true,g)+"px")})}});c.extend(c.expr[":"],{data:function(a,b,d){return!!c.data(a,d[3])},focusable:function(a){return k(a,!isNaN(c.attr(a,"tabindex")))},tabbable:function(a){var b=c.attr(a,"tabindex"),d=isNaN(b);
return(d||b>=0)&&k(a,!d)}});c(function(){var a=document.body,b=a.appendChild(b=document.createElement("div"));c.extend(b.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0});c.support.minHeight=b.offsetHeight===100;c.support.selectstart="onselectstart"in b;a.removeChild(b).style.display="none"});c.extend(c.ui,{plugin:{add:function(a,b,d){a=c.ui[a].prototype;for(var e in d){a.plugins[e]=a.plugins[e]||[];a.plugins[e].push([b,d[e]])}},call:function(a,b,d){if((b=a.plugins[b])&&a.element[0].parentNode)for(var e=
0;e<b.length;e++)a.options[b[e][0]]&&b[e][1].apply(a.element,d)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(a,b){if(c(a).css("overflow")==="hidden")return false;b=b&&b==="left"?"scrollLeft":"scrollTop";var d=false;if(a[b]>0)return true;a[b]=1;d=a[b]>0;a[b]=0;return d},isOverAxis:function(a,b,d){return a>b&&a<b+d},isOver:function(a,b,d,e,h,i){return c.ui.isOverAxis(a,d,h)&&c.ui.isOverAxis(b,e,i)}})}})(jQuery);
;/*!
 * jQuery UI Widget 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function(b,j){if(b.cleanData){var k=b.cleanData;b.cleanData=function(a){for(var c=0,d;(d=a[c])!=null;c++)b(d).triggerHandler("remove");k(a)}}else{var l=b.fn.remove;b.fn.remove=function(a,c){return this.each(function(){if(!c)if(!a||b.filter(a,[this]).length)b("*",this).add([this]).each(function(){b(this).triggerHandler("remove")});return l.call(b(this),a,c)})}}b.widget=function(a,c,d){var e=a.split(".")[0],f;a=a.split(".")[1];f=e+"-"+a;if(!d){d=c;c=b.Widget}b.expr[":"][f]=function(h){return!!b.data(h,
a)};b[e]=b[e]||{};b[e][a]=function(h,g){arguments.length&&this._createWidget(h,g)};c=new c;c.options=b.extend(true,{},c.options);b[e][a].prototype=b.extend(true,c,{namespace:e,widgetName:a,widgetEventPrefix:b[e][a].prototype.widgetEventPrefix||a,widgetBaseClass:f},d);b.widget.bridge(a,b[e][a])};b.widget.bridge=function(a,c){b.fn[a]=function(d){var e=typeof d==="string",f=Array.prototype.slice.call(arguments,1),h=this;d=!e&&f.length?b.extend.apply(null,[true,d].concat(f)):d;if(e&&d.charAt(0)==="_")return h;
e?this.each(function(){var g=b.data(this,a),i=g&&b.isFunction(g[d])?g[d].apply(g,f):g;if(i!==g&&i!==j){h=i;return false}}):this.each(function(){var g=b.data(this,a);g?g.option(d||{})._init():b.data(this,a,new c(d,this))});return h}};b.Widget=function(a,c){arguments.length&&this._createWidget(a,c)};b.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:false},_createWidget:function(a,c){b.data(c,this.widgetName,this);this.element=b(c);this.options=b.extend(true,{},this.options,
this._getCreateOptions(),a);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()});this._create();this._trigger("create");this._init()},_getCreateOptions:function(){return b.metadata&&b.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName);this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled ui-state-disabled")},
widget:function(){return this.element},option:function(a,c){var d=a;if(arguments.length===0)return b.extend({},this.options);if(typeof a==="string"){if(c===j)return this.options[a];d={};d[a]=c}this._setOptions(d);return this},_setOptions:function(a){var c=this;b.each(a,function(d,e){c._setOption(d,e)});return this},_setOption:function(a,c){this.options[a]=c;if(a==="disabled")this.widget()[c?"addClass":"removeClass"](this.widgetBaseClass+"-disabled ui-state-disabled").attr("aria-disabled",c);return this},
enable:function(){return this._setOption("disabled",false)},disable:function(){return this._setOption("disabled",true)},_trigger:function(a,c,d){var e=this.options[a];c=b.Event(c);c.type=(a===this.widgetEventPrefix?a:this.widgetEventPrefix+a).toLowerCase();d=d||{};if(c.originalEvent){a=b.event.props.length;for(var f;a;){f=b.event.props[--a];c[f]=c.originalEvent[f]}}this.element.trigger(c,d);return!(b.isFunction(e)&&e.call(this.element[0],c,d)===false||c.isDefaultPrevented())}}})(jQuery);
;/*!
 * jQuery UI Mouse 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function(b){var d=false;b(document).mousedown(function(){d=false});b.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var a=this;this.element.bind("mousedown."+this.widgetName,function(c){return a._mouseDown(c)}).bind("click."+this.widgetName,function(c){if(true===b.data(c.target,a.widgetName+".preventClickEvent")){b.removeData(c.target,a.widgetName+".preventClickEvent");c.stopImmediatePropagation();return false}});this.started=false},_mouseDestroy:function(){this.element.unbind("."+
this.widgetName)},_mouseDown:function(a){if(!d){this._mouseStarted&&this._mouseUp(a);this._mouseDownEvent=a;var c=this,f=a.which==1,g=typeof this.options.cancel=="string"?b(a.target).parents().add(a.target).filter(this.options.cancel).length:false;if(!f||g||!this._mouseCapture(a))return true;this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet)this._mouseDelayTimer=setTimeout(function(){c.mouseDelayMet=true},this.options.delay);if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a)){this._mouseStarted=
this._mouseStart(a)!==false;if(!this._mouseStarted){a.preventDefault();return true}}true===b.data(a.target,this.widgetName+".preventClickEvent")&&b.removeData(a.target,this.widgetName+".preventClickEvent");this._mouseMoveDelegate=function(e){return c._mouseMove(e)};this._mouseUpDelegate=function(e){return c._mouseUp(e)};b(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);a.preventDefault();return d=true}},_mouseMove:function(a){if(b.browser.msie&&
!(document.documentMode>=9)&&!a.button)return this._mouseUp(a);if(this._mouseStarted){this._mouseDrag(a);return a.preventDefault()}if(this._mouseDistanceMet(a)&&this._mouseDelayMet(a))(this._mouseStarted=this._mouseStart(this._mouseDownEvent,a)!==false)?this._mouseDrag(a):this._mouseUp(a);return!this._mouseStarted},_mouseUp:function(a){b(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=
false;a.target==this._mouseDownEvent.target&&b.data(a.target,this.widgetName+".preventClickEvent",true);this._mouseStop(a)}return false},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return true}})})(jQuery);
;/*
 * jQuery UI Position 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */
(function(c){c.ui=c.ui||{};var n=/left|center|right/,o=/top|center|bottom/,t=c.fn.position,u=c.fn.offset;c.fn.position=function(b){if(!b||!b.of)return t.apply(this,arguments);b=c.extend({},b);var a=c(b.of),d=a[0],g=(b.collision||"flip").split(" "),e=b.offset?b.offset.split(" "):[0,0],h,k,j;if(d.nodeType===9){h=a.width();k=a.height();j={top:0,left:0}}else if(d.setTimeout){h=a.width();k=a.height();j={top:a.scrollTop(),left:a.scrollLeft()}}else if(d.preventDefault){b.at="left top";h=k=0;j={top:b.of.pageY,
left:b.of.pageX}}else{h=a.outerWidth();k=a.outerHeight();j=a.offset()}c.each(["my","at"],function(){var f=(b[this]||"").split(" ");if(f.length===1)f=n.test(f[0])?f.concat(["center"]):o.test(f[0])?["center"].concat(f):["center","center"];f[0]=n.test(f[0])?f[0]:"center";f[1]=o.test(f[1])?f[1]:"center";b[this]=f});if(g.length===1)g[1]=g[0];e[0]=parseInt(e[0],10)||0;if(e.length===1)e[1]=e[0];e[1]=parseInt(e[1],10)||0;if(b.at[0]==="right")j.left+=h;else if(b.at[0]==="center")j.left+=h/2;if(b.at[1]==="bottom")j.top+=
k;else if(b.at[1]==="center")j.top+=k/2;j.left+=e[0];j.top+=e[1];return this.each(function(){var f=c(this),l=f.outerWidth(),m=f.outerHeight(),p=parseInt(c.curCSS(this,"marginLeft",true))||0,q=parseInt(c.curCSS(this,"marginTop",true))||0,v=l+p+(parseInt(c.curCSS(this,"marginRight",true))||0),w=m+q+(parseInt(c.curCSS(this,"marginBottom",true))||0),i=c.extend({},j),r;if(b.my[0]==="right")i.left-=l;else if(b.my[0]==="center")i.left-=l/2;if(b.my[1]==="bottom")i.top-=m;else if(b.my[1]==="center")i.top-=
m/2;i.left=Math.round(i.left);i.top=Math.round(i.top);r={left:i.left-p,top:i.top-q};c.each(["left","top"],function(s,x){c.ui.position[g[s]]&&c.ui.position[g[s]][x](i,{targetWidth:h,targetHeight:k,elemWidth:l,elemHeight:m,collisionPosition:r,collisionWidth:v,collisionHeight:w,offset:e,my:b.my,at:b.at})});c.fn.bgiframe&&f.bgiframe();f.offset(c.extend(i,{using:b.using}))})};c.ui.position={fit:{left:function(b,a){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();b.left=
d>0?b.left-d:Math.max(b.left-a.collisionPosition.left,b.left)},top:function(b,a){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();b.top=d>0?b.top-d:Math.max(b.top-a.collisionPosition.top,b.top)}},flip:{left:function(b,a){if(a.at[0]!=="center"){var d=c(window);d=a.collisionPosition.left+a.collisionWidth-d.width()-d.scrollLeft();var g=a.my[0]==="left"?-a.elemWidth:a.my[0]==="right"?a.elemWidth:0,e=a.at[0]==="left"?a.targetWidth:-a.targetWidth,h=-2*a.offset[0];b.left+=
a.collisionPosition.left<0?g+e+h:d>0?g+e+h:0}},top:function(b,a){if(a.at[1]!=="center"){var d=c(window);d=a.collisionPosition.top+a.collisionHeight-d.height()-d.scrollTop();var g=a.my[1]==="top"?-a.elemHeight:a.my[1]==="bottom"?a.elemHeight:0,e=a.at[1]==="top"?a.targetHeight:-a.targetHeight,h=-2*a.offset[1];b.top+=a.collisionPosition.top<0?g+e+h:d>0?g+e+h:0}}}};if(!c.offset.setOffset){c.offset.setOffset=function(b,a){if(/static/.test(c.curCSS(b,"position")))b.style.position="relative";var d=c(b),
g=d.offset(),e=parseInt(c.curCSS(b,"top",true),10)||0,h=parseInt(c.curCSS(b,"left",true),10)||0;g={top:a.top-g.top+e,left:a.left-g.left+h};"using"in a?a.using.call(b,g):d.css(g)};c.fn.offset=function(b){var a=this[0];if(!a||!a.ownerDocument)return null;if(b)return this.each(function(){c.offset.setOffset(this,b)});return u.call(this)}}})(jQuery);
;/*
 * jQuery UI Draggable 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(d){d.widget("ui.draggable",d.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:true,appendTo:"parent",axis:false,connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false},_create:function(){if(this.options.helper==
"original"&&!/^(?:r|a|f)/.test(this.element.css("position")))this.element[0].style.position="relative";this.options.addClasses&&this.element.addClass("ui-draggable");this.options.disabled&&this.element.addClass("ui-draggable-disabled");this._mouseInit()},destroy:function(){if(this.element.data("draggable")){this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy();return this}},_mouseCapture:function(a){var b=
this.options;if(this.helper||b.disabled||d(a.target).is(".ui-resizable-handle"))return false;this.handle=this._getHandle(a);if(!this.handle)return false;d(b.iframeFix===true?"iframe":b.iframeFix).each(function(){d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1E3}).css(d(this).offset()).appendTo("body")});return true},_mouseStart:function(a){var b=this.options;this.helper=
this._createHelper(a);this._cacheHelperProportions();if(d.ui.ddmanager)d.ui.ddmanager.current=this;this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.positionAbs=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};d.extend(this.offset,{click:{left:a.pageX-this.offset.left,top:a.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});
this.originalPosition=this.position=this._generatePosition(a);this.originalPageX=a.pageX;this.originalPageY=a.pageY;b.cursorAt&&this._adjustOffsetFromHelper(b.cursorAt);b.containment&&this._setContainment();if(this._trigger("start",a)===false){this._clear();return false}this._cacheHelperProportions();d.ui.ddmanager&&!b.dropBehaviour&&d.ui.ddmanager.prepareOffsets(this,a);this.helper.addClass("ui-draggable-dragging");this._mouseDrag(a,true);return true},_mouseDrag:function(a,b){this.position=this._generatePosition(a);
this.positionAbs=this._convertPositionTo("absolute");if(!b){b=this._uiHash();if(this._trigger("drag",a,b)===false){this._mouseUp({});return false}this.position=b.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";d.ui.ddmanager&&d.ui.ddmanager.drag(this,a);return false},_mouseStop:function(a){var b=false;if(d.ui.ddmanager&&!this.options.dropBehaviour)b=
d.ui.ddmanager.drop(this,a);if(this.dropped){b=this.dropped;this.dropped=false}if((!this.element[0]||!this.element[0].parentNode)&&this.options.helper=="original")return false;if(this.options.revert=="invalid"&&!b||this.options.revert=="valid"&&b||this.options.revert===true||d.isFunction(this.options.revert)&&this.options.revert.call(this.element,b)){var c=this;d(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){c._trigger("stop",a)!==false&&c._clear()})}else this._trigger("stop",
a)!==false&&this._clear();return false},_mouseUp:function(a){this.options.iframeFix===true&&d("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)});return d.ui.mouse.prototype._mouseUp.call(this,a)},cancel:function(){this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear();return this},_getHandle:function(a){var b=!this.options.handle||!d(this.options.handle,this.element).length?true:false;d(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==
a.target)b=true});return b},_createHelper:function(a){var b=this.options;a=d.isFunction(b.helper)?d(b.helper.apply(this.element[0],[a])):b.helper=="clone"?this.element.clone().removeAttr("id"):this.element;a.parents("body").length||a.appendTo(b.appendTo=="parent"?this.element[0].parentNode:b.appendTo);a[0]!=this.element[0]&&!/(fixed|absolute)/.test(a.css("position"))&&a.css("position","absolute");return a},_adjustOffsetFromHelper:function(a){if(typeof a=="string")a=a.split(" ");if(d.isArray(a))a=
{left:+a[0],top:+a[1]||0};if("left"in a)this.offset.click.left=a.left+this.margins.left;if("right"in a)this.offset.click.left=this.helperProportions.width-a.right+this.margins.left;if("top"in a)this.offset.click.top=a.top+this.margins.top;if("bottom"in a)this.offset.click.top=this.helperProportions.height-a.bottom+this.margins.top},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var a=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&
d.ui.contains(this.scrollParent[0],this.offsetParent[0])){a.left+=this.scrollParent.scrollLeft();a.top+=this.scrollParent.scrollTop()}if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&d.browser.msie)a={top:0,left:0};return{top:a.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:a.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=
this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions=
{width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var a=this.options;if(a.containment=="parent")a.containment=this.helper[0].parentNode;if(a.containment=="document"||a.containment=="window")this.containment=[(a.containment=="document"?0:d(window).scrollLeft())-this.offset.relative.left-this.offset.parent.left,(a.containment=="document"?0:d(window).scrollTop())-this.offset.relative.top-this.offset.parent.top,(a.containment=="document"?0:d(window).scrollLeft())+
d(a.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a.containment=="document"?0:d(window).scrollTop())+(d(a.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(a.containment)&&a.containment.constructor!=Array){a=d(a.containment);var b=a[0];if(b){a.offset();var c=d(b).css("overflow")!="hidden";this.containment=[(parseInt(d(b).css("borderLeftWidth"),
10)||0)+(parseInt(d(b).css("paddingLeft"),10)||0),(parseInt(d(b).css("borderTopWidth"),10)||0)+(parseInt(d(b).css("paddingTop"),10)||0),(c?Math.max(b.scrollWidth,b.offsetWidth):b.offsetWidth)-(parseInt(d(b).css("borderLeftWidth"),10)||0)-(parseInt(d(b).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(c?Math.max(b.scrollHeight,b.offsetHeight):b.offsetHeight)-(parseInt(d(b).css("borderTopWidth"),10)||0)-(parseInt(d(b).css("paddingBottom"),10)||0)-this.helperProportions.height-
this.margins.top-this.margins.bottom];this.relative_container=a}}else if(a.containment.constructor==Array)this.containment=a.containment},_convertPositionTo:function(a,b){if(!b)b=this.position;a=a=="absolute"?1:-1;var c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName);return{top:b.top+this.offset.relative.top*a+this.offset.parent.top*a-(d.browser.safari&&
d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop())*a),left:b.left+this.offset.relative.left*a+this.offset.parent.left*a-(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())*a)}},_generatePosition:function(a){var b=this.options,c=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&d.ui.contains(this.scrollParent[0],
this.offsetParent[0]))?this.offsetParent:this.scrollParent,f=/(html|body)/i.test(c[0].tagName),e=a.pageX,h=a.pageY;if(this.originalPosition){var g;if(this.containment){if(this.relative_container){g=this.relative_container.offset();g=[this.containment[0]+g.left,this.containment[1]+g.top,this.containment[2]+g.left,this.containment[3]+g.top]}else g=this.containment;if(a.pageX-this.offset.click.left<g[0])e=g[0]+this.offset.click.left;if(a.pageY-this.offset.click.top<g[1])h=g[1]+this.offset.click.top;
if(a.pageX-this.offset.click.left>g[2])e=g[2]+this.offset.click.left;if(a.pageY-this.offset.click.top>g[3])h=g[3]+this.offset.click.top}if(b.grid){h=this.originalPageY+Math.round((h-this.originalPageY)/b.grid[1])*b.grid[1];h=g?!(h-this.offset.click.top<g[1]||h-this.offset.click.top>g[3])?h:!(h-this.offset.click.top<g[1])?h-b.grid[1]:h+b.grid[1]:h;e=this.originalPageX+Math.round((e-this.originalPageX)/b.grid[0])*b.grid[0];e=g?!(e-this.offset.click.left<g[0]||e-this.offset.click.left>g[2])?e:!(e-this.offset.click.left<
g[0])?e-b.grid[0]:e+b.grid[0]:e}}return{top:h-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():f?0:c.scrollTop()),left:e-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(d.browser.safari&&d.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():f?0:c.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove();this.helper=null;this.cancelHelperRemoval=false},_trigger:function(a,b,c){c=c||this._uiHash();d.ui.plugin.call(this,a,[b,c]);if(a=="drag")this.positionAbs=this._convertPositionTo("absolute");return d.Widget.prototype._trigger.call(this,a,b,c)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}});d.extend(d.ui.draggable,{version:"1.8.13"});
d.ui.plugin.add("draggable","connectToSortable",{start:function(a,b){var c=d(this).data("draggable"),f=c.options,e=d.extend({},b,{item:c.element});c.sortables=[];d(f.connectToSortable).each(function(){var h=d.data(this,"sortable");if(h&&!h.options.disabled){c.sortables.push({instance:h,shouldRevert:h.options.revert});h.refreshPositions();h._trigger("activate",a,e)}})},stop:function(a,b){var c=d(this).data("draggable"),f=d.extend({},b,{item:c.element});d.each(c.sortables,function(){if(this.instance.isOver){this.instance.isOver=
0;c.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert)this.instance.options.revert=true;this.instance._mouseStop(a);this.instance.options.helper=this.instance.options._helper;c.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",a,f)}})},drag:function(a,b){var c=d(this).data("draggable"),f=this;d.each(c.sortables,function(){this.instance.positionAbs=
c.positionAbs;this.instance.helperProportions=c.helperProportions;this.instance.offset.click=c.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return b.helper[0]};a.target=this.instance.currentItem[0];this.instance._mouseCapture(a,
true);this.instance._mouseStart(a,true,true);this.instance.offset.click.top=c.offset.click.top;this.instance.offset.click.left=c.offset.click.left;this.instance.offset.parent.left-=c.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=c.offset.parent.top-this.instance.offset.parent.top;c._trigger("toSortable",a);c.dropped=this.instance.element;c.currentItem=c.element;this.instance.fromOutside=c}this.instance.currentItem&&this.instance._mouseDrag(a)}else if(this.instance.isOver){this.instance.isOver=
0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",a,this.instance._uiHash(this.instance));this.instance._mouseStop(a,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();this.instance.placeholder&&this.instance.placeholder.remove();c._trigger("fromSortable",a);c.dropped=false}})}});d.ui.plugin.add("draggable","cursor",{start:function(){var a=d("body"),b=d(this).data("draggable").options;if(a.css("cursor"))b._cursor=
a.css("cursor");a.css("cursor",b.cursor)},stop:function(){var a=d(this).data("draggable").options;a._cursor&&d("body").css("cursor",a._cursor)}});d.ui.plugin.add("draggable","opacity",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("opacity"))b._opacity=a.css("opacity");a.css("opacity",b.opacity)},stop:function(a,b){a=d(this).data("draggable").options;a._opacity&&d(b.helper).css("opacity",a._opacity)}});d.ui.plugin.add("draggable","scroll",{start:function(){var a=d(this).data("draggable");
if(a.scrollParent[0]!=document&&a.scrollParent[0].tagName!="HTML")a.overflowOffset=a.scrollParent.offset()},drag:function(a){var b=d(this).data("draggable"),c=b.options,f=false;if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){if(!c.axis||c.axis!="x")if(b.overflowOffset.top+b.scrollParent[0].offsetHeight-a.pageY<c.scrollSensitivity)b.scrollParent[0].scrollTop=f=b.scrollParent[0].scrollTop+c.scrollSpeed;else if(a.pageY-b.overflowOffset.top<c.scrollSensitivity)b.scrollParent[0].scrollTop=
f=b.scrollParent[0].scrollTop-c.scrollSpeed;if(!c.axis||c.axis!="y")if(b.overflowOffset.left+b.scrollParent[0].offsetWidth-a.pageX<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft+c.scrollSpeed;else if(a.pageX-b.overflowOffset.left<c.scrollSensitivity)b.scrollParent[0].scrollLeft=f=b.scrollParent[0].scrollLeft-c.scrollSpeed}else{if(!c.axis||c.axis!="x")if(a.pageY-d(document).scrollTop()<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()-c.scrollSpeed);
else if(d(window).height()-(a.pageY-d(document).scrollTop())<c.scrollSensitivity)f=d(document).scrollTop(d(document).scrollTop()+c.scrollSpeed);if(!c.axis||c.axis!="y")if(a.pageX-d(document).scrollLeft()<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()-c.scrollSpeed);else if(d(window).width()-(a.pageX-d(document).scrollLeft())<c.scrollSensitivity)f=d(document).scrollLeft(d(document).scrollLeft()+c.scrollSpeed)}f!==false&&d.ui.ddmanager&&!c.dropBehaviour&&d.ui.ddmanager.prepareOffsets(b,
a)}});d.ui.plugin.add("draggable","snap",{start:function(){var a=d(this).data("draggable"),b=a.options;a.snapElements=[];d(b.snap.constructor!=String?b.snap.items||":data(draggable)":b.snap).each(function(){var c=d(this),f=c.offset();this!=a.element[0]&&a.snapElements.push({item:this,width:c.outerWidth(),height:c.outerHeight(),top:f.top,left:f.left})})},drag:function(a,b){for(var c=d(this).data("draggable"),f=c.options,e=f.snapTolerance,h=b.offset.left,g=h+c.helperProportions.width,n=b.offset.top,
o=n+c.helperProportions.height,i=c.snapElements.length-1;i>=0;i--){var j=c.snapElements[i].left,l=j+c.snapElements[i].width,k=c.snapElements[i].top,m=k+c.snapElements[i].height;if(j-e<h&&h<l+e&&k-e<n&&n<m+e||j-e<h&&h<l+e&&k-e<o&&o<m+e||j-e<g&&g<l+e&&k-e<n&&n<m+e||j-e<g&&g<l+e&&k-e<o&&o<m+e){if(f.snapMode!="inner"){var p=Math.abs(k-o)<=e,q=Math.abs(m-n)<=e,r=Math.abs(j-g)<=e,s=Math.abs(l-h)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k-c.helperProportions.height,left:0}).top-c.margins.top;
if(q)b.position.top=c._convertPositionTo("relative",{top:m,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j-c.helperProportions.width}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l}).left-c.margins.left}var t=p||q||r||s;if(f.snapMode!="outer"){p=Math.abs(k-n)<=e;q=Math.abs(m-o)<=e;r=Math.abs(j-h)<=e;s=Math.abs(l-g)<=e;if(p)b.position.top=c._convertPositionTo("relative",{top:k,left:0}).top-c.margins.top;if(q)b.position.top=
c._convertPositionTo("relative",{top:m-c.helperProportions.height,left:0}).top-c.margins.top;if(r)b.position.left=c._convertPositionTo("relative",{top:0,left:j}).left-c.margins.left;if(s)b.position.left=c._convertPositionTo("relative",{top:0,left:l-c.helperProportions.width}).left-c.margins.left}if(!c.snapElements[i].snapping&&(p||q||r||s||t))c.options.snap.snap&&c.options.snap.snap.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=p||q||r||s||t}else{c.snapElements[i].snapping&&
c.options.snap.release&&c.options.snap.release.call(c.element,a,d.extend(c._uiHash(),{snapItem:c.snapElements[i].item}));c.snapElements[i].snapping=false}}}});d.ui.plugin.add("draggable","stack",{start:function(){var a=d(this).data("draggable").options;a=d.makeArray(d(a.stack)).sort(function(c,f){return(parseInt(d(c).css("zIndex"),10)||0)-(parseInt(d(f).css("zIndex"),10)||0)});if(a.length){var b=parseInt(a[0].style.zIndex)||0;d(a).each(function(c){this.style.zIndex=b+c});this[0].style.zIndex=b+a.length}}});
d.ui.plugin.add("draggable","zIndex",{start:function(a,b){a=d(b.helper);b=d(this).data("draggable").options;if(a.css("zIndex"))b._zIndex=a.css("zIndex");a.css("zIndex",b.zIndex)},stop:function(a,b){a=d(this).data("draggable").options;a._zIndex&&d(b.helper).css("zIndex",a._zIndex)}})})(jQuery);
;/*
 * jQuery UI Resizable 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */
(function(e){e.widget("ui.resizable",e.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,containment:false,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1E3},_create:function(){var b=this,a=this.options;this.element.addClass("ui-resizable");e.extend(this,{_aspectRatio:!!a.aspectRatio,aspectRatio:a.aspectRatio,originalElement:this.element,
_proportionallyResizeElements:[],_helper:a.helper||a.ghost||a.animate?a.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){/relative/.test(this.element.css("position"))&&e.browser.opera&&this.element.css({position:"relative",top:"auto",left:"auto"});this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),
top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=
this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=a.handles||(!e(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",
nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all")this.handles="n,e,s,w,se,sw,ne,nw";var c=this.handles.split(",");this.handles={};for(var d=0;d<c.length;d++){var f=e.trim(c[d]),g=e('<div class="ui-resizable-handle '+("ui-resizable-"+f)+'"></div>');/sw|se|ne|nw/.test(f)&&g.css({zIndex:++a.zIndex});"se"==f&&g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");this.handles[f]=".ui-resizable-"+f;this.element.append(g)}}this._renderAxis=function(h){h=h||this.element;for(var i in this.handles){if(this.handles[i].constructor==
String)this.handles[i]=e(this.handles[i],this.element).show();if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var j=e(this.handles[i],this.element),k=0;k=/sw|ne|nw|se|n|s/.test(i)?j.outerHeight():j.outerWidth();j=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join("");h.css(j,k);this._proportionallyResize()}e(this.handles[i])}};this._renderAxis(this.element);this._handles=e(".ui-resizable-handle",this.element).disableSelection();
this._handles.mouseover(function(){if(!b.resizing){if(this.className)var h=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=h&&h[1]?h[1]:"se"}});if(a.autoHide){this._handles.hide();e(this.element).addClass("ui-resizable-autohide").hover(function(){if(!a.disabled){e(this).removeClass("ui-resizable-autohide");b._handles.show()}},function(){if(!a.disabled)if(!b.resizing){e(this).addClass("ui-resizable-autohide");b._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();
var b=function(c){e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var a=this.element;a.after(this.originalElement.css({position:a.css("position"),width:a.outerWidth(),height:a.outerHeight(),top:a.css("top"),left:a.css("left")})).remove()}this.originalElement.css("resize",this.originalResizeStyle);b(this.originalElement);return this},_mouseCapture:function(b){var a=
false;for(var c in this.handles)if(e(this.handles[c])[0]==b.target)a=true;return!this.options.disabled&&a},_mouseStart:function(b){var a=this.options,c=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:e(document).scrollTop(),left:e(document).scrollLeft()};if(d.is(".ui-draggable")||/absolute/.test(d.css("position")))d.css({position:"absolute",top:c.top,left:c.left});e.browser.opera&&/relative/.test(d.css("position"))&&d.css({position:"relative",top:"auto",left:"auto"});
this._renderProxy();c=m(this.helper.css("left"));var f=m(this.helper.css("top"));if(a.containment){c+=e(a.containment).scrollLeft()||0;f+=e(a.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:c,top:f};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:c,top:f};this.sizeDiff=
{width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:b.pageX,top:b.pageY};this.aspectRatio=typeof a.aspectRatio=="number"?a.aspectRatio:this.originalSize.width/this.originalSize.height||1;a=e(".ui-resizable-"+this.axis).css("cursor");e("body").css("cursor",a=="auto"?this.axis+"-resize":a);d.addClass("ui-resizable-resizing");this._propagate("start",b);return true},_mouseDrag:function(b){var a=this.helper,c=this.originalMousePosition,d=this._change[this.axis];
if(!d)return false;c=d.apply(this,[b,b.pageX-c.left||0,b.pageY-c.top||0]);if(this._aspectRatio||b.shiftKey)c=this._updateRatio(c,b);c=this._respectSize(c,b);this._propagate("resize",b);a.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize();this._updateCache(c);this._trigger("resize",b,this.ui());return false},_mouseStop:function(b){this.resizing=
false;var a=this.options,c=this;if(this._helper){var d=this._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName);d=f&&e.ui.hasScroll(d[0],"left")?0:c.sizeDiff.height;f=f?0:c.sizeDiff.width;f={width:c.helper.width()-f,height:c.helper.height()-d};d=parseInt(c.element.css("left"),10)+(c.position.left-c.originalPosition.left)||null;var g=parseInt(c.element.css("top"),10)+(c.position.top-c.originalPosition.top)||null;a.animate||this.element.css(e.extend(f,{top:g,left:d}));c.helper.height(c.size.height);
c.helper.width(c.size.width);this._helper&&!a.animate&&this._proportionallyResize()}e("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",b);this._helper&&this.helper.remove();return false},_updateCache:function(b){this.offset=this.helper.offset();if(l(b.left))this.position.left=b.left;if(l(b.top))this.position.top=b.top;if(l(b.height))this.size.height=b.height;if(l(b.width))this.size.width=b.width},_updateRatio:function(b){var a=this.position,c=this.size,
d=this.axis;if(b.height)b.width=c.height*this.aspectRatio;else if(b.width)b.height=c.width/this.aspectRatio;if(d=="sw"){b.left=a.left+(c.width-b.width);b.top=null}if(d=="nw"){b.top=a.top+(c.height-b.height);b.left=a.left+(c.width-b.width)}return b},_respectSize:function(b){var a=this.options,c=this.axis,d=l(b.width)&&a.maxWidth&&a.maxWidth<b.width,f=l(b.height)&&a.maxHeight&&a.maxHeight<b.height,g=l(b.width)&&a.minWidth&&a.minWidth>b.width,h=l(b.height)&&a.minHeight&&a.minHeight>b.height;if(g)b.width=
a.minWidth;if(h)b.height=a.minHeight;if(d)b.width=a.maxWidth;if(f)b.height=a.maxHeight;var i=this.originalPosition.left+this.originalSize.width,j=this.position.top+this.size.height,k=/sw|nw|w/.test(c);c=/nw|ne|n/.test(c);if(g&&k)b.left=i-a.minWidth;if(d&&k)b.left=i-a.maxWidth;if(h&&c)b.top=j-a.minHeight;if(f&&c)b.top=j-a.maxHeight;if((a=!b.width&&!b.height)&&!b.left&&b.top)b.top=null;else if(a&&!b.top&&b.left)b.left=null;return b},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var b=
this.helper||this.element,a=0;a<this._proportionallyResizeElements.length;a++){var c=this._proportionallyResizeElements[a];if(!this.borderDif){var d=[c.css("borderTopWidth"),c.css("borderRightWidth"),c.css("borderBottomWidth"),c.css("borderLeftWidth")],f=[c.css("paddingTop"),c.css("paddingRight"),c.css("paddingBottom"),c.css("paddingLeft")];this.borderDif=e.map(d,function(g,h){g=parseInt(g,10)||0;h=parseInt(f[h],10)||0;return g+h})}e.browser.msie&&(e(b).is(":hidden")||e(b).parents(":hidden").length)||
c.css({height:b.height()-this.borderDif[0]-this.borderDif[2]||0,width:b.width()-this.borderDif[1]-this.borderDif[3]||0})}},_renderProxy:function(){var b=this.options;this.elementOffset=this.element.offset();if(this._helper){this.helper=this.helper||e('<div style="overflow:hidden;"></div>');var a=e.browser.msie&&e.browser.version<7,c=a?1:0;a=a?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+a,height:this.element.outerHeight()+a,position:"absolute",left:this.elementOffset.left-
c+"px",top:this.elementOffset.top-c+"px",zIndex:++b.zIndex});this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(b,a){return{width:this.originalSize.width+a}},w:function(b,a){return{left:this.originalPosition.left+a,width:this.originalSize.width-a}},n:function(b,a,c){return{top:this.originalPosition.top+c,height:this.originalSize.height-c}},s:function(b,a,c){return{height:this.originalSize.height+c}},se:function(b,a,c){return e.extend(this._change.s.apply(this,
arguments),this._change.e.apply(this,[b,a,c]))},sw:function(b,a,c){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,a,c]))},ne:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,a,c]))},nw:function(b,a,c){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,a,c]))}},_propagate:function(b,a){e.ui.plugin.call(this,b,[a,this.ui()]);b!="resize"&&this._trigger(b,a,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,
element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}});e.extend(e.ui.resizable,{version:"1.8.13"});e.ui.plugin.add("resizable","alsoResize",{start:function(){var b=e(this).data("resizable").options,a=function(c){e(c).each(function(){var d=e(this);d.data("resizable-alsoresize",{width:parseInt(d.width(),10),height:parseInt(d.height(),10),left:parseInt(d.css("left"),10),top:parseInt(d.css("top"),10),position:d.css("position")})})};
if(typeof b.alsoResize=="object"&&!b.alsoResize.parentNode)if(b.alsoResize.length){b.alsoResize=b.alsoResize[0];a(b.alsoResize)}else e.each(b.alsoResize,function(c){a(c)});else a(b.alsoResize)},resize:function(b,a){var c=e(this).data("resizable");b=c.options;var d=c.originalSize,f=c.originalPosition,g={height:c.size.height-d.height||0,width:c.size.width-d.width||0,top:c.position.top-f.top||0,left:c.position.left-f.left||0},h=function(i,j){e(i).each(function(){var k=e(this),q=e(this).data("resizable-alsoresize"),
p={},r=j&&j.length?j:k.parents(a.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(r,function(n,o){if((n=(q[o]||0)+(g[o]||0))&&n>=0)p[o]=n||null});if(e.browser.opera&&/relative/.test(k.css("position"))){c._revertToRelativePosition=true;k.css({position:"absolute",top:"auto",left:"auto"})}k.css(p)})};typeof b.alsoResize=="object"&&!b.alsoResize.nodeType?e.each(b.alsoResize,function(i,j){h(i,j)}):h(b.alsoResize)},stop:function(){var b=e(this).data("resizable"),a=b.options,
c=function(d){e(d).each(function(){var f=e(this);f.css({position:f.data("resizable-alsoresize").position})})};if(b._revertToRelativePosition){b._revertToRelativePosition=false;typeof a.alsoResize=="object"&&!a.alsoResize.nodeType?e.each(a.alsoResize,function(d){c(d)}):c(a.alsoResize)}e(this).removeData("resizable-alsoresize")}});e.ui.plugin.add("resizable","animate",{stop:function(b){var a=e(this).data("resizable"),c=a.options,d=a._proportionallyResizeElements,f=d.length&&/textarea/i.test(d[0].nodeName),
g=f&&e.ui.hasScroll(d[0],"left")?0:a.sizeDiff.height;f={width:a.size.width-(f?0:a.sizeDiff.width),height:a.size.height-g};g=parseInt(a.element.css("left"),10)+(a.position.left-a.originalPosition.left)||null;var h=parseInt(a.element.css("top"),10)+(a.position.top-a.originalPosition.top)||null;a.element.animate(e.extend(f,h&&g?{top:h,left:g}:{}),{duration:c.animateDuration,easing:c.animateEasing,step:function(){var i={width:parseInt(a.element.css("width"),10),height:parseInt(a.element.css("height"),
10),top:parseInt(a.element.css("top"),10),left:parseInt(a.element.css("left"),10)};d&&d.length&&e(d[0]).css({width:i.width,height:i.height});a._updateCache(i);a._propagate("resize",b)}})}});e.ui.plugin.add("resizable","containment",{start:function(){var b=e(this).data("resizable"),a=b.element,c=b.options.containment;if(a=c instanceof e?c.get(0):/parent/.test(c)?a.parent().get(0):c){b.containerElement=e(a);if(/document/.test(c)||c==document){b.containerOffset={left:0,top:0};b.containerPosition={left:0,
top:0};b.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}}else{var d=e(a),f=[];e(["Top","Right","Left","Bottom"]).each(function(i,j){f[i]=m(d.css("padding"+j))});b.containerOffset=d.offset();b.containerPosition=d.position();b.containerSize={height:d.innerHeight()-f[3],width:d.innerWidth()-f[1]};c=b.containerOffset;var g=b.containerSize.height,h=b.containerSize.width;h=e.ui.hasScroll(a,"left")?a.scrollWidth:h;
g=e.ui.hasScroll(a)?a.scrollHeight:g;b.parentData={element:a,left:c.left,top:c.top,width:h,height:g}}}},resize:function(b){var a=e(this).data("resizable"),c=a.options,d=a.containerOffset,f=a.position;b=a._aspectRatio||b.shiftKey;var g={top:0,left:0},h=a.containerElement;if(h[0]!=document&&/static/.test(h.css("position")))g=d;if(f.left<(a._helper?d.left:0)){a.size.width+=a._helper?a.position.left-d.left:a.position.left-g.left;if(b)a.size.height=a.size.width/c.aspectRatio;a.position.left=c.helper?d.left:
0}if(f.top<(a._helper?d.top:0)){a.size.height+=a._helper?a.position.top-d.top:a.position.top;if(b)a.size.width=a.size.height*c.aspectRatio;a.position.top=a._helper?d.top:0}a.offset.left=a.parentData.left+a.position.left;a.offset.top=a.parentData.top+a.position.top;c=Math.abs((a._helper?a.offset.left-g.left:a.offset.left-g.left)+a.sizeDiff.width);d=Math.abs((a._helper?a.offset.top-g.top:a.offset.top-d.top)+a.sizeDiff.height);f=a.containerElement.get(0)==a.element.parent().get(0);g=/relative|absolute/.test(a.containerElement.css("position"));
if(f&&g)c-=a.parentData.left;if(c+a.size.width>=a.parentData.width){a.size.width=a.parentData.width-c;if(b)a.size.height=a.size.width/a.aspectRatio}if(d+a.size.height>=a.parentData.height){a.size.height=a.parentData.height-d;if(b)a.size.width=a.size.height*a.aspectRatio}},stop:function(){var b=e(this).data("resizable"),a=b.options,c=b.containerOffset,d=b.containerPosition,f=b.containerElement,g=e(b.helper),h=g.offset(),i=g.outerWidth()-b.sizeDiff.width;g=g.outerHeight()-b.sizeDiff.height;b._helper&&
!a.animate&&/relative/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g});b._helper&&!a.animate&&/static/.test(f.css("position"))&&e(this).css({left:h.left-d.left-c.left,width:i,height:g})}});e.ui.plugin.add("resizable","ghost",{start:function(){var b=e(this).data("resizable"),a=b.options,c=b.size;b.ghost=b.originalElement.clone();b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof a.ghost==
"string"?a.ghost:"");b.ghost.appendTo(b.helper)},resize:function(){var b=e(this).data("resizable");b.ghost&&b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})},stop:function(){var b=e(this).data("resizable");b.ghost&&b.helper&&b.helper.get(0).removeChild(b.ghost.get(0))}});e.ui.plugin.add("resizable","grid",{resize:function(){var b=e(this).data("resizable"),a=b.options,c=b.size,d=b.originalSize,f=b.originalPosition,g=b.axis;a.grid=typeof a.grid=="number"?[a.grid,a.grid]:a.grid;
var h=Math.round((c.width-d.width)/(a.grid[0]||1))*(a.grid[0]||1);a=Math.round((c.height-d.height)/(a.grid[1]||1))*(a.grid[1]||1);if(/^(se|s|e)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else if(/^(ne)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}else{if(/^(sw)$/.test(g)){b.size.width=d.width+h;b.size.height=d.height+a}else{b.size.width=d.width+h;b.size.height=d.height+a;b.position.top=f.top-a}b.position.left=f.left-h}}});var m=function(b){return parseInt(b,
10)||0},l=function(b){return!isNaN(parseInt(b,10))}})(jQuery);
;/*
 * jQuery UI Button 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(a){var g,i=function(b){a(":ui-button",b.target.form).each(function(){var c=a(this).data("button");setTimeout(function(){c.refresh()},1)})},h=function(b){var c=b.name,d=b.form,f=a([]);if(c)f=d?a(d).find("[name='"+c+"']"):a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form});return f};a.widget("ui.button",{options:{disabled:null,text:true,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",
i);if(typeof this.options.disabled!=="boolean")this.options.disabled=this.element.attr("disabled");this._determineButtonType();this.hasTitle=!!this.buttonElement.attr("title");var b=this,c=this.options,d=this.type==="checkbox"||this.type==="radio",f="ui-state-hover"+(!d?" ui-state-active":"");if(c.label===null)c.label=this.buttonElement.html();if(this.element.is(":disabled"))c.disabled=true;this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role","button").bind("mouseenter.button",
function(){if(!c.disabled){a(this).addClass("ui-state-hover");this===g&&a(this).addClass("ui-state-active")}}).bind("mouseleave.button",function(){c.disabled||a(this).removeClass(f)}).bind("focus.button",function(){a(this).addClass("ui-state-focus")}).bind("blur.button",function(){a(this).removeClass("ui-state-focus")}).bind("click.button",function(e){c.disabled&&e.stopImmediatePropagation()});d&&this.element.bind("change.button",function(){b.refresh()});if(this.type==="checkbox")this.buttonElement.bind("click.button",
function(){if(c.disabled)return false;a(this).toggleClass("ui-state-active");b.buttonElement.attr("aria-pressed",b.element[0].checked)});else if(this.type==="radio")this.buttonElement.bind("click.button",function(){if(c.disabled)return false;a(this).addClass("ui-state-active");b.buttonElement.attr("aria-pressed",true);var e=b.element[0];h(e).not(e).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed",false)});else{this.buttonElement.bind("mousedown.button",
function(){if(c.disabled)return false;a(this).addClass("ui-state-active");g=this;a(document).one("mouseup",function(){g=null})}).bind("mouseup.button",function(){if(c.disabled)return false;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(e){if(c.disabled)return false;if(e.keyCode==a.ui.keyCode.SPACE||e.keyCode==a.ui.keyCode.ENTER)a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")});this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===
a.ui.keyCode.SPACE&&a(this).click()})}this._setOption("disabled",c.disabled)},_determineButtonType:function(){this.type=this.element.is(":checkbox")?"checkbox":this.element.is(":radio")?"radio":this.element.is("input")?"input":"button";if(this.type==="checkbox"||this.type==="radio"){var b=this.element.parents().filter(":last"),c="label[for="+this.element.attr("id")+"]";this.buttonElement=b.find(c);if(!this.buttonElement.length){b=b.length?b.siblings():this.element.siblings();this.buttonElement=b.filter(c);
if(!this.buttonElement.length)this.buttonElement=b.find(c)}this.element.addClass("ui-helper-hidden-accessible");(b=this.element.is(":checked"))&&this.buttonElement.addClass("ui-state-active");this.buttonElement.attr("aria-pressed",b)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible");this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
this.hasTitle||this.buttonElement.removeAttr("title");a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled")c?this.element.attr("disabled",true):this.element.removeAttr("disabled");this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b);if(this.type==="radio")h(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed",
true):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed",false)});else if(this.type==="checkbox")this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed",true):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed",false)},_resetButton:function(){if(this.type==="input")this.options.label&&this.element.val(this.options.label);else{var b=this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
c=a("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,f=d.primary&&d.secondary,e=[];if(d.primary||d.secondary){if(this.options.text)e.push("ui-button-text-icon"+(f?"s":d.primary?"-primary":"-secondary"));d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>");d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>");if(!this.options.text){e.push(f?"ui-button-icons-only":
"ui-button-icon-only");this.hasTitle||b.attr("title",c)}}else e.push("ui-button-text-only");b.addClass(e.join(" "))}}});a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c);a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass("ui-corner-left").end().filter(":last").addClass("ui-corner-right").end().end()},
destroy:function(){this.element.removeClass("ui-buttonset");this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy");a.Widget.prototype.destroy.call(this)}})})(jQuery);
;/*
 * jQuery UI Dialog 1.8.13
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */
(function(c,l){var m={buttons:true,height:true,maxHeight:true,maxWidth:true,minHeight:true,minWidth:true,width:true},n={maxHeight:true,maxWidth:true,minHeight:true,minWidth:true},o=c.attrFn||{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true,click:true};c.widget("ui.dialog",{options:{autoOpen:true,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,
position:{my:"center",at:"center",collision:"fit",using:function(a){var b=c(this).css(a).offset().top;b<0&&c(this).css("top",a.top-b)}},resizable:true,show:null,stack:true,title:"",width:300,zIndex:1E3},_create:function(){this.originalTitle=this.element.attr("title");if(typeof this.originalTitle!=="string")this.originalTitle="";this.options.title=this.options.title||this.originalTitle;var a=this,b=a.options,d=b.title||"&#160;",e=c.ui.dialog.getTitleId(a.element),g=(a.uiDialog=c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+
b.dialogClass).css({zIndex:b.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(i){if(b.closeOnEscape&&i.keyCode&&i.keyCode===c.ui.keyCode.ESCAPE){a.close(i);i.preventDefault()}}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(i){a.moveToTop(false,i)});a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);var f=(a.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
h=c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){h.addClass("ui-state-hover")},function(){h.removeClass("ui-state-hover")}).focus(function(){h.addClass("ui-state-focus")}).blur(function(){h.removeClass("ui-state-focus")}).click(function(i){a.close(i);return false}).appendTo(f);(a.uiDialogTitlebarCloseText=c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);c("<span></span>").addClass("ui-dialog-title").attr("id",
e).html(d).prependTo(f);if(c.isFunction(b.beforeclose)&&!c.isFunction(b.beforeClose))b.beforeClose=b.beforeclose;f.find("*").add(f).disableSelection();b.draggable&&c.fn.draggable&&a._makeDraggable();b.resizable&&c.fn.resizable&&a._makeResizable();a._createButtons(b.buttons);a._isOpen=false;c.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;a.overlay&&a.overlay.destroy();a.uiDialog.hide();a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
a.uiDialog.remove();a.originalTitle&&a.element.attr("title",a.originalTitle);return a},widget:function(){return this.uiDialog},close:function(a){var b=this,d,e;if(false!==b._trigger("beforeClose",a)){b.overlay&&b.overlay.destroy();b.uiDialog.unbind("keypress.ui-dialog");b._isOpen=false;if(b.options.hide)b.uiDialog.hide(b.options.hide,function(){b._trigger("close",a)});else{b.uiDialog.hide();b._trigger("close",a)}c.ui.dialog.overlay.resize();if(b.options.modal){d=0;c(".ui-dialog").each(function(){if(this!==
b.uiDialog[0]){e=c(this).css("z-index");isNaN(e)||(d=Math.max(d,e))}});c.ui.dialog.maxZ=d}return b}},isOpen:function(){return this._isOpen},moveToTop:function(a,b){var d=this,e=d.options;if(e.modal&&!a||!e.stack&&!e.modal)return d._trigger("focus",b);if(e.zIndex>c.ui.dialog.maxZ)c.ui.dialog.maxZ=e.zIndex;if(d.overlay){c.ui.dialog.maxZ+=1;d.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=c.ui.dialog.maxZ)}a={scrollTop:d.element.attr("scrollTop"),scrollLeft:d.element.attr("scrollLeft")};c.ui.dialog.maxZ+=
1;d.uiDialog.css("z-index",c.ui.dialog.maxZ);d.element.attr(a);d._trigger("focus",b);return d},open:function(){if(!this._isOpen){var a=this,b=a.options,d=a.uiDialog;a.overlay=b.modal?new c.ui.dialog.overlay(a):null;a._size();a._position(b.position);d.show(b.show);a.moveToTop(true);b.modal&&d.bind("keypress.ui-dialog",function(e){if(e.keyCode===c.ui.keyCode.TAB){var g=c(":tabbable",this),f=g.filter(":first");g=g.filter(":last");if(e.target===g[0]&&!e.shiftKey){f.focus(1);return false}else if(e.target===
f[0]&&e.shiftKey){g.focus(1);return false}}});c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();a._isOpen=true;a._trigger("open");return a}},_createButtons:function(a){var b=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);b.uiDialog.find(".ui-dialog-buttonpane").remove();typeof a==="object"&&a!==null&&c.each(a,
function(){return!(d=true)});if(d){c.each(a,function(f,h){h=c.isFunction(h)?{click:h,text:f}:h;var i=c('<button type="button"></button>').click(function(){h.click.apply(b.element[0],arguments)}).appendTo(g);c.each(h,function(j,k){if(j!=="click")j in o?i[j](k):i.attr(j,k)});c.fn.button&&i.button()});e.appendTo(b.uiDialog)}},_makeDraggable:function(){function a(f){return{position:f.position,offset:f.offset}}var b=this,d=b.options,e=c(document),g;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",
handle:".ui-dialog-titlebar",containment:"document",start:function(f,h){g=d.height==="auto"?"auto":c(this).height();c(this).height(c(this).height()).addClass("ui-dialog-dragging");b._trigger("dragStart",f,a(h))},drag:function(f,h){b._trigger("drag",f,a(h))},stop:function(f,h){d.position=[h.position.left-e.scrollLeft(),h.position.top-e.scrollTop()];c(this).removeClass("ui-dialog-dragging").height(g);b._trigger("dragStop",f,a(h));c.ui.dialog.overlay.resize()}})},_makeResizable:function(a){function b(f){return{originalPosition:f.originalPosition,
originalSize:f.originalSize,position:f.position,size:f.size}}a=a===l?this.options.resizable:a;var d=this,e=d.options,g=d.uiDialog.css("position");a=typeof a==="string"?a:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:a,start:function(f,h){c(this).addClass("ui-dialog-resizing");d._trigger("resizeStart",f,b(h))},resize:function(f,h){d._trigger("resize",
f,b(h))},stop:function(f,h){c(this).removeClass("ui-dialog-resizing");e.height=c(this).height();e.width=c(this).width();d._trigger("resizeStop",f,b(h));c.ui.dialog.overlay.resize()}}).css("position",g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(a){var b=[],d=[0,0],e;if(a){if(typeof a==="string"||typeof a==="object"&&"0"in a){b=a.split?a.split(" "):
[a[0],a[1]];if(b.length===1)b[1]=b[0];c.each(["left","top"],function(g,f){if(+b[g]===b[g]){d[g]=b[g];b[g]=f}});a={my:b.join(" "),at:b.join(" "),offset:d.join(" ")}}a=c.extend({},c.ui.dialog.prototype.options.position,a)}else a=c.ui.dialog.prototype.options.position;(e=this.uiDialog.is(":visible"))||this.uiDialog.show();this.uiDialog.css({top:0,left:0}).position(c.extend({of:window},a));e||this.uiDialog.hide()},_setOptions:function(a){var b=this,d={},e=false;c.each(a,function(g,f){b._setOption(g,f);
if(g in m)e=true;if(g in n)d[g]=f});e&&this._size();this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",d)},_setOption:function(a,b){var d=this,e=d.uiDialog;switch(a){case "beforeclose":a="beforeClose";break;case "buttons":d._createButtons(b);break;case "closeText":d.uiDialogTitlebarCloseText.text(""+b);break;case "dialogClass":e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all "+b);break;case "disabled":b?e.addClass("ui-dialog-disabled"):
e.removeClass("ui-dialog-disabled");break;case "draggable":var g=e.is(":data(draggable)");g&&!b&&e.draggable("destroy");!g&&b&&d._makeDraggable();break;case "position":d._position(b);break;case "resizable":(g=e.is(":data(resizable)"))&&!b&&e.resizable("destroy");g&&typeof b==="string"&&e.resizable("option","handles",b);!g&&b!==false&&d._makeResizable(b);break;case "title":c(".ui-dialog-title",d.uiDialogTitlebar).html(""+(b||"&#160;"));break}c.Widget.prototype._setOption.apply(d,arguments)},_size:function(){var a=
this.options,b,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0});if(a.minWidth>a.width)a.width=a.minWidth;b=this.uiDialog.css({height:"auto",width:a.width}).height();d=Math.max(0,a.minHeight-b);if(a.height==="auto")if(c.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();a=this.element.css("height","auto").height();e||this.uiDialog.hide();this.element.height(Math.max(a,d))}else this.element.height(Math.max(a.height-
b,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}});c.extend(c.ui.dialog,{version:"1.8.13",uuid:0,maxZ:0,getTitleId:function(a){a=a.attr("id");if(!a){this.uuid+=1;a=this.uuid}return"ui-dialog-title-"+a},overlay:function(a){this.$el=c.ui.dialog.overlay.create(a)}});c.extend(c.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),
create:function(a){if(this.instances.length===0){setTimeout(function(){c.ui.dialog.overlay.instances.length&&c(document).bind(c.ui.dialog.overlay.events,function(d){if(c(d.target).zIndex()<c.ui.dialog.overlay.maxZ)return false})},1);c(document).bind("keydown.dialog-overlay",function(d){if(a.options.closeOnEscape&&d.keyCode&&d.keyCode===c.ui.keyCode.ESCAPE){a.close(d);d.preventDefault()}});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var b=(this.oldInstances.pop()||c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),
height:this.height()});c.fn.bgiframe&&b.bgiframe();this.instances.push(b);return b},destroy:function(a){var b=c.inArray(a,this.instances);b!=-1&&this.oldInstances.push(this.instances.splice(b,1)[0]);this.instances.length===0&&c([document,window]).unbind(".dialog-overlay");a.remove();var d=0;c.each(this.instances,function(){d=Math.max(d,this.css("z-index"))});this.maxZ=d},height:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
b=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);return a<b?c(window).height()+"px":a+"px"}else return c(document).height()+"px"},width:function(){var a,b;if(c.browser.msie&&c.browser.version<7){a=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);b=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);return a<b?c(window).width()+"px":a+"px"}else return c(document).width()+"px"},resize:function(){var a=c([]);c.each(c.ui.dialog.overlay.instances,
function(){a=a.add(this)});a.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);
;/*
 * jQuery UI Menu 1.9m3
 * 
 * Copyright 2010, AUTHORS.txt
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Menu
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function(c){var i=0;c.widget("ui.menu",{_create:function(){var a=this;this.menuId=this.element.attr("id")||"ui-menu-"+i++;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({id:this.menuId,role:"listbox"}).bind("click.menu",function(b){if(a.options.disabled)return false;if(c(b.target).closest(".ui-menu-item a").length){b.preventDefault();a.select(b)}}).bind("mouseover.menu",function(b){if(!a.options.disabled){var d=c(b.target).closest(".ui-menu-item");d.length&&d.parent()[0]===
a.element[0]&&a.activate(b,d)}}).bind("mouseout.menu",function(b){if(!a.options.disabled){var d=c(b.target).closest(".ui-menu-item");d.length&&d.parent()[0]===a.element[0]&&a.deactivate(b)}});this.refresh();if(!this.options.input)this.options.input=this.element.attr("tabIndex",0);this.options.input.bind("keydown.menu",function(b){if(!a.options.disabled)switch(b.keyCode){case c.ui.keyCode.PAGE_UP:a.previousPage();b.preventDefault();b.stopImmediatePropagation();break;case c.ui.keyCode.PAGE_DOWN:a.nextPage();
b.preventDefault();b.stopImmediatePropagation();break;case c.ui.keyCode.UP:a.previous();b.preventDefault();b.stopImmediatePropagation();break;case c.ui.keyCode.DOWN:a.next();b.preventDefault();b.stopImmediatePropagation();break;case c.ui.keyCode.ENTER:a.select();b.preventDefault();b.stopImmediatePropagation();break}})},destroy:function(){c.Widget.prototype.destroy.apply(this,arguments);this.element.removeClass("ui-menu ui-widget ui-widget-content ui-corner-all").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-activedescendant");
this.element.children(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").children("a").removeClass("ui-corner-all").removeAttr("tabIndex").unbind(".menu")},refresh:function(){this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem").children("a").addClass("ui-corner-all").attr("tabIndex",-1)},activate:function(a,b){var d=this;this.deactivate();if(this._hasScroll()){var e=parseFloat(c.curCSS(this.element[0],"borderTopWidth",true))||0,f=parseFloat(c.curCSS(this.element[0],
"paddingTop",true))||0;e=b.offset().top-this.element.offset().top-e-f;f=this.element.attr("scrollTop");var g=this.element.height(),h=b.height();if(e<0)this.element.attr("scrollTop",f+e);else e+h>g&&this.element.attr("scrollTop",f+e-g+h)}this.active=b.first().children("a").addClass("ui-state-hover").attr("id",function(k,j){return d.itemId=j||d.menuId+"-activedescendant"}).end();this.element.removeAttr("aria-activedescenant").attr("aria-activedescenant",d.itemId);this._trigger("focus",a,{item:b})},
deactivate:function(a){if(this.active){var b=this;this.active.children("a").removeClass("ui-state-hover");c("#"+b.menuId+"-activedescendant").removeAttr("id");this.element.removeAttr("aria-activedescenant");this._trigger("blur",a);this.active=null}},next:function(a){this._move("next",".ui-menu-item","first",a)},previous:function(a){this._move("prev",".ui-menu-item","last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},
_move:function(a,b,d,e){if(this.active){a=this.active[a+"All"](".ui-menu-item").eq(0);a.length?this.activate(e,a):this.activate(e,this.element.children(b)[d]())}else this.activate(e,this.element.children(b)[d]())},nextPage:function(a){if(this._hasScroll())if(!this.active||this.last())this.activate(a,this.element.children(".ui-menu-item").first());else{var b=this.active.offset().top,d=this.element.height(),e;this.active.nextAll(".ui-menu-item").each(function(){e=c(this);return c(this).offset().top-
b-d<0});this.activate(a,e)}else this.activate(a,this.element.children(".ui-menu-item")[!this.active||this.last()?"first":"last"]())},previousPage:function(a){if(this._hasScroll())if(!this.active||this.first())this.activate(a,this.element.children(".ui-menu-item").last());else{var b=this.active.offset().top,d=this.element.height(),e;this.active.prevAll(".ui-menu-item").each(function(){e=c(this);return c(this).offset().top-b+d>0});this.activate(a,e)}else this.activate(a,this.element.children(".ui-menu-item")[!this.active||
this.first()?":last":":first"]())},_hasScroll:function(){return this.element.height()<this.element.attr("scrollHeight")},select:function(a){this._trigger("select",a,{item:this.active})}})})(jQuery);
;/*
 * jQuery UI Tooltip 1.9m3
*
* Copyright 2010, AUTHORS.txt
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* http://docs.jquery.com/UI/Tooltip
*
* Depends:
*	jquery.ui.core.js
*	jquery.ui.widget.js
*	jquery.ui.position.js
*/
(function(c){var f=0;c.widget("ui.tooltip",{options:{items:"[title]",content:function(){return c(this).attr("title")},position:{my:"left center",at:"right center",offset:"15 0"}},_create:function(){var b=this;this.tooltip=c("<div></div>").attr("id","ui-tooltip-"+f++).attr("role","tooltip").attr("aria-hidden","true").addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content").appendTo(document.body).hide();this.tooltipContent=c("<div></div>").addClass("ui-tooltip-content").appendTo(this.tooltip);
this.opacity=this.tooltip.css("opacity");this.element.bind("focus.tooltip mouseover.tooltip",function(a){b.open(a)}).bind("blur.tooltip mouseout.tooltip",function(a){b.close(a)})},enable:function(){this.options.disabled=false},disable:function(){this.options.disabled=true},destroy:function(){this.tooltip.remove();c.Widget.prototype.destroy.apply(this,arguments)},widget:function(){return this.element.pushStack(this.tooltip.get())},open:function(b){var a=c(b&&b.target||this.element).closest(this.options.items);
if(!(this.current&&this.current[0]==a[0])){var d=this;this.current=a;this.currentTitle=a.attr("title");var e=this.options.content.call(a[0],function(g){setTimeout(function(){d.current==a&&d._show(b,a,g)},13)});e&&d._show(b,a,e)}},_show:function(b,a,d){if(d){a.attr("title","");if(!this.options.disabled){this.tooltipContent.html(d);this.tooltip.css({top:0,left:0}).show().position(c.extend({of:a},this.options.position)).hide();this.tooltip.attr("aria-hidden","false");a.attr("aria-describedby",this.tooltip.attr("id"));
this.tooltip.stop(false,true).fadeIn();this._trigger("open",b)}}},close:function(b){if(this.current){var a=this.current.attr("title",this.currentTitle);this.current=null;if(!this.options.disabled){a.removeAttr("aria-describedby");this.tooltip.attr("aria-hidden","true");this.tooltip.stop(false,true).fadeOut();this._trigger("close",b)}}}})})(jQuery);
;

var lhsOrModal = "lhs";

function trackHbLink(lid, lpos) {
	if (isSecure()) {
		return false;
	}
	if ("undefined" != typeof _hbLink && "undefined" != typeof _hbq && "undefined" != typeof lid) {
		_hbLink(lid, lpos);
	}
	return true;
}

function isSecure() {
	if (typeof jwgData != "undefined" && typeof jwgData.runtime != 'undefined' && typeof jwgData.runtime.secure != 'undefined' && jwgData.runtime.secure) {
		return true;
	}
	return false;
}

function trackLog(str) {
	if (isSecure()) {
		str = "NOT TRACKING BECAUSE OF HTTPS: " + str;
	}
	if (typeof jwgData != "undefined" && typeof jwgData.flag != 'undefined' && jwgData.flag.logTrack && typeof console != "undefined" && typeof console.log == "function") {
		console.log(str);
	}
	if (window.location.href.indexOf("debugTrack=1") > -1) {
		alert(str);
	}
}

function track_click(lid_lpos,subreferrervalueandtitle)
{
	if (lid_lpos) {
		var ar = lid_lpos.split("/");
		var lid = ar[0];
		var lpos = ar[1];
		if (lpos) {
			lpos = lpos.replace(/PAGE/, jwgData.lpos);
			lpos = lpos.replace(/RB/, jwgData.rightbar_lpos);
		}
		if (lhsOrModal!=null && lhsOrModal=='modal') {
			lid = lid + '_Popup';
		}
		trackHbLink(lid, lpos);
		trackLog('track("' + lid + (lpos ? '", "' + lpos :"")+'");');	}
	if (subreferrervalueandtitle) {
		add_sub_referer(subreferrervalueandtitle);
	}
}

function trackHbDownload(id) {
	if (isSecure()) {
		return false;
	}
	if ("undefined" != typeof _hbDownload && "undefined" != typeof id) {
		_hbDownload(id);
	}
	return true;
}

function trackCustomMetrics(cvObjValues) {
	cv = _hbEvent("cv");
	var log = "";
	for (var c in cvObjValues) {
		cv[c] = cvObjValues[c];
		log += ("" != log ? ",\n" : "") + c + ':"' + cvObjValues[c] + '"';
	}
	trackHbDownload("dynamic");
	trackLog("trackCustomMetrics({" + log + "});");
}

//dwhStats.js
function isAnswered(){
	//hbx.mlc
	//'/Super/noAns3/Miscellaneous/Uncategorized' (digit 3 may change)
	//newAns
	//editAns
	//question
	var ans;
	
	if (typeof hbx.mlc == "undefined") {
		ans=false;
	}
	else{
		var a=hbx.mlc;
		ans = a.match(/\/.*\/noAns/);
		if (ans!=null) ans=5;
		else {
			ans = a.match(/\/.*\/question/);
			if (ans!=null) ans=4;
			else ans=0;
		}
	}
	return ans;
}

function add_sub_referer(valueandtitle){
	if (!valueandtitle || typeof valueandtitle == 'undefined') return false;
	
	var ar = valueandtitle.split("|");
	value = ar[0];	
	title = ar[1];
	if (!value || isNaN(value)) return false;
	// truncate title to first 50 chars
	title = title.substr(0,50);

	trackLog('add_sub_referer("'+value + ',' + title +'");');
	
	// save cookie with format value@title
	var subref = value + "@" + escape(title);
	
//save cookies
	var domain = (location.hostname.match("answers.com")) ? "; domain=answers.com" : "";
	document.cookie="subref=" + escape(subref) + "; path=/" + domain;

	return true;
}

jQuery(document).ready( function(){		 
	// Using this coockies to know that this is the first page view in a session to show the ad above the answer.
	// Do not change this coockie w/o checking the showTopGoogleAd() first.
	var theref=readCookie("statref");
	var theurl=readCookie("staturl");
	var thelpans=readCookie("statlpans");
	
	if (theref==null || theref=="")
	{
	  theref = document.referrer;
	  if (theref==null || theref=="")
	  {
	  	theref = 'none';
	  }
	  document.cookie="statref=" +escape(theref)+"; path=/";
	}
	
	if (theurl==null || theurl=="")
	{
		theurl = location.href;
		document.cookie="staturl=" +escape(theurl)+"; path=/";
	}
	
	if (thelpans==null || thelpans=="")
	{
		thelpans = isAnswered();
		document.cookie="statlpans=" +escape(thelpans)+"; path=/";
	}
});

function track(lid, lpos)
{
	if (lpos != null){
		track_click(lid + "/" + lpos);
	} else {
		track_click(lid);
	}
}

$('.track_click').live('click', function(){ track_click($(this).attr('track'), $(this).attr('sub_referrer')); });
var _hbEC=0,_hbE=new Array;function _hbEvent(a,b){b=_hbE[_hbEC++]=new Object();b._N=a;b._C=0;return b;}var hbx=_hbEvent("pv");hbx.vpc="HBX0200u";hbx.gn="a.answers.com";hbx.pn="unknown";if(location.hostname.indexOf(".answers.com")==-1){hbx.acct="DM5607254MCC";}else{hbx.acct="DM560726P4FE62EN3";}hbx.mlc="/unknown";hbx.pndef="title";hbx.ctdef="full";hbx.lt="manual";function isTrue(str){return(str===true||parseInt(str)==1||str.match(/^\s*?true\s*?$/gi));}
function getUserTrackingInfo(){var userTrackingInfo="NotLgd";if(typeof jwgData!='undefined'&&jwgData.isLoggedIn){userTrackingInfo=(jwgData&&jwgData.isSuper)?"Super":"Lgd";}
return userTrackingInfo;}
function getFinalTracking(trackingUrl){var userTrackingInfo=getUserTrackingInfo();trackingUrl=trackingUrl.replace(/(&lpos=[^&]*?)(Super|(Not)?Lgd)/gi,"\$1"+userTrackingInfo);trackingUrl=trackingUrl.replace(/\/(Super|(Not)?Lgd)\//gi,"/"+userTrackingInfo+"/");return trackingUrl;}
function _hbOnPrePV(_1){for(var a=0;a<_IL(document.links);a++){if(_lvid.length+_lvpos.length<_lvm){_LV(document.links[a]);}else{break;}}_ar+="&lv.id="+_lvid+"&lv.pos="+_lvpos;_lvl=-1;}function _NA(a){return new Array(a?a:0);}function _D(v){return(typeof eval("window._"+v)!=_hud)?eval("window._"+v):"";}function _DD(v){return(typeof v!=_hud)?1:0;}function _A(v,c){return escape((_D("lc")=="y"&&_DD(c))?_TL(v):v);}function _B(){return 0;}function _GP(){return(_IL(_D("protocol"))>0)?_protocol+"://":(location.protocol=="https:"?"https://":"http://");}function _IC(a,b,c){return a.charAt(b)==c?1:0;}function _II(a,b,c){return a.indexOf(b,c?c:0);}function _IL(a){return a!=_hud?a.length:0;}function _IF(a,b,c){return a.lastIndexOf(b,c?c:_IL(a));}function _IP(a,b){return a.split(b);}function _IS(a,b,c){return b>_IL(a)?"":a.substring(b,c!=null?c:_IL(a));}function _RP(a,b,c,d){d=_II(a,b);if(d>-1){a=_RP(_IS(a,0,d)+","+_IS(a,d+_IL(b),_IL(a)),b,c);}return a;}function _TL(a){return a.toLowerCase();}function _TS(a){return a.toString();}function _TV(){_hbSend();}function _SV(a,b,c){_hbSet(a,b,c);}function _VS(a,b,c,d){c=["C","P","R"];for(d=0;d<_IL(c);d++){if(_II(""+b,"_"+c[d]+"::")==0){b=eval("_R"+c[d]+"V(_IS(b,4,_IL(b)))");}}eval("_"+a+"='"+b+"'");}function _VC(a,b,c,d){b=_IP(a,",");for(c=0;c<_IL(b);c++){d=_IP(b[c],"|");_VS(d[0],(_D(d[0]))?_D(d[0]):d[1]?d[1]:"");}}function _VL(a,b){for(a=0;a<_hbEC;a++){_pv=_hbE[a];if(_pv._N=="pv"){for(b in _pv){if(_EE(b)&&typeof _pv[b]!=_huf){_VS(b,_pv[b]);}}}}_VC("pn|PUT+PAGE+NAME+HERE,mlc|CONTENT+CATEGORY,elf|n,dlf|n,dft|n,pndef|title,ctdef|full,cp|null,hcn|");}function _ER(a,b,c){if(_erf++==0){_hbi.src=_GP()+_gn+"/HG?hc="+_mn+"&hb="+_A(_acct)+"&hec=1&vjs="+_vjs+"&vpc=ERR&ec=1&err="+((typeof a=="string")?_A(a+"-"+c):"Unknown");}_XT("Error",a);}function _EE(a){return(a!="_N"&&a!="_C")?1:0;}function _hbSend(c,a,i){a="";_hec++;for(i in _hbA){if(typeof _hbA[i]!=_huf){a+="&"+i+"="+_hbA[i];}}var watrackingurl=_hbq+"&hec="+_hec+a+_hbSendEV();watrackingurl=getFinalTracking(watrackingurl);_Q(watrackingurl);_hbA=_NA();}function _hbSet(a,b,c,d,e){d=_II(_hbq,"&"+a+"=");if(d>-1){e=_II(_hbq,"&",d+1);e=e>d?e:_IL(_hbq);if(a=="n"||a=="vcon"){_hbq=_IS(_hbq,0,d)+"&"+a+"="+b+_IS(_hbq,e);_hec=-1;if(a=="n"){_pn=b;}else{_mlc=b;}}else{_hbq=_IS(_hbq,0,d)+_IS(_hbq,e);}}if((a!="n")&&(a!="vcon")){_hbA[a]=(c==0)?b:_A(b);}}function _hbRedirect(a,b,c,d,e,f,g){_SV("n",a);_SV("vcon",b);if(_DD(d)&&_IL(d)>0){d=_IC(d,0,"&")?_IS(d,1,_IL(d)):d;e=_IP(d,"&");for(f=0;f<_IL(e);f++){g=_IP(e[f],"=");_SV(g[0],g[1]);}}_TV();if(c!=""){_SV("hec",0);setTimeout("location.href='"+c+"'",500);}}function _hbSendEV(a,b,c,d,e,f,x,i){a="",c="",e=_IL(_hbE);for(b=0;b<e;b++){c=_hbE[b];for(var d in c){if(_EE(d)&&c[d].match){x=c[d].match(/\[\]/g);if(x!=null&&_IL(x)>c._C){c._C=_IL(x);}}}for(d in c){if(_EE(d)&&c[d].match){x=c[d].match(/\[\]/g);x=(x==null)?0:_IL(x);for(i=x;i<c._C;i++){c[d]+="[]";}}}}for(b=0;b<e;b++){c=_hbE[b];for(f=b+1;f<e;f++){if(_hbE[f]!=null&&c._N==_hbE[f]._N){for(d in c){if(_EE(d)&&_hbE[f]!=null){c[d]+="[]"+_hbE[f][d];}_hbE[f][d]="";}}}for(d in c){if(_EE(d)&&c._N!=""&&c._N!="pv"){a+="&"+c._N+"."+d+"="+_RP(_A(c[d]),"%5B%5D",",");}}}_hbE=_NA();_hbEC=0;return a;}function _hbM(a,b,c,d){_SV("n",a);_SV("vcon",b);if(_IL(c)>0){_SV(c,d);}_TV();}function _hbPageView(p,m){_hec=-1;_hbM(p,m,"");}function _hbExitLink(n){_hbM(_pn,_mlc,"el",n);}function _hbDownload(n){_hbM(_pn,_mlc,"fn",n);}function _hbVisitorSeg(n,p,m){_SV("n",p);_SV("vcon",m);_SV("seg",n,1);_TV();}function _hbCampaign(n,p,m){_hbM(p,m,"cmp",n);}function _hbFunnel(n,p,m){_hbM(p,m,"fnl",n);}function _hbGoalPage(n,p,m){_hbM(p,m,"gp",n);}_hbLink=function(a,b,c){_SV("lid",a);if(_DD(b)){_SV("lpos",b);}_XT("Link","");_TV();};function _hbForm(a,b,c,d,e,f){if(_DD(c)){_hlf=c;}_hfs=0,_fa=1,f="Complete",_hfa=0;if(a==0){f="Abandon";_hfa=1;}_XT("Form"+f,b);}function _hbCookie(a,b,c){document.cookie=a+"="+b+";path=/;"+((_DD(c)==1)?"expires="+c:"");}function _LE(a,b,c,d,e,f,g,h,i,j,k,l){b="([0-9A-Za-z\\-]*\\.)",c=location.hostname,d=a.href,h="",i="";eval("__f=/"+b+"*"+b+"/");if(_DD(__f)){__f.exec(c);j=(_DD(_elf))?_elf:"";if(j!="n"){if(_II(j,"!")>-1){h=_IS(j,0,_II(j,"!"));i=_IS(j,_II(j,"!")+1,_IL(j));}else{h=j;}}k=0;if(_DD(_elf)&&_elf!="n"){if(_IL(i)){l=_IP(i,",");for(g=0;g<_IL(l);g++){if(_II(d,l[g])>-1){return;}}}if(_IL(h)){l=_IP(h,",");for(g=0;g<_IL(h);g++){if(_II(d,l[g])>-1){k=1;}}}}if(_II(a.hostname,RegExp.$2)<0||k){e=_IL(d)-1;return _IC(d,e,"/")?_IS(d,0,e):d;}}}function _LD(a,b,c,d,e,f){b=a.pathname,d="",e="";b=_IS(b,_IF(b,"/")+1,_IL(b));c=(_DD(_dlf))?_dlf:"";if(c!="n"){if(_II(c,"!")>-1){d=","+_IS(c,0,_II(c,"!"));e=","+_IS(c,_II(c,"!")+1,_IL(c));}else{d=","+c;}}f=_II(b,"?");b=(f>-1)?_IS(b,0,f):b;if(_IF(b,".")>-1){f=_IS(b,_IF(b,"."),_IL(b));if(_II(_dl+d,f)>-1&&_II(e,f)<0){var dl=b;if(_DD(_dft)){if(_dft=="y"&&a.name){dl=a.name;}else{if(_dft=="full"){dl=a.pathname;if(!_IC(dl,0,"/")){dl="/"+dl;}}}}return dl;}}}function _LP(a,b){for(b=0;b<_IL(a);b++){if(_IL(_lvl)<_lvm){_LV(a[b]);}_EV(a[b],"mousedown",_LT);}}function _LV(a,b,c){b=_LN(a);c=b[0]+b[1];if(_IL(b[0])){_lvid+=_A(b[0])+",";_lvpos+=_A(b[1])+",";_lvl+=c;}}function _LN(a,b,c,d){b=a.href;b+=a.name?a.name:"";c=_LVP(b,_lidt);d=_LVP(b,_lpost);return[c,d];}function _LT(e){if((e.which&&e.which==1)||(e.button&&e.button==1)){var a=document.all?window.event.srcElement:this;for(var i=0;i<4;i++){if(a.tagName&&_TL(a.tagName)!="a"&&_TL(a.tagName)!="area"){a=a.parentElement;}}var b=_LN(a),c="",d="";a.lid=b[0];a.lpos=b[1];if(_D("lt")&&_lt!="manual"){if((a.tagName&&_TL(a.tagName)=="area")){if(!_IL(a.lid)){if(a.parentNode){if(a.parentNode.name){a.lid=a.parentNode.name;}else{a.lid=a.parentNode.id;}}}if(!_IL(a.lpos)){a.lpos=a.coords;}}else{if(_IL(a.lid)<1){a.lid=_LS(a.text?a.text:a.innerText?a.innerText:"");}if(!_IL(a.lid)||_II(_TL(a.lid),"<img")>-1){a.lid=_LI(a);}}}if(!_IL(a.lpos)&&_D("lt")=="auto_pos"&&a.tagName&&_TL(a.tagName)!="area"){c=document.links;for(d=0;d<_IL(c);d++){if(a==c[d]){a.lpos=d+1;break;}}}var _f=0,j="",k="",l=(a.protocol)?_TL(a.protocol):"";if(l&&l!="mailto:"&&l!="javascript:"){j=_LE(a),k=_LD(a);if(_DD(k)){a.fn=k;}else{if(_DD(j)){a.el=j;}}}if(_D("lt")&&_IC(_lt,0,"n")!=1&&_DD(a.lid)&&_IL(a.lid)>0){_SV("lid",a.lid);if(_DD(a.lpos)){_SV("lpos",a.lpos);}_f=1;}if(_DD(a.fn)){_SV("fn",a.fn);_XT("Download",a);_f=2;}else{if(_DD(a.el)){_SV("el",a.el);_XT("ExitLink",a);_f=1;}}if(_f>0){_XT("Link",a);_TV();}}}function _LVP(a,b,c,d,e){c=_II(a,"&"+b+"=");c=c<0?_II(a,"?"+b+"="):c;if(c>-1){d=_II(a,"&",c+_IL(b)+2);e=_IS(a,c+_IL(b)+2,d>-1?d:_IL(a));if(!_echbx){if(!(_II(e,"//")==0)){return e;}}else{return e;}}return"";}function _LI(a){var b=""+a.innerHTML,bu=_TL(b),i=_II(bu,"<img");if(bu&&i>-1){eval("__f=/ srcs*=s*['\"]?([^'\" ]+)['\"]?/i");__f.exec(b);if(RegExp.$1){b=RegExp.$1;}}return b;}function _LSP(a,b,c,d){d=_IP(a,b);return d.join(c);}function _LS(a,b,c,d,e,f,g){c=_D("lim")?_lim:100;b=(_IL(a)>c)?_A(_IS(a,0,c)):_A(a);b=_LSP(b,"%0A","%20");b=_LSP(b,"%0D","%20");b=_LSP(b,"%09","%20");c=_IP(b,"%20");d=_NA();e=0;for(f=0;f<_IL(c);f++){g=_RP(c[f],"%20","");if(_IL(g)>0){d[e++]=g;}}b=d.join("%20");return unescape(b);}function _EM(a,b,c,d){a=_D("fv");b=_II(a,";"),c=parseInt(a);d=3;if(_TL(a)=="n"){d=999;_fv="";}else{if(b>-1){d=_IS(a,0,b);_fv=_IS(a,b+1,_IL(a));}else{if(c>0){d=c;_fv="";}}}return d;}function _FF(e){var a=(_bnN)?this:_EVO(e);_hlf=(a.lf)?a.lf:"";}function _FU(e){if(_hfs==0&&_IL(_hlf)>0&&_fa==1){_hfs=1;if(_hfc&&!_hfa){_SV("sf","1");_XT("FormComplete",_hfc);}else{if(_IL(_hlf)>0){_SV("lf",_hlf);_XT("FormAbandon",_hlf);}}_TV();_hlf="",_hfs=0,_hfc=0;}}function _FO(e){var a=true;if(_DD(this._FS)){eval("try{a=this._FS()}catch(e){}");}if(a!=false){_hfc=1;}return a;}function _FA(a,b,c,d,e,f,g,h,i,ff,fv,s){b=a.forms;ff=new Object();f=_EM();for(c=0;c<_IL(b);c++){ff=b[c],d=0,s=0,e=ff.elements;g=ff.name?ff.name:"forms["+c+"]";for(h=0;h<_IL(e);h++){if(e[h].type&&"hiddenbuttonsubmitimagereset".indexOf(e[h].type)<0&&d++>=f){break;}}if(d>=f){_fa=1;for(h=0;h<_IL(e);h++){i=e[h];if(i.type&&"hiddenbuttonsubmitimagereset".indexOf(i.type)<0){i.lf=g+".";i.lf+=(i.name&&i.name!="")?i.name:"elements["+h+"]";_EV(i,"focus",_FF);}}ff._FS=null;ff._FS=ff.onsubmit;if(_DD(ff._FS)&&ff._FS!=null){ff.onsubmit=_FO;}else{if(!(_bnN&&_bv<5)&&_hM&&!(_bnI&&!_I5)){if((!_bnI)||(_II(navigator.userAgent,"Opera")>-1)){ff.onsubmit=_FO;}else{_EV(ff,"submit",_FO);eval("try{document.forms["+c+"]._FS=document.forms["+c+"].submit;document.forms["+c+"].submit=_FO;throw ''}catch(E){}");}}}}}}function _GR(a,b,c,d){if(!_D("hrf")){return a;}if(_II(_hrf,"http",0)>-1){return _hrf;}b=window.location.search;b=_IL(b)>1?_IS(b,1,_IL(b)):"";c=_II(b,_hrf+"=");if(c>-1){d=_II(b,"&",c+1);d=d>c?d:_IL(b);b=_IS(b,c+_IL(_hrf)+1,d);}return(b!=_hud&&_IL(b)>0)?b:a;}function _PO(a,b,c,d,e,f,g){d=location,e=d.pathname,f=_IS(e,_IF(e,"/")+1),g=document.title;if(a&&b==c){return(_pndef=="title"&&g!=""&&g!=d&&!(_bnN&&_II(g,"http")>0))?g:f?f:_pndef;}else{return b==c?(e==""||e=="/")?"/":_IS(e,(_ctdef!="full")?_IF(e,"/",_IF(e,"/")-2):_II(e,"/"),_IF(e,"/")):(b=="/")?b:((_II(b,"/")?"/":"")+(_IF(b,"/")==_IL(b)-1?_IS(b,0,_IL(b)-1):b));}}function _PP(a,b,c,d){return""+(c>-1?_PO(b,_IS(a,0,c),d)+";"+_PP(_IS(a,c+1),b,_II(_IS(a,c+1),";")):_PO(b,a,d));}function _NN(a){return _D(a)!="none";}function _E(a){var b="";var d=_IP(a,",");for(var c=0;c<_IL(d);c++){b+="&"+d[c]+"="+_A(_D(d[c]));}return b;}function _F(a,b){return(!_II(a,"?"+b+"="))?0:_II(a,"&"+b+"=");}function _G(a,b,c,d){var e=_F(a,b);if(d&&e<0&&top&&window!=top){e=_F(_tls,b);if(e>-1){a=_tls;}}return(e>-1)?_IS(a,e+2+_IL(b),(_II(a,"&",e+1)>-1)?_II(a,"&",e+1):_IL(a)):c;}function _H(a,b,c){if(!a){a=c;}if(_I5||_N6){eval("try{_vv=_G(location.search,'"+a+"','"+b+"',1)}"+__c+"{}");}else{_vv=_G(location.search,a,b,1);}return unescape(_vv);}function _I(a,b,c,d){__f=_IS(a,_II(a,"?"));if(b){if(_I5||_N6){eval("try{_hra=_G(__f,_hqsr,_hra,0)}"+__c+"{}");}else{_hra=_G(__f,_hqsr,_hra,0);}}if(c&&!_hra){if(_I5||_N6){eval("try{_hra=_G(location.search,_hqsp,_hra,1)}"+__c+"{}");}else{_hra=_G(location.search,_hqsp,_hra,1);}}if(d&&!_hra){_hra=d;}return _hra;}function _J(a,b,c,d){c=_II(a,"CP=");d=_II(a,b,c+3);return(c<0)?"null":_IS(a,c+3,(d<0)?_IL(a):d);}function _PV(){_dcmpe=_H(_D("dcmpe"),_D("dcmpe"),"DCMPE");_dcmpre=_H(_D("dcmpre"),_D("dcmpre"),"DCMPRE");_vv="";_cmp=_H(_D("cmpn"),_D("cmp"),"CMP");_gp=_H(_D("gpn"),_D("gp"),"GP");_dcmp=_H(_D("dcmpn"),_D("dcmp"),"DCMP");if(_II(_cmp,"SFS-")>-1){document.cookie="HBCMP="+_cmp+"; path=/;"+(_D("cpd")&&_D("cpd")!=""?(" domain=."+_D("cpd")+"; "):"")+_ex;}if(_bnI&&_bv>3){_ln=navigator.userLanguage;}if(_bnN){if(_bv>3){_ln=navigator.language;}if(_bv>2){for(var i=0;i<_IL(navigator.plugins);i++){_pl+=navigator.plugins[i].name+":";}}}_cp=_D("cp");if(location.search&&_TL(_cp)=="null"){_cp=_J(location.search,"&");}if(_II(document.cookie,"CP=")>-1){_ce="y";_hd=_J(document.cookie,"*");if(_TL(_hd)!="null"&&_cp=="null"){_cp=_hd;}else{document.cookie="CP="+_cp+_hck;}}else{document.cookie="CP="+_cp+_hck;_ce=(_II(document.cookie,"CP=")>-1)?"y":"n";}if(window.screen){_sv=12;_ss=screen.width+"*"+screen.height;_sc=_bnI?screen.colorDepth:screen.pixelDepth;if(_sc==_hud){_sc="na";}}_ra=_NA();if(_ra.toSource||(_bnI&&_ra.shift)){_sv=13;}if(!(_bnN&&_bv<5)&&!_bnI&&_hM){eval("try{throw _sv=14}catch(e){}");}if((new Date()).toDateString){_sv=15;}if(_hbA.every){_sv=16;}if(_I5&&_hM){if(_II(""+navigator.appMinorVersion,"Privacy")>-1){_ce="p";}if(document.body&&document.body.addBehavior){document.body.addBehavior("#default#homePage");_hp=document.body.isHomePage(location.href)?"y":"n";document.body.addBehavior("#default#clientCaps");_cy=document.body.connectionType;}}var _db=(_DD(_hcn))?_D("hcv"):"";if(!_D("gn")){_gn="ehg.hitbox.com";}if(_D("ct")&&!_D("mlc")){_mlc=_ct;}_XT("PrePVR","");_ar=_GP()+_gn+"/HG?hc="+_mn+"&hb="+_A(_acct)+"&cd=1&hv=6&n="+_A(_pn,1)+"&con=&vcon="+_A(_mlc,1)+"&tt="+_D("lt")+"&ja="+(navigator.javaEnabled()?"y":"n")+"&dt="+(new Date()).getHours()+"&zo="+(new Date()).getTimezoneOffset()+"&lm="+Date.parse(document.lastModified)+(_tp?("&pt="+_tp):"")+_E((_bnN?"bn,":"")+"ce,ss,sc,sv,cy,hp,ln,vpc,vjs,hec,pec,cmp,gp,dcmp,dcmpe,dcmpre,cp,fnl")+"&seg="+_D("seg")+"&epg="+_D("epg")+"&cv="+_A(_db)+"&gn="+_A(_D("hcn"))+"&ld="+_A(_D("hlt"))+"&la="+_A(_D("hla"))+"&c1="+_A(_D("hc1"))+"&c2="+_A(_D("hc2"))+"&c3="+_A(_D("hc3"))+"&c4="+_A(_D("hc4"))+"&customerid="+_A(_D("ci")?_ci:_D("cid"))+"&ttt="+_lidt+","+_lpost;if(_I5||_N6){eval("try{_rf=_A(top.document"+__r+")+''}"+__c+"{_rf=_A(document"+__r+")+''}");}else{if(top.document&&_IL(parent.frames)>1){_rf=_A(eval("document"+__r))+"";}else{if(top.document){_rf=_A(eval("top.document"+__r))+"";}}}if((_rf==_hud)||(_rf=="")){_rf="bookmark";}_rf=unescape(_rf);_rf=_GR(_rf);_hra=_I(_rf,_D("hqsr"),_D("hqsp"),_hrat);_ar+="&ra="+_A(_hra)+"&pu="+_A(_IS(eval("document.URL")+"",0,_pum))+_hbSendEV()+"&rf=";_ar+=(_IL(_ar)+_IL(_rf)<2048)?_A(_rf):"bookmark";if(_IL(_ar)+_IL(_pl)<2048){_ar+="&pl="+_A(_pl);}_XT("PrePV",_ar);if(_D("onlyMedia")!="y"){_hbi.src=_ar+"&hid="+Math.random();}_hbq=_IS(_ar,0,_II(_ar,"&hec"));_XT("PostPV",_ar);_hbE=_NA();}function _Q(a){a+="&hid="+Math.random();if(_hif==0){_hif=1;_hbs="";_hbs=new Image();_hbs.src=a;}else{_hif=0;_hbi="";_hbi=new Image();_hbi.src=a;}}function __X(a){if(_echbx==0){_echbx=1;a=document;if(_NN("lt")||_NN("dlf")||_NN("elf")){_LP(a.links);}if(_NN("fv")){_FA(a);}if(_NN("lt")&&_IL(_lvl)>0&&_lvl!=-1){_SV("lv.id",_lvid,1);_SV("lv.pos",_lvpos,1);_TV();}}}function _EV(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,false);}else{if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c);}}}function _EVO(e){return document.all?window.event.srcElement:this;}function _RCV(a,b,c,d){b=document.cookie;c=_II(b,a+"=");d="";if(c>-1){d=_II(b,";",c+1);d=(d>0)?d:_IL(b);d=(d>c)?_IS(b,c+_IL(a)+1,d):"";}return d;}function _RRV(a){return(_LVP(document.referrer,a));}function _RPV(a){return(_LVP(document.URL,a));}function _XT(a,b){if(typeof _D("hbOn"+a)==_huf){eval("_hbOn"+a+"(b)");}}String.prototype.trim=function(){a=this.replace(/^\s+/,"");return a.replace(/\s+$/,"");};function _answ_hbxInit(_eb,pn,mlc,_ee,_ef,_f0,_f1,_f2){hbx.acct=_eb;var ref;if(pn){hbx.pn=pn;}if(mlc){hbx.mlc=mlc;}if(_ee||_ef||_f0||_f1){cv=_hbEvent("cv");}if(_ee){cv.c8=_ee;ref=_ee.split("|")[0].trim();if(ref){ref=ref.replace(" ","_");}ref="http://www."+ref+".com";hbx.hrf=ref;}if(_ef){cv.c9=_ef;}if(_f0){cv.c7=_f0;}if(_f1){cv.c5=_f1;}if(_f2){cv.c12=_f2;}_vjs="HBX0201.03u";_dl=".exe,.zip,.wav,.wmv,.mp3,.mov,.mpg,.avi,.doc,.pdf,.xls,.ppt,.gz,.bin,.hqx,.dmg";_mn=_hbq="",_hbA=_NA(),_hud="undefined",_huf="function",_echbx=_if=_ll=_hec=_hfs=_hfc=_hfa=_ic=_pC=_fc=_pv=0,_hbi=_hbs=new Image(),_hbin=_NA(),_pA=_NA();_lvid=_lvpos=_lvl="";_hbE=_D("hbE")?_hbE:"";_hbEC=_D("hbEC")?_hbEC:0;_ex="expires=Wed, 1 Jan 2020 00:00:00 GMT",_lvm=300,_lidt="lid",_lpost="lpos",_pum=_erf=_hif=0;_VL();_EV(window,"error",_ER);_mlc=_PP(_mlc,0,_II(_mlc,";"),"CONTENT+CATEGORY");_pn=_PP(_pn,1,_II(_pn,";"),"PUT+PAGE+NAME+HERE");__r=".referrer",_rf=_A(eval("document"+__r)),_et=0,_oe=0,_we=0,_ar="",_hM=(!(_II(navigator.userAgent,"Mac")>-1)),_tls="";_bv=parseInt(navigator.appVersion);_bv=(_bv>99)?(_bv/100):_bv;var _f4;__f=_f4,_hrat=_D("hra"),_hra="",__c="catch(_e)",_fa=0,_hlfs=0,_hoc=0,_hlf="",_ce="",_ln="",_pl="",_bn=navigator.appName,_bn=(_II(_bn,"Microsoft")?_bn:"MSIE"),_bnN=(_bn=="Netscape"),_bnI=(_bn=="MSIE"),_hck="*; path=/; "+(_D("cpd")&&_D("cpd")!=""?(" domain=."+_D("cpd")+"; "):"")+_ex,_N6=(_bnN&&_bv>4),_I5=false,_ss="na",_sc="na",_sv=11,_cy="u",_hp="u",_tp=_D("ptc");if(_bn=="MSIE"){_nua=navigator.userAgent,_is=_II(_nua,_bn),_if=_II(_nua,".",_is);if(_if>_is){_I5=_nua.substring(_is+5,_if)>=5;}}if(_N6||_I5){eval("try{_tls=top.location.search}catch(_e){}");}_PV();_EV(window,"load",__X);_EV(window,"unload",_FU);eval("setTimeout(\"__X()\",3000)");}
var layout_resize = (function() {
	var cookie_name = 'pg_wdt';
	var cookie_expire = '30'; // days
	var page = 'fat';

	var set_cookie = function(value) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + cookie_expire);
		var c_value = escape(value) + ( ( cookie_expire == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = cookie_name + "=" + value;
	}

	var check_cookie = function() {
		var i,x,y,ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x = x.replace(/^\s+|\s+$/g,"");
			if (x == cookie_name) {
				page = unescape(y);
				return true;
			}
		}

		return false;
	}

	var make_thin = function(attempt) {
		if(!attempt) attempt = 1;

		var body = document.getElementsByTagName('body');
		if(body.length > 0) {
			document.getElementsByTagName('body')[0].className += ' slim';
		} else if(attempt < 5) {
			attempt++;
			setTimeout(function(){make_thin(attempt)}, 100);
		}
	}

	var make_fat = function(attempt) {
		if(!attempt) attempt = 1;

		var body = document.getElementsByTagName('body');
		if(body.length > 0) {
			document.getElementsByTagName('body')[0].className.replace('slim', '');
		} else if(attempt < 5) {
			attempt++;
			setTimeout(function(){make_thin(attempt)}, 100);
		}
	}
	
	return {
		init: function() {
			if(layout_resize.is_low_res()) {
				page = 'slim';
				//make_thin();

				// Pulled from: /skins/screen/DEFAULT/scripts/rightBar.js
				function handleNoRightBar() {
					if(document.body.className) {
						clearInterval(noRightBarInterval);
						document.body.className += " slim";
					}
				}
				var noRightBarInterval = setInterval(handleNoRightBar, 10);
			} else {
				page = 'fat';
				//make_fat();
			}

			if(!check_cookie()) {
				set_cookie(page);
			}
		},

		is_low_res: function() {
			return ((screen.availWidth < 1250 || location.search.indexOf("rightbar=0")!=-1) && location.search.indexOf("rightbar=1")==-1? true : false);
		}
	}
})();

layout_resize.init();

// For Firefox < 3.6
if(document.readyState == null && document.addEventListener){
	document.addEventListener("DOMContentLoaded", function DOMContentLoaded(){
		document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
		document.readyState = "complete";
	}, false);
	document.readyState = "loading";
}

var links_google_obj = function() {
	var adsText = "Ads";
	var sponsoredlinksText = "Sponsored Links";
	var numGoolgeAdsRetured = null;
	var debug = false;
	var page_type = false;
	var noads_in_first_ds = false;
	var ads_on_first_ds = 2;

	var find_by_class = function(node, tag, classname) {
		if (node.getElementsByClassName) { // use native implementation if available
			return node.getElementsByClassName(classname);
		} else {
			return (function getElementsByClass(searchClass,node) {
				if ( node == null )
					node = document;
				var classElements = [],
					els = node.getElementsByTagName(tag),
					elsLen = els.length,
					pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

				for (var i = 0, j = 0; i < elsLen; i++) {
					if ( pattern.test(els[i].className) ) {
						classElements[j] = els[i];
						j++;
					}
				}
				return classElements;
			})(classname, node);
		}
	}

	var get_block = function(type, num) {
		print_debug('Looking for: div.links_google div.'+type+num+' ul');
		
		//return jQuery('div.links_google div.'+type+num+' ul');
		var divs = find_by_class(document, 'div', type+num);
		if(divs[0]) {
			// Look for and inject the adinfo link
			if(type != 'radlinks') {
				inject_ad_info_link(type, divs[0]);
			}
			// Show the header and footer for this block
			show_ad_block(divs[0]);
			// Return the ul for ad unit insertion
			return divs[0].getElementsByTagName('ul')[0];
		}

		return false;
	}

	var show_ad_block = function(el) {
		el.parentNode.style.display = 'block';
	}

	var inject_ad_info_link = function(type, el) {
		var atag = el.getElementsByTagName('a');
		if(atag.length == 0 && links_google.meta[type]) {
			var infolink = document.createElement('a');
			infolink.className = 'adinfo';
			infolink.href = links_google.meta[type]['feedback_url'];
			infolink.innerHTML = 'Ads';
			el.appendChild(infolink);
		} else if(type == 'afs') {
			var atag = find_by_class(el, 'div', 'adinfo');
			if(atag.length == 0) {			
				var infolink = document.createElement('div');
				infolink.className = 'adinfo';
				infolink.innerHTML = 'Ads';
				el.appendChild(infolink);
			}
		} else if(type == 'afc') {
			var atag = find_by_class(el, 'div', 'adinfo');
			if(atag.length == 0) {			
				var infolink = document.createElement('div');
				infolink.className = 'adinfo';
				infolink.innerHTML = 'Ads';
				el.appendChild(infolink);
			}
		}
	}

	var get_template = function(type) {
		if(links_google.templates[type]) {
			return links_google.templates[type];
		}

		return links_google.templates['default'];
	}

	var get_unit_html = function(type, unit, n) {
		var string = get_template(type);
		if(type=='radlinks'){
			url = 'http://links.answers.com/search.php?client=ca-gurunet_radlinks_js&format=fp_al_lp&output=html&channel='+links_google.channel+'&url=' + encodeURIComponent(window.location) + '&kw_type=radlink&hl=en&rt=' + unit.radlink_token + '&kw=' + unit.url_escaped_term;
        
			string = string.replace(/##URL##/g, url);
			string = string.replace('##HEADLINE##', unit.term);
			string = string.replace(/##WSS##/g, get_WSS_tracking(type, n));
			string = string.replace(/##\w+##/g, '');
		}
		else{
			string = string.replace(/##URL##/g, unit.url);
			string = string.replace('##HEADLINE##', unit.line1);
			string = string.replace('##DISPLAY_URL##', unit.visible_url);
			string = string.replace('##DESC_1##', unit.line2);
			string = string.replace('##DESC_2##', unit.line3);
			if(typeof unit.seller_ratings!="undefined"){
				string = string.replace('##SELLER_RATINGS##', unit.seller_ratings);
			}
			if(typeof unit.site_links!="undefined"){
				string = string.replace('##SITE_LINKS##', unit.site_links);
			}
			string = string.replace(/##WSS##/g, get_WSS_tracking(type, n));
			string = string.replace(/##\w+##/g, '');
		}
		
		return string;
	}

	var print_debug = function(msg) {
		if(debug === true && typeof console != "undefined") {
			console.log(msg);
		}
	}

	var adsnip_click = function(el, type, unit) {
		if(typeof Adsnip !== 'undefined') {
			//jQuery(el).children('a').each(function(){
			//	this.onclick = Adsnip.on_click('google_'+type.toLowerCase(), unit.url, unit.visible_url, unit.n);
			//});
			var atags = el.getElementsByTagName('a');
			for(var x in atags) {
				atags[x].onclick = Adsnip.on_click('google_'+type.toLowerCase(), unit.url, unit.visible_url, unit.n);
			}
		} else {
			print_debug("No Adsnip object!");
		}
	}

	var get_WSS_tracking = function(type, index){
		if(type='radlinks') {
			if(index < 4) {
				return 'G_LU_WS';
			} else {
				return 'G_LU_WS/bottom';
			}
		}
		var lid = "G_" + type.toUpperCase();
		var lpos = "";
		if(links_google.page_type == "ra_topic") {
			if(index < 2 ) {
				lpos = "BL_" + index;
			} else {
				lpos = "BL_Mid";
			}
		} else {
			if(index == 0) {
				lid += "_Top";
			}
			lpos = "NotLgd_" + ((links_google.page_type=="wa_question_answered")?"Ans":"UnAns");
		}
		var wss = lid + "/" + lpos;
		return wss;
	}

	return {
		templates: {
			 'two_line': '<div class="two_line"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a><span class="desc">##DESC_1## ##DESC_2##</span></div>',
		     'radlinks':'<div class="radlink"><a track="##WSS##" href="##URL##" class="headline site adUnitLink track_click" target="_blank">##HEADLINE##</a></div>',
		     'three_line':'<a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><span class="desc">##DESC_1## ##DESC_2##</span><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a></div>',
		     'seller_ratings':'<div class="seller_rating"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><span class="desc">##DESC_1## ##DESC_2##</span><span class="seller_ratings">##SELLER_RATINGS##</span><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a></div>',
		     'seller_ratings_alt1':'<div class="seller_rating alt1"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><span class="desc">##DESC_1## ##DESC_2##</span><span class="seller_ratings">##SELLER_RATINGS##</span><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a></div>',
		     'site_links':'<div class="site_links"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><span class="desc">##DESC_1## ##DESC_2##</span><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a>##SITE_LINKS##</div>',
		     'seller_ratings_and_site_links':'<div class="seller_rating site_links"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><span class="desc">##DESC_1## ##DESC_2##</span><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a><br /><span class="seller_ratings">##SELLER_RATINGS##</span>##SITE_LINKS##</div>',
		     'seller_ratings_and_site_links_alt1':'<div class="seller_rating site_links alt1"><a track="##WSS##" href="##URL##" class="headline track_click" target="_blank">##HEADLINE##</a><a track="##WSS##" href="##URL##" class="site adUnitLink track_click" target="_blank">##DISPLAY_URL##</a><span class="desc">##DESC_1## ##DESC_2##</span>##SITE_LINKS##<span class="seller_ratings">##SELLER_RATINGS##</span></div>'
		},

		ads: {},

		meta: {},
		
		channel: null,
		
		// These default ad layouts can be overridden by module configuration
		// The values are template keys
		layouts:{
			afc:'two_line',
			afs:'three_line',
			seller_ratings:'seller_ratings',
			site_links:'site_links',
			seller_ratings_and_site_links:'seller_ratings_and_site_links'
		},

		set_page_type: function(type, modifier) {
			links_google.page_type = type;
		},

		draw_ads: function(ads, type, g_info) {
			print_debug("Starting to draw ads!");
			type = type.toLowerCase();
			links_google.meta[type] = g_info;
			links_google.ads[type] = ads;
			if(links_google.page_type=="ra_topic" && type!="radlinks")
				links_google.set_noads_in_first_ds(ads);
			var x;
			for(var n = 0; n < ads.length; n++) {
				print_debug(ads[n]);
				var unit_html = get_unit_html(links_google.get_layout(type, ads[n]), ads[n], n);
				if(unit_html) {
					x = n;
					if(links_google.page_type=="ra_topic" && type!="radlinks" && links_google.noads_in_first_ds){
						x = n + parseInt(links_google.ads_on_first_ds);
					}
					links_google.write_unit(type, x, unit_html);
				} 
				else {
					print_debug('No string!');
				}
			}
		},

		write_unit: function(type, n, unit_html, count) {
			if(!count) count = 1;
			var block = get_block(type, n);
			if(block) {
				//var el = jQuery(unit_html).appendTo(block);
				var new_ad = document.createElement('li');
				new_ad.innerHTML = unit_html;
				block.appendChild(new_ad);
				// Turn on adsnippet click events
				adsnip_click(new_ad, type, links_google.ads[type][n]);
				return true;
			} else if (document.readyState !== "complete" || count < 10) {
				count++;
				setTimeout(function() {links_google.write_unit(type, n, unit_html, count);},100);
			}
			
			return false;
		},
		
		noads_in_first_ds : function(g_ads){
			var gads = g_ads.length;
			return true;
			if(gads > 0){
				if(g_ads[0].visible_url.toLowerCase().indexOf('ebay')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('starware')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('heliumknowledge')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('sites')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('KeepMedia')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('8')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('10')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('target')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('local')>=0 )
				return true;
			}
			return typeof g_ads[0].is_commercial!="undefined" && g_ads[0].is_commercial!="";
		},
		
		set_template: function(type, template) {
			links_google.templates[type] = template;
		},
		set_debug: function(flag) {
			if(flag === true) { 
				debug = true;
			}
		},
		set_ads_on_first_ds: function(n){
			links_google.ads_on_first_ds = n;
		},
		set_noads_in_first_ds: function(g_ads){
			var gads = g_ads.length;
			if(gads > 0){
				if(g_ads[0].visible_url.toLowerCase().indexOf('ebay')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('starware')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('heliumknowledge')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('sites')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('KeepMedia')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('8')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('10')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('target')>=0 || g_ads[0].visible_url.toLowerCase().indexOf('local')>=0 )
					links_google.noads_in_first_ds = true;
				else
					links_google.noads_in_first_ds = typeof g_ads[0].is_commercial!="undefined" && g_ads[0].is_commercial!="";
			}
		},
	
		// Here the ad layouts can be managed against the required criteria
		get_layout:function(type, ad){
			print_debug("Type: "+type);
			var layout = type;
			if(type == 'afc'){
				print_debug("Setting to current AFC layout: "+ links_google.layouts.afc);
				layout = links_google.layouts.afc;
			}
			if(type == 'afs'){
				print_debug("Setting to current AFS layout: "+ links_google.layouts.afs);
				layout = links_google.layouts.afs;
			}
			if(typeof ad.seller_ratings!="undefined"){
				print_debug("Setting to current Seller Ratings layout: "+ links_google.layouts.seller_ratings);
				layout = links_google.layouts.seller_ratings;
			}
			if(typeof ad.site_links!="undefined"){
				print_debug("Setting to current Site Links layout: "+ links_google.layouts.site_links);
				layout = links_google.layouts.site_links;
			}
			if(typeof ad.seller_ratings!="undefined" && typeof ad.site_links!="undefined"){
				print_debug("Setting to current SR and SL layout: "+ links_google.layouts.seller_ratings_and_site_links);
				layout = links_google.layouts.seller_ratings_and_site_links;
			}
			print_debug("Layout: "+layout);
			return layout;
		}
	}
};

/* fbClickedLike is a callback function for FB Like buttons, which handles DWH tracking. It is needed for regular, mobile and AQUA pages */

function fbClickedLike(response) {
	/* add wss tracking for likes */
	fbClickedLikeTracking(true);
	/* response will be canonicalURL, with http://wiki.answers.com/ even for trunkvn. This regEx will make it a relative URL */
	var regEx = new RegExp("^.*://[^/]*");
	var pageURL = response.replace(regEx, "");
	var loggingURL = pageURL + "&action=sociallog&actionType=DWH_LIKED_QUESTION";
	var im = new Image();
	im.src = loggingURL;
}
function fbClickedUnLike() {
	fbClickedLikeTracking(false);
}
function fbClickedLikeTracking(Like) {
	var pageType, likeOrUnlike = Like ? "Like" : "UnLike";
	if(jwgData.pageType == "WA Front Page") {
		pageType = "WAFP";
	}
	else if(jwgData.pageType == "Home Page") {
		pageType = "HP";
	}
	else if(jwgData.pageType == "question" && jwgData.articleData.hasAnswer) {
		pageType = "Ans";
	}
	else if(jwgData.pageType == "Category questions page" && jwgData.articleData.isTopicPageRelated) {
		pageType = "Cat";
	}
	track(likeOrUnlike+pageType);
}

function loadFB() {
	// FB like button
	window.fbAsyncInit = function() {
		if (window.addEventListener && window.postMessage || FB.Flash.hasMinVersion()) {
			FB.init({appId: '120979621248655', status: true, cookie: true, xfbml: true});
			if ("undefined" != typeof showFBLikeButton && showFBLikeButton) {
				FB.Event.subscribe('edge.create', fbClickedLike);
				FB.Event.subscribe('edge.remove', fbClickedUnLike);
			}
			if ("undefined" != typeof fbRecommendations && fbRecommendations) {
				FB.getLoginStatus(function(o) {
					if (o.status == 'connected' || o.status == "not_authorized") {
						jQuery(".social_recommend").show();
					}
				}, true);
			}
		}
	};
	(function() {
		var e = document.createElement('script'); 
		e.async = true;
		e.src = window.location.protocol + '//connect.facebook.net/' + jwgData.config.wgLocale + '/all.js';
		var fbRoot = document.getElementById('fb-root');
		if(fbRoot!=null) {
			fbRoot.appendChild(e);
		}
	}());
	setTimeout(function() {
		if (jQuery('.fb_iframe_widget').length == 0 && typeof FB != 'undefined') {
			FB.XFBML.parse();
		}
	}, 2000);
}

document.write('<div id="fb-root"></div>');

jQuery(window).load(loadFB);
if ("undefined" == typeof AjaxResponse) {
AjaxResponse = function(options) {
	/* by default strictStatus is true, but if needed can be set to false
	 *  if we don't want unknown statuses to alert
	 */
	this.strictStatus = true;
	this.resetOptions(options);
};

/* protected */
AjaxResponse.prototype.className = "AjaxResponse";

/* protected */
//AjaxResponse.prototype.parent = {};

/*
 * method to help to create subclasses
 * example:
 * AjaxResponseSubClass = AjaxResponse.prototype.inherit("AjaxResponseSubClass");
 * AjaxResponseSubClass.prototype.statusMESSAGE = function(data) {alert(data.message)};
 */
/* public */
AjaxResponse.prototype.inherit = function(childClassName, extend, constructor) {
	var parentClassName = this.className;
	var constructorStr = "";
	if ("function" == typeof constructor) {
		constructorStr = "(" + constructor + ")(arguments);"
	}
	var childClass = (new Function(
		childClassName + " = function() {" +
			parentClassName + ".apply(this, arguments);" +
			constructorStr +
		"};" +
		childClassName + ".prototype = new " + parentClassName + "();" +
		childClassName + ".prototype.constructor = " + childClassName + ";" +
		childClassName + ".prototype.className = '" + childClassName + "';" +
//		childClassName + ".prototype.parent = " + parentClassName + ";" +
		"return " + childClassName
	))();
	if (null !== extend && "object" == typeof extend) {
		jQuery.extend(childClass.prototype, extend);
	}
	return childClass;
};

/*
 * reset this.options
 */
/* protected */
AjaxResponse.prototype.resetOptions = function(options) {
	this.options = {};
	this.addOptions(options);
};

/*
 * add options to this.options
 */
/* public */
AjaxResponse.prototype.addOptions = function(options) {
	if ("undefined" != typeof this.options.data && "undefined" != typeof options && "undefined" != typeof options.data) {
		var data = jQuery.extend({}, this.options.data, options.data);
		options.data = data;
	}
	if ("object" == typeof options) {
		jQuery.extend(this.options, options);
	}
};

/* private */
AjaxResponse.prototype.xhrs = [];

/* private */
AjaxResponse.prototype.includes = {};

/* private */
AjaxResponse.prototype.includeFileLoaded = function(url, checkCallback) {
	var callIt = true;
	if (this.includes[url].indexOf("SYNC:") === 0) {
		callIt = this.havePseudoSyncIncludesLoaded(url);
	} else {
		this.includes[url] = "LOADED";
	}
	if (callIt && "function" == typeof checkCallback) {
		checkCallback();
	}
};

/* private */
AjaxResponse.prototype.isCrossDomain = function(url) {
	return (url.indexOf(window.location.protocol + "//" + window.location.host + "/") !== 0 && url.match(/^https?:\/\//));
};

/*
 * syncBoolOrVar: if bool: true=SYNC, false=ASYNC
 * 		if string: url is considered loaded when typeof syncBoolOrVar is not "undefined"
 * @return boolean: now started to load url => checkCallback will be called
 */
/* private */
AjaxResponse.prototype.addJsInclude = function(url, syncBoolOrVar, checkCallback) {
	if ("undefined" != typeof url && "undefined" == typeof this.includes[url]) {
		var self = this;
		var sync = true;
		var syncVar = "";
		if ("boolean" == typeof syncBoolOrVar) {
			sync = syncBoolOrVar;
		} else {
			syncVar = ":" + syncBoolOrVar;
		}
		this.includes[url] = sync ? "SYNC" + syncVar : "ASYNC";
		var dataType = "undefined" != typeof jwgData.flag.debugAjaxFetcher && !this.isCrossDomain(url) ? "text" : "script";
		var xhr = jQuery.ajax({
			async: !sync,
			type: "GET",
			url: url,
			success: function(js, status, xhr) {
				try {
					if ("text" == dataType) {
						jQuery.globalEval(js);
					}
					self.includeFileLoaded(url, checkCallback);
				} catch (e) {
					self.jsException(e, js, js, status, xhr);
					return false;
				}
			},
			error: function(xhr, status, ex) {
				alert("jsInclude AJAX Error url:" + url + "\nstatus:" + status + "\nresponse:" + xhr.responseText);
			},
			dataType: dataType,
			cache: true
		});
		this.xhrs.push(xhr);
		return true;
	}
	return false;
};

AjaxResponse.prototype.addToCheckSyncIncludesArr = function(urlArr) {
	if (false == this.checkSyncIncludesArr) {
		this.checkSyncIncludesArr = jQuery.extend({}, urlArr);
	} else {
		jQuery.extend(this.checkSyncIncludesArr, urlArr);
	}
};

/*
 * @return boolean: need to run checkCallback from caller because it won't be called from the ajax success function
 */
/* private */
AjaxResponse.prototype.addJsIncludes = function(urlArr, checkCallback) {
	if ("object" != typeof urlArr) {
		return;
	}
	this.addToCheckSyncIncludesArr(urlArr);
	for (var url in urlArr) {
		if ("undefined" != typeof url && "undefined" == typeof this.includes[url]) {
			this.addJsInclude(url, urlArr[url], checkCallback);
		}
	}
};

AjaxResponse.prototype.addCssInclude = function(url, checkCallback) {
	var self = this;
	this.includes[url] = "SYNC";
	var dataType = "undefined" != typeof jwgData.flag.debugAjaxFetcher && !this.isCrossDomain(url) ? "text" : "css";
	if ("text" == dataType) {
		var xhr = jQuery.ajax({
			async: false,
			type: "GET",
			url: url,
			dataType: dataType,
			success: function(css, status, xhr) {
				if (200 != xhr.status) {
					return;
				}
				var style = jQuery('<style type="text/css">' + css + '</style>').appendTo("head");
				self.includeFileLoaded(url, checkCallback);
			},
			error: function(xhr, status, ex) {
				alert("cssInclude AJAX Error:" + "\nurl:" + url + "\nstatus:" + status + "\nresponse:" + xhr.responseText);
			}
		});
		this.xhrs.push(xhr);
	} else {
		jQuery('<link rel="stylesheet" media="screen" href="' + url + '">').appendTo("head");
	}
	return true;
};

AjaxResponse.prototype.addCssIncludes = function(urlArr, checkCallback) {
	this.addToCheckSyncIncludesArr(urlArr);
	for (var url in urlArr) {
		if ("undefined" != typeof url) {
			this.addCssInclude(url, checkCallback);
		}
	}
};

AjaxResponse.prototype.havePseudoSyncIncludesLoaded = function(url) {
	if (this.checkSyncIncludesArr[url] && this.includes[url] && this.includes[url].indexOf("SYNC:") === 0) {
		var testVar = this.includes[url].substr(5);
		var loaded = (new Function("return 'undefined' != typeof " + testVar + ";"))();
		if (loaded) {
			this.includes[url] = "LOADED";
			delete this.checkSyncIncludesArr[url];
		}
	}
	return "LOADED" == this.includes[url];
};

/*
 * @return boolean: all the SYNCRONOUS jsInclude files finished loading
 */
/* protected */
AjaxResponse.prototype.haveSyncIncludesLoaded = function() {
	var loaded = true;
	for (var url in this.checkSyncIncludesArr) {
		// if we wanted this url sync and not yet loaded
		if (this.checkSyncIncludesArr[url] && !this.havePseudoSyncIncludesLoaded(url) /*"LOADED" != this.includes[url]*/) {
			loaded = false;
			break;
		}
	}
	return loaded;
};

/*
 * this function is to make sure (by using the "semafor" this.checkSyncIncludesRunOnceCallback)
 * that the callback function will only be called once
 */
/* protected */
AjaxResponse.prototype.checkSyncIncludesRunOnce = function() {
	if ("function" == typeof this.checkSyncIncludesRunOnceCallback) {
		callback = this.checkSyncIncludesRunOnceCallback;
		// semafor: run this only once
		this.checkSyncIncludesRunOnceCallback = false;
		this.setResponse(callback());
		return this.response;
	}
};

/*
 * check if all the sync includes are loaded, if yes then call the callback
 */
/* protected */
AjaxResponse.prototype.checkSyncIncludesNoBlock = function() {
	if (this.haveSyncIncludesLoaded()) {
		this.checkSyncIncludesRunOnce();
	}
};

/*
 * wait (block) until all the sync includes are loaded, then call the callback
 */
/* protected */
AjaxResponse.prototype.checkSyncIncludesBlock = function() {
	var block = true;
	do {
		if (this.haveSyncIncludesLoaded()) {
			block = false;
			return this.checkSyncIncludesRunOnce();
		}
	} while (true === block);
};

/*
 * wait (don't block) until all the sync includes are loaded, then call the callback
 */
/* protected */
AjaxResponse.prototype.checkSyncIncludesAsync = function() {
	if (this.haveSyncIncludesLoaded()) {
		this.checkSyncIncludesRunOnce();
	} else {
		var self = this;
		window.setTimeout(function(){self.checkSyncIncludesAsync()}, 100);
	}
};

/*
 * process data.jsIncludes
 */
/* protected */
AjaxResponse.prototype.jsonProcessJsIncludes = function(data, status, xhr, success) {
	this.setResponse(data);
	var self = this;
	if ("undefined" != typeof data && ("object" == typeof data.cssIncludes || "object" == typeof data.jsIncludes)) {
		// semafor: run this only once
		this.checkSyncIncludesRunOnceCallback = function() {
			return self.jsonSuccessCallback(data, status, xhr, success);
		};
		if ("object" == typeof data.cssIncludes) {
			this.addCssIncludes(data.cssIncludes, false);
		}
		if ("object" == typeof data.jsIncludes) {
			this.checkSyncIncludesArr = false;
			if (false === this.options.async) { // we are in a sync call
				// we pass false as checkCallback, because we don't want the threads to run anything
				// because we want to run it and return it in the line below
				this.addJsIncludes(data.jsIncludes, false);
				// FB#44672 Staging, live: AjaxResponse:  Unresponsive script error
				// return this.checkSyncIncludesBlock();
				this.checkSyncIncludesAsync();
			} else { // we are in an async call
				var checkSyncIncludesNoBlock = function() {
					self.checkSyncIncludesNoBlock();
				};
				this.addJsIncludes(data.jsIncludes, checkSyncIncludesNoBlock);
				this.checkSyncIncludesAsync();
			}
		}
	}
	if ("undefined" == typeof data || "object" != typeof data.jsIncludes) {
		return this.jsonSuccessCallback(data, status, xhr, success);
	}
	return this.response;
};

/*
 * convert a json object to a string
 */
/* protected static */
AjaxResponse.toJsonString = function(obj) {
	var str = "";
	if ("object" != typeof obj) {
		return str;
	}
	for (var key in obj) {
		if ("" != str) {
			str += ",";
		}
		str += '"' + key + '":"' + obj[key] + '"';
	}
	str = "{" + str + "}";
	return str;
};

/*
 * callback to be called from successful json requests with unknown status (that have no other statusXXX() handler)
 */
/* protected */
AjaxResponse.prototype.status = function(data) {
	var STATUS = data.status;
	var msg = "Unknown status:";
	if ("string" == typeof data.message) {
		msg += "\n" + data.message;
	}
	alert(msg);
};

/*
 * callback to be called on exception when running the js code of the response
 */
/* protected */
AjaxResponse.prototype.jsException = function(e, js, data, status, xhr) {
	if ("undefined" != typeof modalDialog) {
		modalDialog.hide();
	}
	alert("Exception:" + e + "\nJavaScript:" + js);
};

/*
 * callback to be called from successful json requests
 */
/* protected */
AjaxResponse.prototype.jsonSuccessCallback = function(data, status, xhr, success) {
	this.setResponse(data);
	if ("undefined" != typeof data) {
/*
		if ("undefined" != typeof data.jsFunctions) {
			AjaxResponse.addJsFunctions(data.jsFunctions);
		}
*/
		if ("undefined" != typeof data.js) {
			try {
				jQuery.globalEval(data.js);
			} catch (e) {
				this.jsException(e, data.js, data, status, xhr);
				return false;
			}
		}
		if (("string" == typeof data.status || "number" == typeof data.status)
				&& "function" == typeof this["status" + data.status]) {
			this["status" + data.status](data);
		} else if (this.strictStatus) {
			this.status(data);
		}
	}
	if ("function" == typeof success) {
		this.setResponse(success(data, status, xhr));
	}
	return this.response;
};

/*
 * callback to be called from failed json requests
 */
/* protected */
AjaxResponse.prototype.jsonErrorCallback = function(xhr, status, ex, error) {
	if ("function" === typeof error) {
		this.setResponse(error(xhr, status, ex));
	} else {
		alert("JSON Ajax response error url:" + this.options.url + "\nstatus:" + status + "\nresponse:" + xhr.responseText);
		this.setResponse({status: "AjaxResponseError", json: {xhr: xhr, status: status, exception: ex, response: xhr.responseText}});
	}
	return this.response;
};

/*
 * callback to be called from successful sync requests
 */
/* protected */
AjaxResponse.prototype.syncSuccessCallback = function(data, status, xhr, success) {
	if ("function" === typeof success) {
		this.setResponse(success(data, status, xhr));
	} else {
		this.setResponse(data);
	}
	return this.response;
};

/*
 * callback to be called from failed sync requests
 */
/* protected */
AjaxResponse.prototype.syncErrorCallback = function(xhr, status, ex, error) {
	if ("function" === typeof error) {
		this.setResponse(error(xhr, status, ex));
	} else {
		alert("SYNC Ajax response error" + "\nurl:" + this.options.url + "\nstatus:" + status + "\nresponse:" + xhr.responseText);
		this.setResponse({status: "AjaxResponseError", json: {xhr: xhr, status: status, exception: ex}});
	}
	return this.response;
}

/*
 * add the necessary values for a json request to this.options
 */
/* protected */
AjaxResponse.prototype.addJsonOptions = function() {
	var self = this;
	var success = this.options.success;
	var overrideWith = {
		dataType: "json",
		data: {
//			jsFunctionsIgnore: AjaxResponse.toJsonString(AjaxResponse.jsFunctions)
		},
		success: function(data, status, xhr) {
			// jsonProcessJsIncludes loades the jsIncludes and then calls self.jsonSuccessCallback
			return self.jsonProcessJsIncludes(data, status, xhr, success);
		}
	};
	this.addOptions(overrideWith);
};

/*
 * add the necessary values for a sync request to this.options
 */
/* protected */
AjaxResponse.prototype.addSyncOptions = function() {
	var self = this;
	var success = this.options.success;
	var error = this.options.error;
	var overrideWith = {
		async: false,
		success: function(data, status, xhr) {
			return self.syncSuccessCallback(data, status, xhr, success);
		},
		error: function(data, status, xhr) {
			return self.syncErrorCallback(data, status, xhr, error);
		}
	};
	this.addOptions(overrideWith);
};

/*
 * add the values from the function parameters to this.options
 */
/* protected */
AjaxResponse.prototype.addParamsOptions = function(type, url, data, success) {
	var overrideWith = {
		url: url,
		data: data,
		type: type,
		success: success
	};
	this.addOptions(overrideWith);
};

/*
 * add the values from the function parameters and the necessary values for a json request to this.options
 */
/* protected */
AjaxResponse.prototype.addParamsAndJsonOptions = function(type, url, data, success) {
	var self = this;
	var error = this.options.error;
	var overrideWith = {
		error: function(data, status, xhr) {
			return self.jsonErrorCallback(data, status, xhr, error);
		}
	};
	this.addOptions(overrideWith);
	this.addParamsOptions(type, url, data, success);
	this.addJsonOptions();
};

/*
 * don't do anything if we're still waiting for SYNC
 */
/* protected */
AjaxResponse.prototype.statusWAITSYNC = function(data) {
	alert("WAITSYNC");
};

/*
 * set the response
 */
/* protected */
AjaxResponse.prototype.setResponse = function(resp) {
	if ("object" == typeof resp && "undefined" != resp.status && "WAITSYNC" != resp.status) {
		if ("undefined" == typeof this.response) {
			this.response = {};
		}
		for (var i in resp) {
			this.response[i] = resp[i];
		}
	}
};

/*
 * send the ajax request
 */
/* protected */
AjaxResponse.prototype.ajax = function() {
	return jQuery.ajax(this.options);
};

/*
 * send a syncronous ajax request and return the response
 */
/* protected */
AjaxResponse.prototype.sync = function() {
	this.response = {status:"WAITSYNC"};
	this.ajax();
	return this.response;
};

/*
 * POST an asyncronous ajax request
 */
/* public */
AjaxResponse.prototype.postJson = function(url, data, success, options) {
	this.resetOptions(options);
	this.addParamsAndJsonOptions("POST", url, data, success);
	return this.ajax();
};

/*
 * GET an asyncronous ajax request
 */
/* public */
AjaxResponse.prototype.getJson = function(url, data, success, options) {
	this.resetOptions(options);
	this.addParamsAndJsonOptions("GET", url, data, success);
	return this.ajax();
};

/*
 * GET an asyncronous ajax request
 */
/* public */
AjaxResponse.prototype.getJsonp = function(url, data, success, options) {
	this.resetOptions(options);
	data.format = "jsonp";
	this.addParamsAndJsonOptions("GET", url, data, success);
	var overrideWith = {
			dataType: "jsonp",
			jsonpCallback: data.jsonCallback,
			success: function() {},
			error: function() {}
	};
	this.addOptions(overrideWith);
	return this.ajax();
};

/*
 * POST a syncronous ajax request and return the response
 */
/* public */
AjaxResponse.prototype.postJsonSync = function(url, data, success, options) {
	this.resetOptions(options);
	this.addParamsAndJsonOptions("POST", url, data, success);
	this.addSyncOptions();
	return this.sync();
};

/*
 * GET a syncronous ajax request and return the response
 */
/* public */
AjaxResponse.prototype.getJsonSync = function(url, data, success, options) {
	this.resetOptions(options);
	this.addParamsAndJsonOptions("GET", url, data, success);
	this.addSyncOptions();
	return this.sync();
};

/*
AjaxResponse.prototype.getScript = function(jsFile, syncBoolOrVar, success, params) {
	this.loadOnDemand({jsFile:syncBoolOrVar}, null, success, params);
};
*/

/*
 * load scripts, css on demand and execute a callback
 * jsFiles: null, URL or array of URL-s
 * cssFiles: null, URL or array of URL-s
 * success: callback function
 */
/* public */
AjaxResponse.prototype.loadOnDemand = function(jsFiles, cssFiles, success, params) {
	jQuery("html,body").addClass("wait");
	var self = this;
	this.checkSyncIncludesArr = false;
	this.checkSyncIncludesRunOnceCallback = function() {
		jQuery("html,body").removeClass("wait");
		if ("function" == typeof success) {
			return success.apply(self, params);
		}
	};
	if ("undefined" != typeof jsFiles && null != jsFiles) {
		if ("string" == typeof jsFiles) {
			var jsFile = jsFiles;
			jsFiles = {};
			jsFiles[jsFile] = false;
		}
		this.addToCheckSyncIncludesArr(jsFiles);
	} else {
		jsFiles = false;
	}
	if ("undefined" != typeof cssFiles && null != cssFiles) {
		if ("string" == typeof cssFiles) {
			var cssFile = cssFiles;
			cssFiles = {};
			cssFiles[cssFile] = false;
		}
		this.addToCheckSyncIncludesArr(cssFiles);
	} else {
		cssFiles = false;
	}
	if (false === this.options.async) { // we are in a sync call
		if (false !== jsFiles) {
			this.addJsIncludes(jsFiles, false);
		}
		if (false !== cssFiles) {
			this.addCssIncludes(cssFiles, false);
		}
		this.checkSyncIncludesAsync();
	} else { // we are in an async call
		var checkSyncIncludesNoBlock = function() {
			self.checkSyncIncludesNoBlock();
		};
		if (false !== jsFiles) {
			this.addJsIncludes(jsFiles, checkSyncIncludesNoBlock);
		}
		if (false !== cssFiles) {
			this.addCssIncludes(cssFiles, checkSyncIncludesNoBlock);
		}
		if (this.checkSyncIncludesRunOnceCallback) {
			this.checkSyncIncludesAsync();
		}
	}
};
} // if ("undefined" == typeof AjaxResponse)

/******************************************************************************
 * MobileAjaxResponse
 ******************************************************************************/

MobileAjaxResponse = AjaxResponse.prototype.inherit("MobileAjaxResponse");

/*
 * reset this.options
 */
/* protected */
MobileAjaxResponse.prototype.resetOptions = function(options) {
	this.options = {
		data: {
			media: "mobile"
		}
	};
//	jQuery.extend(myOptions, options);
//	this.parent.prototype.resetOptions.call(this, myOptions);
	this.addOptions(options);
};

/*
 * on error alert and close the modalDialog
 */
/* protected */
MobileAjaxResponse.prototype.jsonErrorCallback = function(xhr, status, ex, error) {
	if ("function" === typeof error) {
		this.setResponse(error(xhr, status, ex));
	}
	alert("Oops... we were unable to process your request. Try again later");
	if ("undefined" != typeof modalDialog) {
		modalDialog.hide();
	}
	return {status: "ERROR"};
};

/*
 * on alert display it in alert
 */
/* protected */
MobileAjaxResponse.prototype.statusALERT = function(data) {
	if ("undefined" != typeof data && "undefined" != typeof data.message) {
		alert("Error: " + data.message);
		if ("undefined" != typeof modalDialog) {
			modalDialog.hide();
		}
	}
};

/*
 * on message display it in the red status area
 */
/* protected */
MobileAjaxResponse.prototype.statusERROR = function(data, className) {
	if ("undefined" != typeof data && "undefined" != typeof data.message) {
		if ("undefined" == typeof className) {
			className = "error";
		}
		statusMessageShow("Error: " + data.message, className);
		if ("undefined" != typeof modalDialog) {
			modalDialog.hide();
		}
	}
};

/*
 * on message display it in the yellow status area
 */
/* protected */
MobileAjaxResponse.prototype.statusMESSAGE = function(data, className) {
	if ("undefined" != typeof data && "undefined" != typeof data.message) {
		if ("undefined" == typeof className) {
			className = "message";
		}
		statusMessageShow(data.message, className);
		if ("undefined" != typeof modalDialog) {
			modalDialog.hide();
		}
	}
};

/*
 * on popup execute the js code (jsonSuccessCallback), and that's it
 */
/* protected */
MobileAjaxResponse.prototype.statusPOPUP = function(data) {
};

AquaAjaxResponse = AjaxResponse.prototype.inherit("AquaAjaxResponse", {
	resetOptions: function(options) {
		options = jQuery.extend({
				data: {
					media: jwgData.runtime.media,
					skin: jwgData.runtime.skin
				}
			},
			options
		);
		AjaxResponse.prototype.resetOptions.call(this, options);
	},
	getUriType: function(uri) {
		var type = "";
		if ('/' == uri.charAt(0)) {
			type = "absolute_path";
		} else if (uri.match(/^https?:\/\//)) {
			type = "url";
		} else {
			type = "relative_path";
		}
		return type;
	},
	uriToUrl: function(uri, relativePathPrefix) {
		var addVersion = false;
		switch (this.getUriType(uri)) {
		case "relative_path":
			uri = relativePathPrefix + uri;
		case "absolute_path":
			uri = jwgData.config.wgStaticFilesServer + uri;
			addVersion = true;
		case "url":
		}
		if (addVersion) {
			uri += jwgData.config.versionNo;
		}
		return uri;
	},
	start: function(varName, className, funcName, params) {
		if("undefined" == typeof params || null === params) {
			params = [];
		}
		var code = "";
		if ("string" == typeof varName && varName.length > 0) {
			if ("string" == typeof className) {
				code =
					'if ("undefined" == typeof ' + varName + ') {' +
						varName + ' = new ' + className + '();' +
						'if ("function" == typeof ' + varName + '.init) {' +
							varName + '.init.apply(' + varName + ', params);' +
						'}' +
					'}';
			}
			if ("init" != funcName || "string" != typeof className) {
				code += varName + '.' + funcName + '.apply(' + varName + ', params);';
			}
		} else {
			code =
				funcName + '.apply(window, params);';
		}
		(new Function("params", code))(params);
	},
	fetch: function(jsFiles, cssFiles, varName, className, funcName, params) {
		var self = this;
		var waitFor = false;
		if ("undefined" != typeof className && null != className) {
			waitFor = className;
		} else if ("undefined" != typeof funcName && null != funcName) {
			waitFor = funcName;
		}
		if ("undefined" != typeof jsFiles && null != jsFiles) {
			if ("string" == typeof jsFiles) {
				var jsFile = jsFiles;
				jsFiles = {};
				jsFiles[jsFile] = waitFor;
			}
			var jsFilesObj = {};
			if (jsFiles.length) {
				// jsFiles = [...] //array
				for (var i = 0 ; i < jsFiles.length; i++) {
					jsFilesObj[jsFiles[i]] = waitFor;
				}
				jsFiles = jsFilesObj;
				jsFilesObj = {};
			}
			for (var uri in jsFiles) {
				var url = this.uriToUrl(uri, "/skins/" + this.options.data.media + "/" + this.options.data.skin + "/scripts/");
				jsFilesObj[url] = jsFiles[uri];
			}
		}
		if ("undefined" != typeof cssFiles && null != cssFiles && cssFiles.length > 0) {
			if ("string" == typeof cssFiles) {
				cssFiles = [cssFiles];
			}
			var cssFilesObj = {};
			for (var i = 0 ; i < cssFiles.length; i++) {
				cssFilesObj[this.uriToUrl(cssFiles[i], "/skins/" + this.options.data.media + "/" + this.options.data.skin + "/styles/")] = false;
			}
		}
		this.loadOnDemand(jsFilesObj, cssFilesObj, self.start, [varName, className, funcName, params]);
	}
});
/* duplicate of readCookie in ../integrated.js */
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function delCookie(name) {
	var domain = (location.hostname.match("answers.com")) ? ";domain=answers.com" : "";
	document.cookie = name + "=;path=/" + domain + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/*duplicate of createCookie in ../scripts.js */
function createCookie(name,value,days,domain) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/" + ((domain) ? "; domain=" + domain : "");
};

function openDialog(id, type, options) {
	var modal = jQuery(id);
	if(modal.length > 0) {
		if(type != null) {
			initializeDialog(id, type, options);
		}
		modal.dialog("open");
	}
}

function closeDialog(id) {
	var modal = jQuery(id);
	if(modal.length > 0) {
		modal.dialog("close");
	}
}

function destroyDialog(id) {
	var modal = jQuery(".ui-dialog").find(id);
	if(modal.length > 0) {
		modal.dialog("destroy");
	}
}

function initializeDialog(id, type, explicitOptions) {
	var modal = jQuery(id);
	if(modal.length > 0) {
		var options = {
			title: ' '
		};
		switch(type){
			case "modal":
				jQuery.extend(options, {modal: true, resizable: false});
				break;
			case "veryNarrowModal":
				jQuery.extend(options, {modal: true, width: "200px", resizable: false});
				break;
			case "narrowModal":
				jQuery.extend(options, {modal: true, width: "340px", resizable: false});
				break;
			case "medModal":
				jQuery.extend(options, {modal: true, width: "370px", resizable: false});
				break;
			case "medWideModal":
				jQuery.extend(options, {modal: true, width: "460px", resizable: false});
				break;
			case "wideModal":
				jQuery.extend(options, {modal: true, width: "540px", resizable: false});
				break;
			case "autoModal":
				jQuery.extend(options, {modal: true, width: "auto", resizable: false});
				break;
			case "confirmModal":
				jQuery.extend(options, {
					modal: true
					, buttons: [
						{
							id: modal.attr("id") + "-ok-button"
							, text: "OK"
							, click: explicitOptions.okFunction
						}
						, {
							id: modal.attr("id") + "-cancel-button"
							, text: "Cancel"
							, click: function () {
								if (typeof explicitOptions == "object" && typeof explicitOptions.cancelTracking != "undefined") {
									track(explicitOptions.cancelTracking);
								} else {
									track('cancel');
								}
								modal.dialog("close");
							}
						}
					]
				});
				break;
			case "okModal":
				if("object" == typeof explicitOptions && "undefined" != typeof explicitOptions.okFunction) {
					okFunction = explicitOptions.okFunction;
				} else {
					okFunction = function() { modal.dialog("close"); };
				}
				jQuery.extend(options, {
					modal: true
					, buttons: [{id: modal.attr("id") + "-ok-button", text: "OK", click: okFunction}]
				});
				break;
			case "wideNonmodal":
				jQuery.extend(options, {width: "540px"});
				break;
			case "nonModal":
				jQuery.extend(options, {modal: false, resizable: false});
				break;
			default:
				break;
		}
		jQuery.extend(options, {autoOpen: false, zIndex: 2000, closeText: 'x', dialogClass: type}, explicitOptions);
		modal.find("button").button();
		modal.dialog(options);
		setTimeout(function() { postDialogSetup(modal); }, 0.01);
	}
}

function closingTrack() {
	track('closeDialog');
}

function postDialogSetup(modal) {
	modal.parent().find("button, a").removeClass("ui-state-focus").blur();
	/* need to unbind so that tracking won't happen multiple times if several dialogs closed */
	jQuery('.ui-dialog-titlebar-close')
		.unbind('click', closingTrack)
		.bind('click', closingTrack);
}

/**
 * Super Popup js
 * created by: Ari Bronstein 
 * last updated: April 10 2011
 * version: 1.0
 */
var superPopup = {
	create: function(originalObj, id, data, showClose) {
		jQuery('<div></div>')
			.attr({
				'id': id
				,'class': 'popupDiv'
			})
			.insertAfter(originalObj);
			jQuery('<div></div>')
			.attr({
				'class': 'popupArrow'
			}).appendTo("#" + id);
			jQuery('<div></div>')
			.attr({
				'class': 'popupContent'
			})
			.html(data).appendTo("#" + id);
			if(showClose) {
				jQuery('<span></span>')
				.attr({
					'class': 'popupClose'
				})
				.html('x')
				.click( function(){
					jQuery(this).closest('.popupDiv').remove();
				})
				.appendTo("#" + id);
			}
	},
	showIt: function(popupDiv, originalObj, distance, time) {
		popupDiv
			.css({
				"left": originalObj.position().left + "px"
				,"top": originalObj.position().top + "px"
			})
			.show()
			.animate({
				"top": '+=' + distance + 'px'
			}, time, 'swing');
	},
	hideIt: function(popupDiv, distance, time) {
		popupDiv
			.stop()
		    .animate({
		        top: '-=' + distance + 'px'
		    }, time, 'swing', function () {
		    	popupDiv.hide();
		    });
	}
}

function closeDialog(id) {
	var modal = jQuery(id);
	if(modal.length > 0) {
		modal.dialog("close");
	}
}

/*
 * executeFuncOrString - Executes func as funcion or string. 
 */
function executeFuncOrString(func) {
	if ("function" == typeof func) {
		func();
	} else {
		globalEval(func);
	}
}

function windowOnload(func) {
	if (window.loaded) {
		executeFuncOrString(func);
	} else {
		if (typeof windowOnloadArr == "undefined") {
			windowOnloadArr = [];
		}
		windowOnloadArr.push(func);
	}
}

function loadAsyncSrc(srcURL, callBack, params) {
	//prevent jQuery from appending cache busting string to the end of the URL
	var cache = jQuery.ajaxSettings.cache;
	jQuery.ajaxSettings.cache = true;
	if(callBack){
		jQuery.getScript(srcURL,function(){callBack(params);});
	}
	else{
		jQuery.getScript(srcURL);
	}
	//Restore jQuery caching setting
	jQuery.ajaxSettings.cache = cache;
}

function getHashArr() {
	if ("undefined" == typeof $_HASH) {
		$_HASH = {};
		var hash = window.location.hash.substr(1);
		jQuery.each(hash.split('|'), function(i, keyval){
			var kv = keyval.split("=");
			$_HASH[kv[0]] = kv[1];
		});
	}
	return $_HASH;
}

function getHash(key) {
	var hash = getHashArr();
	return hash[key];
}

/**
 * windowLoaded() - Executes all functions added to the array windowOnloadArr to be executed on js load event.
 */
function windowLoaded() {
	if (typeof windowOnloadArr != "undefined" && !window.loaded) {
		window.loaded = 1;
		for (i in windowOnloadArr) {
			executeFuncOrString(windowOnloadArr[i]);
		}
		delete windowOnloadArr;
	}
}
window.onload = windowLoaded;

//copied from jQuery
function globalEval(data) {
	if (data) {
		var head = document.getElementsByTagName("head")[0] || document.documentElement,
			script = document.createElement("script");
		script.type = "text/javascript";
		try {
			script.appendChild(document.createTextNode(data));
		} catch(e) {
			script.text = data;
		}
		head.insertBefore( script, head.firstChild );
		head.removeChild( script );
	}
}

/*
 * executeFuncOrString - Executes func as funcion or string. 
 */
function executeFuncOrString(func) {
	if ("function" == typeof func) {
		func();
	} else {
		globalEval(func);
	}
}

function showGrayOut(id) {
	var obj = jQuery(id);
	var docObj = jQuery(document);
	var objOffset = obj.offset();
	var grayOut = jQuery("<div></div").css({
											position: "absolute"
											, display: "block"
											, top: "-" + objOffset.top + "px"
											, left: "-" + objOffset.left + "px"
											, height: docObj.height()
											, width: docObj.width()
											, backgroundColor: "#000000"
											, opacity: "0.7"
											, overflow: "hidden"
											, zIndex: "98"
										})
										.attr({id: "grayOut"});
	obj.before(grayOut);
}
function hideGrayOut() {
	jQuery("#grayOut").remove();
}
function disableEditBtns() {
	jQuery(".editBtn").button("disable");	
}
function enableEditBtns() {
	jQuery(".editBtn").button("enable").removeClass("ui-state-hover ui-state-focus");
}

function trackError(error) {
	error = error.replace(/(<([^>]+)>)/ig,"").replace(/[^A-Za-z0-9@ ]/g, "").replace(/ /g, "+").substr(0, 100);
	trackCustomMetrics({c1: error}); //once the custom metrics ticket  will be ready te coresponding function should be here instead of  trackCustomMetrics({c1: error});
	
}
function loadPage(url) {
	if ("undefined" == typeof url) {
		window.location.reload(true);
	} else {
		window.location.href = url;
	}
}
jQuery(window).load(function() {
	jQuery(".smallBtn").each(function(){
		
		var options = {
			icons:{
				primary:null,
				secondary:null
			}
		};
		
		if($(this).hasClass('icon-pencil')){
			options.icons.primary = 'ui-icon-pencil';
			options.icons.secondary = null ;
		}
		
		$(this)
		.button(options)
		.show()
		.css({display:'inline-block'});
	});
});

function draw_on_this_page(dsnameslist){
	var onthispage = '<p class="left-list-title">On this page</p><ul>';
	jQuery.each(dsnameslist, function(key,val){
		onthispage +='<li><a id="lhs-'+key+'" onclick="track(\'NP07-P1_OTP\', \''+key.replace(/_/g," ")+'\')" href="#'+val+'_ds" noanswertip="true">'+key.replace(/_/g," ")+'</a></li>';
	});
	onthispage +='<li><a id="lhs-copyrights" href="#ds_copyrights" noanswertip="true">Copyrights</a></li>';
	jQuery("#onthispage").html(onthispage);	
}
// show yellow message
function errorMessageShow(msg) {
	jQuery("#errorMessage").html(msg).show();
}
// hide yellow message
function errorMessageHide() {
	jQuery("#errorMessage").html('').hide();
}

$.fn.equalizeWidths = function() {
	var maxWidth = this.map(function(i,e) {
		return $(e).width();
	}).get();

	return this.width( Math.max.apply(this, maxWidth) );
};


/* Please keep these functions at the end of the file */
if (document.all){
    var oldTitle = document.title || "";
    document.onpropertychange = function () {
      var newtitle = doctitle = document.title || '';

      if (window.event.propertyName != 'title' || doctitle == oldTitle) { return; }

      // clean the title if needed
      newtitle = doctitle.indexOf('#') != -1
        ? doctitle.substring(0, doctitle.indexOf('#'))
        : doctitle;

      if (newtitle == '' && doctitle.indexOf('#') != -1) {
        newtitle = oldTitle;
      }

      oldTitle = newtitle;
      document.title = newtitle;
    }

}

