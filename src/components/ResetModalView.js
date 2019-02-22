import React from 'react';
import { Modal, Button, Icon, Checkbox, Form, Message} from "semantic-ui-react";

const ResetModalView = ({
	/*from Main this.state*/ userToAction, openReset, closeReset,
	/*own*/resetUserPass, handleChange, pass, confPass, equal
}) => (
<React.Fragment>
	<Modal className="scrolling tiny"
		closeIcon
		open={openReset}
	>
		<Modal.Header>ResetModal</Modal.Header>
		<Modal.Content image>
			<Modal.Description>
					<p>Reset password to {userToAction ? userToAction.FirstName : ' '}</p>
			</Modal.Description>
			<Form warning={!equal}
						success={equal}>
			    <Form.Field>
			      <input placeholder='Enter password' name='pass' value={pass} type='password'
			      onChange={handleChange} required/>
			    </Form.Field>
			    <Form.Field>
			      <input placeholder='Confirm password' name='confPass' value={confPass} type='password'
			      onChange={handleChange} required/>
			    </Form.Field>
	        <Message
			      warning
			      header='Passwords must be equal and at least 8 characters!'
			      list={[
			        'Please try again, it seems like you have a mistake.',
			      ]}
			    />
			    <Message
			      success
			      header='Password equal you may reset'
			    />
			    <Form.Field>
			      <Checkbox label='Require a change of password in the next sign in' disabled/>
			    </Form.Field>
			  </Form>
		</Modal.Content>
		<Modal.Actions>
			<Button color='red' onClick={closeReset}>{/*onClick={(e)=>closeReset(e)}*/}
        <Icon name='remove' /> CANCEL
      </Button>
      <Button color='green' onClick={resetUserPass} disabled={!equal}>
        <Icon name='checkmark'/> RESET
      </Button>
		</Modal.Actions>
	</Modal>
</React.Fragment>
)
export default ResetModalView;