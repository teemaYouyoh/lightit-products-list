import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './header.css';

import ShopService from '../../services/ShopService';

export default class Header extends Component{

    state = {
        username: "",
    }

    ShopService = new ShopService();

    componentDidMount(){
        this.getUsername();
    }

    getUsername = ()=>{
        const user = localStorage.getItem('user');
        const username = user ? JSON.parse(user).username : null;

        this.setState({
            username
        })
    }

    addProducts = ()=>{
        this.ShopService.addProducts();
        window.location.href = window.location.href; //перезагрузка страницы
    }

    signOut = async ()=>{
        await localStorage.clear();
        this.setState({
            username: ""
        })
    }

    render(){
        let username;

        if(this.state.username){
            username = <span onClick={this.signOut}>Выйти ({this.state.username})</span>;
        } else {
            username = <Link to='/authorization'>Войти / Зарегитрироваться</Link>
        }

        return(
            <header>
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__button">
                            <span onClick={this.addProducts}>Добавить товары</span>
                        </div> 
                        <div className="header__navigation">
                            <Link to="/">Магазин</Link>
                            {username} 
                        </div>                                       
                    </div>
                </div>
            </header>
        )
    }
}