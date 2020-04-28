import React, {Component} from 'react';
import StarRatings from 'react-star-ratings';
import ShopService from '../../services/ShopService';
import Header from '../Header/Header';

import './product-page.css';


export default class ProductPage extends Component{

    state = {
        product: {},
        reviews: [],
        review: "",
        rate: 0,
        warning: ""
    }

    ShopService = new ShopService();

    componentDidMount(){
        const { id } = this.props.match.params;

        this.ShopService.getProducts()
        .then(this.onProductsLoaded)
        .catch();

        this.ShopService.getReviews(id)
        .then(this.onReviewsLoaded)
        .catch();
    }

    onProductsLoaded = (products)=>{
        const { id } = this.props.match.params;
        // let product = {};

        products.forEach(element => {
            if(element.id == id){
                if(element.id === 1 || element.id === 2){
                    element.img = "https://hotline.ua/img/tx/212/2124823045.jpg";
                }

                this.setState({
                    product: element
                })
            }
        });
    }

    onReviewsLoaded = (reviews)=>{
        reviews = reviews.reverse();
        this.setState({
            reviews
        })

        console.log(this.state.reviews)
    }

    handleChange = (e)=>{
        this.setState({
            review: e.target.value
        });
    }

    handleClick = async ()=>{
        const { id } = this.props.match.params;
        const { review, rate } = this.state;
        const token = localStorage.getItem('token');
        console.log(token);
        if(token === null){
            this.setState({
                warning: "Необходимо авторизироваться!"
            })
        } else if (review !== '' && rate !== 0) {
            await this.ShopService.postReview(id, review, rate);
            this.ShopService.getReviews(id)
            .then(this.onReviewsLoaded)
            .catch();

            this.setState({
                warning: ""
            })
        } else {
            this.setState({
                warning: "Поставьте оценку или введите отзыв!"
            })
        }        
    }    

    changeRating = ( newRating, name )=>{
        this.setState({
            rate: newRating
        });
    }

    renderItem = ()=>{
        return this.state.reviews.map(item => {
            return(
                <div className="review" key={item.id}>
                    <div className="review__username">
                        {`${item.created_by.username} в ${item.created_at}`}
                    </div>
                    <div className="review__rate">Оценка: {item.rate}</div>
                    <div className="review__text">{item.text}</div>
                </div>
            )
        })
    }
    
    render(){
        const item = this.renderItem();
        const {id, title, img, text} = this.state.product;

        return(
            <>
                <Header/>
                <main>
                    <section className="product">
                        <div className="container">
                            <div className="product-wrapper">
                                <div className="product__image">
                                    <img src={img} alt={title}/>
                                </div>
                                <div className="product__information">
                                    <h2 className="information__title">
                                        {title}
                                    </h2>
                                    <p className="information__text">
                                        {text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="reviews">
                        <div className="container">
                            <div className="reviews-wrapper">
                                <div className="review-form">
                                    <StarRatings
                                        rating={this.state.rate}
                                        starRatedColor="orange"
                                        changeRating={this.changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                    <textarea
                                        className="review__textarea" 
                                        type="text" 
                                        placeholder="Оставьте свой отзыв..." 
                                        onBlur={this.handleChange}
                                    />
                                    <div className="review-button-form">
                                        <button 
                                            className="review__button" 
                                            onClick={this.handleClick}>
                                            Отправить отзыв
                                        </button>
                                        <span className="review__warning">
                                            {this.state.warning}
                                        </span>
                                    </div>
                                    
                                </div>
                                <h2 className="reviews__title">Отзывы</h2>
                                {item}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    }
}