(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{148:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n(1),a=n(10),o=(n(0),n(185)),c={id:"reset",title:"reset",hide_title:!0,sidebar_label:"reset"},l={id:"defaults/reset",title:"reset",description:"# `reset()`",source:"@site/../docs/defaults/reset.md",permalink:"/docs/defaults/reset",sidebar_label:"reset",sidebar:"docs",previous:{title:"do",permalink:"/docs/defaults/do"},next:{title:"update",permalink:"/docs/defaults/update"}},i=[{value:"Returns",id:"returns",children:[]},{value:"Example",id:"example",children:[{value:"Calling <code>create.reset</code> on a leaf:",id:"calling-createreset-on-a-leaf",children:[]},{value:"Calling <code>create(actionType).reset</code> on a leaf:",id:"calling-createactiontypereset-on-a-leaf",children:[]},{value:"Calling <code>create.reset</code> on a branch:",id:"calling-createreset-on-a-branch",children:[]}]}],s={rightToc:i};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"reset"},Object(o.b)("inlineCode",{parentName:"h1"},"reset()")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"create.reset")),"\n",Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"create(actionType).reset")),"\n",Object(o.b)("em",{parentName:"p"},"Appropriate leaf state: any")),Object(o.b)("p",null,"Returns an (action) object that the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/redux-leaves"}),"reduxLeaves")," reducer uses to non-mutatively reset the leaf's state to its initial state as passed into ",Object(o.b)("inlineCode",{parentName:"p"},"reduxLeaves"),"."),Object(o.b)("h2",{id:"returns"},"Returns"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"action")," ",Object(o.b)("em",{parentName:"p"},"(object)"),": an object to dispatch to the store"),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"import { createStore } from 'redux'\nimport reduxLeaves from 'reduxLeaves'\n\nconst initialState = {\n  num: 2,\n  arr: [1, 2, 3],\n  bool: true\n}\n\nconst otherState = {\n  num: 11,\n  arr: ['a', 'b', 'c'],\n  bool: false\n}\n\nconst [reducer, actions] = reduxLeaves(initialState)\nconst store = createStore(reducer, otherState)        // preloads otherState\n\n/* store.getState()\n* {\n*   num: 11,\n*   arr: ['a', 'b', 'c']\n* }\n*/\n\n")),Object(o.b)("h3",{id:"calling-createreset-on-a-leaf"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create.reset")," on a leaf:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const resetNum = actions.num.create.reset\nstore.dispatch(resetNum())\nconsole.log(store.getState().num) // 2\n")),Object(o.b)("h3",{id:"calling-createactiontypereset-on-a-leaf"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create(actionType).reset")," on a leaf:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const resetBool = actions.bool.create.reset\nstore.dispatch(resetBool())\nconsole.log(store.getState().bool) // true\n")),Object(o.b)("h3",{id:"calling-createreset-on-a-branch"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create.reset")," on a branch:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"const resetState = actions.create.reset\nstore.dispatch(resetState())\nconsole.log(store.getState()) // { num: 2, arr: [1, 2, 3], bool: true }\n")))}p.isMDXComponent=!0},185:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l({},t,{},e)),n},b=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),b=p(n),d=r,m=b["".concat(c,".").concat(d)]||b[d]||u[d]||o;return n?a.a.createElement(m,l({ref:t},s,{components:n})):a.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,c=new Array(o);c[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,c[1]=l;for(var s=2;s<o;s++)c[s]=n[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);