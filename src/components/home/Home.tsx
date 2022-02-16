import React from 'react';

// @ts-ignore
import banner from "../../graphics/banner.png";
// @ts-ignore
import delivery from "../../graphics/delivery.png";
// @ts-ignore
import discount from "../../graphics/discount.png";
import './Home.css';

export function Home() {
    return (
        <div className="home">
            <div className="home-landing">
                <img className="background" alt="banner" src={banner}/>
                <img className="delivery" alt="banner" src={delivery}/>
                <img className="discount" alt="banner" src={discount}/>
            </div>
        </div>
    );
}