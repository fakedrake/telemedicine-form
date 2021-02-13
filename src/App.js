/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { render } from 'react-dom';
import { Form, Field } from 'react-final-form';
import { Container,Row,Col,Card } from 'react-bootstrap';

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


const mkInpt = (props) =>{
    if (props.opts !== undefined) {
        return (<Field name={props.id} component="select" class="form-control">
                    <option selected>Please Select</option>
                    {props.opts.map((opt,i) => (<option value={i+1}>{opt}</option>))}
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
const sections = [{
  title: "History of personal illness",
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
    var xs = JSON.stringify(score);
    if (score <= 6) {return "Follow up if deterioration";}
    if (score <= 9) {return "Follow up next day";}
    if (score > 9) {return "Observe clinical signs. (" + score + ")";}
    return (<it>Select all the options.</it>);
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
    var xs = JSON.stringify(score);
    if (score == 5) {return "Follow up in case of deterioration.";}
    if (score <= 7) {
        return "Arrange an office visit the same day if Social Circumstances >4 Otherwise Follow up in 6-8h (" +scores['clinical'] + ")"; // XXX
    }
    if (score == 8) {return "Emerengency Room Referral";}
    return (<it>Select all the options.</it>);
  }
},
{
  title: "Pysical signs",
  id: "physical",
  items: [
    {id: "age", label: "Age", opts: ["2 - 12 months", "1 - 3 years", "3 - 6 years", "6 - 12 years", "12 - 18 years"]},
    {id: "oxymeter", label: "Pulse oxymeter", opts:["> 97%", "94% - 97%", "90% - 94%"]},
    {id: "resp_rate", label: "Respiratory rate while afebrile and resting", field:<Field name="resp_rate" component="input" type="number"/>}
  ],
  calc_score: (sec,values) => sum(to_values(values, sec.items)),
  message: (score,scores) => {
    var xs = JSON.stringify(score);
    if (score == 5) {return "Follow up in case of deterioration.";}
    if (score <= 7) {
        if (scores["social"] > 4) {return "Arrange an office visit the same day" }
        if (scores["social"] <= 4) {return "Followup in 6 - 8h" }
        return <it>Fill in the social circumstances</it>;
    }
    if (score == 8) {return "Emerengency Room Referral";}
    return (<it>Select all the options.</it>);
  },
  title: "Social circumstances",
  id: "social",
  items: [
      {id: "distance", label: "Distance from medical center", opts:["< 30 min", "30 - 60 min", "> 60 min"]},
      {id: "transport", label: "Means of transportation", opts: ["Private vehicle", "Pubplic transport"]}
  ],
  calc_score: (sec,values) => sum(to_values(values, sec.items)),
  message: (score,scores) => {
      if (score <= 3) { return "No action" }
      if (score >= 3) {return "See observation of clinical signs"}
      return (<it>Select all the options.</it>);
  }
}];

const mkTableRow = (sec,values,scores) => {
    return (
        <tr>
            <td>{sec.title}</td>
            <td>{sec.message(sum(to_values(values, sec.items)),scores)}</td>
            <td>{sum(to_values(values, sec.items))}</td>
        </tr>);}
const calcScores = (sections,values) => {
    var ret = {};
    sections.forEach((sec) => {
        ret[sec.id] = sec.calc_score(sec,values);
    });
    return ret;
};
const mkTable = (values) => {
    var  scores = calcScores(sections,values);
    return (
        <Card>
            <Card.Header><b>Results</b></Card.Header>
            <Card.Body>
                <table class="table">
                    <tr><th>Section</th><th>Action</th><th>Score</th></tr>
                    {sections.map((sec) => mkTableRow(sec,values,scores))}
                </table>
            </Card.Body>
        </Card>);
  };

const mkForm = ({ handleSubmit, form, submitting, pristine, values }) => (
    <div>
      { sections.map(mkCard) }
      { mkTable(values) }
    </div>);
//       <pre>{JSON.stringify(values, 0, 2)}</pre>


const App = () => (
  <Container>
    <h1>Telemedicine</h1>
    <Form
      onSubmit={onSubmit}
      initialValues={{}}
      render={mkForm}
    />
  </Container>
);

export default App;
