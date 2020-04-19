import React, { Fragment } from 'react';
import Payments from './Payments';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Header = () => {
	const auth = useSelector((state) => state.auth);
	const renderContent = () => {
		switch (auth) {
			case null:
				return;

			case false:
				return (
					<li>
						<a href='/auth/google'>Login With Google</a>
					</li>
				);

			default:
				return (
					<Fragment>
						<li>
							<Payments />
						</li>
						<li>
							<a href='/api/logout'>Logout</a>
						</li>
					</Fragment>
				);
		}
	};
	return (
		<nav>
			<div className='nav-wrapper'>
				<Link to={auth ? '/survey' : '/'} className='brand-logo'>
					Emaily
				</Link>
				<ul id='nav-mobile' className='right'>
					{renderContent()}
				</ul>
			</div>
		</nav>
	);
};

export default Header;
