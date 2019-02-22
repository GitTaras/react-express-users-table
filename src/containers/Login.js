import React, { Component } from 'react';
import logo from '../logo.svg';
import LoginForm from '../components/LoginForm';
import {connect} from 'react-redux';
// import * as loginAction from './actions/login'
import {loginFetch} from '../actions/login';
// import {Link} from 'react-router-dom';


class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {user: { login: '',
                          password: ''
                        },
                  loginValid: false,
                  passwordValid: false,
                  formValid: false
                  }

  }

  clearForm = () => {
    this.setState({user: {login: '',
                          password: ''},
                  loginValid: false,
                  passwordValid: false,
                  formValid: false});
  }

  validateInput = (name, value) => {
    switch (name) {
      case 'login':
        //console.log("switch!!");
        return value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? this.setState({loginValid: true}) : this.setState({loginValid: false});
      case 'password':
        //console.log("switch!!");
        return value.length >= 6 ? this.setState({passwordValid: true}) : this.setState({passwordValid: false});
    //validate password
      default:
        return;
    }
  }

  formValid = () => {
    console.log("validation!!!");
    if (this.state.passwordValid && this.state.loginValid) {
      return this.setState({formValid: true});
    }
    return this.setState({formValid: false});
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.validateInput(name, value);
    return this.setState( {user:{...this.state.user, [name]: value}}, () => { this.formValid(); console.log(name, value) });
  }

  sendData = (e) => {
    e.preventDefault();
    console.log("sending...", this.state.user);
    console.log("thisProps", this.props);

    this.props.loginFetch(this.state.user);
  }


  render() {
    return(
        <LoginForm formIsValid={this.state.formValid}
        passwordIsValid={this.state.passwordValid}
        loginIsValid={this.state.loginValid}
        clearForm={this.clearForm}
        handleChange={this.handleChange} sendData={this.sendData}
        user={this.state.user} error={this.props.error}
        etext={this.props.etext} isLoading={this.props.isLoading}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("State: ownPrors:", state, ownProps);
  return {
    error: state.currentUser.error,
    etext: state.currentUser.etext,
    isLoading: state.currentUser.isLoading
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {loginFetch: (user) => {console.log("user to fetch", user); dispatch(loginFetch(user))}};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
