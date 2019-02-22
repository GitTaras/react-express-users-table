import React, { Component } from 'react';
//import {Jumbotron, Alert, Button, Input, Grid, Row, Col, Clearfix, FormGroup, ControlLabel, FormControl, Label} from 'react-bootstrap';
import {Header, Grid, Button, Icon, Checkbox, Form, Message} from "semantic-ui-react";
import {Link} from 'react-router-dom';

const ReseetPage = (props) => {
	const {user, error, etext, loading, done, valid, passwordsEqual, id, token} = props;
  return (
    <React.Fragment>
      <Grid centered columns={2} padded>
        <Grid.Row>
          <Grid.Column>
            <Header as="h4" textAlign="center">
              <strong>Reset your password</strong>
            </Header>
            {done && <Message attached success>
              <Message.Header>Password Reseted Successfully</Message.Header>
              <Message.Content>
                please go to home screen to sign in&nbsp; <Link to="/">Login here</Link>&nbsp;
              </Message.Content>
            </Message>}
            <Form loading={loading} className="attached fluid segment" onSubmit={props.handleSubmit}>
              <Form.Input
                type="hiden"
                name="id"
                value={id}
              />
              <Form.Input
                type="hidden"
                name="token"
                value={token}
              />
              <Form.Input required
                label='Password:'
                type="password"
                name="password"
                placeholder='password'
                value={user.password}
                onChange={props.handleChange}
              />
              <Form.Input required
                label='Confirm Password:'
                type="password"
                name="passwordConfirm"
                placeholder='confirm password'
                value={user.passwordConfirm}
                onChange={props.handleChange}
              />
              {!passwordsEqual && <Message negative
                content="Password's must be equal!!!"
              />}
              {!valid && <Message negative
                content="Password's must be at least 8 characters long"
              />}
              <Button primary type="submit" disabled={!passwordsEqual || !valid || loading}>
                  <strong>RESET PASSWORD</strong>
              </Button>
            </Form>
            {error && <Message error attached='bottom'>
              <Message.Header>Error</Message.Header>
              {etext && <Message.Content>
                {etext} error occurred please try again later or go to home screen &nbsp; <Link to="/"><a>Login here</a></Link>&nbsp;
              </Message.Content>}
              {!etext && <Message.Content>
                Some unknown server error occurred. Please try again later or go to home screen &nbsp; <Link to="/"><a>Login here</a></Link>&nbsp;
              </Message.Content>}
            </Message>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>);
}

export default ReseetPage;

// <Link to="/"><Icon link name='arrow alternate circle left' size='big' />Home</Link>
/*
    <Jumbotron bsClass="jumbotron full-width vertical-center">
    {done && <h1 className="text-center" style="background-color: #12d135; color: white;" >
      <small style="color: white;">Your password has been reset, please go to home screen to sign in</small>
    </h1>}{' '}

    <Grid fluid={true} bsClass="text-center">
      <Row className="show-grid">
        <Col mdOffset={4} md={4}>
          <Link to="/"><span className="glyphicon glyphicon-arrow-left">Home</span></Link>
          <h4 className="text-center">
            <strong>Reset your password</strong>
          </h4>
          {!passwordsEqual && <p className="text-center text-danger">
            Password's must be equal!!!
          </p>}
        </Col>
      </Row>
      <Row className="show-grid">
        <Col mdOffset={3} md={6}>
            <form className="text-center" onSubmit={this.props.handleSubmit}>
              <FormGroup
                controlId="formPassword"
             >
                <ControlLabel>Password:</ControlLabel>
                <FormControl
                  name="password"
                  type="password"
                  value={user.password}
                  placeholder="Enter password"
                  onChange={this.props.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <FormGroup
                controlId="formPasswordConfirm"
             >
                <ControlLabel>Confirm Password:</ControlLabel>
                <FormControl
                  name="passwordConfirm"
                  type="password"
                  value={user.passwordConfirm}
                  placeholder="Confirm password"
                  onChange={this.props.handleChange}
                />
                <FormControl.Feedback />
              </FormGroup>
              <div className="pull-right">
                <Button bsStyle="primary" type="submit" value="Submit">
                  <strong>RESET PASSWORD</strong>
                </Button>
              </div>
            </form>
        </Col>
      </Row>


       <h4>
         {error && <Label bsStyle="danger">{etext}</Label>}{' '}
       </h4>

      <h4 className="text-center">
        {sending && <Label bsStyle="danger">Sending...</Label>}{' '}
      </h4>
    </Grid>
  </Jumbotron>
*/