import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShopService from "../../services/ShopService";
import "./header.scss";

export default class Header extends Component {
    state = {
        username: "",
    }

    ShopService = new ShopService();

    componentDidMount() {
        this.getUsername();
    }

    getUsername = () => {
        const user = localStorage.getItem("user");
        const username = user ? JSON.parse(user).username : null;

        this.setState({
            username,
        });
    }

    signOut = () => {
        localStorage.clear();
        this.setState({
            username: "",
        });
    }

    render() {
        let username;

        if (this.state.username) {
            username = <span onClick={this.signOut}>Выйти ({this.state.username})</span>;
        } else {
            username = <Link to='/authorization'>Войти / Зарегитрироваться</Link>;
        }

        return (
            <header>
                <div className="container">
                    <div className="header__wrapper">
                        <Link to="/">Магазин</Link>
                        {username}
                    </div>
                </div>
            </header>
        );
    }
}
