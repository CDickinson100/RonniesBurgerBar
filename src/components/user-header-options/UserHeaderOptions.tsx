import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";

import './Header.css';

export const UserHeaderOptions: FC<{ productCount: number, userName: string }> = ({productCount, userName}) => {
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
        <>
            <button className="profile"
                    onClick={() => setAccountOptionsVisible(!accountOptionsVisible)}>
                <p>{userName}</p>
            </button>
            <Link to="/checkout">
                <div className="shopping-cart">
                    <FontAwesomeIcon icon={faShoppingBasket}/>
                    <p>{productCount}</p>
                </div>
            </Link>
            {
                accountOptionsVisible &&
                <div className="account-options">
                    <button onClick={() => logout()}>
                        <p>Log out</p>
                    </button>
                </div>
            }
        </>
    );
}