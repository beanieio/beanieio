import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css';

const navs = [
  {label: 'dashboard', icon: 'mdi-home-circle', link: '/dashboard'},
  {label: 'reports', icon: 'mdi-chart-line', link: '/reports'},
  {label: 'settings', icon: 'mdi-settings', link: '/settings'},
  {label: 'logout', icon: 'mdi-logout', link: '/logout'}
];

const Sidenav = ({activeNav}) => (
  <div className="app-sidebar">
    {navs.map((nav, i) => (
      <NavLink key={`nav${i}`} link={nav.link} icon={nav.icon} active={activeNav === nav.label} />
    ))}
  </div>
);

const NavLink = ({link, icon, active}) => (
  <Link to={link} className={'sidebar-entry' + (active ? ' sidebar-active' : '')}>
    <i className={'mdi ' + icon}></i>
  </Link>
);

export default Sidenav;
