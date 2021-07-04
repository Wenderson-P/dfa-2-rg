(this["webpackJsonpafd-2-rg"]=this["webpackJsonpafd-2-rg"]||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(3),r=a.n(n),c=a(8),s=a.n(c),i=(a(15),a(2)),u=a(10),l=(a(16),a(9)),o=a.n(l),j=a(4),d=a(1),h=function(e,t){var a,n=t.type,r=t.payload;switch(n){case"changeStateInput":var c=r.value,s=e.rows.length,u=Object(i.a)(e.rows),l=Object(i.a)(e.statesValues);if(c>s)for(;s<c;s++){var o=Array(e.columns.length).fill("");u.push(o),l.push("q"+(c-1))}else u=e.rows.filter((function(e,t){return t<=c-1})),l=l.filter((function(e,t){return t<=c-1}));return Object(d.a)(Object(d.a)({},e),{},{states:c,rows:u,statesValues:l});case"changeSymbolsInput":var h=r.value,b=e.columns.length,v=Object(i.a)(e.columns),f=Object(i.a)(e.rows);if(h>e[r.target]){for(;b<h;b++)v.push("");for(var m=0;m<e.states;m++)for(var p=0;p<h;p++)f[m][p]||(f[m][p]="")}else{for(var O=0;O<e.states;O++)for(var g=e.columns.length;g>=h;g--)f[O].splice(g,1);v=e.columns.filter((function(e,t){return t<=h-1}))}return Object(d.a)(Object(d.a)({},e),{},(a={},Object(j.a)(a,r.target,r.value),Object(j.a)(a,"columns",v),Object(j.a)(a,"rows",f),a));case"changeStateQuantity":var x=r.value,y=r.rowIndex,S=r.columnIndex;return Object(d.a)(Object(d.a)({},e),{},{rows:e.rows.map((function(e,t){return e.map((function(e,a){return t===y&&S===a?x:e}))}))});case"changeInitialState":return Object(d.a)(Object(d.a)({},e),{},{initialState:r});case"changeFinalState":var C=Object(i.a)(e.finalStates),w=C.findIndex((function(e){return e===r}));return w>=0?C.splice(w,1):C.push(r),Object(d.a)(Object(d.a)({},e),{},{finalStates:C});case"changeStateValue":return Object(d.a)(Object(d.a)({},e),{},{statesValues:e.statesValues.map((function(e,t){return t===r.index?r.value:e}))});case"changeSymbol":return Object(d.a)(Object(d.a)({},e),{},{columns:e.columns.map((function(e,t){return t===r.index?r.value:e}))});case"changeAutomato":return Object(d.a)(Object(d.a)({},e),{},{automato:r});case"changeGrammar":return Object(d.a)(Object(d.a)({},e),{},{grammar:r})}},b=a(0);var v=function(){var e=Object(n.useReducer)(h,{states:3,symbols:3,columns:["a","b","c"],rows:[["q0","q1",""],["q2","",""],["","q1",""]],statesValues:["q0","q1","q2"],initialState:0,finalStates:[1],automato:{},grammar:null}),t=Object(u.a)(e,2),a=t[0],r=t[1],c=function(e,t){e>=1&&r("states"===t?{type:"changeStateInput",payload:{value:e,target:t}}:{type:"changeSymbolsInput",payload:{value:e,target:t}})},s=function(){var e={};a.statesValues.forEach((function(t,n){var r=function(e){var t=Object(i.a)(a.rows[e]),n={};return{entradas:t.map((function(e,t){if(""!==e){var r=a.columns[t];return n[r]=e,r}})).filter((function(e){return void 0!==e})),transicoes:n}}(n),c=r.entradas,s=r.transicoes;e[t]={entradas:c,transicoes:s}})),r({type:"changeAutomato",payload:e});var t=a.statesValues[a.initialState],n=a.finalStates.map((function(e){return a.statesValues[e]})),c=o()(t,n,e);r({type:"changeGrammar",payload:c})},l=function(e){switch(console.log(e),e){case"variaveis":return"Vari\xe1veis:";case"terminais":return"Terminais:";case"producoes":return"Produ\xe7\xf5es:"}},j=function(e){var t=e.title,n=e.estaSelecionado,c=e.highlightClass,s=e.dispatchType;return Object(b.jsxs)("div",{className:"stateContainer",children:[Object(b.jsx)("label",{className:"",children:t}),Object(b.jsx)("div",{children:a.statesValues.map((function(e,t){return Object(b.jsx)("button",{type:"button",className:"states ".concat(n(t)?c:""),onClick:function(){return r({type:s,payload:t})},children:e})}))})]},t)},d=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return t?Object(b.jsxs)("div",{children:[Object(b.jsx)("h4",{children:l(e)}),a.grammar[e].map((function(e){return Object(b.jsx)("span",{children:e})}))]}):Object(b.jsxs)("div",{children:[Object(b.jsx)("h4",{children:"Vari\xe1vel inicial:"}),a.grammar[e]]})};return Object(b.jsxs)("div",{className:"app",children:[Object(b.jsx)("header",{children:Object(b.jsx)("h1",{children:"Conversor AFD para Gram\xe1tica Regular"})}),Object(b.jsxs)("div",{className:"options",children:[Object(b.jsxs)("div",{className:"quantitySelector",children:[Object(b.jsx)("label",{children:"Quantidade de estados:"}),Object(b.jsx)("input",{type:"number",value:a.states,onChange:function(e){return c(e.target.value,"states")}})]}),Object(b.jsxs)("div",{className:"quantitySelector",children:[Object(b.jsx)("label",{children:"Quantidade de s\xedmbolos:"}),Object(b.jsx)("input",{type:"number",value:a.symbols,onChange:function(e){return c(e.target.value,"symbols")}})]}),Object(b.jsx)(j,{title:"Qual o estado inicial?",estaSelecionado:function(e){return a.initialState===e},dispatchType:"changeInitialState",highlightClass:"initialState"}),Object(b.jsx)(j,{title:"Qual(is) o(s) estado(s) final(is)?",estaSelecionado:function(e){return a.finalStates.find((function(t){return e===t}))>=0},dispatchType:"changeFinalState",highlightClass:"finalState"})]}),Object(b.jsxs)("main",{children:[Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{children:Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{className:"no-bottom-border",children:" \u03b4"}),a.columns.map((function(e,t){return Object(b.jsx)("th",{children:Object(b.jsx)("input",{type:"text",value:e,onChange:function(e){return a=t,n=e.target.value,void r({type:"changeSymbol",payload:{index:a,value:n}});var a,n}})})}))]})}),Object(b.jsx)("tbody",{children:a.rows.map((function(e,t){return Object(b.jsxs)("tr",{children:[Object(b.jsx)("td",{className:"stateColumn",children:Object(b.jsx)("input",{type:"text",value:a.statesValues[t],onChange:function(e){return a=t,n=e.target.value,void r({type:"changeStateValue",payload:{index:a,value:n.trim()}});var a,n}})}),e.map((function(e,a){return Object(b.jsx)("td",{children:Object(b.jsx)("input",{type:"text",value:e,onChange:function(e){return function(e,t,a){r({type:"changeStateQuantity",payload:{value:e,rowIndex:t,columnIndex:a}})}(e.target.value.trim(),t,a)}})})}))]})}))})]}),Object(b.jsxs)("div",{className:"resultContainer",children:[Object(b.jsx)("button",{className:"convertButton",onClick:function(){return s()},children:"Converter para GR"}),a.grammar&&Object(b.jsxs)("div",{className:"resultContainer",children:[Object(b.jsx)("h3",{children:"Gram\xe1tica:"}),d("variaveis"),d("terminais"),d("producoes"),d("variavelInicial",!1)]})]})]})]})},f=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,19)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;a(e),n(e),r(e),c(e),s(e)}))};s.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root")),f()},9:function(e,t){e.exports=function(e,t,a){var n,r=[],c=[],s=[],i=["S","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R"],u=Object.keys(a);return Object.keys(a).forEach((function(e,t){if(!r.includes(e)){var n=i[t];a[u[t]].variavel=n,r.push(n)}})),Object.values(a).forEach((function(e){e.entradas.forEach((function(e){c.includes(e)||c.push(e)}))})),Object.values(a).forEach((function(e,n){var r=u[n];t.includes(r)&&s.push(a[r].variavel+" \u2192 \u03b5");var c=a[r].variavel;e.entradas.forEach((function(t){var n=e.transicoes[t],r=a[n].variavel;s.push("".concat(c," \u2192 ").concat(t+r))}))})),n=a[e].variavel,{variaveis:r,terminais:c,producoes:s,variavelInicial:n}}}},[[18,1,2]]]);
//# sourceMappingURL=main.90ab6d38.chunk.js.map