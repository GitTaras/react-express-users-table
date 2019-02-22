const initialState = {
	error: false, isLoading: false, etext: '',
	successefuly: false,
	user: {}
}

export default function user (state = initialState, action) {
	switch (action.type) {
		case 'CLEAR':
			return {sate: initialState};
		case 'FUSER_START':
			console.log("action user", action.type);
			return {...state, isLoading: action.isLoading}; //action.isLoading;

		case 'FUSER_FAILED':
			console.log("action user", action.type);
			return {...state, isLoading: false, error: true, etext: action.etext};    //action.error;

		case 'UNSET_SUCCESSEFULY_FLAG':
			console.log("action user", action.type);
			return {...state, successefuly: false};    //action.error;

		case 'GET_USER_SUCCESS':
			console.log("action user", action);
			//users: [...state.users, ...action.users] to concat two arreys
			return {...state, user: action.user,
			isLoading: false, error: false/*, successefuly: true*/};

		case 'ADD_USER_SUCCESS':
			console.log("action user", action);
			//users: [...state.users, ...action.users] to concat two arreys
			return {...state, user: action.user,
			isLoading: false, error: false, successefuly: true};

		case 'UPDATE_USER_SUCCESS':
			console.log("action user", action);
			return {...state, user: action.user,
				isLoading: false, error: false, successefuly: true};
		case 'DELETE_USER_SUCCESS':
			console.log("action user", action);
			return {...state, user: action.user,
				isLoading: false, error: false, successefuly: true};
		default:
			return state;
	}
}