import React from 'react';
import { Link } from 'react-router-dom';
import './sidenav.css';

const navs = [
  {label: 'dashboard', icon: 'mdi-home-circle', link: '/dashboard'},
  {label: 'reports', icon: 'mdi-chart-line', link: '/reports'},
  {label: 'journal', icon: 'mdi-book', link: '/journal'},
  {label: 'settings', icon: 'mdi-settings', link: '/settings'}
];

const Sidenav = ({match, onLogout}) => (
  <div className="app-sidebar">
    {navs.map((nav, i) => (
      <NavLink key={`nav${i}`} link={nav.link} icon={nav.icon} active={match.params.nav === nav.label} />
    ))}
    <div onClick={onLogout} className="sidebar-entry sidebar-logout"><i className="mdi mdi-logout"></i></div>
  </div>
);

const NavLink = ({link, icon, active}) => (
  <Link to={link}
    className={'sidebar-entry' + (active ? ' sidebar-active' : '')}>
    <i className={'mdi ' + icon}></i>
  </Link>
);

export default Sidenav;
