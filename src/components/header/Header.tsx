import React, {FC} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import './Header.css';

export const Header: FC<{ toggleSidebar: () => void }> = ({toggleSidebar}) => {
    return (
        <div className="header">
            <div className="header-content">
                <Link to="/" className="header-content-link">Home</Link>
                <Link to="/menu" className="header-content-link">Menu</Link>
            </div>
            <div className="header-right">
                <Link to="/login" className="header-content-link">Login</Link>
                <Link to="/register" className="header-content-link">Register</Link>
                <div className="toggle-sidebar">
                    <button onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
            </div>
        </div>
    );
}