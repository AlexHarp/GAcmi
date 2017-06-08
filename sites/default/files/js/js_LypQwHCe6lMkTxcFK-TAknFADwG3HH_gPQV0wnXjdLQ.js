/*!
 * jQuery Once v2.1.1 - http://github.com/robloach/jquery-once
 * @license MIT, GPL-2.0
 *   http://opensource.org/licenses/MIT
 *   http://opensource.org/licenses/GPL-2.0
 */
(function(e){"use strict";if(typeof exports==="object"){e(require("jquery"))}else if(typeof define==="function"&&define.amd){define(["jquery"],e)}else{e(jQuery)}})(function(e){"use strict";var n=function(e){e=e||"once";if(typeof e!=="string"){throw new Error("The jQuery Once id parameter must be a string")}return e};e.fn.once=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)!==true}).data(r,true)};e.fn.removeOnce=function(e){return this.findOnce(e).removeData("jquery-once-"+n(e))};e.fn.findOnce=function(t){var r="jquery-once-"+n(t);return this.filter(function(){return e(this).data(r)===true})}});

(function(t){var e=typeof self=="object"&&self.self==self&&self||typeof global=="object"&&global.global==global&&global;if(typeof define==="function"&&define.amd){define(["underscore","jquery","exports"],function(i,r,n){e.Backbone=t(e,n,i,r)})}else if(typeof exports!=="undefined"){var i=require("underscore"),r;try{r=require("jquery")}catch(n){}t(e,exports,i,r)}else{e.Backbone=t(e,{},e._,e.jQuery||e.Zepto||e.ender||e.$)}})(function(t,e,i,r){var n=t.Backbone;var s=Array.prototype.slice;e.VERSION="1.2.3";e.$=r;e.noConflict=function(){t.Backbone=n;return this};e.emulateHTTP=false;e.emulateJSON=false;var a=function(t,e,r){switch(t){case 1:return function(){return i[e](this[r])};case 2:return function(t){return i[e](this[r],t)};case 3:return function(t,n){return i[e](this[r],h(t,this),n)};case 4:return function(t,n,s){return i[e](this[r],h(t,this),n,s)};default:return function(){var t=s.call(arguments);t.unshift(this[r]);return i[e].apply(i,t)}}};var o=function(t,e,r){i.each(e,function(e,n){if(i[n])t.prototype[n]=a(e,n,r)})};var h=function(t,e){if(i.isFunction(t))return t;if(i.isObject(t)&&!e._isModel(t))return u(t);if(i.isString(t))return function(e){return e.get(t)};return t};var u=function(t){var e=i.matches(t);return function(t){return e(t.attributes)}};var l=e.Events={};var c=/\s+/;var f=function(t,e,r,n,s){var a=0,o;if(r&&typeof r==="object"){if(n!==void 0&&"context"in s&&s.context===void 0)s.context=n;for(o=i.keys(r);a<o.length;a++){e=f(t,e,o[a],r[o[a]],s)}}else if(r&&c.test(r)){for(o=r.split(c);a<o.length;a++){e=t(e,o[a],n,s)}}else{e=t(e,r,n,s)}return e};l.on=function(t,e,i){return d(this,t,e,i)};var d=function(t,e,i,r,n){t._events=f(v,t._events||{},e,i,{context:r,ctx:t,listening:n});if(n){var s=t._listeners||(t._listeners={});s[n.id]=n}return t};l.listenTo=function(t,e,r){if(!t)return this;var n=t._listenId||(t._listenId=i.uniqueId("l"));var s=this._listeningTo||(this._listeningTo={});var a=s[n];if(!a){var o=this._listenId||(this._listenId=i.uniqueId("l"));a=s[n]={obj:t,objId:n,id:o,listeningTo:s,count:0}}d(t,e,r,this,a);return this};var v=function(t,e,i,r){if(i){var n=t[e]||(t[e]=[]);var s=r.context,a=r.ctx,o=r.listening;if(o)o.count++;n.push({callback:i,context:s,ctx:s||a,listening:o})}return t};l.off=function(t,e,i){if(!this._events)return this;this._events=f(g,this._events,t,e,{context:i,listeners:this._listeners});return this};l.stopListening=function(t,e,r){var n=this._listeningTo;if(!n)return this;var s=t?[t._listenId]:i.keys(n);for(var a=0;a<s.length;a++){var o=n[s[a]];if(!o)break;o.obj.off(e,r,this)}if(i.isEmpty(n))this._listeningTo=void 0;return this};var g=function(t,e,r,n){if(!t)return;var s=0,a;var o=n.context,h=n.listeners;if(!e&&!r&&!o){var u=i.keys(h);for(;s<u.length;s++){a=h[u[s]];delete h[a.id];delete a.listeningTo[a.objId]}return}var l=e?[e]:i.keys(t);for(;s<l.length;s++){e=l[s];var c=t[e];if(!c)break;var f=[];for(var d=0;d<c.length;d++){var v=c[d];if(r&&r!==v.callback&&r!==v.callback._callback||o&&o!==v.context){f.push(v)}else{a=v.listening;if(a&&--a.count===0){delete h[a.id];delete a.listeningTo[a.objId]}}}if(f.length){t[e]=f}else{delete t[e]}}if(i.size(t))return t};l.once=function(t,e,r){var n=f(p,{},t,e,i.bind(this.off,this));return this.on(n,void 0,r)};l.listenToOnce=function(t,e,r){var n=f(p,{},e,r,i.bind(this.stopListening,this,t));return this.listenTo(t,n)};var p=function(t,e,r,n){if(r){var s=t[e]=i.once(function(){n(e,s);r.apply(this,arguments)});s._callback=r}return t};l.trigger=function(t){if(!this._events)return this;var e=Math.max(0,arguments.length-1);var i=Array(e);for(var r=0;r<e;r++)i[r]=arguments[r+1];f(m,this._events,t,void 0,i);return this};var m=function(t,e,i,r){if(t){var n=t[e];var s=t.all;if(n&&s)s=s.slice();if(n)_(n,r);if(s)_(s,[e].concat(r))}return t};var _=function(t,e){var i,r=-1,n=t.length,s=e[0],a=e[1],o=e[2];switch(e.length){case 0:while(++r<n)(i=t[r]).callback.call(i.ctx);return;case 1:while(++r<n)(i=t[r]).callback.call(i.ctx,s);return;case 2:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a);return;case 3:while(++r<n)(i=t[r]).callback.call(i.ctx,s,a,o);return;default:while(++r<n)(i=t[r]).callback.apply(i.ctx,e);return}};l.bind=l.on;l.unbind=l.off;i.extend(e,l);var y=e.Model=function(t,e){var r=t||{};e||(e={});this.cid=i.uniqueId(this.cidPrefix);this.attributes={};if(e.collection)this.collection=e.collection;if(e.parse)r=this.parse(r,e)||{};r=i.defaults({},r,i.result(this,"defaults"));this.set(r,e);this.changed={};this.initialize.apply(this,arguments)};i.extend(y.prototype,l,{changed:null,validationError:null,idAttribute:"id",cidPrefix:"c",initialize:function(){},toJSON:function(t){return i.clone(this.attributes)},sync:function(){return e.sync.apply(this,arguments)},get:function(t){return this.attributes[t]},escape:function(t){return i.escape(this.get(t))},has:function(t){return this.get(t)!=null},matches:function(t){return!!i.iteratee(t,this)(this.attributes)},set:function(t,e,r){if(t==null)return this;var n;if(typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r||(r={});if(!this._validate(n,r))return false;var s=r.unset;var a=r.silent;var o=[];var h=this._changing;this._changing=true;if(!h){this._previousAttributes=i.clone(this.attributes);this.changed={}}var u=this.attributes;var l=this.changed;var c=this._previousAttributes;for(var f in n){e=n[f];if(!i.isEqual(u[f],e))o.push(f);if(!i.isEqual(c[f],e)){l[f]=e}else{delete l[f]}s?delete u[f]:u[f]=e}this.id=this.get(this.idAttribute);if(!a){if(o.length)this._pending=r;for(var d=0;d<o.length;d++){this.trigger("change:"+o[d],this,u[o[d]],r)}}if(h)return this;if(!a){while(this._pending){r=this._pending;this._pending=false;this.trigger("change",this,r)}}this._pending=false;this._changing=false;return this},unset:function(t,e){return this.set(t,void 0,i.extend({},e,{unset:true}))},clear:function(t){var e={};for(var r in this.attributes)e[r]=void 0;return this.set(e,i.extend({},t,{unset:true}))},hasChanged:function(t){if(t==null)return!i.isEmpty(this.changed);return i.has(this.changed,t)},changedAttributes:function(t){if(!t)return this.hasChanged()?i.clone(this.changed):false;var e=this._changing?this._previousAttributes:this.attributes;var r={};for(var n in t){var s=t[n];if(i.isEqual(e[n],s))continue;r[n]=s}return i.size(r)?r:false},previous:function(t){if(t==null||!this._previousAttributes)return null;return this._previousAttributes[t]},previousAttributes:function(){return i.clone(this._previousAttributes)},fetch:function(t){t=i.extend({parse:true},t);var e=this;var r=t.success;t.success=function(i){var n=t.parse?e.parse(i,t):i;if(!e.set(n,t))return false;if(r)r.call(t.context,e,i,t);e.trigger("sync",e,i,t)};z(this,t);return this.sync("read",this,t)},save:function(t,e,r){var n;if(t==null||typeof t==="object"){n=t;r=e}else{(n={})[t]=e}r=i.extend({validate:true,parse:true},r);var s=r.wait;if(n&&!s){if(!this.set(n,r))return false}else{if(!this._validate(n,r))return false}var a=this;var o=r.success;var h=this.attributes;r.success=function(t){a.attributes=h;var e=r.parse?a.parse(t,r):t;if(s)e=i.extend({},n,e);if(e&&!a.set(e,r))return false;if(o)o.call(r.context,a,t,r);a.trigger("sync",a,t,r)};z(this,r);if(n&&s)this.attributes=i.extend({},h,n);var u=this.isNew()?"create":r.patch?"patch":"update";if(u==="patch"&&!r.attrs)r.attrs=n;var l=this.sync(u,this,r);this.attributes=h;return l},destroy:function(t){t=t?i.clone(t):{};var e=this;var r=t.success;var n=t.wait;var s=function(){e.stopListening();e.trigger("destroy",e,e.collection,t)};t.success=function(i){if(n)s();if(r)r.call(t.context,e,i,t);if(!e.isNew())e.trigger("sync",e,i,t)};var a=false;if(this.isNew()){i.defer(t.success)}else{z(this,t);a=this.sync("delete",this,t)}if(!n)s();return a},url:function(){var t=i.result(this,"urlRoot")||i.result(this.collection,"url")||F();if(this.isNew())return t;var e=this.get(this.idAttribute);return t.replace(/[^\/]$/,"$&/")+encodeURIComponent(e)},parse:function(t,e){return t},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(t){return this._validate({},i.defaults({validate:true},t))},_validate:function(t,e){if(!e.validate||!this.validate)return true;t=i.extend({},this.attributes,t);var r=this.validationError=this.validate(t,e)||null;if(!r)return true;this.trigger("invalid",this,r,i.extend(e,{validationError:r}));return false}});var b={keys:1,values:1,pairs:1,invert:1,pick:0,omit:0,chain:1,isEmpty:1};o(y,b,"attributes");var x=e.Collection=function(t,e){e||(e={});if(e.model)this.model=e.model;if(e.comparator!==void 0)this.comparator=e.comparator;this._reset();this.initialize.apply(this,arguments);if(t)this.reset(t,i.extend({silent:true},e))};var w={add:true,remove:true,merge:true};var E={add:true,remove:false};var k=function(t,e,i){i=Math.min(Math.max(i,0),t.length);var r=Array(t.length-i);var n=e.length;for(var s=0;s<r.length;s++)r[s]=t[s+i];for(s=0;s<n;s++)t[s+i]=e[s];for(s=0;s<r.length;s++)t[s+n+i]=r[s]};i.extend(x.prototype,l,{model:y,initialize:function(){},toJSON:function(t){return this.map(function(e){return e.toJSON(t)})},sync:function(){return e.sync.apply(this,arguments)},add:function(t,e){return this.set(t,i.extend({merge:false},e,E))},remove:function(t,e){e=i.extend({},e);var r=!i.isArray(t);t=r?[t]:i.clone(t);var n=this._removeModels(t,e);if(!e.silent&&n)this.trigger("update",this,e);return r?n[0]:n},set:function(t,e){if(t==null)return;e=i.defaults({},e,w);if(e.parse&&!this._isModel(t))t=this.parse(t,e);var r=!i.isArray(t);t=r?[t]:t.slice();var n=e.at;if(n!=null)n=+n;if(n<0)n+=this.length+1;var s=[];var a=[];var o=[];var h={};var u=e.add;var l=e.merge;var c=e.remove;var f=false;var d=this.comparator&&n==null&&e.sort!==false;var v=i.isString(this.comparator)?this.comparator:null;var g;for(var p=0;p<t.length;p++){g=t[p];var m=this.get(g);if(m){if(l&&g!==m){var _=this._isModel(g)?g.attributes:g;if(e.parse)_=m.parse(_,e);m.set(_,e);if(d&&!f)f=m.hasChanged(v)}if(!h[m.cid]){h[m.cid]=true;s.push(m)}t[p]=m}else if(u){g=t[p]=this._prepareModel(g,e);if(g){a.push(g);this._addReference(g,e);h[g.cid]=true;s.push(g)}}}if(c){for(p=0;p<this.length;p++){g=this.models[p];if(!h[g.cid])o.push(g)}if(o.length)this._removeModels(o,e)}var y=false;var b=!d&&u&&c;if(s.length&&b){y=this.length!=s.length||i.some(this.models,function(t,e){return t!==s[e]});this.models.length=0;k(this.models,s,0);this.length=this.models.length}else if(a.length){if(d)f=true;k(this.models,a,n==null?this.length:n);this.length=this.models.length}if(f)this.sort({silent:true});if(!e.silent){for(p=0;p<a.length;p++){if(n!=null)e.index=n+p;g=a[p];g.trigger("add",g,this,e)}if(f||y)this.trigger("sort",this,e);if(a.length||o.length)this.trigger("update",this,e)}return r?t[0]:t},reset:function(t,e){e=e?i.clone(e):{};for(var r=0;r<this.models.length;r++){this._removeReference(this.models[r],e)}e.previousModels=this.models;this._reset();t=this.add(t,i.extend({silent:true},e));if(!e.silent)this.trigger("reset",this,e);return t},push:function(t,e){return this.add(t,i.extend({at:this.length},e))},pop:function(t){var e=this.at(this.length-1);return this.remove(e,t)},unshift:function(t,e){return this.add(t,i.extend({at:0},e))},shift:function(t){var e=this.at(0);return this.remove(e,t)},slice:function(){return s.apply(this.models,arguments)},get:function(t){if(t==null)return void 0;var e=this.modelId(this._isModel(t)?t.attributes:t);return this._byId[t]||this._byId[e]||this._byId[t.cid]},at:function(t){if(t<0)t+=this.length;return this.models[t]},where:function(t,e){return this[e?"find":"filter"](t)},findWhere:function(t){return this.where(t,true)},sort:function(t){var e=this.comparator;if(!e)throw new Error("Cannot sort a set without a comparator");t||(t={});var r=e.length;if(i.isFunction(e))e=i.bind(e,this);if(r===1||i.isString(e)){this.models=this.sortBy(e)}else{this.models.sort(e)}if(!t.silent)this.trigger("sort",this,t);return this},pluck:function(t){return i.invoke(this.models,"get",t)},fetch:function(t){t=i.extend({parse:true},t);var e=t.success;var r=this;t.success=function(i){var n=t.reset?"reset":"set";r[n](i,t);if(e)e.call(t.context,r,i,t);r.trigger("sync",r,i,t)};z(this,t);return this.sync("read",this,t)},create:function(t,e){e=e?i.clone(e):{};var r=e.wait;t=this._prepareModel(t,e);if(!t)return false;if(!r)this.add(t,e);var n=this;var s=e.success;e.success=function(t,e,i){if(r)n.add(t,i);if(s)s.call(i.context,t,e,i)};t.save(null,e);return t},parse:function(t,e){return t},clone:function(){return new this.constructor(this.models,{model:this.model,comparator:this.comparator})},modelId:function(t){return t[this.model.prototype.idAttribute||"id"]},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(t,e){if(this._isModel(t)){if(!t.collection)t.collection=this;return t}e=e?i.clone(e):{};e.collection=this;var r=new this.model(t,e);if(!r.validationError)return r;this.trigger("invalid",this,r.validationError,e);return false},_removeModels:function(t,e){var i=[];for(var r=0;r<t.length;r++){var n=this.get(t[r]);if(!n)continue;var s=this.indexOf(n);this.models.splice(s,1);this.length--;if(!e.silent){e.index=s;n.trigger("remove",n,this,e)}i.push(n);this._removeReference(n,e)}return i.length?i:false},_isModel:function(t){return t instanceof y},_addReference:function(t,e){this._byId[t.cid]=t;var i=this.modelId(t.attributes);if(i!=null)this._byId[i]=t;t.on("all",this._onModelEvent,this)},_removeReference:function(t,e){delete this._byId[t.cid];var i=this.modelId(t.attributes);if(i!=null)delete this._byId[i];if(this===t.collection)delete t.collection;t.off("all",this._onModelEvent,this)},_onModelEvent:function(t,e,i,r){if((t==="add"||t==="remove")&&i!==this)return;if(t==="destroy")this.remove(e,r);if(t==="change"){var n=this.modelId(e.previousAttributes());var s=this.modelId(e.attributes);if(n!==s){if(n!=null)delete this._byId[n];if(s!=null)this._byId[s]=e}}this.trigger.apply(this,arguments)}});var S={forEach:3,each:3,map:3,collect:3,reduce:4,foldl:4,inject:4,reduceRight:4,foldr:4,find:3,detect:3,filter:3,select:3,reject:3,every:3,all:3,some:3,any:3,include:3,includes:3,contains:3,invoke:0,max:3,min:3,toArray:1,size:1,first:3,head:3,take:3,initial:3,rest:3,tail:3,drop:3,last:3,without:0,difference:0,indexOf:3,shuffle:1,lastIndexOf:3,isEmpty:1,chain:1,sample:3,partition:3,groupBy:3,countBy:3,sortBy:3,indexBy:3};o(x,S,"models");var I=e.View=function(t){this.cid=i.uniqueId("view");i.extend(this,i.pick(t,P));this._ensureElement();this.initialize.apply(this,arguments)};var T=/^(\S+)\s*(.*)$/;var P=["model","collection","el","id","attributes","className","tagName","events"];i.extend(I.prototype,l,{tagName:"div",$:function(t){return this.$el.find(t)},initialize:function(){},render:function(){return this},remove:function(){this._removeElement();this.stopListening();return this},_removeElement:function(){this.$el.remove()},setElement:function(t){this.undelegateEvents();this._setElement(t);this.delegateEvents();return this},_setElement:function(t){this.$el=t instanceof e.$?t:e.$(t);this.el=this.$el[0]},delegateEvents:function(t){t||(t=i.result(this,"events"));if(!t)return this;this.undelegateEvents();for(var e in t){var r=t[e];if(!i.isFunction(r))r=this[r];if(!r)continue;var n=e.match(T);this.delegate(n[1],n[2],i.bind(r,this))}return this},delegate:function(t,e,i){this.$el.on(t+".delegateEvents"+this.cid,e,i);return this},undelegateEvents:function(){if(this.$el)this.$el.off(".delegateEvents"+this.cid);return this},undelegate:function(t,e,i){this.$el.off(t+".delegateEvents"+this.cid,e,i);return this},_createElement:function(t){return document.createElement(t)},_ensureElement:function(){if(!this.el){var t=i.extend({},i.result(this,"attributes"));if(this.id)t.id=i.result(this,"id");if(this.className)t["class"]=i.result(this,"className");this.setElement(this._createElement(i.result(this,"tagName")));this._setAttributes(t)}else{this.setElement(i.result(this,"el"))}},_setAttributes:function(t){this.$el.attr(t)}});e.sync=function(t,r,n){var s=H[t];i.defaults(n||(n={}),{emulateHTTP:e.emulateHTTP,emulateJSON:e.emulateJSON});var a={type:s,dataType:"json"};if(!n.url){a.url=i.result(r,"url")||F()}if(n.data==null&&r&&(t==="create"||t==="update"||t==="patch")){a.contentType="application/json";a.data=JSON.stringify(n.attrs||r.toJSON(n))}if(n.emulateJSON){a.contentType="application/x-www-form-urlencoded";a.data=a.data?{model:a.data}:{}}if(n.emulateHTTP&&(s==="PUT"||s==="DELETE"||s==="PATCH")){a.type="POST";if(n.emulateJSON)a.data._method=s;var o=n.beforeSend;n.beforeSend=function(t){t.setRequestHeader("X-HTTP-Method-Override",s);if(o)return o.apply(this,arguments)}}if(a.type!=="GET"&&!n.emulateJSON){a.processData=false}var h=n.error;n.error=function(t,e,i){n.textStatus=e;n.errorThrown=i;if(h)h.call(n.context,t,e,i)};var u=n.xhr=e.ajax(i.extend(a,n));r.trigger("request",r,u,n);return u};var H={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};e.ajax=function(){return e.$.ajax.apply(e.$,arguments)};var $=e.Router=function(t){t||(t={});if(t.routes)this.routes=t.routes;this._bindRoutes();this.initialize.apply(this,arguments)};var A=/\((.*?)\)/g;var C=/(\(\?)?:\w+/g;var R=/\*\w+/g;var j=/[\-{}\[\]+?.,\\\^$|#\s]/g;i.extend($.prototype,l,{initialize:function(){},route:function(t,r,n){if(!i.isRegExp(t))t=this._routeToRegExp(t);if(i.isFunction(r)){n=r;r=""}if(!n)n=this[r];var s=this;e.history.route(t,function(i){var a=s._extractParameters(t,i);if(s.execute(n,a,r)!==false){s.trigger.apply(s,["route:"+r].concat(a));s.trigger("route",r,a);e.history.trigger("route",s,r,a)}});return this},execute:function(t,e,i){if(t)t.apply(this,e)},navigate:function(t,i){e.history.navigate(t,i);return this},_bindRoutes:function(){if(!this.routes)return;this.routes=i.result(this,"routes");var t,e=i.keys(this.routes);while((t=e.pop())!=null){this.route(t,this.routes[t])}},_routeToRegExp:function(t){t=t.replace(j,"\\$&").replace(A,"(?:$1)?").replace(C,function(t,e){return e?t:"([^/?]+)"}).replace(R,"([^?]*?)");return new RegExp("^"+t+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(t,e){var r=t.exec(e).slice(1);return i.map(r,function(t,e){if(e===r.length-1)return t||null;return t?decodeURIComponent(t):null})}});var M=e.History=function(){this.handlers=[];this.checkUrl=i.bind(this.checkUrl,this);if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var N=/^[#\/]|\s+$/g;var O=/^\/+|\/+$/g;var U=/#.*$/;M.started=false;i.extend(M.prototype,l,{interval:50,atRoot:function(){var t=this.location.pathname.replace(/[^\/]$/,"$&/");return t===this.root&&!this.getSearch()},matchRoot:function(){var t=this.decodeFragment(this.location.pathname);var e=t.slice(0,this.root.length-1)+"/";return e===this.root},decodeFragment:function(t){return decodeURI(t.replace(/%25/g,"%2525"))},getSearch:function(){var t=this.location.href.replace(/#.*/,"").match(/\?.+/);return t?t[0]:""},getHash:function(t){var e=(t||this).location.href.match(/#(.*)$/);return e?e[1]:""},getPath:function(){var t=this.decodeFragment(this.location.pathname+this.getSearch()).slice(this.root.length-1);return t.charAt(0)==="/"?t.slice(1):t},getFragment:function(t){if(t==null){if(this._usePushState||!this._wantsHashChange){t=this.getPath()}else{t=this.getHash()}}return t.replace(N,"")},start:function(t){if(M.started)throw new Error("Backbone.history has already been started");M.started=true;this.options=i.extend({root:"/"},this.options,t);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._hasHashChange="onhashchange"in window&&(document.documentMode===void 0||document.documentMode>7);this._useHashChange=this._wantsHashChange&&this._hasHashChange;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.history&&this.history.pushState);this._usePushState=this._wantsPushState&&this._hasPushState;this.fragment=this.getFragment();this.root=("/"+this.root+"/").replace(O,"/");if(this._wantsHashChange&&this._wantsPushState){if(!this._hasPushState&&!this.atRoot()){var e=this.root.slice(0,-1)||"/";this.location.replace(e+"#"+this.getPath());return true}else if(this._hasPushState&&this.atRoot()){this.navigate(this.getHash(),{replace:true})}}if(!this._hasHashChange&&this._wantsHashChange&&!this._usePushState){this.iframe=document.createElement("iframe");this.iframe.src="javascript:0";this.iframe.style.display="none";this.iframe.tabIndex=-1;var r=document.body;var n=r.insertBefore(this.iframe,r.firstChild).contentWindow;n.document.open();n.document.close();n.location.hash="#"+this.fragment}var s=window.addEventListener||function(t,e){return attachEvent("on"+t,e)};if(this._usePushState){s("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){s("hashchange",this.checkUrl,false)}else if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}if(!this.options.silent)return this.loadUrl()},stop:function(){var t=window.removeEventListener||function(t,e){return detachEvent("on"+t,e)};if(this._usePushState){t("popstate",this.checkUrl,false)}else if(this._useHashChange&&!this.iframe){t("hashchange",this.checkUrl,false)}if(this.iframe){document.body.removeChild(this.iframe);this.iframe=null}if(this._checkUrlInterval)clearInterval(this._checkUrlInterval);M.started=false},route:function(t,e){this.handlers.unshift({route:t,callback:e})},checkUrl:function(t){var e=this.getFragment();if(e===this.fragment&&this.iframe){e=this.getHash(this.iframe.contentWindow)}if(e===this.fragment)return false;if(this.iframe)this.navigate(e);this.loadUrl()},loadUrl:function(t){if(!this.matchRoot())return false;t=this.fragment=this.getFragment(t);return i.some(this.handlers,function(e){if(e.route.test(t)){e.callback(t);return true}})},navigate:function(t,e){if(!M.started)return false;if(!e||e===true)e={trigger:!!e};t=this.getFragment(t||"");var i=this.root;if(t===""||t.charAt(0)==="?"){i=i.slice(0,-1)||"/"}var r=i+t;t=this.decodeFragment(t.replace(U,""));if(this.fragment===t)return;this.fragment=t;if(this._usePushState){this.history[e.replace?"replaceState":"pushState"]({},document.title,r)}else if(this._wantsHashChange){this._updateHash(this.location,t,e.replace);if(this.iframe&&t!==this.getHash(this.iframe.contentWindow)){var n=this.iframe.contentWindow;if(!e.replace){n.document.open();n.document.close()}this._updateHash(n.location,t,e.replace)}}else{return this.location.assign(r)}if(e.trigger)return this.loadUrl(t)},_updateHash:function(t,e,i){if(i){var r=t.href.replace(/(javascript:|#).*$/,"");t.replace(r+"#"+e)}else{t.hash="#"+e}}});e.history=new M;var q=function(t,e){var r=this;var n;if(t&&i.has(t,"constructor")){n=t.constructor}else{n=function(){return r.apply(this,arguments)}}i.extend(n,r,e);var s=function(){this.constructor=n};s.prototype=r.prototype;n.prototype=new s;if(t)i.extend(n.prototype,t);n.__super__=r.prototype;return n};y.extend=x.extend=$.extend=I.extend=M.extend=q;var F=function(){throw new Error('A "url" property or function must be specified')};var z=function(t,e){var i=e.error;e.error=function(r){if(i)i.call(e.context,t,r,e);t.trigger("error",t,r,e)}};return e});

/**
 * @file
 * Parse inline JSON and initialize the drupalSettings global object.
 */

(function () {

  'use strict';

  // Use direct child elements to harden against XSS exploits when CSP is on.
  var settingsElement = document.querySelector('head > script[type="application/json"][data-drupal-selector="drupal-settings-json"], body > script[type="application/json"][data-drupal-selector="drupal-settings-json"]');

  /**
   * Variable generated by Drupal with all the configuration created from PHP.
   *
   * @global
   *
   * @type {object}
   */
  window.drupalSettings = {};

  if (settingsElement !== null) {
    window.drupalSettings = JSON.parse(settingsElement.textContent);
  }
})();
;
/**
 * @file
 * Defines the Drupal JavaScript API.
 */

/**
 * A jQuery object, typically the return value from a `$(selector)` call.
 *
 * Holds an HTMLElement or a collection of HTMLElements.
 *
 * @typedef {object} jQuery
 *
 * @prop {number} length=0
 *   Number of elements contained in the jQuery object.
 */

/**
 * Variable generated by Drupal that holds all translated strings from PHP.
 *
 * Content of this variable is automatically created by Drupal when using the
 * Interface Translation module. It holds the translation of strings used on
 * the page.
 *
 * This variable is used to pass data from the backend to the frontend. Data
 * contained in `drupalSettings` is used during behavior initialization.
 *
 * @global
 *
 * @var {object} drupalTranslations
 */

/**
 * Global Drupal object.
 *
 * All Drupal JavaScript APIs are contained in this namespace.
 *
 * @global
 *
 * @namespace
 */
window.Drupal = {behaviors: {}, locale: {}};

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it in an anonymous closure.
(function (Drupal, drupalSettings, drupalTranslations) {

  'use strict';

  /**
   * Helper to rethrow errors asynchronously.
   *
   * This way Errors bubbles up outside of the original callstack, making it
   * easier to debug errors in the browser.
   *
   * @param {Error|string} error
   *   The error to be thrown.
   */
  Drupal.throwError = function (error) {
    setTimeout(function () { throw error; }, 0);
  };

  /**
   * Custom error thrown after attach/detach if one or more behaviors failed.
   * Initializes the JavaScript behaviors for page loads and Ajax requests.
   *
   * @callback Drupal~behaviorAttach
   *
   * @param {HTMLDocument|HTMLElement} context
   *   An element to detach behaviors from.
   * @param {?object} settings
   *   An object containing settings for the current context. It is rarely used.
   *
   * @see Drupal.attachBehaviors
   */

  /**
   * Reverts and cleans up JavaScript behavior initialization.
   *
   * @callback Drupal~behaviorDetach
   *
   * @param {HTMLDocument|HTMLElement} context
   *   An element to attach behaviors to.
   * @param {object} settings
   *   An object containing settings for the current context.
   * @param {string} trigger
   *   One of `'unload'`, `'move'`, or `'serialize'`.
   *
   * @see Drupal.detachBehaviors
   */

  /**
   * @typedef {object} Drupal~behavior
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Function run on page load and after an Ajax call.
   * @prop {Drupal~behaviorDetach} detach
   *   Function run when content is serialized or removed from the page.
   */

  /**
   * Holds all initialization methods.
   *
   * @namespace Drupal.behaviors
   *
   * @type {Object.<string, Drupal~behavior>}
   */

  /**
   * Defines a behavior to be run during attach and detach phases.
   *
   * Attaches all registered behaviors to a page element.
   *
   * Behaviors are event-triggered actions that attach to page elements,
   * enhancing default non-JavaScript UIs. Behaviors are registered in the
   * {@link Drupal.behaviors} object using the method 'attach' and optionally
   * also 'detach'.
   *
   * {@link Drupal.attachBehaviors} is added below to the `jQuery.ready` event
   * and therefore runs on initial page load. Developers implementing Ajax in
   * their solutions should also call this function after new page content has
   * been loaded, feeding in an element to be processed, in order to attach all
   * behaviors to the new content.
   *
   * Behaviors should use `var elements =
   * $(context).find(selector).once('behavior-name');` to ensure the behavior is
   * attached only once to a given element. (Doing so enables the reprocessing
   * of given elements, which may be needed on occasion despite the ability to
   * limit behavior attachment to a particular element.)
   *
   * @example
   * Drupal.behaviors.behaviorName = {
   *   attach: function (context, settings) {
   *     // ...
   *   },
   *   detach: function (context, settings, trigger) {
   *     // ...
   *   }
   * };
   *
   * @param {HTMLDocument|HTMLElement} [context=document]
   *   An element to attach behaviors to.
   * @param {object} [settings=drupalSettings]
   *   An object containing settings for the current context. If none is given,
   *   the global {@link drupalSettings} object is used.
   *
   * @see Drupal~behaviorAttach
   * @see Drupal.detachBehaviors
   *
   * @throws {Drupal~DrupalBehaviorError}
   */
  Drupal.attachBehaviors = function (context, settings) {
    context = context || document;
    settings = settings || drupalSettings;
    var behaviors = Drupal.behaviors;
    // Execute all of them.
    for (var i in behaviors) {
      if (behaviors.hasOwnProperty(i) && typeof behaviors[i].attach === 'function') {
        // Don't stop the execution of behaviors in case of an error.
        try {
          behaviors[i].attach(context, settings);
        }
        catch (e) {
          Drupal.throwError(e);
        }
      }
    }
  };

  /**
   * Detaches registered behaviors from a page element.
   *
   * Developers implementing Ajax in their solutions should call this function
   * before page content is about to be removed, feeding in an element to be
   * processed, in order to allow special behaviors to detach from the content.
   *
   * Such implementations should use `.findOnce()` and `.removeOnce()` to find
   * elements with their corresponding `Drupal.behaviors.behaviorName.attach`
   * implementation, i.e. `.removeOnce('behaviorName')`, to ensure the behavior
   * is detached only from previously processed elements.
   *
   * @param {HTMLDocument|HTMLElement} [context=document]
   *   An element to detach behaviors from.
   * @param {object} [settings=drupalSettings]
   *   An object containing settings for the current context. If none given,
   *   the global {@link drupalSettings} object is used.
   * @param {string} [trigger='unload']
   *   A string containing what's causing the behaviors to be detached. The
   *   possible triggers are:
   *   - `'unload'`: The context element is being removed from the DOM.
   *   - `'move'`: The element is about to be moved within the DOM (for example,
   *     during a tabledrag row swap). After the move is completed,
   *     {@link Drupal.attachBehaviors} is called, so that the behavior can undo
   *     whatever it did in response to the move. Many behaviors won't need to
   *     do anything simply in response to the element being moved, but because
   *     IFRAME elements reload their "src" when being moved within the DOM,
   *     behaviors bound to IFRAME elements (like WYSIWYG editors) may need to
   *     take some action.
   *   - `'serialize'`: When an Ajax form is submitted, this is called with the
   *     form as the context. This provides every behavior within the form an
   *     opportunity to ensure that the field elements have correct content
   *     in them before the form is serialized. The canonical use-case is so
   *     that WYSIWYG editors can update the hidden textarea to which they are
   *     bound.
   *
   * @throws {Drupal~DrupalBehaviorError}
   *
   * @see Drupal~behaviorDetach
   * @see Drupal.attachBehaviors
   */
  Drupal.detachBehaviors = function (context, settings, trigger) {
    context = context || document;
    settings = settings || drupalSettings;
    trigger = trigger || 'unload';
    var behaviors = Drupal.behaviors;
    // Execute all of them.
    for (var i in behaviors) {
      if (behaviors.hasOwnProperty(i) && typeof behaviors[i].detach === 'function') {
        // Don't stop the execution of behaviors in case of an error.
        try {
          behaviors[i].detach(context, settings, trigger);
        }
        catch (e) {
          Drupal.throwError(e);
        }
      }
    }
  };

  /**
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  Drupal.checkPlain = function (str) {
    str = str.toString()
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return str;
  };

  /**
   * Replaces placeholders with sanitized values in a string.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   An object of replacements pairs to make. Incidences of any key in this
   *   array are replaced with the corresponding value. Based on the first
   *   character of the key, the value is escaped and/or themed:
   *    - `'!variable'`: inserted as is.
   *    - `'@variable'`: escape plain text to HTML ({@link Drupal.checkPlain}).
   *    - `'%variable'`: escape text and theme as a placeholder for user-
   *      submitted content ({@link Drupal.checkPlain} +
   *      `{@link Drupal.theme}('placeholder')`).
   *
   * @return {string}
   *   The formatted string.
   *
   * @see Drupal.t
   */
  Drupal.formatString = function (str, args) {
    // Keep args intact.
    var processedArgs = {};
    // Transform arguments before inserting them.
    for (var key in args) {
      if (args.hasOwnProperty(key)) {
        switch (key.charAt(0)) {
          // Escaped only.
          case '@':
            processedArgs[key] = Drupal.checkPlain(args[key]);
            break;

          // Pass-through.
          case '!':
            processedArgs[key] = args[key];
            break;

          // Escaped and placeholder.
          default:
            processedArgs[key] = Drupal.theme('placeholder', args[key]);
            break;
        }
      }
    }

    return Drupal.stringReplace(str, processedArgs, null);
  };

  /**
   * Replaces substring.
   *
   * The longest keys will be tried first. Once a substring has been replaced,
   * its new value will not be searched again.
   *
   * @param {string} str
   *   A string with placeholders.
   * @param {object} args
   *   Key-value pairs.
   * @param {Array|null} keys
   *   Array of keys from `args`. Internal use only.
   *
   * @return {string}
   *   The replaced string.
   */
  Drupal.stringReplace = function (str, args, keys) {
    if (str.length === 0) {
      return str;
    }

    // If the array of keys is not passed then collect the keys from the args.
    if (!Array.isArray(keys)) {
      keys = [];
      for (var k in args) {
        if (args.hasOwnProperty(k)) {
          keys.push(k);
        }
      }

      // Order the keys by the character length. The shortest one is the first.
      keys.sort(function (a, b) { return a.length - b.length; });
    }

    if (keys.length === 0) {
      return str;
    }

    // Take next longest one from the end.
    var key = keys.pop();
    var fragments = str.split(key);

    if (keys.length) {
      for (var i = 0; i < fragments.length; i++) {
        // Process each fragment with a copy of remaining keys.
        fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
      }
    }

    return fragments.join(args[key]);
  };

  /**
   * Translates strings to the page language, or a given language.
   *
   * See the documentation of the server-side t() function for further details.
   *
   * @param {string} str
   *   A string containing the English text to translate.
   * @param {Object.<string, string>} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   * @param {object} [options]
   *   Additional options for translation.
   * @param {string} [options.context='']
   *   The context the source string belongs to.
   *
   * @return {string}
   *   The formatted string.
   *   The translated string.
   */
  Drupal.t = function (str, args, options) {
    options = options || {};
    options.context = options.context || '';

    // Fetch the localized version of the string.
    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.strings && drupalTranslations.strings[options.context] && drupalTranslations.strings[options.context][str]) {
      str = drupalTranslations.strings[options.context][str];
    }

    if (args) {
      str = Drupal.formatString(str, args);
    }
    return str;
  };

  /**
   * Returns the URL to a Drupal page.
   *
   * @param {string} path
   *   Drupal path to transform to URL.
   *
   * @return {string}
   *   The full URL.
   */
  Drupal.url = function (path) {
    return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + path;
  };

  /**
   * Returns the passed in URL as an absolute URL.
   *
   * @param {string} url
   *   The URL string to be normalized to an absolute URL.
   *
   * @return {string}
   *   The normalized, absolute URL.
   *
   * @see https://github.com/angular/angular.js/blob/v1.4.4/src/ng/urlUtils.js
   * @see https://grack.com/blog/2009/11/17/absolutizing-url-in-javascript
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L53
   */
  Drupal.url.toAbsolute = function (url) {
    var urlParsingNode = document.createElement('a');

    // Decode the URL first; this is required by IE <= 6. Decoding non-UTF-8
    // strings may throw an exception.
    try {
      url = decodeURIComponent(url);
    }
    catch (e) {
      // Empty.
    }

    urlParsingNode.setAttribute('href', url);

    // IE <= 7 normalizes the URL when assigned to the anchor node similar to
    // the other browsers.
    return urlParsingNode.cloneNode(false).href;
  };

  /**
   * Returns true if the URL is within Drupal's base path.
   *
   * @param {string} url
   *   The URL string to be tested.
   *
   * @return {bool}
   *   `true` if local.
   *
   * @see https://github.com/jquery/jquery-ui/blob/1.11.4/ui/tabs.js#L58
   */
  Drupal.url.isLocal = function (url) {
    // Always use browser-derived absolute URLs in the comparison, to avoid
    // attempts to break out of the base path using directory traversal.
    var absoluteUrl = Drupal.url.toAbsolute(url);
    var protocol = location.protocol;

    // Consider URLs that match this site's base URL but use HTTPS instead of HTTP
    // as local as well.
    if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) {
      protocol = 'https:';
    }
    var baseUrl = protocol + '//' + location.host + drupalSettings.path.baseUrl.slice(0, -1);

    // Decoding non-UTF-8 strings may throw an exception.
    try {
      absoluteUrl = decodeURIComponent(absoluteUrl);
    }
    catch (e) {
      // Empty.
    }
    try {
      baseUrl = decodeURIComponent(baseUrl);
    }
    catch (e) {
      // Empty.
    }

    // The given URL matches the site's base URL, or has a path under the site's
    // base URL.
    return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0;
  };

  /**
   * Formats a string containing a count of items.
   *
   * This function ensures that the string is pluralized correctly. Since
   * {@link Drupal.t} is called by this function, make sure not to pass
   * already-localized strings to it.
   *
   * See the documentation of the server-side
   * \Drupal\Core\StringTranslation\TranslationInterface::formatPlural()
   * function for more details.
   *
   * @param {number} count
   *   The item count to display.
   * @param {string} singular
   *   The string for the singular case. Please make sure it is clear this is
   *   singular, to ease translation (e.g. use "1 new comment" instead of "1
   *   new"). Do not use @count in the singular string.
   * @param {string} plural
   *   The string for the plural case. Please make sure it is clear this is
   *   plural, to ease translation. Use @count in place of the item count, as in
   *   "@count new comments".
   * @param {object} [args]
   *   An object of replacements pairs to make after translation. Incidences
   *   of any key in this array are replaced with the corresponding value.
   *   See {@link Drupal.formatString}.
   *   Note that you do not need to include @count in this array.
   *   This replacement is done automatically for the plural case.
   * @param {object} [options]
   *   The options to pass to the {@link Drupal.t} function.
   *
   * @return {string}
   *   A translated string.
   */
  Drupal.formatPlural = function (count, singular, plural, args, options) {
    args = args || {};
    args['@count'] = count;

    var pluralDelimiter = drupalSettings.pluralDelimiter;
    var translations = Drupal.t(singular + pluralDelimiter + plural, args, options).split(pluralDelimiter);
    var index = 0;

    // Determine the index of the plural form.
    if (typeof drupalTranslations !== 'undefined' && drupalTranslations.pluralFormula) {
      index = count in drupalTranslations.pluralFormula ? drupalTranslations.pluralFormula[count] : drupalTranslations.pluralFormula['default'];
    }
    else if (args['@count'] !== 1) {
      index = 1;
    }

    return translations[index];
  };

  /**
   * Encodes a Drupal path for use in a URL.
   *
   * For aesthetic reasons slashes are not escaped.
   *
   * @param {string} item
   *   Unencoded path.
   *
   * @return {string}
   *   The encoded path.
   */
  Drupal.encodePath = function (item) {
    return window.encodeURIComponent(item).replace(/%2F/g, '/');
  };

  /**
   * Generates the themed representation of a Drupal object.
   *
   * All requests for themed output must go through this function. It examines
   * the request and routes it to the appropriate theme function. If the current
   * theme does not provide an override function, the generic theme function is
   * called.
   *
   * @example
   * <caption>To retrieve the HTML for text that should be emphasized and
   * displayed as a placeholder inside a sentence.</caption>
   * Drupal.theme('placeholder', text);
   *
   * @namespace
   *
   * @param {function} func
   *   The name of the theme function to call.
   * @param {...args}
   *   Additional arguments to pass along to the theme function.
   *
   * @return {string|object|HTMLElement|jQuery}
   *   Any data the theme function returns. This could be a plain HTML string,
   *   but also a complex object.
   */
  Drupal.theme = function (func) {
    var args = Array.prototype.slice.apply(arguments, [1]);
    if (func in Drupal.theme) {
      return Drupal.theme[func].apply(this, args);
    }
  };

  /**
   * Formats text for emphasized display in a placeholder inside a sentence.
   *
   * @param {string} str
   *   The text to format (plain-text).
   *
   * @return {string}
   *   The formatted text (html).
   */
  Drupal.theme.placeholder = function (str) {
    return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>';
  };

})(Drupal, window.drupalSettings, window.drupalTranslations);
;
// Allow other JavaScript libraries to use $.
if (window.jQuery) {
  jQuery.noConflict();
}

// Class indicating that JS is enabled; used for styling purpose.
document.documentElement.className += ' js';

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it in an anonymous closure.

(function (domready, Drupal, drupalSettings) {

  'use strict';

  // Attach all behaviors.
  domready(function () { Drupal.attachBehaviors(document, drupalSettings); });

})(domready, Drupal, window.drupalSettings);
;
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){function t(t,r){var i,s,o,u=t.nodeName.toLowerCase();return"area"===u?(i=t.parentNode,s=i.name,!t.href||!s||i.nodeName.toLowerCase()!=="map"?!1:(o=e("img[usemap='#"+s+"']")[0],!!o&&n(o))):(/^(input|select|textarea|button|object)$/.test(u)?!t.disabled:"a"===u?t.href||r:r)&&n(t)}function n(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return e.css(this,"visibility")==="hidden"}).length}e.ui=e.ui||{},e.extend(e.ui,{version:"1.11.4",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({scrollParent:function(t){var n=this.css("position"),r=n==="absolute",i=t?/(auto|scroll|hidden)/:/(auto|scroll)/,s=this.parents().filter(function(){var t=e(this);return r&&t.css("position")==="static"?!1:i.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return n==="fixed"||!s.length?e(this[0].ownerDocument||document):s},uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,r){return!!e.data(t,r[3])},focusable:function(n){return t(n,!isNaN(e.attr(n,"tabindex")))},tabbable:function(n){var r=e.attr(n,"tabindex"),i=isNaN(r);return(i||r>=0)&&t(n,!i)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,n){function o(t,n,i,s){return e.each(r,function(){n-=parseFloat(e.css(t,"padding"+this))||0,i&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),s&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var r=n==="Width"?["Left","Right"]:["Top","Bottom"],i=n.toLowerCase(),s={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(t){return t===undefined?s["inner"+n].call(this):this.each(function(){e(this).css(i,o(this,t)+"px")})},e.fn["outer"+n]=function(t,r){return typeof t!="number"?s["outer"+n].call(this,t):this.each(function(){e(this).css(i,o(this,t,!0,r)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(e==null?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.fn.extend({focus:function(t){return function(n,r){return typeof n=="number"?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),r&&r.call(t)},n)}):t.apply(this,arguments)}}(e.fn.focus),disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.bind(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(t!==undefined)return this.css("zIndex",t);if(this.length){var n=e(this[0]),r,i;while(n.length&&n[0]!==document){r=n.css("position");if(r==="absolute"||r==="relative"||r==="fixed"){i=parseInt(n.css("zIndex"),10);if(!isNaN(i)&&i!==0)return i}n=n.parent()}}return 0}}),e.ui.plugin={add:function(t,n,r){var i,s=e.ui[t].prototype;for(i in r)s.plugins[i]=s.plugins[i]||[],s.plugins[i].push([n,r[i]])},call:function(e,t,n,r){var i,s=e.plugins[t];if(!s)return;if(!r&&(!e.element[0].parentNode||e.element[0].parentNode.nodeType===11))return;for(i=0;i<s.length;i++)e.options[s[i][0]]&&s[i][1].apply(e.element,n)}}});;
/*!
 * jQuery UI Widget 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var t=0,n=Array.prototype.slice;return e.cleanData=function(t){return function(n){var r,i,s;for(s=0;(i=n[s])!=null;s++)try{r=e._data(i,"events"),r&&r.remove&&e(i).triggerHandler("remove")}catch(o){}t(n)}}(e.cleanData),e.widget=function(t,n,r){var i,s,o,u,a={},f=t.split(".")[0];return t=t.split(".")[1],i=f+"-"+t,r||(r=n,n=e.Widget),e.expr[":"][i.toLowerCase()]=function(t){return!!e.data(t,i)},e[f]=e[f]||{},s=e[f][t],o=e[f][t]=function(e,t){if(!this._createWidget)return new o(e,t);arguments.length&&this._createWidget(e,t)},e.extend(o,s,{version:r.version,_proto:e.extend({},r),_childConstructors:[]}),u=new n,u.options=e.widget.extend({},u.options),e.each(r,function(t,r){if(!e.isFunction(r)){a[t]=r;return}a[t]=function(){var e=function(){return n.prototype[t].apply(this,arguments)},i=function(e){return n.prototype[t].apply(this,e)};return function(){var t=this._super,n=this._superApply,s;return this._super=e,this._superApply=i,s=r.apply(this,arguments),this._super=t,this._superApply=n,s}}()}),o.prototype=e.widget.extend(u,{widgetEventPrefix:s?u.widgetEventPrefix||t:t},a,{constructor:o,namespace:f,widgetName:t,widgetFullName:i}),s?(e.each(s._childConstructors,function(t,n){var r=n.prototype;e.widget(r.namespace+"."+r.widgetName,o,n._proto)}),delete s._childConstructors):n._childConstructors.push(o),e.widget.bridge(t,o),o},e.widget.extend=function(t){var r=n.call(arguments,1),i=0,s=r.length,o,u;for(;i<s;i++)for(o in r[i])u=r[i][o],r[i].hasOwnProperty(o)&&u!==undefined&&(e.isPlainObject(u)?t[o]=e.isPlainObject(t[o])?e.widget.extend({},t[o],u):e.widget.extend({},u):t[o]=u);return t},e.widget.bridge=function(t,r){var i=r.prototype.widgetFullName||t;e.fn[t]=function(s){var o=typeof s=="string",u=n.call(arguments,1),a=this;return o?this.each(function(){var n,r=e.data(this,i);if(s==="instance")return a=r,!1;if(!r)return e.error("cannot call methods on "+t+" prior to initialization; "+"attempted to call method '"+s+"'");if(!e.isFunction(r[s])||s.charAt(0)==="_")return e.error("no such method '"+s+"' for "+t+" widget instance");n=r[s].apply(r,u);if(n!==r&&n!==undefined)return a=n&&n.jquery?a.pushStack(n.get()):n,!1}):(u.length&&(s=e.widget.extend.apply(null,[s].concat(u))),this.each(function(){var t=e.data(this,i);t?(t.option(s||{}),t._init&&t._init()):e.data(this,i,new r(s,this))})),a}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(n,r){r=e(r||this.defaultElement||this)[0],this.element=e(r),this.uuid=t++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),r!==this&&(e.data(r,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===r&&this.destroy()}}),this.document=e(r.style?r.ownerDocument:r.document||r),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),n),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(t,n){var r=t,i,s,o;if(arguments.length===0)return e.widget.extend({},this.options);if(typeof t=="string"){r={},i=t.split("."),t=i.shift();if(i.length){s=r[t]=e.widget.extend({},this.options[t]);for(o=0;o<i.length-1;o++)s[i[o]]=s[i[o]]||{},s=s[i[o]];t=i.pop();if(arguments.length===1)return s[t]===undefined?null:s[t];s[t]=n}else{if(arguments.length===1)return this.options[t]===undefined?null:this.options[t];r[t]=n}}return this._setOptions(r),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,e==="disabled"&&(this.widget().toggleClass(this.widgetFullName+"-disabled",!!t),t&&(this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus"))),this},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_on:function(t,n,r){var i,s=this;typeof t!="boolean"&&(r=n,n=t,t=!1),r?(n=i=e(n),this.bindings=this.bindings.add(n)):(r=n,n=this.element,i=this.widget()),e.each(r,function(r,o){function u(){if(!t&&(s.options.disabled===!0||e(this).hasClass("ui-state-disabled")))return;return(typeof o=="string"?s[o]:o).apply(s,arguments)}typeof o!="string"&&(u.guid=o.guid=o.guid||u.guid||e.guid++);var a=r.match(/^([\w:-]*)\s*(.*)$/),f=a[1]+s.eventNamespace,l=a[2];l?i.delegate(l,f,u):n.bind(f,u)})},_off:function(t,n){n=(n||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.unbind(n).undelegate(n),this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function n(){return(typeof e=="string"?r[e]:e).apply(r,arguments)}var r=this;return setTimeout(n,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,n,r){var i,s,o=this.options[t];r=r||{},n=e.Event(n),n.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),n.target=this.element[0],s=n.originalEvent;if(s)for(i in s)i in n||(n[i]=s[i]);return this.element.trigger(n,r),!(e.isFunction(o)&&o.apply(this.element[0],[n].concat(r))===!1||n.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,n){e.Widget.prototype["_"+t]=function(r,i,s){typeof i=="string"&&(i={effect:i});var o,u=i?i===!0||typeof i=="number"?n:i.effect||n:t;i=i||{},typeof i=="number"&&(i={duration:i}),o=!e.isEmptyObject(i),i.complete=s,i.delay&&r.delay(i.delay),o&&e.effects&&e.effects.effect[u]?r[t](i):u!==t&&r[u]?r[u](i.duration,i.easing,s):r.queue(function(n){e(this)[t](),s&&s.call(r[0]),n()})}}),e.widget});;
/**
 * @file
 * Provide dragging capabilities to admin uis.
 */

/**
 * Triggers when weights columns are toggled.
 *
 * @event columnschange
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Store the state of weight columns display for all tables.
   *
   * Default value is to hide weight columns.
   */
  var showWeight = JSON.parse(localStorage.getItem('Drupal.tableDrag.showWeight'));

  /**
   * Drag and drop table rows with field manipulation.
   *
   * Using the drupal_attach_tabledrag() function, any table with weights or
   * parent relationships may be made into draggable tables. Columns containing
   * a field may optionally be hidden, providing a better user experience.
   *
   * Created tableDrag instances may be modified with custom behaviors by
   * overriding the .onDrag, .onDrop, .row.onSwap, and .row.onIndent methods.
   * See blocks.js for an example of adding additional functionality to
   * tableDrag.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.tableDrag = {
    attach: function (context, settings) {
      function initTableDrag(table, base) {
        if (table.length) {
          // Create the new tableDrag instance. Save in the Drupal variable
          // to allow other scripts access to the object.
          Drupal.tableDrag[base] = new Drupal.tableDrag(table[0], settings.tableDrag[base]);
        }
      }

      for (var base in settings.tableDrag) {
        if (settings.tableDrag.hasOwnProperty(base)) {
          initTableDrag($(context).find('#' + base).once('tabledrag'), base);
        }
      }
    }
  };

  /**
   * Provides table and field manipulation.
   *
   * @constructor
   *
   * @param {HTMLElement} table
   *   DOM object for the table to be made draggable.
   * @param {object} tableSettings
   *   Settings for the table added via drupal_add_dragtable().
   */
  Drupal.tableDrag = function (table, tableSettings) {
    var self = this;
    var $table = $(table);

    /**
     * @type {jQuery}
     */
    this.$table = $(table);

    /**
     *
     * @type {HTMLElement}
     */
    this.table = table;

    /**
     * @type {object}
     */
    this.tableSettings = tableSettings;

    /**
     * Used to hold information about a current drag operation.
     *
     * @type {?HTMLElement}
     */
    this.dragObject = null;

    /**
     * Provides operations for row manipulation.
     *
     * @type {?HTMLElement}
     */
    this.rowObject = null;

    /**
     * Remember the previous element.
     *
     * @type {?HTMLElement}
     */
    this.oldRowElement = null;

    /**
     * Used to determine up or down direction from last mouse move.
     *
     * @type {number}
     */
    this.oldY = 0;

    /**
     * Whether anything in the entire table has changed.
     *
     * @type {bool}
     */
    this.changed = false;

    /**
     * Maximum amount of allowed parenting.
     *
     * @type {number}
     */
    this.maxDepth = 0;

    /**
     * Direction of the table.
     *
     * @type {number}
     */
    this.rtl = $(this.table).css('direction') === 'rtl' ? -1 : 1;

    /**
     *
     * @type {bool}
     */
    this.striping = $(this.table).data('striping') === 1;

    /**
     * Configure the scroll settings.
     *
     * @type {object}
     *
     * @prop {number} amount
     * @prop {number} interval
     * @prop {number} trigger
     */
    this.scrollSettings = {amount: 4, interval: 50, trigger: 70};

    /**
     *
     * @type {?number}
     */
    this.scrollInterval = null;

    /**
     *
     * @type {number}
     */
    this.scrollY = 0;

    /**
     *
     * @type {number}
     */
    this.windowHeight = 0;

    /**
     * Check this table's settings for parent relationships.
     *
     * For efficiency, large sections of code can be skipped if we don't need to
     * track horizontal movement and indentations.
     *
     * @type {bool}
     */
    this.indentEnabled = false;
    for (var group in tableSettings) {
      if (tableSettings.hasOwnProperty(group)) {
        for (var n in tableSettings[group]) {
          if (tableSettings[group].hasOwnProperty(n)) {
            if (tableSettings[group][n].relationship === 'parent') {
              this.indentEnabled = true;
            }
            if (tableSettings[group][n].limit > 0) {
              this.maxDepth = tableSettings[group][n].limit;
            }
          }
        }
      }
    }
    if (this.indentEnabled) {

      /**
       * Total width of indents, set in makeDraggable.
       *
       * @type {number}
       */
      this.indentCount = 1;
      // Find the width of indentations to measure mouse movements against.
      // Because the table doesn't need to start with any indentations, we
      // manually append 2 indentations in the first draggable row, measure
      // the offset, then remove.
      var indent = Drupal.theme('tableDragIndentation');
      var testRow = $('<tr/>').addClass('draggable').appendTo(table);
      var testCell = $('<td/>').appendTo(testRow).prepend(indent).prepend(indent);
      var $indentation = testCell.find('.js-indentation');

      /**
       *
       * @type {number}
       */
      this.indentAmount = $indentation.get(1).offsetLeft - $indentation.get(0).offsetLeft;
      testRow.remove();
    }

    // Make each applicable row draggable.
    // Match immediate children of the parent element to allow nesting.
    $table.find('> tr.draggable, > tbody > tr.draggable').each(function () { self.makeDraggable(this); });

    // Add a link before the table for users to show or hide weight columns.
    $table.before($('<button type="button" class="link tabledrag-toggle-weight"></button>')
      .attr('title', Drupal.t('Re-order rows by numerical weight instead of dragging.'))
      .on('click', $.proxy(function (e) {
        e.preventDefault();
        this.toggleColumns();
      }, this))
      .wrap('<div class="tabledrag-toggle-weight-wrapper"></div>')
      .parent()
    );

    // Initialize the specified columns (for example, weight or parent columns)
    // to show or hide according to user preference. This aids accessibility
    // so that, e.g., screen reader users can choose to enter weight values and
    // manipulate form elements directly, rather than using drag-and-drop..
    self.initColumns();

    // Add event bindings to the document. The self variable is passed along
    // as event handlers do not have direct access to the tableDrag object.
    $(document).on('touchmove', function (event) { return self.dragRow(event.originalEvent.touches[0], self); });
    $(document).on('touchend', function (event) { return self.dropRow(event.originalEvent.touches[0], self); });
    $(document).on('mousemove pointermove', function (event) { return self.dragRow(event, self); });
    $(document).on('mouseup pointerup', function (event) { return self.dropRow(event, self); });

    // React to localStorage event showing or hiding weight columns.
    $(window).on('storage', $.proxy(function (e) {
      // Only react to 'Drupal.tableDrag.showWeight' value change.
      if (e.originalEvent.key === 'Drupal.tableDrag.showWeight') {
        // This was changed in another window, get the new value for this
        // window.
        showWeight = JSON.parse(e.originalEvent.newValue);
        this.displayColumns(showWeight);
      }
    }, this));
  };

  /**
   * Initialize columns containing form elements to be hidden by default.
   *
   * Identify and mark each cell with a CSS class so we can easily toggle
   * show/hide it. Finally, hide columns if user does not have a
   * 'Drupal.tableDrag.showWeight' localStorage value.
   */
  Drupal.tableDrag.prototype.initColumns = function () {
    var $table = this.$table;
    var hidden;
    var cell;
    var columnIndex;
    for (var group in this.tableSettings) {
      if (this.tableSettings.hasOwnProperty(group)) {

        // Find the first field in this group.
        for (var d in this.tableSettings[group]) {
          if (this.tableSettings[group].hasOwnProperty(d)) {
            var field = $table.find('.' + this.tableSettings[group][d].target).eq(0);
            if (field.length && this.tableSettings[group][d].hidden) {
              hidden = this.tableSettings[group][d].hidden;
              cell = field.closest('td');
              break;
            }
          }
        }

        // Mark the column containing this field so it can be hidden.
        if (hidden && cell[0]) {
          // Add 1 to our indexes. The nth-child selector is 1 based, not 0
          // based. Match immediate children of the parent element to allow
          // nesting.
          columnIndex = cell.parent().find('> td').index(cell.get(0)) + 1;
          $table.find('> thead > tr, > tbody > tr, > tr').each(this.addColspanClass(columnIndex));
        }
      }
    }
    this.displayColumns(showWeight);
  };

  /**
   * Mark cells that have colspan.
   *
   * In order to adjust the colspan instead of hiding them altogether.
   *
   * @param {number} columnIndex
   *   The column index to add colspan class to.
   *
   * @return {function}
   *   Function to add colspan class.
   */
  Drupal.tableDrag.prototype.addColspanClass = function (columnIndex) {
    return function () {
      // Get the columnIndex and adjust for any colspans in this row.
      var $row = $(this);
      var index = columnIndex;
      var cells = $row.children();
      var cell;
      cells.each(function (n) {
        if (n < index && this.colSpan && this.colSpan > 1) {
          index -= this.colSpan - 1;
        }
      });
      if (index > 0) {
        cell = cells.filter(':nth-child(' + index + ')');
        if (cell[0].colSpan && cell[0].colSpan > 1) {
          // If this cell has a colspan, mark it so we can reduce the colspan.
          cell.addClass('tabledrag-has-colspan');
        }
        else {
          // Mark this cell so we can hide it.
          cell.addClass('tabledrag-hide');
        }
      }
    };
  };

  /**
   * Hide or display weight columns. Triggers an event on change.
   *
   * @fires event:columnschange
   *
   * @param {bool} displayWeight
   *   'true' will show weight columns.
   */
  Drupal.tableDrag.prototype.displayColumns = function (displayWeight) {
    if (displayWeight) {
      this.showColumns();
    }
    // Default action is to hide columns.
    else {
      this.hideColumns();
    }
    // Trigger an event to allow other scripts to react to this display change.
    // Force the extra parameter as a bool.
    $('table').findOnce('tabledrag').trigger('columnschange', !!displayWeight);
  };

  /**
   * Toggle the weight column depending on 'showWeight' value.
   *
   * Store only default override.
   */
  Drupal.tableDrag.prototype.toggleColumns = function () {
    showWeight = !showWeight;
    this.displayColumns(showWeight);
    if (showWeight) {
      // Save default override.
      localStorage.setItem('Drupal.tableDrag.showWeight', showWeight);
    }
    else {
      // Reset the value to its default.
      localStorage.removeItem('Drupal.tableDrag.showWeight');
    }
  };

  /**
   * Hide the columns containing weight/parent form elements.
   *
   * Undo showColumns().
   */
  Drupal.tableDrag.prototype.hideColumns = function () {
    var $tables = $('table').findOnce('tabledrag');
    // Hide weight/parent cells and headers.
    $tables.find('.tabledrag-hide').css('display', 'none');
    // Show TableDrag handles.
    $tables.find('.tabledrag-handle').css('display', '');
    // Reduce the colspan of any effected multi-span columns.
    $tables.find('.tabledrag-has-colspan').each(function () {
      this.colSpan = this.colSpan - 1;
    });
    // Change link text.
    $('.tabledrag-toggle-weight').text(Drupal.t('Show row weights'));
  };

  /**
   * Show the columns containing weight/parent form elements.
   *
   * Undo hideColumns().
   */
  Drupal.tableDrag.prototype.showColumns = function () {
    var $tables = $('table').findOnce('tabledrag');
    // Show weight/parent cells and headers.
    $tables.find('.tabledrag-hide').css('display', '');
    // Hide TableDrag handles.
    $tables.find('.tabledrag-handle').css('display', 'none');
    // Increase the colspan for any columns where it was previously reduced.
    $tables.find('.tabledrag-has-colspan').each(function () {
      this.colSpan = this.colSpan + 1;
    });
    // Change link text.
    $('.tabledrag-toggle-weight').text(Drupal.t('Hide row weights'));
  };

  /**
   * Find the target used within a particular row and group.
   *
   * @param {string} group
   *   Group selector.
   * @param {HTMLElement} row
   *   The row HTML element.
   *
   * @return {object}
   *   The table row settings.
   */
  Drupal.tableDrag.prototype.rowSettings = function (group, row) {
    var field = $(row).find('.' + group);
    var tableSettingsGroup = this.tableSettings[group];
    for (var delta in tableSettingsGroup) {
      if (tableSettingsGroup.hasOwnProperty(delta)) {
        var targetClass = tableSettingsGroup[delta].target;
        if (field.is('.' + targetClass)) {
          // Return a copy of the row settings.
          var rowSettings = {};
          for (var n in tableSettingsGroup[delta]) {
            if (tableSettingsGroup[delta].hasOwnProperty(n)) {
              rowSettings[n] = tableSettingsGroup[delta][n];
            }
          }
          return rowSettings;
        }
      }
    }
  };

  /**
   * Take an item and add event handlers to make it become draggable.
   *
   * @param {HTMLElement} item
   *   The item to add event handlers to.
   */
  Drupal.tableDrag.prototype.makeDraggable = function (item) {
    var self = this;
    var $item = $(item);
    // Add a class to the title link.
    $item.find('td:first-of-type').find('a').addClass('menu-item__link');
    // Create the handle.
    var handle = $('<a href="#" class="tabledrag-handle"><div class="handle">&nbsp;</div></a>').attr('title', Drupal.t('Drag to re-order'));
    // Insert the handle after indentations (if any).
    var $indentationLast = $item.find('td:first-of-type').find('.js-indentation').eq(-1);
    if ($indentationLast.length) {
      $indentationLast.after(handle);
      // Update the total width of indentation in this entire table.
      self.indentCount = Math.max($item.find('.js-indentation').length, self.indentCount);
    }
    else {
      $item.find('td').eq(0).prepend(handle);
    }

    handle.on('mousedown touchstart pointerdown', function (event) {
      event.preventDefault();
      if (event.originalEvent.type === 'touchstart') {
        event = event.originalEvent.touches[0];
      }
      self.dragStart(event, self, item);
    });

    // Prevent the anchor tag from jumping us to the top of the page.
    handle.on('click', function (e) {
      e.preventDefault();
    });

    // Set blur cleanup when a handle is focused.
    handle.on('focus', function () {
      self.safeBlur = true;
    });

    // On blur, fire the same function as a touchend/mouseup. This is used to
    // update values after a row has been moved through the keyboard support.
    handle.on('blur', function (event) {
      if (self.rowObject && self.safeBlur) {
        self.dropRow(event, self);
      }
    });

    // Add arrow-key support to the handle.
    handle.on('keydown', function (event) {
      // If a rowObject doesn't yet exist and this isn't the tab key.
      if (event.keyCode !== 9 && !self.rowObject) {
        self.rowObject = new self.row(item, 'keyboard', self.indentEnabled, self.maxDepth, true);
      }

      var keyChange = false;
      var groupHeight;

      /* eslint-disable no-fallthrough */

      switch (event.keyCode) {
        // Left arrow.
        case 37:
        // Safari left arrow.
        case 63234:
          keyChange = true;
          self.rowObject.indent(-1 * self.rtl);
          break;

        // Up arrow.
        case 38:
        // Safari up arrow.
        case 63232:
          var $previousRow = $(self.rowObject.element).prev('tr:first-of-type');
          var previousRow = $previousRow.get(0);
          while (previousRow && $previousRow.is(':hidden')) {
            $previousRow = $(previousRow).prev('tr:first-of-type');
            previousRow = $previousRow.get(0);
          }
          if (previousRow) {
            // Do not allow the onBlur cleanup.
            self.safeBlur = false;
            self.rowObject.direction = 'up';
            keyChange = true;

            if ($(item).is('.tabledrag-root')) {
              // Swap with the previous top-level row.
              groupHeight = 0;
              while (previousRow && $previousRow.find('.js-indentation').length) {
                $previousRow = $(previousRow).prev('tr:first-of-type');
                previousRow = $previousRow.get(0);
                groupHeight += $previousRow.is(':hidden') ? 0 : previousRow.offsetHeight;
              }
              if (previousRow) {
                self.rowObject.swap('before', previousRow);
                // No need to check for indentation, 0 is the only valid one.
                window.scrollBy(0, -groupHeight);
              }
            }
            else if (self.table.tBodies[0].rows[0] !== previousRow || $previousRow.is('.draggable')) {
              // Swap with the previous row (unless previous row is the first
              // one and undraggable).
              self.rowObject.swap('before', previousRow);
              self.rowObject.interval = null;
              self.rowObject.indent(0);
              window.scrollBy(0, -parseInt(item.offsetHeight, 10));
            }
            // Regain focus after the DOM manipulation.
            handle.trigger('focus');
          }
          break;

        // Right arrow.
        case 39:
        // Safari right arrow.
        case 63235:
          keyChange = true;
          self.rowObject.indent(self.rtl);
          break;

        // Down arrow.
        case 40:
        // Safari down arrow.
        case 63233:
          var $nextRow = $(self.rowObject.group).eq(-1).next('tr:first-of-type');
          var nextRow = $nextRow.get(0);
          while (nextRow && $nextRow.is(':hidden')) {
            $nextRow = $(nextRow).next('tr:first-of-type');
            nextRow = $nextRow.get(0);
          }
          if (nextRow) {
            // Do not allow the onBlur cleanup.
            self.safeBlur = false;
            self.rowObject.direction = 'down';
            keyChange = true;

            if ($(item).is('.tabledrag-root')) {
              // Swap with the next group (necessarily a top-level one).
              groupHeight = 0;
              var nextGroup = new self.row(nextRow, 'keyboard', self.indentEnabled, self.maxDepth, false);
              if (nextGroup) {
                $(nextGroup.group).each(function () {
                  groupHeight += $(this).is(':hidden') ? 0 : this.offsetHeight;
                });
                var nextGroupRow = $(nextGroup.group).eq(-1).get(0);
                self.rowObject.swap('after', nextGroupRow);
                // No need to check for indentation, 0 is the only valid one.
                window.scrollBy(0, parseInt(groupHeight, 10));
              }
            }
            else {
              // Swap with the next row.
              self.rowObject.swap('after', nextRow);
              self.rowObject.interval = null;
              self.rowObject.indent(0);
              window.scrollBy(0, parseInt(item.offsetHeight, 10));
            }
            // Regain focus after the DOM manipulation.
            handle.trigger('focus');
          }
          break;
      }

      /* eslint-enable no-fallthrough */

      if (self.rowObject && self.rowObject.changed === true) {
        $(item).addClass('drag');
        if (self.oldRowElement) {
          $(self.oldRowElement).removeClass('drag-previous');
        }
        self.oldRowElement = item;
        if (self.striping === true) {
          self.restripeTable();
        }
        self.onDrag();
      }

      // Returning false if we have an arrow key to prevent scrolling.
      if (keyChange) {
        return false;
      }
    });

    // Compatibility addition, return false on keypress to prevent unwanted
    // scrolling. IE and Safari will suppress scrolling on keydown, but all
    // other browsers need to return false on keypress.
    // http://www.quirksmode.org/js/keys.html
    handle.on('keypress', function (event) {

      /* eslint-disable no-fallthrough */

      switch (event.keyCode) {
        // Left arrow.
        case 37:
        // Up arrow.
        case 38:
        // Right arrow.
        case 39:
        // Down arrow.
        case 40:
          return false;
      }

      /* eslint-enable no-fallthrough */

    });
  };

  /**
   * Pointer event initiator, creates drag object and information.
   *
   * @param {jQuery.Event} event
   *   The event object that trigger the drag.
   * @param {Drupal.tableDrag} self
   *   The drag handle.
   * @param {HTMLElement} item
   *   The item that that is being dragged.
   */
  Drupal.tableDrag.prototype.dragStart = function (event, self, item) {
    // Create a new dragObject recording the pointer information.
    self.dragObject = {};
    self.dragObject.initOffset = self.getPointerOffset(item, event);
    self.dragObject.initPointerCoords = self.pointerCoords(event);
    if (self.indentEnabled) {
      self.dragObject.indentPointerPos = self.dragObject.initPointerCoords;
    }

    // If there's a lingering row object from the keyboard, remove its focus.
    if (self.rowObject) {
      $(self.rowObject.element).find('a.tabledrag-handle').trigger('blur');
    }

    // Create a new rowObject for manipulation of this row.
    self.rowObject = new self.row(item, 'pointer', self.indentEnabled, self.maxDepth, true);

    // Save the position of the table.
    self.table.topY = $(self.table).offset().top;
    self.table.bottomY = self.table.topY + self.table.offsetHeight;

    // Add classes to the handle and row.
    $(item).addClass('drag');

    // Set the document to use the move cursor during drag.
    $('body').addClass('drag');
    if (self.oldRowElement) {
      $(self.oldRowElement).removeClass('drag-previous');
    }
  };

  /**
   * Pointer movement handler, bound to document.
   *
   * @param {jQuery.Event} event
   *   The pointer event.
   * @param {Drupal.tableDrag} self
   *   The tableDrag instance.
   *
   * @return {bool|undefined}
   *   Undefined if no dragObject is defined, false otherwise.
   */
  Drupal.tableDrag.prototype.dragRow = function (event, self) {
    if (self.dragObject) {
      self.currentPointerCoords = self.pointerCoords(event);
      var y = self.currentPointerCoords.y - self.dragObject.initOffset.y;
      var x = self.currentPointerCoords.x - self.dragObject.initOffset.x;

      // Check for row swapping and vertical scrolling.
      if (y !== self.oldY) {
        self.rowObject.direction = y > self.oldY ? 'down' : 'up';
        // Update the old value.
        self.oldY = y;
        // Check if the window should be scrolled (and how fast).
        var scrollAmount = self.checkScroll(self.currentPointerCoords.y);
        // Stop any current scrolling.
        clearInterval(self.scrollInterval);
        // Continue scrolling if the mouse has moved in the scroll direction.
        if (scrollAmount > 0 && self.rowObject.direction === 'down' || scrollAmount < 0 && self.rowObject.direction === 'up') {
          self.setScroll(scrollAmount);
        }

        // If we have a valid target, perform the swap and restripe the table.
        var currentRow = self.findDropTargetRow(x, y);
        if (currentRow) {
          if (self.rowObject.direction === 'down') {
            self.rowObject.swap('after', currentRow, self);
          }
          else {
            self.rowObject.swap('before', currentRow, self);
          }
          if (self.striping === true) {
            self.restripeTable();
          }
        }
      }

      // Similar to row swapping, handle indentations.
      if (self.indentEnabled) {
        var xDiff = self.currentPointerCoords.x - self.dragObject.indentPointerPos.x;
        // Set the number of indentations the pointer has been moved left or
        // right.
        var indentDiff = Math.round(xDiff / self.indentAmount);
        // Indent the row with our estimated diff, which may be further
        // restricted according to the rows around this row.
        var indentChange = self.rowObject.indent(indentDiff);
        // Update table and pointer indentations.
        self.dragObject.indentPointerPos.x += self.indentAmount * indentChange * self.rtl;
        self.indentCount = Math.max(self.indentCount, self.rowObject.indents);
      }

      return false;
    }
  };

  /**
   * Pointerup behavior.
   *
   * @param {jQuery.Event} event
   *   The pointer event.
   * @param {Drupal.tableDrag} self
   *   The tableDrag instance.
   */
  Drupal.tableDrag.prototype.dropRow = function (event, self) {
    var droppedRow;
    var $droppedRow;

    // Drop row functionality.
    if (self.rowObject !== null) {
      droppedRow = self.rowObject.element;
      $droppedRow = $(droppedRow);
      // The row is already in the right place so we just release it.
      if (self.rowObject.changed === true) {
        // Update the fields in the dropped row.
        self.updateFields(droppedRow);

        // If a setting exists for affecting the entire group, update all the
        // fields in the entire dragged group.
        for (var group in self.tableSettings) {
          if (self.tableSettings.hasOwnProperty(group)) {
            var rowSettings = self.rowSettings(group, droppedRow);
            if (rowSettings.relationship === 'group') {
              for (var n in self.rowObject.children) {
                if (self.rowObject.children.hasOwnProperty(n)) {
                  self.updateField(self.rowObject.children[n], group);
                }
              }
            }
          }
        }

        self.rowObject.markChanged();
        if (self.changed === false) {
          $(Drupal.theme('tableDragChangedWarning')).insertBefore(self.table).hide().fadeIn('slow');
          self.changed = true;
        }
      }

      if (self.indentEnabled) {
        self.rowObject.removeIndentClasses();
      }
      if (self.oldRowElement) {
        $(self.oldRowElement).removeClass('drag-previous');
      }
      $droppedRow.removeClass('drag').addClass('drag-previous');
      self.oldRowElement = droppedRow;
      self.onDrop();
      self.rowObject = null;
    }

    // Functionality specific only to pointerup events.
    if (self.dragObject !== null) {
      self.dragObject = null;
      $('body').removeClass('drag');
      clearInterval(self.scrollInterval);
    }
  };

  /**
   * Get the coordinates from the event (allowing for browser differences).
   *
   * @param {jQuery.Event} event
   *   The pointer event.
   *
   * @return {object}
   *   An object with `x` and `y` keys indicating the position.
   */
  Drupal.tableDrag.prototype.pointerCoords = function (event) {
    if (event.pageX || event.pageY) {
      return {x: event.pageX, y: event.pageY};
    }
    return {
      x: event.clientX + document.body.scrollLeft - document.body.clientLeft,
      y: event.clientY + document.body.scrollTop - document.body.clientTop
    };
  };

  /**
   * Get the event offset from the target element.
   *
   * Given a target element and a pointer event, get the event offset from that
   * element. To do this we need the element's position and the target position.
   *
   * @param {HTMLElement} target
   *   The target HTML element.
   * @param {jQuery.Event} event
   *   The pointer event.
   *
   * @return {object}
   *   An object with `x` and `y` keys indicating the position.
   */
  Drupal.tableDrag.prototype.getPointerOffset = function (target, event) {
    var docPos = $(target).offset();
    var pointerPos = this.pointerCoords(event);
    return {x: pointerPos.x - docPos.left, y: pointerPos.y - docPos.top};
  };

  /**
   * Find the row the mouse is currently over.
   *
   * This row is then taken and swapped with the one being dragged.
   *
   * @param {number} x
   *   The x coordinate of the mouse on the page (not the screen).
   * @param {number} y
   *   The y coordinate of the mouse on the page (not the screen).
   *
   * @return {*}
   *   The drop target row, if found.
   */
  Drupal.tableDrag.prototype.findDropTargetRow = function (x, y) {
    var rows = $(this.table.tBodies[0].rows).not(':hidden');
    for (var n = 0; n < rows.length; n++) {
      var row = rows[n];
      var $row = $(row);
      var rowY = $row.offset().top;
      var rowHeight;
      // Because Safari does not report offsetHeight on table rows, but does on
      // table cells, grab the firstChild of the row and use that instead.
      // http://jacob.peargrove.com/blog/2006/technical/table-row-offsettop-bug-in-safari.
      if (row.offsetHeight === 0) {
        rowHeight = parseInt(row.firstChild.offsetHeight, 10) / 2;
      }
      // Other browsers.
      else {
        rowHeight = parseInt(row.offsetHeight, 10) / 2;
      }

      // Because we always insert before, we need to offset the height a bit.
      if ((y > (rowY - rowHeight)) && (y < (rowY + rowHeight))) {
        if (this.indentEnabled) {
          // Check that this row is not a child of the row being dragged.
          for (n in this.rowObject.group) {
            if (this.rowObject.group[n] === row) {
              return null;
            }
          }
        }
        else {
          // Do not allow a row to be swapped with itself.
          if (row === this.rowObject.element) {
            return null;
          }
        }

        // Check that swapping with this row is allowed.
        if (!this.rowObject.isValidSwap(row)) {
          return null;
        }

        // We may have found the row the mouse just passed over, but it doesn't
        // take into account hidden rows. Skip backwards until we find a
        // draggable row.
        while ($row.is(':hidden') && $row.prev('tr').is(':hidden')) {
          $row = $row.prev('tr:first-of-type');
          row = $row.get(0);
        }
        return row;
      }
    }
    return null;
  };

  /**
   * After the row is dropped, update the table fields.
   *
   * @param {HTMLElement} changedRow
   *   DOM object for the row that was just dropped.
   */
  Drupal.tableDrag.prototype.updateFields = function (changedRow) {
    for (var group in this.tableSettings) {
      if (this.tableSettings.hasOwnProperty(group)) {
        // Each group may have a different setting for relationship, so we find
        // the source rows for each separately.
        this.updateField(changedRow, group);
      }
    }
  };

  /**
   * After the row is dropped, update a single table field.
   *
   * @param {HTMLElement} changedRow
   *   DOM object for the row that was just dropped.
   * @param {string} group
   *   The settings group on which field updates will occur.
   */
  Drupal.tableDrag.prototype.updateField = function (changedRow, group) {
    var rowSettings = this.rowSettings(group, changedRow);
    var $changedRow = $(changedRow);
    var sourceRow;
    var $previousRow;
    var previousRow;
    var useSibling;
    // Set the row as its own target.
    if (rowSettings.relationship === 'self' || rowSettings.relationship === 'group') {
      sourceRow = changedRow;
    }
    // Siblings are easy, check previous and next rows.
    else if (rowSettings.relationship === 'sibling') {
      $previousRow = $changedRow.prev('tr:first-of-type');
      previousRow = $previousRow.get(0);
      var $nextRow = $changedRow.next('tr:first-of-type');
      var nextRow = $nextRow.get(0);
      sourceRow = changedRow;
      if ($previousRow.is('.draggable') && $previousRow.find('.' + group).length) {
        if (this.indentEnabled) {
          if ($previousRow.find('.js-indentations').length === $changedRow.find('.js-indentations').length) {
            sourceRow = previousRow;
          }
        }
        else {
          sourceRow = previousRow;
        }
      }
      else if ($nextRow.is('.draggable') && $nextRow.find('.' + group).length) {
        if (this.indentEnabled) {
          if ($nextRow.find('.js-indentations').length === $changedRow.find('.js-indentations').length) {
            sourceRow = nextRow;
          }
        }
        else {
          sourceRow = nextRow;
        }
      }
    }
    // Parents, look up the tree until we find a field not in this group.
    // Go up as many parents as indentations in the changed row.
    else if (rowSettings.relationship === 'parent') {
      $previousRow = $changedRow.prev('tr');
      previousRow = $previousRow;
      while ($previousRow.length && $previousRow.find('.js-indentation').length >= this.rowObject.indents) {
        $previousRow = $previousRow.prev('tr');
        previousRow = $previousRow;
      }
      // If we found a row.
      if ($previousRow.length) {
        sourceRow = $previousRow.get(0);
      }
      // Otherwise we went all the way to the left of the table without finding
      // a parent, meaning this item has been placed at the root level.
      else {
        // Use the first row in the table as source, because it's guaranteed to
        // be at the root level. Find the first item, then compare this row
        // against it as a sibling.
        sourceRow = $(this.table).find('tr.draggable:first-of-type').get(0);
        if (sourceRow === this.rowObject.element) {
          sourceRow = $(this.rowObject.group[this.rowObject.group.length - 1]).next('tr.draggable').get(0);
        }
        useSibling = true;
      }
    }

    // Because we may have moved the row from one category to another,
    // take a look at our sibling and borrow its sources and targets.
    this.copyDragClasses(sourceRow, changedRow, group);
    rowSettings = this.rowSettings(group, changedRow);

    // In the case that we're looking for a parent, but the row is at the top
    // of the tree, copy our sibling's values.
    if (useSibling) {
      rowSettings.relationship = 'sibling';
      rowSettings.source = rowSettings.target;
    }

    var targetClass = '.' + rowSettings.target;
    var targetElement = $changedRow.find(targetClass).get(0);

    // Check if a target element exists in this row.
    if (targetElement) {
      var sourceClass = '.' + rowSettings.source;
      var sourceElement = $(sourceClass, sourceRow).get(0);
      switch (rowSettings.action) {
        case 'depth':
          // Get the depth of the target row.
          targetElement.value = $(sourceElement).closest('tr').find('.js-indentation').length;
          break;

        case 'match':
          // Update the value.
          targetElement.value = sourceElement.value;
          break;

        case 'order':
          var siblings = this.rowObject.findSiblings(rowSettings);
          if ($(targetElement).is('select')) {
            // Get a list of acceptable values.
            var values = [];
            $(targetElement).find('option').each(function () {
              values.push(this.value);
            });
            var maxVal = values[values.length - 1];
            // Populate the values in the siblings.
            $(siblings).find(targetClass).each(function () {
              // If there are more items than possible values, assign the
              // maximum value to the row.
              if (values.length > 0) {
                this.value = values.shift();
              }
              else {
                this.value = maxVal;
              }
            });
          }
          else {
            // Assume a numeric input field.
            var weight = parseInt($(siblings[0]).find(targetClass).val(), 10) || 0;
            $(siblings).find(targetClass).each(function () {
              this.value = weight;
              weight++;
            });
          }
          break;
      }
    }
  };

  /**
   * Copy all tableDrag related classes from one row to another.
   *
   * Copy all special tableDrag classes from one row's form elements to a
   * different one, removing any special classes that the destination row
   * may have had.
   *
   * @param {HTMLElement} sourceRow
   *   The element for the source row.
   * @param {HTMLElement} targetRow
   *   The element for the target row.
   * @param {string} group
   *   The group selector.
   */
  Drupal.tableDrag.prototype.copyDragClasses = function (sourceRow, targetRow, group) {
    var sourceElement = $(sourceRow).find('.' + group);
    var targetElement = $(targetRow).find('.' + group);
    if (sourceElement.length && targetElement.length) {
      targetElement[0].className = sourceElement[0].className;
    }
  };

  /**
   * Check the suggested scroll of the table.
   *
   * @param {number} cursorY
   *   The Y position of the cursor.
   *
   * @return {number}
   *   The suggested scroll.
   */
  Drupal.tableDrag.prototype.checkScroll = function (cursorY) {
    var de = document.documentElement;
    var b = document.body;

    var windowHeight = this.windowHeight = window.innerHeight || (de.clientHeight && de.clientWidth !== 0 ? de.clientHeight : b.offsetHeight);
    var scrollY;
    if (document.all) {
      scrollY = this.scrollY = !de.scrollTop ? b.scrollTop : de.scrollTop;
    }
    else {
      scrollY = this.scrollY = window.pageYOffset ? window.pageYOffset : window.scrollY;
    }
    var trigger = this.scrollSettings.trigger;
    var delta = 0;

    // Return a scroll speed relative to the edge of the screen.
    if (cursorY - scrollY > windowHeight - trigger) {
      delta = trigger / (windowHeight + scrollY - cursorY);
      delta = (delta > 0 && delta < trigger) ? delta : trigger;
      return delta * this.scrollSettings.amount;
    }
    else if (cursorY - scrollY < trigger) {
      delta = trigger / (cursorY - scrollY);
      delta = (delta > 0 && delta < trigger) ? delta : trigger;
      return -delta * this.scrollSettings.amount;
    }
  };

  /**
   * Set the scroll for the table.
   *
   * @param {number} scrollAmount
   *   The amount of scroll to apply to the window.
   */
  Drupal.tableDrag.prototype.setScroll = function (scrollAmount) {
    var self = this;

    this.scrollInterval = setInterval(function () {
      // Update the scroll values stored in the object.
      self.checkScroll(self.currentPointerCoords.y);
      var aboveTable = self.scrollY > self.table.topY;
      var belowTable = self.scrollY + self.windowHeight < self.table.bottomY;
      if (scrollAmount > 0 && belowTable || scrollAmount < 0 && aboveTable) {
        window.scrollBy(0, scrollAmount);
      }
    }, this.scrollSettings.interval);
  };

  /**
   * Command to restripe table properly.
   */
  Drupal.tableDrag.prototype.restripeTable = function () {
    // :even and :odd are reversed because jQuery counts from 0 and
    // we count from 1, so we're out of sync.
    // Match immediate children of the parent element to allow nesting.
    $(this.table).find('> tbody > tr.draggable:visible, > tr.draggable:visible')
      .removeClass('odd even')
      .filter(':odd').addClass('even').end()
      .filter(':even').addClass('odd');
  };

  /**
   * Stub function. Allows a custom handler when a row begins dragging.
   *
   * @return {null}
   *   Returns null when the stub function is used.
   */
  Drupal.tableDrag.prototype.onDrag = function () {
    return null;
  };

  /**
   * Stub function. Allows a custom handler when a row is dropped.
   *
   * @return {null}
   *   Returns null when the stub function is used.
   */
  Drupal.tableDrag.prototype.onDrop = function () {
    return null;
  };

  /**
   * Constructor to make a new object to manipulate a table row.
   *
   * @param {HTMLElement} tableRow
   *   The DOM element for the table row we will be manipulating.
   * @param {string} method
   *   The method in which this row is being moved. Either 'keyboard' or
   *   'mouse'.
   * @param {bool} indentEnabled
   *   Whether the containing table uses indentations. Used for optimizations.
   * @param {number} maxDepth
   *   The maximum amount of indentations this row may contain.
   * @param {bool} addClasses
   *   Whether we want to add classes to this row to indicate child
   *   relationships.
   */
  Drupal.tableDrag.prototype.row = function (tableRow, method, indentEnabled, maxDepth, addClasses) {
    var $tableRow = $(tableRow);

    this.element = tableRow;
    this.method = method;
    this.group = [tableRow];
    this.groupDepth = $tableRow.find('.js-indentation').length;
    this.changed = false;
    this.table = $tableRow.closest('table')[0];
    this.indentEnabled = indentEnabled;
    this.maxDepth = maxDepth;
    // Direction the row is being moved.
    this.direction = '';
    if (this.indentEnabled) {
      this.indents = $tableRow.find('.js-indentation').length;
      this.children = this.findChildren(addClasses);
      this.group = $.merge(this.group, this.children);
      // Find the depth of this entire group.
      for (var n = 0; n < this.group.length; n++) {
        this.groupDepth = Math.max($(this.group[n]).find('.js-indentation').length, this.groupDepth);
      }
    }
  };

  /**
   * Find all children of rowObject by indentation.
   *
   * @param {bool} addClasses
   *   Whether we want to add classes to this row to indicate child
   *   relationships.
   *
   * @return {Array}
   *   An array of children of the row.
   */
  Drupal.tableDrag.prototype.row.prototype.findChildren = function (addClasses) {
    var parentIndentation = this.indents;
    var currentRow = $(this.element, this.table).next('tr.draggable');
    var rows = [];
    var child = 0;

    function rowIndentation(indentNum, el) {
      var self = $(el);
      if (child === 1 && (indentNum === parentIndentation)) {
        self.addClass('tree-child-first');
      }
      if (indentNum === parentIndentation) {
        self.addClass('tree-child');
      }
      else if (indentNum > parentIndentation) {
        self.addClass('tree-child-horizontal');
      }
    }

    while (currentRow.length) {
      // A greater indentation indicates this is a child.
      if (currentRow.find('.js-indentation').length > parentIndentation) {
        child++;
        rows.push(currentRow[0]);
        if (addClasses) {
          currentRow.find('.js-indentation').each(rowIndentation);
        }
      }
      else {
        break;
      }
      currentRow = currentRow.next('tr.draggable');
    }
    if (addClasses && rows.length) {
      $(rows[rows.length - 1]).find('.js-indentation:nth-child(' + (parentIndentation + 1) + ')').addClass('tree-child-last');
    }
    return rows;
  };

  /**
   * Ensure that two rows are allowed to be swapped.
   *
   * @param {HTMLElement} row
   *   DOM object for the row being considered for swapping.
   *
   * @return {bool}
   *   Whether the swap is a valid swap or not.
   */
  Drupal.tableDrag.prototype.row.prototype.isValidSwap = function (row) {
    var $row = $(row);
    if (this.indentEnabled) {
      var prevRow;
      var nextRow;
      if (this.direction === 'down') {
        prevRow = row;
        nextRow = $row.next('tr').get(0);
      }
      else {
        prevRow = $row.prev('tr').get(0);
        nextRow = row;
      }
      this.interval = this.validIndentInterval(prevRow, nextRow);

      // We have an invalid swap if the valid indentations interval is empty.
      if (this.interval.min > this.interval.max) {
        return false;
      }
    }

    // Do not let an un-draggable first row have anything put before it.
    if (this.table.tBodies[0].rows[0] === row && $row.is(':not(.draggable)')) {
      return false;
    }

    return true;
  };

  /**
   * Perform the swap between two rows.
   *
   * @param {string} position
   *   Whether the swap will occur 'before' or 'after' the given row.
   * @param {HTMLElement} row
   *   DOM element what will be swapped with the row group.
   */
  Drupal.tableDrag.prototype.row.prototype.swap = function (position, row) {
    // Makes sure only DOM object are passed to Drupal.detachBehaviors().
    this.group.forEach(function (row) {
      Drupal.detachBehaviors(row, drupalSettings, 'move');
    });
    $(row)[position](this.group);
    // Makes sure only DOM object are passed to Drupal.attachBehaviors()s.
    this.group.forEach(function (row) {
      Drupal.attachBehaviors(row, drupalSettings);
    });
    this.changed = true;
    this.onSwap(row);
  };

  /**
   * Determine the valid indentations interval for the row at a given position.
   *
   * @param {?HTMLElement} prevRow
   *   DOM object for the row before the tested position
   *   (or null for first position in the table).
   * @param {?HTMLElement} nextRow
   *   DOM object for the row after the tested position
   *   (or null for last position in the table).
   *
   * @return {object}
   *   An object with the keys `min` and `max` to indicate the valid indent
   *   interval.
   */
  Drupal.tableDrag.prototype.row.prototype.validIndentInterval = function (prevRow, nextRow) {
    var $prevRow = $(prevRow);
    var minIndent;
    var maxIndent;

    // Minimum indentation:
    // Do not orphan the next row.
    minIndent = nextRow ? $(nextRow).find('.js-indentation').length : 0;

    // Maximum indentation:
    if (!prevRow || $prevRow.is(':not(.draggable)') || $(this.element).is('.tabledrag-root')) {
      // Do not indent:
      // - the first row in the table,
      // - rows dragged below a non-draggable row,
      // - 'root' rows.
      maxIndent = 0;
    }
    else {
      // Do not go deeper than as a child of the previous row.
      maxIndent = $prevRow.find('.js-indentation').length + ($prevRow.is('.tabledrag-leaf') ? 0 : 1);
      // Limit by the maximum allowed depth for the table.
      if (this.maxDepth) {
        maxIndent = Math.min(maxIndent, this.maxDepth - (this.groupDepth - this.indents));
      }
    }

    return {min: minIndent, max: maxIndent};
  };

  /**
   * Indent a row within the legal bounds of the table.
   *
   * @param {number} indentDiff
   *   The number of additional indentations proposed for the row (can be
   *   positive or negative). This number will be adjusted to nearest valid
   *   indentation level for the row.
   *
   * @return {number}
   *   The number of indentations applied.
   */
  Drupal.tableDrag.prototype.row.prototype.indent = function (indentDiff) {
    var $group = $(this.group);
    // Determine the valid indentations interval if not available yet.
    if (!this.interval) {
      var prevRow = $(this.element).prev('tr').get(0);
      var nextRow = $group.eq(-1).next('tr').get(0);
      this.interval = this.validIndentInterval(prevRow, nextRow);
    }

    // Adjust to the nearest valid indentation.
    var indent = this.indents + indentDiff;
    indent = Math.max(indent, this.interval.min);
    indent = Math.min(indent, this.interval.max);
    indentDiff = indent - this.indents;

    for (var n = 1; n <= Math.abs(indentDiff); n++) {
      // Add or remove indentations.
      if (indentDiff < 0) {
        $group.find('.js-indentation:first-of-type').remove();
        this.indents--;
      }
      else {
        $group.find('td:first-of-type').prepend(Drupal.theme('tableDragIndentation'));
        this.indents++;
      }
    }
    if (indentDiff) {
      // Update indentation for this row.
      this.changed = true;
      this.groupDepth += indentDiff;
      this.onIndent();
    }

    return indentDiff;
  };

  /**
   * Find all siblings for a row.
   *
   * According to its subgroup or indentation. Note that the passed-in row is
   * included in the list of siblings.
   *
   * @param {object} rowSettings
   *   The field settings we're using to identify what constitutes a sibling.
   *
   * @return {Array}
   *   An array of siblings.
   */
  Drupal.tableDrag.prototype.row.prototype.findSiblings = function (rowSettings) {
    var siblings = [];
    var directions = ['prev', 'next'];
    var rowIndentation = this.indents;
    var checkRowIndentation;
    for (var d = 0; d < directions.length; d++) {
      var checkRow = $(this.element)[directions[d]]();
      while (checkRow.length) {
        // Check that the sibling contains a similar target field.
        if (checkRow.find('.' + rowSettings.target)) {
          // Either add immediately if this is a flat table, or check to ensure
          // that this row has the same level of indentation.
          if (this.indentEnabled) {
            checkRowIndentation = checkRow.find('.js-indentation').length;
          }

          if (!(this.indentEnabled) || (checkRowIndentation === rowIndentation)) {
            siblings.push(checkRow[0]);
          }
          else if (checkRowIndentation < rowIndentation) {
            // No need to keep looking for siblings when we get to a parent.
            break;
          }
        }
        else {
          break;
        }
        checkRow = checkRow[directions[d]]();
      }
      // Since siblings are added in reverse order for previous, reverse the
      // completed list of previous siblings. Add the current row and continue.
      if (directions[d] === 'prev') {
        siblings.reverse();
        siblings.push(this.element);
      }
    }
    return siblings;
  };

  /**
   * Remove indentation helper classes from the current row group.
   */
  Drupal.tableDrag.prototype.row.prototype.removeIndentClasses = function () {
    for (var n in this.children) {
      if (this.children.hasOwnProperty(n)) {
        $(this.children[n]).find('.js-indentation')
          .removeClass('tree-child')
          .removeClass('tree-child-first')
          .removeClass('tree-child-last')
          .removeClass('tree-child-horizontal');
      }
    }
  };

  /**
   * Add an asterisk or other marker to the changed row.
   */
  Drupal.tableDrag.prototype.row.prototype.markChanged = function () {
    var marker = Drupal.theme('tableDragChangedMarker');
    var cell = $(this.element).find('td:first-of-type');
    if (cell.find('abbr.tabledrag-changed').length === 0) {
      cell.append(marker);
    }
  };

  /**
   * Stub function. Allows a custom handler when a row is indented.
   *
   * @return {null}
   *   Returns null when the stub function is used.
   */
  Drupal.tableDrag.prototype.row.prototype.onIndent = function () {
    return null;
  };

  /**
   * Stub function. Allows a custom handler when a row is swapped.
   *
   * @param {HTMLElement} swappedRow
   *   The element for the swapped row.
   *
   * @return {null}
   *   Returns null when the stub function is used.
   */
  Drupal.tableDrag.prototype.row.prototype.onSwap = function (swappedRow) {
    return null;
  };

  $.extend(Drupal.theme, /** @lends Drupal.theme */{

    /**
     * @return {string}
     *  Markup for the marker.
     */
    tableDragChangedMarker: function () {
      return '<abbr class="warning tabledrag-changed" title="' + Drupal.t('Changed') + '">*</abbr>';
    },

    /**
     * @return {string}
     *   Markup for the indentation.
     */
    tableDragIndentation: function () {
      return '<div class="js-indentation indentation">&nbsp;</div>';
    },

    /**
     * @return {string}
     *   Markup for the warning.
     */
    tableDragChangedWarning: function () {
      return '<div class="tabledrag-changed-warning messages messages--warning" role="alert">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('You have unsaved changes.') + '</div>';
    }
  });

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Autocomplete based on jQuery UI.
 */

(function ($, Drupal) {

  'use strict';

  var autocomplete;

  /**
   * Helper splitting terms from the autocomplete value.
   *
   * @function Drupal.autocomplete.splitValues
   *
   * @param {string} value
   *   The value being entered by the user.
   *
   * @return {Array}
   *   Array of values, split by comma.
   */
  function autocompleteSplitValues(value) {
    // We will match the value against comma-separated terms.
    var result = [];
    var quote = false;
    var current = '';
    var valueLength = value.length;
    var character;

    for (var i = 0; i < valueLength; i++) {
      character = value.charAt(i);
      if (character === '"') {
        current += character;
        quote = !quote;
      }
      else if (character === ',' && !quote) {
        result.push(current.trim());
        current = '';
      }
      else {
        current += character;
      }
    }
    if (value.length > 0) {
      result.push($.trim(current));
    }

    return result;
  }

  /**
   * Returns the last value of an multi-value textfield.
   *
   * @function Drupal.autocomplete.extractLastTerm
   *
   * @param {string} terms
   *   The value of the field.
   *
   * @return {string}
   *   The last value of the input field.
   */
  function extractLastTerm(terms) {
    return autocomplete.splitValues(terms).pop();
  }

  /**
   * The search handler is called before a search is performed.
   *
   * @function Drupal.autocomplete.options.search
   *
   * @param {object} event
   *   The event triggered.
   *
   * @return {bool}
   *   Whether to perform a search or not.
   */
  function searchHandler(event) {
    var options = autocomplete.options;

    if (options.isComposing) {
      return false;
    }

    var term = autocomplete.extractLastTerm(event.target.value);
    // Abort search if the first character is in firstCharacterBlacklist.
    if (term.length > 0 && options.firstCharacterBlacklist.indexOf(term[0]) !== -1) {
      return false;
    }
    // Only search when the term is at least the minimum length.
    return term.length >= options.minLength;
  }

  /**
   * JQuery UI autocomplete source callback.
   *
   * @param {object} request
   *   The request object.
   * @param {function} response
   *   The function to call with the response.
   */
  function sourceData(request, response) {
    var elementId = this.element.attr('id');

    if (!(elementId in autocomplete.cache)) {
      autocomplete.cache[elementId] = {};
    }

    /**
     * Filter through the suggestions removing all terms already tagged and
     * display the available terms to the user.
     *
     * @param {object} suggestions
     *   Suggestions returned by the server.
     */
    function showSuggestions(suggestions) {
      var tagged = autocomplete.splitValues(request.term);
      var il = tagged.length;
      for (var i = 0; i < il; i++) {
        var index = suggestions.indexOf(tagged[i]);
        if (index >= 0) {
          suggestions.splice(index, 1);
        }
      }
      response(suggestions);
    }

    /**
     * Transforms the data object into an array and update autocomplete results.
     *
     * @param {object} data
     *   The data sent back from the server.
     */
    function sourceCallbackHandler(data) {
      autocomplete.cache[elementId][term] = data;

      // Send the new string array of terms to the jQuery UI list.
      showSuggestions(data);
    }

    // Get the desired term and construct the autocomplete URL for it.
    var term = autocomplete.extractLastTerm(request.term);

    // Check if the term is already cached.
    if (autocomplete.cache[elementId].hasOwnProperty(term)) {
      showSuggestions(autocomplete.cache[elementId][term]);
    }
    else {
      var options = $.extend({success: sourceCallbackHandler, data: {q: term}}, autocomplete.ajax);
      $.ajax(this.element.attr('data-autocomplete-path'), options);
    }
  }

  /**
   * Handles an autocompletefocus event.
   *
   * @return {bool}
   *   Always returns false.
   */
  function focusHandler() {
    return false;
  }

  /**
   * Handles an autocompleteselect event.
   *
   * @param {jQuery.Event} event
   *   The event triggered.
   * @param {object} ui
   *   The jQuery UI settings object.
   *
   * @return {bool}
   *   Returns false to indicate the event status.
   */
  function selectHandler(event, ui) {
    var terms = autocomplete.splitValues(event.target.value);
    // Remove the current input.
    terms.pop();
    // Add the selected item.
    if (ui.item.value.search(',') > 0) {
      terms.push('"' + ui.item.value + '"');
    }
    else {
      terms.push(ui.item.value);
    }
    event.target.value = terms.join(', ');
    // Return false to tell jQuery UI that we've filled in the value already.
    return false;
  }

  /**
   * Override jQuery UI _renderItem function to output HTML by default.
   *
   * @param {jQuery} ul
   *   jQuery collection of the ul element.
   * @param {object} item
   *   The list item to append.
   *
   * @return {jQuery}
   *   jQuery collection of the ul element.
   */
  function renderItem(ul, item) {
    return $('<li>')
      .append($('<a>').html(item.label))
      .appendTo(ul);
  }

  /**
   * Attaches the autocomplete behavior to all required fields.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the autocomplete behaviors.
   * @prop {Drupal~behaviorDetach} detach
   *   Detaches the autocomplete behaviors.
   */
  Drupal.behaviors.autocomplete = {
    attach: function (context) {
      // Act on textfields with the "form-autocomplete" class.
      var $autocomplete = $(context).find('input.form-autocomplete').once('autocomplete');
      if ($autocomplete.length) {
        // Allow options to be overriden per instance.
        var blacklist = $autocomplete.attr('data-autocomplete-first-character-blacklist');
        $.extend(autocomplete.options, {
          firstCharacterBlacklist: (blacklist) ? blacklist : ''
        });
        // Use jQuery UI Autocomplete on the textfield.
        $autocomplete.autocomplete(autocomplete.options)
          .each(function () {
            $(this).data('ui-autocomplete')._renderItem = autocomplete.options.renderItem;
          });

        // Use CompositionEvent to handle IME inputs. It requests remote server on "compositionend" event only.
        $autocomplete.on('compositionstart.autocomplete', function () {
          autocomplete.options.isComposing = true;
        });
        $autocomplete.on('compositionend.autocomplete', function () {
          autocomplete.options.isComposing = false;
        });
      }
    },
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        $(context).find('input.form-autocomplete')
          .removeOnce('autocomplete')
          .autocomplete('destroy');
      }
    }
  };

  /**
   * Autocomplete object implementation.
   *
   * @namespace Drupal.autocomplete
   */
  autocomplete = {
    cache: {},
    // Exposes options to allow overriding by contrib.
    splitValues: autocompleteSplitValues,
    extractLastTerm: extractLastTerm,
    // jQuery UI autocomplete options.

    /**
     * JQuery UI option object.
     *
     * @name Drupal.autocomplete.options
     */
    options: {
      source: sourceData,
      focus: focusHandler,
      search: searchHandler,
      select: selectHandler,
      renderItem: renderItem,
      minLength: 1,
      // Custom options, used by Drupal.autocomplete.
      firstCharacterBlacklist: '',
      // Custom options, indicate IME usage status.
      isComposing: false
    },
    ajax: {
      dataType: 'json'
    }
  };

  Drupal.autocomplete = autocomplete;

})(jQuery, Drupal);
;
/**
 * @file
 * Drupal Bootstrap object.
 */

/**
 * All Drupal Bootstrap JavaScript APIs are contained in this namespace.
 *
 * @namespace
 */
(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.bootstrap = {
    settings: drupalSettings.bootstrap || {}
  };

  /**
   * Wraps Drupal.checkPlain() to ensure value passed isn't empty.
   *
   * Encodes special characters in a plain-text string for display as HTML.
   *
   * @param {string} str
   *   The string to be encoded.
   *
   * @return {string}
   *   The encoded string.
   *
   * @ingroup sanitization
   */
  Drupal.bootstrap.checkPlain = function (str) {
    return str && Drupal.checkPlain(str) || '';
  };

  /**
   * Extends a Bootstrap plugin constructor.
   *
   * @param {string} id
   *   A Bootstrap plugin identifier located in $.fn.
   * @param {function} [callback]
   *   A callback to extend the plugin constructor.
   *
   * @return {function|boolean}
   *   The Bootstrap plugin or FALSE if the plugin does not exist.
   */
  Drupal.bootstrap.extendPlugin = function (id, callback) {
    // Immediately return if the plugin does not exist.
    if (!$.fn[id] || !$.fn[id].Constructor) return false;

    // Extend the plugin if a callback was provided.
    if ($.isFunction(callback)) {
      var ret = callback.apply($.fn[id].Constructor, [this.settings]);
      if ($.isPlainObject(ret)) {
        $.extend(true, $.fn[id].Constructor, ret);
      }
    }

    // Add a jQuery UI like option getter/setter method.
    if ($.fn[id].Constructor.prototype.option === void(0)) {
      $.fn[id].Constructor.prototype.option = this.option;
    }

    return $.fn[id].Constructor;
  };

  /**
   * Replaces a Bootstrap jQuery plugin definition.
   *
   * @param {string} id
   *   A Bootstrap plugin identifier located in $.fn.
   * @param {function} [callback]
   *   A callback to replace the jQuery plugin definition. The callback must
   *   return a function that is used to construct a jQuery plugin.
   *
   * @return {function|boolean}
   *   The Bootstrap jQuery plugin definition or FALSE if the plugin does not
   *   exist.
   */
  Drupal.bootstrap.replacePlugin = function (id, callback) {
    // Immediately return if plugin does not exist or not a valid callback.
    if (!$.fn[id] || !$.fn[id].Constructor || !$.isFunction(callback)) return false;
    var constructor = $.fn[id].Constructor;

    var plugin = callback.apply(constructor);
    if ($.isFunction(plugin)) {
      plugin.Constructor = constructor;

      var old = $.fn[id];
      plugin.noConflict = function () {
        $.fn[id] = old;
        return this;
      };
      $.fn[id] = plugin;
    }
  };

  /**
   * Map of supported events by regular expression.
   *
   * @type {Object<Event|MouseEvent|KeyboardEvent|TouchEvent,RegExp>}
   */
  Drupal.bootstrap.eventMap = {
    Event: /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    MouseEvent: /^(?:click|dblclick|mouse(?:down|enter|leave|up|over|move|out))$/,
    KeyboardEvent: /^(?:key(?:down|press|up))$/,
    TouchEvent: /^(?:touch(?:start|end|move|cancel))$/
  };

  /**
   * Simulates a native event on an element in the browser.
   *
   * Note: This is a pretty complete modern implementation. If things are quite
   * working the way you intend (in older browsers), you may wish to use the
   * jQuery.simulate plugin. If it's available, this method will defer to it.
   *
   * @see https://github.com/jquery/jquery-simulate
   *
   * @param {HTMLElement} element
   *   A DOM element to dispatch event on.
   * @param {String} type
   *   The type of event to simulate.
   * @param {Object} [options]
   *   An object of options to pass to the event constructor. Typically, if
   *   an event is being proxied, you should just pass the original event
   *   object here. This allows, if the browser supports it, to be a truly
   *   simulated event.
   */
  Drupal.bootstrap.simulate = function (element, type, options) {
    // Defer to the jQuery.simulate plugin, if it's available.
    if (typeof $.simulate === 'function') {
      new $.simulate(element, type, options);
      return;
    }
    var event;
    var ctor;
    for (var name in Drupal.bootstrap.eventMap) {
      if (Drupal.bootstrap.eventMap[name].test(type)) {
        ctor = name;
        break;
      }
    }
    if (!ctor) {
      throw new SyntaxError('Only rudimentary HTMLEvents, KeyboardEvents and MouseEvents are supported: ' + type);
    }
    var opts = {bubbles: true, cancelable: true};
    if (ctor === 'KeyboardEvent' || ctor === 'MouseEvent') {
      $.extend(opts, {ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1});
    }
    if (ctor === 'MouseEvent') {
      $.extend(opts, {button: 0, pointerX: 0, pointerY: 0, view: window});
    }
    if (options) {
      $.extend(opts, options);
    }
    if (typeof window[ctor] === 'function') {
      event = new window[ctor](type, opts);
      element.dispatchEvent(event);
    }
    else if (document.createEvent) {
      event = document.createEvent(ctor);
      event.initEvent(type, opts.bubbles, opts.cancelable);
      element.dispatchEvent(event);
    }
    else if (typeof element.fireEvent === 'function') {
      event = $.extend(document.createEventObject(), opts);
      element.fireEvent('on' + type, event);
    }
    else if (typeof element[type]) {
      element[type]();
    }
  };

  /**
   * Provide jQuery UI like ability to get/set options for Bootstrap plugins.
   *
   * @param {string|object} key
   *   A string value of the option to set, can be dot like to a nested key.
   *   An object of key/value pairs.
   * @param {*} [value]
   *   (optional) A value to set for key.
   *
   * @returns {*}
   *   - Returns nothing if key is an object or both key and value parameters
   *   were provided to set an option.
   *   - Returns the a value for a specific setting if key was provided.
   *   - Returns an object of key/value pairs of all the options if no key or
   *   value parameter was provided.
   *
   * @see https://github.com/jquery/jquery-ui/blob/master/ui/widget.js
   *
   * @todo This isn't fully working since Bootstrap plugins don't allow
   * methods to return values.
   */
  Drupal.bootstrap.option = function (key, value) {
    var options = key;
    var parts, curOption, i;

    // Don't return a reference to the internal hash.
    if (arguments.length === 0) {
      return $.extend({}, this.options);
    }

    // Handle a specific option.
    if (typeof key === "string") {
      // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
      options = {};
      parts = key.split(".");
      key = parts.shift();
      if (parts.length) {
        curOption = options[key] = $.extend({}, this.options[key]);
        for (i = 0; i < parts.length - 1; i++) {
          curOption[parts[i]] = curOption[parts[i]] || {};
          curOption = curOption[parts[i]];
        }
        key = parts.pop();
        if (arguments.length === 1) {
          return curOption[key] === undefined ? null : curOption[key];
        }
        curOption[key] = value;
      }
      else {
        if (arguments.length === 1) {
          return this.options[key] === undefined ? null : this.options[key];
        }
        options[key] = value;
      }
    }

    // Set the new option(s).
    for (key in options) {
      if (!options.hasOwnProperty(key)) continue;
      this.options[key] = options[key];
    }
    return this;
  };

})(window.jQuery, window.Drupal, window.drupalSettings);
;
(function ($, _) {

  /**
   * Class to help modify attributes.
   *
   * @param {object} object
   *   An object to initialize attributes with.
   *
   * @constructor
   */
  var Attributes = function (object) {
    this.data = object && _.isObject(object) && _.clone(object) || {};
  };

  /**
   * Renders the attributes object as a string to inject into an HTML element.
   *
   * @returns {string}
   */
  Attributes.prototype.toString = function () {
    var output = '';
    var name, value;
    var checkPlain = function (str) {
      return str && str.toString().replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || '';
    };
    for (name in this.data) {
      if (!this.data.hasOwnProperty(name)) continue;
      value = this.data[name];
      if (_.isFunction(value)) value = value();
      if (_.isObject(value)) value = _.values(value);
      if (_.isArray(value)) value = value.join(' ');
      output += ' ' + checkPlain(name) + '="' + checkPlain(value) + '"';
    }
    return output;
  };

  /**
   * Add class(es) to the array.
   *
   * @param {string|Array} value
   *   An individual class or an array of classes to add.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.addClass = function (value) {
    var classes = this.getClasses();
    value = [].concat(classes, value);
    this.set('class', _.uniq(value));
    return this;
  };

  /**
   * Returns whether the requested attribute exists.
   *
   * @param {string} name
   *   An attribute name to check.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.exists = function (name) {
    return this.data[name] !== void(0) && this.data[name] !== null;
  };

  /**
   * Retrieve a specific attribute from the array.
   *
   * @param {string} name
   *   The specific attribute to retrieve.
   * @param {*} defaultValue
   *   (optional) The default value to set if the attribute does not exist.
   *
   * @return {*}
   *   A specific attribute value, passed by reference.
   */
  Attributes.prototype.get = function (name, defaultValue) {
    if (!this.exists(name)) this.data[name] = defaultValue;
    return this.data[name];
  };

  /**
   * Retrieves a cloned copy of the internal attributes data object.
   *
   * @returns {Object}
   */
  Attributes.prototype.getData = function () {
    return _.clone(this.data);
  };

  /**
   * Retrieves classes from the array.
   *
   * @return {Array}
   *   The classes array.
   */
  Attributes.prototype.getClasses = function () {
    var classes = [].concat(this.get('class', []));
    return _.uniq(classes);
  };

  /**
   * Indicates whether a class is present in the array.
   *
   * @param {string|Array} name
   *   The class(es) to search for.
   *
   * @return {boolean}
   *   TRUE or FALSE
   */
  Attributes.prototype.hasClass = function (name) {
    name = [].concat(name);
    var classes = this.getClasses();
    var found = false;
    _.each(name, function (value) { if (_.indexOf(classes, value) !== -1) found = true; });
    return found;
  };

  /**
   * Merges multiple values into the array.
   *
   * @param {object} values
   *   An associative key/value array.
   * @param {boolean} [recursive]
   *   Flag determining whether or not to recursively merge key/value pairs.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.merge = function (values, recursive) {
    values = values instanceof Attributes ? values.getData() : values;
    if (recursive === void(0) || recursive) {
      this.data = $.extend(true, {}, this.data, values);
    }
    else {
      $.extend(this.data, values);
    }
    return this;
  };

  /**
   * Removes an attribute from the array.
   *
   * @param {string} name
   *   The name of the attribute to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.remove = function (name) {
    if (this.exists(name)) delete this.data[name];
    return this;
  };

  /**
   * Removes a class from the attributes array.
   *
   * @param {string|Array} value
   *   An individual class or an array of classes to remove.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.removeClass = function (value) {
    this.set('class', _.without(this.getClasses(), [].concat(value)));
    return this;
  };

  /**
   * Replaces a class in the attributes array.
   *
   * @param {string} oldValue
   *   The old class to remove.
   * @param {string} newValue
   *   The new class. It will not be added if the old class does not exist.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.replaceClass = function (oldValue, newValue) {
    var classes = this.getClasses();
    var i = _.indexOf(oldValue, classes);
    if (i >= 0) {
      classes[i] = newValue;
      this.set('class', classes);
    }
    return this;
  };

  /**
   * Sets an attribute on the array.
   *
   * @param {string} name
   *   The name of the attribute to set.
   * @param {*} value
   *   The value of the attribute to set.
   *
   * @return {Attributes}
   *
   * @chainable
   */
  Attributes.prototype.set = function (name, value) {
    this.data[name] = value;
    return this;
  };

  /**
   * Creates an Attributes instance.
   *
   * @param {object|Attributes} object
   *   An object to initialize attributes with.
   *
   * @returns {Attributes}
   *
   * @global
   *
   * @constructor
   */
  window.Attributes = function (object) {
    return object instanceof Attributes ? object : new Attributes(object);
  };

})(window.jQuery, window._);
;
/**
 * @file
 * Theme hooks for the Drupal Bootstrap base theme.
 */
(function ($, Drupal, Bootstrap) {

  /**
   * Fallback for theming an icon if the Icon API module is not installed.
   */
  if (!Drupal.icon) Drupal.icon = { bundles: {} };
  if (!Drupal.theme.icon || Drupal.theme.prototype.icon) {
    $.extend(Drupal.theme, /** @lends Drupal.theme */ {
      /**
       * Renders an icon.
       *
       * @param {string} bundle
       *   The bundle which the icon belongs to.
       * @param {string} icon
       *   The name of the icon to render.
       * @param {object|Attributes} [attributes]
       *   An object of attributes to also apply to the icon.
       *
       * @returns {string}
       */
      icon: function (bundle, icon, attributes) {
        if (!Drupal.icon.bundles[bundle]) return '';
        attributes = Attributes(attributes).addClass('icon').set('aria-hidden', 'true');
        icon = Drupal.icon.bundles[bundle](icon, attributes);
        return '<span' + attributes + '></span>';
      }
    });
  }

  /**
   * Callback for modifying an icon in the "bootstrap" icon bundle.
   *
   * @param {string} icon
   *   The icon being rendered.
   * @param {Attributes} attributes
   *   Attributes object for the icon.
   */
  Drupal.icon.bundles.bootstrap = function (icon, attributes) {
    attributes.addClass(['glyphicon', 'glyphicon-' + icon]);
  };

  /**
   * Add necessary theming hooks.
   */
  $.extend(Drupal.theme, /** @lends Drupal.theme */ {

    /**
     * Renders a Bootstrap AJAX glyphicon throbber.
     *
     * @returns {string}
     */
    ajaxThrobber: function () {
      return Drupal.theme.bootstrapIcon('refresh', {'class': ['ajax-throbber', 'glyphicon-spin'] });
    },

    /**
     * Renders a button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button. If it contains one of:
     *   - value: The label of the button.
     *   - context: The context type of Bootstrap button, can be one of:
     *     - default
     *     - primary
     *     - success
     *     - info
     *     - warning
     *     - danger
     *     - link
     *
     * @returns {string}
     */
    button: function (attributes) {
      attributes = Attributes(attributes).addClass('btn');
      var context = attributes.get('context', 'default');
      var label = attributes.get('value', '');
      attributes.remove('context').remove('value');
      if (!attributes.hasClass(['btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link'])) {
        attributes.addClass('btn-' + Bootstrap.checkPlain(context));
      }
      return '<button' + attributes + '>' + label + '</button>';
    },

    /**
     * Alias for "button" theme hook.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    btn: function (attributes) {
      return Drupal.theme('button', attributes);
    },

    /**
     * Renders a button block element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-block': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-block'));
    },

    /**
     * Renders a large button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-lg': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-lg'));
    },

    /**
     * Renders a small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-sm': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-sm'));
    },

    /**
     * Renders an extra small button element.
     *
     * @param {object|Attributes} attributes
     *   An object of attributes to apply to the button.
     *
     * @see Drupal.theme.button()
     *
     * @returns {string}
     */
    'btn-xs': function (attributes) {
      return Drupal.theme('button', Attributes(attributes).addClass('btn-xs'));
    },

    /**
     * Renders a glyphicon.
     *
     * @param {string} name
     *   The name of the glyphicon.
     * @param {object|Attributes} [attributes]
     *   An object of attributes to apply to the icon.
     *
     * @returns {string}
     */
    bootstrapIcon: function (name, attributes) {
      return Drupal.theme('icon', 'bootstrap', name, attributes);
    }

  });

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
;
;
;
;
;
/**
 * @file
 * Provides an event handler for hidden elements in dropdown menus.
 */

(function ($, Drupal, Bootstrap) {
  'use strict';

  /**
   * The list of supported events to proxy.
   *
   * @type {Array}
   */
  var events = [
    // MouseEvent.
    'click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mouseup', 'mouseover', 'mousemove', 'mouseout',

    // KeyboardEvent.
    'keypress', 'keydown', 'keyup'
  ];

  /**
   * Bootstrap dropdown behaviors.
   *
   * Proxy any dropdown element events that should actually be fired on the
   * original target (e.g. button, submits, etc.). This allows any registered
   * event callbacks to be fired as they were intended (despite the fact that
   * the markup has been changed to work with Bootstrap).
   *
   * @see \Drupal\bootstrap\Plugin\Preprocess\BootstrapDropdown::preprocessLinks
   *
   * @type {Drupal~behavior#bootstrapDropdown}
   */
  Drupal.behaviors.bootstrapDropdown = {
    attach: function (context) {
      var elements = context.querySelectorAll('.dropdown [data-dropdown-target]');
      for (var k in elements) {
        if (!elements.hasOwnProperty(k)) {
          continue;
        }
        var element = elements[k];
        for (var i = 0, l = events.length; i < l; i++) {
          var event = events[i];
          element.removeEventListener(event, this.proxyEvent);
          element.addEventListener(event, this.proxyEvent);
        }
      }
    },

    /**
     * Proxy event handler for bootstrap dropdowns.
     *
     * @param {Event} e
     *   The event object.
     */
    proxyEvent: function (e) {
      // Ignore tabbing.
      if (e.type.match(/^key/) && (e.which === 9 || e.keyCode === 9)) {
        return;
      }
      var target = e.currentTarget.dataset && e.currentTarget.dataset.dropdownTarget || e.currentTarget.getAttribute('data-dropdown-target');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        var element = target && target !== '#' && document.querySelectorAll(target)[0];
        if (element) {
          Bootstrap.simulate(element, e.type, e);
        }
        else if (Bootstrap.settings.dev && window.console && !e.type.match(/^mouse/)) {
          window.console.debug('[Drupal Bootstrap] Could not find a the target:', target);
        }
      }
    }
  }

})(jQuery, Drupal, Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Modals.
 */
(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Modal plugin constructor class.
   */
  Bootstrap.extendPlugin('modal', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.modal_animation,
        backdrop: settings.modal_backdrop === 'static' ? 'static' : !!settings.modal_backdrop,
        keyboard: !!settings.modal_keyboard,
        show: !!settings.modal_show,
        size: settings.modal_size
      }
    };
  });

  /**
   * Replace the Bootstrap Modal jQuery plugin definition.
   *
   * Replacing this is needed so that the "option" method can return values.
   */
  Bootstrap.replacePlugin('modal', function () {
    var Modal = this;

    // Extract the arguments.
    var args = Array.prototype.slice.call(arguments, 1);

    // Modal jQuery Plugin Definition.
    return function (option, _relatedTarget) {
      var ret = void(0);
      this.each(function () {
        var $this   = $(this);
        var data    = $this.data('bs.modal');
        var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);

        if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
        if (typeof option == 'string') ret = data[option].apply(data, args);
        else if (options.show) data.show(_relatedTarget);
      });

      // If just one element and there was a result returned for the option passed,
      // then return the result. Otherwise, just return the jQuery object.
      return this.length === 1 && ret !== void(0) ? ret : this;
    }
  });

  /**
   * Extend Drupal theming functions.
   */
  $.extend(Drupal.theme, /** @lend Drupal.theme */ {
    /**
     * Theme function for a Bootstrap Modal.
     *
     * @param {object}[variables]
     *   An object with the following keys:
     *   - title: The name of the tab.
     *
     * @return {string}
     *   The HTML for the modal.
     */
    bootstrapModal: function (variables) {
      var settings = drupalSettings.bootstrap || {};
      var defaults = {
        body: '',
        closeButton: true,
        description: {
          content: null,
          position: 'before'
        },
        footer: '',
        id: 'drupal-modal',
        size: settings.modal_size ? settings.modal_size : '',
        title: Drupal.t('Loading...')
      };
      variables = $.extend(true, {}, defaults, variables);
      var output = '';

      // Build the modal wrapper.
      var classes = ['modal'];
      if (settings.modal_animation) {
        classes.push('fade');
      }
      output += '<div id="' + variables.id + '" class="' + classes.join(' ') + '" tabindex="-1" role="dialog">';

      // Build the modal-dialog wrapper.
      var dialogClasses = ['modal-dialog'];
      if (variables.size) {
        // @todo This should really be a clean CSS class method instead.
        dialogClasses.push(Drupal.checkPlain(variables.size));
      }
      output += '<div class="' + dialogClasses.join(' ') + '" role="document">';

      // Build the modal-content wrapper.
      output += '<div class="modal-content">';

      // Build the header wrapper and title.
      output += Drupal.theme.bootstrapModalHeader(variables.title, variables.closeButton);

      // Build the body.
      output += Drupal.theme.bootstrapModalBody(variables.id + '--body', variables.body, variables.description);

      // Build the footer.
      output += Drupal.theme.bootstrapModalFooter(variables.footer);

      // Close the modal-content wrapper.
      output += '</div>';

      // Close the modal-dialog wrapper.
      output += '</div>';

      // Close the modal wrapper.
      output += '</div>';

      // Return the constructed modal.
      return output;
    },

    /**
     * Theme function for a Bootstrap Modal body markup.
     *
     * @param {string} id
     *   A unique ID for the modal body div.
     * @param {string} body
     *   The HTML markup to place in the body.
     * @param {string|object} description
     *   A description to show. Can either be a string or an object with the
     *   following key/value pairs:
     *   - content: The description value.
     *   - position: (optional) A display setting that can have these values:
     *     - before: The description is displayed before the body. This is the
     *       default value.
     *     - after: The description is display after the body.
     *     - invisible: The description is displayed after the element, hidden
     *       visually but available to screen readers.
     *
     * @return {string}
     *   The HTML for the modal close button.
     */
    bootstrapModalBody: function (id, body, description) {
      var output = '';
      output += '<div id="' + id + '" class="modal-body">';
      if (!description || !$.isPlainObject(description)) {
        description = { content: description};
      }
      description = $.extend({ position: 'before' }, description);

      var descriptionClasses = ['help-block'];
      if (description.content && description.position === 'invisible') {
        descriptionClasses.push('sr-only');
      }
      if (description.content && description.position === 'before') {
        output += '<p class="' + descriptionClasses.join(' ') + '">' + description.content + '</p>';
      }
      output += body;
      if (description.content && (description.position === 'after' || description.position === 'invisible')) {
        output += '<p class="' + descriptionClasses.join(' ') + '">' + description.content + '</p>';
      }
      output += '</div>';
      return output;
    },

    /**
     * Theme function for a Bootstrap Modal close button.
     *
     * @return {string}
     *   The HTML for the modal close button.
     */
    bootstrapModalClose: function () {
      return '<button type="button" class="close" data-dismiss="modal" aria-label="' + Drupal.t('Close') + '"><span aria-hidden="true">&times;</span></button>';
    },

    /**
     * Theme function for a Bootstrap Modal footer.
     *
     * @param {string} [footer]
     *   The HTML markup to place in the footer.
     * @param {boolean} [force]
     *   Flag to force the rendering of the footer.
     *
     * @return {string}
     *   The HTML for the modal footer.
     */
    bootstrapModalFooter: function (footer, force) {
      return footer || force ? '<div class="modal-footer">' + (footer || '') + '</div>' : '';
    },

    /**
     * Theme function for a Bootstrap Modal header.
     *
     * @param {string} [title]
     *   The title for the header.
     * @param {boolean} [closeButton]
     *   Flag indicating whether or not to show the close button in the header.
     *
     * @return {string}
     *   The HTML for the modal header.
     */
    bootstrapModalHeader: function (title, closeButton) {
      var output = '';
      if (title) {
        closeButton = closeButton !== void(0) ? closeButton : true;
        output += '<div class="modal-header">';
        if (closeButton) {
          output += Drupal.theme.bootstrapModalClose();
        }
        output += '<h4 class="modal-title">' + Drupal.checkPlain(title) + '</h4>';
        output += '</div>';
      }
      return output;
    }
  })

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        triggerAutoclose: !!settings.popover_trigger_autoclose,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context) {

      // Popover autoclose.
      if ($.fn.popover.Constructor.DEFAULTS.triggerAutoclose) {
        var $currentPopover = null;
        $(document)
          .on('show.bs.popover', '[data-toggle=popover]', function () {
            var $trigger = $(this);
            var popover = $trigger.data('bs.popover');

            // Only keep track of clicked triggers that we're manually handling.
            if (popover.options.originalTrigger === 'click') {
              if ($currentPopover && !$currentPopover.is($trigger)) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $trigger;
            }
          })
          .on('click', function (e) {
            var $target = $(e.target);
            var popover = $target.is('[data-toggle=popover]') && $target.data('bs.popover');
            if ($currentPopover && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
              $currentPopover.popover('hide');
              $currentPopover = null;
            }
          })
        ;
      }

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var $target = $(options.target || $element.is('a[href^="#"]') && $element.attr('href')).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
;
;
;
/**
 * @file
 * Attaches behaviors for Drupal's active link marking.
 */

(function (Drupal, drupalSettings) {

  'use strict';

  /**
   * Append is-active class.
   *
   * The link is only active if its path corresponds to the current path, the
   * language of the linked path is equal to the current language, and if the
   * query parameters of the link equal those of the current request, since the
   * same request with different query parameters may yield a different page
   * (e.g. pagers, exposed View filters).
   *
   * Does not discriminate based on element type, so allows you to set the
   * is-active class on any element: a, li…
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.activeLinks = {
    attach: function (context) {
      // Start by finding all potentially active links.
      var path = drupalSettings.path;
      var queryString = JSON.stringify(path.currentQuery);
      var querySelector = path.currentQuery ? "[data-drupal-link-query='" + queryString + "']" : ':not([data-drupal-link-query])';
      var originalSelectors = ['[data-drupal-link-system-path="' + path.currentPath + '"]'];
      var selectors;

      // If this is the front page, we have to check for the <front> path as
      // well.
      if (path.isFront) {
        originalSelectors.push('[data-drupal-link-system-path="<front>"]');
      }

      // Add language filtering.
      selectors = [].concat(
        // Links without any hreflang attributes (most of them).
        originalSelectors.map(function (selector) { return selector + ':not([hreflang])'; }),
        // Links with hreflang equals to the current language.
        originalSelectors.map(function (selector) { return selector + '[hreflang="' + path.currentLanguage + '"]'; })
      );

      // Add query string selector for pagers, exposed filters.
      selectors = selectors.map(function (current) { return current + querySelector; });

      // Query the DOM.
      var activeLinks = context.querySelectorAll(selectors.join(','));
      var il = activeLinks.length;
      for (var i = 0; i < il; i++) {
        activeLinks[i].classList.add('is-active');
      }
    },
    detach: function (context, settings, trigger) {
      if (trigger === 'unload') {
        var activeLinks = context.querySelectorAll('[data-drupal-link-system-path].is-active');
        var il = activeLinks.length;
        for (var i = 0; i < il; i++) {
          activeLinks[i].classList.remove('is-active');
        }
      }
    }
  };

})(Drupal, drupalSettings);
;
/**
 * @file
 * Bootstrap Popovers.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Popover plugin constructor class.
   */
  Bootstrap.extendPlugin('popover', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.popover_animation,
        html: !!settings.popover_html,
        placement: settings.popover_placement,
        selector: settings.popover_selector,
        trigger: settings.popover_trigger,
        triggerAutoclose: !!settings.popover_trigger_autoclose,
        title: settings.popover_title,
        content: settings.popover_content,
        delay: parseInt(settings.popover_delay, 10),
        container: settings.popover_container
      }
    };
  });

  /**
   * Bootstrap Popovers.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context) {

      // Popover autoclose.
      if ($.fn.popover.Constructor.DEFAULTS.triggerAutoclose) {
        var $currentPopover = null;
        $(document)
          .on('show.bs.popover', '[data-toggle=popover]', function () {
            var $trigger = $(this);
            var popover = $trigger.data('bs.popover');

            // Only keep track of clicked triggers that we're manually handling.
            if (popover.options.originalTrigger === 'click') {
              if ($currentPopover && !$currentPopover.is($trigger)) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $trigger;
            }
          })
          .on('click', function (e) {
            var $target = $(e.target);
            var popover = $target.is('[data-toggle=popover]') && $target.data('bs.popover');
            if ($currentPopover && !$target.is('[data-toggle=popover]') && !$target.closest('.popover.in')[0]) {
              $currentPopover.popover('hide');
              $currentPopover = null;
            }
          })
        ;
      }

      var elements = $(context).find('[data-toggle=popover]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.popover.Constructor.DEFAULTS, $element.data());

        // Store the original trigger.
        options.originalTrigger = options.trigger;

        // If the trigger is "click", then we'll handle it manually here.
        if (options.trigger === 'click') {
          options.trigger = 'manual';
        }

        // Retrieve content from a target element.
        var $target = $(options.target || $element.is('a[href^="#"]') && $element.attr('href')).clone();
        if (!options.content && $target[0]) {
          $target.removeClass('visually-hidden hidden').removeAttr('aria-hidden');
          options.content = $target.wrap('<div/>').parent()[options.html ? 'html' : 'text']() || '';
        }

        // Initialize the popover.
        $element.popover(options);

        // Handle clicks manually.
        if (options.originalTrigger === 'click') {
          // To ensure the element is bound multiple times, remove any
          // previously set event handler before adding another one.
          $element
            .off('click.drupal.bootstrap.popover')
            .on('click.drupal.bootstrap.popover', function (e) {
              $(this).popover('toggle');
              e.preventDefault();
              e.stopPropagation();
            })
          ;
        }
      }
    },
    detach: function (context) {
      // Destroy all popovers.
      $(context).find('[data-toggle="popover"]')
        .off('click.drupal.bootstrap.popover')
        .popover('destroy')
      ;
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Bootstrap Tooltips.
 */

var Drupal = Drupal || {};

(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Tooltip plugin constructor class.
   */
  Bootstrap.extendPlugin('tooltip', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.tooltip_animation,
        html: !!settings.tooltip_html,
        placement: settings.tooltip_placement,
        selector: settings.tooltip_selector,
        trigger: settings.tooltip_trigger,
        delay: parseInt(settings.tooltip_delay, 10),
        container: settings.tooltip_container
      }
    };
  });

  /**
   * Bootstrap Tooltips.
   *
   * @todo This should really be properly delegated if selector option is set.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context) {
      var elements = $(context).find('[data-toggle="tooltip"]').toArray();
      for (var i = 0; i < elements.length; i++) {
        var $element = $(elements[i]);
        var options = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, $element.data());
        $element.tooltip(options);
      }
    },
    detach: function (context) {
      // Destroy all tooltips.
      $(context).find('[data-toggle="tooltip"]').tooltip('destroy');
    }
  };

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Adapted from underscore.js with the addition Drupal namespace.
 */

/**
 * Limits the invocations of a function in a given time frame.
 *
 * The debounce function wrapper should be used sparingly. One clear use case
 * is limiting the invocation of a callback attached to the window resize event.
 *
 * Before using the debounce function wrapper, consider first whether the
 * callback could be attached to an event that fires less frequently or if the
 * function can be written in such a way that it is only invoked under specific
 * conditions.
 *
 * @param {function} func
 *   The function to be invoked.
 * @param {number} wait
 *   The time period within which the callback function should only be
 *   invoked once. For example if the wait period is 250ms, then the callback
 *   will only be called at most 4 times per second.
 * @param {bool} immediate
 *   Whether we wait at the beginning or end to execute the function.
 *
 * @return {function}
 *   The debounced function.
 */
Drupal.debounce = function (func, wait, immediate) {

  'use strict';

  var timeout;
  var result;
  return function () {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};
;
/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});;
/**
 * @file
 * Form features.
 */

/**
 * Triggers when a value in the form changed.
 *
 * The event triggers when content is typed or pasted in a text field, before
 * the change event triggers.
 *
 * @event formUpdated
 */

(function ($, Drupal, debounce) {

  'use strict';

  /**
   * Retrieves the summary for the first element.
   *
   * @return {string}
   *   The text of the summary.
   */
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return (this[0] && callback) ? $.trim(callback(this[0])) : '';
  };

  /**
   * Sets the summary for all matched elements.
   *
   * @param {function} callback
   *   Either a function that will be called each time the summary is
   *   retrieved or a string (which is returned each time).
   *
   * @return {jQuery}
   *   jQuery collection of the current element.
   *
   * @fires event:summaryUpdated
   *
   * @listens event:formUpdated
   */
  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    // To facilitate things, the callback should always be a function. If it's
    // not, we wrap it into an anonymous function which just returns the value.
    if (typeof callback !== 'function') {
      var val = callback;
      callback = function () { return val; };
    }

    return this
      .data('summaryCallback', callback)
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .off('formUpdated.summary')
      .on('formUpdated.summary', function () {
        self.trigger('summaryUpdated');
      })
      // The actual summaryUpdated handler doesn't fire when the callback is
      // changed, so we have to do this manually.
      .trigger('summaryUpdated');
  };

  /**
   * Prevents consecutive form submissions of identical form values.
   *
   * Repetitive form submissions that would submit the identical form values
   * are prevented, unless the form values are different to the previously
   * submitted values.
   *
   * This is a simplified re-implementation of a user-agent behavior that
   * should be natively supported by major web browsers, but at this time, only
   * Firefox has a built-in protection.
   *
   * A form value-based approach ensures that the constraint is triggered for
   * consecutive, identical form submissions only. Compared to that, a form
   * button-based approach would (1) rely on [visible] buttons to exist where
   * technically not required and (2) require more complex state management if
   * there are multiple buttons in a form.
   *
   * This implementation is based on form-level submit events only and relies
   * on jQuery's serialize() method to determine submitted form values. As such,
   * the following limitations exist:
   *
   * - Event handlers on form buttons that preventDefault() do not receive a
   *   double-submit protection. That is deemed to be fine, since such button
   *   events typically trigger reversible client-side or server-side
   *   operations that are local to the context of a form only.
   * - Changed values in advanced form controls, such as file inputs, are not
   *   part of the form values being compared between consecutive form submits
   *   (due to limitations of jQuery.serialize()). That is deemed to be
   *   acceptable, because if the user forgot to attach a file, then the size of
   *   HTTP payload will most likely be small enough to be fully passed to the
   *   server endpoint within (milli)seconds. If a user mistakenly attached a
   *   wrong file and is technically versed enough to cancel the form submission
   *   (and HTTP payload) in order to attach a different file, then that
   *   edge-case is not supported here.
   *
   * Lastly, all forms submitted via HTTP GET are idempotent by definition of
   * HTTP standards, so excluded in this implementation.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.formSingleSubmit = {
    attach: function () {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');
        if (previousValues === formValues) {
          e.preventDefault();
        }
        else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $('body').once('form-single-submit')
        .on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  /**
   * Sends a 'formUpdated' event each time a form element is modified.
   *
   * @param {HTMLElement} element
   *   The element to trigger a form updated event on.
   *
   * @fires event:formUpdated
   */
  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  /**
   * Collects the IDs of all form fields in the given form.
   *
   * @param {HTMLFormElement} form
   *   The form element to search.
   *
   * @return {Array}
   *   Array of IDs for form fields.
   */
  function fieldsList(form) {
    var $fieldList = $(form).find('[name]').map(function (index, element) {
      // We use id to avoid name duplicates on radio fields and filter out
      // elements with a name but no id.
      return element.getAttribute('id');
    });
    // Return a true array.
    return $.makeArray($fieldList);
  }

  /**
   * Triggers the 'formUpdated' event on form elements when they are modified.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches formUpdated behaviors.
   * @prop {Drupal~behaviorDetach} detach
   *   Detaches formUpdated behaviors.
   *
   * @fires event:formUpdated
   */
  Drupal.behaviors.formUpdated = {
    attach: function (context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = (contextIsForm ? $context : $context.find('form')).once('form-updated');
      var formFields;

      if ($forms.length) {
        // Initialize form behaviors, use $.makeArray to be able to use native
        // forEach array method and have the callback parameters in the right
        // order.
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) { triggerFormUpdated(event.target); }, 300);
          formFields = fieldsList(form).join(',');

          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }
      // On ajax requests context is the form element.
      if (contextIsForm) {
        formFields = fieldsList(context).join(',');
        // @todo replace with form.getAttribute() when #1979468 is in.
        var currentFields = $(context).attr('data-drupal-form-fields');
        // If there has been a change in the fields or their order, trigger
        // formUpdated.
        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }

    },
    detach: function (context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      if (trigger === 'unload') {
        var $forms = (contextIsForm ? $context : $context.find('form')).removeOnce('form-updated');
        if ($forms.length) {
          $.makeArray($forms).forEach(function (form) {
            form.removeAttribute('data-drupal-form-fields');
            $(form).off('.formUpdated');
          });
        }
      }
    }
  };

  /**
   * Prepopulate form fields with information from the visitor browser.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches the behavior for filling user info from browser.
   */
  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function (context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $('[data-user-info-from-browser]').once('user-info-from-browser');
      if ($forms.length) {
        userInfo.map(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          var browserData = localStorage.getItem('Drupal.visitor.' + info);
          var emptyOrDefault = ($element.val() === '' || ($element.attr('data-drupal-default-value') === $element.val()));
          if ($element.length && emptyOrDefault && browserData) {
            $element.val(browserData);
          }
        });
      }
      $forms.on('submit', function () {
        userInfo.map(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          if ($element.length) {
            localStorage.setItem('Drupal.visitor.' + info, $element.val());
          }
        });
      });
    }
  };

})(jQuery, Drupal, Drupal.debounce);
;
/**
 * @file
 * Extends methods from core/misc/form.js.
 */

(function ($, window, Drupal, drupalSettings) {

  /**
   * Behavior for "forms_has_error_value_toggle" theme setting.
   */
  Drupal.behaviors.bootstrapForm = {
    attach: function (context) {
      if (drupalSettings.bootstrap && drupalSettings.bootstrap.forms_has_error_value_toggle) {
        var $context = $(context);
        $context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error').each(function () {
          var $formItem = $(this);
          var $input = $formItem.find(':input');
          $input.on('keyup focus blur', function () {
            if (this.defaultValue !== void 0) {
              $formItem[this.defaultValue !== this.value ? 'addClass' : 'addClass']('has-error');
              $input[this.defaultValue !== this.value ? 'addClass' : 'removeClass']('error');
            }
          });
        });
      }
    }
  };


})(jQuery, this, Drupal, drupalSettings);
;
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());
;
/**
 * @file
 * Overrides core/misc/vertical-tabs.js.
 */

(function ($, window, Drupal, drupalSettings) {
  "use strict";

  /**
   * This script transforms a set of details into a stack of vertical
   * tabs. Another tab pane can be selected by clicking on the respective
   * tab.
   *
   * Each tab may have a summary which can be updated by another
   * script. For that to work, each details element has an associated
   * 'verticalTabCallback' (with jQuery.data() attached to the details),
   * which is called every time the user performs an update to a form
   * element inside the tab pane.
   */
  Drupal.behaviors.verticalTabs = {
    attach: function (context) {
      var width = drupalSettings.widthBreakpoint || 640;
      var mq = '(max-width: ' + width + 'px)';

      if (window.matchMedia(mq).matches) {
        return;
      }

      $(context).find('[data-vertical-tabs-panes]').once('vertical-tabs').each(function () {
        var $this = $(this).addClass('tab-content vertical-tabs-panes');

        var focusID = $(':hidden.vertical-tabs__active-tab', this).val();
        if (typeof focusID === 'undefined' || !focusID.length) {
          focusID = false;
        }
        var tab_focus;

        // Check if there are some details that can be converted to vertical-tabs
        var $details = $this.find('> .panel');
        if ($details.length === 0) {
          return;
        }

        // Create the tab column.
        var tab_list = $('<ul class="nav nav-tabs vertical-tabs-list"></ul>');
        $this.wrap('<div class="tabbable tabs-left vertical-tabs clearfix"></div>').before(tab_list);

        // Transform each details into a tab.
        $details.each(function () {
          var $that = $(this);
          var vertical_tab = new Drupal.verticalTab({
            title: $that.find('> .panel-heading > .panel-title, > .panel-heading').last().html(),
            details: $that
          });
          tab_list.append(vertical_tab.item);
          $that
            .removeClass('collapsed')
            // prop() can't be used on browsers not supporting details element,
            // the style won't apply to them if prop() is used.
            .attr('open', true)
            .removeClass('collapsible collapsed panel panel-default')
            .addClass('tab-pane vertical-tabs-pane')
            .data('verticalTab', vertical_tab)
            .find('> .panel-heading').remove();
          if (this.id === focusID) {
            tab_focus = $that;
          }
        });

        $(tab_list).find('> li:first').addClass('first');
        $(tab_list).find('> li:last').addClass('last');

        if (!tab_focus) {
          // If the current URL has a fragment and one of the tabs contains an
          // element that matches the URL fragment, activate that tab.
          var $locationHash = $this.find(window.location.hash);
          if (window.location.hash && $locationHash.length) {
            tab_focus = $locationHash.closest('.vertical-tabs-pane');
          }
          else {
            tab_focus = $this.find('> .vertical-tabs-pane:first');
          }
        }
        if (tab_focus.length) {
          tab_focus.data('verticalTab').focus();
        }
      });

      // Provide some Bootstrap tab/Drupal integration.
      // @todo merge this into the above code from core.
      $(context).find('.tabbable').once('bootstrap-tabs').each(function () {
        var $wrapper = $(this);
        var $tabs = $wrapper.find('.nav-tabs');
        var $content = $wrapper.find('.tab-content');
        var borderRadius = parseInt($content.css('borderBottomRightRadius'), 10);
        var bootstrapTabResize = function() {
          if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
            $content.css('min-height', $tabs.outerHeight());
          }
        };
        // Add min-height on content for left and right tabs.
        bootstrapTabResize();
        // Detect tab switch.
        if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
          $tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            bootstrapTabResize();
            if ($wrapper.hasClass('tabs-left')) {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopLeftRadius', '0');
              }
              else {
                $content.css('borderTopLeftRadius', borderRadius + 'px');
              }
            }
            else {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopRightRadius', '0');
              }
              else {
                $content.css('borderTopRightRadius', borderRadius + 'px');
              }
            }
          });
        }
      });
    }
  };

  /**
   * The vertical tab object represents a single tab within a tab group.
   *
   * @param settings
   *   An object with the following keys:
   *   - title: The name of the tab.
   *   - details: The jQuery object of the details element that is the tab pane.
   */
  Drupal.verticalTab = function (settings) {
    var self = this;
    $.extend(this, settings, Drupal.theme('verticalTab', settings));

    this.link.attr('href', '#' + settings.details.attr('id'));

    this.link.on('click', function (e) {
      e.preventDefault();
      self.focus();
    });

    // Keyboard events added:
    // Pressing the Enter key will open the tab pane.
    this.link.on('keydown', function (event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        self.focus();
        // Set focus on the first input field of the visible details/tab pane.
        $(".vertical-tabs-pane :input:visible:enabled:first").trigger('focus');
      }
    });

    this.details
      .on('summaryUpdated', function () {
        self.updateSummary();
      })
      .trigger('summaryUpdated');
  };

  Drupal.verticalTab.prototype = {
    /**
     * Displays the tab's content pane.
     */
    focus: function () {
      this.details
        .siblings('.vertical-tabs-pane')
        .each(function () {
          $(this).removeClass('active').find('> div').removeClass('in');
          var tab = $(this).data('verticalTab');
          tab.item.removeClass('selected');
        })
        .end()
        .addClass('active')
        .siblings(':hidden.vertical-tabs-active-tab')
        .val(this.details.attr('id'));
      this.details.find('> div').addClass('in');
      this.details.data('verticalTab').item.find('a').tab('show');
      this.item.addClass('selected');
      // Mark the active tab for screen readers.
      $('#active-vertical-tab').remove();
      this.link.append('<span id="active-vertical-tab" class="visually-hidden">' + Drupal.t('(active tab)') + '</span>');
    },

    /**
     * Updates the tab's summary.
     */
    updateSummary: function () {
      this.summary.html(this.details.drupalGetSummary());
    },

    /**
     * Shows a vertical tab pane.
     */
    tabShow: function () {
      // Display the tab.
      this.item.show();
      // Show the vertical tabs.
      this.item.closest('.form-type-vertical-tabs').show();
      // Update .first marker for items. We need recurse from parent to retain the
      // actual DOM element order as jQuery implements sortOrder, but not as public
      // method.
      this.item.parent().children('.vertical-tab-button').removeClass('first')
        .filter(':visible:first').addClass('first');
      // Display the details element.
      this.details.removeClass('vertical-tab-hidden').show();
      // Focus this tab.
      this.focus();
      return this;
    },

    /**
     * Hides a vertical tab pane.
     */
    tabHide: function () {
      // Hide this tab.
      this.item.hide();
      // Update .first marker for items. We need recurse from parent to retain the
      // actual DOM element order as jQuery implements sortOrder, but not as public
      // method.
      this.item.parent().children('.vertical-tab-button').removeClass('first')
        .filter(':visible:first').addClass('first');
      // Hide the details element.
      this.details.addClass('vertical-tab-hidden').hide();
      // Focus the first visible tab (if there is one).
      var $firstTab = this.details.siblings('.vertical-tabs-pane:not(.vertical-tab-hidden):first');
      if ($firstTab.length) {
        $firstTab.data('verticalTab').focus();
      }
      // Hide the vertical tabs (if no tabs remain).
      else {
        this.item.closest('.form-type-vertical-tabs').hide();
      }
      return this;
    }
  };

  /**
   * Theme function for a vertical tab.
   *
   * @param settings
   *   An object with the following keys:
   *   - title: The name of the tab.
   * @return
   *   This function has to return an object with at least these keys:
   *   - item: The root tab jQuery element
   *   - link: The anchor tag that acts as the clickable area of the tab
   *       (jQuery version)
   *   - summary: The jQuery element that contains the tab summary
   */
  Drupal.theme.verticalTab = function (settings) {
    var tab = {};
    tab.item = $('<li class="vertical-tab-button" tabindex="-1"></li>')
      .append(tab.link = $('<a href="#' + settings.details[0].id + '" data-toggle="tab"></a>')
        .append(tab.title = $('<span></span>').html(settings.title))
        .append(tab.summary = $('<div class="summary"></div>')
      )
    );
    return tab;
  };

})(jQuery, this, Drupal, drupalSettings);
;
/**
 * @file
 * Defines Javascript behaviors for the block_content module.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Sets summaries about revision and translation of entities.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches summary behaviour entity form tabs.
   *
   *   Specifically, it updates summaries to the revision information and the
   *   translation options.
   */
  Drupal.behaviors.entityContentDetailsSummaries = {
    attach: function (context) {
      var $context = $(context);
      $context.find('.entity-content-form-revision-information').drupalSetSummary(function (context) {
        var $revisionContext = $(context);
        var revisionCheckbox = $revisionContext.find('.js-form-item-revision input');

        // Return 'New revision' if the 'Create new revision' checkbox is checked,
        // or if the checkbox doesn't exist, but the revision log does. For users
        // without the "Administer content" permission the checkbox won't appear,
        // but the revision log will if the content type is set to auto-revision.
        if (revisionCheckbox.is(':checked') || (!revisionCheckbox.length && $revisionContext.find('.js-form-item-revision-log textarea').length)) {
          return Drupal.t('New revision');
        }

        return Drupal.t('No revision');
      });

      $context.find('details.entity-translation-options').drupalSetSummary(function (context) {
        var $translationContext = $(context);
        var translate;
        var $checkbox = $translationContext.find('.js-form-item-translation-translate input');

        if ($checkbox.length) {
          translate = $checkbox.is(':checked') ? Drupal.t('Needs to be updated') : Drupal.t('Does not need to be updated');
        }
        else {
          $checkbox = $translationContext.find('.js-form-item-translation-retranslate input');
          translate = $checkbox.is(':checked') ? Drupal.t('Flag other translations as outdated') : Drupal.t('Do not flag other translations as outdated');
        }

        return translate;
      });
    }
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Defines Javascript behaviors for the node module.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Behaviors for tabs in the node edit form.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches summary behavior for tabs in the node edit form.
   */
  Drupal.behaviors.nodeDetailsSummaries = {
    attach: function (context) {
      var $context = $(context);

      $context.find('.node-form-author').drupalSetSummary(function (context) {
        var $authorContext = $(context);
        var name = $authorContext.find('.field--name-uid input').val();
        var date = $authorContext.find('.field--name-created input').val();

        if (name && date) {
          return Drupal.t('By @name on @date', {'@name': name, '@date': date});
        }
        else if (name) {
          return Drupal.t('By @name', {'@name': name});
        }
        else if (date) {
          return Drupal.t('Authored on @date', {'@date': date});
        }
      });

      $context.find('.node-form-options').drupalSetSummary(function (context) {
        var $optionsContext = $(context);
        var vals = [];

        if ($optionsContext.find('input').is(':checked')) {
          $optionsContext.find('input:checked').next('label').each(function () {
            vals.push(Drupal.checkPlain($.trim($(this).text())));
          });
          return vals.join(', ');
        }
        else {
          return Drupal.t('Not promoted');
        }
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Drupal's states library.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * The base States namespace.
   *
   * Having the local states variable allows us to use the States namespace
   * without having to always declare "Drupal.states".
   *
   * @namespace Drupal.states
   */
  var states = Drupal.states = {

    /**
     * An array of functions that should be postponed.
     */
    postponed: []
  };

  /**
   * Attaches the states.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches states behaviors.
   */
  Drupal.behaviors.states = {
    attach: function (context, settings) {
      var $states = $(context).find('[data-drupal-states]');
      var config;
      var state;
      var il = $states.length;
      for (var i = 0; i < il; i++) {
        config = JSON.parse($states[i].getAttribute('data-drupal-states'));
        for (state in config) {
          if (config.hasOwnProperty(state)) {
            new states.Dependent({
              element: $($states[i]),
              state: states.State.sanitize(state),
              constraints: config[state]
            });
          }
        }
      }

      // Execute all postponed functions now.
      while (states.postponed.length) {
        (states.postponed.shift())();
      }
    }
  };

  /**
   * Object representing an element that depends on other elements.
   *
   * @constructor Drupal.states.Dependent
   *
   * @param {object} args
   *   Object with the following keys (all of which are required)
   * @param {jQuery} args.element
   *   A jQuery object of the dependent element
   * @param {Drupal.states.State} args.state
   *   A State object describing the state that is dependent
   * @param {object} args.constraints
   *   An object with dependency specifications. Lists all elements that this
   *   element depends on. It can be nested and can contain
   *   arbitrary AND and OR clauses.
   */
  states.Dependent = function (args) {
    $.extend(this, {values: {}, oldValue: null}, args);

    this.dependees = this.getDependees();
    for (var selector in this.dependees) {
      if (this.dependees.hasOwnProperty(selector)) {
        this.initializeDependee(selector, this.dependees[selector]);
      }
    }
  };

  /**
   * Comparison functions for comparing the value of an element with the
   * specification from the dependency settings. If the object type can't be
   * found in this list, the === operator is used by default.
   *
   * @name Drupal.states.Dependent.comparisons
   *
   * @prop {function} RegExp
   * @prop {function} Function
   * @prop {function} Number
   */
  states.Dependent.comparisons = {
    RegExp: function (reference, value) {
      return reference.test(value);
    },
    Function: function (reference, value) {
      // The "reference" variable is a comparison function.
      return reference(value);
    },
    Number: function (reference, value) {
      // If "reference" is a number and "value" is a string, then cast
      // reference as a string before applying the strict comparison in
      // compare().
      // Otherwise numeric keys in the form's #states array fail to match
      // string values returned from jQuery's val().
      return (typeof value === 'string') ? compare(reference.toString(), value) : compare(reference, value);
    }
  };

  states.Dependent.prototype = {

    /**
     * Initializes one of the elements this dependent depends on.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @param {string} selector
     *   The CSS selector describing the dependee.
     * @param {object} dependeeStates
     *   The list of states that have to be monitored for tracking the
     *   dependee's compliance status.
     */
    initializeDependee: function (selector, dependeeStates) {
      var state;
      var self = this;

      function stateEventHandler(e) {
        self.update(e.data.selector, e.data.state, e.value);
      }

      // Cache for the states of this dependee.
      this.values[selector] = {};

      for (var i in dependeeStates) {
        if (dependeeStates.hasOwnProperty(i)) {
          state = dependeeStates[i];
          // Make sure we're not initializing this selector/state combination
          // twice.
          if ($.inArray(state, dependeeStates) === -1) {
            continue;
          }

          state = states.State.sanitize(state);

          // Initialize the value of this state.
          this.values[selector][state.name] = null;

          // Monitor state changes of the specified state for this dependee.
          $(selector).on('state:' + state, {selector: selector, state: state}, stateEventHandler);

          // Make sure the event we just bound ourselves to is actually fired.
          new states.Trigger({selector: selector, state: state});
        }
      }
    },

    /**
     * Compares a value with a reference value.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @param {object} reference
     *   The value used for reference.
     * @param {string} selector
     *   CSS selector describing the dependee.
     * @param {Drupal.states.State} state
     *   A State object describing the dependee's updated state.
     *
     * @return {bool}
     *   true or false.
     */
    compare: function (reference, selector, state) {
      var value = this.values[selector][state.name];
      if (reference.constructor.name in states.Dependent.comparisons) {
        // Use a custom compare function for certain reference value types.
        return states.Dependent.comparisons[reference.constructor.name](reference, value);
      }
      else {
        // Do a plain comparison otherwise.
        return compare(reference, value);
      }
    },

    /**
     * Update the value of a dependee's state.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @param {string} selector
     *   CSS selector describing the dependee.
     * @param {Drupal.states.state} state
     *   A State object describing the dependee's updated state.
     * @param {string} value
     *   The new value for the dependee's updated state.
     */
    update: function (selector, state, value) {
      // Only act when the 'new' value is actually new.
      if (value !== this.values[selector][state.name]) {
        this.values[selector][state.name] = value;
        this.reevaluate();
      }
    },

    /**
     * Triggers change events in case a state changed.
     *
     * @memberof Drupal.states.Dependent#
     */
    reevaluate: function () {
      // Check whether any constraint for this dependent state is satisfied.
      var value = this.verifyConstraints(this.constraints);

      // Only invoke a state change event when the value actually changed.
      if (value !== this.oldValue) {
        // Store the new value so that we can compare later whether the value
        // actually changed.
        this.oldValue = value;

        // Normalize the value to match the normalized state name.
        value = invert(value, this.state.invert);

        // By adding "trigger: true", we ensure that state changes don't go into
        // infinite loops.
        this.element.trigger({type: 'state:' + this.state, value: value, trigger: true});
      }
    },

    /**
     * Evaluates child constraints to determine if a constraint is satisfied.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @param {object|Array} constraints
     *   A constraint object or an array of constraints.
     * @param {string} selector
     *   The selector for these constraints. If undefined, there isn't yet a
     *   selector that these constraints apply to. In that case, the keys of the
     *   object are interpreted as the selector if encountered.
     *
     * @return {bool}
     *   true or false, depending on whether these constraints are satisfied.
     */
    verifyConstraints: function (constraints, selector) {
      var result;
      if ($.isArray(constraints)) {
        // This constraint is an array (OR or XOR).
        var hasXor = $.inArray('xor', constraints) === -1;
        var len = constraints.length;
        for (var i = 0; i < len; i++) {
          if (constraints[i] !== 'xor') {
            var constraint = this.checkConstraints(constraints[i], selector, i);
            // Return if this is OR and we have a satisfied constraint or if
            // this is XOR and we have a second satisfied constraint.
            if (constraint && (hasXor || result)) {
              return hasXor;
            }
            result = result || constraint;
          }
        }
      }
      // Make sure we don't try to iterate over things other than objects. This
      // shouldn't normally occur, but in case the condition definition is
      // bogus, we don't want to end up with an infinite loop.
      else if ($.isPlainObject(constraints)) {
        // This constraint is an object (AND).
        for (var n in constraints) {
          if (constraints.hasOwnProperty(n)) {
            result = ternary(result, this.checkConstraints(constraints[n], selector, n));
            // False and anything else will evaluate to false, so return when
            // any false condition is found.
            if (result === false) { return false; }
          }
        }
      }
      return result;
    },

    /**
     * Checks whether the value matches the requirements for this constraint.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @param {string|Array|object} value
     *   Either the value of a state or an array/object of constraints. In the
     *   latter case, resolving the constraint continues.
     * @param {string} [selector]
     *   The selector for this constraint. If undefined, there isn't yet a
     *   selector that this constraint applies to. In that case, the state key
     *   is propagates to a selector and resolving continues.
     * @param {Drupal.states.State} [state]
     *   The state to check for this constraint. If undefined, resolving
     *   continues. If both selector and state aren't undefined and valid
     *   non-numeric strings, a lookup for the actual value of that selector's
     *   state is performed. This parameter is not a State object but a pristine
     *   state string.
     *
     * @return {bool}
     *   true or false, depending on whether this constraint is satisfied.
     */
    checkConstraints: function (value, selector, state) {
      // Normalize the last parameter. If it's non-numeric, we treat it either
      // as a selector (in case there isn't one yet) or as a trigger/state.
      if (typeof state !== 'string' || (/[0-9]/).test(state[0])) {
        state = null;
      }
      else if (typeof selector === 'undefined') {
        // Propagate the state to the selector when there isn't one yet.
        selector = state;
        state = null;
      }

      if (state !== null) {
        // Constraints is the actual constraints of an element to check for.
        state = states.State.sanitize(state);
        return invert(this.compare(value, selector, state), state.invert);
      }
      else {
        // Resolve this constraint as an AND/OR operator.
        return this.verifyConstraints(value, selector);
      }
    },

    /**
     * Gathers information about all required triggers.
     *
     * @memberof Drupal.states.Dependent#
     *
     * @return {object}
     *   An object describing the required triggers.
     */
    getDependees: function () {
      var cache = {};
      // Swivel the lookup function so that we can record all available
      // selector- state combinations for initialization.
      var _compare = this.compare;
      this.compare = function (reference, selector, state) {
        (cache[selector] || (cache[selector] = [])).push(state.name);
        // Return nothing (=== undefined) so that the constraint loops are not
        // broken.
      };

      // This call doesn't actually verify anything but uses the resolving
      // mechanism to go through the constraints array, trying to look up each
      // value. Since we swivelled the compare function, this comparison returns
      // undefined and lookup continues until the very end. Instead of lookup up
      // the value, we record that combination of selector and state so that we
      // can initialize all triggers.
      this.verifyConstraints(this.constraints);
      // Restore the original function.
      this.compare = _compare;

      return cache;
    }
  };

  /**
   * @constructor Drupal.states.Trigger
   *
   * @param {object} args
   *   Trigger arguments.
   */
  states.Trigger = function (args) {
    $.extend(this, args);

    if (this.state in states.Trigger.states) {
      this.element = $(this.selector);

      // Only call the trigger initializer when it wasn't yet attached to this
      // element. Otherwise we'd end up with duplicate events.
      if (!this.element.data('trigger:' + this.state)) {
        this.initialize();
      }
    }
  };

  states.Trigger.prototype = {

    /**
     * @memberof Drupal.states.Trigger#
     */
    initialize: function () {
      var trigger = states.Trigger.states[this.state];

      if (typeof trigger === 'function') {
        // We have a custom trigger initialization function.
        trigger.call(window, this.element);
      }
      else {
        for (var event in trigger) {
          if (trigger.hasOwnProperty(event)) {
            this.defaultTrigger(event, trigger[event]);
          }
        }
      }

      // Mark this trigger as initialized for this element.
      this.element.data('trigger:' + this.state, true);
    },

    /**
     * @memberof Drupal.states.Trigger#
     *
     * @param {jQuery.Event} event
     *   The event triggered.
     * @param {function} valueFn
     *   The function to call.
     */
    defaultTrigger: function (event, valueFn) {
      var oldValue = valueFn.call(this.element);

      // Attach the event callback.
      this.element.on(event, $.proxy(function (e) {
        var value = valueFn.call(this.element, e);
        // Only trigger the event if the value has actually changed.
        if (oldValue !== value) {
          this.element.trigger({type: 'state:' + this.state, value: value, oldValue: oldValue});
          oldValue = value;
        }
      }, this));

      states.postponed.push($.proxy(function () {
        // Trigger the event once for initialization purposes.
        this.element.trigger({type: 'state:' + this.state, value: oldValue, oldValue: null});
      }, this));
    }
  };

  /**
   * This list of states contains functions that are used to monitor the state
   * of an element. Whenever an element depends on the state of another element,
   * one of these trigger functions is added to the dependee so that the
   * dependent element can be updated.
   *
   * @name Drupal.states.Trigger.states
   *
   * @prop empty
   * @prop checked
   * @prop value
   * @prop collapsed
   */
  states.Trigger.states = {
    // 'empty' describes the state to be monitored.
    empty: {
      // 'keyup' is the (native DOM) event that we watch for.
      keyup: function () {
        // The function associated with that trigger returns the new value for
        // the state.
        return this.val() === '';
      }
    },

    checked: {
      change: function () {
        // prop() and attr() only takes the first element into account. To
        // support selectors matching multiple checkboxes, iterate over all and
        // return whether any is checked.
        var checked = false;
        this.each(function () {
          // Use prop() here as we want a boolean of the checkbox state.
          // @see http://api.jquery.com/prop/
          checked = $(this).prop('checked');
          // Break the each() loop if this is checked.
          return !checked;
        });
        return checked;
      }
    },

    // For radio buttons, only return the value if the radio button is selected.
    value: {
      keyup: function () {
        // Radio buttons share the same :input[name="key"] selector.
        if (this.length > 1) {
          // Initial checked value of radios is undefined, so we return false.
          return this.filter(':checked').val() || false;
        }
        return this.val();
      },
      change: function () {
        // Radio buttons share the same :input[name="key"] selector.
        if (this.length > 1) {
          // Initial checked value of radios is undefined, so we return false.
          return this.filter(':checked').val() || false;
        }
        return this.val();
      }
    },

    collapsed: {
      collapsed: function (e) {
        return (typeof e !== 'undefined' && 'value' in e) ? e.value : !this.is('[open]');
      }
    }
  };

  /**
   * A state object is used for describing the state and performing aliasing.
   *
   * @constructor Drupal.states.State
   *
   * @param {string} state
   *   The name of the state.
   */
  states.State = function (state) {

    /**
     * Original unresolved name.
     */
    this.pristine = this.name = state;

    // Normalize the state name.
    var process = true;
    do {
      // Iteratively remove exclamation marks and invert the value.
      while (this.name.charAt(0) === '!') {
        this.name = this.name.substring(1);
        this.invert = !this.invert;
      }

      // Replace the state with its normalized name.
      if (this.name in states.State.aliases) {
        this.name = states.State.aliases[this.name];
      }
      else {
        process = false;
      }
    } while (process);
  };

  /**
   * Creates a new State object by sanitizing the passed value.
   *
   * @name Drupal.states.State.sanitize
   *
   * @param {string|Drupal.states.State} state
   *   A state object or the name of a state.
   *
   * @return {Drupal.states.state}
   *   A state object.
   */
  states.State.sanitize = function (state) {
    if (state instanceof states.State) {
      return state;
    }
    else {
      return new states.State(state);
    }
  };

  /**
   * This list of aliases is used to normalize states and associates negated
   * names with their respective inverse state.
   *
   * @name Drupal.states.State.aliases
   */
  states.State.aliases = {
    enabled: '!disabled',
    invisible: '!visible',
    invalid: '!valid',
    untouched: '!touched',
    optional: '!required',
    filled: '!empty',
    unchecked: '!checked',
    irrelevant: '!relevant',
    expanded: '!collapsed',
    open: '!collapsed',
    closed: 'collapsed',
    readwrite: '!readonly'
  };

  states.State.prototype = {

    /**
     * @memberof Drupal.states.State#
     */
    invert: false,

    /**
     * Ensures that just using the state object returns the name.
     *
     * @memberof Drupal.states.State#
     *
     * @return {string}
     *   The name of the state.
     */
    toString: function () {
      return this.name;
    }
  };

  /**
   * Global state change handlers. These are bound to "document" to cover all
   * elements whose state changes. Events sent to elements within the page
   * bubble up to these handlers. We use this system so that themes and modules
   * can override these state change handlers for particular parts of a page.
   */

  var $document = $(document);
  $document.on('state:disabled', function (e) {
    // Only act when this change was triggered by a dependency and not by the
    // element monitoring itself.
    if (e.trigger) {
      $(e.target)
        .prop('disabled', e.value)
        .closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea').prop('disabled', e.value);

      // Note: WebKit nightlies don't reflect that change correctly.
      // See https://bugs.webkit.org/show_bug.cgi?id=23789
    }
  });

  $document.on('state:required', function (e) {
    if (e.trigger) {
      if (e.value) {
        var label = 'label' + (e.target.id ? '[for=' + e.target.id + ']' : '');
        var $label = $(e.target).attr({'required': 'required', 'aria-required': 'aria-required'}).closest('.js-form-item, .js-form-wrapper').find(label);
        // Avoids duplicate required markers on initialization.
        if (!$label.hasClass('js-form-required').length) {
          $label.addClass('js-form-required form-required');
        }
      }
      else {
        $(e.target).removeAttr('required aria-required').closest('.js-form-item, .js-form-wrapper').find('label.js-form-required').removeClass('js-form-required form-required');
      }
    }
  });

  $document.on('state:visible', function (e) {
    if (e.trigger) {
      $(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggle(e.value);
    }
  });

  $document.on('state:checked', function (e) {
    if (e.trigger) {
      $(e.target).prop('checked', e.value);
    }
  });

  $document.on('state:collapsed', function (e) {
    if (e.trigger) {
      if ($(e.target).is('[open]') === e.value) {
        $(e.target).find('> summary').trigger('click');
      }
    }
  });

  /**
   * These are helper functions implementing addition "operators" and don't
   * implement any logic that is particular to states.
   */

  /**
   * Bitwise AND with a third undefined state.
   *
   * @function Drupal.states~ternary
   *
   * @param {*} a
   *   Value a.
   * @param {*} b
   *   Value b
   *
   * @return {bool}
   *   The result.
   */
  function ternary(a, b) {
    if (typeof a === 'undefined') {
      return b;
    }
    else if (typeof b === 'undefined') {
      return a;
    }
    else {
      return a && b;
    }
  }

  /**
   * Inverts a (if it's not undefined) when invertState is true.
   *
   * @function Drupal.states~invert
   *
   * @param {*} a
   *   The value to maybe invert.
   * @param {bool} invertState
   *   Whether to invert state or not.
   *
   * @return {bool}
   *   The result.
   */
  function invert(a, invertState) {
    return (invertState && typeof a !== 'undefined') ? !a : a;
  }

  /**
   * Compares two values while ignoring undefined values.
   *
   * @function Drupal.states~compare
   *
   * @param {*} a
   *   Value a.
   * @param {*} b
   *   Value b.
   *
   * @return {bool}
   *   The comparison result.
   */
  function compare(a, b) {
    if (a === b) {
      return typeof a === 'undefined' ? a : true;
    }
    else {
      return typeof a === 'undefined' || typeof b === 'undefined';
    }
  }

})(jQuery, Drupal);
;
/**
 * @file
 * Extends core/misc/states.js.
 */
(function($) {

  // Unbind core state.js from document first so we can then override below.
  $(document).unbind('state:disabled');

  /**
   * Global state change handlers. These are bound to "document" to cover all
   * elements whose state changes. Events sent to elements within the page
   * bubble up to these handlers. We use this system so that themes and modules
   * can override these state change handlers for particular parts of a page.
   */
  $(document).bind('state:disabled', function(e) {
    // Only act when this change was triggered by a dependency and not by the
    // element monitoring itself.
    if (e.trigger) {
      $(e.target)
        .attr('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find(':input').attr('disabled', e.value);

      // Note: WebKit nightlies don't reflect that change correctly.
      // See https://bugs.webkit.org/show_bug.cgi?id=23789
    }
  });

})(jQuery);
;
/**
 * @file
 * Attaches behavior for the Filter module.
 */

(function ($) {
  'use strict';

  function updateFilterHelpLink () {
    var $link = $(this).parents('.filter-wrapper').find('.filter-help > a');
    var originalLink = $link.data('originalLink');
    if (!originalLink) {
      originalLink = $link.attr('href');
      $link.data('originalLink', originalLink);
    }
    $link.attr('href', originalLink + '/' + $(this).find(':selected').val());
  }

  $(document).on('change', '.filter-wrapper select.filter-list', updateFilterHelpLink);

  /**
   * Displays the guidelines of the selected text format automatically.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches behavior for updating filter guidelines.
   */
  Drupal.behaviors.filterGuidelines = {
    attach: function (context) {
      $(context).find('.filter-wrapper select.filter-list').once('filter-list').each(updateFilterHelpLink);
    }
  };

})(jQuery);
;
/**
 * @file
 * Bootstrap Modals.
 */
(function ($, Drupal, Bootstrap) {
  "use strict";

  /**
   * Extend the Bootstrap Modal plugin constructor class.
   */
  Bootstrap.extendPlugin('modal', function (settings) {
    return {
      DEFAULTS: {
        animation: !!settings.modal_animation,
        backdrop: settings.modal_backdrop === 'static' ? 'static' : !!settings.modal_backdrop,
        keyboard: !!settings.modal_keyboard,
        show: !!settings.modal_show,
        size: settings.modal_size
      }
    };
  });

  /**
   * Replace the Bootstrap Modal jQuery plugin definition.
   *
   * Replacing this is needed so that the "option" method can return values.
   */
  Bootstrap.replacePlugin('modal', function () {
    var Modal = this;

    // Extract the arguments.
    var args = Array.prototype.slice.call(arguments, 1);

    // Modal jQuery Plugin Definition.
    return function (option, _relatedTarget) {
      var ret = void(0);
      this.each(function () {
        var $this   = $(this);
        var data    = $this.data('bs.modal');
        var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option);

        if (!data) $this.data('bs.modal', (data = new Modal(this, options)));
        if (typeof option == 'string') ret = data[option].apply(data, args);
        else if (options.show) data.show(_relatedTarget);
      });

      // If just one element and there was a result returned for the option passed,
      // then return the result. Otherwise, just return the jQuery object.
      return this.length === 1 && ret !== void(0) ? ret : this;
    }
  });

  /**
   * Extend Drupal theming functions.
   */
  $.extend(Drupal.theme, /** @lend Drupal.theme */ {
    /**
     * Theme function for a Bootstrap Modal.
     *
     * @param {object}[variables]
     *   An object with the following keys:
     *   - title: The name of the tab.
     *
     * @return {string}
     *   The HTML for the modal.
     */
    bootstrapModal: function (variables) {
      var settings = drupalSettings.bootstrap || {};
      var defaults = {
        body: '',
        closeButton: true,
        description: {
          content: null,
          position: 'before'
        },
        footer: '',
        id: 'drupal-modal',
        size: settings.modal_size ? settings.modal_size : '',
        title: Drupal.t('Loading...')
      };
      variables = $.extend(true, {}, defaults, variables);
      var output = '';

      // Build the modal wrapper.
      var classes = ['modal'];
      if (settings.modal_animation) {
        classes.push('fade');
      }
      output += '<div id="' + variables.id + '" class="' + classes.join(' ') + '" tabindex="-1" role="dialog">';

      // Build the modal-dialog wrapper.
      var dialogClasses = ['modal-dialog'];
      if (variables.size) {
        // @todo This should really be a clean CSS class method instead.
        dialogClasses.push(Drupal.checkPlain(variables.size));
      }
      output += '<div class="' + dialogClasses.join(' ') + '" role="document">';

      // Build the modal-content wrapper.
      output += '<div class="modal-content">';

      // Build the header wrapper and title.
      output += Drupal.theme.bootstrapModalHeader(variables.title, variables.closeButton);

      // Build the body.
      output += Drupal.theme.bootstrapModalBody(variables.id + '--body', variables.body, variables.description);

      // Build the footer.
      output += Drupal.theme.bootstrapModalFooter(variables.footer);

      // Close the modal-content wrapper.
      output += '</div>';

      // Close the modal-dialog wrapper.
      output += '</div>';

      // Close the modal wrapper.
      output += '</div>';

      // Return the constructed modal.
      return output;
    },

    /**
     * Theme function for a Bootstrap Modal body markup.
     *
     * @param {string} id
     *   A unique ID for the modal body div.
     * @param {string} body
     *   The HTML markup to place in the body.
     * @param {string|object} description
     *   A description to show. Can either be a string or an object with the
     *   following key/value pairs:
     *   - content: The description value.
     *   - position: (optional) A display setting that can have these values:
     *     - before: The description is displayed before the body. This is the
     *       default value.
     *     - after: The description is display after the body.
     *     - invisible: The description is displayed after the element, hidden
     *       visually but available to screen readers.
     *
     * @return {string}
     *   The HTML for the modal close button.
     */
    bootstrapModalBody: function (id, body, description) {
      var output = '';
      output += '<div id="' + id + '" class="modal-body">';
      if (!description || !$.isPlainObject(description)) {
        description = { content: description};
      }
      description = $.extend({ position: 'before' }, description);

      var descriptionClasses = ['help-block'];
      if (description.content && description.position === 'invisible') {
        descriptionClasses.push('sr-only');
      }
      if (description.content && description.position === 'before') {
        output += '<p class="' + descriptionClasses.join(' ') + '">' + description.content + '</p>';
      }
      output += body;
      if (description.content && (description.position === 'after' || description.position === 'invisible')) {
        output += '<p class="' + descriptionClasses.join(' ') + '">' + description.content + '</p>';
      }
      output += '</div>';
      return output;
    },

    /**
     * Theme function for a Bootstrap Modal close button.
     *
     * @return {string}
     *   The HTML for the modal close button.
     */
    bootstrapModalClose: function () {
      return '<button type="button" class="close" data-dismiss="modal" aria-label="' + Drupal.t('Close') + '"><span aria-hidden="true">&times;</span></button>';
    },

    /**
     * Theme function for a Bootstrap Modal footer.
     *
     * @param {string} [footer]
     *   The HTML markup to place in the footer.
     * @param {boolean} [force]
     *   Flag to force the rendering of the footer.
     *
     * @return {string}
     *   The HTML for the modal footer.
     */
    bootstrapModalFooter: function (footer, force) {
      return footer || force ? '<div class="modal-footer">' + (footer || '') + '</div>' : '';
    },

    /**
     * Theme function for a Bootstrap Modal header.
     *
     * @param {string} [title]
     *   The title for the header.
     * @param {boolean} [closeButton]
     *   Flag indicating whether or not to show the close button in the header.
     *
     * @return {string}
     *   The HTML for the modal header.
     */
    bootstrapModalHeader: function (title, closeButton) {
      var output = '';
      if (title) {
        closeButton = closeButton !== void(0) ? closeButton : true;
        output += '<div class="modal-header">';
        if (closeButton) {
          output += Drupal.theme.bootstrapModalClose();
        }
        output += '<h4 class="modal-title">' + Drupal.checkPlain(title) + '</h4>';
        output += '</div>';
      }
      return output;
    }
  })

})(window.jQuery, window.Drupal, window.Drupal.bootstrap);
;
/**
 * @file
 * Dialog API inspired by HTML5 dialog element.
 *
 * @see http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#the-dialog-element
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Default dialog options.
   *
   * @type {object}
   *
   * @prop {bool} [autoOpen=true]
   * @prop {string} [dialogClass='']
   * @prop {string} [buttonClass='button']
   * @prop {string} [buttonPrimaryClass='button--primary']
   * @prop {function} close
   */
  drupalSettings.dialog = {
    autoOpen: true,
    dialogClass: '',
    // Drupal-specific extensions: see dialog.jquery-ui.js.
    buttonClass: 'button',
    buttonPrimaryClass: 'button--primary',
    // When using this API directly (when generating dialogs on the client
    // side), you may want to override this method and do
    // `jQuery(event.target).remove()` as well, to remove the dialog on
    // closing.
    close: function (event) {
      Drupal.detachBehaviors(event.target, null, 'unload');
    }
  };

  /**
   * @typedef {object} Drupal.dialog~dialogDefinition
   *
   * @prop {boolean} open
   *   Is the dialog open or not.
   * @prop {*} returnValue
   *   Return value of the dialog.
   * @prop {function} show
   *   Method to display the dialog on the page.
   * @prop {function} showModal
   *   Method to display the dialog as a modal on the page.
   * @prop {function} close
   *   Method to hide the dialog from the page.
   */

  /**
   * Polyfill HTML5 dialog element with jQueryUI.
   *
   * @param {HTMLElement} element
   * @param {object} options
   *   jQuery UI options to be passed to the dialog.
   *
   * @return {Drupal.dialog~dialogDefinition}
   */
  Drupal.dialog = function (element, options) {
    var $element = $(element);

    function openDialog(settings) {
      settings = $.extend({}, drupalSettings.dialog, options, settings);
      // Trigger a global event to allow scripts to bind events to the dialog.
      $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
      $element
        .modal(settings)
        .on('shown.bs.modal.drupal', function () {
          dialog.open = true;
          $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
        })
      ;
    }

    function closeDialog(value) {
      $(window).trigger('dialog:beforeclose', [dialog, $element]);
      $element
        .on('hidden.bs.modal.drupal', function () {
          dialog.returnValue = value;
          dialog.open = false;
          $(window).trigger('dialog:afterclose', [dialog, $element]);
        })
        .modal('hide');
    }

    var dialog = {
      open: false,
      returnValue: void(0),
      show: function () {
        openDialog({show: false});
      },
      showModal: function () {
        openDialog({show: true});
      },
      close: closeDialog
    };

    return dialog;
  };

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Attaches behavior for the Editor module.
 */

(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Finds the text area field associated with the given text format selector.
   *
   * @param {jQuery} $formatSelector
   *   A text format selector DOM element.
   *
   * @return {HTMLElement}
   *   The text area DOM element, if it was found.
   */
  function findFieldForFormatSelector($formatSelector) {
    var field_id = $formatSelector.attr('data-editor-for');
    // This selector will only find text areas in the top-level document. We do
    // not support attaching editors on text areas within iframes.
    return $('#' + field_id).get(0);
  }

  /**
   * Changes the text editor on a text area.
   *
   * @param {HTMLElement} field
   *   The text area DOM element.
   * @param {string} newFormatID
   *   The text format we're changing to; the text editor for the currently
   *   active text format will be detached, and the text editor for the new text
   *   format will be attached.
   */
  function changeTextEditor(field, newFormatID) {
    var previousFormatID = field.getAttribute('data-editor-active-text-format');

    // Detach the current editor (if any) and attach a new editor.
    if (drupalSettings.editor.formats[previousFormatID]) {
      Drupal.editorDetach(field, drupalSettings.editor.formats[previousFormatID]);
    }
    // When no text editor is currently active, stop tracking changes.
    else {
      $(field).off('.editor');
    }

    // Attach the new text editor (if any).
    if (drupalSettings.editor.formats[newFormatID]) {
      var format = drupalSettings.editor.formats[newFormatID];
      filterXssWhenSwitching(field, format, previousFormatID, Drupal.editorAttach);
    }

    // Store the new active format.
    field.setAttribute('data-editor-active-text-format', newFormatID);
  }

  /**
   * Handles changes in text format.
   *
   * @param {jQuery.Event} event
   *   The text format change event.
   */
  function onTextFormatChange(event) {
    var $select = $(event.target);
    var field = event.data.field;
    var activeFormatID = field.getAttribute('data-editor-active-text-format');
    var newFormatID = $select.val();

    // Prevent double-attaching if the change event is triggered manually.
    if (newFormatID === activeFormatID) {
      return;
    }

    // When changing to a text format that has a text editor associated
    // with it that supports content filtering, then first ask for
    // confirmation, because switching text formats might cause certain
    // markup to be stripped away.
    var supportContentFiltering = drupalSettings.editor.formats[newFormatID] && drupalSettings.editor.formats[newFormatID].editorSupportsContentFiltering;
    // If there is no content yet, it's always safe to change the text format.
    var hasContent = field.value !== '';
    if (hasContent && supportContentFiltering) {
      var message = Drupal.t('Changing the text format to %text_format will permanently remove content that is not allowed in that text format.<br><br>Save your changes before switching the text format to avoid losing data.', {
        '%text_format': $select.find('option:selected').text()
      });
      var confirmationDialog = Drupal.dialog('<div>' + message + '</div>', {
        title: Drupal.t('Change text format?'),
        dialogClass: 'editor-change-text-format-modal',
        resizable: false,
        buttons: [
          {
            text: Drupal.t('Continue'),
            class: 'button button--primary',
            click: function () {
              changeTextEditor(field, newFormatID);
              confirmationDialog.close();
            }
          },
          {
            text: Drupal.t('Cancel'),
            class: 'button',
            click: function () {
              // Restore the active format ID: cancel changing text format. We
              // cannot simply call event.preventDefault() because jQuery's
              // change event is only triggered after the change has already
              // been accepted.
              $select.val(activeFormatID);
              confirmationDialog.close();
            }
          }
        ],
        // Prevent this modal from being closed without the user making a choice
        // as per http://stackoverflow.com/a/5438771.
        closeOnEscape: false,
        create: function () {
          $(this).parent().find('.ui-dialog-titlebar-close').remove();
        },
        beforeClose: false,
        close: function (event) {
          // Automatically destroy the DOM element that was used for the dialog.
          $(event.target).remove();
        }
      });

      confirmationDialog.showModal();
    }
    else {
      changeTextEditor(field, newFormatID);
    }
  }

  /**
   * Initialize an empty object for editors to place their attachment code.
   *
   * @namespace
   */
  Drupal.editors = {};

  /**
   * Enables editors on text_format elements.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches an editor to an input element.
   * @prop {Drupal~behaviorDetach} detach
   *   Detaches an editor from an input element.
   */
  Drupal.behaviors.editor = {
    attach: function (context, settings) {
      // If there are no editor settings, there are no editors to enable.
      if (!settings.editor) {
        return;
      }

      $(context).find('[data-editor-for]').once('editor').each(function () {
        var $this = $(this);
        var field = findFieldForFormatSelector($this);

        // Opt-out if no supported text area was found.
        if (!field) {
          return;
        }

        // Store the current active format.
        var activeFormatID = $this.val();
        field.setAttribute('data-editor-active-text-format', activeFormatID);

        // Directly attach this text editor, if the text format is enabled.
        if (settings.editor.formats[activeFormatID]) {
          // XSS protection for the current text format/editor is performed on
          // the server side, so we don't need to do anything special here.
          Drupal.editorAttach(field, settings.editor.formats[activeFormatID]);
        }
        // When there is no text editor for this text format, still track
        // changes, because the user has the ability to switch to some text
        // editor, otherwise this code would not be executed.
        $(field).on('change.editor keypress.editor', function () {
          field.setAttribute('data-editor-value-is-changed', 'true');
          // Just knowing that the value was changed is enough, stop tracking.
          $(field).off('.editor');
        });

        // Attach onChange handler to text format selector element.
        if ($this.is('select')) {
          $this.on('change.editorAttach', {field: field}, onTextFormatChange);
        }
        // Detach any editor when the containing form is submitted.
        $this.parents('form').on('submit', function (event) {
          // Do not detach if the event was canceled.
          if (event.isDefaultPrevented()) {
            return;
          }
          // Detach the current editor (if any).
          if (settings.editor.formats[activeFormatID]) {
            Drupal.editorDetach(field, settings.editor.formats[activeFormatID], 'serialize');
          }
        });
      });
    },

    detach: function (context, settings, trigger) {
      var editors;
      // The 'serialize' trigger indicates that we should simply update the
      // underlying element with the new text, without destroying the editor.
      if (trigger === 'serialize') {
        // Removing the editor-processed class guarantees that the editor will
        // be reattached. Only do this if we're planning to destroy the editor.
        editors = $(context).find('[data-editor-for]').findOnce('editor');
      }
      else {
        editors = $(context).find('[data-editor-for]').removeOnce('editor');
      }

      editors.each(function () {
        var $this = $(this);
        var activeFormatID = $this.val();
        var field = findFieldForFormatSelector($this);
        if (field && activeFormatID in settings.editor.formats) {
          Drupal.editorDetach(field, settings.editor.formats[activeFormatID], trigger);
        }
      });
    }
  };

  /**
   * Attaches editor behaviors to the field.
   *
   * @param {HTMLElement} field
   *   The textarea DOM element.
   * @param {object} format
   *   The text format that's being activated, from
   *   drupalSettings.editor.formats.
   *
   * @listens event:change
   *
   * @fires event:formUpdated
   */
  Drupal.editorAttach = function (field, format) {
    if (format.editor) {
      // Attach the text editor.
      Drupal.editors[format.editor].attach(field, format);

      // Ensures form.js' 'formUpdated' event is triggered even for changes that
      // happen within the text editor.
      Drupal.editors[format.editor].onChange(field, function () {
        $(field).trigger('formUpdated');

        // Keep track of changes, so we know what to do when switching text
        // formats and guaranteeing XSS protection.
        field.setAttribute('data-editor-value-is-changed', 'true');
      });
    }
  };

  /**
   * Detaches editor behaviors from the field.
   *
   * @param {HTMLElement} field
   *   The textarea DOM element.
   * @param {object} format
   *   The text format that's being activated, from
   *   drupalSettings.editor.formats.
   * @param {string} trigger
   *   Trigger value from the detach behavior.
   */
  Drupal.editorDetach = function (field, format, trigger) {
    if (format.editor) {
      Drupal.editors[format.editor].detach(field, format, trigger);

      // Restore the original value if the user didn't make any changes yet.
      if (field.getAttribute('data-editor-value-is-changed') === 'false') {
        field.value = field.getAttribute('data-editor-value-original');
      }
    }
  };

  /**
   * Filter away XSS attack vectors when switching text formats.
   *
   * @param {HTMLElement} field
   *   The textarea DOM element.
   * @param {object} format
   *   The text format that's being activated, from
   *   drupalSettings.editor.formats.
   * @param {string} originalFormatID
   *   The text format ID of the original text format.
   * @param {function} callback
   *   A callback to be called (with no parameters) after the field's value has
   *   been XSS filtered.
   */
  function filterXssWhenSwitching(field, format, originalFormatID, callback) {
    // A text editor that already is XSS-safe needs no additional measures.
    if (format.editor.isXssSafe) {
      callback(field, format);
    }
    // Otherwise, ensure XSS safety: let the server XSS filter this value.
    else {
      $.ajax({
        url: Drupal.url('editor/filter_xss/' + format.format),
        type: 'POST',
        data: {
          value: field.value,
          original_format_id: originalFormatID
        },
        dataType: 'json',
        success: function (xssFilteredValue) {
          // If the server returns false, then no XSS filtering is needed.
          if (xssFilteredValue !== false) {
            field.value = xssFilteredValue;
          }
          callback(field, format);
        }
      });
    }
  }

})(jQuery, Drupal, drupalSettings);
;
/**
 * @file
 * Manages elements that can offset the size of the viewport.
 *
 * Measures and reports viewport offset dimensions from elements like the
 * toolbar that can potentially displace the positioning of other elements.
 */

/**
 * @typedef {object} Drupal~displaceOffset
 *
 * @prop {number} top
 * @prop {number} left
 * @prop {number} right
 * @prop {number} bottom
 */

/**
 * Triggers when layout of the page changes.
 *
 * This is used to position fixed element on the page during page resize and
 * Toolbar toggling.
 *
 * @event drupalViewportOffsetChange
 */

(function ($, Drupal, debounce) {

  'use strict';

  /**
   * @name Drupal.displace.offsets
   *
   * @type {Drupal~displaceOffset}
   */
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  /**
   * Registers a resize handler on the window.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.drupalDisplace = {
    attach: function () {
      // Mark this behavior as processed on the first pass.
      if (this.displaceProcessed) {
        return;
      }
      this.displaceProcessed = true;

      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };

  /**
   * Informs listeners of the current offset dimensions.
   *
   * @function Drupal.displace
   *
   * @prop {Drupal~displaceOffset} offsets
   *
   * @param {bool} [broadcast]
   *   When true or undefined, causes the recalculated offsets values to be
   *   broadcast to listeners.
   *
   * @return {Drupal~displaceOffset}
   *   An object whose keys are the for sides an element -- top, right, bottom
   *   and left. The value of each key is the viewport displacement distance for
   *   that edge.
   *
   * @fires event:drupalViewportOffsetChange
   */
  function displace(broadcast) {
    offsets = Drupal.displace.offsets = calculateOffsets();
    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }
    return offsets;
  }

  /**
   * Determines the viewport offsets.
   *
   * @return {Drupal~displaceOffset}
   *   An object whose keys are the for sides an element -- top, right, bottom
   *   and left. The value of each key is the viewport displacement distance for
   *   that edge.
   */
  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }

  /**
   * Gets a specific edge's offset.
   *
   * Any element with the attribute data-offset-{edge} e.g. data-offset-top will
   * be considered in the viewport offset calculations. If the attribute has a
   * numeric value, that value will be used. If no value is provided, one will
   * be calculated using the element's dimensions and placement.
   *
   * @function Drupal.displace.calculateOffset
   *
   * @param {string} edge
   *   The name of the edge to calculate. Can be 'top', 'right',
   *   'bottom' or 'left'.
   *
   * @return {number}
   *   The viewport displacement distance for the requested edge.
   */
  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll('[data-offset-' + edge + ']');
    var n = displacingElements.length;
    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];
      // If the element is not visible, do consider its dimensions.
      if (el.style.display === 'none') {
        continue;
      }
      // If the offset data attribute contains a displacing value, use it.
      var displacement = parseInt(el.getAttribute('data-offset-' + edge), 10);
      // If the element's offset data attribute exits
      // but is not a valid number then get the displacement
      // dimensions directly from the element.
      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }
      // If the displacement value is larger than the current value for this
      // edge, use the displacement value.
      edgeOffset = Math.max(edgeOffset, displacement);
    }

    return edgeOffset;
  }

  /**
   * Calculates displacement for element based on its dimensions and placement.
   *
   * @param {HTMLElement} el
   *   The jQuery element whose dimensions and placement will be measured.
   *
   * @param {string} edge
   *   The name of the edge of the viewport that the element is associated
   *   with.
   *
   * @return {number}
   *   The viewport displacement distance for the requested edge.
   */
  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = (edge === 'left' || edge === 'right');
    // Get the offset of the element itself.
    var placement = $el.offset()[horizontal ? 'left' : 'top'];
    // Subtract scroll distance from placement to get the distance
    // to the edge of the viewport.
    placement -= window['scroll' + (horizontal ? 'X' : 'Y')] || document.documentElement['scroll' + (horizontal ? 'Left' : 'Top')] || 0;
    // Find the displacement value according to the edge.
    switch (edge) {
      // Left and top elements displace as a sum of their own offset value
      // plus their size.
      case 'top':
        // Total displacement is the sum of the elements placement and size.
        displacement = placement + $el.outerHeight();
        break;

      case 'left':
        // Total displacement is the sum of the elements placement and size.
        displacement = placement + $el.outerWidth();
        break;

      // Right and bottom elements displace according to their left and
      // top offset. Their size isn't important.
      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;

      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;

      default:
        displacement = 0;
    }
    return displacement;
  }

  /**
   * Assign the displace function to a property of the Drupal global object.
   *
   * @ignore
   */
  Drupal.displace = displace;
  $.extend(Drupal.displace, {

    /**
     * Expose offsets to other scripts to avoid having to recalculate offsets.
     *
     * @ignore
     */
    offsets: offsets,

    /**
     * Expose method to compute a single edge offsets.
     *
     * @ignore
     */
    calculateOffset: calculateOffset
  });

})(jQuery, Drupal, Drupal.debounce);
;
