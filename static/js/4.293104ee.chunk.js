(this.webpackJsonpwayofsamurai=this.webpackJsonpwayofsamurai||[]).push([[4],{325:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__4-Nv5",dialogsItems:"Dialogs_dialogsItems__1E2_b",active:"Dialogs_active__ucqGu",item:"Dialogs_item__1d3zi",messages:"Dialogs_messages__1acZm",addMessage:"Dialogs_addMessage__mDCyY"}},331:function(e,a,t){"use strict";t.r(a);var n=t(121),s=t(0),i=t.n(s),o=t(325),r=t.n(o),c=t(7),l=function(e){var a="/dialogs/"+e.id;return i.a.createElement("div",{className:r.a.dialog+" "+r.a.active},i.a.createElement(c.b,{to:a},e.name))},m=function(e){return i.a.createElement("div",{className:r.a.message},e.message)},u=t(3),d=t(33),g=t.n(d),f=t(83),b=t.n(f),E=t(55),v=t(70),_=Object(v.a)(50),p=b()({form:"dialogAddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit,className:r.a.addMessage},i.a.createElement("div",null,i.a.createElement(g.a,{component:E.b,name:"newMessageBody",placeholder:"Enter yor message",validate:[v.b,_]})),i.a.createElement("div",null,i.a.createElement("button",null,"Send")))})),h=function(e){e.dialogsPage;var a=e.dialogsPage.dialogs.map((function(e){return i.a.createElement(l,{name:e.name,id:e.id,key:e.id})})),t=e.dialogsPage.messages.map((function(e){return i.a.createElement(m,{message:e.message,key:e.id})}));if(!e.isAuth)return i.a.createElement(u.a,{to:"/login"});return i.a.createElement("div",{className:r.a.dialogs},i.a.createElement("div",{className:r.a.dialogsItems},a),i.a.createElement("div",{className:r.a.messages},i.a.createElement("div",null,t)),i.a.createElement(p,{onSubmit:function(a){e.sendMessage(a.newMessageBody)}}))},y=t(12),j=t(28),O=t(29),M=t(30),A=t(31),D=function(e){return{isAuth:e.auth.isAuth}},N=t(15);a.default=Object(N.compose)(Object(y.connect)((function(e){return{dialogsPage:e.dialogsPage,isAuth:e.auth.isAuth}}),(function(e){return{sendMessage:function(a){e(Object(n.b)(a))}}})),(function(e){var a=function(a){Object(A.a)(n,a);var t=Object(M.a)(n);function n(){return Object(j.a)(this,n),t.apply(this,arguments)}return Object(O.a)(n,[{key:"render",value:function(){return this.props.isAuth?i.a.createElement(e,this.props):i.a.createElement(u.a,{to:"/login"})}}]),n}(i.a.Component);return Object(y.connect)(D)(a)}))(h)}}]);
//# sourceMappingURL=4.293104ee.chunk.js.map