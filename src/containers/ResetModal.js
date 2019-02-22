import React, { Component } from 'react';
import ResetModalView from '../components/ResetModalView';
import {updateUser} from '../actions/user';
import {connect} from 'react-redux';

class ResetModal extends Component {
	state = {pass: '', confPass: '', equal: false}

	constructor(props) {
		super(props);
	}

	// componentDidMount() {
	// 	this.checkEqual()
	// }

	handleChange = (e) => {
		const target = e.target
    const name = target.name
    const value = target.value
		console.log("changing", arguments);
		this.setState({[name]: value}, this.checkEqual)
	}

	checkEqual = () => {
		(this.state.pass === this.state.confPass) && this.state.pass.length >= 8 ?
		this.setState({equal: true}) : this.setState({equal: false})
	}

  resetUserPass = () => {
  	// this.state.equal ? console.log("resetUser", this.props.userToAction) : this.state

    // reset req and redux
    this.props.resetPass(this.props.userToAction._id, this.state.pass)

    if (this.props.successefuly || !this.props.error) {
    	//add notification successefull or not inst of close
    	this.props.closeReset();
    }
  }

	render() {
		const { pass, confPass, equal} = this.state
		return (
				<ResetModalView
				userToAction={this.props.userToAction}
				openReset={this.props.openReset}
				closeReset={this.props.closeReset}
				resetUserPass={this.resetUserPass}
				handleChange={this.handleChange} pass={pass}
				confPass={confPass} equal={equal}/>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  console.log("ResetModal state: ownPrors:", state, ownProps);
  return {
    error: state.user.error,
    etext: state.user.etext,
    isLoading: state.user.isLoading,
    successefuly: state.user.successefuly,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	resetPass: (userId, pass) => {console.log("resetPass", userId, pass); dispatch(updateUser(userId, pass))}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(ResetModal);