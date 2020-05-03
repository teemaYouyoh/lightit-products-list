import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

import ShopService from '../../services/ShopService';
import Header from '../Header/Header';
import ProductInfo from '../ProductInfo/ProductInfo';
import ProductReviews from '../ProductReviews/ProductReviews';

import './product-page.scss';

export default class ProductPage extends Component {
    state = {
        product: {},
        reviews: [],
        review: '',
        rate: 0,
        warning: '',
    }

    ShopService = new ShopService();

    componentDidMount() {
        const { id } = this.props.match.params;

        this.ShopService.getProducts()
            .then(this.onProductsLoaded)
            .catch(this.onError);

        this.ShopService.getReviews(id)
            .then(this.onReviewsLoaded)
            .catch(this.onError);
    }

    onProductsLoaded = (products) => {
        const { id } = this.props.match.params;

        products.forEach((element) => {
            if (+element.id === +id) {
                // замена ссылок на изображения товаров без изображения
                if (element.id === 1 || element.id === 2) {
                    element.img = `http://smktesting.herokuapp.com/static/${element.img}`;
                }

                this.setState({
                    product: element,
                });
            }
        });
    }

    onReviewsLoaded = (data) => {
        const reviews = data.reverse(); // сортировка: сначала новые комментарии
        this.setState({
            reviews,
        });
    }

    onError = (err) => {
        console.error(err);
    }

    handleChange = (e) => {
        this.setState({
            review: e.target.value,
        });
    }

    handleClick = async () => {
        const { id } = this.props.match.params;
        const { review, rate } = this.state;
        const token = localStorage.getItem('token');

        if (token === null) { // проверка: авторизирован ли пользователя
            this.setState({
                warning: 'Необходимо авторизироваться!',
            });
        } else if (review !== '' && rate !== 0) {
            await this.ShopService.postReview(id, review, rate);

            this.ShopService.getReviews(id)
                .then(this.onReviewsLoaded)
                .catch(this.onError);

            this.setState({
                review: '',
                rate: 0,
                warning: 'Отзыв успешно отправлен!',
            });
        } else {
            this.setState({
                warning: 'Поставьте оценку или введите отзыв!',
            });
        }
    }

    changeRating = (rate) => {
        this.setState({
            rate,
        });
    }

    render() {
        const { product, reviews, warning } = this.state;

        return (
            <>
                <Header/>
                <main>
                    <ProductInfo product={product}/>

                    <section className="review-form">
                        <div className="container">
                            <div className="review-form-wrapper">
                                <StarRatings
                                    rating={this.state.rate}
                                    starRatedColor="orange"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                />
                                <textarea
                                    className="review__textarea input"
                                    value={this.state.review}
                                    type="text"
                                    placeholder="Оставьте свой отзыв..."
                                    onChange={this.handleChange}
                                />
                                <div className="review-button-form">
                                    <button
                                        className="review__button btn"
                                        onClick={this.handleClick}>
                                        Отправить отзыв
                                    </button>
                                    <span className="review__warning">
                                        {warning}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <ProductReviews reviews={reviews}/>
                </main>
            </>
        );
    }
}

ProductPage.propTypes = {
    match: PropTypes.object,
};

ProductPage.defaultTypes = {
    match: {},
};
