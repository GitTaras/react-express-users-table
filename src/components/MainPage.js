import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import {Container, Table, Dropdown,
	Input, Icon, Button, Image, Label,
	Grid, Segment, Loader, Form, Message
} from 'semantic-ui-react'

import pageLengthOptions from '../common/pageLengthOptions';
import ConfirmModal from './ConfirmModal';
import UsersTable from './UsersTable';
import Pagination from '../containers/Pagination';
import ResetModal from '../containers/ResetModal';
//import {RenderSelect} from './Fields'

const MainPage = (props) => {

		console.log('MainPage props', props);
		const {limit, skip/*page*/,
			totalPages, text, handleSort,
			onPageSizeChange,	onFilter,
			onPageNumberChange,
			/*for UsersTalbe*/
			sort_by, confirmModal,
			openReset, closeReset,
			/*for confirm modal*/
			action, userToAction, openConfirm,
			closeConfirm, callActionModal, deleteUser
		} = props;

		return(
			<React.Fragment>
				<React.Fragment>
					<Container fluid>
						<Grid centered divided='vertically' >
							<Grid.Row columns={2} >
								<Grid.Column>
									<Form>

										{/*change first empty position in RenderSelect<RenderSelect
											label="Page size"
											optionsList={pageLengthOptions}
										/>*/}
										<Form.Field inline>
											<label htmlFor="page-menu">Page size:</label>
											<select
												id="page-menu"
												value={limit}
												onChange={onPageSizeChange}
											>
												{pageLengthOptions.map(opt =>
													<option key={opt} value={opt}>
														{opt}
													</option>
												)}
											</select>
										</Form.Field>
										<Form.Input width={4}
											label='Search:' id="search-field"
											placeholder='Enter...'
											onChange={onFilter}
										/>
									</Form>
								</Grid.Column>
								<Grid.Column floated='right' width={5} verticalAlign='bottom'>
									<Pagination
										currentPage={skip}
										totalPages={totalPages}
										onChangePage={onPageNumberChange}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<UsersTable
										sort_by={sort_by}
										handleSort={handleSort}
										confirmModal={confirmModal}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
					<ConfirmModal action={action}
						userToAction={userToAction}
						openConfirm={openConfirm}
						closeConfirm={closeConfirm}
						callActionModal={callActionModal}
						deleteUser={deleteUser}/>
					<ResetModal
						userToAction={userToAction}
						openReset={openReset}
						closeReset={closeReset}/>
				</React.Fragment>

				<div id="modal-portal"></div>
			</React.Fragment>
		)

}

export default MainPage;
