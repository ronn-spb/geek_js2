// let cart = [];
var app = new Vue({
    el: '#app',
    data: {
        productList: []
    },
    methods: {
        async mounted() {
            this.productList = await request('/HW5/product.json');
            console.log(this.productList);
        }
    }
})




class cart {
    constructor(pageProducts) {
        this.numGoods = 0;
        this.cartList = [];
        this.pageProducts = pageProducts;
    }
    addToCart(e) {
        let indexInCart = this.cartList.findIndex(product => product.id === e.id);

        if (indexInCart != -1) {
            this.cartList[indexInCart].quantity += 1;
        } else {
            let productObj = pageProducts.goodList.find(product => product.id === e.id);

            this.cartList.push({
                id: productObj.id,
                name: productObj.name,
                img: productObj.img,
                quantity: 1,
                price: productObj.price
            });
        }

        this.updateCart();
    }
    updateCart(list = this.cartList) {
        let lvCart = document.getElementsByClassName("live_cart")[0];

        lvCart.style.display = "block";
        lvCart.innerText = list.length + "";
        let cartItemList = document.getElementsByClassName("cart_item_list")[0];

        let itemOutput = "";
        list.map(item => {
            itemOutput += this.renderCartItem(item)
        })
        cartItemList.innerHTML = itemOutput;
        let cartTotalEm = document.getElementsByClassName("cart_total_amount")[0];
        cartTotalEm.innerText = "$" + this.cartGetTotal();
    }
    renderCartItem({ name, img, price, id, quantity }) {
        let itemMiniCart = `\
    <div class="cart_item flex flex_btw" >\
    <div class="flex">\
        <div class="cart_item_img">\
            <img src="img/${img}" alt="cartitem">\
        </div>\
        <div class="cat_descr">\
            <div class="cart_item_name">\
               ${name}\
            </div>\
            <div class="cart_item_stars">\
                <i class="fas fa-star"></i>\
                <i class="fas fa-star"></i>\
                <i class="fas fa-star"></i>\
                <i class="fas fa-star"></i>\
                <i class="fas fa-star-half-alt"></i>\
            </div>\
            <div class="cart_item_price">\
                ${quantity} x $ ${price}\
            </div>\
        </div>\
    </div>\
    <div class="cart_delete_btn flex" >\
        <i class="fas fa-times-circle" id="${id}" onclick="pageCart.deleteItemCart(this)"></i>\
    </div>\
    </div>\
    <div class="browse_decor"></div>`;
        return itemMiniCart;
    }
    deleteItemCart(e) {
        this.cartList = this.cartList.filter((item) => {
            return (item.id != e.id)
        })
        this.updateCart();
    }
    cartGetTotal() {
        let total = 0;
        for (let i = 0; i < this.cartList.length; i++) {
            total += this.cartList[i].quantity * this.cartList[i].price;
        }
        return total;
    }
}
class goodsList {
    constructor(container) {
        this.goodList = [];
        this._goodsContiner = container;
    }
    addGood(goodItem) {
        this.goodList.push(goodItem);
    }
    renderGoodItem({ id, price, name, img }) {
        let itemCardHtml = `<div class="item_card">\
        <div class="overlay_btn">\
        <div class="add_to_card flex" id="${id}" onclick="addToCart(this)">\
            <img src="img/card.svg" alt="">\
                    Add to Cart\
        </div>\
    </div>\
    <a href="singlepage.html">\
        <div class="item_crd_img">\
            <img src="img/${img}" alt="Mango  People  T-shirt">\
            <div class="overlay">\
            </div>\
        </div>\
        <div class="itemcard_info">\
            <div class="item_name">${name}</div>\
            <div class="item_price">$ ${price}</div>\
        </div>\
    </a>\
    </div>`
        return itemCardHtml
    }
    renderGoods() {
        let itemOutput = '';
        this.goodList.map(item => {
            itemOutput += this.renderGoodItem(item);
        }
        );
        this._goodsContiner.insertAdjacentHTML("afterbegin", itemOutput);
    }
}



const pageProducts = new goodsList(document.getElementsByClassName("catalog_items")[0]);
const pageCart = new cart(pageProducts);
// fetch('/HW3/product.json')
//     .then(respone => {
//         return respone.json();

//     })
//     .then(respone => {

//         respone.forEach(item => {
//             pageProducts.addGood(item);
//         });
//         pageProducts.renderGoods();
//     })
//     .catch(console.log("server error \n"));
function addToCart(e) {
    pageCart.addToCart(e);

}
async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body
        console.log('Get prod \n');
        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}
pageCart.updateCart();




