import React, { Component } from "react";
import ShopService from "../../services/ShopService";
import Header from "../Header/Header";
import ProductCard from "../ProductCard/ProductCard";
import "./shop.scss";

export default class Shop extends Component {
    state = {
        products: [],
    };

    ShopService = new ShopService();

    componentDidMount() {
        this.ShopService.getProducts()
            .then(this.isDataLoaded)
            .catch();
    }

    isDataLoaded = (products) => {
        products[0].img = "https://hotline.ua/img/tx/212/2124823045.jpg";
        products[1].img = "https://hotline.ua/img/tx/212/2124823045.jpg";
        this.setState({
            products,
        });
    }

    addProducts = () => {
        this.ShopService.addProducts();
        this.ShopService.getProducts()
            .then(this.isDataLoaded)
            .catch();
    }

    renderItem = () => {
        return this.state.products.map((item) => {
            return (
                <ProductCard item={item} key={item.id}/>
            );
        });
    }

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
