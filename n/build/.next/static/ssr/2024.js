exports.id=2024,exports.ids=[2024],exports.modules={80668:(e,t)=>{t.L=function(e,t,i,r,n){var s,a,f=8*n-r-1,c=(1<<f)-1,o=c>>1,h=-7,m=i?n-1:0,u=i?-1:1,p=e[t+m];for(m+=u,s=p&(1<<-h)-1,p>>=-h,h+=f;h>0;s=256*s+e[t+m],m+=u,h-=8);for(a=s&(1<<-h)-1,s>>=-h,h+=r;h>0;a=256*a+e[t+m],m+=u,h-=8);if(0===s)s=1-o;else{if(s===c)return a?NaN:1/0*(p?-1:1);a+=Math.pow(2,r),s-=o}return(p?-1:1)*a*Math.pow(2,s-r)},t.M=function(e,t,i,r,n,s){var a,f,c,o=8*s-n-1,h=(1<<o)-1,m=h>>1,u=23===n?5960464477539062e-23:0,p=r?0:s-1,l=r?1:-1,d=t<0||0===t&&1/t<0?1:0;for(isNaN(t=Math.abs(t))||t===1/0?(f=isNaN(t)?1:0,a=h):(a=Math.floor(Math.log(t)/Math.LN2),t*(c=Math.pow(2,-a))<1&&(a--,c*=2),a+m>=1?t+=u/c:t+=u*Math.pow(2,1-m),t*c>=2&&(a++,c/=2),a+m>=h?(f=0,a=h):a+m>=1?(f=(t*c-1)*Math.pow(2,n),a+=m):(f=t*Math.pow(2,m-1)*Math.pow(2,n),a=0));n>=8;e[i+p]=255&f,p+=l,f/=256,n-=8);for(a=a<<n|f,o+=n;o>0;e[i+p]=255&a,p+=l,a/=256,o-=8);e[i+p-l]|=128*d}},32024:(e,t,i)=>{"use strict";i.d(t,{BI:()=>g,Tm:()=>x,mG:()=>w,xd:()=>S});var r=i(4573);function n(e){return new DataView(e.buffer,e.byteOffset)}i(80668);let s={len:1,get:(e,t)=>n(e).getUint8(t),put:(e,t,i)=>(n(e).setUint8(t,i),t+1)},a={len:2,get:(e,t)=>n(e).getUint16(t,!0),put:(e,t,i)=>(n(e).setUint16(t,i,!0),t+2)},f={len:2,get:(e,t)=>n(e).getUint16(t),put:(e,t,i)=>(n(e).setUint16(t,i),t+2)},c={len:4,get:(e,t)=>n(e).getUint32(t,!0),put:(e,t,i)=>(n(e).setUint32(t,i,!0),t+4)},o={len:4,get:(e,t)=>n(e).getUint32(t),put:(e,t,i)=>(n(e).setUint32(t,i),t+4)},h={len:4,get:(e,t)=>n(e).getInt32(t),put:(e,t,i)=>(n(e).setInt32(t,i),t+4)},m={len:8,get:(e,t)=>n(e).getBigUint64(t,!0),put:(e,t,i)=>(n(e).setBigUint64(t,i,!0),t+8)};class u{constructor(e,t){this.len=e,this.encoding=t}get(e,t){return r.Buffer.from(e).toString(this.encoding,t,t+this.len)}}class p{constructor(e){this.len=e}static decode(e,t,i){let r="";for(let n=t;n<i;++n)r+=p.codePointToString(p.singleByteDecoder(e[n]));return r}static inRange(e,t,i){return t<=e&&e<=i}static codePointToString(e){return e<=65535?String.fromCharCode(e):String.fromCharCode(((e-=65536)>>10)+55296,(1023&e)+56320)}static singleByteDecoder(e){if(p.inRange(e,0,127))return e;let t=p.windows1252[e-128];if(null===t)throw Error("invaliding encoding");return t}get(e,t=0){return p.decode(e,t,t+this.len)}}p.windows1252=[8364,129,8218,402,8222,8230,8224,8225,710,8240,352,8249,338,141,381,143,144,8216,8217,8220,8221,8226,8211,8212,732,8482,353,8250,339,157,382,376,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];var l=i(74880);let d={get:(e,t)=>127&e[t+3]|e[t+2]<<7|e[t+1]<<14|e[t]<<21,len:4};async function x(e){let t=await l.n7(e);try{return await w(t)}finally{await t.close()}}async function g(e){if(!(e instanceof Uint8Array||e instanceof ArrayBuffer))throw TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof e}\``);let t=e instanceof Uint8Array?e:new Uint8Array(e);if(t&&t.length>1)return w(l.vY(t))}function k(e,t,i){for(let[r,n]of(i={offset:0,...i},t.entries()))if(i.mask){if(n!==(i.mask[r]&e[r+i.offset]))return!1}else if(n!==e[r+i.offset])return!1;return!0}async function w(e){try{return new b().parse(e)}catch(e){if(!(e instanceof l.d1))throw e}}class b{check(e,t){return k(this.buffer,e,t)}checkString(e,t){return this.check([...e].map(e=>e.charCodeAt(0)),t)}async parse(e){if(this.buffer=r.Buffer.alloc(4100),void 0===e.fileInfo.size&&(e.fileInfo.size=Number.MAX_SAFE_INTEGER),this.tokenizer=e,await e.peekBuffer(this.buffer,{length:12,mayBeLess:!0}),this.check([66,77]))return{ext:"bmp",mime:"image/bmp"};if(this.check([11,119]))return{ext:"ac3",mime:"audio/vnd.dolby.dd-raw"};if(this.check([120,1]))return{ext:"dmg",mime:"application/x-apple-diskimage"};if(this.check([77,90]))return{ext:"exe",mime:"application/x-msdownload"};if(this.check([37,33]))return(await e.peekBuffer(this.buffer,{length:24,mayBeLess:!0}),this.checkString("PS-Adobe-",{offset:2})&&this.checkString(" EPSF-",{offset:14}))?{ext:"eps",mime:"application/eps"}:{ext:"ps",mime:"application/postscript"};if(this.check([31,160])||this.check([31,157]))return{ext:"Z",mime:"application/x-compress"};if(this.check([239,187,191]))return this.tokenizer.ignore(3),this.parse(e);if(this.check([71,73,70]))return{ext:"gif",mime:"image/gif"};if(this.check([255,216,255]))return{ext:"jpg",mime:"image/jpeg"};if(this.check([73,73,188]))return{ext:"jxr",mime:"image/vnd.ms-photo"};if(this.check([31,139,8]))return{ext:"gz",mime:"application/gzip"};if(this.check([66,90,104]))return{ext:"bz2",mime:"application/x-bzip2"};if(this.checkString("ID3")){await e.ignore(6);let t=await e.readToken(d);return e.position+t>e.fileInfo.size?{ext:"mp3",mime:"audio/mpeg"}:(await e.ignore(t),w(e))}if(this.checkString("MP+"))return{ext:"mpc",mime:"audio/x-musepack"};if((67===this.buffer[0]||70===this.buffer[0])&&this.check([87,83],{offset:1}))return{ext:"swf",mime:"application/x-shockwave-flash"};if(this.checkString("FLIF"))return{ext:"flif",mime:"image/flif"};if(this.checkString("8BPS"))return{ext:"psd",mime:"image/vnd.adobe.photoshop"};if(this.checkString("WEBP",{offset:8}))return{ext:"webp",mime:"image/webp"};if(this.checkString("MPCK"))return{ext:"mpc",mime:"audio/x-musepack"};if(this.checkString("FORM"))return{ext:"aif",mime:"audio/aiff"};if(this.checkString("icns",{offset:0}))return{ext:"icns",mime:"image/icns"};if(this.check([80,75,3,4])){try{for(;e.position+30<e.fileInfo.size;){await e.readBuffer(this.buffer,{length:30});let t={compressedSize:this.buffer.readUInt32LE(18),uncompressedSize:this.buffer.readUInt32LE(22),filenameLength:this.buffer.readUInt16LE(26),extraFieldLength:this.buffer.readUInt16LE(28)};if(t.filename=await e.readToken(new u(t.filenameLength,"utf-8")),await e.ignore(t.extraFieldLength),"META-INF/mozilla.rsa"===t.filename)return{ext:"xpi",mime:"application/x-xpinstall"};if(t.filename.endsWith(".rels")||t.filename.endsWith(".xml"))switch(t.filename.split("/")[0]){case"_rels":break;case"word":return{ext:"docx",mime:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"};case"ppt":return{ext:"pptx",mime:"application/vnd.openxmlformats-officedocument.presentationml.presentation"};case"xl":return{ext:"xlsx",mime:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}}if(t.filename.startsWith("xl/"))return{ext:"xlsx",mime:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"};if(t.filename.startsWith("3D/")&&t.filename.endsWith(".model"))return{ext:"3mf",mime:"model/3mf"};if("mimetype"===t.filename&&t.compressedSize===t.uncompressedSize)switch((await e.readToken(new u(t.compressedSize,"utf-8"))).trim()){case"application/epub+zip":return{ext:"epub",mime:"application/epub+zip"};case"application/vnd.oasis.opendocument.text":return{ext:"odt",mime:"application/vnd.oasis.opendocument.text"};case"application/vnd.oasis.opendocument.spreadsheet":return{ext:"ods",mime:"application/vnd.oasis.opendocument.spreadsheet"};case"application/vnd.oasis.opendocument.presentation":return{ext:"odp",mime:"application/vnd.oasis.opendocument.presentation"}}if(0===t.compressedSize){let t=-1;for(;t<0&&e.position<e.fileInfo.size;)await e.peekBuffer(this.buffer,{mayBeLess:!0}),t=this.buffer.indexOf("504B0304",0,"hex"),await e.ignore(t>=0?t:this.buffer.length)}else await e.ignore(t.compressedSize)}}catch(e){if(!(e instanceof l.d1))throw e}return{ext:"zip",mime:"application/zip"}}if(this.checkString("OggS")){await e.ignore(28);let t=r.Buffer.alloc(8);return(await e.readBuffer(t),k(t,[79,112,117,115,72,101,97,100]))?{ext:"opus",mime:"audio/opus"}:k(t,[128,116,104,101,111,114,97])?{ext:"ogv",mime:"video/ogg"}:k(t,[1,118,105,100,101,111,0])?{ext:"ogm",mime:"video/ogg"}:k(t,[127,70,76,65,67])?{ext:"oga",mime:"audio/ogg"}:k(t,[83,112,101,101,120,32,32])?{ext:"spx",mime:"audio/ogg"}:k(t,[1,118,111,114,98,105,115])?{ext:"ogg",mime:"audio/ogg"}:{ext:"ogx",mime:"application/ogg"}}if(this.check([80,75])&&(3===this.buffer[2]||5===this.buffer[2]||7===this.buffer[2])&&(4===this.buffer[3]||6===this.buffer[3]||8===this.buffer[3]))return{ext:"zip",mime:"application/zip"};if(this.checkString("ftyp",{offset:4})&&(96&this.buffer[8])!=0){let e=this.buffer.toString("binary",8,12).replace("\0"," ").trim();switch(e){case"avif":case"avis":return{ext:"avif",mime:"image/avif"};case"mif1":return{ext:"heic",mime:"image/heif"};case"msf1":return{ext:"heic",mime:"image/heif-sequence"};case"heic":case"heix":return{ext:"heic",mime:"image/heic"};case"hevc":case"hevx":return{ext:"heic",mime:"image/heic-sequence"};case"qt":return{ext:"mov",mime:"video/quicktime"};case"M4V":case"M4VH":case"M4VP":return{ext:"m4v",mime:"video/x-m4v"};case"M4P":return{ext:"m4p",mime:"video/mp4"};case"M4B":return{ext:"m4b",mime:"audio/mp4"};case"M4A":return{ext:"m4a",mime:"audio/x-m4a"};case"F4V":return{ext:"f4v",mime:"video/mp4"};case"F4P":return{ext:"f4p",mime:"video/mp4"};case"F4A":return{ext:"f4a",mime:"audio/mp4"};case"F4B":return{ext:"f4b",mime:"audio/mp4"};case"crx":return{ext:"cr3",mime:"image/x-canon-cr3"};default:if(e.startsWith("3g")){if(e.startsWith("3g2"))return{ext:"3g2",mime:"video/3gpp2"};return{ext:"3gp",mime:"video/3gpp"}}return{ext:"mp4",mime:"video/mp4"}}}if(this.checkString("MThd"))return{ext:"mid",mime:"audio/midi"};if(this.checkString("wOFF")&&(this.check([0,1,0,0],{offset:4})||this.checkString("OTTO",{offset:4})))return{ext:"woff",mime:"font/woff"};if(this.checkString("wOF2")&&(this.check([0,1,0,0],{offset:4})||this.checkString("OTTO",{offset:4})))return{ext:"woff2",mime:"font/woff2"};if(this.check([212,195,178,161])||this.check([161,178,195,212]))return{ext:"pcap",mime:"application/vnd.tcpdump.pcap"};if(this.checkString("DSD "))return{ext:"dsf",mime:"audio/x-dsf"};if(this.checkString("LZIP"))return{ext:"lz",mime:"application/x-lzip"};if(this.checkString("fLaC"))return{ext:"flac",mime:"audio/x-flac"};if(this.check([66,80,71,251]))return{ext:"bpg",mime:"image/bpg"};if(this.checkString("wvpk"))return{ext:"wv",mime:"audio/wavpack"};if(this.checkString("%PDF")){await e.ignore(1350);let t=r.Buffer.alloc(Math.min(10485760,e.fileInfo.size));return(await e.readBuffer(t,{mayBeLess:!0}),t.includes(r.Buffer.from("AIPrivateData")))?{ext:"ai",mime:"application/postscript"}:{ext:"pdf",mime:"application/pdf"}}if(this.check([0,97,115,109]))return{ext:"wasm",mime:"application/wasm"};if(this.check([73,73])){let e=await this.readTiffHeader(!1);if(e)return e}if(this.check([77,77])){let e=await this.readTiffHeader(!0);if(e)return e}if(this.checkString("MAC "))return{ext:"ape",mime:"audio/ape"};if(this.check([26,69,223,163])){async function t(){let t=await e.peekNumber(s),i=128,n=0;for(;(t&i)==0&&0!==i;)++n,i>>=1;let a=r.Buffer.alloc(n+1);return await e.readBuffer(a),a}async function i(){let e=await t(),i=await t();i[0]^=128>>i.length-1;let r=Math.min(6,i.length);return{id:e.readUIntBE(0,e.length),len:i.readUIntBE(i.length-r,r)}}async function n(t){for(;t>0;){let r=await i();if(17026===r.id)return(await e.readToken(new u(r.len,"utf-8"))).replace(/\00.*$/g,"");await e.ignore(r.len),--t}}let a=await i();switch(await n(a.len)){case"webm":return{ext:"webm",mime:"video/webm"};case"matroska":return{ext:"mkv",mime:"video/x-matroska"};default:return}}if(this.check([82,73,70,70])){if(this.check([65,86,73],{offset:8}))return{ext:"avi",mime:"video/vnd.avi"};if(this.check([87,65,86,69],{offset:8}))return{ext:"wav",mime:"audio/vnd.wave"};if(this.check([81,76,67,77],{offset:8}))return{ext:"qcp",mime:"audio/qcelp"}}if(this.checkString("SQLi"))return{ext:"sqlite",mime:"application/x-sqlite3"};if(this.check([78,69,83,26]))return{ext:"nes",mime:"application/x-nintendo-nes-rom"};if(this.checkString("Cr24"))return{ext:"crx",mime:"application/x-google-chrome-extension"};if(this.checkString("MSCF")||this.checkString("ISc("))return{ext:"cab",mime:"application/vnd.ms-cab-compressed"};if(this.check([237,171,238,219]))return{ext:"rpm",mime:"application/x-rpm"};if(this.check([197,208,211,198]))return{ext:"eps",mime:"application/eps"};if(this.check([40,181,47,253]))return{ext:"zst",mime:"application/zstd"};if(this.check([127,69,76,70]))return{ext:"elf",mime:"application/x-elf"};if(this.check([79,84,84,79,0]))return{ext:"otf",mime:"font/otf"};if(this.checkString("#!AMR"))return{ext:"amr",mime:"audio/amr"};if(this.checkString("{\\rtf"))return{ext:"rtf",mime:"application/rtf"};if(this.check([70,76,86,1]))return{ext:"flv",mime:"video/x-flv"};if(this.checkString("IMPM"))return{ext:"it",mime:"audio/x-it"};if(this.checkString("-lh0-",{offset:2})||this.checkString("-lh1-",{offset:2})||this.checkString("-lh2-",{offset:2})||this.checkString("-lh3-",{offset:2})||this.checkString("-lh4-",{offset:2})||this.checkString("-lh5-",{offset:2})||this.checkString("-lh6-",{offset:2})||this.checkString("-lh7-",{offset:2})||this.checkString("-lzs-",{offset:2})||this.checkString("-lz4-",{offset:2})||this.checkString("-lz5-",{offset:2})||this.checkString("-lhd-",{offset:2}))return{ext:"lzh",mime:"application/x-lzh-compressed"};if(this.check([0,0,1,186])){if(this.check([33],{offset:4,mask:[241]}))return{ext:"mpg",mime:"video/MP1S"};if(this.check([68],{offset:4,mask:[196]}))return{ext:"mpg",mime:"video/MP2P"}}if(this.checkString("ITSF"))return{ext:"chm",mime:"application/vnd.ms-htmlhelp"};if(this.check([253,55,122,88,90,0]))return{ext:"xz",mime:"application/x-xz"};if(this.checkString("<?xml "))return{ext:"xml",mime:"application/xml"};if(this.check([55,122,188,175,39,28]))return{ext:"7z",mime:"application/x-7z-compressed"};if(this.check([82,97,114,33,26,7])&&(0===this.buffer[6]||1===this.buffer[6]))return{ext:"rar",mime:"application/x-rar-compressed"};if(this.checkString("solid "))return{ext:"stl",mime:"model/stl"};if(this.checkString("BLENDER"))return{ext:"blend",mime:"application/x-blender"};if(this.checkString("!<arch>"))return(await e.ignore(8),"debian-binary"===await e.readToken(new u(13,"ascii")))?{ext:"deb",mime:"application/x-deb"}:{ext:"ar",mime:"application/x-unix-archive"};if(this.check([137,80,78,71,13,10,26,10])){async function a(){return{length:await e.readToken(h),type:await e.readToken(new u(4,"binary"))}}await e.ignore(8);do{let t=await a();if(t.length<0)return;switch(t.type){case"IDAT":return{ext:"png",mime:"image/png"};case"acTL":return{ext:"apng",mime:"image/apng"};default:await e.ignore(t.length+4)}}while(e.position+8<e.fileInfo.size);return{ext:"png",mime:"image/png"}}if(this.check([65,82,82,79,87,49,0,0]))return{ext:"arrow",mime:"application/x-apache-arrow"};if(this.check([103,108,84,70,2,0,0,0]))return{ext:"glb",mime:"model/gltf-binary"};if(this.check([102,114,101,101],{offset:4})||this.check([109,100,97,116],{offset:4})||this.check([109,111,111,118],{offset:4})||this.check([119,105,100,101],{offset:4}))return{ext:"mov",mime:"video/quicktime"};if(this.check([73,73,82,79,8,0,0,0,24]))return{ext:"orf",mime:"image/x-olympus-orf"};if(this.checkString("gimp xcf "))return{ext:"xcf",mime:"image/x-xcf"};if(this.check([73,73,85,0,24,0,0,0,136,231,116,216]))return{ext:"rw2",mime:"image/x-panasonic-rw2"};if(this.check([48,38,178,117,142,102,207,17,166,217])){async function f(){let t=r.Buffer.alloc(16);return await e.readBuffer(t),{id:t,size:Number(await e.readToken(m))}}for(await e.ignore(30);e.position+24<e.fileInfo.size;){let t=await f(),i=t.size-24;if(k(t.id,[145,7,220,183,183,169,207,17,142,230,0,192,12,32,83,101])){let t=r.Buffer.alloc(16);if(i-=await e.readBuffer(t),k(t,[64,158,105,248,77,91,207,17,168,253,0,128,95,92,68,43]))return{ext:"asf",mime:"audio/x-ms-asf"};if(k(t,[192,239,25,188,77,91,207,17,168,253,0,128,95,92,68,43]))return{ext:"asf",mime:"video/x-ms-asf"};break}await e.ignore(i)}return{ext:"asf",mime:"application/vnd.ms-asf"}}if(this.check([171,75,84,88,32,49,49,187,13,10,26,10]))return{ext:"ktx",mime:"image/ktx"};if((this.check([126,16,4])||this.check([126,24,4]))&&this.check([48,77,73,69],{offset:4}))return{ext:"mie",mime:"application/x-mie"};if(this.check([39,10,0,0,0,0,0,0,0,0,0,0],{offset:2}))return{ext:"shp",mime:"application/x-esri-shape"};if(this.check([0,0,0,12,106,80,32,32,13,10,135,10]))switch(await e.ignore(20),await e.readToken(new u(4,"ascii"))){case"jp2 ":return{ext:"jp2",mime:"image/jp2"};case"jpx ":return{ext:"jpx",mime:"image/jpx"};case"jpm ":return{ext:"jpm",mime:"image/jpm"};case"mjp2":return{ext:"mj2",mime:"image/mj2"};default:return}if(this.check([255,10])||this.check([0,0,0,12,74,88,76,32,13,10,135,10]))return{ext:"jxl",mime:"image/jxl"};if(this.check([254,255]))return this.check([0,60,0,63,0,120,0,109,0,108],{offset:2})?{ext:"xml",mime:"application/xml"}:void 0;if(this.check([0,0,1,186])||this.check([0,0,1,179]))return{ext:"mpg",mime:"video/mpeg"};if(this.check([0,1,0,0,0]))return{ext:"ttf",mime:"font/ttf"};if(this.check([0,0,1,0]))return{ext:"ico",mime:"image/x-icon"};if(this.check([0,0,2,0]))return{ext:"cur",mime:"image/x-icon"};if(this.check([208,207,17,224,161,177,26,225]))return{ext:"cfb",mime:"application/x-cfb"};if(await e.peekBuffer(this.buffer,{length:Math.min(256,e.fileInfo.size),mayBeLess:!0}),this.checkString("BEGIN:")){if(this.checkString("VCARD",{offset:6}))return{ext:"vcf",mime:"text/vcard"};if(this.checkString("VCALENDAR",{offset:6}))return{ext:"ics",mime:"text/calendar"}}if(this.checkString("FUJIFILMCCD-RAW"))return{ext:"raf",mime:"image/x-fujifilm-raf"};if(this.checkString("Extended Module:"))return{ext:"xm",mime:"audio/x-xm"};if(this.checkString("Creative Voice File"))return{ext:"voc",mime:"audio/x-voc"};if(this.check([4,0,0,0])&&this.buffer.length>=16){let e=this.buffer.readUInt32LE(12);if(e>12&&this.buffer.length>=e+16)try{let t=this.buffer.slice(16,e+16).toString();if(JSON.parse(t).files)return{ext:"asar",mime:"application/x-asar"}}catch{}}if(this.check([6,14,43,52,2,5,1,1,13,1,2,1,1,2]))return{ext:"mxf",mime:"application/mxf"};if(this.checkString("SCRM",{offset:44}))return{ext:"s3m",mime:"audio/x-s3m"};if(this.check([71])&&this.check([71],{offset:188})||this.check([71],{offset:4})&&this.check([71],{offset:196}))return{ext:"mts",mime:"video/mp2t"};if(this.check([66,79,79,75,77,79,66,73],{offset:60}))return{ext:"mobi",mime:"application/x-mobipocket-ebook"};if(this.check([68,73,67,77],{offset:128}))return{ext:"dcm",mime:"application/dicom"};if(this.check([76,0,0,0,1,20,2,0,0,0,0,0,192,0,0,0,0,0,0,70]))return{ext:"lnk",mime:"application/x.ms.shortcut"};if(this.check([98,111,111,107,0,0,0,0,109,97,114,107,0,0,0,0]))return{ext:"alias",mime:"application/x.apple.alias"};if(this.check([76,80],{offset:34})&&(this.check([0,0,1],{offset:8})||this.check([1,0,2],{offset:8})||this.check([2,0,2],{offset:8})))return{ext:"eot",mime:"application/vnd.ms-fontobject"};if(this.check([6,6,237,245,216,29,70,229,189,49,239,231,254,116,183,29]))return{ext:"indd",mime:"application/x-indesign"};if(await e.peekBuffer(this.buffer,{length:Math.min(512,e.fileInfo.size),mayBeLess:!0}),function(e,t=0){let i=Number.parseInt(e.toString("utf8",148,154).replace(/\0.*$/,"").trim(),8);if(Number.isNaN(i))return!1;let r=256;for(let i=t;i<t+148;i++)r+=e[i];for(let i=t+156;i<t+512;i++)r+=e[i];return i===r}(this.buffer))return{ext:"tar",mime:"application/x-tar"};if(this.check([255,254]))return this.check([60,0,63,0,120,0,109,0,108,0],{offset:2})?{ext:"xml",mime:"application/xml"}:this.check([255,14,83,0,107,0,101,0,116,0,99,0,104,0,85,0,112,0,32,0,77,0,111,0,100,0,101,0,108,0],{offset:2})?{ext:"skp",mime:"application/vnd.sketchup.skp"}:void 0;if(this.checkString("-----BEGIN PGP MESSAGE-----"))return{ext:"pgp",mime:"application/pgp-encrypted"};if(this.buffer.length>=2&&this.check([255,224],{offset:0,mask:[255,224]})){if(this.check([16],{offset:1,mask:[22]}))return this.check([8],{offset:1,mask:[8]}),{ext:"aac",mime:"audio/aac"};if(this.check([2],{offset:1,mask:[6]}))return{ext:"mp3",mime:"audio/mpeg"};if(this.check([4],{offset:1,mask:[6]}))return{ext:"mp2",mime:"audio/mpeg"};if(this.check([6],{offset:1,mask:[6]}))return{ext:"mp1",mime:"audio/mpeg"}}}async readTiffTag(e){let t=await this.tokenizer.readToken(e?f:a);switch(this.tokenizer.ignore(10),t){case 50341:return{ext:"arw",mime:"image/x-sony-arw"};case 50706:return{ext:"dng",mime:"image/x-adobe-dng"}}}async readTiffIFD(e){let t=await this.tokenizer.readToken(e?f:a);for(let i=0;i<t;++i){let t=await this.readTiffTag(e);if(t)return t}}async readTiffHeader(e){let t=(e?f:a).get(this.buffer,2),i=(e?o:c).get(this.buffer,4);if(42===t){if(i>=6){if(this.checkString("CR",{offset:8}))return{ext:"cr2",mime:"image/x-canon-cr2"};if(i>=8&&(this.check([28,0,254,0],{offset:8})||this.check([31,0,11,0],{offset:8})))return{ext:"nef",mime:"image/x-nikon-nef"}}return await this.tokenizer.ignore(i),await this.readTiffIFD(!1)||{ext:"tif",mime:"image/tiff"}}if(43===t)return{ext:"tif",mime:"image/tiff"}}}async function S(e,{sampleSize:t=4100}={}){let{default:n}=await Promise.resolve().then(i.t.bind(i,57075,19));return new Promise((i,s)=>{e.on("error",s),e.once("readable",()=>{(async()=>{try{let a=new n.PassThrough,f=n.pipeline?n.pipeline(e,a,()=>{}):e.pipe(a),c=e.read(t)||e.read()||r.Buffer.alloc(0);try{let e=await g(c);a.fileType=e}catch(e){e instanceof l.d1?a.fileType=void 0:s(e)}i(f)}catch(e){s(e)}})()})})}},35932:(e,t,i)=>{"use strict";i.d(t,{d1:()=>r,CX:()=>a});class r extends Error{constructor(){super("End-Of-Stream")}}class n{constructor(){this.resolve=()=>null,this.reject=()=>null,this.promise=new Promise((e,t)=>{this.reject=t,this.resolve=e})}}class s{constructor(){this.maxStreamReadSize=1048576,this.endOfStream=!1,this.peekQueue=[]}async peek(e,t,i){let r=await this.read(e,t,i);return this.peekQueue.push(e.subarray(t,t+r)),r}async read(e,t,i){if(0===i)return 0;let n=this.readFromPeekBuffer(e,t,i);if(0===(n+=await this.readRemainderFromStream(e,t+n,i-n)))throw new r;return n}readFromPeekBuffer(e,t,i){let r=i,n=0;for(;this.peekQueue.length>0&&r>0;){let i=this.peekQueue.pop();if(!i)throw Error("peekData should be defined");let s=Math.min(i.length,r);e.set(i.subarray(0,s),t+n),n+=s,r-=s,s<i.length&&this.peekQueue.push(i.subarray(s))}return n}async readRemainderFromStream(e,t,i){let r=i,n=0;for(;r>0&&!this.endOfStream;){let i=Math.min(r,this.maxStreamReadSize),s=await this.readFromStream(e,t+n,i);if(0===s)break;n+=s,r-=s}return n}}class a extends s{constructor(e){if(super(),this.s=e,this.deferred=null,!e.read||!e.once)throw Error("Expected an instance of stream.Readable");this.s.once("end",()=>this.reject(new r)),this.s.once("error",e=>this.reject(e)),this.s.once("close",()=>this.reject(Error("Stream closed")))}async readFromStream(e,t,i){if(this.endOfStream)return 0;let r=this.s.read(i);if(r)return e.set(r,t),r.length;let s={buffer:e,offset:t,length:i,deferred:new n};return this.deferred=s.deferred,this.s.once("readable",()=>{this.readDeferred(s)}),s.deferred.promise}readDeferred(e){let t=this.s.read(e.length);t?(e.buffer.set(t,e.offset),e.deferred.resolve(t.length),this.deferred=null):this.s.once("readable",()=>{this.readDeferred(e)})}reject(e){this.endOfStream=!0,this.deferred&&(this.deferred.reject(e),this.deferred=null)}async abort(){this.s.destroy()}}},5186:(e,t,i)=>{"use strict";i.d(t,{G:()=>n});var r=i(35932);class n{constructor(e){this.position=0,this.numBuffer=new Uint8Array(8),this.fileInfo=e||{}}async readToken(e,t=this.position){let i=new Uint8Array(e.len);if(await this.readBuffer(i,{position:t})<e.len)throw new r.d1;return e.get(i,0)}async peekToken(e,t=this.position){let i=new Uint8Array(e.len);if(await this.peekBuffer(i,{position:t})<e.len)throw new r.d1;return e.get(i,0)}async readNumber(e){if(await this.readBuffer(this.numBuffer,{length:e.len})<e.len)throw new r.d1;return e.get(this.numBuffer,0)}async peekNumber(e){if(await this.peekBuffer(this.numBuffer,{length:e.len})<e.len)throw new r.d1;return e.get(this.numBuffer,0)}async ignore(e){if(void 0!==this.fileInfo.size){let t=this.fileInfo.size-this.position;if(e>t)return this.position+=t,t}return this.position+=e,e}async close(){}normalizeOptions(e,t){if(t&&void 0!==t.position&&t.position<this.position)throw Error("`options.position` must be equal or greater than `tokenizer.position`");return t?{mayBeLess:!0===t.mayBeLess,offset:t.offset?t.offset:0,length:t.length?t.length:e.length-(t.offset?t.offset:0),position:t.position?t.position:this.position}:{mayBeLess:!1,offset:0,length:e.length,position:this.position}}}},74880:(e,t,i)=>{"use strict";i.d(t,{d1:()=>n.d1,vY:()=>c,n7:()=>f});var r=i(5186),n=i(35932);class s extends r.G{constructor(e,t){super(t),this.streamReader=e}async getFileInfo(){return this.fileInfo}async readBuffer(e,t){let i=this.normalizeOptions(e,t),r=i.position-this.position;if(r>0)return await this.ignore(r),this.readBuffer(e,t);if(r<0)throw Error("`options.position` must be equal or greater than `tokenizer.position`");if(0===i.length)return 0;let s=await this.streamReader.read(e,i.offset,i.length);if(this.position+=s,(!t||!t.mayBeLess)&&s<i.length)throw new n.d1;return s}async peekBuffer(e,t){let i=this.normalizeOptions(e,t),r=0;if(i.position){let t=i.position-this.position;if(t>0){let n=new Uint8Array(i.length+t);return r=await this.peekBuffer(n,{mayBeLess:i.mayBeLess}),e.set(n.subarray(t),i.offset),r-t}if(t<0)throw Error("Cannot peek from a negative offset in a stream")}if(i.length>0){try{r=await this.streamReader.peek(e,i.offset,i.length)}catch(e){if(t&&t.mayBeLess&&e instanceof n.d1)return 0;throw e}if(!i.mayBeLess&&r<i.length)throw new n.d1}return r}async ignore(e){let t=Math.min(256e3,e),i=new Uint8Array(t),r=0;for(;r<e;){let n=e-r,s=await this.readBuffer(i,{length:Math.min(t,n)});if(s<0)return s;r+=s}return r}}class a extends r.G{constructor(e,t){super(t),this.uint8Array=e,this.fileInfo.size=this.fileInfo.size?this.fileInfo.size:e.length}async readBuffer(e,t){if(t&&t.position){if(t.position<this.position)throw Error("`options.position` must be equal or greater than `tokenizer.position`");this.position=t.position}let i=await this.peekBuffer(e,t);return this.position+=i,i}async peekBuffer(e,t){let i=this.normalizeOptions(e,t),r=Math.min(this.uint8Array.length-i.position,i.length);if(i.mayBeLess||!(r<i.length))return e.set(this.uint8Array.subarray(i.position,i.position+r),i.offset),r;throw new n.d1}async close(){}}function f(e,t){return t=t||{},new s(new n.CX(e),t)}function c(e,t){return new a(e,t)}}};