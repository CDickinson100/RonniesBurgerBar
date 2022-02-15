import React, {FC} from 'react';

import './Product.css';
import {IProduct} from "../../IProduct";

export const Product: FC<{ product: IProduct, addProduct: () => void }> = ({product, addProduct}) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',
    });
    return (
        <div className="product">
            <h5>{product.name + " (" + formatter.format(product.price / 100) + ")"}</h5>
            <img className="product-image" alt={product.name} src={"data:image/png;base64," + product.image}/>
            <div className="product-purchase">
                <button type="submit" onClick={() => addProduct()}><p>Purchase</p></button>
            </div>
        </div>
    );
}