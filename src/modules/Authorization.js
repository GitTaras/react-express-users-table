// Authorization HOC
import React, { Component } from 'react'
import {/*NavLink,*/ Link} from 'react-router-dom';
import {push} from 'react-router-redux';
import Auth from './Auth';

const Authorization = (allowedRoles) => (WrappedComponent) => {
  return class WithAuthorization extends React.Component {
    constructor(props) {
      super(props)
      this.role = Auth.getRole();
      console.log();
    }

    render() {
      if (allowedRoles.includes(this.role) && Auth.isUserAuthenticated()) {
        console.log('Authorization passed this.role', this.role, Auth.isUserAuthenticated());
        return <WrappedComponent {...this.props} />
      } else if (Auth.isUserAuthenticated()){
        console.log('not allowed for your role');
        return <h1>No page for you. Wrong role!!!</h1>
      } else {
        return <h1>Seems that you are not authenticated please go to <Link to="/login">login</Link></h1>
      }
    }
  }
}

export default Authorization;