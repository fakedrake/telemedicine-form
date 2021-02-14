/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { Button,Container,Row,Col,Card } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

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
           />)

const mkInpt = (props) =>{
    if (props.opts !== undefined) {
        return (<Field name={props.id} component="select" class="form-control">
                    <option selected>Please Select</option>
                    {props.opts.map((opt,i) =>
                        {if (typeof(opt) == "string") {
                            return (<option value={i+1}>{opt}</option>);
                         } else {
                             return (<option value={opt.value}>{opt.label}</option>)
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
const mkElem = mkDropDown;
const sum = (vals) => (vals.reduce((x,y) => (x + y), 0));
const to_values = (m,ids) => ids.map((i) => parseInt(m[i.id]));

const age_opts = [
    {label: "2 - 12 months", value: "infant"},
    {label:"1 - 3 years", value:"toddler"},
    {label:"3 - 6 years", value:"prescool"},
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
    const ageScore = () => {
        switch (development(values)) {
        case "infant": return rng(60,70);
        case "toddler": return rng(34,40);
        case "preschool": return rng(30,36);
        case "school": return rng(26,31);
        case "teen": return rng(23,28);
        default:
            return NaN;
        };
    }
    return ageScore() + parseInt(values['oxymeter']);
}
const sections = [{
  title: "History of present illness",
  id: "history",
  items: [
    {id: "coughs_per_hour", label: "Coughs per hour", opts: ["< 5","5 - 8","> 8"]},
    {id: "activity", label: "Level of activity", opts: ["Full active","Moderate restricted","Mostly sleeping"]},
    {id: "sleep", label: "Sleeping interrutions", opts: ["As usual","Waking up < 3 times/night","Waking up > 3 times/night"]},
    {id: "cough_dyspnea", label: "Progression of cough or dyspnea", opts: ["No progression or improvement","Slow progression","Rapid progression"]},
    {id: "urine", label: "Urine output", opts: ["As usual","Moderate decreased (more than half the usual output)","Severe decreased (less than half the usual output)"]},
    {id: "cardiac_respiratory", label: "History of cardiac/respiratory problems", opts: ["No", "Under control", "Not under control"]}
  ],
  calc_score: (sec,values) => sum(to_values(values, sec.items)),
  message: (score) => {
    if (score <= 6) {return "Follow up if deterioration";}
    if (score <= 9) {return "Follow up next day";}
    if (score > 9) {return "Observe clinical signs.";}
    return (<i>Select all the options.</i>);
  }
},
{
  title: "Observation of clinical signs",
  id: "clinical",
  items: [
    {id: "resp_effort", label: "Respiratory effort", opts: ["No accessory muscles", "1 accessory muscle", "\u2265 2 accessory muscles"]},
    {id: "lay_down", label: "Ability to lay down", opts: ["Comfortable when lying down", "Unomfortable when lying down", "Mostly seating"]},
    {id: "speak", label: "Ability to speak", opts: ["In full sentences / babbles", "Only phrases / short cries", "Only words / grunting"]},
    {id: "feed", label: "Ability to feed", opts: ["As usual decreased", "Decreased", "Severely reduced"]},
    {id: "mental", label: "Mental status", opts: ["Normal", "Moderate crying / Agitated", "Severe irritability"]}
  ],
  calc_score: (sec,values) => sum(to_values(values, sec.items)),
  message: (score,scores) => {
    if (score == 5) {return "Follow up in case of deterioration.";}
    if (score <= 7) {
        return "Arrange an office visit the same day if Social Circumstances >4 Otherwise Follow up in 6-8h (" +scores['clinical'] + ")"; // XXX
    }
    if (score == 8) {return "Emerengency Room Referral";}
    return (<i>Select all the options.</i>);
  }
},
{
  title: "Pysical signs",
  id: "physical",
  items: [
    {id: "oxymeter", label: "Pulse oxymeter", opts:["> 97%", "94% - 97%", "90% - 94%"]},
    {id: "resp_rate", label: "Respiratory rate while afebrile and resting", field:<Field name="resp_rate" component="input" type="number"/>}
  ],
  calc_score: physScore,
  message: (score,scores) => {
      if (score <= 2) {return "Follow up the next day";}
      if (score == 3) {return "Arrange visit the same day";}
      if (score >= 4) {return "Emergency room referral";}
      return (<i>Select all the options and date of birth.</i>);
  },
},
{
  title: "Social circumstances",
  id: "social",
  items: [
      {id: "distance", label: "Distance from medical center", opts:["< 30 min", "30 - 60 min", "> 60 min"]},
      {id: "transport", label: "Means of transportation", opts: ["Private vehicle", {label: "Pubplic transport",value:"3"}]}
  ],
  calc_score: (sec,values) => sum(to_values(values, sec.items)),
  message: (score,scores) => {
      if (score <= 3) { return "No action" }
      if (score >= 3) {return "See observation of clinical signs"}
      return (<i>Select all the options.</i>);
  }
}];

const mkTableRow = (sec,values,scores) => {
    return (
        <tr>
            <td>{sec.title}</td>
            <td>{sec.message(scores[sec.id],scores)}</td>
            <td>{scores[sec.id]}</td>
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
    const doc = new jsPDF();
    doc.autoTable({ body : [
        ["Name", values["firstName"] + " " + values["lastName"]],
        ["Birth", fmtDate(values["birthDate"])],
        ["Date generated", fmtDate(new Date())],
        ]})
    doc.autoTable({ theme: 'grid', html: '#results_table' })
    doc.save(
        values['firstName'] + '-' + values['lastName'] + '-' + fmtDate(new Date()) + '.pdf')
}

const PdfButton = props => {
    var enable = !Object.values(props.scores).some(isNaN);
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
    return (
        <Card>
            <Card.Header><b>Results</b></Card.Header>
            <Card.Body>
                <table class="table" id="results_table">
                    <tr><th>Section</th><th>Action</th><th>Score</th></tr>
                    {sections.map((sec) => mkTableRow(sec,values,scores))}
                </table>
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
//       <pre>{JSON.stringify(values, 0, 2)}</pre>


const App = () => (
  <Container>
    <h1>Telemedicine</h1>
    <i>Today: {fmtDate(new Date())}</i>
    <Form
      onSubmit={onSubmit}
      initialValues={{}}
      render={mkForm}
    />
  </Container>
);

export default App;
