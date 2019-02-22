import React, { Component } from 'react';
import {Header, Grid, Button, Icon, Checkbox, Form, Message, Image} from "semantic-ui-react";
import {Link} from 'react-router-dom';

const ForgetPage = (props) => {
  const {user, error, etext, loading, valid, done} = props;
    return <React.Fragment>
      <Grid centered columns={2} padded>
        <Grid.Row>
          <Grid.Column container textAlign='center'>
            <p>
              if the email you specifief exists in our system, we've sent a password reset link to it.
            </p>
            <Image size='small' centered
              src="http://lorempixel.com/140/140/"
              srcSet="http://lorempixel.com/140/140/"
            />
            <Header as='h4' textAlign='center'>
            	<strong>Forgot your password?</strong>
            </Header>
            <p>
              We'll send you email with a link to reset your password.
            </p>
            {done && <Message attached success>
              <Message.Header>Check your mail</Message.Header>
              <Message.Content>
                We send you email with a link to reset your password. Please check it.
              </Message.Content>
            </Message>}
            <Form loading={loading} className="attached fluid segment" onSubmit={props.handleSubmit}>
              <Form.Input required
                label='Email'
                type="email"
                name="email"
                placeholder='some.mail@mail.com'
                value={user.email}
                onChange={props.handleChange}
              />
              {!valid && <Message negative
                content="Please enter correct email"
              />}
              <Button primary type="submit" disabled={!valid || loading}>
                  <strong>SEND</strong>
              </Button>
            </Form>
            {error && <Message error attached='bottom'>
              <Message.Header>Error</Message.Header>
              {etext && <Message.Content>
                {etext} error occurred please try again later or go to home screen &nbsp; <Link to="/">Login here</Link>&nbsp;
              </Message.Content>}
              {!etext && <Message.Content>
                Some unknown server error occurred. Please try again later or go to home screen &nbsp; <Link to="/">Login here</Link>&nbsp;
              </Message.Content>}
            </Message>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
   </React.Fragment>
}

export default ForgetPage;