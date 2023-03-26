import React from 'react';
import style from './Sidebar.module.scss';
import { slide as Menu } from 'react-burger-menu';
import { BsArrowBarRight } from 'react-icons/bs';
import { IconBase } from 'react-icons/lib';
import { Link, Route } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const styles = {
	bmBurgerButton: {
		position: 'fixed',
		width: '36px',
		height: '24px',
		left: '1rem',
		top: '1.3rem',
	},
	bmBurgerBars: {
		height: '4px',
		width: '30px',
		background: '#fff',
	},
	bmBurgerBarsHover: {
		background: '##0084a4',
	},
	bmCrossButton: {
		height: '24px',
		width: '24px',
	},
	bmCross: {
		background: '#fff',
	},
	bmMenuWrap: {
		position: 'fixed',
		height: '100%',
	},
	bmMenu: {
		background: '#0e131f',
		padding: '2.5em 1.5em 0',
		fontSize: '1.5em',
	},
	bmMorphShape: {
		fill: '#373a47',
	},
	bmItemList: {
		color: '#ffffff',
		padding: '0.8em',
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	},
	bmItem: {
		display: 'flex',
		justifyContent: 'center',
	},
	bmOverlay: {
		background: 'rgba(0, 0, 0, 0.3)',
	},
};

export default function Sidebar() {
	const { logOut } = React.useContext(AuthContext);

	return (
		<>
			<Menu styles={styles} className={style.menu}>
				<a id="home" className="menu-item" href="/" onClick={() => logOut()}>
					Sair da conta
				</a>
				<a id="home" className="menu-item" href="/account">
					Minha conta
				</a>

				<div>
					<a href="/" onClick={() => logOut()}>
						<BsArrowBarRight className={style.icon} title="sair da conta" />
					</a>
				</div>
			</Menu>
		</>
	);
}
