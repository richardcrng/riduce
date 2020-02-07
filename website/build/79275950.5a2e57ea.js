(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{164:function(e,t,a){"use strict";a.r(t),a.d(t,"frontMatter",(function(){return c})),a.d(t,"metadata",(function(){return l})),a.d(t,"rightToc",(function(){return i})),a.d(t,"default",(function(){return b}));var n=a(1),r=a(10),o=(a(0),a(185)),c={id:"do",title:"do",hide_title:!0,sidebar_label:"do"},l={id:"defaults/do",title:"do",description:"# `do(callback)`",source:"@site/../docs/defaults/do.md",permalink:"/docs/defaults/do",sidebar_label:"do",sidebar:"docs",previous:{title:"clear",permalink:"/docs/defaults/clear"},next:{title:"reset",permalink:"/docs/defaults/reset"}},i=[{value:"Parameters",id:"parameters",children:[]},{value:"Returns",id:"returns",children:[]},{value:"Example",id:"example",children:[{value:"Calling <code>create.do</code> on a leaf:",id:"calling-createdo-on-a-leaf",children:[]},{value:"Calling <code>create(actionType).do</code> on a leaf:",id:"calling-createactiontypedo-on-a-leaf",children:[]},{value:"Calling <code>create.do</code> on a branch:",id:"calling-createdo-on-a-branch",children:[]},{value:"Calling <code>create.do</code> with two arguments:",id:"calling-createdo-with-two-arguments",children:[]}]}],d={rightToc:i};function b(e){var t=e.components,a=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},d,a,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"docallback"},Object(o.b)("inlineCode",{parentName:"h1"},"do(callback)")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"create.do")),"\n",Object(o.b)("strong",{parentName:"p"},Object(o.b)("inlineCode",{parentName:"strong"},"create(actionType).do")),"\n",Object(o.b)("em",{parentName:"p"},"Appropriate leaf state: any")),Object(o.b)("p",null,"Returns an (action) object that the ",Object(o.b)("a",Object(n.a)({parentName:"p"},{href:"/docs/redux-leaves"}),"reduxLeaves")," reducer uses to non-mutatively update the leaf's state to the return value of ",Object(o.b)("inlineCode",{parentName:"p"},"callback(leafState, treeState)"),"."),Object(o.b)("p",null,Object(o.b)("em",{parentName:"p"},"Note: creating an action using ",Object(o.b)("inlineCode",{parentName:"em"},"do(callback)")," does not follow Redux's non-enforced recommendation that ",Object(o.b)("a",Object(n.a)({parentName:"em"},{href:"https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants"}),"actions should always be serializable"),", since the resultant action will have the function ",Object(o.b)("inlineCode",{parentName:"em"},"callback")," as its ",Object(o.b)("inlineCode",{parentName:"em"},"payload"),".")),Object(o.b)("h2",{id:"parameters"},"Parameters"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("inlineCode",{parentName:"li"},"callback")," ",Object(o.b)("em",{parentName:"li"},"(function)"),": invoked by the leaf's reducer with two arguments, ",Object(o.b)("inlineCode",{parentName:"li"},"leafState")," and ",Object(o.b)("inlineCode",{parentName:"li"},"entireState"))),Object(o.b)("h2",{id:"returns"},"Returns"),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"action")," ",Object(o.b)("em",{parentName:"p"},"(object)"),": an object to dispatch to the ",Object(o.b)("inlineCode",{parentName:"p"},"store")),Object(o.b)("h2",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"import { createStore } from 'redux'\nimport reduxLeaves from 'reduxLeaves'\n\nconst initialState = {\n  bool: false,\n  num: 2,\n  str: 'foo',\n  arr: [1, 2, 3]\n}\n\nconst [reducer, actions] = reduxLeaves(initialState)\nconst store = createStore(reducer)\n")),Object(o.b)("h3",{id:"calling-createdo-on-a-leaf"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create.do")," on a leaf:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const doToString = actions.str.create.do\nstore.dispatch(doToString(state => state.toUpperCase()))\nconsole.log(store.getState().str) // 'FOO'\n")),Object(o.b)("h3",{id:"calling-createactiontypedo-on-a-leaf"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create(actionType).do")," on a leaf:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const doToBoolean = actions.bool.create('APPLY_TO_BOOLEAN').do\nstore.dispatch(doToBoolean(state => !state))\nconsole.log(store.getState().bool) // true\n")),Object(o.b)("h3",{id:"calling-createdo-on-a-branch"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create.do")," on a branch:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const doToState = actions.create.do\nstore.dispatch(doToState(state => ({ num: state.num, arr: state.arr }))\nconsole.log(store.getState()) // { num: 2, arr: [1, 2, 3] }\n")),Object(o.b)("h3",{id:"calling-createdo-with-two-arguments"},"Calling ",Object(o.b)("inlineCode",{parentName:"h3"},"create.do")," with two arguments:"),Object(o.b)("pre",null,Object(o.b)("code",Object(n.a)({parentName:"pre"},{className:"language-js"}),"const doToArray = actions.arr.create.do\nstore.dispatch(doToArray(\n  (leafState, treeState) => leafState.map(element => element * treeState.num)\n))\nconsole.log(store.getState()) // { num: 2, arr: [2, 4, 6] }\n")))}b.isMDXComponent=!0},185:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return m}));var n=a(0),r=a.n(n);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var d=r.a.createContext({}),b=function(e){var t=r.a.useContext(d),a=t;return e&&(a="function"==typeof e?e(t):l({},t,{},e)),a},s=function(e){var t=b(e.components);return r.a.createElement(d.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=Object(n.forwardRef)((function(e,t){var a=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),s=b(a),u=n,m=s["".concat(c,".").concat(u)]||s[u]||p[u]||o;return a?r.a.createElement(m,l({ref:t},d,{components:a})):r.a.createElement(m,l({ref:t},d))}));function m(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=a.length,c=new Array(o);c[0]=u;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:n,c[1]=l;for(var d=2;d<o;d++)c[d]=a[d];return r.a.createElement.apply(null,c)}return r.a.createElement.apply(null,a)}u.displayName="MDXCreateElement"}}]);