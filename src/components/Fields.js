import React from 'react';
import {Icon, Input, Button, Form, Message} from 'semantic-ui-react'

/**
*Semantic ui form use error for global Form teg
*local redux-form meta error not have effect on <Message/> element
*that's why i use !error && touched to display <Message/>
*
*/

export const RenderField = ({
  input,
  label,
  placeholder,
  type,
  autoFocus,
  meta: { asyncValidating, touched, error }
}) => (
  <Form.Field error={!!error && touched}>
    <label>{label}</label>
    <input {...input} type={type} placeholder={placeholder}  autoFocus={autoFocus}/>
      {touched && error && <Message error={touched && !error} content={error}/> }
  </Form.Field>
)
// && error
// && <span><Icon name="warning"/>{error}</span>
// <div className={asyncValidating ? 'async-validating' : ''}>
// </div>

export const RenderSelect = ({
  input,
  label,
  optionsList,
  meta: {  asyncValidating, touched, error }
}) => (
  <Form.Field>
    {console.log("input", optionsList)}
    <label>{label}</label>
    <select {...input}>
      <option/>{optionsList.map((opt) => {
        const values = Object.values(opt);
        return (
          <option key={values[0]} value={values[0]}>
            {values[1]}
          </option>
        )}
      )}
    </select>
    {touched && error && <span>{error}</span>}
  </Form.Field>
)

// <div className={asyncValidating ? 'async-validating' : ''}>
// </div>

export const RenderImageFild =(field) => {
  console.log("field", field);
  delete field.input.value; // <-- just delete the value property

  let avaInputRef = null;

  function handleClick() {
    console.log("avaInputRef", avaInputRef)
    avaInputRef.click();
  }

  return (
    <Form.Field>
      <input style={{display: 'none'}} type="file" id="files-upload"
        {...field.input}
        multiple accept="images/*" onChange={(e)=>{
          console.log("beffore prevent")
          e.preventDefault();
          console.log("after prevent")
          // const files = [...e.target.files];
          //sconsole.log(e.target.files);
          // fields.avatar.handleChange(files);
          field.input.onChange(e.target.files)
        }}
        ref={(element) => {return avaInputRef=element;}}
      />
      <Button type="button" onClick={()=> handleClick()}>Choose Files</Button>
    </Form.Field>
  );
}