import React, { Component } from 'react';

import ShopService from '../../services/ShopService';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';

import './shop.scss';

export default class Shop extends Component {
    state = {
        products: [],
    };

    ShopService = new ShopService();

    componentDidMount() {
        this.ShopService.getProducts()
            .then(this.onDataLoaded)
            .catch(this.onError);
    }

    addProducts = async () => {
        await this.ShopService.addProducts();
        this.ShopService.getProducts()
            .then(this.onDataLoaded)
            .catch(this.onError);
    }

    onDataLoaded = (products) => {
        // изменение ссылок на изображения товаров без изображений
        products[0].img = `http://smktesting.herokuapp.com/static/${products[0].img}`;
        products[1].img = `http://smktesting.herokuapp.com/static/${products[1].img}`;
        this.setState({
            products,
        });
    }

    onError = (err) => {
        console.error(err);
    }

    renderItem = () => {
        return this.state.products.map((item) => {
            return <ProductCard item={item} key={item.id}/>;
        });
    };

    render() {
        return (
            <>
                <Header/>
                <main>
                    <section className="products">
                        <div className="container">
                            <div className="add-products-button">
                                <button className="btn" onClick={this.addProducts}>Добавить товары</button>
                            </div>
                            <div className="products-wrapper">
                                {this.renderItem()}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}
