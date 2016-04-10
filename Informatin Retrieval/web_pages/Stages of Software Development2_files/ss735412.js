var fx=new Object();
fx.Base=function(){
};
fx.Base.prototype={setOptions:function(_1){
this.options={duration:500,onComplete:"",transition:fx.sinoidal};
Object.extend(this.options,_1||{});
},step:function(){
var _2=(new Date).getTime();
if(_2>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var _3=(_2-this.startTime)/(this.options.duration);
this.now=this.options.transition(_3)*(this.to-this.from)+this.from;
}
this.increase();
},custom:function(_4,to){
if(this.timer!=null){
return;
}
this.from=_4;
this.to=to;
this.startTime=(new Date).getTime();
this.timer=setInterval(this.step.bind(this),13);
},hide:function(){
this.now=0;
this.increase();
},clearTimer:function(){
clearInterval(this.timer);
this.timer=null;
}};
fx.Layout=Class.create();
fx.Layout.prototype=Object.extend(new fx.Base(),{initialize:function(el,_5){
this.el=$(el);
this.el.style.overflow="hidden";
this.iniWidth=this.el.offsetWidth;
this.iniHeight=this.el.offsetHeight;
this.setOptions(_5);
}});
fx.Height=Class.create();
Object.extend(Object.extend(fx.Height.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
var _6=this.options.toHeight?this.options.toHeight:0;
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,_6);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
fx.Width=Class.create();
Object.extend(Object.extend(fx.Width.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.width=this.now+"px";
},toggle:function(){
if(this.el.offsetWidth>0){
this.custom(this.el.offsetWidth,0);
}else{
this.custom(0,this.iniWidth);
}
}});
fx.Opacity=Class.create();
fx.Opacity.prototype=Object.extend(new fx.Base(),{initialize:function(el,_7){
this.el=$(el);
this.now=1;
this.increase();
this.setOptions(_7);
},increase:function(){
if(this.now==1&&(/Firefox/.test(navigator.userAgent))){
this.now=0.9999;
}
this.setOpacity(this.now);
},setOpacity:function(_8){
if(_8==0&&this.el.style.visibility!="hidden"){
this.el.style.visibility="hidden";
}else{
if(this.el.style.visibility!="visible"){
this.el.style.visibility="visible";
}
}
if(window.ActiveXObject){
this.el.style.filter="alpha(opacity="+_8*100+")";
}
this.el.style.opacity=_8;
},toggle:function(){
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
}});
fx.sinoidal=function(_9){
return ((-Math.cos(_9*Math.PI)/2)+0.5);
};
fx.linear=function(_a){
return _a;
};
fx.cubic=function(_b){
return Math.pow(_b,3);
};
fx.circ=function(_c){
return Math.sqrt(_c);
};
fx.Scroll=Class.create();
fx.Scroll.prototype=Object.extend(new fx.Base(),{initialize:function(_d){
this.setOptions(_d);
},scrollTo:function(el){
var _e=Position.cumulativeOffset($(el))[1]-20;
var _f=window.innerHeight||document.documentElement.clientHeight;
var _10=document.documentElement.scrollHeight;
var top=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
if(_e+_f>_10){
this.custom(top,_e-_f+(_10-_e));
}else{
this.custom(top,_e);
}
},increase:function(){
window.scrollTo(0,this.now);
}});
fx.Text=Class.create();
fx.Text.prototype=Object.extend(new fx.Base(),{initialize:function(el,_11){
this.el=$(el);
this.setOptions(_11);
if(!this.options.unit){
this.options.unit="em";
}
},increase:function(){
this.el.style.fontSize=this.now+this.options.unit;
}});
fx.Combo=Class.create();
fx.Combo.prototype={setOptions:function(_12){
this.options={opacity:true,height:true,width:false};
Object.extend(this.options,_12||{});
},initialize:function(el,_13){
this.el=$(el);
this.setOptions(_13);
if(this.options.opacity){
this.o=new fx.Opacity(el,_13);
_13.onComplete=null;
}
if(this.options.height){
this.h=new fx.Height(el,_13);
_13.onComplete=null;
}
if(this.options.width){
this.w=new fx.Width(el,_13);
}
},toggle:function(){
this.checkExec("toggle");
},hide:function(){
this.checkExec("hide");
},clearTimer:function(){
this.checkExec("clearTimer");
},checkExec:function(_14){
if(this.o){
this.o[_14]();
}
if(this.h){
this.h[_14]();
}
if(this.w){
this.w[_14]();
}
},resizeTo:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,this.el.offsetHeight+hto);
this.w.custom(this.el.offsetWidth,this.el.offsetWidth+wto);
}
},customSize:function(hto,wto){
if(this.h&&this.w){
this.h.custom(this.el.offsetHeight,hto);
this.w.custom(this.el.offsetWidth,wto);
}
}};
fx.Accordion=Class.create();
fx.Accordion.prototype={setOptions:function(_15){
this.options={delay:100,opacity:false};
Object.extend(this.options,_15||{});
},initialize:function(_16,_17,_18){
this.elements=_17;
this.setOptions(_18);
var _18=_18||"";
_17.each(function(el,i){
_18.onComplete=function(){
if(el.offsetHeight>0){
el.style.height="1%";
}
};
el.fx=new fx.Combo(el,_18);
el.fx.hide();
});
_16.each(function(tog,i){
tog.onclick=function(){
this.showThisHideOpen(_17[i]);
}.bind(this);
}.bind(this));
},showThisHideOpen:function(_19){
this.elements.each(function(el,i){
if(el.offsetHeight>0&&el!=_19){
this.clearAndToggle(el);
}
}.bind(this));
if(_19.offsetHeight==0){
setTimeout(function(){
this.clearAndToggle(_19);
}.bind(this),this.options.delay);
}
},clearAndToggle:function(el){
el.fx.clearTimer();
el.fx.toggle();
}};
var Remember=new Object();
Remember=function(){
};
Remember.prototype={initialize:function(el,_1a){
this.el=$(el);
this.days=365;
this.options=_1a;
this.effect();
var _1b=this.readCookie();
if(_1b){
this.fx.now=_1b;
this.fx.increase();
}
},setCookie:function(_1c){
var _1d=new Date();
_1d.setTime(_1d.getTime()+(this.days*24*60*60*1000));
var _1e="; expires="+_1d.toGMTString();
document.cookie=this.el+this.el.id+this.prefix+"="+_1c+_1e+"; path=/";
},readCookie:function(){
var _1f=this.el+this.el.id+this.prefix+"=";
var ca=document.cookie.split(";");
for(var i=0;c=ca[i];i++){
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_1f)==0){
return c.substring(_1f.length,c.length);
}
}
return false;
},custom:function(_20,to){
if(this.fx.now!=to){
this.setCookie(to);
this.fx.custom(_20,to);
}
}};
fx.RememberHeight=Class.create();
fx.RememberHeight.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Height(this.el,this.options);
this.prefix="height";
},toggle:function(){
if(this.el.offsetHeight==0){
this.setCookie(this.el.scrollHeight);
}else{
this.setCookie(0);
}
this.fx.toggle();
},resize:function(to){
this.setCookie(this.el.offsetHeight+to);
this.fx.custom(this.el.offsetHeight,this.el.offsetHeight+to);
},hide:function(){
if(!this.readCookie()){
this.fx.hide();
}
}});
fx.RememberText=Class.create();
fx.RememberText.prototype=Object.extend(new Remember(),{effect:function(){
this.fx=new fx.Text(this.el,this.options);
this.prefix="text";
}});
fx.expoIn=function(pos){
return Math.pow(2,10*(pos-1));
};
fx.expoOut=function(pos){
return (-Math.pow(2,-10*pos)+1);
};
fx.quadIn=function(pos){
return Math.pow(pos,2);
};
fx.quadOut=function(pos){
return -(pos)*(pos-2);
};
fx.circOut=function(pos){
return Math.sqrt(1-Math.pow(pos-1,2));
};
fx.circIn=function(pos){
return -(Math.sqrt(1-Math.pow(pos,2))-1);
};
fx.backIn=function(pos){
return (pos)*pos*((2.7)*pos-1.7);
};
fx.backOut=function(pos){
return ((pos-1)*(pos-1)*((2.7)*(pos-1)+1.7)+1);
};
fx.sineOut=function(pos){
return Math.sin(pos*(Math.PI/2));
};
fx.sineIn=function(pos){
return -Math.cos(pos*(Math.PI/2))+1;
};
fx.sineInOut=function(pos){
return -(Math.cos(Math.PI*pos)-1)/2;
};
fx.Position=Class.create();
fx.Position.prototype=Object.extend(new fx.Base(),{initialize:function(el,_21){
this.el=$(el);
this.setOptions(_21);
this.now=[0,0];
},step:function(){
var _22=(new Date).getTime();
if(_22>=this.options.duration+this.startTime){
this.now=this.to;
clearInterval(this.timer);
this.timer=null;
if(this.options.onComplete){
setTimeout(this.options.onComplete.bind(this),10);
}
}else{
var _23=(_22-this.startTime)/(this.options.duration);
var tmp=[];
tmp[0]=(this.options.transition(_23)*(this.to[0]-this.from[0])+this.from[0]);
tmp[1]=(this.options.transition(_23)*(this.to[1]-this.from[1])+this.from[1]);
this.now=tmp;
}
this.increase();
},increase:function(){
this.el.style["left"]=this.now[0]+"px";
this.el.style["top"]=this.now[1]+"px";
},move:function(_24,to){
to=to?to:this.now;
this.custom(_24,to);
}});
fx.Color=Class.create();
fx.Color.prototype=Object.extend(new fx.Base(),{initialize:function(el,_25){
this.el=$(el);
this.setOptions(_25);
this.now=0;
this.regex=new RegExp("#?(..?)(..?)(..?)");
if(!this.options.fromColor){
this.options.fromColor="#FFFFFF";
}
if(!this.options.toColor){
this.options.toColor="#FFFFFF";
}
if(!this.options.property){
this.props=new Array("backgroundColor");
}else{
this.props=this.options.property.split(",");
}
},increase:function(){
var hex="rgb("+(Math.round(this.cs[0]+(this.ce[0]-this.cs[0])*this.now))+","+(Math.round(this.cs[1]+(this.ce[1]-this.cs[1])*this.now))+","+(Math.round(this.cs[2]+(this.ce[2]-this.cs[2])*this.now))+")";
for(i=0;i<this.props.length;i++){
if(this.props[i]=="backgroundColor"){
this.el.style.backgroundColor=hex;
}else{
if(this.props[i]=="color"){
this.el.style.color=hex;
}else{
if(this.props[i]=="borderColor"){
this.el.style.borderColor=hex;
}
}
}
}
},toggle:function(){
this.cs=this.regex.exec(this.options.fromColor);
this.ce=this.regex.exec(this.options.toColor);
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
if(this.now>0){
this.custom(1,0);
}else{
this.custom(0,1);
}
},cycle:function(){
this.toggle();
setTimeout(this.toggle.bind(this),this.options.duration+10);
},customColor:function(_26,to){
this.cs=this.regex.exec(_26);
this.ce=this.regex.exec(to);
for(i=1;i<this.cs.length;i++){
if(this.cs[i].length==1){
this.cs[i]+=this.cs[i];
}
if(this.ce[i].length==1){
this.ce[i]+=this.ce[i];
}
this.cs[i-1]=parseInt(this.cs[i],16);
this.ce[i-1]=parseInt(this.ce[i],16);
}
this.custom(0,1);
},customColorRGB:function(_27,to){
this.rgb_regex=new RegExp("^rgb.([^,]*),s?([^,]*),s?([^)]*)");
this.cs=this.rgb_regex.exec(_27);
this.ce=this.rgb_regex.exec(to);
if(!this.cs){
this.customColor(_27,to);
return;
}
for(i=1;i<this.cs.length;i++){
this.cs[i-1]=parseInt(this.cs[i]);
this.ce[i-1]=parseInt(this.ce[i]);
}
this.custom(0,1);
}});
fx.Slide=Class.create();
Object.extend(Object.extend(fx.Slide.prototype,fx.Layout.prototype),{increase:function(){
this.el.style.height=this.now+"px";
},toggle:function(){
if(this.el.offsetHeight>0){
this.custom(this.el.offsetHeight,0);
}else{
this.custom(0,this.el.scrollHeight);
}
}});
function toggleOverlay(id){
toggleOverlay.init(id);
toggleOverlay.toggleCurtain();
};
function overlayIsOpen(id){
toggleOverlay.init(id);
return toggleOverlay.curtain.style.display=="block";
};
toggleOverlay.init=function(id){
this.isIE6orBelow=false;
var _28=navigator.userAgent.toLowerCase();
var _29=_28.indexOf("msie")+1;
if(_29){
version=_28.charAt(_29+4);
if(version<=6){
this.isIE6orBelow=true;
}
}
this.isMobile=_28.indexOf("mobile")>-1;
this.overlay=$(id);
this.wrapper=this.getWrapper();
this.curtain=this.getCurtain();
this.wrapper.appendChild(this.overlay);
if(this.isIE6orBelow){
this.iframe=this.getIframe();
}
if(navigator.userAgent.indexOf("Linux")!=-1){
tempObjects=document.body.getElementsByTagName("object");
this.elementsToHide=[];
for(var i=0;i<tempObjects.length;i++){
if(!$(tempObjects[i]).descendantOf(this.overlay)){
this.elementsToHide.push(tempObjects[i]);
}
}
}
if(this.isMobile){
scroll(0,0);
}
};
toggleOverlay.toggleCurtain=function(id){
this.overlay.toggle();
if(this.curtain.style.display!="block"){
this.showCurtain();
}else{
this.hideCurtain();
}
};
toggleOverlay.showCurtain=function(){
this.setElementVisibility("hidden");
this.wrapper.style.display="block";
this.curtain.style.display="block";
if(this.isIE6orBelow){
this.iframe.style.display="block";
}
this.stretchCurtain();
jq(this.overlay).trigger("visible",true);
Event.observe(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.hideCurtain=function(){
this.setElementVisibility("visible");
this.curtain.style.display="none";
this.wrapper.style.display="none";
if(this.isIE6orBelow){
this.iframe.style.display="none";
}
jq(this.overlay).trigger("visible",false);
Event.stopObserving(window,"resize",this.stretchCurtain,false);
};
toggleOverlay.setElementVisibility=function(_2a){
if(this.elementsToHide){
for(i=0;i<this.elementsToHide.length;i++){
this.elementsToHide[i].style.visibility=_2a;
}
}
};
toggleOverlay.getWrapper=function(){
var id="toggleOverlayWrapper";
var div=$(id);
if(div){
return div;
}
div=document.createElement("div");
div.id=id;
document.body.appendChild(div);
div.style.zIndex="1000";
if(this.isIE6orBelow){
div.style.position="absolute";
div.style.top=Position.getViewportScrollY()+"px";
Event.observe(window,"scroll",function(){
div.style.top=Position.getViewportScrollY()+"px";
});
}else{
div.style.position="fixed";
}
return div;
};
toggleOverlay.getCurtain=function(){
var id="toggleOverlayCurtain";
var _2b=$(id);
if(_2b){
return _2b;
}
_2b=document.createElement("div");
_2b.id=id;
this.wrapper.appendChild(_2b);
return _2b;
};
toggleOverlay.getIframe=function(){
var id="toggleOverlayIframe";
var _2c=$(id);
if(_2c){
return _2c;
}
_2c=document.createElement("iframe");
_2c.id=id;
_2c.src="";
_2c.frameBorder="no";
_2c.scrolling="no";
document.body.appendChild(_2c);
return _2c;
};
toggleOverlay.stretchCurtain=function(){
height=jq(document).height();
toggleOverlay.wrapper.style.height=height+"px";
toggleOverlay.wrapper.style.width=document.body.scrollWidth+"px";
toggleOverlay.curtain.style.height=height+"px";
if(this.isIE6orBelow){
toggleOverlay.iframe.style.height=height+"px";
toggleOverlay.iframe.style.width=document.body.scrollWidth+"px";
}
if(this.isMobile||navigator.userAgent.indexOf("AppleWebKit/")>-1&&!document.evaluate){
wd=self["innerWidth"];
}else{
if(navigator.userAgent.indexOf("Opera")>-1&&parseFloat(window.opera.version())<9.5){
wd=document.body["clientWidth"];
}else{
wd=document.documentElement["clientWidth"];
}
}
left=wd/2-toggleOverlay.overlay.clientWidth/2+"px";
toggleOverlay.overlay.style.left=left;
};
JSONstring={compactOutput:false,includeProtos:false,includeFunctions:false,detectCirculars:false,restoreCirculars:true,make:function(arg,_2d){
this.restore=_2d;
this.mem=[];
this.pathMem=[];
return this.toJsonStringArray(arg).join("");
},toObject:function(x){
eval("this.myObj="+x);
if(!this.restoreCirculars||!alert){
return this.myObj;
}
this.restoreCode=[];
this.make(this.myObj,true);
var r=this.restoreCode.join(";")+";";
eval("r=r.replace(/\\W([0-9]{1,})(\\W)/g,\"[$1]$2\").replace(/\\.\\;/g,\";\")");
eval(r);
return this.myObj;
},toJsonStringArray:function(arg,out){
if(!out){
this.path=[];
}
out=out||[];
var u;
switch(typeof arg){
case "object":
this.lastObj=arg;
if(this.detectCirculars){
var m=this.mem;
var n=this.pathMem;
for(var i=0;i<m.length;i++){
if(arg===m[i]){
out.push("\"JSONcircRef:"+n[i]+"\"");
return out;
}
}
m.push(arg);
n.push(this.path.join("."));
}
if(arg){
if(arg.constructor==Array){
out.push("[");
for(var i=0;i<arg.length;++i){
this.path.push(i);
if(i>0){
out.push(",\n");
}
this.toJsonStringArray(arg[i],out);
this.path.pop();
}
out.push("]");
return out;
}else{
if(typeof arg.toString!="undefined"){
out.push("{");
var _2e=true;
for(var i in arg){
if(!this.includeProtos&&arg[i]===arg.constructor.prototype[i]){
continue;
}
this.path.push(i);
var _2f=out.length;
if(!_2e){
out.push(this.compactOutput?",":",\n");
}
this.toJsonStringArray(i,out);
out.push(":");
this.toJsonStringArray(arg[i],out);
if(out[out.length-1]==u){
out.splice(_2f,out.length-_2f);
}else{
_2e=false;
}
this.path.pop();
}
out.push("}");
return out;
}
}
return out;
}
out.push("null");
return out;
case "unknown":
case "undefined":
case "function":
out.push(this.includeFunctions?arg:u);
return out;
case "string":
if(this.restore&&arg.indexOf("JSONcircRef:")==0){
this.restoreCode.push("this.myObj."+this.path.join(".")+"="+arg.split("JSONcircRef:").join("this.myObj."));
}
out.push("\"");
var a=["\\","\\\\","\n","\\n","\r","\\r","\"","\\\""];
arg+="";
for(var i=0;i<8;i+=2){
arg=arg.split(a[i]).join(a[i+1]);
}
out.push(arg);
out.push("\"");
return out;
default:
out.push(String(arg));
return out;
}
}};
var detect=navigator.userAgent.toLowerCase();
var OS,browser,version,total,thestring;
if(checkIt("konqueror")){
browser="Konqueror";
OS="Linux";
}else{
if(checkIt("safari")){
browser="Safari";
}else{
if(checkIt("opera")){
browser="Opera";
}else{
if(checkIt("msie")){
browser="IE";
}else{
if(!checkIt("compatible")){
browser="Netscape Navigator";
version=detect.charAt(8);
}else{
browser="An unknown browser";
}
}
}
}
}
if(!version){
version=detect.charAt(place+thestring.length);
}
if(!OS){
if(checkIt("linux")){
OS="Linux";
}else{
if(checkIt("x11")){
OS="Unix";
}else{
if(checkIt("mac")){
OS="Mac";
}else{
if(checkIt("win")){
OS="Windows";
}else{
OS="an unknown operating system";
}
}
}
}
}
var insideHubEditor=false;
function checkIt(_30){
place=detect.indexOf(_30)+1;
thestring=_30;
return place;
};
function ssToId(id,_31){
var _31=_31||1000;
jq("html, body").animate({scrollTop:jq("#"+id).offset().top+"px"},_31);
return false;
};
function ssOnload(){
var _32=location.hash.slice(1);
if(_32=="comments"){
ssToId("comFirst");
}else{
if(_32.substr(0,8)=="comment-"){
ssToId("comment"+_32.substr(8));
}else{
if(_32.substr(0,5)=="slide"){
var _33=_32.replace("slide","");
if(jQuery("#slide_tn_"+_33).length>0){
jQuery("#slide_tn_"+_33).click();
jQuery(".slide_display img").click();
}else{
jQuery("#img_url_"+_33+" img").click();
}
}else{
if(_32!=null&&_32){
ssToId(_32);
}
}
}
}
};
function insertVideo(_34,key,css,_35,_36,_37){
var _38="<div class=\"video\">";
var _39="opaque";
if(_36){
_39="transparent";
}
if(_37=="bad"){
_38="<div class=\"video\" style=\"background-color: #f7e1e1; border-bottom:3px solid #ed9693; color: #440000; padding: 5px;\">"+"<p style=\"margin:0;\">&nbsp;The specified URL is not working</p></div>";
}
if(_34=="Google"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" id=\"VideoPlayback\" "+"src=\"http://video.google.com/googleplayer.swf?docId="+key+"&hl=en\""+" flashvars=\"\" wmode=\""+_39+"\">"+"</embed>";
}else{
if(_34=="YouTube"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.youtube.com/v/"+key+"\" scale=\"exactFit\" "+"wmode=\""+_39+"\">"+"</embed>";
}else{
if(_34=="Revver"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://flash.revver.com/player/1.0/player.swf?mediaId="+key+"\" scale=\"exactFit\" "+"wmode=\""+_39+"\" allowfullscreen=\"true\" allowScriptAccess=\"always\" flashvars=\"allowFullScreen=true\">"+"</embed>";
}else{
if(_34=="Metacafe"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://www.metacafe.com/fplayer/"+key+".swf\" scale=\"exactFit\" "+"wmode=\""+_39+"\">"+"</embed>";
}else{
if(_34=="Yahoo"){
_38+="<embed class=\""+css+"\" src=\"http://d.yimg.com/nl/vyc/site/player.swf\" type=\"application/x-shockwave-flash\" "+"flashvars=\"vid="+key+"&amp;autoPlay=false&amp;volume=100&amp;enableFullScreen=1&amp;lang=en-US&amp;wmode="+_39+"\"></embed></object>";
}else{
if(_34=="YahooSports"){
_38+="<embed class=\""+css+"\" vid=\""+key+"\" flashvars=\"vid="+key+"\" allowfullscreen=\"true\" allowscriptaccess=\"never\" quality=\"high\" "+" bgcolor=\"#000\" scale=\"exactFit\" src=\"http://d.yimg.com/m/up/ypp/sports/player.swf\" type=\"application/x-shockwave-flash\" wmode=\""+_39+"\" />";
}else{
if(_34=="Vimeo"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://vimeo.com/moogaloop.swf?clip_id="+key+"&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;"+"show_portrait=0&amp;color=&amp;fullscreen=1\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"never\" "+"wmode=\""+_39+"\">"+"</embed>";
}else{
if(_34=="BlipTV"){
_38+="<embed style=\""+_35+"\" class=\""+css+"\" "+"type=\"application/x-shockwave-flash\" "+"src=\"http://blip.tv/scripts/flash/stratos.swf#file=http://blip.tv/rss/flash/"+key+"\" scale=\"exactFit\" allowFullscreen=\"true\" allowScriptAccess=\"always\" "+"wmode=\""+_39+"\">"+"</embed>";
}else{
if(_34=="Unknown"){
_38+="<p style=\"margin-left:1em\">The specified URL was not recognized</p>";
}else{
_38+="<p style=\"margin-left:1em\">Video Not Available</p>";
}
}
}
}
}
}
}
}
}
_38+="</div>";
if(_36){
jq("#"+_36).html(_38);
}else{
if(_34!="New"){
document.write(_38);
}
}
};
function safeScriptEval(_3a){
var _3b=_3a.innerHTML.strip();
if(_3b.substring(0,4)=="<!--"){
_3b=_3b.substring(4,_3b.length-3);
}
try{
eval(_3b);
}
catch(e){
}
};
function seeMoreTags(id){
jq.post("/xml/tags.php",{a:id},function(rsp){
jq("#nav_tags").append(rsp);
});
};
function shareHub(url,_3c){
if(_3c===undefined){
_3c=false;
}
if(_3c){
var _3d=confirm("Frequently sharing your own Hubs with followers is not recommended.  Do you want to proceed?.");
if(!_3d){
return false;
}
}
jq.post("/xml/hubfeedshare.php",{url:url},function(rsp){
eval(rsp);
if(success){
jq("#share_with_followers").html("Hub shared!");
}else{
jq("#share_with_followers").html("Sorry, something went wrong!");
}
});
};
function praiseHub(id,val,_3e){
if(!id){
return;
}
jq("#praise_feedback").html("Saving ...");
jq("#praise_item_"+Math.abs(val)).load("/xml/feedback.php",{a:id,v:val,h:1,design:_3e?_3e:"default"},function(){
jq("#praise_feedback").html("Saved. Thanks!");
});
return false;
};
function recArt(id,val){
jq("#rec_"+id).load("/xml/feedback.php",{a:id,v:val});
return false;
};
function hubFeedback(id,val){
jq.post("/xml/feedback.php",{a:id,v:val});
return false;
};
function selectTab(_3f,_40,_41,_42){
var _43;
var _44,_45;
for(var i=0;i<_41;i++){
_44=jq("#tab_"+_3f+"_"+i);
_45=jq("#tabcontent_"+_3f+"_"+i);
if(!_44.size()||!_45.size()){
alert("Cannot locate element: baseid="+_3f+" index="+_40+" tabcount="+_41);
}
if(_44.hasClass("selected")){
_43=i;
}
if(i==_40){
_44.addClass("selected");
_45.addClass("selected");
}else{
_44.removeClass("selected");
_45.removeClass("selected");
}
}
var _46={};
if(_42&&_46.toString.call(_42)=="[object Function]"){
_42(_43,_40);
}
return false;
};
function categoryFanBulkJoin(id,_47,_48,_49,_4a,_4b){
var _4c=jq(".jc");
var _4d=Array();
var _4e=Array();
var i=0;
var k=0;
jq(".jc").each(function(_4f,box){
if(jq(box).is(":checked")){
_4d[i++]=parseInt(jq(box).attr("name").substr(3),10);
}else{
if(!_49){
_4e[k++]=parseInt(jq(box).attr("name").substr(3),10);
}
}
});
checked_ids=_4d.join(",");
unchecked_ids=_4e.join(",");
if(_49){
jq.post("/xml/categoryFanBulkJoin.php",{checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id},function(rsp){
if(_4a){
_4a(rsp);
}
});
}else{
data={checked_ids:checked_ids,unchecked_ids:unchecked_ids,html_target:id};
if(typeof (_4b)!="undefined"){
data["searchTxt"]=_4b;
}
jq("#"+id).load("/xml/categoryFanBulkJoin.php",data,function(rsp){
if(_47){
window.location.replace("/contacts/newuser.php");
return;
}else{
if(_48){
setTimeout(categoryFanHighlight,500);
}
}
if(_4a){
_4a(rsp);
}
});
}
return false;
};
function categoryFanHighlight(){
jq(".highlighted").css("color","#ff0000").animate({color:"#fffff"},700);
};
function categoryFanSearch(_50,_51,_52,_53,_54){
if(!_52){
var _52=8;
}
if(!_53){
var _53=2;
}
var _55=jq("#"+_51).val();
if(""==jq.trim(_55)){
return;
}
jq("#"+_50).load("/xml/categoryFanSearch.php",{search:_55,limit:_52,cols:_53},function(){
if(_54){
_54();
}
});
return false;
};
function facebookConnect(_56){
if(typeof (_56)=="undefined"){
_56="/user/new/facebook_window.php";
}
this.child=facebookPopup("");
var uri=$H({returnurl:_56}).toQueryString();
var _57=new Ajax.Request("/xml/facebook_authurl.php",{method:"post",parameters:uri,onFailure:reportError,onComplete:function(req){
eval(req.responseText);
if(typeof (authorizationUrl)!="undefined"){
this.child.document.location=authorizationUrl;
}else{
this.child.close();
}
}});
return false;
};
function facebookPopup(_58){
xyPos="";
if(window.screenX&&window.innerWidth){
xPos=window.screenX+((window.innerWidth-550)/2);
yPos=window.screenY+((window.innerHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}else{
if(window.screenLeft&&document.body.clientHeight){
xPos=window.screenLeft+((document.body.clientWidth-550)/2);
yPos=window.screenTop+((document.body.clientHeight-300)/2);
xyPos="top="+yPos+",left="+xPos+",";
}
}
child=window.open(_58,"authwindow",xyPos+"width=550,height=300,scrollbars=no,location=yes");
child.opener=self;
if(window.focus){
this.child.focus();
}
return child;
};
function updateSocialOptions(_59,_5a){
var _5b=new Ajax.Request("/xml/socialoptions.php",{method:"post",parameters:_59+"="+(_5a?"1":"0"),onFailure:reportError,onComplete:function(req){
}});
};
function toggleShareIt(id,flg,_5c){
if(_5c===undefined){
_5c=false;
}
if(flg){
var uri=$H({art_id:id,show_warn:_5c}).toQueryString();
var _5d=new Ajax.Updater({success:"share_tgt"},"/xml/shareit.php",{parameters:uri,onFailure:reportError});
}else{
$("share_tgt").innerHTML="";
}
return false;
};
function extractParamFromUri(uri,_5e){
if(!uri){
return;
}
var _5f=new RegExp("[\\?&#]"+_5e+"=([^&#]*)");
var _60=_5f.exec(uri);
if(_60!=null){
return unescape(_60[1]);
}
return;
};
function displaySocialButtons(_61){
if("IE"==browser&&version<=7){
return false;
}
_61=_61||{};
var _62;
if(_61["pagepath"]){
_62=_61["pagepath"];
}
var _63=jQuery.ajaxSettings.cache;
jQuery.ajaxSettings.cache=true;
if(!_61["nofacebook"]){
jq.getScript("//connect.facebook.net/en_US/all.js#xfbml=1",function(_64,_65){
FB.init({xfbml:true});
if(_61["newdesign"]){
setTimeout(fetchRelatedHubSocialButtons,6000);
}
});
window.fbAsyncInit=function(){
FB.Event.subscribe("edge.create",function(_66){
_gaq.push(["t2._trackSocial","facebook","like",_66,_62]);
});
FB.Event.subscribe("edge.remove",function(_67){
_gaq.push(["t2._trackSocial","facebook","unlike",_67,_62]);
});
FB.Event.subscribe("message.send",function(_68){
_gaq.push(["t2._trackSocial","facebook","send",_68,_62]);
});
FB.Event.subscribe("xfbml.render",function(){
jq(".socialbuttons").show().trigger("display");
});
};
}else{
jq(window).bind("load",function(){
jq(".socialbuttons").show().trigger("display");
});
}
if(!_61["notwitter"]&&(browser!="IE"||version>7||document.documentMode)){
jq.getScript("//platform.twitter.com/widgets.js",function(_69,_6a){
twttr.events.bind("tweet",function(_6b){
if(_6b){
var _6c;
if(_6b.target&&_6b.target.nodeName=="IFRAME"){
_6c=extractParamFromUri(_6b.target.src,"url");
}
_gaq.push(["t2._trackSocial","twitter","tweet",_6c,_62]);
}
});
});
}
if(!_61["nogplus"]){
jq.getScript("https://apis.google.com/js/plusone.js");
}
if(!_61["nopinit"]){
jq.getScript("//assets.pinterest.com/js/pinit.js");
}
jQuery.ajaxSettings.cache=_63;
};
function checkViolations(_6d){
if(_6d){
jq(".violations_span").html("");
var _6e={check_violation:1};
}else{
var _6e={update_status:1};
}
jQuery.ajax({type:"POST",url:"/xml/checkviolations.php",data:_6e,dataType:"json",success:function(_6f){
if(_6f.data){
jq(".violations_span").html(_6f.data);
}
if(!_6f.complete){
setTimeout(checkViolations,30000);
}
}});
return false;
};
function showAskSignup(_70){
var uri=$H({btn_text:"ask!",explain:_70,show_signup:1}).toQueryString();
showAjaxOverlay("/xml/showsignup.php",uri,"linkarticle");
return false;
};
function showLinkArticle(url,_71){
var uri=$H({page_url:url,page_title:_71}).toQueryString();
showAjaxOverlay("/xml/linkarticle.php",uri,"linkarticle");
return false;
};
function showFlagHub(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flaghub.php?a="+id,uri,"flaghub");
return false;
};
function showFlagRequest(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagrequest.php?r="+id,uri,"flagrequest");
return false;
};
function showFlagProfile(id){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/flagprofile.php?u="+id,uri,"flagrequest");
return false;
};
function showEmailForm(_72,_73,_74){
var uri=$H({page_url:_72,page_type:_73,page_filter:_74}).toQueryString();
showAjaxOverlay("/xml/emailpage.php",uri,"emailhub");
return false;
};
function showEditProfileForm(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/profileform.php",uri,"editprofile");
return false;
};
function showAuthorHubOfTheDay(aid){
var uri=$H({user_id:aid}).toQueryString();
showAjaxOverlay("/xml/hotd_author.php",uri,"hotd");
return false;
};
function showTermsOfService(){
var uri=$H({}).toQueryString();
showAjaxOverlay("/xml/termsofservice.php",uri,"tos");
return false;
};
function showHubOverlay(url,_75,_76){
var uri=$H({url:url,addComment:_75,commentText:_76}).toQueryString();
showAjaxOverlay("/xml/articlerender.php",uri,"hubpage");
return false;
};
function showModuleOverlay(_77){
var uri=$H({modId:_77}).toQueryString();
showAjaxOverlay("/xml/module_render.php",uri,"hubpage");
return false;
};
function showPollsOverlay(_78,_79){
var uri=$H({moduleId:_78,pollId:_79}).toQueryString();
showAjaxOverlay("/xml/pollsrender.php",uri,"hubpage");
return false;
};
function showBioOverlay(uid){
var uri=$H({id:uid}).toQueryString();
showAjaxOverlay("/xml/userbio.php",uri,"userbio");
return false;
};
function showAjaxOverlay(_7a,_7b,_7c){
if(!$("overlay")){
var _7d=new Insertion.Before("footer","<div id=\"overlay\" class=\"overlay\" style=\"display:none\"><a id=\"overlay_close\" href=\"#\" onclick=\"return closeAjaxOverlay();\"/>close</a><div id=\"overlay_content\"><div class=\"spinner\"></div></div></div>");
}
if(_7c){
$("overlay").addClassName(_7c);
}
toggleOverlay("overlay");
var _7e=new Ajax.Updater({success:"overlay_content"},_7a,{parameters:_7b,onComplete:function(){
if(!$("fixed_title")){
return;
}
var _7f=$("fixed_title").getHeight();
if(browser!="IE"||version>6){
$("overlay").setStyle({paddingTop:_7f+"px"});
}
adjustOverlayHeight();
}.bind(this),onFailure:reportError,evalScripts:true});
};
function closeAjaxOverlay(){
toggleOverlay("overlay");
$("overlay").className="overlay";
$("overlay_content").innerHTML="<div class=\"spinner\"></div>";
return false;
};
function adjustOverlayHeight(){
var _80=browser=="IE"&&version<=6;
var _81=$("overlay");
var _82=Position.getViewportHeight();
if(_82>750){
var _83=_82-150;
}else{
var _83=_82-90;
}
var _84=_81.getStyle("paddingTop");
var _85=_81.getStyle("paddingBottom");
_83-=_84.substring(0,_84.length-2);
_83-=_85.substring(0,_85.length-2);
_83=Math.max(_83,100);
$("overlay").setStyle({height:_83+"px"});
if(_82>750){
$("overlay").setStyle({top:"75px"});
if($("fixed_title")&&!_80){
$("fixed_title").setStyle({top:"75px"});
}
}else{
$("overlay").setStyle({top:"45px"});
if($("fixed_title")&&!_80){
$("fixed_title").setStyle({top:"45px"});
}
}
if($("scrollable_content")){
var _86=$("overlay").getHeight()-$("fixed_title").getHeight()-10;
$("scrollable_content").setStyle({height:_86+"px"});
$("overlay_content").setStyle({overflowY:"visible"});
}else{
$("overlay_content").setStyle({height:(_83-60)+"px",overflowY:"auto"});
}
};
function follow(_87,_88,_89,_8a,_8b){
var _8c={typeId:_87,objectId:_88,isActive:_89,printNumbers:_8a,overrides:_8b};
var _8d=new jQuery.ajax({type:"POST",url:"/xml/follow.php",data:_8c,success:function(_8e){
if(_8e=="Not signed in"){
var url="/signin?explain=";
switch(_87){
case 1:
url+=escape("follow answers to this question");
break;
case 2:
url+=escape("follow comments to this Hub");
break;
case 3:
url+=escape("follow users");
break;
case 4:
url+=escape("follow categories");
break;
case 5:
case 6:
url+=escape("follow posts in this forum thread");
break;
}
url+="&url=";
url+=encodeURI(document.URL);
document.location.href=url;
}else{
if(_8e=="same"){
alert("You may not follow yourself");
}else{
switch(_87){
case 1:
jQuery(".follow_question_"+_88).replaceWith(_8e);
break;
case 2:
jQuery(".follow_article_"+_88).replaceWith(_8e);
break;
case 3:
var _8f=JSONstring.toObject(_8e);
jQuery("#follow_"+_88).replaceWith(_8f.buttonText);
jQuery.fancybox(_8f.fanMail,{"autoDimensions":false,"height":400});
break;
case 4:
jQuery(".follow_"+_88).replaceWith(_8e);
break;
case 5:
case 6:
jQuery("#follow_"+_88).replaceWith(_8e);
break;
}
}
}
}});
};
function updateFollowButton(_90,_91,_92,_93){
jQuery.ajax({type:"POST",url:"/xml/get_follow_text.php",data:{typeId:_90,objectId:_91,printNumbers:_92,overrides:_93},success:function(_94){
switch(_90){
case 1:
jQuery(".follow_question_"+_91).replaceWith(_94);
break;
case 2:
jQuery(".follow_article_"+_91).html(_94);
break;
case 3:
var _95=JSONstring.toObject(_94);
jQuery("#follow_"+_91).replaceWith(_95.buttonText);
break;
case 4:
jQuery(".follow_"+_91).replaceWith(_94);
break;
case 5:
jQuery("#follow_"+_91).replaceWith(_94);
break;
case 6:
jQuery("#follow_"+_91).replaceWith(_94);
break;
}
}});
};
function expandComments(id,mm,flg,_96){
if(flg){
jQuery("#comment_tgt").load("/xml/comments.php",{"mdc_id":id,"modMode":mm,"design":_96});
}else{
jQuery("#comment_tgt").html="";
}
return false;
};
function expandRequests(id,_97){
var _98=$H({article_id:id,num_pages:_97}).toQueryString();
var _99=new Ajax.Updater({success:"request_list_tgt"},"/xml/questions.php",{parameters:_98,onFailure:reportError});
return false;
};
function activity_why(id,_9a,_9b,_9c){
var _9d=new Ajax.Updater({success:id},"/xml/activity_why.php",{parameters:$H({actionTypeId:_9a,actionTargetId:_9b,createDate:_9c}).toQueryString(),onFailure:reportError,onComplete:function(){
if(typeof canvas!="undefined"&&canvas.redraw){
canvas.redraw();
}
}});
return false;
};
function article_flag(id,_9e){
var _9f=new Ajax.Updater({success:"flaglink_"+id+"_"+_9e},"/xml/flaghub.php",{parameters:$H({aID:id,reason:_9e}).toQueryString(),onFailure:reportError});
};
function ellipse(str,_a0){
if(str.length>_a0&&_a0!=0){
str=str.substr(0,_a0-3);
var pos=str.lastIndexOf(" ");
if(pos===-1){
str=str.substr(0,_a0-3)+"...";
}else{
str=str.substr(0,pos)+"...";
}
}
return str;
};
function loadRandomArt(_a1,_a2){
var _a3=new Ajax.Request("/xml/random.php",{method:"post",parameters:"score="+_a2,onFailure:reportError,onComplete:function(req){
_a1.location.href=req.responseText;
}});
};
function deleteComment(_a4,_a5){
jQuery.ajax({type:"POST",url:"/xml/comment.php",data:jq("#comment_"+_a5).serialize(),success:function(_a6){
toggleCommentEdit(_a4,false);
jq("#ctext_"+_a4).html(_a6);
jq("#cedit_"+_a4).remove();
}});
return false;
};
function toggleCommentEdit(_a7,_a8){
if(_a8){
$("cedit_"+_a7).style.display="none";
$("cbox_"+_a7).style.display="";
$("ctext_"+_a7).style.display="none";
}else{
if($("cedit_"+_a7)){
$("cedit_"+_a7).style.display="";
}
$("cbox_"+_a7).style.display="none";
$("ctext_"+_a7).style.display="";
}
};
function reportError(req){
alert("Something went wrong. Please try again. And when you get a chance, you may want to report this issue in the Hubpages forums.");
var _a9=req.getAllResponseHeaders();
var _aa=new Ajax.Request("/xml/reporterror.php",{parameters:_a9+"&error=1"});
};
function addTagEntries(){
var _ab=4;
var _ac=document.createElement("div");
_ac.id="moreEntryDiv";
var li=null;
var _ad=4+1;
var _ae=_ad+_ab;
for(var i=_ad;i<_ae;i++){
li=document.createElement("li");
_ac.appendChild(li);
var _af=document.createElement("input");
_af.className="tagEntry";
_af.name="tag_"+i;
_af.type="text";
_af.size=40;
li.appendChild(_af);
}
$("tagEntries").appendChild(_ac);
return true;
};
function hubtool_add_tag(_b0){
var _b1=(_b0)?$(_b0):$("add_tag_input");
if(!_b1){
return;
}
var tag;
if(Field.present(_b1)&&_b1.type){
tag=$F(_b1);
Field.clear(_b1);
}else{
if(_b1.innerHTML){
tag=_b1.innerHTML;
Element.remove(Element.findElement(_b1,"li"));
}
}
if(!tag){
return;
}
var _b2=0;
var _b3=/^tag_(\d+)$/i;
var _b4=$$(".tagEntry");
_b4.each(function(ele){
if(ele.id){
var ms=_b3.exec(ele.id);
if(ms&&ms.length>0){
var id=parseInt(ms[1],10);
if($F(ele).length&&id>_b2){
_b2=id;
}
}
}
});
_b2++;
var _b5="tag_"+_b2;
var _b6=$("add_tag_input").parentNode;
var _b7="<input class=\"tagEntry\" id=\""+_b5+"\" name=\""+_b5+"\" value=\""+tag+"\" size=\"30\" onFocus=\"_helpOn('help__tags')\" onBlur=\"_helpOff('help__tags')\" />";
if($(_b5)){
var _b8=$(_b5).tabIndex;
Element.update($(_b5).parentNode,_b7);
$(_b5).tabIndex=_b8;
}else{
var _b9=$("tag_1").tabIndex-1;
var _b8=_b9+_b2;
var _ba=new Insertion.Before(_b6,"<li>"+_b7+"</li>");
$(_b5).tabIndex=_b8;
_b8=$("add_tag_input").tabIndex;
_b8++;
$("add_tag_input").tabIndex=_b8;
}
return false;
};
function add_calculated_tag(_bb,tag,_bc){
var _bd=tag.replace(/'/g,"\\'");
var _be=tag.replace(/ /g,"+");
var _bf="tagd_"+tag.replace(/ /g,"_");
_bf=_bf.toLowerCase();
if($(_bf)){
$(_bf).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _c0=$("nav_tags_edit");
var _c1="<a href=\"javascript:void delete_tag('"+_bb+"','"+_bd+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_c1+="<a id=\""+_bf+"\" href=\"/tag/"+_be+"\">"+tag+"</a>";
var _c2=document.createElement("li");
_c2.innerHTML=_c1;
_c0.appendChild(_c2);
save_tag(_bb,tag,false);
}
}
var _c3=$(_bc);
Element.remove(Element.findElement(_c3,"li"));
return false;
};
function add_tag(_c4){
if(!$("add_tag_input")||!$F("add_tag_input")){
return;
}
var tag=$F("add_tag_input");
var _c5=tag.replace(/'/g,"\\'");
var _c6=tag.replace(/ /g,"+");
var _c7="tagd_"+tag.replace(/ /g,"_");
_c7=_c7.toLowerCase();
if($(_c7)){
$(_c7).style.fontWeight="bolder";
Field.clear("add_tag_input");
}else{
if(!tag.match(/^[a-zA-Z0-9 \-\'\&\.]{2,100}$/)){
alert("Invalid tag \""+tag+"\".\n\nTags should be from 2-100 characters, and contain only numbers, letters, spaces, dashes, periods, and ampersands.");
}else{
var _c8=$("nav_tags_edit");
var _c9="<a href=\"javascript:void delete_tag('"+_c4+"','"+_c5+"');\"><img src=\"http://x.hubpages.com/x/hubtool_discard_tag.gif\" width=\"14\" height=\"14\"/></a>";
_c9+="<a id=\""+_c7+"\" href=\"/tag/"+_c6+"\">"+tag+"</a>";
var _ca=document.createElement("li");
_ca.innerHTML=_c9;
_c8.appendChild(_ca);
save_tag(_c4,tag,false);
Field.clear("add_tag_input");
}
}
return false;
};
function delete_tag(_cb,tag){
if(!_cb||!tag){
return;
}
var _cc="tagd_"+tag.replace(/ /g,"_");
var _cd=$(_cc);
if(!_cd){
return;
}
var li=_cd.parentNode;
Element.remove(li);
save_tag(_cb,tag,true);
return false;
};
function save_tag(_ce,tag,del){
var _cf=(del)?1:0;
var req={a:_ce,v:tag,d:_cf};
var _d0=$H(req).toQueryString();
var _d1=new Ajax.Request("/xml/tagadd.php",{parameters:_d0,onFailure:reportError,onComplete:function(){
if(typeof updateHubtoolWarnings!="undefined"){
updateHubtoolWarnings();
}
}});
};
function handleReturnKeyPress(_d2,_d3){
_d2=_d2||window.event;
if(_d2.keyCode==Event.KEY_RETURN){
Event.stop(_d2);
_d3();
return false;
}else{
return true;
}
};
function fireOnReturn(_d4,_d5){
Event.observe(_d4,"keyup",function(_d6){
_d6=_d6||window.event;
if(_d6.which){
if(_d6.which==Event.KEY_RETURN){
_d6.preventDefault();
_d5();
}
}else{
if(_d6.keyCode){
if(_d6.keyCode==Event.KEY_RETURN){
Event.stop(_d6);
_d5();
}
}
}
},false);
};
function InlineEdit(){
};
InlineEdit._registered=[];
InlineEdit._onedit=[];
InlineEdit._ondone=[];
InlineEdit._editting=[];
InlineEdit._setonclick=false;
InlineEdit.register=function(ele,_d7){
var obj=$(ele);
obj.title="Click to edit";
obj.style.backgroundColor="#ffe";
obj.empty_text="";
InlineEdit._registered[obj.id]=_d7;
obj.highlight=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.style.backgroundColor="#ffffd3";
if(this.empty_text&&(this.innerHTML=="&nbsp;"||this.innerHTML==" "||this.innerHTML.charCodeAt(0)==160)){
this.innerHTML=this.empty_text;
}
};
obj.onmouseover=obj.highlight;
obj.onmouseout=function(){
if(this.hide_timer){
clearTimeout(this.hide_timer);
}
this.hide_timer=setTimeout("var el=$('"+this.id+"');if (el) {el.unhighlight();}",1000);
};
obj.unhighlight=function(){
this.style.backgroundColor="#ffe";
if(this.empty_text&&this.innerHTML==this.empty_text){
this.innerHTML="&nbsp;";
}
};
if(!InlineEdit._setonclick){
document.onclick=InlineEdit._handleDocClick;
InlineEdit._setonclick=true;
}
};
InlineEdit.unregister=function(ele){
var obj=$(ele);
obj.title="";
if(obj.hide_timer){
clearTimeout(obj.hide_timer);
}
obj.onmouseover=function(){
};
obj.onmouseout=function(){
};
obj.style.backgroundColor="";
delete InlineEdit._registered[obj.id];
};
InlineEdit.registerCallbacks=function(ele,_d8,_d9){
var obj=$(ele);
InlineEdit._onedit[obj.id]=_d8;
InlineEdit._ondone[obj.id]=_d9;
};
InlineEdit._handleDocClick=function(e){
if(!document.getElementById||!document.createElement){
return;
}
var obj;
if(!e){
obj=window.event.srcElement;
}else{
obj=e.target;
}
while(obj.nodeType!=1){
obj=obj.parentNode;
}
if(obj.tagName=="TEXTAREA"||obj.tagName=="A"){
return;
}
while(!InlineEdit._registered[obj.id]&&obj.nodeName!="HTML"){
obj=obj.parentNode;
}
if(obj.nodeName=="HTML"){
return;
}
InlineEdit.edit(obj);
};
InlineEdit.edit=function(ele){
ele=$(ele);
if(!InlineEdit._registered[ele.id]){
return false;
}
if(InlineEdit._onedit[ele.id]){
var _da=InlineEdit._onedit[ele.id];
_da(ele);
}
var _db=ele.innerHTML;
if(ele.empty_text&&ele.empty_text==_db){
_db=" ";
}
var _dc=document.createElement("INPUT");
_dc.type="text";
Element.cloneStyles(ele,_dc);
ele.parentNode.insertBefore(_dc,ele);
InlineEdit._insertEditSpanBefore(ele);
_dc.id=ele.id+"_edit_inplace";
InlineEdit._editting[_dc.id]=ele;
Element.remove(ele);
_dc.value=_db;
_dc.focus();
_dc.select();
return false;
};
InlineEdit._onButtonClick=function(_dd){
_dd=_dd||window.event;
var _de=_dd.target||_dd.srcElement;
var _df=(_de.innerHTML.search(/CANCEL/)==-1)?true:false;
var _e0=_de.parentNode;
var _e1=_e0;
while(_e1&&!InlineEdit._editting[_e1.id]){
_e1=_e1.previousSibling;
}
var _e2=InlineEdit._editting[_e1.id];
_e1.hasFocus=false;
var z=_e1.parentNode;
z.insertBefore(_e2,_e1);
z.removeChild(_e1);
z.removeChild(document.getElementsByClassName("buttonSpan",z)[0]);
delete InlineEdit._editting[_e1.id];
if(InlineEdit._ondone[_e2.id]){
var _e3=InlineEdit._ondone[_e2.id];
_e3(_e2);
}
if(_df){
_e2.innerHTML=(_e1.value.length>0)?_e1.value:"&nbsp;";
var _e4=InlineEdit._registered[_e2.id];
_e4(_e1.value);
}
};
InlineEdit._insertEditSpanBefore=function(obj){
if(document.getElementById&&document.createElement){
var _e5=document.createElement("span");
_e5.className="buttonSpan";
var _e6=document.createElement("button");
var _e7=document.createTextNode("OK");
_e6.appendChild(_e7);
_e5.appendChild(_e6);
var _e8=document.createElement("button");
var _e9=document.createTextNode("CANCEL");
_e8.appendChild(_e9);
_e5.appendChild(_e8);
obj.parentNode.insertBefore(_e5,obj);
_e6.onclick=InlineEdit._onButtonClick;
_e8.onclick=InlineEdit._onButtonClick;
}
};
var SampleDuration=Class.create();
SampleDuration.prototype={initialize:function(_ea){
this.art_id=_ea;
this.t=new Timer();
this.onleaveListener=this.onleave.bindAsEventListener(this);
Event.observe(window,"beforeunload",this.onleaveListener,false);
},onleave:function(e){
e=e||window.event;
this.t.stop();
var _eb=$H({art_id:this.art_id,dur:this.t.length});
var _ec=new Ajax.Request("/xml/duration",{parameters:_eb.toQueryString()});
}};
var myGlobalHandlers={onCreate:function(){
this.flag(true);
},onComplete:function(){
if(Ajax.activeRequestCount==0){
this.flag(false);
this.shouldShowIcon=false;
}
},onScroll:function(){
var div=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(div){
var _ed=insideHubEditor?200:0;
div.style.top=(Position.getViewportScrollY()+_ed)+"px";
}
},flagUp:function(){
this.flag(true);
},flagDown:function(){
this.flag(false);
},flag:function(up){
if(up){
this.shouldShowIcon=true;
setTimeout(this.showIcon.bind(this),2000);
}else{
if(!this.iconVisible){
return;
}
var _ee=insideHubEditor?$("ajaxing_big"):$("ajaxing");
if(_ee){
this.shouldShowIcon=false;
_ee.style.display="none";
Event.stopObserving(window,"scroll",this.scrollListener,false);
this.scrollListener=null;
this.iconVisible=false;
}
}
},showIcon:function(id){
if(this.shouldShowIcon&&!this.iconVisible&&Ajax.activeRequestCount>0){
this.iconVisible=true;
var _ef=insideHubEditor?$("ajaxing_big"):$("ajaxing");
_ef.style.display="inline";
this.onScroll();
this.scrollListener=this.onScroll.bindAsEventListener(this);
Event.observe(window,"scroll",this.scrollListener,false);
}
}};
Ajax.Responders.register(myGlobalHandlers);
Element.setOpacity=function(ele,_f0){
ele=$(ele);
if(window.ActiveXObject){
ele.style.filter="alpha(opacity="+Math.round(_f0*100)+")";
}
ele.style.opacity=_f0;
};
Element.getCurrentStyle=function(ele){
ele=$(ele);
var _f1;
if(document.defaultView){
_f1=document.defaultView.getComputedStyle(ele,"");
}else{
_f1=ele.currentStyle;
}
return _f1;
};
Element.cloneStyles=function(ele,_f2,_f3){
ele=$(ele);
_f2=$(_f2);
var _f4=Element.getCurrentStyle(ele);
for(var _f5 in _f4){
if(browser=="Opera"){
if(_f5=="height"||_f5=="pixelHeight"||_f5=="pixelWidth"||_f5=="posHeight"||_f5=="posWidth"||_f5=="width"||_f5=="font"||_f5=="fontSize"){
continue;
}
}
var _f6=_f4[_f5];
if(_f6!==""&&!(_f6 instanceof Object)&&_f5!="length"&&_f5!="parentRule"){
if(_f3&&_f5.indexOf(_f3)!==0){
continue;
}
_f2.style[_f5]=_f6;
}
}
return _f2;
};
Element.findElement=function(_f7,_f8){
_f7=$(_f7);
while(_f7.parentNode&&(!_f7.tagName||(_f7.tagName.toUpperCase()!=_f8.toUpperCase()))){
_f7=_f7.parentNode;
}
return _f7;
};
String.prototype.trim=function(){
var res=this;
while(res.substring(0,1)==" "){
res=res.substring(1,res.length);
}
while(res.substring(res.length-1,res.length)==" "){
res=res.substring(0,res.length-1);
}
return res;
};
String.prototype.startsWith=function(_f9){
var res=this;
return res.substring(0,_f9.length)==_f9;
};
Element.getWidth=function(ele){
ele=$(ele);
return ele.offsetWidth;
};
Element.ellipsis=function(ele,len){
len=len||(100);
var p=$(ele);
if(p&&p.innerHTML){
var _fa=p.innerHTML;
if(_fa.length>len){
_fa=_fa.substring(0,len);
_fa=_fa.replace(/\w+$/,"");
_fa+="...";
p.innerHTML=_fa;
}
}
};
Position.getViewportHeight=function(){
if(window.innerHeight!=window.undefined){
return window.innerHeight;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return window.undefined;
};
Position.getViewportWidth=function(){
if(window.innerWidth!=window.undefined){
return window.innerWidth;
}
if(document.compatMode=="CSS1Compat"){
return document.documentElement.clientWidth;
}
if(document.body){
return document.body.clientWidth;
}
return window.undefined;
};
Position.getDocumentHeight=function(){
return document.documentElement.scrollHeight;
};
Position.getDocumentWidth=function(){
return document.documentElement.scrollWidth;
};
Position.getViewportScrollX=function(){
var _fb=0;
if(document.documentElement&&document.documentElement.scrollLeft){
_fb=document.documentElement.scrollLeft;
}else{
if(document.body&&document.body.scrollLeft){
_fb=document.body.scrollLeft;
}else{
if(window.pageXOffset){
_fb=window.pageXOffset;
}else{
if(window.scrollX){
_fb=window.scrollX;
}
}
}
}
return _fb;
};
Position.getViewportScrollY=function(){
var _fc=0;
if(document.documentElement&&document.documentElement.scrollTop){
_fc=document.documentElement.scrollTop;
}else{
if(document.body&&document.body.scrollTop){
_fc=document.body.scrollTop;
}else{
if(window.pageYOffset){
_fc=window.pageYOffset;
}else{
if(window.scrollY){
_fc=window.scrollY;
}
}
}
}
return _fc;
};
Position.viewportPosition=function(id){
var off=jq("#"+id).offset();
eleBot=off.top+jq("#"+id).height();
var _fd=jq(window).scrollTop();
var _fe=_fd+jq(window).height();
if(eleBot<_fd){
return -1;
}
if(off.top>_fe){
return 1;
}
return 0;
};
Position.withinViewport=function(ele){
var off=Position.cumulativeOffset($(ele));
var _ff=[0+Position.getViewportScrollX(),Position.getViewportScrollY()];
var _100=[_ff[0]+Position.getViewportWidth(),_ff[1]+Position.getViewportHeight()];
return (_ff[0]<off[0]&&off[0]<_100[0]&&_ff[1]<off[1]&&off[1]<_100[1]);
};
Position.set=function(ele,_101){
if(ele&&_101){
ele.style.left=_101[0]+"px";
ele.style.top=_101[1]+"px";
}
};
function check_signed_in_ajax(_102,_103){
jQuery.ajax({url:"/xml/checksignedin.php",complete:function(_104,_105){
_102(eval(_104.responseText),_103);
}});
};
function phone_verify_required(_106,_107,_108,_109){
if(typeof (_109)=="undefined"){
data={};
}else{
data={a:_109};
}
jq.post("/xml/verify/phoneverifyrequired.php",data,function(req){
if(req){
require_phone_verification(_106);
}else{
_107.apply(null,_108);
}
},"json");
};
function require_phone_verification(_10a,_10b){
url="/xml/verify/phone.php";
if(typeof (_10b)!="undefined"&&_10b){
url+="?update=1";
}
jq.post(url,{inOrderToDoWhat:_10a},function(rsp){
jq.fancybox({content:"<div id=\"phone_verify\">"+rsp+"</div>",overlayColor:"#000",overlayOpacity:0.8,titleShow:false,autoDimensions:false,height:300});
});
};
function select_all(name,_10c,end){
for(var i=_10c;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=true;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=(end-_10c)+1;
}
update_plural(name);
};
function unselect_all(name,_10d,end){
for(var i=_10d;i<=end;i++){
var ele=$(name+"_"+i);
if(ele){
ele.checked=false;
}
}
var disp=$(name+"_selected");
if(disp){
disp.innerHTML=0;
}
update_plural(name);
};
function checkbox_onchange(name,num){
var disp=$(name+"_selected");
if(disp){
var ele=$(name+"_"+num);
if(ele.checked){
disp.innerHTML=parseInt(disp.innerHTML,10)+1;
update_plural(name);
}else{
disp.innerHTML=parseInt(disp.innerHTML,10)-1;
update_plural(name);
}
}
};
function update_plural(name){
var ele=document.getElementById(name+"_selected");
if(ele){
var disp=document.getElementById(name+"_plural");
if(disp){
if(parseInt(ele.innerHTML,10)==1){
disp.innerHTML=" is";
}else{
disp.innerHTML="s are";
}
}
}
};
function import_now(_10e,name,_10f,end){
var _110=self.opener.document.getElementById(_10e);
if(_110){
for(var i=_10f;i<=end;i++){
var ele=$(name+"_"+i);
if(ele&&ele.checked){
var _111=$(name+"_email_"+i);
if(_110.value.length<2||_110.value.charAt(_110.value.length)==","||_110.value.charAt(_110.value.length-1)==","){
_110.value=_110.value+_111.innerHTML;
}else{
_110.value=_110.value+", "+_111.innerHTML;
}
}
}
}else{
alert("cannot locate parent (opener) window!");
}
};
function charCounter(_112,_113,max){
var _114=document.getElementById(_112);
var _115=document.getElementById(_113);
if(!_114){
alert("charCounter bad source: "+_112);
}
if(!_115){
alert("charCounter bad source: "+_113);
}
if(_114.value.length>max){
_114.value=_114.value.substring(0,max);
}
_115.value=max-_114.value.length;
};
function hideAnswers(){
$("hiddenAnswers").hide();
$("hideAnswers").hide();
$("showAnswers").show();
return false;
};
function showAnswers(){
$("hiddenAnswers").show();
$("hideAnswers").show();
$("showAnswers").hide();
return false;
};
function fetchAnswers(_116,_117,_118){
var _119=$H({answerIds:_116,enableVoting:_117,enableEditing:_118}).toQueryString();
new Ajax.Updater("hiddenAnswers","/xml/answerfetch.php",{parameters:_119,onComplete:function(_11a){
supportAnswerDeletion();
}});
$("hideAnswers").show();
$("fetchAnswers").hide();
return false;
};
function answerVote(id,_11b,v){
if(_11b===undefined){
_11b=true;
}
jq.ajax({url:"/xml/answervote.php",type:"POST",data:{id:id,vote:v,timeIndicator:_11b},dataType:"html",success:function(html){
jq(".voting_"+id).html(html);
}});
return false;
};
function answerVoteDown(id,_11c){
return answerVote(id,_11c,-1);
};
function answerVoteUp(id,_11d){
return answerVote(id,_11d,1);
};
function fetchRecaptcha(_11e){
var _11f="6LemUQQAAAAAAC6mNwmiXb8ZwmUU0R9Z5v_yZ5xl";
if(typeof (Recaptcha)=="undefined"){
var _120=document.getElementsByTagName("head")[0];
var _121=document.createElement("script");
_121.type="text/javascript";
_121.src="http://api.recaptcha.net/js/recaptcha_ajax.js";
_121.onload=function(){
Recaptcha.create(_11f,_11e,{theme:"red"});
};
_121.onreadystatechange=function(){
if(this.readyState=="loaded"||this.readyState=="complete"){
Recaptcha.create(_11f,_11e,{theme:"red"});
}
};
_120.appendChild(_121);
}else{
Recaptcha.create(_11f,_11e,{theme:"red"});
}
};
function whenSignedIn(_122,fn){
args=Array.prototype.slice.call(arguments);
args=args.slice(2);
info={options:_122,fn:fn,args:args};
check_signed_in_ajax(whenSignedInCallback,info);
return false;
};
function whenSignedInCallback(_123,info){
if(_123){
info.fn.apply(null,info.args);
}else{
if(jQuery("#signInOverlay").size()==0){
var html="<div id=\"signInOverlay\" class=\"overlay\" style=\"display: none;\">";
html+="<a class=\"close\" href=\"#\" onclick=\"toggleOverlay('signInOverlay'); return false;\">close</a>";
html+="<div id=\"signInOverlayContent\"></div>";
html+="</div>";
jQuery("body").append(html);
}
jQuery.get("/xml/signinupform.php",info.options,function(data){
jQuery("#signInOverlayContent").html(data);
suFH.onSuccess=afterSignedIn.bind(null,info);
siFH.onSuccess=afterSignedIn.bind(null,info);
if(typeof (fetchRecaptcha)!="undefined"){
fetchRecaptcha("captcha_div");
}
toggleOverlay("signInOverlay");
});
}
return false;
};
function afterSignedIn(info){
toggleOverlay("signInOverlay");
info.fn.apply(null,info.args);
};
function getElementScreenTop(){
var _124=(window.pageYOffset)?window.pageYOffset:(document.documentElement)?document.documentElement.scrollTop:document.body.scrollTop;
return _124;
};
function setElementScreenTop(top){
if(window.pageYOffset){
var x=window.pageXOffset;
window.scrollTo(x,top);
}else{
if(document.documentElement){
document.documentElement.scrollTop=top;
}else{
document.body.scrollTop=top;
}
}
};
function getElementTop(elem){
var top=0;
do{
top+=elem.offsetTop;
elem=elem.offsetParent;
}while(elem!=null);
return top;
};
function getElementLeft(elem){
var left=0;
do{
left+=elem.offsetLeft;
elem=elem.offsetParent;
}while(elem!=null);
return left;
};
function getElementRight(elem){
return getElementLeft(elem)+elem.getWidth();
};
function getElementBottom(elem){
return getElementTop(elem)+elem.getHeight();
};
function StringBuffer(){
this.buffer=[];
};
StringBuffer.prototype.append=function(_125){
this.buffer.push(_125);
return this;
};
StringBuffer.prototype.toString=function toString(){
return this.buffer.join("");
};
function search_escape(str){
newstr=encodeURI(str);
newstr=newstr.replace(/\%20/g,"+");
return newstr;
};
var Timer=Class.create();
Timer.prototype={initialize:function(){
this.start();
},start:function(){
this.startTime=new Date();
},stop:function(){
this.stopTime=new Date();
this.length=(this.stopTime-this.startTime);
},inspect:function(){
if(!this.stopTime){
this.stop();
}
return "duration: "+this.length+"ms";
}};
function setupNavMenu(){
jq(document).ready(function(){
var _126=(navigator.userAgent.match(/iPhone/i))||(navigator.userAgent.match(/iPod/i))||(navigator.userAgent.match(/iPad/i))?"touchstart":"click";
if(_126=="touchstart"){
jq("#header_explore").bind(_126+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#user_menu").css("display","");
jq("#explore_menu").show();
});
jq("#header_notifications").bind(_126+".nav",function(){
jq("#explore_menu").css("display","");
jq("#user_menu").css("display","");
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin").bind(_126+".nav",function(){
jq("#notifications_menu").css("display","");
jq("#explore_menu").css("display","");
jq("#user_menu").show();
});
jq("html").bind(_126+".nav",function(){
nav_hide_all_menus();
});
jq("#nav").bind(_126+".nav",function(_127){
_127.stopPropagation();
});
}
jq("#header_explore a").bind("focusin",function(_128){
jq("#notifications_menu").hide();
jq("#user_menu").hide();
jq("#explore_menu").show();
});
jq("#header_notifications a").bind("focusin",function(_129){
jq("#explore_menu").hide();
jq("#user_menu").hide();
jq("#notifications_menu").show();
resetNotificationCheckpoint();
});
jq("#header_signedin a").bind("focusin",function(_12a){
jq("#notifications_menu").hide();
jq("#explore_menu").hide();
jq("#user_menu").show();
});
jq("#starthub_span").bind("focusin",function(_12b){
nav_hide_all_menus();
});
jq("#signin_span").bind("focusin",function(_12c){
nav_hide_all_menus();
});
jq("#join_span").bind("focusin",function(_12d){
nav_hide_all_menus();
});
jq("#search_input").bind("focusin",function(_12e){
nav_hide_all_menus();
});
jq("#search_button").bind("focusin",function(_12f){
nav_hide_all_menus();
});
jq("html").bind("click",function(_130){
nav_hide_all_menus();
});
jq("#nav").bind("click",function(_131){
_131.stopPropagation();
});
});
};
function nav_hide_all_menus(){
jq("#nav .nav_menu_list").css("display","");
};
function initTurboHub(_132){
initTurboHubShare(_132);
};
function initTurboHubShare(_133){
if(!(navigator.userAgent.match(/iPad/i)&&navigator.userAgent.match(/OS [1-4]_\d/i))){
jq(window).scroll(socialWidgetUpdate).resize(socialWidgetUpdate);
}
jq(".socialbuttons").bind("display",function(){
socialWidgetUpdate();
if("IE"==browser&&version<=8){
jq("#share_hub").css("visibility","visible");
}else{
jq("#share_hub").css({visibility:"visible",opacity:0.01}).animate({opacity:1},800);
}
});
setTimeout(function(){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({pagepath:_133,nogplus:true});
}
},3000);
};
function socialWidgetUpdate(){
var _134=20;
var pos=jq(this).scrollTop();
var _135=jq("#share_hub");
var _136=jq("#hub_container");
var _137=0;
var _138=jq(".moduleHostedVideo");
if(_138.size()){
_137=_138.first().position().top+_138.first().outerHeight();
}
var _139=_136.height()-_135.outerHeight();
var _13a=_136.offset();
if(_13a.top+_137-pos<_134){
if(pos>_13a.top+_139){
_135.css({position:"absolute",top:_139+"px",right:0,left:"auto"});
}else{
_135.css({position:"fixed",top:_134+"px",left:(573+_13a.left)+"px",right:"auto"});
}
}else{
_135.css({position:"absolute",top:_137+"px",right:0,left:"auto"});
}
};
function google_ad_request_done(_13b){
var s="";
var i;
if(_13b.length==0){
return;
}
if(_13b[0].type=="flash"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>"+"<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\""+" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" WIDTH=\""+_13b[0].image_width+"\" HEIGHT=\""+_13b[0].image_height+"\"> <PARAM NAME=\"movie\" VALUE=\""+_13b[0].image_url+"\">"+"<PARAM NAME=\"quality\" VALUE=\"high\">"+"<PARAM NAME=\"AllowScriptAccess\" VALUE=\"never\">"+"<EMBED src=\""+_13b[0].image_url+"\" WIDTH=\""+_13b[0].image_width+"\" HEIGHT=\""+_13b[0].image_height+"\" TYPE=\"application/x-shockwave-flash\""+" AllowScriptAccess=\"never\" "+" PLUGINSPAGE=\"http://www.macromedia.com/go/getflashplayer\"></EMBED></OBJECT>";
}else{
if(_13b[0].type=="image"){
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br> <a href=\""+_13b[0].url+"\" target=\"_top\" title=\"go to "+_13b[0].visible_url+"\" onmouseout=\"window.status=''\" onmouseover=\"window.status='go to "+_13b[0].visible_url+"';return true\"><img border=\"0\" src=\""+_13b[0].image_url+"\"width=\""+_13b[0].image_width+"\"height=\""+_13b[0].image_height+"\"></a>";
}else{
if(_13b[0].type=="html"){
s+=_13b[0].snippet;
}else{
s+="<div class=\"cjs_wrapper\">";
s+="<a class=\"adsbygoogle\" href=\""+google_info.feedback_url+"\">Ads by Google</a><br>";
for(i=0;i<_13b.length;++i){
ad=_13b[i];
s+="<div class=\"cjs_titleurl\">";
s+="<a class=\"cjs_title\" href=\""+ad.url+"\">"+ad.line1+"</a> ";
s+="<a class=\"cjs_url\" href=\""+ad.url+"\">"+ad.visible_url+"</a>";
s+="</div>";
s+="<div class=\"cjs_desc\">"+ad.line2+" "+ad.line3+"</div>";
}
s+="</div>";
}
}
}
document.write(s);
return;
};
function hubAnchorUpdate(){
var _13c=jq.address.value().substr(1);
if(""==_13c){
return;
}
var _13d=false;
if(_13c.substr(0,8)=="comment-"){
_13d=true;
_13c="comment"+_13c.substr(8);
}
if("morecomments"==_13c||_13d){
jq("#moreParagraph").remove();
jq("#additional_comments").show();
}
if("comments"==_13c){
ssToId("comFirst");
}else{
if("morecomments"==_13c){
}else{
ssToId(_13c);
}
}
};
function supportAnswerDeletion(){
jQuery(".answer_delete").click(function(_13e){
id=jQuery(_13e.target).attr("id");
id=id.replace("answer_delete_","");
jQuery.ajax({url:"/xml/delete_answer?id="+id,success:function(data){
jQuery("#"+id).html(data);
if(data=="Undelete Answer"){
jQuery("#answer"+id).css("opacity",0.4);
}else{
jQuery("#answer"+id).css("opacity",1);
}
jQuery("#answer"+id).effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function toggleRequestCommentEdit(id){
jq("#edit_rc_"+id).css("display","block");
};
function submitRequestCommentEdit(i){
var txt=jq("#edit_rc_"+i+" textarea").val();
if(txt==""){
var _13f="#edit_rc_error_"+i;
jQuery(_13f).html("You cannot submit an empty comment.");
}else{
jq.ajax({url:"/xml/request_comment_edit.php",type:"POST",data:{id:i,text:txt},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#edit_rc_error_"+i).html(data.msg);
jQuery("#edit_rc_error_"+i).show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jq("#rc_"+i).replaceWith(data.msg);
jq("#rc_"+i).effect("highlight",{color:"yellow"},1000);
}
}});
}
return false;
};
function supportRequestCommentDeletion(){
jQuery(".request_comment_delete").click(function(_140){
orig_id=jQuery(_140.target).attr("id");
id=orig_id.replace("rcd_","");
jQuery.ajax({url:"/xml/delete_request_comment?id="+id,success:function(data){
jQuery("#"+orig_id).html(data);
if(data=="Undelete Comment"){
jQuery("#"+orig_id).parent().css("opacity",0.4);
}else{
jQuery("#"+orig_id).parent().css("opacity",1);
}
jQuery("#"+orig_id).parent().effect("highlight",{color:"yellow"},1000);
}});
return false;
});
};
function showAnswerCommentBox(id,_141){
if(jQuery(id).next().attr("id")=="answer_comment"&&jQuery("#answer_comment").css("display")=="block"){
jQuery("#answer_comment").css("display","none");
jQuery("input[name=\"commentSubmit\"]").unbind("click");
}else{
jQuery("#answer_comment").css("display","block");
jQuery("#answer_comment textarea").val("");
var form=jQuery("#answer_comment").detach();
jQuery(id).after(form);
var idx=id.substring(id.indexOf("_")+1);
jQuery("input[name=\"commentSubmit\"]").unbind("click");
jQuery("input[name=\"commentSubmit\"]").click(function(){
submitAnswerComment(idx);
return false;
});
}
jQuery("#rc_numcharsvalue").html(_141);
jQuery("#comment_form input[type=submit]").removeAttr("disabled");
};
function submitAnswerComment(i){
var _142="#result_"+i;
var _143="#error_"+i;
var txt=jQuery("#answer_comment textarea").val();
if(txt==""){
jQuery("#rc_error").html("You cannot submit an empty comment");
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
var f=jQuery("#answer_comment input[name=\"follow\"]").attr("checked");
jQuery.ajax({url:"/xml/request_comment_submit.php",type:"POST",data:{id:i,text:txt,follow:f},success:function(data){
data=jq.parseJSON(data);
if(data["valid"]==0){
jQuery("#rc_error").html(data.msg);
jQuery("#rc_error").show();
jQuery("#answer_comment input[type=submit]").attr("disabled",false);
}else{
jQuery("#answer_comment").fadeOut("slow",function(){
jQuery("#answer_comment").prev().css("display","none");
jQuery(_142).append(data.msg);
var _144=jQuery(_142).children().last().attr("id");
jQuery(_142).children().last().attr("id","newComment");
jQuery("html, body").animate({scrollTop:jQuery("#newComment").offset().top+"px"},2000,"swing",function(){
jQuery("#newComment").attr("id",_144);
});
});
}
}});
}
};
function loadRatingSystem(_145,_146,_147,_148){
jq("form.rating").starrating({success:function(data){
data=jq.parseJSON(data);
if(!data.already_rated){
var num=Number(data.avg);
jq(".rating").attr("title","Average Rating: "+num);
jq(".moduleRatingResults").html(data.render);
}else{
alert("You have already rated this subject.");
}
},disableOnSubmit:false,disabled:_145,params:{id:_148},ratingClass:"rating"});
};
function hpFormHandler(_149){
this.submitMode=false;
this.submitUri="/";
this.nextUri="/";
this.lit=false;
this.form=$(_149);
this.errors=$H({});
this.method="post";
this.errorId="formErrors";
this.errorHeader="<strong>Please fix these errors before continuing:</strong><br/>";
this.useEffects=true;
this.individualerrors=false;
this.scrollToErrors=false;
this.ensureSignedInBeforeSave=false;
this.ensureSignedInOptions={};
this.ensureCheckedSecurity=false;
this.lastCheckedSecurity=new Date().getTime()-(1000*1000);
this.setValidators();
};
hpFormHandler.prototype.handleSubmitServerError=function(req){
};
hpFormHandler.prototype.validateHideDiv=function(id){
$(id).hide();
};
hpFormHandler.prototype.validateLengthMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(($F(ele).trim().length>max),ele,msg);
};
hpFormHandler.prototype.validateLengthMin=function(ele,min,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length<min),ele,msg);
};
hpFormHandler.prototype.validateLengthExactly=function(ele,len,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.length!=len),ele,msg);
};
hpFormHandler.prototype.validateValueMin=function(ele,min,msg){
var val=$F(ele);
this.testForError(val<min,ele,msg);
};
hpFormHandler.prototype.validateValueMax=function(ele,max,msg){
var val=$F(ele);
this.testForError(val>max,ele,msg);
};
hpFormHandler.prototype.validateMandatory=function(ele,msg){
var val=false;
if($F(ele)){
val=$F(ele).trim();
}
this.testForError((!val||val.length==0),ele,msg);
};
hpFormHandler.prototype.validateRadioChecked=function(ele,msg){
if(!ele.name){
return;
}
var _14a=$$("input[name="+ele.name+"]");
var _14b=false;
_14a.each(function(r){
if(r.checked==true){
_14b=true;
throw $break;
}
});
this.testForError(!_14b,ele,msg);
};
hpFormHandler.prototype.validateEnoughSpaces=function(ele,msg){
val=$F(ele).trim();
var _14c=false;
if(val.length>=20){
var _14d=val.match(/\s+/g);
var _14e=_14d?_14d.length:0;
var _14f=_14e+1;
_14c=_14f/(val.length-_14e)<0.08;
}
this.testForError(_14c,ele,msg);
};
hpFormHandler.prototype.validateIsNumeric=function(ele,msg){
this.validateRegex(ele,/^\s*[0-9]*\s*$/,msg);
};
hpFormHandler.prototype.validateRegex=function(ele,_150,msg){
var val=$F(ele);
this.testForError((val.length!=0&&val.search(_150)==-1),ele,msg);
};
hpFormHandler.prototype.validateNoRegex=function(ele,_151,msg){
var val=$F(ele);
this.testForError((val.search(_151)!=-1),ele,msg);
};
hpFormHandler.prototype.validateNoSpaces=function(ele,msg){
var val=$F(ele).trim();
this.testForError(val.search(/ /)!=-1,ele,msg);
};
hpFormHandler.prototype.validateNot=function(ele,not,msg){
this.testForError(($F(ele).trim()==not),ele,msg);
};
hpFormHandler.prototype.validateSameAs=function(ele,ele2,msg){
this.testForError(($F(ele)!=$F(ele2)),ele,msg);
};
hpFormHandler.prototype.validateNoWords=function(ele,_152,msg){
var val=$F(ele);
var _153=false;
for(i=0;i<_152.length&&!_153;i++){
var _154=new RegExp("[^a-zA-Z]"+_152[i]+"[^a-zA-Z]","i");
_153=(val.search(_154)>=0);
if(!_153){
_154=new RegExp("^"+_152[i]+"[^a-zA-Z]","i");
_153=(val.search(_154)>=0);
}
if(!_153){
_154=new RegExp("[^a-zA-Z]"+_152[i]+"$","i");
_153=(val.search(_154)>=0);
}
if(!_153){
_154=new RegExp("^"+_152[i]+"$","i");
_153=(val.search(_154)>=0);
}
}
this.testForError(_153,ele,msg);
};
hpFormHandler.prototype.validateServerCheck=function(ele,url,msg){
var val=$F(ele);
if(val.length==0){
return;
}
if(ele.lastGoodValue&&ele.lastGoodValue==val){
return;
}
val=encodeURIComponent(val);
var _155=new Ajax.Request(url,{method:"post",parameters:ele.id+"="+val,onComplete:function(req){
eval(req.responseText);
if(!valid&&typeof msg=="object"){
if(typeof errorCode!="undefined"&&typeof msg[errorCode]!="undefined"){
msg=msg[errorCode];
}else{
msg=msg[0];
}
}
this.testForError(!valid,ele,msg);
if(valid){
ele.lastGoodValue=val;
}
this._showErrors();
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:reportError});
};
hpFormHandler.prototype.checkAnsweredSecurityQuestionBeforeSave=function(){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
this.lastCheckedSecurity=new Date().getTime();
this._showErrors();
}else{
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _156=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
return;
}
this.form.submit();
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function validateCheckedSecurityAndSubmit(form,fn,args){
new Ajax.Request("/xml/profile/securityquestion.php",{method:"get",onComplete:function(req){
eval(req.responseText);
if(!valid){
showAskSecurityQuestion();
}else{
if(typeof (fn)=="function"){
fn.apply(form,args);
}else{
form.submit();
}
}
}.bind(this),onException:function(){
alert("There was an error performing server side validation of your input, proceed with caution.");
},onFailure:"There was an error performing server side validation of your input, proceed with caution."});
};
function showAskSecurityQuestion(){
var aEl=jq("<a class=\"iframe\" href=\"/my/profile/security_ask_iframe.php\" style=\"display:none\">This goes to iframe</a>");
jq("#container").append(aEl);
jq(".iframe").fancybox({"hideOnContentClick":false,"hideOnOverlayClick":false,"enableEscapeButton":false,"showCloseButton":false,"width":750,"height":170,"scrolling":"no"});
jq(".iframe").click();
};
hpFormHandler.prototype.validateEmailList=function(ele){
var _157=800;
var _158=6;
this.validateLengthMin(ele,_158,"The address you entered is too short. Please use an address at least "+_158+" characters in length.");
this.validateNoRegex(ele,/\$/,"Dollar signs are not valid in an email address.");
this.validateNoRegex(ele,/\\/,"Backslashes are not valid in an email address.");
this.validateRegex(ele,/\@/,"A valid email address must contain an @ symbol.");
};
hpFormHandler.prototype.validateEmail=function(ele){
this.validateEmailList(ele);
var _159=200;
this.validateLengthMax(ele,_159,"Your email address is too long. Please use a shorter address.");
this.validateNoSpaces(ele,"Spaces are not valid characters in an email address.  Please recheck your address.");
};
hpFormHandler.prototype.validateEmailName=function(ele){
var _15a=2;
var _15b=200;
this.validateLengthMin(ele,_15a,"Your name is too short.  Please enter at least 2 characters.");
this.validateLengthMax(ele,_15b,"Your name is too long. Please use a shorter name.");
};
hpFormHandler.prototype.validatePhone=function(ele){
var val=$F(ele);
var us=/^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$/;
this.testForError(!us.test(val)&&val.length>0,ele,"Please enter a valid phone number");
};
hpFormHandler.prototype.validatePostal=function(ele){
var val=$F(ele).trim();
var _15c=false;
var us=/^\d{5}(-\d{4})?$/;
var ca=/[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] \d[ABCEGHJKLMNPRSTVWXYZ]\d/i;
var gb=/^[A-Za-z]{1,2}[\d]{1,2}([A-Za-z])?\s?[\d][A-Za-z]{2}$/i;
if(val.length==0||(us.test(val)||ca.test(val)||gb.test(val))){
_15c=true;
}
this.testForError(!_15c,ele,"Please enter a valid postal code");
};
hpFormHandler.prototype.validateNewPassword=function(ele1,ele2){
ele1=$(ele1);
ele2=$(ele2);
var _15d=40;
var _15e=5;
this.validateMandatory(ele1,"Please protect your hubpages account with a password.");
this.validateLengthMin(ele1,_15e,"Your password is too short.  Protect your account by choosing a password that is at least  "+_15e+" characters long.  Safety first!");
this.validateLengthMax(ele1,_15d,"Your password is too long; it will be difficult to type.  Please use a shorter password.");
this.validateMandatory(ele2,"Please confirm your password.");
this.validateSameAs(ele1,ele2,"Your passwords do not match.  Please retype them.");
};
hpFormHandler.prototype.validateTag=function(ele){
ele=$(ele);
var _15f=60;
var _160=3;
this.validateRegex(ele,/^[\w\s\$\-\'\%\&]*$/,"Please use only alphanumeric and $, ', % or & characters in your tag.");
this.validateLengthMin(ele,3,"A tag should be at least three characters long.");
this.validateLengthMax(ele,_15f,"A tag should not be longer than 60 characters.");
};
hpFormHandler.prototype.validateGroupName=function(ele,_161){
this.validateMandatory(ele,"Please specify a group name.");
this.validateLengthMax(ele,50,"Group names may be no longer than 50 characters.");
this.validateRegex(ele,/^[\w\s\$\-\'\%\&\!\?]*$/,"Please use only alphanumeric and $, ', -, %, !, ? or & characters in your group name.");
existingName=_161.detect(function(name){
return ($F(ele)==name);
});
this.testForError(existingName,ele,"You already have a group with this name.  Please select it from the list, or enter a new name.");
};
hpFormHandler.prototype.observe=function(){
new Form.EventObserver(this.form,this._elemsChanged.bind(this));
};
hpFormHandler.prototype.focusFirst=function(){
Form.focusFirstElement(this.form);
};
hpFormHandler.prototype.tabOnEnter=function(){
hpFormHandler.tabOnEnter(this.form);
};
hpFormHandler.tabOnEnter=function(form){
if(!$(form)){
return;
}
var _162=$A($(form).getElementsByTagName("input"));
_162.each(function(node){
Event.observe(node,"keydown",_handleInputKeypress,false);
});
};
hpFormHandler.prototype.ghostField=function(_163,_164,_165){
if($(_163)&&$(_164)){
var gw=new GhostWatcher(_163,_164,_165);
}
};
hpFormHandler.prototype.setValidators=function(_166,_167){
this.toValidate=$H(_166);
this.toValidateOnsubmit=$H(_167);
};
hpFormHandler.prototype.hasErrors=function(){
return (this.errors&&this.errors.keys()&&this.errors.keys().length>0);
};
hpFormHandler.prototype.cancel=function(){
this.reset();
};
hpFormHandler.prototype.reset=function(){
Form.reset(this.form);
if(this.cancelUri){
location.href=this.cancelUri;
}
};
hpFormHandler.prototype.valid=function(){
this._runValidators(true);
if(this.hasErrors()){
return false;
}
return true;
};
hpFormHandler.prototype.save=function(_168){
if(this.ensureSignedInBeforeSave&&!_168){
whenSignedIn(this.ensureSignedInOptions,this.save.bind(this,true));
return false;
}
this.form.descendants().each(function(elt){
if(elt&&elt.tagName&&elt.hasClassName&&(elt.tagName=="TEXTAREA"||elt.tagName=="INPUT")&&elt.hasClassName("dimmed")){
elt.value="";
}
});
this._runValidators(true);
if(this.hasErrors()){
if(this.scrollToErrors){
var _169=new fx.Scroll({duration:100});
_169.scrollTo(this.errorDiv);
}
return false;
}
if((this.ensureCheckedSecurity)&&(new Date().getTime()-this.lastCheckedSecurity>1000*15)){
this.checkAnsweredSecurityQuestionBeforeSave();
return false;
}
if(window.tinyMCE&&tinyMCE.triggerSave){
try{
tinyMCE.triggerSave(false,true);
}
catch(e){
}
}
if(!this.submitMode){
this.params="ajax=1&"+Form.serialize(this.form);
var _16a=new Ajax.Request(this.submitUri,{method:this.method,parameters:this.params,onComplete:this.handleResponse.bind(this),onFailure:reportError});
}
return (this.submitMode);
};
hpFormHandler.prototype.handleResponse=function(req){
if(!this.skipValidationOfResponse){
eval(req.responseText);
}
if(this.skipValidationOfResponse||valid==1){
if(this.saveCallback){
this.saveCallback(req);
}
if(this.nextUri){
location.href=this.nextUri;
}
return true;
}else{
this.handleSubmitServerError(req);
return false;
}
};
hpFormHandler.prototype.testForError=function(_16b,ele,msg){
if(_16b){
this.errors.set(ele.id,msg);
}else{
if(this.errors.get(ele.id)){
if(typeof msg=="object"){
for(idx in msg){
if(this.errors.get(ele.id)==msg[idx]){
this.errors.unset(ele.id);
}
}
}else{
if(this.errors.get(ele.id)==msg){
this.errors.unset(ele.id);
}
}
}
}
};
hpFormHandler.prototype._elemsChanged=function(ele){
this._runValidators(false);
};
hpFormHandler.prototype._runValidators=function(_16c){
var _16d=Form.getElements(this.form);
var _16e=$A(_16d);
_16e.each(function(node){
if(_16c){
var _16f=this.toValidateOnsubmit.get(node.id);
if(!_16f){
_16f=this.toValidateOnsubmit.get(node.className);
}
if(_16f){
_16f(node);
}
}
var _16f=this.toValidate.get(node.id);
if(!_16f){
_16f=this.toValidate.get(node.className);
}
if(_16f){
_16f(node);
}
}.bind(this));
this._showErrors();
return !this.hasErrors();
};
hpFormHandler.prototype.alertServerErrors=function(req){
var json=JSONstring.toObject(req.responseText);
var _170="";
if(json.status=="error"){
var _171=0;
for(var key in json.errors){
if(key=="security"){
showAskSecurityQuestion();
}else{
for(i=0;i<json.errors[key].length;i++){
_170+=" - "+json.errors[key][i]+"\n";
}
_171++;
}
}
if(_171>0){
var _172=json.header?(json.header+"\n\n"):"An error occurred while saving your changes:\n\n";
_172+=_170+"\nPlease make any necessary changes and Save Changes again. If you still have problems saving after making all necessary changes, please contact team@hubpages.com.";
alert(_172);
}
}else{
if(json.status=="saved"||json.status=="no change"){
var _173=new fx.Scroll({duration:300});
_173.scrollTo("changesSaved");
$("changesSaved").show();
}else{
alert("An unknown error has occured.  Please try saving again.  If the problem persists, contact team@hubpages.com");
}
}
};
hpFormHandler.prototype._showErrors=function(){
if(this.individualerrors){
this._showErrorsPerField();
}else{
this._showErrorsOneDiv();
}
};
hpFormHandler.prototype._showErrorsOneDiv=function(){
if(!this.errorDiv&&!$(this.errorId)){
new Insertion.Top(this.form,"<div id=\""+this.errorId+"\"></div>");
}
if(!this.errorDiv){
this.errorDiv=$(this.errorId);
}
if(this.useEffects&&!this.errFade){
this.errFade=new fx.Opacity(this.errorDiv,{duration:500});
this.errFade.now=0;
}
if(!this.hasErrors()){
if(this.lit){
if(this.useEffects){
this.errFade.toggle();
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
if($("nextB")){
$("nextB").src="http://x.hubpages.com/x/next.gif";
}
this.lit=false;
}
return;
}
var _174=this.errorHeader;
_174+="<ul>";
this.errors.each(function(err){
_174+="<li>"+err.value+"</li>";
var ele=$(err.key);
hpFormHandler.lightEle(ele,true);
});
_174+="</ul>";
this.errorDiv.className="alert";
if(!this.lit){
if(this.useEffects){
Element.setOpacity(this.errorDiv,0);
this.errFade.toggle();
}
}
this.errorDiv.innerHTML=_174;
this.lit=true;
};
hpFormHandler.prototype._showErrorsPerField=function(){
if(this.hasErrors()){
this.errors.each(function(err){
var _175=$(err.key);
var _176=err.key+"_error";
var _177=$(_176);
if(_177){
_177.innerHTML=err.value;
_177.className="alert";
_177.show();
}else{
new Insertion.Top(_175.parentNode,"<div id=\""+_176+"\" class=\"alert\">"+err.value+"</div>");
}
hpFormHandler.lightEle(_175,true);
});
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
targetId=ele.id;
var _178=typeof this.errors.get(targetId)=="undefined";
if(_178){
if($(targetId+"_error")){
$(targetId+"_error").hide();
}
hpFormHandler.lightEle(ele,false);
}
}.bind(this));
this.lit=true;
}else{
if(this.lit){
if(this.useEffects){
var eles=this.form.select(".alert");
eles.each(function(ele){
ele.hide();
});
}
var eles=this.form.select(".alertBorder");
eles.each(function(ele){
hpFormHandler.lightEle(ele,false);
});
this.lit=false;
}
}
};
function _handleInputKeypress(_179){
_179=_179||window.event;
if(_179.which){
if(_179.which==Event.KEY_RETURN){
var _17a=document.createEvent("KeyboardEvent");
_17a.initKeyEvent("keydown",true,true,document.defaultView,_179.ctrlKey,_179.altKey,_179.shiftKey,_179.metaKey,Event.KEY_TAB,0);
_179.preventDefault();
_179.target.dispatchEvent(_17a);
}
}else{
if(_179.keyCode){
if(_179.keyCode==Event.KEY_RETURN){
_179.keyCode=Event.KEY_TAB;
}
}
}
return true;
};
hpFormHandler.lightEle=function(ele,on){
ele=$(ele);
if(!ele){
return;
}
if(on){
Element.addClassName(ele,"alertBorder");
}else{
Element.removeClassName(ele,"alertBorder");
}
};
var GhostWatcher=Class.create();
GhostWatcher.prototype={initialize:function(_17b,_17c,_17d){
this.fromEle=$(_17b);
this.toEle=$(_17c);
this.copyFunction=(_17d!=null)?_17d:this.copyValue;
if(this.fromEle&&this.toEle){
Event.observe(this.fromEle,"keyup",this.copyFunction.bind(this),false);
}
Event.observe(window,"focus",this.copyFunction.bind(this),false);
Event.observe(window,"load",this.copyFunction.bind(this),false);
},copyValue:function(evt){
var text=$F(this.fromEle);
this.toEle.innerHTML=text.stripTags();
},recopy:function(){
this.copyFunction();
}};
function growTextArea(elt,_17e,_17f,_180){
var rows=Math.ceil($F(elt).length/_17e)+1;
var _181=rows*_17f;
_181=Math.max(_181,_180);
elt.setStyle({height:_181+"px"});
};
function makeGrowable(id,_182,_183,_184){
var elt=$(id);
if(!elt){
return;
}
elt.observe("keyup",function(){
growTextArea(elt,_182,_183,_184);
});
};
function makeExpandable(id,_185,_186,_187,_188,_189){
var elt=jq("#"+id);
if(!elt.size()){
return;
}
elt.addClass("expandable_text dimmed").val(_185);
var _189=(_189===undefined)?"expanded":_189;
elt.bind("focus",function(){
var anc=jq(this).closest("div");
if(!anc.hasClass(_189)){
anc.addClass(_189);
if(typeof (_188)=="function"){
_188.apply(this);
}
}
if(jq(this).hasClass("dimmed")){
jq(this).removeClass("dimmed").val("");
}
if(typeof (_186)=="function"){
_186.apply(this);
}
});
elt.bind("blur",function(){
if(elt.val()!=""){
return;
}
if(!_187){
jq(this).css({height:""}).closest("div").removeClass("expanded");
}
jq(this).addClass("dimmed").val(_185);
});
};
function initAutoComplete(_18a,_18b){
var _18c="";
var _18d="++none++";
var _18e=false;
var _18f=false;
var _190=false;
var _191="#the_auto_comp_box";
var _192="#search_form";
var _193="#search_input";
var _194=".search_submit";
var _195="search_form";
var _196="/xml/getautocompletestrings.php";
var _197="";
var _198=0;
var _199=null;
var _19a=null;
var _19b=null;
var _19c=null;
var _19d=null;
var _19e=false;
if(_18b){
_191=_18b.boxid;
_192=_18b.container;
_193=_18b.input;
_194=_18b.submit;
if(_18b.ajaxtarget!=undefined){
_196=_18b.ajaxtarget;
}
if(_18b.querystring!=undefined){
_197="&"+_18b.querystring;
}
if(_18b.filter!=undefined){
_199=_18b.filter;
}
if(_18b.callback!=undefined){
_19a=_18b.callback;
}
if(_18b.keyboardelem!=undefined){
_19c=_18b.keyboardelem;
}
if(_18b.targoutput!=undefined){
_19b=_18b.targoutput;
}
if(_18b.keyuptarget!=undefined){
_19d=_18b.keyuptarget;
}
if(_18b.showprogress!=undefined){
_19e=_18b.showprogress;
}
}
if(!_19c){
_19c=_193;
}
if(!_19b){
_19b=_193;
}
if(!_19d){
_19d=_19c;
}
jq(document).ready(function(){
if(!_18e){
_18e=true;
jq("<div id=\""+_191.substr(1)+"\" class=\"auto_comp_box\"></div>").insertAfter(_19c);
if(_19e){
jq("<div id=\"auto_comp_close\">&nbsp;</div>").appendTo(_191);
jq("#auto_comp_close").bind("click",function(){
jq(_191).hide();
jq("#auto_comp_close").hide();
});
}
jq(_191).hide();
if(!_19e){
jq(_191).bind("focusin",function(){
_18f=true;
});
jq(_191).bind("focusout",function(){
_18f=false;
});
jq(_192).bind("focusin",function(){
_190=true;
});
jq(_192).bind("focusout",function(){
_190=false;
setTimeout(function(){
if(!_18f&&!_190){
jq(_191).hide();
jq("#auto_comp_close").hide();
_197=_197.replace(/start=[^&]*&?/,"");
}
},300);
});
}
jq(_192).attr("autocomplete","off");
jq(_19c).bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
_198=0;
jq(_191+" > .auto_comp_row:visible:eq(0) > a").trigger("focus");
return (false);
break;
}
return (true);
});
jq(_19d).bind("keyup",function(){
var _19f=jq(_193).attr("value");
if(_193!=_19c){
if(_18c!=_19f){
_197=_197.replace(/start=[0123456789]+/,"");
_197=_197.replace(/&&/,"&");
}
_18c="";
_18d="++none++";
}
var _1a0;
if(_18b){
_1a0="hubs";
}else{
_1a0=jq(".search_type option:selected").val();
if(_1a0==undefined){
_1a0="site";
}
}
if(_19f.strip().length==0){
jq(_191).hide();
jq("#auto_comp_close").hide();
}
if(_19f.strip().length>0&&_18c!=_19f){
_18c=_19f;
if(_19f.indexOf(_18d)==0){
jq(_191+" > .auto_comp_row").each(function(){
var _1a1=jq(this).text();
if(_199){
_1a1=_199(_1a1);
}
if(_1a1.indexOf(_19f)==0){
jq(this).show();
}else{
jq(this).hide();
}
});
return true;
}
_18d="++none++";
jq(_191+" > .auto_comp_row").remove();
var _1a2="?";
if(_19e){
jq("<div id=\"auto_comp_progress\" >&nbsp;</div>").appendTo(_191);
jq(_191).show();
_1a2="?s="+escape(_19f)+"&";
}
var _1a3=jq(_192).serialize();
var _1a4=/(^|&)s=/;
if(!_1a3.match(_1a4)&&!_197.match(_1a4)&&!_1a2.match(_1a4)){
_1a3+="&s="+_19f;
}
jq.get(_196+_1a2+"t="+escape(_1a0)+_197,_1a3,function(data){
jq(_191+" div[id=auto_comp_error]").remove();
jq(_191+" div[id=auto_comp_progress]").remove();
_197=_197.replace(/start=[0123456789]+/,"");
_197=_197.replace(/&&/,"&");
var _1a5=jq(data).find("div").length;
var _1a6=false;
if(_1a5==0){
return true;
}
var _1a7=jq(_193).val();
if(_1a7!=_19f){
return true;
}
if(_1a5<_18a){
_18d=_19f;
}else{
_18d="++none++";
}
jq(_191).show();
jq(_19c).focus();
var _1a8=jq(_19c).position();
var _1a9=jq(_19c).outerHeight(true);
jq(_191).position(_1a8.top+_1a9,_1a8.left+5);
jq(data).find("div").appendTo(_191);
jq(_191+" > .auto_comp_row").bind("click",function(){
var _1aa=false;
jq(this).find("a").each(function(){
var aid=jq(this).attr("id");
var href=jq(this).attr("href");
if(aid=="acrup"||aid=="acrdown"){
_1aa=true;
var _1ab=href.substr(8);
_197+="&start="+_1ab;
_197=_197.replace(/&&/,"&");
}
});
if(_1aa){
if(!_1a6){
setTimeout(function(){
jq(_19d).trigger("keyup");
},200);
_18f=false;
_1a6=true;
}
return (false);
}
var _1ac=jq(this).text();
if(_199){
_1ac=_199(_1ac);
}
jq(_19b).attr("value",_1ac);
if(document.forms[_195]){
document.forms[_195].submit();
}else{
if(_194){
jq(_194).trigger("click");
}
}
return (false);
});
jq(_191+" > .auto_comp_row").bind("keypress",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 13:
jq(this).trigger("click");
return (false);
break;
}
return (true);
});
jq(_191+" > .auto_comp_row").bind("keydown",function(e){
var key=0;
if(e==null){
key=event.keyCode;
}else{
key=e.which;
}
switch(key){
case 40:
if(!jq(_191+" > .auto_comp_row:visible:eq("+_198+") > a").length){
return (false);
}
++_198;
jq(_191+" > .auto_comp_row:visible:eq("+_198+") > a").trigger("focus");
return (false);
break;
case 38:
--_198;
if(_198<0){
jq(_19c).trigger("focus");
}else{
jq(_191+" > .auto_comp_row:visible:eq("+_198+") > a").trigger("focus");
}
return (false);
break;
}
return (true);
});
if(_19a){
_19a();
}
},"html");
}
});
}
});
};
var ImageViewerControl=Class.create();
ImageViewerControl.prototype={initialize:function(_1ad,_1ae,_1af){
this.modId=_1ad;
this.floatStatus=_1ae;
this.displayStatus=_1af;
this.photoData=new Object();
this.photoOrder=new Array();
this.viewer_id=null;
this.timer=null;
this.slide_idx=-1;
this.displaySlideshowLinks=false;
this.resources={ht_viewer_sect:"image_viewer_"+this.modId,ht_inline_sect:"image_inline_"+this.modId,ht_slideshow_sect:"image_slideshow_"+this.modId,ht_thumbnail_sect:"image_thumbnail_"+this.modId,inline_images:"imgs_"+this.modId,viewer_display:"slide_display_"+this.modId,viewer_photo:"slide_img_"+this.modId,viewer_caption:"slide_desc_"+this.modId,thumb_tn_section:"slide_tn_section_"+this.modId};
},setMaxHeight:function(_1b0){
this.firstTimeLoadingImage=true;
this.maxHeight=_1b0;
},addPhoto:function(rec){
this.photoData[rec.id]=rec;
this.photoOrder.push(rec.id);
},clear:function(){
delete this.photoData;
this.photoData=new Object();
this.photoOrder.clear();
},render:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
this.renderInlineImages();
break;
case "Thumbnail":
this.renderThumbnails();
break;
}
},toggleViewer:function(){
switch(this.displayStatus){
case "No Border":
case "With Border":
Element.hide(this.resources.ht_viewer_sect);
Element.show(this.resources.ht_inline_sect);
Element.hide(this.resources.ht_thumbnail_sect);
break;
case "Thumbnail":
Element.show(this.resources.ht_viewer_sect);
Element.hide(this.resources.ht_inline_sect);
Element.show(this.resources.ht_thumbnail_sect);
break;
}
},loadSlide:function(id){
if(!this.firstTimeLoadingImage&&this.maxHeight){
$(this.resources.viewer_display).style.height=this.maxHeight+"px";
}
this.viewer_id=id;
rec=this.photoData[id];
$(this.resources.viewer_photo).innerHTML=this._getDisplayUrl();
$(this.resources.viewer_caption).innerHTML=this._getCaptionAndSource(rec);
this.firstTimeLoadingImage=false;
},getMaxDisplayHeight:function(){
var top=0;
this.photoOrder.each(function(id){
var hgt=this._getDisplayHeight(id);
top=hgt>top?hgt:top;
}.bind(this));
return top;
},setDisplaySlideshowLinks:function(_1b1){
this.displaySlideshowLinks=_1b1;
},_getDisplayUrl:function(){
rec=this.photoData[this.viewer_id];
var _1b2=rec.origWidth>=200&&rec.origHeight>=150;
if(rec.maxSize==2&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlQuarter,"quarter_frame",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if(rec.maxSize==2){
return this._createImageTag(rec.urlQuarter,"quarter",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("quarter",this.displayStatus=="With Border"):"");
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlHalfPad,"half_frame",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return this._createImageTag(rec.urlHalf,"half",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("half",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return this._createImageTag(rec.urlFullPad,"full_frame",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}else{
if(this.floatStatus=="none"){
return this._createImageTag(rec.urlFull,"full",rec.esc_cap)+(_1b2&&this.displaySlideshowLinks?getHubSlideshowHtml("full",this.displayStatus=="With Border"):"");
}
}
}
}
}
}
},_createImageTag:function(url,_1b3,_1b4){
if(undefined==_1b4){
_1b4="";
}
return "<img class='"+_1b3+"' title='"+_1b4+"' alt='"+_1b4+"' src='"+url+"' />";
},_getDisplayHeight:function(_1b5){
rec=this.photoData[_1b5];
if(rec.maxSize==2){
return rec.ratio*120;
}else{
if((this.floatStatus=="right"||rec.maxSize==1)&&this.displayStatus=="With Border"){
return rec.ratio*248;
}else{
if(this.floatStatus=="right"||rec.maxSize==1){
return rec.ratio*260;
}else{
if(this.floatStatus=="none"&&this.displayStatus=="With Border"){
return rec.ratio*496;
}else{
if(this.floatStatus=="none"){
return rec.ratio*520;
}
}
}
}
}
},_getCaptionAndSource:function(rec){
var _1b6=rec.nofollow?" rel=\"nofollow\"":"";
var _1b7="";
if(rec.sourceUrl==""){
_1b7=rec.sourceName;
}else{
if(rec.sourceName==""){
_1b7="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_1b6+">"+rec.sourceUrl.truncate(50)+"</a>";
}else{
_1b7="<a href=\""+rec.sourceUrl.replace(/"/g,"")+"\""+_1b6+">"+rec.sourceName+"</a>";
}
}
if(_1b7!=""){
_1b7="<div>Source: "+_1b7+"</div>";
}
return rec.caption+_1b7;
},_addInlineImage:function(id){
this.viewer_id=id;
var rec=this.photoData[id];
var _1b8=document.createElement("div");
var _1b9=this._getDisplayUrl();
if(this.floatStatus=="none"){
var _1ba="caption_full";
}else{
var _1ba="caption_half";
}
_1b8.id="img_"+rec.id;
_1b8.innerHTML="<div id='img_url_"+rec.id+"'>"+_1b9+"</div>"+"<div class='"+_1ba+"' id='img_desc_"+rec.id+"'>"+this._getCaptionAndSource(rec)+"</div>";
$(this.resources.inline_images).appendChild(_1b8);
},renderInlineImages:function(){
$(this.resources.inline_images).innerHTML="";
this.photoOrder.each(function(id){
this._addInlineImage(id);
}.bind(this));
},_addThumbnail:function(id){
var rec=this.photoData[id];
var _1bb=document.createElement("img");
_1bb.id="slide_tn_"+rec.id;
_1bb.src=rec.urlThumb;
_1bb.alt=rec.caption;
_1bb.title=rec.caption;
_1bb.onclick=function(){
this.loadSlide(rec.id);
}.bind(this);
$(this.resources.thumb_tn_section).appendChild(_1bb);
},renderThumbnails:function(){
$(this.resources.thumb_tn_section).innerHTML="";
this.photoOrder.each(function(id){
this._addThumbnail(id);
}.bind(this));
if(this.photoOrder.length>0){
$("slide_tn_"+this.photoOrder[0]).onclick();
}
}};
var ForumSelector=Class.create();
ForumSelector.prototype={initialize:function(id,_1bc){
this.id=id;
this.userId=_1bc;
this.observeChanges();
},observeChanges:function(){
$(this.id+"_forum_id").observe("change",this.changeForum.bindAsEventListener(this));
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
},changeForum:function(_1bd){
var elt=Event.findElement(_1bd,"select");
this.chooseForum($F(elt));
},changeCategory:function(_1be){
var elt=Event.findElement(_1be,"select");
this.chooseCategory($F(elt));
},chooseForum:function(_1bf){
if(/fave/.test(_1bf)){
var _1c0=_1bf.substring(5);
this.chooseCategory(_1c0);
return;
}
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({forumId:_1bf,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
},chooseCategory:function(_1c1){
new Ajax.Updater(this.id+"_forum_selector","/xml/forumselector.php",{parameters:$H({categoryId:_1c1,id:this.id,userId:this.userId}).toQueryString(),onComplete:this.observeChanges.bind(this)});
}};
var CategorySelector=Class.create();
CategorySelector.prototype={initialize:function(id,_1c2,_1c3,_1c4){
this.id=id;
this.onchange=_1c2;
this.onselect=_1c3;
this.userId=_1c4?_1c4:0;
this.observeChanges();
},observeChanges:function(){
$$("."+this.id+"_category_selector").each(function(elt){
elt.observe("change",this.changeCategory.bindAsEventListener(this));
}.bind(this));
$("startOver"+this.id).observe("click",this.startOver.bind(this));
},changeCategory:function(_1c5){
var elt=Event.findElement(_1c5,"select");
this.chooseCategory($F(elt));
},chooseCategory:function(_1c6,_1c7,_1c8){
new Ajax.Request("/xml/categoryselector.php",{parameters:$H({categoryId:_1c6,userId:this.userId,id:this.id}).toQueryString(),onComplete:function(req){
var data=JSONstring.toObject(req.responseText);
$(this.id+"Wrapper").innerHTML=data["render"];
this.observeChanges();
if($(this.uniqueId+"SearchText")){
$(this.uniqueId+"SearchText").value="";
}
if($(this.uniqueId+"SearchResults")){
$(this.uniqueId+"SearchResults").innerHTML="";
}
this.onchange(data);
if(!_1c7&&_1c8){
this.onselect(_1c8);
}
}.bind(this)});
},getValue:function(){
return $F(this.id+"Id");
},startOver:function(_1c9){
this.chooseCategory(0);
},refresh:function(){
this.chooseCategory(this.getValue());
},search:function(_1ca,_1cb,_1cc){
new Ajax.Updater(_1cb,"/xml/categorysearch.php",{parameters:$H({uniqueId:this.id,searchText:_1ca,numTabs:_1cc}),onFailure:function(){
}});
return false;
}};
(function($){
$.extend($.fn,{validate:function(_1cd){
if(!this.length){
_1cd&&_1cd.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");
return;
}
var _1ce=$.data(this[0],"validator");
if(_1ce){
return _1ce;
}
_1ce=new $.validator(_1cd,this[0]);
$.data(this[0],"validator",_1ce);
if(_1ce.settings.onsubmit){
this.find("input, button").filter(".cancel").click(function(){
_1ce.cancelSubmit=true;
});
if(_1ce.settings.submitHandler){
this.find("input, button").filter(":submit").click(function(){
_1ce.submitButton=this;
});
}
this.submit(function(_1cf){
if(_1ce.settings.debug){
_1cf.preventDefault();
}
function _1d0(){
if(_1ce.settings.submitHandler){
if(_1ce.submitButton){
var _1d1=$("<input type='hidden'/>").attr("name",_1ce.submitButton.name).val(_1ce.submitButton.value).appendTo(_1ce.currentForm);
}
_1ce.settings.submitHandler.call(_1ce,_1ce.currentForm);
if(_1ce.submitButton){
_1d1.remove();
}
return false;
}
return true;
};
if(_1ce.cancelSubmit){
_1ce.cancelSubmit=false;
return _1d0();
}
if(_1ce.form()){
if(_1ce.pendingRequest){
_1ce.formSubmitted=true;
return false;
}
return _1d0();
}else{
_1ce.focusInvalid();
return false;
}
});
}
return _1ce;
},valid:function(){
if($(this[0]).is("form")){
return this.validate().form();
}else{
var _1d2=true;
var _1d3=$(this[0].form).validate();
this.each(function(){
_1d2&=_1d3.element(this);
});
return _1d2;
}
},removeAttrs:function(_1d4){
var _1d5={},_1d6=this;
$.each(_1d4.split(/\s/),function(_1d7,_1d8){
_1d5[_1d8]=_1d6.attr(_1d8);
_1d6.removeAttr(_1d8);
});
return _1d5;
},rules:function(_1d9,_1da){
var _1db=this[0];
if(_1d9){
var _1dc=$.data(_1db.form,"validator").settings;
var _1dd=_1dc.rules;
var _1de=$.validator.staticRules(_1db);
switch(_1d9){
case "add":
$.extend(_1de,$.validator.normalizeRule(_1da));
_1dd[_1db.name]=_1de;
if(_1da.messages){
_1dc.messages[_1db.name]=$.extend(_1dc.messages[_1db.name],_1da.messages);
}
break;
case "remove":
if(!_1da){
delete _1dd[_1db.name];
return _1de;
}
var _1df={};
$.each(_1da.split(/\s/),function(_1e0,_1e1){
_1df[_1e1]=_1de[_1e1];
delete _1de[_1e1];
});
return _1df;
}
}
var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(_1db),$.validator.classRules(_1db),$.validator.attributeRules(_1db),$.validator.staticRules(_1db)),_1db);
if(data.required){
var _1e2=data.required;
delete data.required;
data=$.extend({required:_1e2},data);
}
return data;
}});
$.extend($.expr[":"],{blank:function(a){
return !$.trim(""+a.value);
},filled:function(a){
return !!$.trim(""+a.value);
},unchecked:function(a){
return !a.checked;
}});
$.validator=function(_1e3,form){
this.settings=$.extend(true,{},$.validator.defaults,_1e3);
this.currentForm=form;
this.init();
};
$.validator.format=function(_1e4,_1e5){
if(arguments.length==1){
return function(){
var args=$.makeArray(arguments);
args.unshift(_1e4);
return $.validator.format.apply(this,args);
};
}
if(arguments.length>2&&_1e5.constructor!=Array){
_1e5=$.makeArray(arguments).slice(1);
}
if(_1e5.constructor!=Array){
_1e5=[_1e5];
}
$.each(_1e5,function(i,n){
_1e4=_1e4.replace(new RegExp("\\{"+i+"\\}","g"),n);
});
return _1e4;
};
$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(_1e6){
this.lastActive=_1e6;
if(this.settings.focusCleanup&&!this.blockFocusCleanup){
this.settings.unhighlight&&this.settings.unhighlight.call(this,_1e6,this.settings.errorClass,this.settings.validClass);
this.addWrapper(this.errorsFor(_1e6)).hide();
}
},onfocusout:function(_1e7){
if(!this.checkable(_1e7)&&(_1e7.name in this.submitted||!this.optional(_1e7))){
this.element(_1e7);
}
},onkeyup:function(_1e8){
if(_1e8.name in this.submitted||_1e8==this.lastElement){
this.element(_1e8);
}
},onclick:function(_1e9){
if(_1e9.name in this.submitted){
this.element(_1e9);
}else{
if(_1e9.parentNode.name in this.submitted){
this.element(_1e9.parentNode);
}
}
},highlight:function(_1ea,_1eb,_1ec){
$(_1ea).addClass(_1eb).removeClass(_1ec);
},unhighlight:function(_1ed,_1ee,_1ef){
$(_1ed).removeClass(_1ee).addClass(_1ef);
}},setDefaults:function(_1f0){
$.extend($.validator.defaults,_1f0);
},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){
this.labelContainer=$(this.settings.errorLabelContainer);
this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);
this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);
this.submitted={};
this.valueCache={};
this.pendingRequest=0;
this.pending={};
this.invalid={};
this.reset();
var _1f1=(this.groups={});
$.each(this.settings.groups,function(key,_1f2){
$.each(_1f2.split(/\s/),function(_1f3,name){
_1f1[name]=key;
});
});
var _1f4=this.settings.rules;
$.each(_1f4,function(key,_1f5){
_1f4[key]=$.validator.normalizeRule(_1f5);
});
function _1f6(_1f7){
var _1f8=$.data(this[0].form,"validator"),_1f9="on"+_1f7.type.replace(/^validate/,"");
_1f8.settings[_1f9]&&_1f8.settings[_1f9].call(_1f8,this[0]);
};
$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",_1f6).validateDelegate(":radio, :checkbox, select, option","click",_1f6);
if(this.settings.invalidHandler){
$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
}
},form:function(){
this.checkForm();
$.extend(this.submitted,this.errorMap);
this.invalid=$.extend({},this.errorMap);
if(!this.valid()){
$(this.currentForm).triggerHandler("invalid-form",[this]);
}
this.showErrors();
return this.valid();
},checkForm:function(){
this.prepareForm();
for(var i=0,_1fa=(this.currentElements=this.elements());_1fa[i];i++){
this.check(_1fa[i]);
}
return this.valid();
},element:function(_1fb){
_1fb=this.clean(_1fb);
this.lastElement=_1fb;
this.prepareElement(_1fb);
this.currentElements=$(_1fb);
var _1fc=this.check(_1fb);
if(_1fc){
delete this.invalid[_1fb.name];
}else{
this.invalid[_1fb.name]=true;
}
if(!this.numberOfInvalids()){
this.toHide=this.toHide.add(this.containers);
}
this.showErrors();
return _1fc;
},showErrors:function(_1fd){
if(_1fd){
$.extend(this.errorMap,_1fd);
this.errorList=[];
for(var name in _1fd){
this.errorList.push({message:_1fd[name],element:this.findByName(name)[0]});
}
this.successList=$.grep(this.successList,function(_1fe){
return !(_1fe.name in _1fd);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},resetForm:function(){
if($.fn.resetForm){
$(this.currentForm).resetForm();
}
this.submitted={};
this.prepareForm();
this.hideErrors();
this.elements().removeClass(this.settings.errorClass);
},numberOfInvalids:function(){
return this.objectLength(this.invalid);
},objectLength:function(obj){
var _1ff=0;
for(var i in obj){
_1ff++;
}
return _1ff;
},hideErrors:function(){
this.addWrapper(this.toHide).hide();
},valid:function(){
return this.size()==0;
},size:function(){
return this.errorList.length;
},focusInvalid:function(){
if(this.settings.focusInvalid){
try{
$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}
catch(e){
}
}
},findLastActive:function(){
var _200=this.lastActive;
return _200&&$.grep(this.errorList,function(n){
return n.element.name==_200.name;
}).length==1&&_200;
},elements:function(){
var _201=this,_202={};
return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
!this.name&&_201.settings.debug&&window.console&&console.error("%o has no name assigned",this);
if(this.name in _202||!_201.objectLength($(this).rules())){
return false;
}
_202[this.name]=true;
return true;
});
},clean:function(_203){
return $(_203)[0];
},errors:function(){
return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);
},reset:function(){
this.successList=[];
this.errorList=[];
this.errorMap={};
this.toShow=$([]);
this.toHide=$([]);
this.currentElements=$([]);
},prepareForm:function(){
this.reset();
this.toHide=this.errors().add(this.containers);
},prepareElement:function(_204){
this.reset();
this.toHide=this.errorsFor(_204);
},check:function(_205){
_205=this.clean(_205);
if(this.checkable(_205)){
_205=this.findByName(_205.name).not(this.settings.ignore)[0];
}
var _206=$(_205).rules();
var _207=false;
for(var _208 in _206){
var rule={method:_208,parameters:_206[_208]};
try{
var _209=$.validator.methods[_208].call(this,_205.value.replace(/\r/g,""),_205,rule.parameters);
if(_209=="dependency-mismatch"){
_207=true;
continue;
}
_207=false;
if(_209=="pending"){
this.toHide=this.toHide.not(this.errorsFor(_205));
return;
}
if(!_209){
this.formatAndAdd(_205,rule);
return false;
}
}
catch(e){
this.settings.debug&&window.console&&console.log("exception occured when checking element "+_205.id+", check the '"+rule.method+"' method",e);
throw e;
}
}
if(_207){
return;
}
if(this.objectLength(_206)){
this.successList.push(_205);
}
return true;
},customMetaMessage:function(_20a,_20b){
if(!$.metadata){
return;
}
var meta=this.settings.meta?$(_20a).metadata()[this.settings.meta]:$(_20a).metadata();
return meta&&meta.messages&&meta.messages[_20b];
},customMessage:function(name,_20c){
var m=this.settings.messages[name];
return m&&(m.constructor==String?m:m[_20c]);
},findDefined:function(){
for(var i=0;i<arguments.length;i++){
if(arguments[i]!==undefined){
return arguments[i];
}
}
return undefined;
},defaultMessage:function(_20d,_20e){
return this.findDefined(this.customMessage(_20d.name,_20e),this.customMetaMessage(_20d,_20e),!this.settings.ignoreTitle&&_20d.title||undefined,$.validator.messages[_20e],"<strong>Warning: No message defined for "+_20d.name+"</strong>");
},formatAndAdd:function(_20f,rule){
var _210=this.defaultMessage(_20f,rule.method),_211=/\$?\{(\d+)\}/g;
if(typeof _210=="function"){
_210=_210.call(this,rule.parameters,_20f);
}else{
if(_211.test(_210)){
_210=jQuery.format(_210.replace(_211,"{$1}"),rule.parameters);
}
}
this.errorList.push({message:_210,element:_20f});
this.errorMap[_20f.name]=_210;
this.submitted[_20f.name]=_210;
},addWrapper:function(_212){
if(this.settings.wrapper){
_212=_212.add(_212.parent(this.settings.wrapper));
}
return _212;
},defaultShowErrors:function(){
for(var i=0;this.errorList[i];i++){
var _213=this.errorList[i];
this.settings.highlight&&this.settings.highlight.call(this,_213.element,this.settings.errorClass,this.settings.validClass);
this.showLabel(_213.element,_213.message);
}
if(this.errorList.length){
this.toShow=this.toShow.add(this.containers);
}
if(this.settings.success){
for(var i=0;this.successList[i];i++){
this.showLabel(this.successList[i]);
}
}
if(this.settings.unhighlight){
for(var i=0,_214=this.validElements();_214[i];i++){
this.settings.unhighlight.call(this,_214[i],this.settings.errorClass,this.settings.validClass);
}
}
this.toHide=this.toHide.not(this.toShow);
this.hideErrors();
this.addWrapper(this.toShow).show();
},validElements:function(){
return this.currentElements.not(this.invalidElements());
},invalidElements:function(){
return $(this.errorList).map(function(){
return this.element;
});
},showLabel:function(_215,_216){
var _217=this.errorsFor(_215);
if(_217.length){
_217.removeClass().addClass(this.settings.errorClass);
_217.attr("generated")&&_217.html(_216);
}else{
_217=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(_215),generated:true}).addClass(this.settings.errorClass).html(_216||"");
if(this.settings.wrapper){
_217=_217.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();
}
if(!this.labelContainer.append(_217).length){
this.settings.errorPlacement?this.settings.errorPlacement(_217,$(_215)):_217.insertAfter(_215);
}
}
if(!_216&&this.settings.success){
_217.text("");
typeof this.settings.success=="string"?_217.addClass(this.settings.success):this.settings.success(_217);
}
this.toShow=this.toShow.add(_217);
},errorsFor:function(_218){
var name=this.idOrName(_218);
return this.errors().filter(function(){
return $(this).attr("for")==name;
});
},idOrName:function(_219){
return this.groups[_219.name]||(this.checkable(_219)?_219.name:_219.id||_219.name);
},checkable:function(_21a){
return /radio|checkbox/i.test(_21a.type);
},findByName:function(name){
var form=this.currentForm;
return $(document.getElementsByName(name)).map(function(_21b,_21c){
return _21c.form==form&&_21c.name==name&&_21c||null;
});
},getLength:function(_21d,_21e){
switch(_21e.nodeName.toLowerCase()){
case "select":
return $("option:selected",_21e).length;
case "input":
if(this.checkable(_21e)){
return this.findByName(_21e.name).filter(":checked").length;
}
}
return _21d.length;
},depend:function(_21f,_220){
return this.dependTypes[typeof _21f]?this.dependTypes[typeof _21f](_21f,_220):true;
},dependTypes:{"boolean":function(_221,_222){
return _221;
},"string":function(_223,_224){
return !!$(_223,_224.form).length;
},"function":function(_225,_226){
return _225(_226);
}},optional:function(_227){
return !$.validator.methods.required.call(this,$.trim(_227.value),_227)&&"dependency-mismatch";
},startRequest:function(_228){
if(!this.pending[_228.name]){
this.pendingRequest++;
this.pending[_228.name]=true;
}
},stopRequest:function(_229,_22a){
this.pendingRequest--;
if(this.pendingRequest<0){
this.pendingRequest=0;
}
delete this.pending[_229.name];
if(_22a&&this.pendingRequest==0&&this.formSubmitted&&this.form()){
$(this.currentForm).submit();
this.formSubmitted=false;
}else{
if(!_22a&&this.pendingRequest==0&&this.formSubmitted){
$(this.currentForm).triggerHandler("invalid-form",[this]);
this.formSubmitted=false;
}
}
},previousValue:function(_22b){
return $.data(_22b,"previousValue")||$.data(_22b,"previousValue",{old:null,valid:true,message:this.defaultMessage(_22b,"remote")});
}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(_22c,_22d){
_22c.constructor==String?this.classRuleSettings[_22c]=_22d:$.extend(this.classRuleSettings,_22c);
},classRules:function(_22e){
var _22f={};
var _230=$(_22e).attr("class");
_230&&$.each(_230.split(" "),function(){
if(this in $.validator.classRuleSettings){
$.extend(_22f,$.validator.classRuleSettings[this]);
}
});
return _22f;
},attributeRules:function(_231){
var _232={};
var _233=$(_231);
for(var _234 in $.validator.methods){
var _235=_233.attr(_234);
if(_235){
_232[_234]=_235;
}
}
if(_232.maxlength&&/-1|2147483647|524288/.test(_232.maxlength)){
delete _232.maxlength;
}
return _232;
},metadataRules:function(_236){
if(!$.metadata){
return {};
}
var meta=$.data(_236.form,"validator").settings.meta;
return meta?$(_236).metadata()[meta]:$(_236).metadata();
},staticRules:function(_237){
var _238={};
var _239=$.data(_237.form,"validator");
if(_239.settings.rules){
_238=$.validator.normalizeRule(_239.settings.rules[_237.name])||{};
}
return _238;
},normalizeRules:function(_23a,_23b){
$.each(_23a,function(prop,val){
if(val===false){
delete _23a[prop];
return;
}
if(val.param||val.depends){
var _23c=true;
switch(typeof val.depends){
case "string":
_23c=!!$(val.depends,_23b.form).length;
break;
case "function":
_23c=val.depends.call(_23b,_23b);
break;
}
if(_23c){
_23a[prop]=val.param!==undefined?val.param:true;
}else{
delete _23a[prop];
}
}
});
$.each(_23a,function(rule,_23d){
_23a[rule]=$.isFunction(_23d)?_23d(_23b):_23d;
});
$.each(["minlength","maxlength","min","max"],function(){
if(_23a[this]){
_23a[this]=Number(_23a[this]);
}
});
$.each(["rangelength","range"],function(){
if(_23a[this]){
_23a[this]=[Number(_23a[this][0]),Number(_23a[this][1])];
}
});
if($.validator.autoCreateRanges){
if(_23a.min&&_23a.max){
_23a.range=[_23a.min,_23a.max];
delete _23a.min;
delete _23a.max;
}
if(_23a.minlength&&_23a.maxlength){
_23a.rangelength=[_23a.minlength,_23a.maxlength];
delete _23a.minlength;
delete _23a.maxlength;
}
}
if(_23a.messages){
delete _23a.messages;
}
return _23a;
},normalizeRule:function(data){
if(typeof data=="string"){
var _23e={};
$.each(data.split(/\s/),function(){
_23e[this]=true;
});
data=_23e;
}
return data;
},addMethod:function(name,_23f,_240){
$.validator.methods[name]=_23f;
$.validator.messages[name]=_240!=undefined?_240:$.validator.messages[name];
if(_23f.length<3){
$.validator.addClassRules(name,$.validator.normalizeRule(name));
}
},methods:{required:function(_241,_242,_243){
if(!this.depend(_243,_242)){
return "dependency-mismatch";
}
switch(_242.nodeName.toLowerCase()){
case "select":
var val=$(_242).val();
return val&&val.length>0;
case "input":
if(this.checkable(_242)){
return this.getLength(_241,_242)>0;
}
default:
return $.trim(_241).length>0;
}
},remote:function(_244,_245,_246){
if(this.optional(_245)){
return "dependency-mismatch";
}
var _247=this.previousValue(_245);
if(!this.settings.messages[_245.name]){
this.settings.messages[_245.name]={};
}
_247.originalMessage=this.settings.messages[_245.name].remote;
this.settings.messages[_245.name].remote=_247.message;
_246=typeof _246=="string"&&{url:_246}||_246;
if(this.pending[_245.name]){
return "pending";
}
if(_247.old===_244){
return _247.valid;
}
_247.old=_244;
var _248=this;
this.startRequest(_245);
var data={};
data[_245.name]=_244;
$.ajax($.extend(true,{url:_246,mode:"abort",port:"validate"+_245.name,dataType:"json",data:data,success:function(_249){
_248.settings.messages[_245.name].remote=_247.originalMessage;
var _24a=_249===true;
if(_24a){
var _24b=_248.formSubmitted;
_248.prepareElement(_245);
_248.formSubmitted=_24b;
_248.successList.push(_245);
_248.showErrors();
}else{
var _24c={};
var _24d=_249||_248.defaultMessage(_245,"remote");
_24c[_245.name]=_247.message=$.isFunction(_24d)?_24d(_244):_24d;
_248.showErrors(_24c);
}
_247.valid=_24a;
_248.stopRequest(_245,_24a);
}},_246));
return "pending";
},minlength:function(_24e,_24f,_250){
return this.optional(_24f)||this.getLength($.trim(_24e),_24f)>=_250;
},maxlength:function(_251,_252,_253){
return this.optional(_252)||this.getLength($.trim(_251),_252)<=_253;
},rangelength:function(_254,_255,_256){
var _257=this.getLength($.trim(_254),_255);
return this.optional(_255)||(_257>=_256[0]&&_257<=_256[1]);
},min:function(_258,_259,_25a){
return this.optional(_259)||_258>=_25a;
},max:function(_25b,_25c,_25d){
return this.optional(_25c)||_25b<=_25d;
},range:function(_25e,_25f,_260){
return this.optional(_25f)||(_25e>=_260[0]&&_25e<=_260[1]);
},email:function(_261,_262){
return this.optional(_262)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(_261);
},url:function(_263,_264){
return this.optional(_264)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(_263);
},date:function(_265,_266){
return this.optional(_266)||!/Invalid|NaN/.test(new Date(_265));
},dateISO:function(_267,_268){
return this.optional(_268)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(_267);
},number:function(_269,_26a){
return this.optional(_26a)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(_269);
},digits:function(_26b,_26c){
return this.optional(_26c)||/^\d+$/.test(_26b);
},creditcard:function(_26d,_26e){
if(this.optional(_26e)){
return "dependency-mismatch";
}
if(/[^0-9-]+/.test(_26d)){
return false;
}
var _26f=0,_270=0,_271=false;
_26d=_26d.replace(/\D/g,"");
for(var n=_26d.length-1;n>=0;n--){
var _272=_26d.charAt(n);
var _270=parseInt(_272,10);
if(_271){
if((_270*=2)>9){
_270-=9;
}
}
_26f+=_270;
_271=!_271;
}
return (_26f%10)==0;
},accept:function(_273,_274,_275){
_275=typeof _275=="string"?_275.replace(/,/g,"|"):"png|jpe?g|gif";
return this.optional(_274)||_273.match(new RegExp(".("+_275+")$","i"));
},equalTo:function(_276,_277,_278){
var _279=$(_278).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
$(_277).valid();
});
return $.trim(_276)==$.trim(_279.val());
}}});
$.format=$.validator.format;
})(jQuery);
(function($){
var _27a={};
if($.ajaxPrefilter){
$.ajaxPrefilter(function(_27b,_27c,xhr){
var port=_27b.port;
if(_27b.mode=="abort"){
if(_27a[port]){
_27a[port].abort();
}
_27a[port]=xhr;
}
});
}else{
var ajax=$.ajax;
$.ajax=function(_27d){
var mode=("mode" in _27d?_27d:$.ajaxSettings).mode,port=("port" in _27d?_27d:$.ajaxSettings).port;
if(mode=="abort"){
if(_27a[port]){
_27a[port].abort();
}
return (_27a[port]=ajax.apply(this,arguments));
}
return ajax.apply(this,arguments);
};
}
})(jQuery);
(function($){
if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){
$.each({focus:"focusin",blur:"focusout"},function(_27e,fix){
$.event.special[fix]={setup:function(){
this.addEventListener(_27e,_27f,true);
},teardown:function(){
this.removeEventListener(_27e,_27f,true);
},handler:function(e){
arguments[0]=$.event.fix(e);
arguments[0].type=fix;
return $.event.handle.apply(this,arguments);
}};
function _27f(e){
e=$.event.fix(e);
e.type=fix;
return $.event.handle.call(this,e);
};
});
}
$.extend($.fn,{validateDelegate:function(_280,type,_281){
return this.bind(type,function(_282){
var _283=$(_282.target);
if(_283.is(_280)){
return _281.apply(_283,arguments);
}
});
}});
})(jQuery);
jQuery.validator.addMethod("exactlength",function(_284,_285,_286){
return this.optional(_285)||this.getLength(jq.trim(_284),_285)==_286;
},jQuery.format("Please enter exactly {0} characters."));
jQuery.validator.addMethod("forbidden",function(_287,_288,_289){
if(!this.depend(_289,_288)){
return "dependency-mismatch";
}
switch(_288.nodeName.toLowerCase()){
case "select":
var val=jq(_288).val();
return !(val&&val.length>0);
case "input":
if(this.checkable(_288)){
return this.getLength(_287,_288)==0;
}
default:
return jq.trim(_287).length==0;
}
},"This field must be empty.");
jQuery.validator.addMethod("ssn",function(ssn,_28a,_28b){
if(!this.depend(_28b,_28a)){
return "dependency-mismatch";
}
var _28c=false;
if(ssn.search(/^[0-9]{3}\-[0-9]{2}\-[0-9]{4}$/)==-1){
_28c=true;
}else{
var _28d=ssn.split("-");
if(_28d[0]=="000"||_28d[1]=="00"||_28d[2]=="0000"){
_28c=true;
}
if(_28d[0]=="666"){
_28c=true;
}
var _28e=parseInt(_28d[0],10);
if(_28e>=900){
if(_28d[1][0]!=7&&_28d[1][0]!=8){
_28c=true;
}
}
}
return !_28c;
},"Your SSN or ITIN appears to be invalid. It should be in the format xxx-xx-xxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("nohtml",function(_28f,_290,_291){
if(!this.depend(_291,_290)){
return "dependency-mismatch";
}
return _28f.search(/[<|>]/)==-1;
},"Please do not include inequality signs (&lt; or &gt;) or HTML tags.");
jQuery.validator.addMethod("ein",function(ein,_292,_293){
if(!this.depend(_293,_292)){
return "dependency-mismatch";
}
return ein.search(/^[0-9]{2}\-[0-9]{7}$/)!=-1;
},"Your EIN appears to be invalid. It should be in the format xx-xxxxxxx, where each x is a digit. Please contact us at payments@hubpages.com for help.");
jQuery.validator.addMethod("mmddyyyy",function(_294,_295,_296){
var _294=jq.trim(_294);
if(_294.search(/^[0-9]{2}\-[0-9]{2}\-[0-9]{4}$/)==-1){
return false;
}
var _297=_294.split("-");
var m=1*_297[0]-1;
var d=1*_297[1];
var y=1*_297[2];
if(y>2037){
return false;
}
var dte=new Date(y,m,d,1);
return (d==1*dte.getDate()&&m==1*dte.getMonth()&&y==1*dte.getFullYear());
},"Please provide a valid date with the format MM-DD-YYYY.");
jQuery.validator.addMethod("dollars",function(_298,_299,_29a){
return jq.trim(_298).search(/^-?[0-9]+\.[0-9]{2}$/)!=-1;
},"Please enter a valid dollar and cents amount such as 50.04 or -0.26");
(function($){
var tmp,_29b,_29c,wrap,_29d,_29e,_29f,_2a0,_2a1,_2a2=0,_2a3={},_2a4=[],_2a5=0,_2a6={},_2a7=[],_2a8=null,_2a9=new Image(),_2aa=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,_2ab=/[^\.]\.(swf)\s*$/i,_2ac,_2ad=1,_2ae,_2af,busy=false,_2b0=20,fx=$.extend($("<div/>")[0],{prop:0}),_2b1=0,_2b2=!$.support.opacity&&!window.XMLHttpRequest,_2b3=function(){
_29b.hide();
_2a9.onerror=_2a9.onload=null;
if(_2a8){
_2a8.abort();
}
tmp.empty();
},_2b4=function(){
$.fancybox("<p id=\"fancybox_error\">The requested content cannot be loaded.<br />Please try again later.</p>",{"scrolling":"no","padding":20,"transitionIn":"none","transitionOut":"none"});
},_2b5=function(){
return [$(window).width(),$(window).height(),$(document).scrollLeft(),$(document).scrollTop()];
},_2b6=function(){
var view=_2b5(),to={},_2b7=_2a6.margin,_2b8=_2a6.autoScale,_2b9=(_2b0+_2b7)*2,_2ba=(_2b0+_2b7)*2,_2bb=(_2a6.padding*2),_2bc;
if(_2a6.width.toString().indexOf("%")>-1){
to.width=((view[0]*parseFloat(_2a6.width))/100)-(_2b0*2);
_2b8=false;
}else{
to.width=_2a6.width+_2bb;
}
if(_2a6.height.toString().indexOf("%")>-1){
to.height=((view[1]*parseFloat(_2a6.height))/100)-(_2b0*2);
_2b8=false;
}else{
to.height=_2a6.height+_2bb;
}
if(_2b8&&(to.width>(view[0]-_2b9)||to.height>(view[1]-_2ba))){
if(_2a3.type=="image"||_2a3.type=="swf"){
_2b9+=_2bb;
_2ba+=_2bb;
_2bc=Math.min(Math.min(view[0]-_2b9,_2a6.width)/_2a6.width,Math.min(view[1]-_2ba,_2a6.height)/_2a6.height);
to.width=Math.round(_2bc*(to.width-_2bb))+_2bb;
to.height=Math.round(_2bc*(to.height-_2bb))+_2bb;
}else{
to.width=Math.min(to.width,(view[0]-_2b9));
to.height=Math.min(to.height,(view[1]-_2ba));
}
}
to.top=view[3]+((view[1]-(to.height+(_2b0*2)))*0.5);
if(_2a6.minWidth==false){
to.left=view[2]+((view[0]-(to.width+(_2b0*2)))*0.5);
}else{
to.left=view[2]+((view[0]-(Math.max(to.width,_2a6.minWidth)+(_2b0*2)))*0.5);
}
if(_2a6.autoScale===false){
to.top=Math.max(view[3]+_2b7,to.top);
to.left=Math.max(view[2]+_2b7,to.left);
}
return to;
},_2bd=function(_2be){
if(_2be&&_2be.length){
switch(_2a6.titlePosition){
case "inside":
return _2be;
case "over":
return "<span id=\"fancybox-title-over\">"+_2be+"</span>";
default:
return "<span id=\"fancybox-title-wrap\"><span id=\"fancybox-title-left\"></span><span id=\"fancybox-title-main\">"+_2be+"</span><span id=\"fancybox-title-right\"></span></span>";
}
}
return false;
},_2bf=function(){
var _2c0=_2a6.title,_2c1=_2af.width-(_2a6.padding*2),_2c2="fancybox-title-"+_2a6.titlePosition;
$("#fancybox-title").remove();
_2b1=0;
if(_2a6.titleShow===false){
return;
}
_2c0=$.isFunction(_2a6.titleFormat)?_2a6.titleFormat(_2c0,_2a7,_2a5,_2a6):_2bd(_2c0);
if(!_2c0||_2c0===""){
return;
}
$("<div id=\"fancybox-title\" class=\""+_2c2+"\" />").css({"width":_2c1,"paddingLeft":_2a6.padding,"paddingRight":_2a6.padding}).html(_2c0).appendTo("body");
switch(_2a6.titlePosition){
case "inside":
_2b1=$("#fancybox-title").outerHeight(true)-_2a6.padding;
_2af.height+=_2b1;
break;
case "over":
$("#fancybox-title").css("bottom",_2a6.padding);
break;
default:
$("#fancybox-title").css("bottom",$("#fancybox-title").outerHeight(true)*-1);
break;
}
$("#fancybox-title").appendTo(_29d).hide();
},_2c3=function(){
$(document).unbind("keydown.fb").bind("keydown.fb",function(e){
if(e.keyCode==27&&_2a6.enableEscapeButton){
e.preventDefault();
$.fancybox.close();
}else{
if(e.keyCode==37){
e.preventDefault();
$.fancybox.prev();
}else{
if(e.keyCode==39){
e.preventDefault();
$.fancybox.next();
}
}
}
});
if($.fn.mousewheel){
wrap.unbind("mousewheel.fb");
if(_2a7.length>1){
wrap.bind("mousewheel.fb",function(e,_2c4){
e.preventDefault();
if(busy||_2c4===0){
return;
}
if(_2c4>0){
$.fancybox.prev();
}else{
$.fancybox.next();
}
});
}
}
if(!_2a6.showNavArrows){
return;
}
if((_2a6.cyclic&&_2a7.length>1)||_2a5!==0){
_2a0.show();
}
if((_2a6.cyclic&&_2a7.length>1)||_2a5!=(_2a7.length-1)){
_2a1.show();
}
},_2c5=function(){
var href,_2c6;
if((_2a7.length-1)>_2a5){
href=_2a7[_2a5+1].href;
if(typeof href!=="undefined"&&href.match(_2aa)){
_2c6=new Image();
_2c6.src=href;
}
}
if(_2a5>0){
href=_2a7[_2a5-1].href;
if(typeof href!=="undefined"&&href.match(_2aa)){
_2c6=new Image();
_2c6.src=href;
}
}
},_2c7=function(){
_29e.css("overflow",(_2a6.scrolling=="auto"?(_2a6.type=="image"||_2a6.type=="iframe"||_2a6.type=="swf"?"hidden":"auto"):(_2a6.scrolling=="yes"?"auto":"visible")));
if(!$.support.opacity){
_29e.get(0).style.removeAttribute("filter");
wrap.get(0).style.removeAttribute("filter");
}
$("#fancybox-title").show();
if(_2a6.hideOnContentClick){
_29e.one("click",$.fancybox.close);
}
if(_2a6.hideOnOverlayClick){
_29c.one("click",$.fancybox.close);
}
if(_2a6.showCloseButton){
_29f.show();
}
_2c3();
$(window).bind("resize.fb",$.fancybox.center);
if(_2a6.centerOnScroll){
$(window).bind("scroll.fb",$.fancybox.center);
}else{
$(window).unbind("scroll.fb");
}
if($.isFunction(_2a6.onComplete)){
_2a6.onComplete(_2a7,_2a5,_2a6);
}
busy=false;
_2c5();
},_2c8=function(pos){
var _2c9=Math.round(_2ae.width+(_2af.width-_2ae.width)*pos),_2ca=Math.round(_2ae.height+(_2af.height-_2ae.height)*pos),top=Math.round(_2ae.top+(_2af.top-_2ae.top)*pos),left=Math.round(_2ae.left+(_2af.left-_2ae.left)*pos);
wrap.css({"width":_2c9+"px","height":_2ca+"px","top":top+"px","left":left+"px"});
_2c9=Math.max(_2c9-_2a6.padding*2,0);
_2ca=Math.max(_2ca-(_2a6.padding*2+(_2b1*pos)),0);
_29e.css({"width":_2c9+"px","height":_2ca+"px"});
if(typeof _2af.opacity!=="undefined"){
wrap.css("opacity",(pos<0.5?0.5:pos));
}
},_2cb=function(obj){
var pos=obj.offset();
pos.top+=parseFloat(obj.css("paddingTop"))||0;
pos.left+=parseFloat(obj.css("paddingLeft"))||0;
pos.top+=parseFloat(obj.css("border-top-width"))||0;
pos.left+=parseFloat(obj.css("border-left-width"))||0;
pos.width=obj.width();
pos.height=obj.height();
return pos;
},_2cc=function(){
var orig=_2a3.orig?$(_2a3.orig):false,from={},pos,view;
if(orig&&orig.length){
pos=_2cb(orig);
from={width:(pos.width+(_2a6.padding*2)),height:(pos.height+(_2a6.padding*2)),top:(pos.top-_2a6.padding-_2b0),left:(pos.left-_2a6.padding-_2b0)};
}else{
view=_2b5();
from={width:1,height:1,top:view[3]+view[1]*0.5,left:view[2]+view[0]*0.5};
}
return from;
},_2cd=function(){
_29b.hide();
if(wrap.is(":visible")&&$.isFunction(_2a6.onCleanup)){
if(_2a6.onCleanup(_2a7,_2a5,_2a6)===false){
$.event.trigger("fancybox-cancel");
busy=false;
return;
}
}
_2a7=_2a4;
_2a5=_2a2;
_2a6=_2a3;
_29e.get(0).scrollTop=0;
_29e.get(0).scrollLeft=0;
if(_2a6.overlayShow){
if(_2b2){
$("select:not(#fancybox-tmp select)").filter(function(){
return this.style.visibility!=="hidden";
}).css({"visibility":"hidden"}).one("fancybox-cleanup",function(){
this.style.visibility="inherit";
});
}
_29c.css({"background-color":_2a6.overlayColor,"opacity":_2a6.overlayOpacity}).unbind().show();
}
_2af=_2b6();
_2bf();
if(wrap.is(":visible")){
$(_29f.add(_2a0).add(_2a1)).hide();
var pos=wrap.position(),_2ce;
_2ae={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
_2ce=(_2ae.width==_2af.width&&_2ae.height==_2af.height);
_29e.fadeOut(_2a6.changeFade,function(){
var _2cf=function(){
_29e.html(tmp.contents()).fadeIn(_2a6.changeFade,_2c7);
};
$.event.trigger("fancybox-change");
_29e.empty().css("overflow","hidden");
if(_2ce){
_29e.css({top:_2a6.padding,left:_2a6.padding,width:Math.max(_2af.width-(_2a6.padding*2),1),height:Math.max(_2af.height-(_2a6.padding*2)-_2b1,1)});
_2cf();
}else{
_29e.css({top:_2a6.padding,left:_2a6.padding,width:Math.max(_2ae.width-(_2a6.padding*2),1),height:Math.max(_2ae.height-(_2a6.padding*2),1)});
fx.prop=0;
$(fx).animate({prop:1},{duration:_2a6.changeSpeed,easing:_2a6.easingChange,step:_2c8,complete:_2cf});
}
});
return;
}
wrap.css("opacity",1);
if(_2a6.transitionIn=="elastic"){
_2ae=_2cc();
_29e.css({top:_2a6.padding,left:_2a6.padding,width:Math.max(_2ae.width-(_2a6.padding*2),1),height:Math.max(_2ae.height-(_2a6.padding*2),1)}).html(tmp.contents());
wrap.css(_2ae).show();
if(_2a6.opacity){
_2af.opacity=0;
}
fx.prop=0;
$(fx).animate({prop:1},{duration:_2a6.speedIn,easing:_2a6.easingIn,step:_2c8,complete:_2c7});
}else{
_29e.css({top:_2a6.padding,left:_2a6.padding,width:Math.max(_2af.width-(_2a6.padding*2),1),height:Math.max(_2af.height-(_2a6.padding*2)-_2b1,1)}).html(tmp.contents());
wrap.css(_2af).fadeIn(_2a6.transitionIn=="none"?0:_2a6.speedIn,_2c7);
}
},_2d0=function(){
tmp.width(_2a3.width);
tmp.height(_2a3.height);
if(_2a3.width=="auto"){
_2a3.width=tmp.width();
}
if(_2a3.height=="auto"){
_2a3.height=tmp.height();
}
_2cd();
},_2d1=function(){
busy=true;
_2a3.width=_2a9.width;
_2a3.height=_2a9.height;
$("<img />").attr({"id":"fancybox-img","src":_2a9.src,"alt":_2a3.title}).appendTo(tmp);
_2cd();
},_2d2=function(){
_2b3();
var obj=_2a4[_2a2],href,type,_2d3,str,emb,_2d4,data;
_2a3=$.extend({},$.fn.fancybox.defaults,(typeof $(obj).data("fancybox")=="undefined"?_2a3:$(obj).data("fancybox")));
_2d3=obj.title||$(obj).title||_2a3.title||"";
if(obj.nodeName&&!_2a3.orig){
_2a3.orig=$(obj).children("img:first").length?$(obj).children("img:first"):$(obj);
}
if(_2d3===""&&_2a3.orig){
_2d3=_2a3.orig.attr("alt");
}
if(obj.nodeName&&(/^(?:javascript|#)/i).test(jq(obj).attr("href"))){
lb=jq(obj).attr("data-lightbox");
href=lb||_2a3.href||jq(obj).attr("href")||null;
}else{
href=_2a3.href||obj.href||null;
}
if(typeof href=="function"){
href=href();
}
if(_2a3.type){
type=_2a3.type;
if(!href){
href=_2a3.content;
}
}else{
if(_2a3.content){
type="html";
}else{
if(href){
if(href.match(_2aa)){
type="image";
}else{
if(href.match(_2ab)){
type="swf";
}else{
if($(obj).hasClass("iframe")){
type="iframe";
}else{
if(href.match(/#/)){
obj=href.substr(href.indexOf("#"));
type=$(obj).length>0?"inline":"ajax";
}else{
type="ajax";
}
}
}
}
}else{
type="inline";
}
}
}
_2a3.type=type;
_2a3.href=href;
_2a3.title=_2d3;
if(_2a3.autoDimensions&&_2a3.type!=="iframe"&&_2a3.type!=="swf"){
_2a3.width="auto";
_2a3.height="auto";
}
if(_2a3.modal){
_2a3.overlayShow=true;
_2a3.hideOnOverlayClick=false;
_2a3.hideOnContentClick=false;
_2a3.enableEscapeButton=false;
_2a3.showCloseButton=false;
}
if($.isFunction(_2a3.onStart)){
if(_2a3.onStart(_2a4,_2a2,_2a3)===false){
busy=false;
return;
}
}
tmp.css("padding",(_2b0+_2a3.padding+_2a3.margin));
$(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){
$(this).replaceWith(_29e.children());
});
switch(type){
case "html":
tmp.html(_2a3.content);
_2d0();
break;
case "inline":
$("<div class=\"fancybox-inline-tmp\" />").hide().insertBefore($(obj)).bind("fancybox-cleanup",function(){
$(this).replaceWith(_29e.children());
}).bind("fancybox-cancel",function(){
$(this).replaceWith(tmp.children());
});
$(obj).appendTo(tmp);
_2d0();
break;
case "image":
busy=false;
$.fancybox.showActivity();
_2a9=new Image();
_2a9.onerror=function(){
_2b4();
};
_2a9.onload=function(){
_2a9.onerror=null;
_2a9.onload=null;
_2d1();
};
_2a9.src=href;
break;
case "swf":
str="<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+_2a3.width+"\" height=\""+_2a3.height+"\"><param name=\"movie\" value=\""+href+"\"></param>";
emb="";
$.each(_2a3.swf,function(name,val){
str+="<param name=\""+name+"\" value=\""+val+"\"></param>";
emb+=" "+name+"=\""+val+"\"";
});
str+="<embed src=\""+href+"\" type=\"application/x-shockwave-flash\" width=\""+_2a3.width+"\" height=\""+_2a3.height+"\""+emb+"></embed></object>";
tmp.html(str);
_2d0();
break;
case "ajax":
_2d4=href.split("#",2);
data=_2a3.ajax.data||{};
if(_2d4.length>1){
href=_2d4[0];
if(typeof data=="string"){
data+="&selector="+_2d4[1];
}else{
data.selector=_2d4[1];
}
}
busy=false;
$.fancybox.showActivity();
_2a8=$.ajax($.extend(_2a3.ajax,{url:href,data:data,error:_2b4,success:function(data,_2d5,_2d6){
if(_2a8.status==200){
tmp.html(data);
_2d0();
}
}}));
break;
case "iframe":
$("<iframe id=\"fancybox-frame\" name=\"fancybox-frame"+new Date().getTime()+"\" frameborder=\"0\" hspace=\"0\" scrolling=\""+_2a3.scrolling+"\" src=\""+_2a3.href+"\"></iframe>").appendTo(tmp);
_2cd();
break;
}
},_2d7=function(){
if(!_29b.is(":visible")){
clearInterval(_2ac);
return;
}
$("div",_29b).css("top",(_2ad*-40)+"px");
_2ad=(_2ad+1)%12;
},_2d8=function(){
if($("#fancybox-wrap").length){
return;
}
$("body").append(tmp=$("<div id=\"fancybox-tmp\"></div>"),_29b=$("<div id=\"fancybox-loading\"><div></div></div>"),_29c=$("<div id=\"fancybox-overlay\"></div>"),wrap=$("<div id=\"fancybox-wrap\"></div>"));
if(!$.support.opacity){
wrap.addClass("fancybox-ie");
_29b.addClass("fancybox-ie");
}
_29d=$("<div id=\"fancybox-outer\"></div>").append("<div class=\"fancy-bg\" id=\"fancy-bg-n\"></div><div class=\"fancy-bg\" id=\"fancy-bg-ne\"></div><div class=\"fancy-bg\" id=\"fancy-bg-e\"></div><div class=\"fancy-bg\" id=\"fancy-bg-se\"></div><div class=\"fancy-bg\" id=\"fancy-bg-s\"></div><div class=\"fancy-bg\" id=\"fancy-bg-sw\"></div><div class=\"fancy-bg\" id=\"fancy-bg-w\"></div><div class=\"fancy-bg\" id=\"fancy-bg-nw\"></div>").appendTo(wrap);
_29d.append(_29e=$("<div id=\"fancybox-inner\"></div>"),_29f=$("<a id=\"fancybox-close\"></a>"),_2a0=$("<a href=\"javascript:;\" id=\"fancybox-left\"><span class=\"fancy-ico\" id=\"fancybox-left-ico\"></span></a>"),_2a1=$("<a href=\"javascript:;\" id=\"fancybox-right\"><span class=\"fancy-ico\" id=\"fancybox-right-ico\"></span></a>"));
_29f.click($.fancybox.close);
_29b.click($.fancybox.cancel);
_2a0.click(function(e){
e.preventDefault();
$.fancybox.prev();
});
_2a1.click(function(e){
e.preventDefault();
$.fancybox.next();
});
if(_2b2){
_29c.get(0).style.setExpression("height","document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight + 'px'");
_29b.get(0).style.setExpression("top","(-20 + (document.documentElement.clientHeight ? document.documentElement.clientHeight/2 : document.body.clientHeight/2 ) + ( ignoreMe = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop )) + 'px'");
_29d.prepend("<iframe id=\"fancybox-hide-sel-frame\" src=\"javascript:'';\" scrolling=\"no\" frameborder=\"0\" ></iframe>");
}
};
$.fn.fancybox=function(_2d9){
$(this).data("fancybox",$.extend({},_2d9,($.metadata?$(this).metadata():{}))).unbind("click.fb").bind("click.fb",function(e){
e.preventDefault();
if(busy){
return;
}
busy=true;
$(this).blur();
_2a4=[];
_2a2=0;
var rel=$(this).attr("rel")||"";
if(!rel||rel==""||rel==="nofollow"){
_2a4.push(this);
}else{
_2a4=$("a[rel="+rel+"], area[rel="+rel+"]");
_2a2=_2a4.index(this);
}
_2d2();
return false;
});
return this;
};
$.fancybox=function(obj){
if(busy){
return;
}
busy=true;
var opts=typeof arguments[1]!=="undefined"?arguments[1]:{};
_2a4=[];
_2a2=opts.index||0;
if($.isArray(obj)){
for(var i=0,j=obj.length;i<j;i++){
if(typeof obj[i]=="object"){
$(obj[i]).data("fancybox",$.extend({},opts,obj[i]));
}else{
obj[i]=$({}).data("fancybox",$.extend({content:obj[i]},opts));
}
}
_2a4=jQuery.merge(_2a4,obj);
}else{
if(typeof obj=="object"){
$(obj).data("fancybox",$.extend({},opts,obj));
}else{
obj=$({}).data("fancybox",$.extend({content:obj},opts));
}
_2a4.push(obj);
}
if(_2a2>_2a4.length||_2a2<0){
_2a2=0;
}
_2d2();
};
$.fancybox.showActivity=function(){
clearInterval(_2ac);
_29b.show();
_2ac=setInterval(_2d7,66);
};
$.fancybox.hideActivity=function(){
_29b.hide();
};
$.fancybox.next=function(){
return $.fancybox.pos(_2a5+1);
};
$.fancybox.prev=function(){
return $.fancybox.pos(_2a5-1);
};
$.fancybox.pos=function(pos){
if(busy){
return;
}
pos=parseInt(pos,10);
if(pos>-1&&_2a7.length>pos){
_2a2=pos;
_2d2();
}
if(_2a6.cyclic&&_2a7.length>1&&pos<0){
_2a2=_2a7.length-1;
_2d2();
}
if(_2a6.cyclic&&_2a7.length>1&&pos>=_2a7.length){
_2a2=0;
_2d2();
}
return;
};
$.fancybox.cancel=function(){
if(busy){
return;
}
busy=true;
$.event.trigger("fancybox-cancel");
_2b3();
if(_2a3&&$.isFunction(_2a3.onCancel)){
_2a3.onCancel(_2a4,_2a2,_2a3);
}
busy=false;
};
$.fancybox.close=function(){
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
if(_2a6&&$.isFunction(_2a6.onCleanup)){
if(_2a6.onCleanup(_2a7,_2a5,_2a6)===false){
busy=false;
return;
}
}
_2b3();
$(_29f.add(_2a0).add(_2a1)).hide();
$("#fancybox-title").remove();
wrap.add(_29e).add(_29c).unbind();
$(window).unbind("resize.fb scroll.fb");
$(document).unbind("keydown.fb");
function _2da(){
_29c.fadeOut("fast");
wrap.hide();
$.event.trigger("fancybox-cleanup");
_29e.empty();
if($.isFunction(_2a6.onClosed)){
_2a6.onClosed(_2a7,_2a5,_2a6);
}
_2a7=_2a3=[];
_2a5=_2a2=0;
_2a6=_2a3={};
busy=false;
};
_29e.css("overflow","hidden");
if(_2a6.transitionOut=="elastic"){
_2ae=_2cc();
var pos=wrap.position();
_2af={top:pos.top,left:pos.left,width:wrap.width(),height:wrap.height()};
if(_2a6.opacity){
_2af.opacity=1;
}
fx.prop=1;
$(fx).animate({prop:0},{duration:_2a6.speedOut,easing:_2a6.easingOut,step:_2c8,complete:_2da});
}else{
wrap.fadeOut(_2a6.transitionOut=="none"?0:_2a6.speedOut,_2da);
}
};
$.fancybox.resize=function(){
var c,h;
if(busy||wrap.is(":hidden")){
return;
}
busy=true;
c=_29e.wrapInner("<div style='overflow:auto'></div>").children();
h=c.height();
wrap.css({height:h+(_2a6.padding*2)+_2b1});
_29e.css({height:h});
c.replaceWith(c.children());
$.fancybox.center();
};
$.fancybox.center=function(){
busy=true;
var view=_2b5(),_2db=_2a6.margin,to={};
to.top=view[3]+((view[1]-((wrap.height()-_2b1)+(_2b0*2)))*0.5);
to.left=view[2]+((view[0]-(wrap.width()+(_2b0*2)))*0.5);
to.top=Math.max(view[3]+_2db,to.top);
to.left=Math.max(view[2]+_2db,to.left);
wrap.css(to);
busy=false;
};
$.fn.fancybox.defaults={padding:10,margin:20,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,minWidth:false,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.3,overlayColor:"#666",titleShow:true,titlePosition:"outside",titleFormat:null,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,onStart:null,onCancel:null,onComplete:null,onCleanup:null,onClosed:null};
$(document).ready(function(){
_2d8();
});
})(jQuery);
var HubPages={};
HubPages.Lightbox=function(_2dc){
this._container=jQuery(_2dc);
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this.c$(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.OPTIONS={overlayOpacity:0.8,overlayColor:"#000",titlePosition:"over"};
HubPages.Lightbox.prototype.init=function(_2dd){
};
HubPages.Lightbox.f$=function(_2de){
return jQuery(_2de,jQuery("#fancybox-wrap"));
};
HubPages.Lightbox.prototype.c$=function(_2df){
return jQuery(_2df,this._container);
};
HubPages.Lightbox.MyPhotos=function(_2e0){
this._container=jQuery(_2e0);
this._currentImageId=null;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS);
this.init(this.options);
this._container.find(".gallery_row .lightbox").fancybox(this.options);
};
HubPages.Lightbox.MyPhotos.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.MyPhotos.prototype._showLocationsWhenReady=function(_2e1,_2e2,_2e3){
if(_2e1!=this._currentImageId){
return;
}
if(this.isLoadComplete()){
if(_2e2.length>110){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height",(120+14*Math.ceil((_2e2.length-110)/40))+"px");
}
HubPages.Lightbox.f$("#fancybox-title-over").html(_2e2);
if(HubPages.Lightbox.f$("#fancybox-title-over").height()>0.3*HubPages.Lightbox.f$("#fancybox-inner").height()){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","30px");
}
}else{
if(_2e3<60000){
setTimeout(jQuery.proxy(function(){
this._showLocationsWhenReady(_2e1,_2e2,_2e3+1000);
},this),1000);
}
}
};
HubPages.Lightbox.MyPhotos.prototype.init=function(_2e4){
this.options=jQuery.extend({},{onStart:jQuery.proxy(this.onStartCallback,this),onComplete:jQuery.proxy(this.loadCompleted,this),title:"Searching..."},_2e4);
};
HubPages.Lightbox.MyPhotos.prototype.onStartCallback=function(_2e5,_2e6,_2e7){
HubPages.Lightbox.f$("#fancybox-left-ico, #fancybox-right-ico").css("top","50%");
this.loadStarted();
var href=HubPages.Lightbox.f$(_2e5[_2e6]).attr("href");
var _2e8=href.lastIndexOf("/");
var _2e9=_2e8==-1?0:href.slice(_2e8+1,-4);
this._currentImageId=_2e9;
jQuery.post("/xml/photos/locations/",{id:_2e9},jQuery.proxy(function(_2ea){
HubPages.Lightbox.f$("#fancybox-wrap").css("min-height","120px");
this._showLocationsWhenReady(_2e9,_2ea,0);
},this));
};
HubPages.Lightbox.MyPhotos.prototype.isLoadComplete=function(){
return this._ready;
};
HubPages.Lightbox.MyPhotos.prototype.loadStarted=function(){
this._ready=false;
};
HubPages.Lightbox.MyPhotos.prototype.loadCompleted=function(){
this._ready=true;
};
HubPages.Lightbox.Slideshow=function(_2eb){
this._articleId=_2eb.id;
this._title=_2eb.title;
this._url=_2eb.url;
this.options=jQuery.extend({},HubPages.Lightbox.OPTIONS,{autoDimensions:false,autoScale:true,autoStart:(_2eb.auto==true),centerOnScroll:false,cyclic:true,height:"90%",onStart:jQuery.proxy(this.beforeLoad,this),onComplete:jQuery.proxy(this.complete,this),onClosed:jQuery.proxy(this.closed,this),onCleanup:jQuery.proxy(this.cleanup,this),showNavArrows:true,titlePosition:"inside",width:"80%",changeSpeed:0});
this.init();
};
HubPages.Lightbox.Slideshow.prototype=jQuery.extend({},HubPages.Lightbox.prototype);
HubPages.Lightbox.Slideshow.ready=false;
HubPages.Lightbox.Slideshow._slides={};
HubPages.Lightbox.Slideshow.create=function(_2ec){
var id=_2ec.id;
if(!HubPages.Lightbox.Slideshow._slides[id]){
HubPages.Lightbox.Slideshow._slides[id]=new HubPages.Lightbox.Slideshow(_2ec);
}else{
HubPages.Lightbox.Slideshow._slides[id].options.autoStart=(_2ec.auto==true);
HubPages.Lightbox.Slideshow._slides[id].init();
}
return HubPages.Lightbox.Slideshow._slides[id];
};
HubPages.Lightbox.Slideshow.prototype.load=function(){
jQuery.ajax({async:false,data:{id:this._articleId},dataType:"json",error:function(jxhr,_2ed,_2ee){
alert("Something went wrong. Please, reload the page.");
},success:jQuery.proxy(this._buildGui,this),timeout:6000,type:"GET",url:"/slideshow/"});
};
HubPages.Lightbox.Slideshow.prototype._buildGui=function(data){
this._container=jQuery("<div />").attr("id","slideshow_"+this._articleId);
this._container.addClass("slideshow").hide().appendTo("body");
this._photoData=data;
this._lastIndex=-1;
jQuery("body").delegate("#fancybox-wrap","mouseenter",function(){
jQuery("#fancybox-right-ico").show();
jQuery("#fancybox-left-ico").show();
});
jQuery("body").delegate("#fancybox-wrap","mouseleave",function(){
jQuery("#fancybox-right-ico").hide();
jQuery("#fancybox-left-ico").hide();
});
jQuery("#fancybox-wrap").addClass("slide_image");
jQuery.each(data.images,jQuery.proxy(function(i,item){
var link=jQuery("<a />").attr({href:"#"+this._articleId+"_"+i,rel:"slideshow_"+this._articleId,alt:(item.title||"&nbsp;")}).addClass("lightbox").appendTo(this._container);
var div=jQuery("<div />").attr({id:this._articleId+"_"+i}).addClass("content");
div.appendTo(this._container);
var _2ef=jQuery("<img />").attr({src:item.src}).css("visibility","hidden");
_2ef.appendTo(div);
},this));
var _2f0=jQuery("<a />").attr("href","#related_slideshows_"+this._articleId);
_2f0.addClass("lightbox").attr("rel","slideshow_"+this._articleId);
_2f0.appendTo(this._container);
var _2f1=jQuery("<div />").attr("id","related_slideshows_"+this._articleId);
_2f1.addClass("related_slideshows");
if(data.related.length){
_2f1.append("<h2>View These Related Slideshows</h2>");
}else{
_2f1.append("<h2>This Hub has no related slideshows</h2>");
}
_2f1.appendTo(this._container);
var list=jQuery("<ul />");
_2f1.append(list);
jQuery.each(data.related,jQuery.proxy(function(i,item){
if(!((i+1)%4)){
list=jQuery("<ul />").appendTo(_2f1);
}
var _2f2=jQuery("<li />");
_2f2.appendTo(list);
var link=jQuery("<a />").attr("href",item.url);
var _2f3=link.clone();
link.data("id",item.id).text(item.title);
link.data("url",item.url);
link.click(jQuery.proxy(function(e){
var link=jQuery(e.currentTarget);
jQuery.fancybox.showActivity();
HubPages.Lightbox.Slideshow.create({id:link.data("id"),title:link.text(),url:link.data("url"),auto:true});
e.preventDefault();
},this));
linkDiv=jQuery("<div />").attr("class","related_name").append(link);
var _2f4=jQuery("<a />").attr("href",item.userUrl).attr("class","author").text(item.user);
linkDiv.append(" by ");
linkDiv.append(_2f4);
_2f2.append(linkDiv);
_2f2.append("<br />");
var _2f5=jQuery("<img />").attr("src",item.thumb);
_2f5.appendTo(_2f3);
_2f3.appendTo(_2f2);
_2f3.click(function(){
jQuery.fancybox.showActivity();
link.click();
return false;
});
},this));
this._socialBar=jQuery("<div />").addClass("social_bar").hide();
var _2f6=jQuery("<div />").addClass("pinit_wrap");
_2f6.appendTo(this._socialBar);
var _2f7=jQuery("<div />").addClass("twitter_wrap");
_2f7.appendTo(this._socialBar);
var _2f8=jQuery("<div />").addClass("fb_share_wrap");
_2f8.appendTo(this._socialBar);
this._container.append(this._socialBar.show());
this.c$("a.lightbox").fancybox(this.options);
};
HubPages.Lightbox.Slideshow.init=function(_2f9,_2fa,_2fb){
if(HubPages.Lightbox.Slideshow.ready){
return;
}
HubPages.Lightbox.Slideshow.ready=true;
HubPages.Lightbox.Slideshow.defaultHubId=_2f9;
var _2fc=jQuery("#fancybox-wrap");
HubPages.Lightbox.f$("#fancybox-left, #fancybox-right").width("30%");
jQuery("body").delegate(".moduleImage div:not(.thumbnails) img","click",function(e){
var _2fd=HubPages.Lightbox.Slideshow.defaultHubId;
if(!HubPages.Lightbox.Slideshow._slides[_2fd]){
HubPages.Lightbox.Slideshow.create({id:_2fd,title:_2fa,url:_2fb});
if(typeof (slideshowAjax)!=="undefined"){
clearTimeout(slideshowAjax);
}
}
var id=jQuery(e.currentTarget).attr("src").replace(/.+\/(\d+)_.+\.(.+)$/,"$1");
var _2fe="div#slideshow_"+HubPages.Lightbox.Slideshow.defaultHubId+" > div";
var link=jQuery(_2fe+":has(img[src*=\""+id+"\"])");
var _2ff=jQuery(_2fe).index(link);
HubPages.Lightbox.Slideshow._slides[_2fd].init();
if(_2ff>=0){
jQuery(".slideshow:first > a").eq(_2ff).click();
}
});
jQuery(window).resize(function(){
if(typeof (_300)!="undefined"){
clearTimeout(_300);
}
var _300=setTimeout(function(){
var _301=jQuery("#fancybox-inner > div:visible").attr("id");
if(_301){
jQuery(".slideshow a[href=#"+_301+"]").click();
}
},300);
});
jQuery.fancybox.close();
};
HubPages.Lightbox.Slideshow.prototype.init=function(){
this._container=jQuery("#slideshow_"+this._articleId);
var _302=this._container.size()==0;
if(_302){
this.load();
}
if(this.options.autoStart){
this.c$("a.lightbox:first").click();
}
};
HubPages.Lightbox.Slideshow.prototype.beforeLoad=function(_303,_304){
if(!jQuery("#fancybox-outer-title").length){
var _305=jQuery("<div />").attr("id","fancybox-outer-title");
var _306=jQuery("#fancybox-inner");
_306.before(_305);
}
var _307=jQuery("<a />").attr("href",this._url).text(this._title);
HubPages.Lightbox.f$("#fancybox-outer-title").empty().append(_307);
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#000");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","40px");
jQuery(".moduleYieldBuild").css("visibility","hidden");
jQuery(".moduleAdSpot").css("visibility","hidden");
};
HubPages.Lightbox.Slideshow.prototype.closed=function(_308,_309){
HubPages.Lightbox.f$("#fancybox-outer-title").remove();
HubPages.Lightbox.f$("#fancybox-outer").css("background-color","#FFF");
HubPages.Lightbox.f$("#fancybox-inner").css("margin-top","0");
jQuery(".moduleYieldBuild").css("visibility","visible");
jQuery(".moduleAdSpot").css("visibility","visible");
};
HubPages.Lightbox.Slideshow.prototype.cleanup=function(_30a,_30b){
jQuery("#"+this._articleId+"_"+_30b+" > img").css("visibility","hidden");
window.location.hash="";
};
HubPages.Lightbox.Slideshow.prototype.complete=function(_30c,_30d){
jQuery.fancybox.hideActivity();
var _30e=_30d+1;
if(_30e>=_30c.length){
return;
}
var _30f=HubPages.Lightbox.f$("#fancybox-inner");
_30f.height(_30f.height()-70).css("overflow","visible");
var _310=_30f.find("> .content > img");
var _311=this._photoData.images[_30d];
window.location.hash="slide"+_311.id;
_310.css({width:"auto",height:"auto",maxWidth:(_30f.innerWidth()-60)+"px",maxHeight:(_30f.innerHeight()-100)+"px"});
if(_30f.innerHeight()>0&&_310.height()>0){
var _312=(_30f.innerHeight()-_310.height())/2;
_310.css("margin-top",_312+"px");
_310.css("visibility","visible");
}else{
_310.load(function(){
var _313=HubPages.Lightbox.f$("#fancybox-inner");
var _314=_313.find("> .content > img");
var _315=(_313.innerHeight()-_314.height())/2;
_314.css("margin-top",_315+"px");
_314.css("visibility","visible");
});
}
var _316=jQuery(_30c[_30d]).attr("rel");
var _317=jQuery("#"+_316).find(".content img");
if(typeof (_gaq)!="undefined"){
_gaq.push(["t2._trackPageview",this._photoData.hpAnalyticsUrl]);
if(this._photoData.authorAnalytics){
_gaq.push(["t1._trackPageview",_311.slideshowUrl]);
}
}
if(this._photoData.quantcastId){
var _318="?"+(new Date()).getTime();
if(this._photoData.quantcastLabel){
_318+="&labels="+escape(this._photoData.quantcastLabel);
}
var _319=new Image();
_319.src="//pixel.quantserve.com/pixel/"+this._photoData.quantcastId+".gif"+_318;
}
var _31a=new Image();
_31a.src=this._photoData.ctracking+"&"+(new Date()).getTime();
var _31b=HubPages.Lightbox.f$("#fancybox-title");
if(_311.sourceUrl||_311.sourceName){
if(_311.sourceUrl){
var _31c="<a href=\""+_311.sourceUrl+"\" target=\"_blank\">"+(_311.sourceName?_311.sourceName:_311.sourceUrl)+"</a>";
}else{
var _31c="<b>"+_311.sourceName+"</b>";
}
_31b.html(_31b.text()+"<br />Source: "+_31c);
}
_31b.find("div.slideshow-counter").remove();
_31b.append(jQuery("<div />").html("Photo "+_30e+" of "+this._photoData.images.length).addClass("slideshow-counter"));
if(this._lastIndex!=_30d&&!(browser=="IE"&&version<=7)){
if(typeof (twttr)=="undefined"||typeof (FB)=="undefined"){
displaySocialButtons({nogplus:true});
}
this._socialBar.find(".twitter_wrap").html(_311.social.twitter);
if(typeof twttr!="undefined"){
twttr.widgets.load();
}
this._socialBar.find(".fb_share_wrap").html(_311.social.fb_share);
if(typeof FB!="undefined"){
FB.XFBML.parse(this._socialBar.get(0));
}
if(_311.social.pinit){
this._socialBar.find(".pinit_wrap").html(_311.social.pinit);
jQuery.ajax({url:"http://assets.pinterest.com/js/pinit.js",dataType:"script",cache:true});
}else{
this._socialBar.css("width","150px");
}
}
this._lastIndex=_30d;
_310.after(this._socialBar.show());
};
var relatedHubStats={ifired:false,ifiredtarget:null,relatedhubstrackingenabled:false,relatedhubs:[],articleid:-1,recordRelatedHubClick:function(_31d){
if(!this.relatedhubstrackingenabled){
return (true);
}
if(this.ifired){
window.location.href=jq(this.ifiredtarget).attr("href");
return (true);
}
var _31e=_31d.target;
if(jq(_31e).attr("href")==undefined){
return (true);
}
var rel=jq(_31e).attr("rel");
var pos1=rel.indexOf("_");
var pos2=rel.lastIndexOf("_");
var raid=rel.substring(pos2+1);
var rank=rel.substring(pos1+1,pos2);
var aid=this.articleid;
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&type="+rank+"&raid="+raid,"",function(data){
jq(_31e).trigger("click");
});
this.ifired=true;
this.ifiredtarget=_31e;
return (false);
},commitImpressions:function(){
if(!this.relatedhubstrackingenabled){
return (false);
}
var json=JSONstring.make(this.relatedhubs,false);
var aid=this.articleid;
jq(document).ready(function(){
setTimeout(function(){
jq.get("/xml/stats/relatedhubevents.php?aid="+aid+"&json="+escape(json),"",function(){
});
},3000);
});
},recordImpression:function(aid,rank,raid){
if(!this.relatedhubstrackingenabled){
return (false);
}
rank+=1000;
this.relatedhubs[this.relatedhubs.length]={aid:aid,rank:rank,raid:raid};
return (true);
},armRelatedHubEvents:function(_31f,aid){
if(aid==2169847||Math.random()>_31f){
this.relatedhubstrackingenabled=true;
this.articleid=aid;
}
}};

