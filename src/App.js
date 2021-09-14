/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { Button,Container,Row,Col,Card } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const red_text = (text) => <b style={{color:"red"}}>{text}</b>

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};


const mkCard = (dat) => (
  <Card>
    <Card.Header><b>{dat.title}</b></Card.Header>
    <Card.Body>
      {dat.items.map(mkElem)}
    </Card.Body>
  </Card>);

const DatePickerWrapper = props =>
      (<DatePicker
           value={props.input.value}
           dropdownMonde="select"
           selected={props.input.value}
           onChange={val => props.input.onChange(val)}
           />);

const optStyle = (value) =>{ return {}; }

const mkInpt = (props) =>{
    if (props.opts !== undefined) {
        return (<Field name={props.id} component="select" class="form-control">
                    <option selected>Please Select</option>
                    {props.opts.map((opt,i) =>
                        {if (typeof(opt) == "string") {
                            return (<option value={i + 1}>{opt}</option>);
                         } else {
                             return (<option style={optStyle(opt.value)} value={opt.value}>{opt.label}</option>)
                         }})}
                </Field>);
    } else {
        return props.field;
    }
}
const mkDropDown = (props) => (
  <Row>
    <Col>
      <label class="col">{props.label}</label>
    </Col>
    <Col>
      {mkInpt(props)}
    </Col>
  </Row>
);

const zeroScore = {is_score: true,emergency:false,ambulance:false,score:NaN}
const mkElem = mkDropDown;
const combScores = (x,y) => ({
    is_score:true,
    ambulance:x.ambulance || y.ambulance,
    emergency:x.emergency || y.emergency,
    score:x.score + y.score});
const sum_scores = vals => vals.reduce(combScores, {...zeroScore,score:0});
const to_scores = (m,ids) => ids.map((i) => {
    switch (m[i.id]) {
    case "ambulance": return {...zeroScore,ambulance:true};
    case "emergency": return {...zeroScore,emergency:true};
    default: return {...zeroScore,score:parseInt(m[i.id])};
    }
});

const age_opts = [
    {label: "2 - 12 months", value: "infant"},
    {label:"1 - 3 years", value:"toddler"},
    {label:"3 - 6 years", value:"preschool"},
    {label:"6 - 12 years", value:"school"},
    {label:"12 - 18 years", value:"teen"}]

const development = (values) => {
    const d1 = values["birthDate"], d2 = new Date()
    if (typeof(d1) == "undefined") return NaN;
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    months = months <= 0 ? 0 : months;
    const y = months / 12;

    if (months <= 12) {return "infant";}
    if (y <= 3) return "toddler";
    if (y <= 6) return "preschool";
    if (y <= 12) return "school";
    if (y <= 18) return "teen";
    return null;
}

const physScore = (sec,values) => {
    const rng = (low,high) => {
        var resp = parseInt(values['resp_rate']);
        if (resp < low) {
            return 1;
        } else if (resp < high) {
            return 2;
        } else if (resp >= high) {
            return 3;
        }
        return NaN;
    };
    // Res rate score,
    const ageScore = () => {
        switch (development(values)) {
        case "infant": return rng(60,70);
        case "toddler": return rng(34,40);
        case "preschool": return rng(30,36);
        case "school": return rng(26,31);
        case "teen": return rng(16,22);
        default:
            return NaN;
        };
    }
    if (values['breathing_pattern'] == 'ambulance' || values['oxymeter'] == 'ambulance') {
        return {zeroScore,ambulance:true}
    }
    const score = ageScore() + parseInt(values['oxymeter']);
    if (isNaN(score)) return zeroScore
    return {...zeroScore,score:score}
}

const priorities = {
    none: 0,
    blue: 1,
    yellow: 2,
    brown: 3,
    red: 4,
    top: 5,
    fill: 0.5
}

const sections = [{
  title: "History of present illness",
  id: "history",
  items: [
    {id: "coughs_per_hour", label: "Coughs per hour", opts: ["< 5","5 - 8","> 8"]},
    {id: "wheezing", label: "Wheezing", opts: ["No","Periodically","Yes"]},
    {id: "activity", label: "Level of activity", opts: ["Full active","Moderate restricted","Mostly sleeping"]},
    {id: "sleep", label: "Sleeping", opts: ["As usual","Waking up < 3 times/night","Waking up > 3 times/night"]},
    {id: "cough_dyspnea", label: "Progression of cough or dyspnea", opts: ["No progression or improvement","Slow progression","Rapid progression"]},
    {id: "urine", label: "Urine output", opts: ["As usual","Moderate decreased (more than half the usual output)","Severe decreased (less than half the usual output)"]},
    {id: "cardiac_respiratory", label: "History of cardiac/respiratory problems", opts: ["No", "Under control", "Not under control"]}
  ],
  calc_score: (sec,values) => sum_scores(to_scores(values, sec.items)),
  message: (score) => {
    if (score <= 7) {return {priority: priorities.blue, text: "Follow up if deterioration"};}
    if (score <= 10) {return {priority: priorities.yellow, text: "Follow up next day"};}
    if (score > 10) {return {priority: priorities.fill, text: "Emergency Room Referral or fill in section '".concat(sections[1].title, "'.")  };}
    return {priority: priorities.none, text: (<i>Select all the options.</i>)};
  }
},
{
  title: "Observation of clinical signs",
  id: "clinical",
  items: [
    {id: "mental", label: "Mental status",
     opts: ["Normal", "Moderate crying / Agitated", "Irritability",
            {label:"Lethargy - emergency room referral",value:"emergency"},
            {label:"Unresponsive - call ambulance",value:"ambulance"}]},
    {id: "skin_color", label: "Skin color", opts: [{label:"Normal",value:"0"},
                                                   {label:"Motted / grey - call ambulance", value:"ambulance"}]},
    {id: "resp_effort", label: "Respiratory effort", opts: ["No accessory muscles", "1 accessory muscle", "\u2265 2 accessory muscles"]},
    {id: "lay_down", label: "Ability to lay down", opts: ["Comfortable when lying down", "Unomfortable when lying down", "Mostly seating"]},
    {id: "speak", label: "Ability to speak", opts: ["In full sentences / babbles", "Only phrases / short cries", "Only words / grunting"]},
    {id: "feed", label: "Ability to feed", opts: ["As usual", "Decreased", "Severely reduced"]},
    {id:"breathing_pattern", label:"Breathing pattern", opts:[
        {label:"Normal",value:"0"},
        {label:"Rapid/Shallow breathing - call ambulance", value:"ambulance"}]}
  ],
  calc_score: (sec,values) => sum_scores(to_scores(values, sec.items)),
  message: (score,scores) => {
    if (score <= 5) {return {priority:priorities.yellow, text: "Follow up in case of deterioration."};}
    if (score <= 7) {
        return {
            priority:priorities.brown,
            text: "Arrange an office visit the same day if Social Circumstances >4 Otherwise Follow up in 6-8h (" +scores['clinical'] + ")"}; // XXX
    }
    if (score >= 8) {return {priority:priorities.red, text: red_text("Emergency Room Referral")};}
    return {priority: priorities.none, text: (<i>Select all the options.</i>)};
  }
},
{
  title: "Physical signs",
  id: "physical",
  items: [
    {id: "resp_rate", label: "Respiratory rate while afebrile and resting", field:<Field name="resp_rate" component="input" type="number"/>},
    {id: "oxymeter", label: "Pulse oxymeter", opts:["> 97%", "94% - 97%", "90% - 94%", {label:"< 90% (Call ambulance)", value:"ambulance"}]}
  ],
  calc_score: physScore,
  message: (score,scores) => {
      if (score <= 2) {return {priority: priorities.yellow,text: "Follow up the next day"};}
      if (score == 3) {return {priority: priorities.brown,text: "Arrange visit the same day"};}
      if (score >= 4) {return {priority: priorities.red,text: red_text("Emergency room referral")};}
      return {priority: priorities.none,text: (<i>Select all the options and date of birth.</i>)};
  },
},
{
  title: "Social circumstances",
  id: "social",
  items: [
      {id: "distance", label: "Distance from medical center", opts:["< 30 min", "30 - 60 min", "> 60 min"]},
      {id: "transport", label: "Means of transportation", opts: ["Private vehicle", {label: "Public transportation",value:"3"}]}
  ],
  calc_score: (sec,values) => sum_scores(to_scores(values, sec.items)),
  message: (score,scores) => {
      if (score <= 3) { return {priority: priorities.blue,text: "No action"} }
      if (score >= 3) {return {priority: priorities.brown,text: "See observation of clinical signs"}}
      return {priority: priorities.none,text: (<i>Select all the options.</i>)};
  }
}];

const messageOf = (section, values, scoreObj) => {
    if (scoreObj.ambulance) {
        return {priority: priorities.top,text: red_text("Call ambulance")};
    } else if (scoreObj.emergency) {
        return {priority: priorities.top, text: red_text("Emergency room referral")}
    } else {
        return section.message(scoreObj.score,values);
    }
}

// Find the final message from the sections.
const finalMessage = (sections,values,scores) => {
    if (sections.length === 0) {
        throw "not enough sections.";
    }
    var fstSection = sections[0];
    var bestMsg = messageOf(fstSection, values, scores[fstSection.id]);
    console.assert(typeof bestMsg.priority === 'number', bestMsg);
    sections.forEach((sec) => {
        var tmpMsg = messageOf(sec,values,scores[sec.id]);
        if (bestMsg.priority < tmpMsg.priority) {
            bestMsg = tmpMsg;
        }
    });

    // If the best message is none return a special message
    if (bestMsg.priority === priorities.none) {
        return {priority: priorities.none, text: (<i>Nothing to do, fill in section '{sections[0].title}'</i>) };
    }
    return bestMsg;
}

const mkTableRow = (section,values,scoreObj) => {
    var msg = messageOf(section, values, scoreObj);
    // if (scores[sec.id].ambulance) {
    //     msg = {text: red_text("Call ambulance")};
    // } else if (scores[sec.id].emergency) {
    //     msg = {text: red_text("Emergency room referral")};
    // } else {
    //     msg = sec.message(scores[sec.id].score,values);
    // }
    return (
        <tr>
            <td>{section.title}</td>
            <td>{msg.text}</td>
            <td>{scoreObj.score}</td>
        </tr>);}


const calcScores = (sections,values) => {
    var ret = {};
    sections.forEach((sec) => {
        ret[sec.id] = sec.calc_score(sec,values);
    });
    return ret;
};

function fmtDate(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const savePdf = values => {
    if (!(values["firstName"] && values["lastName"] && values["birthDate"])) {
        alert("Fill in full name and date of birth to generate a pdf.");
        return;
    }
    const doc = new jsPDF();
    doc.autoTable({ body : [
        ["Name", values["firstName"] + " " + values["lastName"]],
        ["Birth", fmtDate(values["birthDate"])],
        ["Date generated", fmtDate(new Date())],
        ]})
    doc.autoTable({ theme: 'grid', html: '#results_table' })
    doc.autoTable({ body: [["What to do", document.getElementById('final_message').innerText ]] })
    doc.save(
        values['firstName'] + '-' + values['lastName'] + '-' + fmtDate(new Date()) + '.pdf')
}
const isInValid = s => (isNaN(s.score) && !s.ambulance && !s.emergency);
const PdfButton = props => {
    // Uncomment if you want to be able to print if EVERYTHING is completed.
    // var enable = !Object.values(props.scores).some(isInValid);

    // Print at any time.
    var enable = true;
    const values = props.values;
    if (enable) {
        return (<Button variant="primary" disabled={false} onClick={() => savePdf(values)} >
                   Save as pdf
               </Button>)
    } else {
        return (
        <div>
            <Button variant="primary" disabled={true} >
                Save as pdf
            </Button>
            <i>Complete the form to enable</i>
        </div>);
    }
}


const mkTable = (values) => {
    var  scores = calcScores(sections,values);
    var finalMsg = finalMessage(sections,values,scores)
    if (finalMsg.priority >= priorities.red) {
        var cardTheme = "bg-warning"
    } else if (finalMsg.priority > priorities.yellow || finalMsg.priority == priorities.fill) {
        var cardTheme = "bg-secondary"
    } else {
        var cardTheme = "bg-success"
    }
    return (
        <Card>
            <Card.Header><b>Results</b></Card.Header>
            <Card.Body>
                <table class="table" id="results_table">
                    <tr><th>Section</th><th>Action</th><th>Score</th></tr>
                    {sections.map((sec) => mkTableRow(sec,values,scores[sec.id]))}
                </table>
                <Card class="text-white bg-primary mb-3">
                    <Card.Header><b>Final decision</b></Card.Header>
                    <div class={cardTheme}>
                        <Card.Body id="final_message">{finalMsg.text}</Card.Body>
                    </div>
                </Card>
                <PdfButton values={values} scores={scores} />
            </Card.Body>
        </Card>);
  };


const patient_details = [
    {label:"First name", field: <Field name="firstName" component="input" type="text" placeholder="First Name"/>},
    {label:"Last name", field: <Field name="lastName" component="input" type="text" placeholder="Last Name"/>},
    {label:"Date of birth", field: <Field name="birthDate" component={DatePickerWrapper} />}
]
const InfoTable = () => <div>
{ patient_details.map((d) =>
    <Row>
        <label class="col">{d.label}</label>
        <Col>
            {d.field}
        </Col>
    </Row>
)}
</div>

const mkForm = ({ handleSubmit, form, submitting, pristine, values }) => (
    <div>
        <Card>
            <Card.Header><b>Patient information</b></Card.Header>
            <Card.Body>
                <InfoTable/>
            </Card.Body>
        </Card>
        <Card>
            { sections.map(mkCard) }
            { mkTable(values) }
        </Card>
    </div>);
// <pre>{JSON.stringify(values, 0, 2)}</pre>


const App = () => (
  <Container>
    <h1>Assessment of cough and dyspnea in children</h1>
    <i>Today: {fmtDate(new Date())}</i>
    <Card>
        <Card.Header><b>Usage</b></Card.Header>
        <Card.Body>
            This form stores <b>no information anywhere</b> so your patients' information is
            safe.
            Filling in the form will
            update the table at the bottom of the page automatically. Once the form
            is filled in its entirety, you may download the table in pdf form by clicking
            the button at the end of the page. If the button does not seem to work it may
            be because your browser is blocking the download. If this happens check the
            URL bar of your browser for such indications and disable the setting by
            clicking on the icon that appears.
        </Card.Body>
    </Card>
    <Form
      onSubmit={onSubmit}
      initialValues={{}}
      render={mkForm}
    />
  </Container>
);

export default App;
