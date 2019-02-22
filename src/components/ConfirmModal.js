import React, { Component } from 'react';
import { Modal, Button, Icon } from "semantic-ui-react";
/*
*it's have blinking style problem
*if modal window is not set as scrolling
*
*/

const ConfirmModal = ({action, userToAction, openConfirm, closeConfirm, callActionModal, deleteUser}) => (
	<Modal className="scrolling tiny"
		closeIcon
		open={openConfirm}
	>
		<Modal.Header>Modal</Modal.Header>
		<Modal.Content image>
				<Modal.Description>
						<p>Are you sure you want to {action} to {userToAction ? userToAction.FirstName : ' '}</p>
				</Modal.Description>
		</Modal.Content>
		<Modal.Actions>
			<Button color='red' onClick={closeConfirm}>
        <Icon name='remove' /> No
      </Button>
      {action !== 'Delete' ?
	      (<Button color='green' onClick={callActionModal}>
	        <Icon name='checkmark'/> Yes
	      </Button>) :
	      (<Button color='green' onClick={deleteUser}>
	        <Icon name='checkmark'/> Yes
	      </Button>
	      )
    	}
		</Modal.Actions>
	</Modal>
)

export default ConfirmModal;
