import React from 'react'
import { connect } from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {
	Button,
	Segment,
	Menu,
	Icon,
	Container,
	Label,
	Image
	/*Divider,
	Grid,
	Header,
	Image,
	List,
	Responsive,
	Sidebar,
	Visibility,*/
} from 'semantic-ui-react'
import Auth from '../modules/Auth.js'
import PermissionCheck from '../modules/PermissionCheck';
import { logoutCurrentUser } from '../actions/users';

const Header = ({history, currentUser, logoutCurrentUser/*, children*/}) => {
	console.log('history at Header', history)
	return (
		<React.Fragment>
				<Menu
					pointing
					secondary
					size='large'
				>
					<Container>
						<Menu.Item active={history.location.pathname=="/main"}>
							<Link to="/main">Main</Link>
						</Menu.Item>
						<Menu.Item active={history.location.pathname=="/forget"}>
							<Link to="/forget">Forget</Link>
						</Menu.Item>
						<Menu.Item active={history.location.pathname=="/reset"}>
							<Link to="/reset">Reset</Link>
						</Menu.Item>
						<PermissionCheck action={"add"}>
						 	<Menu.Item active={history.location.pathname=="/add"}>
								<Link to="/add">Add</Link>
							</Menu.Item>
						</PermissionCheck>
						<Menu.Item active={history.location.pathname=="/"}>
							PATH: {history.location.pathname}
						</Menu.Item>
						<React.Fragment>{Auth.isUserAuthenticated() ?
							(<Menu.Menu position='right'>
								<Menu.Item>
					    		<Label color='teal' size="medium" >
				    				<Image avatar spaced="right"
				    					src={currentUser.primaryImage ?
				    			    `http://localhost:3001/pub/image/${currentUser.primaryImage}`
				    			    :
				    			    'https://www.bluecross.org.uk/sites/default/files/assets/images/124044lpr.jpg'}
				    		    />
		    		      {currentUser.firstName}
		     		    	</Label>
								</Menu.Item>
								<Menu.Item>
									<Button animated onClick={logoutCurrentUser}>
										<Button.Content visible>Log Out</Button.Content>
										<Button.Content hidden>
										  <Icon name='log out' link/>
										</Button.Content>
									</Button>
								</Menu.Item>
							</Menu.Menu>
							)
							:
							(<Menu.Item position='right' active={history.location.pathname==="/login"}>
								<Button>
									<Link to="login">Log in</Link>
								</Button>
							</Menu.Item>
							)
						}
						</React.Fragment>
					</Container>
				</Menu>
		</React.Fragment>

	)
}


const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
  };
};

const mapDispatchToProps = (dispatch/*, ownProps*/) => {
  return {
	 	logoutCurrentUser: () => {console.log("logoutCurrentUser"); dispatch(logoutCurrentUser())},
	};
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))