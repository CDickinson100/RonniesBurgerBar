import React, {FC} from 'react';

import './Product.css';
import {IProduct} from "../../IProduct";

export const Product: FC<{ product: IProduct }> = ({product}) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'GBP',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    return (
        <div className="product">
            <h5>{product.name + " ("+formatter.format(product.price/100)+")"}</h5>
            <img className="product-image" alt={product.name} src={"data:image/png;base64," + product.image}/>

            <button type="submit"><p>Purchase</p></button>
        </div>
    );
}