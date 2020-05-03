import React from 'react';
import PropTypes from 'prop-types';

import './product-info.scss';

export default function ProductInfo(props) {
    const { title, text, img } = props.product;

    return (
        <section className="product">
            <div className="container">
                <div className="product-wrapper">
                    <div className="image-wrapper">
                        <img className="product__image" src={img} alt={title}/>
                    </div>
                    <div className="product__information">
                        <h2 className="product__title">
                            {title}
                        </h2>
                        <p className="product__text">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

ProductInfo.propTypes = {
    product: PropTypes.object,
};

ProductInfo.defaultTypes = {
    product: {},
};
