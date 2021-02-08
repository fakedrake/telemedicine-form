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
      {dat.items.map(mkDropDown)}
    </Card.Body>
  </Card>);


const mkDropDown = (props) => (
  <Row>
    <Col>
      <label class="col">{props.label}</label>
    </Col>
    <Col>
      <Field name={props.id} component="select" class="form-control">
        <option selected>Please Select</option>
        {props.opts.map((opt,i) => (<option value={i+1}>{opt}</option>))}
  </Field>
  </Col>
  </Row>
);

const sections = [{
  title: "History of personal illness",
  items: [
    {id: "coughs_per_hour", label: "Coughs per hour", opts: ["< 5","5 - 8","> 8"]},
    {id: "activity", label: "Level of activity", opts: ["Full active","Moderate restricted","Mostly sleeping"]},
    {id: "sleep", label: "Sleeping interrutions", opts: ["As usual","Waking up < 3 times/night","Waking up > 3 times/night"]},
    {id: "cough_dyspnea", label: "Progression of cough or dyspnea", opts: ["No progression or improvement","Slow progression","Rapid progression"]},
    {id: "urine", label: "Urine output", opts: ["As usual","Moderate decreased (more than half the usual output)","Severe decreased (less than half the usual output)"]},
    {id: "cardiac_respiratory", label: "History of cardiac/respiratory problems", opts: ["No", "Under control", "Not under control"]}
  ],
  message: (score) => {
    if (score <= 6) {return "Follow up if deterioration";}
    if (score <= 9) {return "Follow up next day";}
    if (score > 9) {return "Observe clinical signs. (" + score + ")";}
    return (<it>Select all the options</it>);
  }
}];


const mkTable = (values) => (
  <table class="table">
    <tr><th>Section</th><th>Action</th></tr>
    {sections.map((sec) => (
      <tr>
        <td>{sec.title}</td>
        <td>{sec.message(sec.items.reduce((x,y) => parseInt(values[y.id]) + parseInt(values[x.id])))}</td>
      </tr>))}
  </table>);

const mkForm = ({ handleSubmit, form, submitting, pristine, values }) => (
    <div>
      {sections.map(mkCard)}
      { mkTable(values) }
      <pre>{JSON.stringify(values, 0, 2)}</pre>
    </div>);

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
