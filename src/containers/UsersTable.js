import {changeLimit, chengeSkip, changeSort_by, changeText} from '../action/fetchParams'
import toSortStr from '../common/toSortStr';
import UsersTable from './UsersTable';

class UsersTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
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

	handleSort = clickedColumn => () => {

		const {sort_by} = this.props;
		//const { column, data, direction } = this.state
		console.log("clickedColumn",clickedColumn);

		// new column
		if (!sort_by.has(clickedColumn)) {
			sort_by.set(clickedColumn, 'asc');
			changeSort_by(sort_by);
			this.props.fetchUsers(
					this.props.skip, this.props.limit,
					this.props.text, toSortStr(this.props.sort_by)
			)
			return
		}

		//change direction or
		//if direction was desc delete column from map
		sort_by.get(clickedColumn) ===  'asc' ?
		(
			sort_by.set(clickedColumn, 'desc'),
			changeSort_by(sort_by);
			this.props.fetchUsers(
				this.props.skip, this.props.limit,
				this.props.text, toSortStr(this.props.sort_by)
			)
		)
		:
		(
			sort_by.delete(clickedColumn),
			changeSort_by(sort_by);
			this.props.fetchUsers(
				this.props.skip, this.props.limit,
				this.props.text, toSortStr(this.props.sort_by)
			)
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
	* Delete open dialog
	* delete user and
	* close delete dialog
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

}

const mapStateToProps = (state) => {
	return {
		users: state.users.users,
		UsersError: state.users.error,
		UsersEtext: state.users.etext,
		UsersIsLoading: state.users.isLoading,

		limit: state.fetchParams.limit,
		skip: state.fetchParams.skip,
		text: state.fetchParams.text,
		sort_by: state.fetchParams.sort_by,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		fetchUsers: (skip, limit, text, sort_by) => {console.log("fetchingUsers", skip, limit); dispatch(fetchUsers(skip, limit, text, sort_by))},
		deleteUser: async (userId) => {console.log("deletingUsers", userId); let res = await dispatch(deleteUser(userId)); return res;},
		unsetSuccessefulyFlag: () => {dispatch(unsetSuccessefulyFlag())},
		redirectToUpdatePage: (userToAction_id) => {dispatch(push(`/update/user/${userToAction_id}`))},

		changeLimit: (limit) => {dispatch(changeLimit(limit))},
		changeSkip: (skip) => {dispatch(changeSkip(skip))},
		changeText: (text) => {dispatch(changeText(text))},
		changeSort_by: (sort_by) => {dispatch(changeSort_by(sort_by))},
	};
};


export default connect(mapStateToProps)(UsersTable);