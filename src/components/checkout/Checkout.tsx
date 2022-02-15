import React, {FC} from "react";
import {IProduct} from "../../IProduct";

import "./Checkout.css";
import {ProductCheckoutSummary} from "../product-checkout-summary/ProductCheckoutSummary";

export const Checkout: FC<{ products: IProduct[], clearBasket: () => void }> = ({products, clearBasket}) => {

    async function checkout() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'token': localStorage.token,
                'order': products.map(value => value.id)
            })
        };
        await fetch('/createOrder', requestOptions);
        clearBasket();
        // @ts-ignore
        window.location = "/";
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });
    return (
        <div className="checkout">
            <div className="checkout-header">
                <h1>Checkout</h1>
                <h1 className="checkout-header-right">{products.length + " Items"}</h1>
            </div>
            <div className="checkout-items">
                {products.map(product => <ProductCheckoutSummary product={product}/>)}
            </div>
            <div className="checkout-summary">
                <button type="submit" onClick={() => checkout()}><p>Checkout</p></button>
                <p>{"Total: " + formatter.format(products.map(value => value.price).reduce((partialSum, a) => partialSum + a, 0) / 100)}</p>
            </div>
        </div>
    );
}