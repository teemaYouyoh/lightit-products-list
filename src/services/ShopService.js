import products from "../products.json";

export default class ShopService {
    postRequest = async (url, data = {}) => {
        let res;
        let headers = {};
        const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

        if (!token) {
            headers = {
                "Content-Type": "application/json",
            };
        } else {
            headers = {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            };
        }

        try {
            res = await fetch(`http://smktesting.herokuapp.com/api/${url}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers,
            });
            res = await res.json();
        } catch (err) {
            throw new Error(`Could not fetch; ${res.status}`);
        }

        return res;
    };

    getRequest = async (url) => {
        let res;

        try {
            res = await fetch(`http://smktesting.herokuapp.com/api/${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            res = await res.json();
        } catch (err) {
            throw new Error(`Could not fetch; ${res.status}`);
        }

        return res;
    };

    getUsers = async () => {
        return this.getRequest("register");
    }

    registerUser = async (data) => {
        return this.postRequest("register/", data);
    }

    loginUser = async (data) => {
        return this.postRequest("login/", data);
    }

    getProducts = async () => {
        return this.getRequest("products/");
    }

    getReviews = async (id) => {
        return this.getRequest(`reviews/${id}`);
    }

    postReview = (id, text, rate) => {
        const data = {
            rate,
            text,
        };
        this.postRequest(`reviews/${id}`, data);
    }

    addProducts = () => {
        const data = products.products;
        data.forEach((element) => {
            this.postRequest("products/", element);
        });
    }
}
