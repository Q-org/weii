"use strict";(()=>{var e={};e.id=7278,e.ids=[7278],e.modules={75600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},23003:(e,n)=>{Object.defineProperty(n,"M",{enumerable:!0,get:function(){return function e(n,t){return t in n?n[t]:"then"in n&&"function"==typeof n.then?n.then(n=>e(n,t)):"function"==typeof n&&"default"===t?n:void 0}}})},67700:(e,n,t)=>{t.r(n),t.d(n,{config:()=>l,default:()=>d,routeModule:()=>f});var i={};t.r(i),t.d(i,{default:()=>o});var r=t(93772),u=t(25395),a=t(23003);function o(e,n){"GET"===e.method?n.status(200).end():n.status(405).end()}let d=(0,a.M)(i,"default"),l=(0,a.M)(i,"config"),f=new r.PagesAPIRouteModule({definition:{kind:u.A.PAGES_API,page:"/api/webpack-hmr",pathname:"/api/webpack-hmr",bundlePath:"",filename:""},userland:i})},25395:(e,n)=>{var t;Object.defineProperty(n,"A",{enumerable:!0,get:function(){return t}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(t||(t={}))},93772:(e,n,t)=>{e.exports=t(75600)},72882:()=>{"undefined"!=typeof module&&(globalThis.entryChunkCache=globalThis.entryChunkCache||new Set,module.filename&&globalThis.entryChunkCache.add(module.filename),module.children&&module.children.forEach(function(e){e.filename&&globalThis.entryChunkCache.add(e.filename)}))}};var n=require("../../webpack-api-runtime.js");n.C(e);var t=e=>n(n.s=e),i=Promise.all([n.f.consumes||function(e,n){},n.f.remotes||function(e,n){}].reduce((e,n)=>(n("7278",e),e),[])).then(()=>n.X(0,[8910],()=>(t(72882),t(67700))));module.exports=i})();