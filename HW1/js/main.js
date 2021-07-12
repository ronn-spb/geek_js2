let cart = [];
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

let itemCardHtml = '<div class="item_card">\
    <div class="overlay_btn">\
    <div class="add_to_card flex" id="%id%" onclick="addToCart(this)">\
        <img src="img/card.svg" alt="">\
                Add to Cart\
    </div>\
</div>\
<a href="singlepage.html">\
    <div class="item_crd_img">\
        <img src="img/%img%" alt="Mango  People  T-shirt">\
        <div class="overlay">\
        </div>\
    </div>\
    <div class="itemcard_info">\
        <div class="item_name">%name%</div>\
        <div class="item_price">$%price%</div>\
    </div>\
</a>\
</div>'
let itemMiniCart = '\
<div class="cart_item flex flex_btw">\
<div class="flex">\
    <div class="cart_item_img">\
        <img src="img/%img%" alt="cartitem">\
    </div>\
    <div class="cat_descr">\
        <div class="cart_item_name">\
           %name%\
        </div>\
        <div class="cart_item_stars">\
            <i class="fas fa-star"></i>\
            <i class="fas fa-star"></i>\
            <i class="fas fa-star"></i>\
            <i class="fas fa-star"></i>\
            <i class="fas fa-star-half-alt"></i>\
        </div>\
        <div class="cart_item_price">\
            %quantity% x $%price%\
        </div>\
    </div>\
</div>\
<div class="cart_delete_btn flex">\
    <i class="fas fa-times-circle"></i>\
</div>\
</div>\
<div class="browse_decor"></div>'


let itemOutput = "";

function displayItemsCard() {

    let catalogItems = document.getElementsByClassName("catalog_items");
    console.log(catalogItems);
    let itemOutput = "";
    for (let i = 0; i < pageProducts.length; i++) {
        itemOutput += (itemCardHtml.replace(/%name%/gi, pageProducts[i].name).replace(/%img%/gi, pageProducts[i].img).replace(/%price%/gi, pageProducts[i].price).replace(/%id%/gi, pageProducts[i].id));

    }
    catalogItems[0].insertAdjacentHTML("afterbegin", itemOutput);

}
function updateCart() {
    let lvCart = document.getElementsByClassName("live_cart")[0];

    lvCart.style.display = "block";
    lvCart.innerText = cart.length + "";
    let cartItemList = document.getElementsByClassName("cart_item_list")[0];
    //cartItemList.insertAdjacentHTML("beforeend", itemMiniCart);
    itemOutput = "";
    for (let i = 0; i < cart.length; i++) {
        itemOutput += (itemMiniCart.replace(/%name%/gi, cart[i].name).replace(/%img%/gi, cart[i].img).replace(/%price%/gi, cart[i].price).replace(/%id%/gi, cart[i].id)).replace(/%quantity%/gi, cart[i].quantity);
    }
    cartItemList.innerHTML = itemOutput;
    let cartTotalEm = document.getElementsByClassName("cart_total_amount")[0];
    cartTotalEm.innerText = "$" + cartGetTotal();
}


function addToCart(e) {
    let indexInCart = cart.findIndex(product => product.id === e.id);
    console.log(indexInCart);
    if (indexInCart != -1) {
        cart[indexInCart].quantity += 1;
    } else {
        let productObj = pageProducts.find(product => product.id === e.id);

        cart.push({
            id: productObj.id,
            name: productObj.name,
            img: productObj.img,
            quantity: 1,
            price: productObj.price
        });
    }
    console.log(cart);
    updateCart();
}
function cartGetTotal() {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        total += cart[i].quantity * cart[i].price;
    }
    return total;
}

displayItemsCard();




