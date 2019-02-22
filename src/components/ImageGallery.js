import React from 'react'
import {Segment, Image } from 'semantic-ui-react'
import {getFormValues} from 'redux-form'

/*
*Show images what was choosed by user
*user can select image by clicking on it
* to setup it on avatar
*
*/


const ImageGallery=(props)=>{
  console.log("IGprops", props)
  // console.log("type", typeof(props.images));
  const {select, images, Pname} = props
  let Images = [];

  for (var i = 0; i <  images.length; i++) {
    let img = images.item(i)
    console.log("CHECK EQ: ", img.name === Pname);
    Images.push(
      <Image key={img.lastModified}
        onClick={() => select(img.name)}
        src={URL.createObjectURL(img)}
        srcSet={URL.createObjectURL(img)}
        circular={img.name===Pname}
      />)

  }
  return(
    <React.Fragment>
     <Segment>
      <Image.Group size='small'>
          {Images}
          {/*console.log("renderrre",Images)*/}
        </Image.Group>
      </Segment>
    </React.Fragment>
  )
}

export default ImageGallery
