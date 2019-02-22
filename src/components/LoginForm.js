import React, { /*Component, */PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {Segment, Grid, Button, Form, Message, Input } from 'semantic-ui-react'

/*
*user enter log and pas that's passing validation and
*if it's was passed SIGNIN button become activated.
*
*Maybe later it will be modal window what start with
*button click
*/

class LoginForm extends PureComponent{
  constructor(props) {
    super(props);
  }

  render() {

    const {user, error, etext} = this.props;
    console.log('rend', error, this.props);
    return (

    <Grid columns={2}  centered >
      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
          <Segment.Group>
            <Segment compact>
              <Link to="/forget" >Forgot password ?</Link>
              <h4>Enter login and pass</h4>
            </Segment>

            <Segment inverted color="teal">
              <Form error={error} loading={this.props.isLoading} onSubmit={this.props.sendData}>

                <Form.Field error={!this.props.loginIsValid}>
                  <label>Login:</label>
                  <Input icon='user' iconPosition='left' placeholder="login" type="text" name="login" value={user.login} onChange={this.props.handleChange}/>
                </Form.Field>

                <Form.Field error={!this.props.passwordIsValid}>
                  <label>Password:</label>
                  <Input icon='lock' iconPosition='left' placeholder="password" type="password" name="password" value={user.password} onChange={this.props.handleChange}/>
                </Form.Field>
                <Button color='red' type="button" onClick={this.props.clearForm}>CLEAR</Button>
                <Button disabled={!this.props.formIsValid} type="submit" floated='right' color='green' >LOGIN</Button>
                <Message
                      error
                      header={etext}
                      content={etext.message}
                />
              </Form>
            </Segment>

          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    );
  }
}


export default LoginForm;