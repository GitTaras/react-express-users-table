import syncV from '../modules/syncValidation'
import {asyncV} from '../modules/asyncValidation'
import { Field, reduxForm ,formValueSelector} from 'redux-form';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {RenderField, RenderSelect, RenderImageFild} from './Fields'
import ImageGallery from '../components/ImageGallery'
import {Image, Form, Message, Grid, Dimmer, Loader, Segment, Button} from 'semantic-ui-react'

let AddUserForm = props => {
	//console.log(typeof(this.props.domains.length), this.props.domains);
	console.log("AddUserFormProps: ", props);
	const {handleSubmit, reset, error ,domains, roles, submitting,
	 	pristine, images, selectImg, Pname, successefuly, isLoading,
	  loadError, loadEtext, addLoading, addError, addEtext, onClear} = props;

	//const imgToRend = images ? renderImage(images, Pname, selectImg) : null;
	return (
		<React.Fragment>
			{(!Boolean(domains.length) && Boolean(!roles.length) || isLoading || loadError) ? (
			<React.Fragment>
		  	<Segment>
		  		{isLoading &&<Dimmer active={isLoading}>
	  				<Loader>Loading</Loader>
					</Dimmer>}
					{loadError && <Message error
		  	      				      	header='Something was wrong'
		  	      				      	content={loadEtext}
		  	      				    	/>}
				</Segment>
			</React.Fragment>
			) :
			(
			<React.Fragment>
				<Grid centered columns={2}>
				  <Grid.Column>
				  	<Segment>
					  	{/*<Dimmer active={addLoading}>
		  					<Loader>Loading</Loader>
							</Dimmer>*/}

					  	<Form loading={addLoading} onSubmit={handleSubmit} name="addUser" className="attached fluid segment"> {/*success*/}

			  	      link

		            <Field name="domainId" component={RenderSelect} label='Domain' optionsList={domains}>
		            	{/*<option/>
		            	{domains.map(opt =>
		            		<option key={opt._id} value={opt._id}>
		            			{opt.domain}
		                </option>
		              )}*/}
		            </Field>

		  	        <Field name="roleId" component={RenderSelect} label='Role' optionsList={roles}>
		  	        	{/*<option/>
	  	        		{roles.map(opt =>
		  	        		<option key={opt._id} value={opt._id}>
		  	        			{opt.role}
		  	            </option>
		  	          )*/}
		  	        </Field>

		  	      	<Field name="FirstName" component={RenderField} type="text"
		  	      	placeholder='Enter first name' label='First Name' autoFocus="autoFocus"/>

		  	        <Field name="LastName" component={RenderField} type="text"
		  	        placeholder='Enter last name' label='Last Name'/>

		  	        <Field name="email" component={RenderField} type="email"
		  	        placeholder='example@mail.com' label='Email'/>

		  	        <Field name="login" component={RenderField} type="text"
		  	        placeholder='Enter username' label='Login'/>

		  	        <Field name="password" component={RenderField} type="password"
		  	        placeholder='Enter password' label='Password'/>

		  	      	autogenerate password:
		  	      	<Field name="require change" label='Require a change of password in the next sign in'
		  	      	component="input" type="checkbox" disabled
		  	      	placeholder=''/>

	  		      	<Field name="avatar"
	  		      	label='Choose images for avatars gallery'
	  		      	component={RenderImageFild} type="file" multiple/>

	  	      	  <Button type="button" negative disabled={pristine || submitting}
	  	            onClick={()=>{
	  	          	//document.getElementById('files-upload').value = null;
	  	          	selectImg(undefined); onClear(); reset();
	  	          	let fu = document.getElementById('files-upload');
	  	          	fu.type=''; fu.type='file';/*fu.replaceWith(fu.value('').clone(true));*/}}
	  	          >
	  	          	CLEAR
	  	          </Button>
	  	          <Button type="submit" positive floated='right' disabled={submitting} >ADD</Button>
  	          </Form>
	        		{successefuly && <Message attached='bottom' success header='Added Successefuly' content="User has been added successefuly" />}
	  	      	{addError && <Message attached="bottom" error header='Something was wrong'
	  	      				      	content={`The error ${addEtext} It seems like server error(((, please try again letter.`}
	  	      				    	/>}

		  	    </Segment>
		  	    {images && <ImageGallery select={selectImg}
		  	    										images={images} Pname={Pname}/>
		  	    }

				  </Grid.Column>
				</Grid>
		   </React.Fragment>
		 	)}
		</React.Fragment>
	);
}
// export default
AddUserForm =
 reduxForm({
	form: 'adduser',
  asyncValidate: asyncV,
  asyncBlurFields: ['email']
})(AddUserForm);

// Decorate with connect to read form values
const selector = formValueSelector("adduser"); // <-- same as form name
AddUserForm = connect(state => {
  // can select values individually
  const images = selector(state, "avatar");

  // // or together as a group
  // const { firstName, lastName } = selector(state, "firstName", "lastName");
  return {
    "images": images ? (images.length ? images: null) : null, //cant convert undefined or null to obj
  };
})(AddUserForm);


export default AddUserForm;
