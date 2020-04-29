import React, { Component } from "react";
import PropTypes from "prop-types";
import ShopService from "../../services/ShopService";
import Header from "../Header/Header";
import "./authorization.scss";

export default class Authorization extends Component {
    state = {
        token: "",
        user: {
            username: "",
            password: "",
        },
        warning: "",
    }

    ShopService = new ShopService();

    loginUser = async () => {
        if (this.state.user.username !== "" && this.state.user.password !== "") {
            const { user } = this.state;
            const { token } = await this.ShopService.loginUser(user);

            if (token !== undefined) {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);
                this.props.history.push("/");
            } else {
                this.setState({
                    warning: "Неверный логин или пароль!",
                });
            }
        } else {
            this.setState({
                warning: "Заполните пустые поля!",
            });
        }
    }

    registerUser = async () => {
        if (this.state.user.username !== "" && this.state.user.password !== "") {
            const { user } = this.state;
            const { token } = await this.ShopService.registerUser(user);

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            this.props.history.push("/");
        } else {
            this.setState({
                warning: "Заполните пустые поля!",
            });
        }
    }

    handleChange = (e) => {
        const input = e.target;
        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    [input.name]: input.value,
                },
            };
        });
    }

    render() {
        return (
            <>
                <Header/>
                <main>
                    <section className="authorization-form">
                        <div className="container">
                            <div className="authorization-wrapper">
                                <input className="authorization__input input" name="username" type="text" placeholder="Имя" onBlur={this.handleChange}/>
                                <input className="authorization__input input" name="password" type="password" placeholder="Пароль" onBlur={this.handleChange}/>
                                <div className="buttons-form">
                                    <button className="authorization__button btn" onClick={this.loginUser}>Войти</button>
                                    <button className="authorization__button authorization__button_large btn" onClick={this.registerUser}>Зарегистрироваться</button>
                                </div>
                                <div className="authorization__warning">
                                    {this.state.warning}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </>
        );
    }
}

Authorization.propTypes = {
    history: PropTypes.object,
};
