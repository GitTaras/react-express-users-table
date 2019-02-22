const initialState = {
		error: false, isLoading: false, etext: '',
		users: [],
		domains: [],
		roles: [],
		totalCount: null,
		page: 0,
		pageSize: 5,
		//nextPage: null, calculate
		totalPages: null

}

function pageSizeChange(state, action) {
	return {...state, pageSize: Number(action.pageSize),
	 totalPages: Math.ceil(state.totalCount/state.pageSize)};
}

function pageNumberChange(state, action) {
	return {...state, page: Number(action.page)};
}

export default function users (state = initialState, action) {
	switch (action.type) {
		case 'FUSERS_START':
				return {...state, isLoading: action.isLoading}; //action.isLoading;

		//do i need to display error message?
		case 'FUSERS_FAILED':
				return {...state, isLoading: false, error: true, etext: action.etext};    //action.error;
		case 'FUSERS_SUCCESS':
				console.log("action user", action);
				//users: [...state.users, ...action.users] to concat two arreys
				return {...state, users: [...action.users],
					/*roles: action.roles,*/
					/*domains: action.domains,*/ totalCount: action.totalCount,
					page: action.page,
					pageSize: action.pageSize,
					totalPages: Math.ceil(action.totalCount / action.pageSize), nextPage: action.nextPage, isLoading: false, error: false};
		case 'PAGE_NUMBER_CHANGE':
			return pageNumberChange(state, action);
		case 'PAGE_SIZE_CHANGE':
			return pageSizeChange(state, action);
		case 'UPDATE_DOMAINS':
				console.log("action user", action);
				return {...state, domains: [...action.domains],
						// [...state.domains, ...action.domains],
						// do i need check for change beffore marge??
						isLoading: false, error: false};
		case 'UPDATE_ROLES':
				console.log("action user", action);
				return {...state, roles: [...action.roles],

						// [...state.roles, ...action.roles],
						// do i need check for change beffore marge??
						isLoading: false, error: false};
		case 'ADD_USER':
				console.log("action user", action);
				return {...state, users: [...state.users, action.user],
						roles: action.roles,
						domains: action.domains,
						isLoading: false, error: false};
		case 'UPDATE_USER':
				console.log("action user", action);
				return {...state, users: [...state.users.map(user => (user._id === action.user._id) ? (action.user) : user)],
						roles: action.roles,
						domains: action.domains,
						isLoading: false, error: false};
		case 'DELETE_USER':
				console.log("action user", action);
				return {...state, users: [...state.users.filter(user =>
						user._id !== action._id)],
						roles: action.roles,
						domains: action.domains,
						isLoading: false, error: false};

		case 'LOGOUT_SUCCESS':
				return initialState;
		default:
				return state;
	}
}