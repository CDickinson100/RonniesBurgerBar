import React, {FC} from "react";
import {IProduct} from "../../IProduct";

import "./ProductCheckoutSummary.css";

export const ProductCheckoutSummary: FC<{ product: IProduct }> = ({product}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });
    return (
        <div className="product-checkout-summary" data-testid="product-checkout-summary">
            <div className="product-checkout-summary-description">
                <img className="product-checkout-summary-image" alt={product.name} src={"data:image/png;base64," + product.image}/>
                <p>{product.name}</p>
            </div>
            <p>{product.description}</p>
            <p>{formatter.format(product.price / 100)}</p>
        </div>
    );
}