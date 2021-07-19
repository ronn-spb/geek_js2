// let cart = [];
class cart {
    constructor() {
        this.numGoods = 0;
        this.cartList = [];
    }
    addToCart(e) {
        let indexInCart = this.cartList.findIndex(product => product.id === e.id);

        if (indexInCart != -1) {
            cart[indexInCart].quantity += 1;
        } else {
            let productObj = pageProducts.find(product => product.id === e.id);

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

        itemOutput = "";
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
let pageProducts = [
    {
        id: "1",
        img: "catalog-item-1.png",
        price: 52,
        name: "Mango People T-shirt",
    }, {
        id: "2",
        img: "catalog-item-2.png",
        price: 60,
        name: "Mango People T-shirt",
    }, {
        id: "3",
        img: "catalog-item-3.png",
        price: 53,
        name: "Mango People T-shirt",
    }, {
        id: "4",
        img: "catalog-item-4.png",
        price: 74,
        name: "Mango People T-shirt",
    }, {
        id: "5",
        img: "catalog-item-5.png",
        price: 90,
        name: "Mango People T-shirt",
    }, {
        id: "6",
        img: "catalog-item-6.png",
        price: 52,
        name: "Mango People T-shirt",
    }, {
        id: "7",
        img: "catalog-item-7.png",
        price: 58,
        name: "Mango People T-shirt",
    }, {
        id: "8",
        img: "catalog-item-8.png",
        price: 52,
        name: "Mango People T-shirt",
    }, {
        id: "9",
        img: "catalog-item-9.png",
        price: 73,
        name: "Mango People T-shirt",
    }
];
const catalogItems = document.getElementsByClassName("catalog_items");






let itemOutput = "";
function displayProductCard({ id, price, name, img }) {
    let itemCardHtml = `<div class="item_card">\
    <div class="overlay_btn">\
    <div class="add_to_card flex" id="${id}" onclick="pageCart.addToCart(this)">\
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

function displayItemsCards(list = pageProducts) {


    let catalogItems = document.getElementsByClassName("catalog_items");
    let itemOutput = '';
    list.map(item => {
        itemOutput += displayProductCard(item);
    }
    );
    catalogItems[0].insertAdjacentHTML("afterbegin", itemOutput);

}

pageCart = new cart();
displayItemsCards();
pageCart.updateCart();




