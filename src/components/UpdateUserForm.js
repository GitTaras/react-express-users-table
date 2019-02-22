import syncV from '../modules/syncValidation'
import {asyncV} from '../modules/asyncValidation'
import { connect } from 'react-redux';
import { Field, reduxForm ,formValueSelector} from 'redux-form';
import React, { Component } from 'react';
import ImageGallery from '../components/ImageGallery'
import {RenderField, RenderSelect, RenderImageFild} from './Fields'
import {Image, Form, Message, Grid, Dimmer, Loader, Segment, Button} from 'semantic-ui-react'

let UpdateUserForm = props => {
	console.log("UpdateUserFormProps: ", props);
	const {handleSubmit, submitting, pristine, reset, error,
		/*onClear,*/  /*user,*/
		domains, roles, images, selectImg,
		Pname, userIsLoading, successefuly, userLoadError,
		userLoadEtext
	} = props;
	//const submit = (values) => console.log(values);
	//const imgToRend = images ? renderImage(images, Pname, selectImg) : null;
	return (
		<React.Fragment>
			<Grid centered columns={2}>
				<Grid.Column>
					<Segment>
				  	<Form onSubmit={handleSubmit} loading={userIsLoading} className="attached fluid segment">
				  		{/*"select"*/}
		          <Field name="domainId" component={RenderSelect}  label='Domain' optionsList={domains}>
		          	{/*<option/>
		          	domains.map(opt =>
		          		<option key={opt._id} value={opt._id}>
		          			{opt.domain}
		              </option>
		            )*/}
		          </Field>
		          {/*"select"*/}
			        <Field name="roleId" component={RenderSelect}  label='Role' optionsList={roles}>
			        	{/*<option/>
			        	roles.map(opt =>
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

			      	autogen password:
			      	<Field name="require change" label='Require a change of password in the next sign in'
			      	component="input" type="checkbox" disabled
			      	placeholder=''/>

			      	<Field name="avatar"
			      	label='Choose images fo avatars gallery'
			      	component={RenderImageFild} type="file" multiple/>

		          <Button type="button" negative disabled={pristine || submitting}
		            onClick={()=>{
	            	reset()
		          	//document.getElementById('files-upload').value = null;
		          	selectImg(undefined); //onClear();
		          	let fu = document.getElementById('files-upload');
	  	          fu.type=''; fu.type='file';
		          }}>CLEAR
		          </Button>
		          <Button type="submit" positive floated='right' disabled={submitting} >UPDATE USER</Button>
		        </Form>
          		{successefuly
          			&& <Message attached="bottom" success header='Updated Successefuly' content="User has been updated successefuly" />}
    	      	{userLoadError
    	      		&& <Message attached="bottom" error header='Something was wrong' content={`The error ${userLoadEtext} It seems like server error(((, please try again letter.`}/>}
				    {images
				    	&& <ImageGallery select={selectImg}	images={images} Pname={Pname}/>}
	    		</Segment>
	    	</Grid.Column>
			</Grid>
	  </React.Fragment>
	);
}


UpdateUserForm = reduxForm({
	form: 'updateuser',
  validate: syncV,
  asyncValidate: asyncV,
  asyncChangeFields: ['email'],
})(UpdateUserForm);

//Decorate with connect to read form values
const selector = formValueSelector("updateuser"); // <-- same as form name
UpdateUserForm = connect(state => {
	const images = selector(state, "avatar");
	return {	initialValues: state.user.user,
		images: images ? (images.length ? images: null) : null,
	} // pull initial values from account reducer
}/*{ load: loadAccount },*/ // bind account loading action creator
)(UpdateUserForm);

export default UpdateUserForm