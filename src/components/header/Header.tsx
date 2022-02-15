import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import './Header.css';
import {IUser} from "../../IUser";

export const Header: FC<{ toggleSidebar: () => void, user: IUser | undefined }> = ({toggleSidebar, user}) => {

    const [accountOptionsVisible, setAccountOptionsVisible] = useState(false);

    async function logout() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'token': localStorage.token
            })
        };
        await fetch('/logout', requestOptions);
        window.location.reload();
    }

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
                            <button className="profile"
                                    onClick={() => setAccountOptionsVisible(!accountOptionsVisible)}>
                                <p>{user.first_name + " " + user.last_name}</p>
                            </button>
                            {
                                accountOptionsVisible ?
                                    <div className="account-options">
                                        <button onClick={() => logout()}>
                                            <p>Log out</p>
                                        </button>
                                    </div>
                                    :
                                    <></>
                            }
                        </>
                        :
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