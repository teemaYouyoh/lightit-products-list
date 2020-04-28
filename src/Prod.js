import React from 'react';

export default class Prod extends React.Component{
    
    getProd = async ()=>{

        let res = await fetch("http://smktesting.herokuapp.com/api/reviews/1",{
            method: 'POST',
            body: JSON.stringify({
            "rate": 5,
            "text": "good"
            }),
            headers: {
            "Authorization": "Token d439fb41c908d215b60d23233862cd723606a31a",
            "Content-Type": "application/json"
            }
        })

        res = await res.json;
        console.log(res);
    }
}
