import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomainsReq, getRolesReq, updateRolesAndDomains} from '../actions/users';
import {addUser, clear} from '../actions/user.js'
import AddUserForm from '../components/AddUserForm'


class AddUser extends Component {

		constructor(props) {
			super(props);
			this.state = {Pname: undefined,};
		}

	  componentDidMount() {
	  	console.log("didMount");
	  	this.props.getRolesAndDomains();
  	}

  	selectImg = (name) => {
  		this.setState({Pname: name});
  		console.log("name", this.state.Pname);
		}

  	handleSubmit = (values) => {
  		// set primary image name default first image or null if no one img
  		if (values.avatar) {
  			if (this.state.Pname && values.avatar.length) {
  				values.primaryImage=this.state.Pname
  			} else if (values.avatar && values.avatar.length) {
  				let img = values.avatar.item(0);
  				values.primaryImage = img.name;
  			}
  			values.avatar = Array.from(values.avatar);
  		}


  		//do form data avatar: array<File>
  		//https://github.com/expressjs/multer/issues/354

  		//console.log(typeof(values.avatar), typeof(values.avatar[0]))
  		//console.log(values.avatar[0]);
  		this.props.addUser(values);
  		console.log("SubmitingForm:", JSON.stringify(values, null, 2))
  	}

    render(){
    	return (
	    	<AddUserForm onSubmit={this.handleSubmit}
	     		domains={this.props.domains}
	     		roles={this.props.roles}
	     		selectImg={this.selectImg}
	     		Pname={this.state.Pname}
	     		successefuly={this.props.successefuly}
	     		isLoading={this.props.isLoading}
	     		loadError={this.props.loadError}
	     		loadEtext={this.props.loadEtext}
	     		addLoading={this.props.addLoading}
	     		addError={this.props.addError}
	     		addEtext={this.props.addEtext}
	     		onClear={this.props.clear}
	     	/>
     	)
    }
}

const mapStateToProps = (state) => ({
	domains: state.users.domains,
	roles: state.users.roles,
	loadError: state.users.error,
  loadEtext: state.users.etext,
	isLoading: state.users.isLoading,
	addLoading: state.user.isLoading,
	addError: state.user.error,
	addEtext: state.user.etext,
	successefuly: state.user.successefuly,
});

const mapDispatchToProps = (dispatch)  => ({
	addUser: (user) => {/*console.log("addingUser");*/ dispatch(addUser(user))},
	clear: () => {console.log("clearing"); dispatch(clear())},
	getRolesAndDomains: () => {/*console.log("fetchingRolesAndDomains");*/ dispatch(updateRolesAndDomains())}
});

AddUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUser);

export default AddUser;