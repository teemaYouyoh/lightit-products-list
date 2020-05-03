import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShopService from '../../services/ShopService';

import './header.scss';

export default class Header extends Component {
    state = {
        username: '',
    }

    ShopService = new ShopService();

    componentDidMount() {
        // получение имени авторизированного пользвателя для отображения в header
        this.getUsername();
    }

    getUsername = () => {
        const user = localStorage.getItem('user');
        const username = user ? JSON.parse(user).username : null;
        this.setState({
            username,
        });
    }

    signOut = () => {
        localStorage.clear();
        this.setState({
            username: '',
        });
    }

    render() {
        let headerUsername;
        const { username } = this.state;

        if (username) {
            headerUsername = <span onClick={this.signOut}>Выйти ({username})</span>;
        } else {
            headerUsername = <Link to='/authorization'>Войти / Зарегитрироваться</Link>;
        }

        return (
            <header>
                <div className="container">
                    <div className="header__wrapper">
                        <Link to="/">Магазин</Link>
                        {headerUsername}
                    </div>
                </div>
            </header>
        );
    }
}
