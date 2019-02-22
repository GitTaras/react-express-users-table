import React from 'react';
import { Dropdown } from "semantic-ui-react";
import tagOptions from '../common/tagOptions';
import PermissionCheck from '../modules/PermissionCheck';

const DropdownEllipsisVertical = ({confirmModal, user, disabled}) => (
  <Dropdown disabled={disabled} icon='ellipsis vertical'>
      <Dropdown.Menu>
        {tagOptions.map(option =>
        	<PermissionCheck action={option.value.toLowerCase()} id={user._id}>
	        	<Dropdown.Item key={option.value/* + "Date.now().toString()"*/} {...option}
	        	 onClick={
	        	 	(e)=>confirmModal(e, {userToAction: user, action: option.value})
	        	}/>
	        </PermissionCheck>
        )}
      </Dropdown.Menu>
  </Dropdown>
)

export default DropdownEllipsisVertical;




