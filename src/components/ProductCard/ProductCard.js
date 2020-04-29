import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./product-card.scss";

export default function ProductCard(props) {
    const { id, title, img } = props.item;

    return (
        <div className="product-card">
            <div className="card__image">
                <img src={img} alt=""/>
            </div>
            <div className="card__title">
                <Link to={`/product/${id}`}>
                    {title}
                </Link>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    item: PropTypes.object,
};
