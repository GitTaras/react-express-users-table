import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDomainsReq, getRolesReq, updateRolesAndDomains } from '../actions/users';
import {getUser, updateUser, clear} from '../actions/user.js'
import UpdateUserForm from '../components/UpdateUserForm'
import {Loader} from 'semantic-ui-react'



class UpdateUser extends Component {

	constructor(props) {
		super(props);
		this.state = {Pname: undefined};
	}

  componentDidMount() {
  	//it must be async
  	// https://github.com/reduxjs/redux-thunk/issues/102#issuecomment-412265453
  	// https://developers.google.com/web/ilt/pwa/working-with-promises
  	// https://www.promisejs.org/patterns/
		/*Promise.All([
			this.props.dispatch(getUser(this.props.match.params.id)),
			this.props.dispatch(updateRolesAndDomains())
		]).then(()=>{
			console.log("preload done")
		}).catch((e)=>{
			console.error("preload error: ", e);
		})*/
		this.props.getUser(this.props.match.params.id)
		this.props.getRolesAndDomains()
	}

	selectImg = (name) => {
		this.setState({Pname: name});
		console.log("name", this.state.Pname);
	}

	handleSubmit = (values) => {
		// set primary image name, default first image or null if no one img
		console.log("SubmitingForm:", JSON.stringify(values, null, 2))
		if (values.avatar) {
			if (this.state.Pname && values.avatar.length) {
				values.primaryImage = this.state.Pname
			} else if (values.avatar.length) {
				let img = values.avatar.item(0);
				values.primaryImage = img.name;
			}
			values.avatar = Array.from(values.avatar);
		}

		this.props.updateUser(values);
		console.log("SubmitingForm:", JSON.stringify(values, null, 2))
	}

    render(){
    	//const {user, loadError, loadEtext, isLoading} = this.props;
    	//console.log(this.props)

    	return (
    		<React.Fragment>
    			{(!Boolean(this.props.user) || Boolean(this.props.domainsAndRolesLoading) || this.props.userIsLoading) ?
    				( <React.Fragment>
    						<Loader active={this.props.userIsLoading} inline='centered' size='large'/>
    			  		{this.props.userLoadError || this.props.domainsAndRolesLoadError
    			  			&& <p>Some error {this.props.userLoadEtext} {this.props.domainsAndRolesLoadEtext}</p>
    			  		}
    			  	</React.Fragment>
    			  ):
    				(
    					//ххх 4 downloads 5 image ?
							<UpdateUserForm onSubmit={this.handleSubmit}
								domains={this.props.domains}
								roles={this.props.roles}
								selectImg={this.selectImg}
								Pname={this.state.Pname}
								userIsLoading={this.props.userIsLoading}
								userLoadError={this.props.userLoadError}
								userLoadEtext={this.props.userLoadEtext}
								successefuly={this.props.successefuly}
							/>
						)
					}
	     	</React.Fragment>
     	)
    }
}

const mapStateToProps = (state/*, ownProps*/) => ({
	domains: state.users.domains,
	roles: state.users.roles,
	domainsAndRolesLoading: state.users.isLoading,
	domainsAndRolesLoadError: state.users.error,
	domainsAndRolesLoadEtext: state.users.etext,
	userLoadError: state.user.error,
  userLoadEtext: state.user.etext,
	userIsLoading: state.user.isLoading,
	user: state.user.user,
	successefuly: state.user.successefuly,
});

const mapDispatchToProps = (dispatch)  => ({
	// fetchDomains: () => {console.log("fetchingDomains"); dispatch(getDomainsReq())},
	// fetchRoles: () => {console.log("fetchingRoles"); dispatch(getRolesReq())}
	getUser: (id) => {console.log("getting user info"); dispatch(getUser(id))},
	getRolesAndDomains: () => {console.log("fetchingRolesAndDomains"); dispatch(updateRolesAndDomains())},
	updateUser: (user) => {/*console.log("updatingUser:", );*/ dispatch(updateUser(user))}
});

UpdateUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateUser);

export default UpdateUser;