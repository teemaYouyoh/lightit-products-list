import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './product-reviews.scss';

class ProductReviews extends Component {
    renderReviews= () => {
        return this.props.reviews.map((item) => {
            return (
                <div className="review" key={item.id}>
                    <div className="review__username">
                        {`${item.created_by.username} в ${item.created_at}`}
                    </div>
                    <div className="review__rate">Оценка: {item.rate}</div>
                    <div className="review__text">{item.text}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <section className="reviews">
                <div className="container">
                    <div className="reviews-wrapper">
                        <h2 className="reviews__title">Отзывы</h2>
                        {this.renderReviews()}
                    </div>
                </div>
            </section>
        );
    }
}

ProductReviews.propTypes = {
    reviews: PropTypes.array,
};

ProductReviews.defaultTypes = {
    reviews: [],
};

export default ProductReviews;
