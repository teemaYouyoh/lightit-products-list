import React, {Component} from 'react';
import ShopService from '../../services/ShopService';
import Header from '../Header/Header';
import './authorization.css';

export default class Registration extends Component{

    state = {
        token: '',
        user: {
            username: '',
            password: ''
        }
    }

    ShopService = new ShopService();

    loginUser = async ()=>{
        if(this.state.user.username !== '' || this.state.user.password !== '') {
            let user = this.state.user;
            const token = await this.ShopService.loginUser(user);
            
            if(token !== undefined){
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);
            }
            this.props.history.push("/");
        }
    };

    registerUser = async ()=>{
        if(this.state.user.username !== '' || this.state.user.password !== '') {
            let user = this.state.user;
            const token = await this.ShopService.registerUser(user);

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
            this.props.history.push("/");
        }
    };

    handleChange = (e)=>{
        const input = e.target;
        this.setState(prevState => ({
            user : {
                ...prevState.user,
                [input.name]: input.value
            }
        }))
    };

    render(){
        return(
            <>
                <Header></Header>
                <section className="authorization-form">
                    <div className="container">
                        <div className="authorization-wrapper">
                            <input name="username" type="text" placeholder="Имя" onBlur={this.handleChange}/>
                            <input name="password" type="password" placeholder="Пароль" onBlur={this.handleChange}/>
                            <div className="buttons-form">
                                <button onClick={this.loginUser}>Войти</button>
                                <button onClick={this.registerUser}>Зарегистрироваться</button>
                            </div>
                        </div> 
                    </div>
                </section>                
            </>
        )
    }
}