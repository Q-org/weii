"use strict";(()=>{var e={};e.id=5897,e.ids=[5897],e.modules={75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},23003:(e,n)=>{Object.defineProperty(n,"M",{enumerable:!0,get:function(){return function e(n,t){return t in n?n[t]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,t)):"function"==typeof n&&"default"===t?n:void 0}}})},16249:(e,n,t)=>{t.r(n),t.d(n,{config:()=>d,default:()=>l,routeModule:()=>f});var a={};t.r(a),t.d(a,{default:()=>s});var r=t(93772),u=t(25395),i=t(23003),o=t(4722);let s=async(e,n)=>{let t=await (0,o.getSession)({req:e});t?n.status(200).json({message:"用户信息",user:t.user}):n.status(401).json({message:"未登录"})},l=(0,i.M)(a,"default"),d=(0,i.M)(a,"config"),f=new r.PagesAPIRouteModule({definition:{kind:u.A.PAGES_API,page:"/api/auth/getUserInfo",pathname:"/api/auth/getUserInfo",bundlePath:"",filename:""},userland:a})},25395:(e,n)=>{var t;Object.defineProperty(n,"A",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},93772:(e,n,t)=>{e.exports=t(75600)},72882:()=>{"undefined"!=typeof module&&(globalThis.entryChunkCache=globalThis.entryChunkCache||new Set,module.filename&&globalThis.entryChunkCache.add(module.filename),module.children&&module.children.forEach(function(e){e.filename&&globalThis.entryChunkCache.add(e.filename)}))}};var n=require("../../../webpack-api-runtime.js");n.C(e);var t=e=>n(n.s=e),a=Promise.all([n.f.consumes||function(e,n){},n.f.remotes||function(e,n){}].reduce((e,n)=>(n("5897",e),e),[])).then(()=>n.X(0,[8910],()=>(t(72882),t(16249))));module.exports=a})();