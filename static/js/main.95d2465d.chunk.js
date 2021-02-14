(this.webpackJsonptelemedicine=this.webpackJsonptelemedicine||[]).push([[0],{29:function(e,t,n){},48:function(e,t,n){"use strict";n.r(t);var r=n(1),i=n.n(r),s=n(12),a=n.n(s),c=(n(29),n(18)),l=n.n(c),o=n(21),u=n(10),d=n(57),b=n(54),j=n(55),h=n(58),p=n(56),f=n(22),m=n.n(f),x=n(17),O=(n(45),n(3)),g=function(e){return new Promise((function(t){return setTimeout(t,e)}))},y=function(){var e=Object(o.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(300);case 2:window.alert(JSON.stringify(t,0,2));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(e){return Object(O.jsxs)(d.a,{children:[Object(O.jsx)(d.a.Header,{children:Object(O.jsx)("b",{children:e.title})}),Object(O.jsx)(d.a.Body,{children:e.items.map(N)})]})},w=function(e){return void 0!==e.opts?Object(O.jsxs)(u.a,{name:e.id,component:"select",class:"form-control",children:[Object(O.jsx)("option",{selected:!0,children:"Please Select"}),e.opts.map((function(e,t){return"string"==typeof e?Object(O.jsx)("option",{value:t+1,children:e}):Object(O.jsx)("option",{value:e.value,children:e.label})}))]}):e.field},N=function(e){return Object(O.jsxs)(b.a,{children:[Object(O.jsx)(j.a,{children:Object(O.jsx)("label",{class:"col",children:e.label})}),Object(O.jsx)(j.a,{children:w(e)})]})},S=function(e){return e.reduce((function(e,t){return e+t}),0)},_=function(e,t){return t.map((function(t){return parseInt(e[t.id])}))},F=[{title:"History of present illness",id:"history",items:[{id:"coughs_per_hour",label:"Coughs per hour",opts:["< 5","5 - 8","> 8"]},{id:"activity",label:"Level of activity",opts:["Full active","Moderate restricted","Mostly sleeping"]},{id:"sleep",label:"Sleeping interrutions",opts:["As usual","Waking up < 3 times/night","Waking up > 3 times/night"]},{id:"cough_dyspnea",label:"Progression of cough or dyspnea",opts:["No progression or improvement","Slow progression","Rapid progression"]},{id:"urine",label:"Urine output",opts:["As usual","Moderate decreased (more than half the usual output)","Severe decreased (less than half the usual output)"]},{id:"cardiac_respiratory",label:"History of cardiac/respiratory problems",opts:["No","Under control","Not under control"]}],calc_score:function(e,t){return S(_(t,e.items))},message:function(e){return e<=6?"Follow up if deterioration":e<=9?"Follow up next day":e>9?"Observe clinical signs.":Object(O.jsx)("i",{children:"Select all the options."})}},{title:"Observation of clinical signs",id:"clinical",items:[{id:"resp_effort",label:"Respiratory effort",opts:["No accessory muscles","1 accessory muscle","\u2265 2 accessory muscles"]},{id:"lay_down",label:"Ability to lay down",opts:["Comfortable when lying down","Unomfortable when lying down","Mostly seating"]},{id:"speak",label:"Ability to speak",opts:["In full sentences / babbles","Only phrases / short cries","Only words / grunting"]},{id:"feed",label:"Ability to feed",opts:["As usual decreased","Decreased","Severely reduced"]},{id:"mental",label:"Mental status",opts:["Normal","Moderate crying / Agitated","Severe irritability"]}],calc_score:function(e,t){return S(_(t,e.items))},message:function(e,t){return 5==e?"Follow up in case of deterioration.":e<=7?"Arrange an office visit the same day if Social Circumstances >4 Otherwise Follow up in 6-8h ("+t.clinical+")":8==e?"Emerengency Room Referral":Object(O.jsx)("i",{children:"Select all the options."})}},{title:"Pysical signs",id:"physical",items:[{id:"oxymeter",label:"Pulse oxymeter",opts:["> 97%","94% - 97%","90% - 94%"]},{id:"resp_rate",label:"Respiratory rate while afebrile and resting",field:Object(O.jsx)(u.a,{name:"resp_rate",component:"input",type:"number"})}],calc_score:function(e,t){var n=function(e,n){var r=parseInt(t.resp_rate);return r<e?1:r<n?2:r>=n?3:NaN};return function(){switch(function(e){var t,n=e.birthDate,r=new Date;if("undefined"==typeof n)return NaN;t=12*(r.getFullYear()-n.getFullYear()),t-=n.getMonth();var i=(t=(t+=r.getMonth())<=0?0:t)/12;return t<=12?"infant":i<=3?"toddler":i<=6?"preschool":i<=12?"school":i<=18?"teen":null}(t)){case"infant":return n(60,70);case"toddler":return n(34,40);case"preschool":return n(30,36);case"school":return n(26,31);case"teen":return n(23,28);default:return NaN}}()+parseInt(t.oxymeter)},message:function(e,t){return e<=2?"Follow up the next day":3==e?"Arrange visit the same day":e>=4?"Emergency room referral":Object(O.jsx)("i",{children:"Select all the options and date of birth."})}},{title:"Social circumstances",id:"social",items:[{id:"distance",label:"Distance from medical center",opts:["< 30 min","30 - 60 min","> 60 min"]},{id:"transport",label:"Means of transportation",opts:["Private vehicle",{label:"Pubplic transport",value:"3"}]}],calc_score:function(e,t){return S(_(t,e.items))},message:function(e,t){return e<=3?"No action":e>=3?"See observation of clinical signs":Object(O.jsx)("i",{children:"Select all the options."})}}];function D(e){var t=e.getDate(),n=e.getMonth()+1;return e.getFullYear()+"-"+(n<=9?"0"+n:n)+"-"+(t<=9?"0"+t:t)}var M=function(e){var t=!Object.values(e.scores).some(isNaN),n=e.values;return t?Object(O.jsx)(h.a,{variant:"primary",disabled:!1,onClick:function(){return function(e){var t=new x.default;t.autoTable({body:[["Name",e.firstName+" "+e.lastName],["Birth",D(e.birthDate)],["Date generated",D(new Date)]]}),t.autoTable({theme:"grid",html:"#results_table"}),t.save(e.firstName+"-"+e.lastName+"-"+D(new Date)+".pdf")}(n)},children:"Save as pdf"}):Object(O.jsxs)("div",{children:[Object(O.jsx)(h.a,{variant:"primary",disabled:!0,children:"Save as pdf"}),Object(O.jsx)("i",{children:"Complete the form to enable"})]})},A=function(e){var t=function(e,t){var n={};return e.forEach((function(e){n[e.id]=e.calc_score(e,t)})),n}(F,e);return Object(O.jsxs)(d.a,{children:[Object(O.jsx)(d.a.Header,{children:Object(O.jsx)("b",{children:"Results"})}),Object(O.jsxs)(d.a.Body,{children:[Object(O.jsxs)("table",{class:"table",id:"results_table",children:[Object(O.jsxs)("tr",{children:[Object(O.jsx)("th",{children:"Section"}),Object(O.jsx)("th",{children:"Action"}),Object(O.jsx)("th",{children:"Score"})]}),F.map((function(e){return function(e,t,n){return Object(O.jsxs)("tr",{children:[Object(O.jsx)("td",{children:e.title}),Object(O.jsx)("td",{children:e.message(n[e.id],n)}),Object(O.jsx)("td",{children:n[e.id]})]})}(e,0,t)}))]}),Object(O.jsx)(M,{values:e,scores:t})]})]})},C=[{label:"First name",field:Object(O.jsx)(u.a,{name:"firstName",component:"input",type:"text",placeholder:"First Name"})},{label:"Last name",field:Object(O.jsx)(u.a,{name:"lastName",component:"input",type:"text",placeholder:"Last Name"})},{label:"Date of birth",field:Object(O.jsx)(u.a,{name:"birthDate",component:function(e){return Object(O.jsx)(m.a,{value:e.input.value,dropdownMonde:"select",selected:e.input.value,onChange:function(t){return e.input.onChange(t)}})}})}],P=function(){return Object(O.jsx)("div",{children:C.map((function(e){return Object(O.jsxs)(b.a,{children:[Object(O.jsx)("label",{class:"col",children:e.label}),Object(O.jsx)(j.a,{children:e.field})]})}))})},k=function(e){e.handleSubmit,e.form,e.submitting,e.pristine;var t=e.values;return Object(O.jsxs)("div",{children:[Object(O.jsxs)(d.a,{children:[Object(O.jsx)(d.a.Header,{children:Object(O.jsx)("b",{children:"Patient information"})}),Object(O.jsx)(d.a.Body,{children:Object(O.jsx)(P,{})})]}),Object(O.jsxs)(d.a,{children:[F.map(v),A(t)]})]})},T=function(){return Object(O.jsxs)(p.a,{children:[Object(O.jsx)("h1",{children:"Telemedicine"}),Object(O.jsxs)("i",{children:["Today: ",D(new Date)]}),Object(O.jsx)(u.b,{onSubmit:y,initialValues:{},render:k})]})},B=function(e){e&&e instanceof Function&&n.e(6).then(n.bind(null,432)).then((function(t){var n=t.getCLS,r=t.getFID,i=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),r(e),i(e),s(e),a(e)}))};a.a.render(Object(O.jsx)(i.a.StrictMode,{children:Object(O.jsx)(T,{})}),document.getElementById("root")),B()}},[[48,1,3]]]);
//# sourceMappingURL=main.95d2465d.chunk.js.map