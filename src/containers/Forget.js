import React, { Component } from 'react';
import ForgetPage from '../components/ForgetPage';
import {passwordResetReq} from '../actions/api';

class Forget extends Component {
	constructor(props) {
    super(props);
    this.state = {user: {email: ''},
    							valid: false,
                  loading: false,
                  error: false,
                  etext: '',
                  done: false
  	};
  }

  handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    // this.validateInput(name, value);
    value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? this.setState({valid: true}) : this.setState({valid: false});

    return this.setState(
      {user:{...this.state.user, [name]: value}},
      () => console.log(name, value)
    );
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	if (this.state.valid) {
  		// or disable button
  		console.log("email sending...", this.state.user.email);
      this.setState({loading: true});
      //test it
      passwordResetReq(this.state.user.email)
      .then((res)=> {
        console.log('passwordResetReq succes');
        this.setState({loading: false, done: true});
      })
      .catch((e)=>{
        console.log(JSON.stringify(e))
        this.setState({error: true, etext: e.statusText || undefined});
      });
  	}
  }

  render() {
    return(
      <ForgetPage valid={this.state.valid}
				handleChange={this.handleChange} handleSubmit={this.handleSubmit}
				user={this.state.user} error={this.state.error}
				etext={this.state.etext} loading={this.state.loading} done={this.state.done}
      />

    );
  }
}

export default Forget;