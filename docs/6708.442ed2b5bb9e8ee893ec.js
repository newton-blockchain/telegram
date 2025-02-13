"use strict";(self.webpackChunktelegram_t=self.webpackChunktelegram_t||[]).push([[6708],{66708:(e,t,s)=>{s.r(t),s.d(t,{default:()=>F});var i=s(19822),r=s(67054),a=s(9705),n=s(14235),o=s(41074),h=s(82393),d=s(66644);function c(e,t,s){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:i+"")in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const m=Symbol("WAITING"),l=h.Ni||h.pz?.75:1,p=h.Ni?.5:.75,u=24,g=h.Yw?2:4,f=(0,o.Ay)().map((({connector:e})=>e)),v=new Map,y=new WeakMap;let w=-1;class x{static init(...e){const[,t,s,i,r=(0,n.A)(),,a]=e;let o=v.get(s);return o?o.addView(r,t,a,i?.coords):(o=new x(...e),v.set(s,o)),o}constructor(e,t,s,i,r=(0,n.A)(),a,o,h,d){this.tgsUrl=e,this.container=t,this.renderId=s,this.params=i,this.customColor=a,this.onLoad=o,this.onEnded=h,this.onLoop=d,c(this,"views",new Map),c(this,"imgSize",void 0),c(this,"imageData",void 0),c(this,"msPerFrame",1e3/60),c(this,"reduceFactor",1),c(this,"cacheModulo",void 0),c(this,"workerIndex",void 0),c(this,"frames",[]),c(this,"framesCount",void 0),c(this,"isAnimating",!1),c(this,"isWaiting",!0),c(this,"isEnded",!1),c(this,"isDestroyed",!1),c(this,"isRendererInited",!1),c(this,"approxFrameIndex",0),c(this,"prevFrameIndex",-1),c(this,"stopFrameIndex",0),c(this,"speed",1),c(this,"direction",1),c(this,"lastRenderAt",void 0),this.addView(r,t,o,i.coords),this.initConfig(),this.initRenderer()}removeView(e){const{canvas:t,ctx:s,isSharedCanvas:i,coords:r}=this.views.get(e);i?s.clearRect(r.x,r.y,this.imgSize,this.imgSize):t.remove(),this.views.delete(e),this.views.size||this.destroy()}isPlaying(){return this.isAnimating||this.isWaiting}play(e=!1,t){t&&(this.views.get(t).isPaused=!1),this.isEnded&&e&&(this.approxFrameIndex=Math.floor(0)),this.stopFrameIndex=void 0,this.direction=1,this.doPlay()}pause(e){this.lastRenderAt=void 0,(!e||(this.views.get(e).isPaused=!0,Array.from(this.views.values()).every((({isPaused:e})=>e))))&&(this.isWaiting?this.stopFrameIndex=this.approxFrameIndex:this.isAnimating=!1,this.params.isLowPriority||(this.frames=this.frames.map(((e,t)=>t===this.prevFrameIndex?e:void(e&&e!==m&&e.close())))))}playSegment([e,t],s=!1,i){i&&(this.views.get(i).isPaused=!1);const r=Math.round(this.approxFrameIndex);this.stopFrameIndex=Math.floor(t/this.reduceFactor),(r!==t||s)&&(this.approxFrameIndex=Math.floor(e/this.reduceFactor)),this.direction=e<t?1:-1,this.doPlay()}setSpeed(e){this.speed=e}setNoLoop(e){this.params.noLoop=e}async setSharedCanvasCoords(e,t){const s=this.views.get(e),{canvas:i,ctx:r}=s,a=!i.dataset.isJustCleaned||"false"===i.dataset.isJustCleaned;a||await y.get(i);let[n,o]=[i.width,i.height];if(a){const e=this.calcSizeFactor();[n,o]=I(i,e),r.clearRect(0,0,n,o),i.dataset.isJustCleaned="true",(0,d.YS)((()=>{i.dataset.isJustCleaned="false"}))}s.coords={x:Math.round((t?.x||0)*n),y:Math.round((t?.y||0)*o)};const h=this.getFrame(this.prevFrameIndex)||this.getFrame(Math.round(this.approxFrameIndex));h&&h!==m&&r.drawImage(h,s.coords.x,s.coords.y)}addView(e,t,s,i){const r=this.calcSizeFactor();let a;if(t instanceof HTMLDivElement){if(!(t.parentNode instanceof HTMLElement))throw new Error("[RLottie] Container is not mounted");const{size:i}=this.params;a=Math.round(i*r),this.imgSize||(this.imgSize=a,this.imageData=new ImageData(a,a)),(0,d.RK)((()=>{const r=document.createElement("canvas"),n=r.getContext("2d");r.classList.add("rlottie-canvas"),r.style.width=`${i}px`,r.style.height=`${i}px`,r.width=a,r.height=a,t.appendChild(r),this.views.set(e,{canvas:r,ctx:n,onLoad:s})}))}else{if(!t.isConnected)throw new Error("[RLottie] Shared canvas is not mounted");const n=t,o=n.getContext("2d");a=Math.round(this.params.size*r),this.imgSize||(this.imgSize=a,this.imageData=new ImageData(a,a));const[h,d]=I(n,r);this.views.set(e,{canvas:n,ctx:o,isSharedCanvas:!0,coords:{x:Math.round(i.x*h),y:Math.round(i.y*d)},onLoad:s})}this.isRendererInited&&this.doPlay()}calcSizeFactor(){const{size:e,isLowPriority:t,quality:s=(t&&(!e||e>u)?p:l)}=this.params;return Math.max(window.devicePixelRatio*s,1)}destroy(){this.isDestroyed=!0,this.pause(),this.clearCache(),this.destroyRenderer(),v.delete(this.renderId)}clearCache(){this.frames.forEach((e=>{e&&e!==m&&e.close()})),this.imageData=void 0,this.frames=[]}initConfig(){const{isLowPriority:e}=this.params;this.cacheModulo=e?0:g}setColor(e){this.customColor=e}initRenderer(){this.workerIndex=(0,r.A)(o.bP,++w),f[this.workerIndex].request({name:"rlottie:init",args:[this.renderId,this.tgsUrl,this.imgSize,this.params.isLowPriority||!1,this.customColor,this.onRendererInit.bind(this)]})}destroyRenderer(){f[this.workerIndex].request({name:"rlottie:destroy",args:[this.renderId]})}onRendererInit(e,t,s){this.isRendererInited=!0,this.reduceFactor=e,this.msPerFrame=t,this.framesCount=s,this.isWaiting&&this.doPlay()}changeData(e){this.pause(),this.tgsUrl=e,this.initConfig(),f[this.workerIndex].request({name:"rlottie:changeData",args:[this.renderId,this.tgsUrl,this.params.isLowPriority||!1,this.onChangeData.bind(this)]})}onChangeData(e,t,s){this.reduceFactor=e,this.msPerFrame=t,this.framesCount=s,this.isWaiting=!1,this.isAnimating=!1,this.doPlay()}doPlay(){this.framesCount&&(this.isDestroyed||this.isAnimating||(this.isWaiting||(this.lastRenderAt=void 0),this.isEnded=!1,this.isAnimating=!0,this.isWaiting=!1,(0,i.i0)((()=>{if(this.isDestroyed)return!1;if(!this.isAnimating&&Array.from(this.views.values()).every((({isLoaded:e})=>e)))return!1;const e=Math.round(this.approxFrameIndex),t=this.getFrame(e);if(!t||t===m)return t||this.requestFrame(e),this.isAnimating=!1,this.isWaiting=!0,!1;this.cacheModulo&&e%this.cacheModulo==0&&this.cleanupPrevFrame(e),e!==this.prevFrameIndex&&(this.views.forEach((e=>{const{ctx:s,isLoaded:i,isPaused:r,coords:{x:a,y:n}={},onLoad:o}=e;i&&r||(s.clearRect(a||0,n||0,this.imgSize,this.imgSize),s.drawImage(t,a||0,n||0)),i||(e.isLoaded=!0,o?.())})),this.prevFrameIndex=e);const s=Date.now(),i=this.lastRenderAt?this.msPerFrame/(s-this.lastRenderAt):1,r=this.direction*this.speed/i,a=Math.round(this.approxFrameIndex+r);if(this.lastRenderAt=s,r>0&&(e===this.framesCount-1||a>this.framesCount-1)){if(this.params.noLoop)return this.isAnimating=!1,this.isEnded=!0,this.onEnded?.(),!1;this.onLoop?.(),this.approxFrameIndex=0}else if(r<0&&(0===e||a<0)){if(this.params.noLoop)return this.isAnimating=!1,this.isEnded=!0,this.onEnded?.(),!1;this.onLoop?.(),this.approxFrameIndex=this.framesCount-1}else{if(void 0!==this.stopFrameIndex&&(e===this.stopFrameIndex||r>0&&a>this.stopFrameIndex||r<0&&a<this.stopFrameIndex))return this.stopFrameIndex=void 0,this.isAnimating=!1,!1;this.approxFrameIndex+=r}const n=Math.round(this.approxFrameIndex);return!!this.getFrame(n)||(this.requestFrame(n),this.isWaiting=!0,this.isAnimating=!1,!1)}),d.RK)))}getFrame(e){return this.frames[e]}requestFrame(e){this.frames[e]=m,f[this.workerIndex].request({name:"rlottie:renderFrames",args:[this.renderId,e,this.onFrameLoad.bind(this)]})}cleanupPrevFrame(e){if(this.framesCount<3)return;const t=(0,r.A)(this.framesCount,e-1);this.frames[t]=void 0}onFrameLoad(e,t){this.frames[e]===m&&(this.frames[e]=t,this.isWaiting&&this.doPlay())}}function I(e,t){const s=Math.round(e.offsetWidth*t),i=Math.round(e.offsetHeight*t);if(e.width!==s||e.height!==i){const t=new a.A;y.set(e,t.promise),(0,d.RK)((()=>{e.width=s,e.height=i,t.resolve()}))}return[s,i]}const F=x},5130:(e,t,s)=>{s.d(t,{U:()=>o});var i=s(14235),r=s(37836);function a(e,t,s){var i;return(t="symbol"==typeof(i=function(e,t){if("object"!=typeof e||!e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?i:i+"")in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}class n{constructor(e,t,s){this.target=e,this.onUpdate=t,this.channel=s,a(this,"requestStates",new Map),a(this,"requestStatesByCallback",new Map),a(this,"pendingPayloads",[]),a(this,"pendingTransferables",[]),a(this,"postMessagesOnTickEnd",(0,r.Fe)((()=>{const{channel:e}=this,t=this.pendingPayloads,s=this.pendingTransferables;this.pendingPayloads=[],this.pendingTransferables=[],this.target.postMessage({channel:e,payloads:t},s)})))}destroy(){}init(...e){this.postMessageOnTickEnd({type:"init",args:e})}request(e){const{requestStates:t,requestStatesByCallback:s}=this,{transferables:r,...a}=e,n=(0,i.A)(),o={type:"callMethod",messageId:n,...a},h={messageId:n},d=new Promise(((e,t)=>{Object.assign(h,{resolve:e,reject:t})}));if("function"==typeof o.args[o.args.length-1]){o.withCallback=!0;const e=o.args.pop();h.callback=e,s.set(e,h)}return t.set(n,h),d.catch((()=>{})).finally((()=>{t.delete(n),h.callback&&s.delete(h.callback)})),this.postMessageOnTickEnd(o,r),d}cancelCallback(e){e.isCanceled=!0;const{messageId:t}=this.requestStatesByCallback.get(e)||{};t&&this.postMessageOnTickEnd({type:"cancelProgress",messageId:t})}onMessage(e){const{requestStates:t,channel:s}=this;e.channel===s&&e.payloads.forEach((e=>{if("update"===e.type&&this.onUpdate&&this.onUpdate(e.update),"methodResponse"===e.type){const s=t.get(e.messageId);s&&(e.error?s.reject(e.error):s.resolve(e.response))}else if("methodCallback"===e.type){const s=t.get(e.messageId);s?.callback?.(...e.callbackArgs)}else if("unhandledError"===e.type)throw new Error(e.error?.message)}))}postMessageOnTickEnd(e,t){this.pendingPayloads.push(e),t&&this.pendingTransferables.push(...t),this.postMessagesOnTickEnd()}}function o(e,t,s){const i=new n(e,t,s);function r({data:e}){i.onMessage(e)}return e.addEventListener("message",r),i.destroy=()=>{e.removeEventListener("message",r)},i}},67054:(e,t,s)=>{function i(e,t){return t-Math.floor(t/e)*e}s.d(t,{A:()=>i})},41074:(e,t,s)=>{s.d(t,{Ay:()=>o,M1:()=>h,bP:()=>a});var i=s(31481),r=s(5130);const a=Math.min(navigator.hardwareConcurrency||4,4);let n;function o(){return i.W75?[]:(n||(n=new Array(a).fill(void 0).map((()=>{const e=new Worker(new URL(s.p+s.u(9722),s.b));return{worker:e,connector:(0,r.U)(e,void 0,"media")}}))),n)}function h(e,t){return o()[t].connector.request(e)}}}]);
//# sourceMappingURL=6708.442ed2b5bb9e8ee893ec.js.map