"use strict";(()=>{var e={};e.id=9173,e.ids=[636,3220,9014,9173],e.modules={65070:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},15230:(e,t,n)=>{n.r(t),n.d(t,{config:()=>g,default:()=>P,getServerSideProps:()=>S,getStaticPaths:()=>p,getStaticProps:()=>f,reportWebVitals:()=>b,routeModule:()=>_,unstable_getServerProps:()=>j,unstable_getServerSideProps:()=>A,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>v,unstable_getStaticProps:()=>m});var r={};n.r(r),n.d(r,{default:()=>h});var a=n(46164),s=n(34304),u=n(65070),i=n(9289),l=n.n(i),o=n(6832),d=n(45400),c=n(82015);function h(){let[e,t]=(0,c.useState)(null),[n,r]=(0,c.useState)(null),[a,s]=(0,c.useState)(null);return d.jsx(d.Fragment,{children:(0,d.jsxs)(c.Suspense,{fallback:d.jsx("div",{children:"Loading..."}),children:[e&&d.jsx(e,{}),a&&d.jsx(a,{}),d.jsx("div",{children:"jc"})]})})}let P=(0,u.M)(r,"default"),f=(0,u.M)(r,"getStaticProps"),p=(0,u.M)(r,"getStaticPaths"),S=(0,u.M)(r,"getServerSideProps"),g=(0,u.M)(r,"config"),b=(0,u.M)(r,"reportWebVitals"),m=(0,u.M)(r,"unstable_getStaticProps"),v=(0,u.M)(r,"unstable_getStaticPaths"),x=(0,u.M)(r,"unstable_getStaticParams"),j=(0,u.M)(r,"unstable_getServerProps"),A=(0,u.M)(r,"unstable_getServerSideProps"),_=new a.PagesRouteModule({definition:{kind:s.A.PAGES,page:"/jc",pathname:"/jc",bundlePath:"",filename:""},components:{App:o.default,Document:l()},userland:r})},6832:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f,useBrowserId:()=>P});var r=n(45400),a=n(32455),s=n.n(a),u=n(82015);let i=(0,u.createContext)(void 0),l=({children:e})=>{let[t,n]=(0,u.useState)({});return r.jsx(i.Provider,{value:{state:t,setState:n},children:e})};var o=n(4722),d=n(16772);let c=s()(()=>n.e(8190).then(n.bind(n,38190)).then(e=>e.default),{loadableGenerated:{modules:["pages\\_app.tsx -> @qk/src/context/QiankunContext.tsx"]},ssr:!1}),h=(0,u.createContext)(null),P=()=>(0,u.useContext)(h);function f({Component:e,pageProps:{session:t,...n}}){return r.jsx(l,{children:r.jsx(c,{children:r.jsx(o.SessionProvider,{session:t,basePath:"/root/api/auth",refetchInterval:300,refetchOnWindowFocus:!0,children:r.jsx(d.Ay,{children:r.jsx(e,{...n})})})})})}},93481:(e,t,n)=>{n.d(t,{A:()=>s});var r=n(41540),a=n(65398);function s(e){return{...(0,r.$w)(e),components:{...a.cu,...a.Zh,...a.Ws,...a.TH,...a.l$}}}},34304:(e,t)=>{var n;Object.defineProperty(t,"A",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},33873:e=>{e.exports=require("path")},72882:()=>{"undefined"!=typeof module&&(globalThis.entryChunkCache=globalThis.entryChunkCache||new Set,module.filename&&globalThis.entryChunkCache.add(module.filename),module.children&&module.children.forEach(function(e){e.filename&&globalThis.entryChunkCache.add(e.filename)}))}};var t=require("../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=Promise.all([t.f.consumes||function(e,t){},t.f.remotes||function(e,t){}].reduce((e,t)=>(t("9173",e),e),[])).then(()=>t.X(0,[5856,3704,9289,8910,5400,1363,2455],()=>(n(72882),n(15230))));module.exports=r})();