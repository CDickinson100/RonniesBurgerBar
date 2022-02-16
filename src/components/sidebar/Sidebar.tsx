import React, {FC} from 'react';
import {Link} from 'react-router-dom';

import './Sidebar.css';
import {IUser} from "../../IUser";

export const Sidebar: FC<{ sidebarVisible: boolean, user: IUser | undefined }> = ({sidebarVisible, user}) => {
    return (
        <div className={"sidebar " + (sidebarVisible ? "sidebar-visible" : "")}>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            {
                !user &&
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            }
        </div>
    );
}