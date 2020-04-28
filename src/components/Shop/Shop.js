import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './shop.css';

import ShopService from '../../services/ShopService';
import Header from '../Header/Header';
import ProductCard from '../ProductCard/ProductCard';

export default class Shop extends Component {

    state = {
        products: [],
    };

    ShopService = new ShopService();

    componentDidMount(){
        this.ShopService.getProducts()
        .then(this.isDataLoaded)
        .catch();
    }

    isDataLoaded = (products)=>{
        products[0].img = "https://hotline.ua/img/tx/212/2124823045.jpg";
        products[1].img = "https://hotline.ua/img/tx/212/2124823045.jpg";
        this.setState({
            products
        })
    }

    renderItem = ()=>{
        return this.state.products.map(item => {
            return(
                <ProductCard item={item} key={item.id}/>      
            )            
        })
    }

    render(){

        const item = this.renderItem();

        return(
            <>
                <Header/>
                <main>
                    <section className="products">
                        <div className="container">
                            <div className="products-wrapper">
                                {item}
                            </div>
                        </div>
                    </section>
                </main>
            </>
        )
    };
};