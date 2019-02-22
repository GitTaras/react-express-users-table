import React, { Component } from 'react';
import {push} from 'react-router-redux';
//impoort {Portal} from 'react-portal';
import MainPage from '../components/MainPage';
import {connect} from 'react-redux';
import { fetchUsers, logoutCurrentUser } from '../actions/users';
import {deleteUser} from '../actions/user';
import {unsetSuccessefulyFlag} from '../actions/user';
import {showModal, closeModal} from '../actions/modals';
import toSortStr from '../common/toSortStr';
//import ConfirmModal from '../components/ConfirmModal';

class Main extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      skip: 0,//page
      limit: 5,//pageSize
      text: "",
      sort_by: new Map(),
  		userToAction: undefined,
  		action: undefined,
  		openConfirm: false,
      openReset: false,
      openDelete: false,
      openUpdate: false,
  	};
  }

  componentDidMount() {
  	this.props.fetchUsers();
  }

  onPageSizeChange = ({ target: { value } }) => {
    console.log("FETCH USERS");
    this.setState({limit: Number(value)}, () => this.props.fetchUsers(
      this.state.skip, this.state.limit,
      this.state.text, toSortStr(this.state.sort_by)
    ));
  }

  onPageNumberChange = (value) => {
    console.log("FETCH USERS");
    this.setState({skip: Number(value)}, () => this.props.fetchUsers(
      this.state.skip, this.state.limit,
      this.state.text, toSortStr(this.state.sort_by)
    ));
  }

  onFilter = ({ target: { value } }) => {
    this.setState({text: value.trim().toLowerCase()}, () => this.props.fetchUsers(
      this.state.skip, this.state.limit,
      this.state.text, toSortStr(this.state.sort_by)
    ));
    console.log("DEBUG: ONFILTER", value);
  }

  handleSort = clickedColumn => () => {

    const {sort_by} = this.state
    //const { column, data, direction } = this.state
    console.log("clickedColumn",clickedColumn);

    // new column
    if (!sort_by.has(clickedColumn)) {
      sort_by.set(clickedColumn, 'asc');
      this.setState({sort_by}, () =>
        this.props.fetchUsers(
          this.state.skip, this.state.limit,
          this.state.text, toSortStr(this.state.sort_by)
      ));

      return
    }

    //change direction or
    //if direction was desc delete column from map
    sort_by.get(clickedColumn) ===  'asc' ?
    (sort_by.set(clickedColumn, 'desc'),
      this.setState({sort_by}, () => this.props.fetchUsers(
        this.state.skip, this.state.limit,
        this.state.text, toSortStr(this.state.sort_by)
      ))
    )
    :
    (sort_by.delete(clickedColumn),
      this.setState({sort_by},
      () => this.props.fetchUsers(
        this.state.skip, this.state.limit,
        this.state.text, toSortStr(this.state.sort_by)
      ))
    )
  }

  confirmModal = (e, data) => {
  	//console.log("eve ", e, " data ", data)
  	//console.log(document.getElementById('modal-portal'));
  	this.setState({
      action: data.action,
      userToAction: data.userToAction,
      openConfirm: true
    });
  }
  /*
  * Close confirm dialog
  */
  closeConfirm = () => {
  	this.setState({openConfirm: false});
  }

  /*
  * Close reset dialog
  */
  closeReset = () => {
    console.log("Closing Reset");
    this.setState({openReset: false});
  }

  /*
  * Close delete dialog
  */
  deleteUser = async () => {
    this.setState({openDelete: true});
    console.log("this.state.userToAction", this.state.userToAction);

    await this.props.deleteUser(this.state.userToAction._id)
    console.log("await work");
    if(this.props.UserSuccessefuly) {
        // showNotificationSuccess
      console.log("successefuly----------------------");
      this.setState({openDelete: false, openConfirm: false, userToAction: undefined});
      unsetSuccessefulyFlag();
        //pass state to confirm modal
      return
    }
    if (this.props.UserError)
      console.log("operation with ", this.state.userToAction, "error: ", this.props.UserEtext,)
  }


  /*
  *call modal window
  *i need do refactor and use
  *modal menager to work with this
  *
  */
  callActionModal = () => {
    console.log("callActionModal", this.state.action, this.state.userToAction);

    switch(this.state.action) {
      case "Reset":
        console.log("reset");
        this.setState({openReset: true});
        break;

      case "Delete":
        console.log("delete");
        this.setState({openDelete: true});
        break;

      case "Update":
        console.log("update");
        this.props.redirectToUpdatePage(this.state.userToAction._id)
        break;

      default:
        console.log("Wrong action");
        break;
    }
  }

  render() {
    return(
			<MainPage {...this.props}
      closeConfirm={this.closeConfirm}
      closeReset={this.closeReset}
      callActionModal={this.callActionModal}
      deleteUser={this.deleteUser}
      onFilter={this.onFilter}
      onPageSizeChange={this.onPageSizeChange}
      onPageNumberChange={this.onPageNumberChange}
      handleSort={this.handleSort}
       {...this.state}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("StateMain: ownPrors:", state, ownProps);
  return {

    UserError: state.user.error,
    UserEtext: state.user.etext,
    UserIsLoading: state.user.isLoading,
    UserSuccessefuly: state.user.successefuly,
    user: state.user.user,

    pageSize: state.users.pageSize,
    page: state.users.page,
    totalPages: state.users.totalPages,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	fetchUsers: (skip, limit, text, sort_by) => {console.log("fetchingUsers", skip, limit); dispatch(fetchUsers(skip, limit, text, sort_by))},
    deleteUser: async (userId) => {console.log("deletingUsers", userId); let res = await dispatch(deleteUser(userId)); return res;},
    unsetSuccessefulyFlag: () => {dispatch(unsetSuccessefulyFlag())},
    redirectToUpdatePage: (userToAction_id) => {dispatch(push(`/update/user/${userToAction_id}`));}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);