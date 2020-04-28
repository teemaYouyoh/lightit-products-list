import React from 'react';
import {Link} from 'react-router-dom';
import './product-card.css';

export default function ProductCard(props){
    let {id, title, img} = props.item;
    // if (img === "img1.png" || img === "img2.png") {                 //первые два товара выводятся без изображения
    //     img = "https://hotline.ua/img/tx/212/2124823045.jpg";    //поэтому делаем замену ссылок на изображения
    // }
    return(
        <div className="product-card">
            <div className="card__image">
                <img src={img} alt=""/>
            </div>
            <div className="card__title">
                <Link to={`/product/${id}`}>
                    {title}
                </Link>
            </div>
        </div>  
    )
}