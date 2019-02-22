import React from 'react';
import {connect} from 'react-redux';
import {Table, Image, Loader, Message} from 'semantic-ui-react';
import DropdownEllipsisVertical from './DropdownEllipsisVertical';

const UsersTable = ({
	/*Map*/sort_by, handleSort, confirmModal,
	/*From Redux*/
	users, UsersIsLoading, UsersError, UsersEtext
}) => (

<React.Fragment>
{(!Boolean(users.length) || UsersIsLoading || UsersError) ?
	(
		<React.Fragment>
			{UsersIsLoading && <Loader active
													inline='centered'
													size='large'
												/>
			}
			{UsersError && <Message error
											header='Something was wrong'
											content={UsersEtext}
										/>
			}
		</React.Fragment>
	)
	:
	(
	<React.Fragment>
		<Table sortable celled selectable /*loading={!!users.length}*/>
			<Table.Header>
			 <Table.Row>
			 	<Table.HeaderCell
			 	sorted={sort_by.has("FirstName") ? sort_by.get("FirstName")==="asc" ?  "ascending" : "descending" : null}
			 	onClick={handleSort("FirstName")}>
			 	{/*sorted={column==="name" ? direction : null}*/}Name</Table.HeaderCell>
			 	<Table.HeaderCell
					sorted={sort_by.has("role") ? sort_by.get("role") ==="asc" ?  "ascending" : "descending" : null}
			  onClick={handleSort("role")}>Role</Table.HeaderCell>
			  <Table.HeaderCell
			  sorted={sort_by.has("domain") ? sort_by.get("domain") ==="asc" ?  "ascending" : "descending" : null}
			  onClick={handleSort("domain")}>Domain</Table.HeaderCell>
			  <Table.HeaderCell
			  sorted={sort_by.has("lastSignIn") ? sort_by.get("lastSignIn") ==="asc" ?  "ascending" : "descending" : null}
			  onClick={handleSort("lastSignIn")}>Last signed in</Table.HeaderCell>
			  <Table.HeaderCell>Actions</Table.HeaderCell>
			 </Table.Row>
			</Table.Header>

			<Table.Body>
				{users.map((user, index)=>
				 <Table.Row key={user._id}>
				   <Table.Cell><Image src={user.primaryImage ? `http://localhost:3001/pub/image/${user.primaryImage}` : 'https://www.bluecross.org.uk/sites/default/files/assets/images/124044lpr.jpg' }  avatar width="25" height="25"/><strong>{user.FirstName} {user.LastName}</strong></Table.Cell>
				   <Table.Cell>{/*Role*/}{user.role}</Table.Cell>
				   <Table.Cell>{/*Domain*/}{user.domain}</Table.Cell>
				   <Table.Cell>{/*Sign in*/}{user.lastSignIn}</Table.Cell>
				   <Table.Cell>
				 		<DropdownEllipsisVertical user={user}
							disabled={true && !user._id}
							confirmModal={confirmModal}/>
						</Table.Cell>
				 </Table.Row>
				)}
			</Table.Body>
		</Table>
	</React.Fragment>
	)
}
</React.Fragment>
)

const mapStateToProps = (state) => {
  return {
  	users: state.users.users,
    UsersError: state.users.error,
    UsersEtext: state.users.etext,
    UsersIsLoading: state.users.isLoading,
  };
};

export default connect(mapStateToProps)(UsersTable);