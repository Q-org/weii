"use strict";exports.id=3459,exports.ids=[3459],exports.modules={13459:(e,r,t)=>{let o;t.r(r),t.d(r,{Chalk:()=>B,backgroundColorNames:()=>c,backgroundColors:()=>c,chalkStderr:()=>k,colorNames:()=>b,colors:()=>b,default:()=>G,foregroundColorNames:()=>a,foregroundColors:()=>a,modifierNames:()=>u,modifiers:()=>u,supportsColor:()=>p,supportsColorStderr:()=>v});let l=(e=0)=>r=>`\u001B[${r+e}m`,i=(e=0)=>r=>`\u001B[${38+e};5;${r}m`,n=(e=0)=>(r,t,o)=>`\u001B[${38+e};2;${r};${t};${o}m`,s={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],gray:[90,39],grey:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgGray:[100,49],bgGrey:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}},u=Object.keys(s.modifier),a=Object.keys(s.color),c=Object.keys(s.bgColor),b=[...a,...c],g=function(){let e=new Map;for(let[r,t]of Object.entries(s)){for(let[r,o]of Object.entries(t))s[r]={open:`\u001B[${o[0]}m`,close:`\u001B[${o[1]}m`},t[r]=s[r],e.set(o[0],o[1]);Object.defineProperty(s,r,{value:t,enumerable:!1})}return Object.defineProperty(s,"codes",{value:e,enumerable:!1}),s.color.close="\x1b[39m",s.bgColor.close="\x1b[49m",s.color.ansi=l(),s.color.ansi256=i(),s.color.ansi16m=n(),s.bgColor.ansi=l(10),s.bgColor.ansi256=i(10),s.bgColor.ansi16m=n(10),Object.defineProperties(s,{rgbToAnsi256:{value:(e,r,t)=>e===r&&r===t?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(t/255*5),enumerable:!1},hexToRgb:{value(e){let r=/[a-f\d]{6}|[a-f\d]{3}/i.exec(e.toString(16));if(!r)return[0,0,0];let[t]=r;3===t.length&&(t=[...t].map(e=>e+e).join(""));let o=Number.parseInt(t,16);return[o>>16&255,o>>8&255,255&o]},enumerable:!1},hexToAnsi256:{value:e=>s.rgbToAnsi256(...s.hexToRgb(e)),enumerable:!1},ansi256ToAnsi:{value(e){let r,t,o;if(e<8)return 30+e;if(e<16)return 90+(e-8);if(e>=232)t=r=((e-232)*10+8)/255,o=r;else{let l=(e-=16)%36;r=Math.floor(e/36)/5,t=Math.floor(l/6)/5,o=l%6/5}let l=2*Math.max(r,t,o);if(0===l)return 30;let i=30+(Math.round(o)<<2|Math.round(t)<<1|Math.round(r));return 2===l&&(i+=60),i},enumerable:!1},rgbToAnsi:{value:(e,r,t)=>s.ansi256ToAnsi(s.rgbToAnsi256(e,r,t)),enumerable:!1},hexToAnsi:{value:e=>s.ansi256ToAnsi(s.hexToAnsi256(e)),enumerable:!1}}),s}();var h=t(1708),f=t(48161),d=t(7066);function m(e,r=globalThis.Deno?globalThis.Deno.args:h.argv){let t=e.startsWith("-")?"":1===e.length?"-":"--",o=r.indexOf(t+e),l=r.indexOf("--");return -1!==o&&(-1===l||o<l)}let{env:O}=h;function T(e,r={}){var t;return 0!==(t=function(e,{streamIsTTY:r,sniffFlags:t=!0}={}){let l=function(){if("FORCE_COLOR"in O)return"true"===O.FORCE_COLOR?1:"false"===O.FORCE_COLOR?0:0===O.FORCE_COLOR.length?1:Math.min(Number.parseInt(O.FORCE_COLOR,10),3)}();void 0!==l&&(o=l);let i=t?o:l;if(0===i)return 0;if(t){if(m("color=16m")||m("color=full")||m("color=truecolor"))return 3;if(m("color=256"))return 2}if("TF_BUILD"in O&&"AGENT_NAME"in O)return 1;if(e&&!r&&void 0===i)return 0;let n=i||0;if("dumb"===O.TERM)return n;if("win32"===h.platform){let e=f.release().split(".");return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in O)return"GITHUB_ACTIONS"in O||"GITEA_ACTIONS"in O?3:["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","BUILDKITE","DRONE"].some(e=>e in O)||"codeship"===O.CI_NAME?1:n;if("TEAMCITY_VERSION"in O)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(O.TEAMCITY_VERSION)?1:0;if("truecolor"===O.COLORTERM||"xterm-kitty"===O.TERM)return 3;if("TERM_PROGRAM"in O){let e=Number.parseInt((O.TERM_PROGRAM_VERSION||"").split(".")[0],10);switch(O.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2;case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(O.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(O.TERM)||"COLORTERM"in O?1:n}(e,{streamIsTTY:e&&e.isTTY,...r}))&&{level:t,hasBasic:!0,has256:t>=2,has16m:t>=3}}m("no-color")||m("no-colors")||m("color=false")||m("color=never")?o=0:(m("color")||m("colors")||m("color=true")||m("color=always"))&&(o=1);let{stdout:p,stderr:v}={stdout:T({isTTY:d.isatty(1)}),stderr:T({isTTY:d.isatty(2)})},R=Symbol("GENERATOR"),C=Symbol("STYLER"),y=Symbol("IS_EMPTY"),E=["ansi","ansi","ansi256","ansi16m"],M=Object.create(null),A=(e,r={})=>{if(r.level&&!(Number.isInteger(r.level)&&r.level>=0&&r.level<=3))throw Error("The `level` option should be an integer from 0 to 3");let t=p?p.level:0;e.level=void 0===r.level?t:r.level};class B{constructor(e){return x(e)}}let x=e=>{let r=(...e)=>e.join(" ");return A(r,e),Object.setPrototypeOf(r,I.prototype),r};function I(e){return x(e)}for(let[e,r]of(Object.setPrototypeOf(I.prototype,Function.prototype),Object.entries(g)))M[e]={get(){let t=P(this,_(r.open,r.close,this[C]),this[y]);return Object.defineProperty(this,e,{value:t}),t}};M.visible={get(){let e=P(this,this[C],!0);return Object.defineProperty(this,"visible",{value:e}),e}};let N=(e,r,t,...o)=>"rgb"===e?"ansi16m"===r?g[t].ansi16m(...o):"ansi256"===r?g[t].ansi256(g.rgbToAnsi256(...o)):g[t].ansi(g.rgbToAnsi(...o)):"hex"===e?N("rgb",r,t,...g.hexToRgb(...o)):g[t][e](...o);for(let e of["rgb","hex","ansi256"])M[e]={get(){let{level:r}=this;return function(...t){return P(this,_(N(e,E[r],"color",...t),g.color.close,this[C]),this[y])}}},M["bg"+e[0].toUpperCase()+e.slice(1)]={get(){let{level:r}=this;return function(...t){return P(this,_(N(e,E[r],"bgColor",...t),g.bgColor.close,this[C]),this[y])}}};let j=Object.defineProperties(()=>{},{...M,level:{enumerable:!0,get(){return this[R].level},set(e){this[R].level=e}}}),_=(e,r,t)=>{let o,l;return void 0===t?(o=e,l=r):(o=t.openAll+e,l=r+t.closeAll),{open:e,close:r,openAll:o,closeAll:l,parent:t}},P=(e,r,t)=>{let o=(...e)=>w(o,1===e.length?""+e[0]:e.join(" "));return Object.setPrototypeOf(o,j),o[R]=e,o[C]=r,o[y]=t,o},w=(e,r)=>{if(e.level<=0||!r)return e[y]?"":r;let t=e[C];if(void 0===t)return r;let{openAll:o,closeAll:l}=t;if(r.includes("\x1b"))for(;void 0!==t;)r=function(e,r,t){let o=e.indexOf(r);if(-1===o)return e;let l=r.length,i=0,n="";do n+=e.slice(i,o)+r+t,i=o+l,o=e.indexOf(r,i);while(-1!==o);return n+e.slice(i)}(r,t.close,t.open),t=t.parent;let i=r.indexOf("\n");return -1!==i&&(r=function(e,r,t,o){let l=0,i="";do{let n="\r"===e[o-1];i+=e.slice(l,n?o-1:o)+r+(n?"\r\n":"\n")+t,l=o+1,o=e.indexOf("\n",l)}while(-1!==o);return i+e.slice(l)}(r,l,o,i)),o+r+l};Object.defineProperties(I.prototype,M);let S=x(void 0),k=x({level:v?v.level:0}),G=S}};