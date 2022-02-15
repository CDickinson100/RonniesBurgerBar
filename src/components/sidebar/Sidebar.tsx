import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import './Sidebar.css';

export const Sidebar: FC<{ sidebarVisible: boolean }> = ({sidebarVisible}) => {
    return (
        <div className={"sidebar " + (sidebarVisible ? "sidebar-visible" : "")}>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    );
}