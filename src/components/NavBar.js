import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();
    const isDetail = location.pathname.startsWith('/contacts/') && location.pathname !== '/contacts' && location.pathname !== '/contacts/new';

    return (
        <nav className="navbar">
            <NavLink to="/" end className={({ isActive }) => (isDetail ? "nav-link" : isActive ? "nav-link active" : "nav-link")}>
                Trang chủ
            </NavLink>
            <NavLink to="/contacts" end className={({ isActive }) => (isDetail ? "nav-link" : isActive ? "nav-link active" : "nav-link")}>
                Danh sách
            </NavLink>
            <NavLink to="/contacts/new" end className={({ isActive }) => (isDetail ? "nav-link" : isActive ? "nav-link active" : "nav-link")}>
                Thêm mới
            </NavLink>
        </nav>
    );
};

export default NavBar;