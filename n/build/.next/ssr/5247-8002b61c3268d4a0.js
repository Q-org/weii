"use strict";exports.id=5247,exports.ids=[5247],exports.modules={45247:(e,t,s)=>{s.r(t),s.d(t,{fileTypeFromBuffer:()=>l.BI,fileTypeFromFile:()=>f,fileTypeFromStream:()=>l.Tm,fileTypeFromTokenizer:()=>l.mG,fileTypeStream:()=>l.xd,supportedExtensions:()=>l.x5,supportedMimeTypes:()=>l.K1});var i=s(51455);s(74880);var a=s(5186),r=s(35932);class n extends a.G{constructor(e,t){super(t),this.fileHandle=e}async readBuffer(e,t){let s=this.normalizeOptions(e,t);this.position=s.position;let i=await this.fileHandle.read(e,s.offset,s.length,s.position);if(this.position+=i.bytesRead,i.bytesRead<s.length&&(!t||!t.mayBeLess))throw new r.d1;return i.bytesRead}async peekBuffer(e,t){let s=this.normalizeOptions(e,t),i=await this.fileHandle.read(e,s.offset,s.length,s.position);if(!s.mayBeLess&&i.bytesRead<s.length)throw new r.d1;return i.bytesRead}async close(){return this.fileHandle.close()}}async function o(e){let t=await (0,i.open)(e,"r"),s=await t.stat();return new n(t,{path:e,size:s.size})}var l=s(32024);async function f(e){let t=await o(e);try{return await (0,l.mG)(t)}finally{await t.close()}}}};