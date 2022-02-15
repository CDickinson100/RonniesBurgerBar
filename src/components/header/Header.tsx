import React, {FC, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import './Header.css';

export const Header: FC<{ toggleSidebar: () => void }> = ({toggleSidebar}) => {

    const [user, setUser] = useState<any>(undefined);

    // @ts-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (localStorage.token) {
            const response = await fetch('/getUser', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    'token': localStorage.token
                })
            });
            const body = await response.json();
            if (Object.keys(body).length === 0) {
                setUser(undefined);
            } else {
                setUser(body);
            }
        }
    }, []);

    return (
        <div className="header">
            <div className="header-content">
                <Link to="/" className="header-content-link">Home</Link>
                <Link to="/menu" className="header-content-link">Menu</Link>
            </div>
            <div className="header-right">
                {
                    user ?
                        <>
                            <p className="profile">{user.first_name + " " + user.last_name}</p>
                        </> :
                        <>
                            <Link to="/login" className="header-content-link">Login</Link>
                            <Link to="/register" className="header-content-link">Register</Link>
                        </>
                }

                <div className="toggle-sidebar">
                    <button onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars}/>
                    </button>
                </div>
            </div>
        </div>
    );
}