(this.webpackJsonptelemedicine=this.webpackJsonptelemedicine||[]).push([[0],{30:function(e,t,r){},49:function(e,t,r){"use strict";r.r(t);var n=r(1),i=r.n(n),a=r(13),c=r.n(a),l=(r(30),r(8)),o=r(19),s=r.n(o),u=r(22),d=r(11),b=r(58),h=r(55),p=r(56),m=r(59),j=r(57),f=r(23),y=r.n(f),x=r(18),g=(r(46),r(3)),O=function(e){return new Promise((function(t){return setTimeout(t,e)}))},v=function(e){return Object(g.jsx)("b",{style:{color:"red"},children:e})},w=function(){var e=Object(u.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(300);case 2:window.alert(JSON.stringify(t,0,2));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(e){return Object(g.jsxs)(b.a,{children:[Object(g.jsx)(b.a.Header,{children:Object(g.jsx)("b",{children:e.title})}),Object(g.jsx)(b.a.Body,{children:e.items.map(F)})]})},S=function(e){return void 0!==e.opts?Object(g.jsxs)(d.a,{name:e.id,component:"select",class:"form-control",children:[Object(g.jsx)("option",{selected:!0,children:"Please Select"}),e.opts.map((function(e,t){return"string"==typeof e?Object(g.jsx)("option",{value:t+1,children:e}):Object(g.jsx)("option",{value:e.value,children:e.label})}))]}):e.field},_={is_score:!0,emergency:!1,ambulance:!1,score:NaN},F=function(e){return Object(g.jsxs)(h.a,{children:[Object(g.jsx)(p.a,{children:Object(g.jsx)("label",{class:"col",children:e.label})}),Object(g.jsx)(p.a,{children:S(e)})]})},k=function(e,t){return{is_score:!0,ambulance:e.ambulance||t.ambulance,emergency:e.emergency||t.emergency,score:e.score+t.score}},D=function(e){return e.reduce(k,Object(l.a)(Object(l.a)({},_),{},{score:0}))},M=function(e,t){return t.map((function(t){switch(e[t.id]){case"ambulance":return Object(l.a)(Object(l.a)({},_),{},{ambulance:!0});case"emergency":return Object(l.a)(Object(l.a)({},_),{},{emergency:!0});default:return Object(l.a)(Object(l.a)({},_),{},{score:parseInt(e[t.id])})}}))},A=0,C=1,P=2,B=3,R=4,I=5,T=.5,E=[{title:"History of present illness",id:"history",items:[{id:"coughs_per_hour",label:"Coughs per hour",opts:["< 5","5 - 8","> 8"]},{id:"wheezing",label:"Wheezing",opts:["No","Periodically","Yes"]},{id:"activity",label:"Level of activity",opts:["Full active","Moderate restricted","Mostly sleeping"]},{id:"sleep",label:"Sleeping",opts:["As usual","Waking up < 3 times/night","Waking up > 3 times/night"]},{id:"cough_dyspnea",label:"Progression of cough or dyspnea",opts:["No progression or improvement","Slow progression","Rapid progression"]},{id:"urine",label:"Urine output",opts:["As usual","Moderate decreased (more than half the usual output)","Severe decreased (less than half the usual output)"]},{id:"cardiac_respiratory",label:"History of cardiac/respiratory problems",opts:["No","Under control","Not under control"]}],calc_score:function(e,t){return D(M(t,e.items))},message:function(e){return e<=7?{priority:C,text:"Follow up if deterioration"}:e<=10?{priority:P,text:"Follow up next day"}:e>10?{priority:T,text:"Emergency Room Referral or fill in section '".concat(E[1].title,"'.")}:{priority:A,text:Object(g.jsx)("i",{children:"Select all the options."})}}},{title:"Observation of clinical signs",id:"clinical",items:[{id:"mental",label:"Mental status",opts:["Normal","Moderate crying / Agitated","Severe irritability",{label:"Lethargy (emergency room referral)",value:"emergency"},{label:"Unresponsive (call ambulance)",value:"ambulance"}]},{id:"skin_color",label:"Skin color",opts:[{label:"Normal",value:"0"},{label:"Motted / grey (call ambulance)",value:"ambulance"}]},{id:"resp_effort",label:"Respiratory effort",opts:["No accessory muscles","1 accessory muscle","\u2265 2 accessory muscles"]},{id:"lay_down",label:"Ability to lay down",opts:["Comfortable when lying down","Unomfortable when lying down","Mostly seating"]},{id:"speak",label:"Ability to speak",opts:["In full sentences / babbles","Only phrases / short cries","Only words / grunting"]},{id:"feed",label:"Ability to feed",opts:["As usual","Decreased","Severely reduced"]},{id:"breathing_pattern",label:"Breathing pattern",opts:[{label:"Normal",value:"0"},{label:"Rapid/Shallow breathing (call ambulance)",value:"ambulance"}]}],calc_score:function(e,t){return D(M(t,e.items))},message:function(e,t){return e<=5?{priority:P,text:"Follow up in case of deterioration."}:e<=7?{priority:B,text:"Arrange an office visit the same day if Social Circumstances >4 Otherwise Follow up in 6-8h ("+t.clinical+")"}:e>=8?{priority:R,text:v("Emergency Room Referral")}:{priority:A,text:Object(g.jsx)("i",{children:"Select all the options."})}}},{title:"Physical signs",id:"physical",items:[{id:"resp_rate",label:"Respiratory rate while afebrile and resting",field:Object(g.jsx)(d.a,{name:"resp_rate",component:"input",type:"number"})},{id:"oxymeter",label:"Pulse oxymeter",opts:["> 97%","94% - 97%","90% - 94%",{label:"< 90% (Call ambulance)",value:"ambulance"}]}],calc_score:function(e,t){var r=function(e,r){var n=parseInt(t.resp_rate);return n<e?1:n<r?2:n>=r?3:NaN};if("ambulance"==t.breathing_pattern||"ambulance"==t.oxymeter)return{zeroScore:_,ambulance:!0};var n=function(){switch(function(e){var t,r=e.birthDate,n=new Date;if("undefined"==typeof r)return NaN;t=12*(n.getFullYear()-r.getFullYear()),t-=r.getMonth();var i=(t=(t+=n.getMonth())<=0?0:t)/12;return t<=12?"infant":i<=3?"toddler":i<=6?"preschool":i<=12?"school":i<=18?"teen":null}(t)){case"infant":return r(60,70);case"toddler":return r(34,40);case"preschool":return r(30,36);case"school":return r(26,31);case"teen":return r(16,22);default:return NaN}}()+parseInt(t.oxymeter);return isNaN(n)?_:Object(l.a)(Object(l.a)({},_),{},{score:n})},message:function(e,t){return e<=2?{priority:P,text:"Follow up the next day"}:3==e?{priority:B,text:"Arrange visit the same day"}:e>=4?{priority:R,text:v("Emergency room referral")}:{priority:A,text:Object(g.jsx)("i",{children:"Select all the options and date of birth."})}}},{title:"Social circumstances",id:"social",items:[{id:"distance",label:"Distance from medical center",opts:["< 30 min","30 - 60 min","> 60 min"]},{id:"transport",label:"Means of transportation",opts:["Private vehicle",{label:"Public transportation",value:"3"}]}],calc_score:function(e,t){return D(M(t,e.items))},message:function(e,t){return e<=3?{priority:C,text:"No action"}:e>=3?{priority:B,text:"See observation of clinical signs"}:{priority:A,text:Object(g.jsx)("i",{children:"Select all the options."})}}}],H=function(e,t,r){return r.ambulance?{priority:I,text:v("Call ambulance")}:r.emergency?{priority:I,text:v("Emergency room referral")}:e.message(r.score,t)};function L(e){var t=e.getDate(),r=e.getMonth()+1;return e.getFullYear()+"-"+(r<=9?"0"+r:r)+"-"+(t<=9?"0"+t:t)}var U=function(e){var t=e.values;return Object(g.jsx)(m.a,{variant:"primary",disabled:!1,onClick:function(){return function(e){if(e.firstName&&e.lastName&&e.birthDate){var t=new x.default;t.autoTable({body:[["Name",e.firstName+" "+e.lastName],["Birth",L(e.birthDate)],["Date generated",L(new Date)]]}),t.autoTable({theme:"grid",html:"#results_table"}),t.autoTable({body:[["What to do",document.getElementById("final_message").innerText]]}),t.save(e.firstName+"-"+e.lastName+"-"+L(new Date)+".pdf")}else alert("Fill in full name and date of birth to generate a pdf.")}(t)},children:"Save as pdf"})},W=function(e){var t=function(e,t){var r={};return e.forEach((function(e){r[e.id]=e.calc_score(e,t)})),r}(E,e),r=function(e,t,r){if(0===e.length)throw"not enough sections.";var n=e[0],i=H(n,t,r[n.id]);return console.assert("number"===typeof i.priority,i),e.forEach((function(e){var n=H(e,t,r[e.id]);i.priority<n.priority&&(i=n)})),i.priority===A?{priority:A,text:Object(g.jsxs)("i",{children:["Nothing to do, fill in section '",e[0].title,"'"]})}:i}(E,e,t);if(r.priority>=R)var n="bg-warning";else if(r.priority>P||r.priority==T)n="bg-secondary";else n="bg-success";return Object(g.jsxs)(b.a,{children:[Object(g.jsx)(b.a.Header,{children:Object(g.jsx)("b",{children:"Results"})}),Object(g.jsxs)(b.a.Body,{children:[Object(g.jsxs)("table",{class:"table",id:"results_table",children:[Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{children:"Section"}),Object(g.jsx)("th",{children:"Action"}),Object(g.jsx)("th",{children:"Score"})]}),E.map((function(r){return function(e,t,r){var n=H(e,t,r);return Object(g.jsxs)("tr",{children:[Object(g.jsx)("td",{children:e.title}),Object(g.jsx)("td",{children:n.text}),Object(g.jsx)("td",{children:r.score})]})}(r,e,t[r.id])}))]}),Object(g.jsxs)(b.a,{children:[Object(g.jsx)(b.a.Header,{children:Object(g.jsx)("b",{children:"Final decision"})}),Object(g.jsx)("div",{class:n,children:Object(g.jsx)(b.a.Body,{id:"final_message",children:r.text})})]}),Object(g.jsx)(U,{values:e,scores:t})]})]})},Y=[{label:"First name",field:Object(g.jsx)(d.a,{name:"firstName",component:"input",type:"text",placeholder:"First Name"})},{label:"Last name",field:Object(g.jsx)(d.a,{name:"lastName",component:"input",type:"text",placeholder:"Last Name"})},{label:"Date of birth",field:Object(g.jsx)(d.a,{name:"birthDate",component:function(e){return Object(g.jsx)(y.a,{value:e.input.value,dropdownMonde:"select",selected:e.input.value,onChange:function(t){return e.input.onChange(t)}})}})}],z=function(){return Object(g.jsx)("div",{children:Y.map((function(e){return Object(g.jsxs)(h.a,{children:[Object(g.jsx)("label",{class:"col",children:e.label}),Object(g.jsx)(p.a,{children:e.field})]})}))})},J=function(e){e.handleSubmit,e.form,e.submitting,e.pristine;var t=e.values;return Object(g.jsxs)("div",{children:[Object(g.jsxs)(b.a,{children:[Object(g.jsx)(b.a.Header,{children:Object(g.jsx)("b",{children:"Patient information"})}),Object(g.jsx)(b.a.Body,{children:Object(g.jsx)(z,{})})]}),Object(g.jsxs)(b.a,{children:[E.map(N),W(t)]})]})},V=function(){return Object(g.jsxs)(j.a,{children:[Object(g.jsx)("h1",{children:"Assessment of cough and dyspnea in children"}),Object(g.jsxs)("i",{children:["Today: ",L(new Date)]}),Object(g.jsxs)(b.a,{children:[Object(g.jsx)(b.a.Header,{children:Object(g.jsx)("b",{children:"Usage"})}),Object(g.jsxs)(b.a.Body,{children:["This form stores ",Object(g.jsx)("b",{children:"no information anywhere"})," so your patients' information is safe. Filling in the form will update the table at the bottom of the page automatically. Once the form is filled in its entirety, you may download the table in pdf form by clicking the button at the end of the page. If the button does not seem to work it may be because your browser is blocking the download. If this happens check the URL bar of your browser for such indications and disable the setting by clicking on the icon that appears."]})]}),Object(g.jsx)(d.b,{onSubmit:w,initialValues:{},render:J})]})},q=function(e){e&&e instanceof Function&&r.e(6).then(r.bind(null,433)).then((function(t){var r=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,c=t.getTTFB;r(e),n(e),i(e),a(e),c(e)}))};c.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(V,{})}),document.getElementById("root")),q()}},[[49,1,3]]]);
//# sourceMappingURL=main.9ceeccdd.chunk.js.map