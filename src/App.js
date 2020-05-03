import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Shop from './components/Shop/Shop';
import Authorization from './components/Authorization/Authorization';
import ProductPage from './components/ProductPage/ProductPage';
import ShopService from './services/ShopService';

import './App.css';

export default class App extends Component {
    ShopService = new ShopService();

    componentDidMount() {
        this.checkAuthorization(); // проверка на наличие пользователя в базе
    }

    checkAuthorization = async () => {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');
            const { token: responsiveToken } = await this.ShopService.loginUser(user);

            if (token !== responsiveToken) {
                await localStorage.clear();
                window.location.reload();
            }
        }
    }

    render() {
        return (
            <Router>
                <Route path='/' component={Shop} exact/>
                <Route path='/authorization' component={Authorization} exact/>
                <Route path='/product/:id' component={ProductPage} exact/>
            </Router>
        );
    }
}
