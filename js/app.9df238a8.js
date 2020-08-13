(function(e){function t(t){for(var a,n,o=t[0],i=t[1],u=t[2],f=0,l=[];f<o.length;f++)n=o[f],Object.prototype.hasOwnProperty.call(r,n)&&r[n]&&l.push(r[n][0]),r[n]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(l.length)l.shift()();return c.push.apply(c,u||[]),s()}function s(){for(var e,t=0;t<c.length;t++){for(var s=c[t],a=!0,n=1;n<s.length;n++){var o=s[n];0!==r[o]&&(a=!1)}a&&(c.splice(t--,1),e=i(i.s=s[0]))}return e}var a={},n={app:0},r={app:0},c=[];function o(e){return i.p+"js/"+({game:"game"}[e]||e)+"."+{game:"57d3509f"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var s=a[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.e=function(e){var t=[],s={game:1};n[e]?t.push(n[e]):0!==n[e]&&s[e]&&t.push(n[e]=new Promise((function(t,s){for(var a="css/"+({game:"game"}[e]||e)+"."+{game:"3794d95c"}[e]+".css",r=i.p+a,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var u=c[o],f=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(f===a||f===r))return t()}var l=document.getElementsByTagName("style");for(o=0;o<l.length;o++){u=l[o],f=u.getAttribute("data-href");if(f===a||f===r)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var a=t&&t.target&&t.target.src||r,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=a,delete n[e],d.parentNode.removeChild(d),s(c)},d.href=r;var b=document.getElementsByTagName("head")[0];b.appendChild(d)})).then((function(){n[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise((function(t,s){a=r[e]=[t,s]}));t.push(a[2]=c);var u,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=o(e);var l=new Error;u=function(t){f.onerror=f.onload=null,clearTimeout(d);var s=r[e];if(0!==s){if(s){var a=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+a+": "+n+")",l.name="ChunkLoadError",l.type=a,l.request=n,s[1](l)}r[e]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:f})}),12e4);f.onerror=f.onload=u,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(s,a,function(t){return e[t]}.bind(null,a));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/Blackjack/",i.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],f=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=f;c.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("56d7")},"2c5b":function(e,t,s){},"374f":function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"rounded board-wrapper shadow-sm container position-relative"},[s("div",{staticClass:"board-bg w-100 h-100"}),s("div",{staticClass:"board-content text-white h-100 w-100 position-absolute"},[e._t("default")],2)])},n=[],r={name:"BoardWrapper"},c=r,o=(s("8d26"),s("2877")),i=Object(o["a"])(c,a,n,!1,null,"3ecb03bb",null);t["a"]=i.exports},"45d0":function(e,t,s){},4678:function(e,t,s){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(e){var t=r(e);return s(t)}function r(e){if(!s.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}n.keys=function(){return Object.keys(a)},n.resolve=r,e.exports=n,n.id="4678"},"56d7":function(e,t,s){"use strict";s.r(t),s.d(t,"bus",(function(){return I}));s("4de4"),s("4160"),s("159b"),s("e260"),s("e6cf"),s("cca6"),s("a79d");var a=s("2b0e"),n=s("5f5b"),r=s("b1e0"),c=s("c1df"),o=s.n(c);function i(e){return o()(e).format("YYYY/MM/DD - HH:mm")}var u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},f=[],l=(s("5c0b"),s("2877")),d={},b=Object(l["a"])(d,u,f,!1,null,null,null),j=b.exports,m=(s("d3b7"),s("8c4f")),h=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("BoardWrapper",[a("div",{staticClass:"home h-100 d-flex align-items-center justify-content-center"},[a("img",{staticClass:"mb-5 w-25 d-block",attrs:{src:s("cf05"),alg:"logo"}}),a("a",{staticClass:"button d-block mb-5",attrs:{href:"#"},on:{click:e.launchGame}},[a("b-icon-play-fill"),e._v(" Play ")],1),e.atLeastOneHighscore?a("Highscores"):e._e()],1)])},p=[],g=s("374f"),v=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"highscores w-50 mt-5 text-white p-3"},[s("h3",[e._v("Highscores")]),s("hr"),e._l(e.highscores,(function(t,a){return s("b-row",{key:a,staticClass:"justify-content-between"},[s("b-col",{attrs:{cols:"auto"}},[e._v(" "+e._s(e._f("momentFilter")(t.date))+" ")]),s("b-col",{attrs:{cols:"auto"}},[s("b",[e._v("$ "+e._s(t.score))])])],1)}))],2)},k=[],y={name:"Highscores",computed:{highscores:function(){return this.$store.state.highscores}}},w=y,_=(s("b72a"),Object(l["a"])(w,v,k,!1,null,"55ebd258",null)),O=_.exports,z={name:"Home",computed:{atLeastOneHighscore:function(){return this.$store.state.highscores.length>0}},methods:{launchGame:function(){this.$router.push({name:"Game"})}},components:{BoardWrapper:g["a"],Highscores:O}},E=z,C=(s("57ac"),Object(l["a"])(E,h,p,!1,null,"684d93cc",null)),x=C.exports;a["default"].use(m["a"]);var S=[{path:"/",name:"Home",component:x},{path:"/game",name:"Game",component:function(){return s.e("game").then(s.bind(null,"7d36"))}}],H=new m["a"]({routes:S}),F=H,$=(s("99af"),s("cb29"),s("0481"),s("d81d"),s("fb6a"),s("4069"),s("2909")),A=s("2f62"),P={namespaced:!0,state:{tokens:[{value:1,variant:"light",border:"info"},{value:5,variant:"red"},{value:25,variant:"green"},{value:50,variant:"blue"},{value:100,variant:"dark"},{value:500,variant:"purple"},{value:1e3,variant:"gold"}],colors:{light:"#FFFFFF",red:"#AE0F28",green:"#00A333",blue:"#6D7C8A",dark:"#17232E",purple:"#75498F",gold:"#E6AE03"}},getters:{all:function(e){return e.tokens},token:function(e){return function(t){return e.tokens.filter((function(e){return e.value===t})).pop()}},tokenColor:function(e){return function(t){return e.colors[t]}}}};a["default"].use(A["a"]);var T=new A["a"].Store({state:{delays:{betweenTurns:2e3,dealCardWait:500},highscores:[],nbHighscoresKept:5,deck:[]},modules:{tokens:P},mutations:{initialiseStore:function(e){var t=localStorage.getItem("store");if(t)console.log("Initializing store from local storage"),this.replaceState(Object.assign(e,JSON.parse(localStorage.getItem("store"))));else{console.log("filling deck for the first time");var s=["clubs","diamonds","hearts","spades"],a=["jack","queen","king","ace"],n=[];s.forEach((function(e){var t=2;n.push(Object($["a"])(Array(9)).fill(null).map((function(){return{value:t,image:"".concat(t++,"_of_").concat(e,".png")}})).concat(a.map((function(t){return{value:"ace"===t?t:10,image:"".concat(t,"_of_").concat(e,".png")}}))))})),e.deck=n.flat()}},saveHighscore:function(e,t){var s=e.highscores.slice();s.push({date:new Date,score:t}),s.sort((function(e,t){return parseInt(t.score)-parseInt(e.score)})),s.length>e.nbHighscoresKept&&s.pop(),e.highscores=s}}});s("f9e3"),s("2dd8");a["default"].config.productionTip=!1,a["default"].use(n["a"]),a["default"].use(r["a"]),a["default"].filter("momentFilter",i);var I=new a["default"];new a["default"]({router:F,store:T,render:function(e){return e(j)},beforeCreate:function(){this.$store.commit("initialiseStore"),this.$store.subscribe((function(e,t){console.log("saving store in localstorage"),localStorage.setItem("store",JSON.stringify(t))})),this.$store.state.deck.forEach((function(e){var t=new Image;t.src="images/cards/".concat(e.image)}));var e=new Image;e.src="images/cards/back.png"}}).$mount("#app")},"57ac":function(e,t,s){"use strict";var a=s("45d0"),n=s.n(a);n.a},"5c0b":function(e,t,s){"use strict";var a=s("9c0c"),n=s.n(a);n.a},"8d26":function(e,t,s){"use strict";var a=s("df5d"),n=s.n(a);n.a},"9c0c":function(e,t,s){},b72a:function(e,t,s){"use strict";var a=s("2c5b"),n=s.n(a);n.a},cf05:function(e,t,s){e.exports=s.p+"img/logo.45d6387b.png"},df5d:function(e,t,s){}});
//# sourceMappingURL=app.9df238a8.js.map