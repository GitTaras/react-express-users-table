/*
*reducer for user that loggeed into app
*
*/
import Auth from '../modules/Auth'

const initialState = {
  error: false, isValid: false, isLoading: false, etext: '',
  user: {id: Auth.getId() || '',  login: Auth.getLogin() || '', /*password: '',*/
  	token: Auth.getToken() || '',	role:  Auth.getRole() || '',
  	firstName: Auth.getFullName() ? Auth.getFullName().split(" ")[0] : '',
    lastName:  Auth.getFullName() ? Auth.getFullName().split(" ")[1] : '',
    primaryImage: false
	}
}

export default function currentUser (state = initialState, action) {
  //console.log('location', routing.location);
  switch (action.type) {
  	//get user data on init app from LocalStorage
    /*case 'INIT':
    	return {...state, user: {...state.user, login: action.user.email || '',
    		role: action.user.role || '', firstName: action.user.firstName || '',
    		lastName: action.user.lastName || '', toke: action.user.token || ''
    	}};*/
    case 'LOGIN_START':
      return {...state, isLoading: action.isLoading}; //action.isLoading;
    case 'LOGIN_FAILED':
      return {...state, isLoading: false, error: true, etext: action.etext + ' incorrect login or password'};    //action.error;
    case 'LOGIN_SUCCESS':
      console.log("action user", action.resp);
      return {...state, user: {...state.user, id: action.resp.user.id,
        login: action.resp.user.email, role: action.resp.user.role, token: action.resp.token,
        firstName: action.resp.user.firstName, lastName: action.resp.user.lastName,
        primaryImage: action.resp.user.primaryImage },
        isLoading: false, error: false}; //push('/main')
    case 'LOGOUT_SUCCESS':
      return initialState;
    default:
      return state;
  }
}