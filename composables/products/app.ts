import { url as strapi } from "../reusables/var";

class Products {
    
    async init() {
        const url = `https://${strapi}`;

        const options = {
            method: 'get',
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            }
        }

        const response = await fetch(url + "/api/products?populate=*", options);
        const data = await response.json();

        return data;
    }
}

export default Products;