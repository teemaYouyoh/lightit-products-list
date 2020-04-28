import React, {Component} from 'react';
import ShopService from '../../services/ShopService';
import Header from '../Header/Header';

export default class Registration extends Component{

    state = {
        token: '',
        user: {
            username: '',
            password: ''
        }
    }

    ShopService = new ShopService();

    registerUser = async ()=>{
        const token = await this.ShopService.registerUser(this.state.user);
        let user = this.state.user;
        user.token = token;
        localStorage.setItem('user', JSON.stringify(user));
    };

    loginUser = async ()=>{
        const token = await this.ShopService.loginUser(this.state.user);
        let user = this.state.user;
        user.token = token;
        localStorage.setItem('user', JSON.stringify(user));
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
            <div>
                <Header></Header>
                <input name="username" type="text" onBlur={this.handleChange}/>
                <input name="password" type="password" onBlur={this.handleChange}/>
                <button onClick={this.registerUser}>Register</button>
            </div>
        )
    }
}