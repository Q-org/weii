"use strict";(()=>{var e={};e.id=8948,e.ids=[8948],e.modules={75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},23003:(e,n)=>{Object.defineProperty(n,"M",{enumerable:!0,get:function(){return function e(n,t){return t in n?n[t]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,t)):"function"==typeof n&&"default"===t?n:void 0}}})},29161:(e,n,t)=>{t.r(n),t.d(n,{config:()=>d,default:()=>l,routeModule:()=>s});var r={};t.r(r),t.d(r,{default:()=>u});var o=t(93772),i=t(25395),a=t(23003);let u=async(e,n)=>{try{let t="JSESSIONID",r=e.cookies[t];r?n.status(200).json({[t]:r}):n.status(404).json({error:"Cookie not found or CSRF token missing"})}catch(e){console.error("Error fetching CSRF token:",e),n.status(500).json({error:"Internal Server Error"})}},l=(0,a.M)(r,"default"),d=(0,a.M)(r,"config"),s=new o.PagesAPIRouteModule({definition:{kind:i.A.PAGES_API,page:"/api/getJSESSIONID",pathname:"/api/getJSESSIONID",bundlePath:"",filename:""},userland:r})},25395:(e,n)=>{var t;Object.defineProperty(n,"A",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},93772:(e,n,t)=>{e.exports=t(75600)},72882:()=>{"undefined"!=typeof module&&(globalThis.entryChunkCache=globalThis.entryChunkCache||new Set,module.filename&&globalThis.entryChunkCache.add(module.filename),module.children&&module.children.forEach(function(e){e.filename&&globalThis.entryChunkCache.add(e.filename)}))}};var n=require("../../webpack-api-runtime.js");n.C(e);var t=e=>n(n.s=e),r=Promise.all([n.f.consumes||function(e,n){},n.f.remotes||function(e,n){}].reduce((e,n)=>(n("8948",e),e),[])).then(()=>n.X(0,[8910],()=>(t(72882),t(29161))));module.exports=r})();