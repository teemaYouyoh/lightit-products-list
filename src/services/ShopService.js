export default class ShopService{

    postRequest = async (url, data={})=>{
        let headers = {};
        const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
        if(!token){
            headers = {
                "Content-Type": "application/json"
                } 
        } else {
            headers = {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
                }
        }

        let res = await fetch(`http://smktesting.herokuapp.com/api/${url}`,{
            method: "POST",
            body: JSON.stringify(data),
            headers: headers
        })

        // if(!res.ok){
        //     return
        // }

        return await res.json();
    };

    getRequest = async (url)=>{
        let res = await fetch(`http://smktesting.herokuapp.com/api/${url}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
                }
        })

        // if(!res.ok){
        //     return
        // }

        return await res.json();
    };

    getUsers = async ()=>{
       return await this.getRequest('register');
    }

    registerUser = async (data)=>{
        let res = await this.postRequest('register/', data);
        return res.token;
    }

    loginUser = async (data)=>{
        let res = await this.postRequest('login/', data);
        return res.token;
    }

    addComment = async (token)=>{
        let data = {
            "rate": 5,
            "text": "good"
        }
        console.log(token);
        console.log(await this.postRequest('reviews/1', data, token));
    }

    getProducts = async ()=>{
       return await this.getRequest('products/');
    }

    getReviews = async (id)=>{
        return await this.getRequest(`reviews/${id}`);
    }

    postReview = async (id, text, rate)=>{
        const data = {
            rate,
            text
        }
        console.log(await this.postRequest(`reviews/${id}`, data));
    }

    addProducts = ()=>{
        const data = [
            {
                title: "Mi Air 13 i7/8/256Gb/MX150 W (JYU4051) Grey",
                img: "https://i.allo.ua/media/catalog/product/cache/1/image/425x295/799896e5c6c37e11608b9f8e1d047d15/1/1/1151367-1024x768_3_1.jpg",
                text: "13.3' IPS (1920x1080) Full HD / Intel Core i7-8550U (1.8 - 4.0 ГГц) / RAM 8 ГБ / SSD 256 ГБ / nVidia GeForce MX150, 2 ГБ / без ОД / Wi-Fi / Bluetooth / веб-камера / Windows 10 Home 64bit / 1.28 кг"
            },
            {
                title: "Mi Notebook Pro 15 i7 16G 512 MX250 W (JYU4147)",
                img: "https://i.allo.ua/media/catalog/product/cache/1/image/425x295/799896e5c6c37e11608b9f8e1d047d15/c/o/copy_xiaomi_mi_notebook_pro_156_core_i5_8_256gb_10504g_5c77bc7f7cc73_images_11180443155_1_1_1_1.jpg",
                text: "15.6' IPS (1920x1080) Full HD / Intel Core i7-8550U (1.8 - 4.0 ГГц) / RAM 16 ГБ / SSD 512 ГБ / nVidia GeForce MX250, 2 ГБ / без ОД / Wi-Fi / Bluetooth / веб-камера / Windows 10 Home / 1.95 кг",
            },
            {
                title: "Lenovo IdeaPad 330-15IKB (81DC009PRA) Platinum Grey",
                img: "https://i.allo.ua/media/catalog/product/cache/1/image/425x295/799896e5c6c37e11608b9f8e1d047d15/2/0/20180717170322_lenovo_ideapad_330_15ast_a6_9225_4gb_256gb_fhd_w10.jpeg",
                text: "15,6' (1920x1080) TN+film / Intel Core i5-7200U (2.5 - 3.1 ГГц) / RAM 8 ГБ / SSD 256 ГБ / nVidia GeForce MX130, 2 ГБ / Bluetooth , Wi-Fi / Без ОС (freeDOS, Linux) / Без ОД / 2.2 кг"
            },
        ]
        data.forEach(element => {
            this.postRequest("products/", element);            
        });
    }

}