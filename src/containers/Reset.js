import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ResetPage from '../components/ResetPage';
import {passwordChangeReq} from '../actions/api';


class Reset extends Component {
	constructor(props) {
    super(props);
    this.state = {user: {password: '',
                         passwordConfirm: ''},
    							passwordsEqual: false,
                  loading: false,
                  error: false,
                  etext: '',
                  done: false,
                  valid: false
  	};
  }

  componentDidMount() {
    console.log("Reset component did mount ", this.props);
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    if (this.props.match.params.id !== nextProps.match.params.id ||
      this.props.match.params.token !== nextProps.match.params.token) {
      return true;
    }
    return false;
  }*/

  handleChange = async (e) => {
    console.log('handle change');
    const target = e.target;
    const name = target.name;
    const value = target.value;
    if (value.length >= 8) {

      this.setState({user:{...this.state.user, [name]: value}, valid: true},
       ()=> {this.checkEqual()
      });
    } else {
      console.log('else');
      this.setState({user:{...this.state.user, [name]: value}, valid: false},
        () => {
          setTimeout(() => {
            this.checkEqual()
          },600)
      });
    }

  }

  checkEqual = () =>  {
    if (this.state.user.password === this.state.user.passwordConfirm &&
     this.state.user.password.length && this.state.user.passwordConfirm.length) {
      return this.setState({passwordsEqual: true},
       console.log("length ",this.state.user.passwordConfirm.length,
         this.state.user.passwordConfirm, this.state.user.password));
    }else {
      return this.setState({passwordsEqual: false},
        console.log("length ",this.state.user.passwordConfirm.length,
          this.state.user.passwordConfirm, this.state.user.password));
    }
  }

  handleSubmit = (e) => {
  	e.preventDefault();
  	if (this.state.passwordsEqual && this.state.valid
      && this.props.match.params.id && this.props.match.params.token) {
  		// or disable button
  		console.log("password sending...", this.state.user.password);
      this.setState({loading: true});

      passwordChangeReq(this.state.password,
        this.props.match.params.id, this.props.match.params.token)
      .then((res)=> {
        this.setState({done: true, loading: false, user: {password: '', passwordConfirm: ''}});
      })
      .catch((e)=>{
        console.error('passwordResetReq: ', e);
        this.setState({error: true, etext: e.statusText || undefined,
         user: {password: '', passwordConfirm: ''}
        });
      });
  	}
  }

  render() {
    return(
      <ResetPage passwordsEqual={this.state.passwordsEqual}
				handleChange={this.handleChange} handleSubmit={this.handleSubmit}
				user={this.state.user} error={this.state.error} valid={this.state.valid}
				etext={this.state.etext} loading={this.state.loading} done={this.state.done}
        id={this.props.match.params.id} token={this.props.match.params.token}
      />
    );
  }
}

export default Reset;