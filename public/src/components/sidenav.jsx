import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css';

const navs = [
  {label: 'Dashboard', icon: 'mdi-home-circle', link: '/dashboard'},
  {label: 'Reports', icon: 'mdi-chart-line', link: '/reports'},
  {label: 'Settings', icon: 'mdi-settings', link: '/settings'},
  {label: 'Logout', icon: 'mdi-logout', link: '/logout'}
];

const Sidenav = () => (
  <div className="app-sidebar">
    {navs.map((nav, i) => <NavLink key={`nav${i}`} link={nav.link} icon={nav.icon} />)}
  </div>
);

const NavLink = ({link, icon}) => (
  <Link to={link} className='sidebar-entry'>
    <i className={'mdi ' + icon}></i>
  </Link>
);

export default Sidenav;

/* <div className="sidebar-entry"><i className="mdi mdi-home-circle"></i></div>
  <Link to="home"></Link>
  <div className="sidebar-entry sidebar-active"><i className="mdi mdi-chart-line"></i></div>
  <div className="sidebar-entry"><i className="mdi mdi-settings"></i></div>
<div className="sidebar-entry"><i className="mdi mdi-logout"></i></div> */
