(()=>{var e={};e.id=974,e.ids=[974],e.modules={846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},9551:e=>{"use strict";e.exports=require("url")},3163:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>m,tree:()=>d});var s=r(260),n=r(8203),a=r(5155),i=r.n(a),o=r(7292),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1377)),"/home/siddharth/Downloads/Programming/pptgen (1)/src/app/page.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,1354)),"/home/siddharth/Downloads/Programming/pptgen (1)/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,9116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,1485,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/siddharth/Downloads/Programming/pptgen (1)/src/app/page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4687:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,3219,23)),Promise.resolve().then(r.t.bind(r,4863,23)),Promise.resolve().then(r.t.bind(r,5155,23)),Promise.resolve().then(r.t.bind(r,802,23)),Promise.resolve().then(r.t.bind(r,9350,23)),Promise.resolve().then(r.t.bind(r,8530,23)),Promise.resolve().then(r.t.bind(r,8921,23))},4519:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,6959,23)),Promise.resolve().then(r.t.bind(r,3875,23)),Promise.resolve().then(r.t.bind(r,8903,23)),Promise.resolve().then(r.t.bind(r,7174,23)),Promise.resolve().then(r.t.bind(r,4178,23)),Promise.resolve().then(r.t.bind(r,7190,23)),Promise.resolve().then(r.t.bind(r,1365,23))},5019:()=>{},8163:()=>{},6360:(e,t,r)=>{Promise.resolve().then(r.bind(r,1377))},680:(e,t,r)=>{Promise.resolve().then(r.bind(r,29))},29:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(5512),n=r(8009),a=r(9334);function i(){let e=(0,n.useRef)(null),[t,r]=(0,n.useState)(""),[i,o]=(0,n.useState)(!1),[l,d]=(0,n.useState)(""),c=(0,a.useRouter)(),p=async e=>{let t=e.target.value;if(r(t),0===t.length){d("");return}try{let e=await fetch("/api/ticker",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({stockName:t})});if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);let r=await e.json();d(r.ticker)}catch(e){console.error("Error fetching ticker:",e),d("")}finally{o(!0)}};return(0,s.jsxs)("div",{className:"gradient-bg relative min-h-screen",children:[(0,s.jsxs)("div",{className:"absolute inset-0 flex flex-col items-center justify-between text-white z-10",children:[(0,s.jsx)("header",{className:"w-full bg-black bg-opacity-20 shadow-lg",children:(0,s.jsxs)("div",{className:"container mx-auto px-4 py-6 flex justify-between items-center",children:[(0,s.jsx)("h1",{className:"text-4xl font-bold tracking-tight",children:"StockGen"}),(0,s.jsx)("nav",{children:(0,s.jsxs)("ul",{className:"flex space-x-6",children:[(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-pink-400 transition-colors",children:"Home"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-pink-400 transition-colors",children:"About"})}),(0,s.jsx)("li",{children:(0,s.jsx)("a",{href:"#",className:"hover:text-pink-400 transition-colors",children:"Contact"})})]})})]})}),(0,s.jsxs)("main",{className:"flex flex-col items-center justify-center flex-grow w-full px-4",children:[(0,s.jsxs)("div",{className:"text-center",children:[(0,s.jsxs)("h2",{className:"text-5xl font-bold mb-6 leading-tight",children:["Generate Stock Presentations",(0,s.jsx)("br",{}),"with a Single Click"]}),(0,s.jsx)("p",{className:"text-xl mb-8 max-w-2xl mx-auto",children:"Enter a stock topic and let our AI create a professional presentation in seconds."})]}),(0,s.jsxs)("div",{className:"flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md",children:[(0,s.jsx)("input",{type:"text",onChange:p,value:t,className:"flex-grow p-3 text-black rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400",placeholder:"Enter stock topic"}),(0,s.jsx)("button",{className:`px-6 py-3  ${i?"bg-gradient-to-r  from-pink-500 to-purple-600":"bg-slate-600"} rounded-lg text-white font-semibold shadow-md hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300`,onClick:()=>{l&&c.push(`/pptDisplay/${l}`)},disabled:!i,children:"Generate PPT"})]})]}),(0,s.jsx)("footer",{className:"w-full bg-black bg-opacity-20 backdrop-blur-sm py-4",children:(0,s.jsx)("div",{className:"container mx-auto px-4 text-center text-sm",children:"\xa9 2025 pptX. All rights reserved."})})]}),(0,s.jsx)("div",{className:"g1"}),(0,s.jsx)("div",{className:"g2"}),(0,s.jsx)("div",{className:"g3"}),(0,s.jsx)("div",{className:"g4"}),(0,s.jsx)("div",{className:"g5"}),(0,s.jsx)("div",{id:"bubble",ref:e,className:"interactive"})]})}},1354:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var s=r(2740),n=r(2202),a=r.n(n),i=r(4988),o=r.n(i);r(1135);let l={title:"Create Next App",description:"Generated by create next app"};function d({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsx)("body",{className:`${a().variable} ${o().variable} antialiased`,children:e})})}},1377:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(6760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/siddharth/Downloads/Programming/pptgen (1)/src/app/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/siddharth/Downloads/Programming/pptgen (1)/src/app/page.tsx","default")},440:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(8077);let n=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},1135:()=>{}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,619,720],()=>r(3163));module.exports=s})();