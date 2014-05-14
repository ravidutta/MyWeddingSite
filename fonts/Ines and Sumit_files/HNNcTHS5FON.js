/*!CK:2280072699!*//*1381946842,178134599*/

if (self.CavalryLogger) { CavalryLogger.start_js(["ZRnNq"]); }

__d("GroupsMemberCountUpdater",["Arbiter","DOM"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('DOM');function i(){}i.subscribeMemberCount=function(j){g.subscribe('GroupsMemberCount/changeText',function(k,l){h.setContent(j,l);});};i.subscribeNewMemberCount=function(j){g.subscribe('GroupsMemberCount/changeNewMembersText',function(k,l){h.setContent(j,l);});};e.exports=i;});
__d("GroupsRefreshHandler",["UIPagelet","ge","$"],function(a,b,c,d,e,f){var g=b('UIPagelet'),h=b('ge'),i=b('$'),j=[];function k(l,m){this.$GroupsRefreshHandler0=l;this.$GroupsRefreshHandler1=m;j[l]=this;}k.refresh=function(l,m){var n=j[m],o=h(m);if(!n||!o)return;n.reloadAds(o,l);};k.prototype.reloadAds=function(l,m){this.$GroupsRefreshHandler2=m;g.loadFromEndpoint('WebEgoPane',l,{dom_id:this.$GroupsRefreshHandler0,pid:this.$GroupsRefreshHandler1.pid,data:this.$GroupsRefreshHandler1.data},{bundle:false,displayCallback:this.$GroupsRefreshHandler3.bind(this)});};k.prototype.$GroupsRefreshHandler3=function(l){l();i(this.$GroupsRefreshHandler0).appendChild(this.$GroupsRefreshHandler2);};e.exports=k;});
__d("GroupSearchBox",["CSS","DOM","Event","Input","copyProperties"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('Event'),j=b('Input'),k=b('copyProperties'),l={init:function(m,n){var o=h.find(n,'.inputtext');i.listen(m,'click',function(){g.show(n);o.focus();});i.listen(o,'blur',function(){if(!j.getValue(o))g.hide(n);});}};e.exports=l;});
__d("GroupsAddTypeaheadView",["Arbiter","ContextualTypeaheadView"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('ContextualTypeaheadView');for(var i in h)if(h.hasOwnProperty(i))k[i]=h[i];var j=h===null?null:h.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=h;function k(){if(h!==null)h.apply(this,arguments);}k.prototype.select=function(l){var m=this.results[this.index];g.inform('GroupsMemberSuggestion/remove',m.uid);if(m.is_member){this.reset();}else j.select.call(this,l);};e.exports=k;});
__d("GroupsAddMemberTypeahead",["Arbiter","DOM","Typeahead","copyProperties","ge"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('DOM'),i=b('Typeahead'),j=b('copyProperties'),k=b('ge');function l(m,n){if(m&&n)this.init(m,n);}j(l.prototype,{init:function(m,n){m.subscribe('select',function(o,p){g.inform('GroupsAddMemberTypeahead/add',{gid:n,uid:p.selected.uid,name:p.selected.text,photo:p.selected.photo});var q=m.getData().getExclusions();q.push(p.selected.uid);m.getData().setExclusions(q);});g.subscribe('GroupsAddMemberTypeahead/updateGroupToken',this.resetTypeaheadCaches.bind(this));},resetTypeaheadCaches:function(m,n){var o=h.scry(k('pagelet_group_'),'.uiTypeahead:not(.uiPlacesTypeahead)');for(var p=0;p<o.length;p++){var q=i.getInstance(o[p]);if(q){var r=q.getData();r.updateToken(n.token);q.getCore().subscribe('focus',r.bootstrap.bind(r));}}}});e.exports=l;});
__d("legacy:GroupsAddMemberTypeahead",["GroupsAddMemberTypeahead"],function(a,b,c,d){a.GroupsAddMemberTypeahead=b('GroupsAddMemberTypeahead');},3);
__d("RequiredFormListener",["Event","Input"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Input');g.listen(document.documentElement,'submit',function(i){var j=i.getTarget().getElementsByTagName('*');for(var k=0;k<j.length;k++)if(j[k].getAttribute('required')&&h.isEmpty(j[k])){j[k].focus();return false;}},g.Priority.URGENT);});
__d("LitestandRHCAds",["AdsRefreshHandler","Arbiter","DOM","Event","LitestandMessages","Run","SubscriptionsHandler","csx","ge"],function(a,b,c,d,e,f){var g=b('AdsRefreshHandler'),h=b('Arbiter'),i=b('DOM'),j=b('Event'),k=b('LitestandMessages'),l=b('Run'),m=b('SubscriptionsHandler'),n=b('csx'),o=b('ge'),p,q,r,s,t;function u(){q&&q.forceLoadIfEnoughTimePassed(0);}function v(){var aa=i.scry(r,"._5f85 a")[0];if(aa)p.addSubscriptions(j.listen(aa,'click',u));}function w(){var aa=o(s);if(aa&&t){aa.appendChild(t);t=null;}}function x(){q.cleanup();q=null;p.release();p=null;t=null;}function y(aa,ba){t=ba;u();}var z={init:function(aa,ba,ca){r=o(aa);s=aa;q=new g(r,ba,ca).subscribeDefaultEventsForRefresh();p=new m();p.addSubscriptions(h.subscribe(k.FILTER_SWITCH_BEGIN,x),h.subscribe(k.NEW_STORY_BAR_CLICK,function(){q.forceLoadIfEnoughTimePassed(ba.new_story_bar_delay_ms);}),h.subscribe('AdsRefreshHandler/AdsLoaded',v),h.subscribe('AdsRefreshHandler/AdsLoaded',w),h.subscribe('ProfileQuestionAnswered',y));v();l.onLeave(x);}};e.exports=z;});
__d("CovercardArrow",["ContextualDialogArrow","CSS","DOMQuery","Locale","Style","csx","cx"],function(a,b,c,d,e,f){var g=b('ContextualDialogArrow'),h=b('CSS'),i=b('DOMQuery'),j=b('Locale'),k=b('Style'),l=b('csx'),m=b('cx'),n=-45,o=45,p=10;if(j.isRTL()){n=-n;o=-o;}function q(s){this._layer=s;}q.prototype.enable=function(){this._layer.enableBehavior(g);var s=this._layer.getContentRoot();this._arrowWrapper=i.scry(s,"._7lh")[0];if(!this._arrowWrapper)return;this._arrowShadow=i.scry(this._arrowWrapper,"._7li")[0];if(!this._arrowShadow)return;var t=null;if(this._arrowWrapper.style.webkitMaskPosition!==undefined){t=this._renderArrowWithWebkitMask.bind(this);h.addClass(s,"_7ld");}else if(r(this._arrowWrapper)){t=this._renderArrowWithRotate.bind(this);h.addClass(s,"_7le");}if(!t)return;if(j.isRTL())h.addClass(s,"_7lf");this._subscription=this._layer.subscribe('reposition',function(u,v){var w=v.getPosition()=='below';h.conditionClass(s,"_53ih",w);w&&t(v);});};q.prototype.disable=function(){this._subscription&&this._subscription.unsubscribe();this._subscription=null;};q.prototype._calculateArrowOffset=function(s){var t=g.getOffsetPercent(s),u=g.getOffset(s,t,this._layer),v=k.get(this._layer.getContentRoot(),'width');return parseInt(v,10)*(t/100)+u;};q.prototype._renderArrowWithWebkitMask=function(s){var t=g.getOffsetSide(s),u=this._calculateArrowOffset(s);if(j.isRTL()){var v=k.get(this._layer.getContentRoot(),'width');u=parseInt(v,10)-u-this._layer.getArrowDimensions().offset;t=t=='left'?'right':'left';}k.set(this._arrowWrapper,'webkitMaskPositionX',u+'px');k.set(this._arrowShadow,t,u+'px');};q.prototype._renderArrowWithRotate=function(s){var t=i.scry(this._arrowWrapper,"._7lj")[0];if(!t)return;var u=r(this._arrowWrapper);if(!u)return;var v=this._calculateArrowOffset(s),w=p+v;if(j.isRTL())w=-w;this._arrowWrapper.style[u]='translate('+w+'px, -'+p+'px) '+'rotate('+o+'deg)';t.style[u]='rotate('+n+'deg) '+'translate('+(-w)+'px, 0px)';};function r(s){if(!s)s=document.body;var t=['transform','WebkitTransform','msTransform','MozTransform','OTransform'],u;while(u=t.shift())if(s.style[u]!==undefined)return u;return null;}e.exports=q;});
__d("TypeaheadSubmitOnSelect",["Form","copyProperties"],function(a,b,c,d,e,f){var g=b('Form'),h=b('copyProperties');function i(j){this._typeahead=j;}i.prototype.enable=function(){this._subscription=this._typeahead.subscribe('select',function(){var j=this._typeahead.getCore().getElement().form;if(j)j.getAttribute('rel')=='async'?g.bootstrap(j):j.submit();}.bind(this));};i.prototype.disable=function(){this._typeahead.unsubscribe(this._subscription);this._subscription=null;};h(i.prototype,{_subscription:null});e.exports=i;});
__d("legacy:SubmitOnSelectTypeaheadBehavior",["TypeaheadSubmitOnSelect"],function(a,b,c,d){var e=b('TypeaheadSubmitOnSelect');if(!a.TypeaheadBehaviors)a.TypeaheadBehaviors={};a.TypeaheadBehaviors.submitOnSelect=function(f){f.enableBehavior(e);};},3);