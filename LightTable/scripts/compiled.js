var m=void 0,s;
window.lightTable=function(E,F){function v(){var a=g.length,b=s.c,c,e=Math.ceil(a/b.length),h=0;if(a>b.length){c=n.querySelector(".lt-footer")||document.createDocumentFragment().appendChild(document.createElement("DIV"));c.className="lt-footer";for(c.innerHTML="Total: "+a+" | Pages: ";h<e;h++)c.innerHTML+='<a href="#'+h+'" >'+h+"</a> | ";c.onclick=function(a){a=a.target;"A"===a.tagName&&(b.start=parseInt(a.innerHTML),x(),t())};n.appendChild(c)}}function u(a,b){return RegExp("(?:^|\\s)"+b+"(?!\\S)").test(a.className)}
function y(a){for(var b=0;null!==(a=a.previousSibling);)++b;return b}function G(a){if("SPAN"===a.target.tagName&&u(a.target,"sort")){a=a.target;var b=a.parentNode.parentNode,c=u(a,"desc-sort")?"desc":"asc",e;if(s.c)e=parseInt(b.getAttribute("data-column-number")),g.sort(function(a,b){return z[c](a,b,s.b[e])}),x(),t();else{var h=n.querySelectorAll("tbody tr"),h=Array.prototype.slice.call(h,0),d=0,j=y(b)+1,f=parseInt(b.getAttribute("data-column-number")),b=h.length;for(h.sort(function(a,b){var e=a.querySelector("tr td:nth-of-type("+
j+")"),d=b.querySelector("tr td:nth-of-type("+j+")");return z[c](e.innerText||e.textContent,d.innerText||d.textContent,s.b[f])});d<b;)h[d].className=0===d%2?"oddrow":"evenrow",n.querySelector("tbody").appendChild(h[d++])}a.className="desc"===c?a.className.replace("desc-sort","asc-sort"):a.className.replace("asc-sort","desc-sort")}}function A(a){Array.isArray(a)||(a=[a]);var b=0,c=a.length,w=e.getElementsByTagName("TBODY")[0],h=s.b,d=w.querySelectorAll("tr").length,j,f,k,H=h.length;f=0;for(var p,l,
g;b<c;b++){j=a[b];f=d+b;r[r.length]=j;k=w.insertRow(-1);k.className+=0===f%2?"oddrow":"evenrow";k.setAttribute("data-index",f);for(f=0;f<H;)p=h[f++],!1!==p.visible&&(l=k.insertCell(-1),g=l.appendChild(document.createElement("DIV")),l.title=j[p.a],g.innerHTML=j[p.a])}}function B(){for(var a=[e.getElementsByTagName("COLGROUP")[0],e.getElementsByTagName("THEAD")[0].firstChild,e.getElementsByTagName("TBODY")[0],e.getElementsByTagName("TFOOT")[0]],b=a.length,c;b--;)if(c=a[b])for(;c.lastChild;)c.removeChild(c.lastChild)}
function x(){for(var a=e.getElementsByTagName("TBODY")[0];a.lastChild;)a.removeChild(a.lastChild)}function C(a,b,c){var e=b.appendChild(document.createElement("DIV"));e.innerHTML=a.name;b.setAttribute("data-column-number",c);s.d&&a.sort&&(b.setAttribute("data-column",a.name),b.setAttribute("data-sorting",a.sort),a=e.appendChild(document.createElement("span")),a.className="sort desc-sort",a.innerHTML="&nbsp")}function t(a){g=a||g;a=e.querySelector("tbody");a.onmouseover=function(a){a=a.target;a=("TD"===
a.tagName?a:a.parentNode).parentNode;a.setAttribute("row-color",a.style.backgroundColor);a.style.backgroundColor="#ffff66"};a.onmouseout=function(a){a=a.target;a=("TD"===a.tagName?a:a.parentNode).parentNode;a.style.backgroundColor=a.getAttribute("row-color")};a=s.c;var b;a&&a.length<g.length?(b=(a.start||0)*a.length,a=g.slice(b,b+a.length)):a=g;A(a)}var D=Object.create(null,{f:{value:function(a,b,c){return c?parseFloat(a)>=parseFloat(b):parseFloat(b)>=parseFloat(a)},enumerable:!0},g:{value:function(a,
b,c){return c?a>=b:b>=a},enumerable:!0}}),z=Object.create(null,{desc:{value:function(a,b,c){return D[c.type](a[c.a]||a,b[c.a]||b)},enumerable:!0},asc:{value:function(a,b,c){return D[c.type](a[c.a]||a,b[c.a]||b,!0)},enumerable:!0}}),I={draw:function(a){B();for(var b=e.getElementsByTagName("THEAD")[0].firstChild,c=s.b,g=c.length,h=0,d,j;h<g;h++)d=c[h],!1!==d.visible&&(j=b.appendChild(document.createElement("TH")),C(d,j,h));t(a);if(s.d&&(a=e.querySelector("thead")))a.onclick=G;s.e&&(e.querySelector("tbody").onclick=
function(a){if(u(e,"edit-state"))e.className=e.className.replace("edit-state","");else{e.className+=" edit-state";var b="TD"===a.target.tagName?a.target:a.target.parentNode,c=b.querySelector("div"),d=document.createElement("input");d.type="text";d.style.width=b.style.width;d.value=b.innerText||b.textContent;c.style.display="none";b.appendChild(d);d.onblur=function(){c.innerText=c.textContent=d.value;b.removeChild(d);c.style.display="block"};d.focus()}});s.c&&v()},clear:B,addRows:function(a){g.push(a);
var b=s.c;b&&b.length<g.length?v():A(a)},removeRows:function(a){for(var b=[],c=0,g=0;c<a.length;c++)b.push(e.querySelectorAll("tbody tr")[a[c]]);for(;g<b.length;g++)e.querySelector("tbody").removeChild(b[g])},setColumns:function(a){Array.isArray(a)||(a=[a]);for(var b=a.length,c=0,g=e.getElementsByTagName("THEAD")[0].firstChild,h=s.b,d,j,f,k;c<b;)if(d=a[c++],k=d.index,j=h[k],j.visible=d.visible){a:{d=k;f=e.querySelectorAll("th");for(var n=0,p=f.length,l=m,q=m;n<p;n++)if(l=f[n],q=l.getAttribute("data-column-number"),
q>d){f=l;break a}f=null}d=document.createElement("TH");f?g.insertBefore(d,f):g.appendChild(d);f=y(d);C(j,d,k);k=f;d=1;f=e.rows;n=f.length;for(q=l=p=p=l=m;d<n;d++)l=f[d],p=l.getAttribute("data-index"),p=r[p][j.a],l=l.insertCell(k),q=l.appendChild(document.createElement("DIV")),l.title=p,q.innerHTML=p}else{d=e.querySelector('[data-column-number="'+k+'"]');j=e.querySelectorAll("tr td:nth-of-type("+(k+1)+")");f=j.length;k=0;for(d.parentNode.removeChild(d);k<f;)j[k].parentNode.removeChild(j[k++])}},getData:function(){return r}},
n=E,e,r=[],g=[];s=F;e=n.getElementsByTagName("TABLE")[0];e||(e='<table class="ui-table"><colgroup></colgroup><caption></caption><thead><tr></tr></thead><tbody></tbody></table>',n.innerHTML=e,e=n.getElementsByTagName("TABLE")[0]);return I};