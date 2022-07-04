if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
}
else {
    ready()
}

function ready() {
    var removeitembutton = document.getElementsByClassName('remove-from-cart')
    for (var i = 0; i < removeitembutton.length; i++) {
        var button = removeitembutton[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("quantityinput")
    for (var i = 0; i < quantityInputs.length; i++) {
        var button = quantityInputs[i]
        button.addEventListener("change", addToCartClicked)
    }

    var addToCartButtons = document.getElementsByClassName("addbutton")
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener("click", addToCartClicked)
    }

    var addToCartButtonsComputer = document.getElementsByClassName("addbuttoncomputer")
    for (var i = 0; i < addToCartButtonsComputer.length; i++) {
        var button = addToCartButtonsComputer[i]
        button.addEventListener("click", addToCartClickedComputer)
    }

    document.getElementsByClassName("purchase-button")[0].addEventListener("click", purchaseclicked)
}

function removeCartItem(event) {
    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function updateCartTotal() {
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartrows = cartItems.getElementsByClassName("productrow")
    var total = 0
    for (i = 0; i < cartrows.length; i++) {
        var cartrow = cartrows[i]
        var priceElement = cartrow.getElementsByClassName("price")[0]
        var quantityElement = cartrow.getElementsByClassName("quantityinput")[0]
        var price = parseFloat(priceElement.innerText.replace("R", ""))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "R" + total
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-Item-Title")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imagesrc = shopItem.getElementsByClassName("item")[0].src
    console.log(title, price, imagesrc)
    addItemToCart(title, price, imagesrc)
    updateCartTotal()
}

function addItemToCart(title, price, imagesrc) {
    var cartrow = document.createElement("div")
    cartrow.classList.add("productrow")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("shop-Item-Title")
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert("this item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
    <div class="productitem productcolumn">
            <img class="item" src="${imagesrc}" alt="Apex Legends">
        </div>
        <div class="productcolumn">
            <span class="shop-Item-Title">${title}</span>
        </div>
        <span class="price productcolumn">${price}</span>
        <div class="quantity productcolumn">
            <input class="quantityinput" type="number" value="1">
            <button class="remove-from-cart" type="button">remove from Cart</button>
        </div>`
        cartrow.innerHTML = cartRowContents
    cartItems.append(cartrow)
    cartrow.getElementsByClassName("remove-from-cart")[0].addEventListener("click", removeCartItem)
    cartrow.getElementsByClassName("quantityinput")[0].addEventListener("change", quantityChanged)
}

function addToCartClickedComputer(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-Item-Title")[0].innerText
    var itemDesc = shopItem.getElementsByClassName("itemdescription")[0].innerText
    var price = shopItem.getElementsByClassName("price")[0].innerText
    var imagesrc = shopItem.getElementsByClassName("item")[0].src
    console.log(title, itemDesc , price, imagesrc)
    addItemToCartComputer(title, itemDesc, price, imagesrc)
    updateCartTotal()
}

function addItemToCartComputer(title, itemDesc, price, imagesrc) {
    var cartrow = document.createElement("div")
    cartrow.classList.add("productrow")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemNames = cartItems.getElementsByClassName("shop-Item-Title")
    for (var i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].innerText == title) {
            alert("this item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
    <div class="productitem productcolumn">
            <img class="item" src="${imagesrc}" alt="Apex Legends">
        </div>
        <div class="productcolumn">
            <span class="shop-Item-Title">${title}</span>
            <span class="itemdescription">${itemDesc}</span>
        </div>
        <span class="price productcolumn">${price}</span>
        <div class="quantity productcolumn">
            <input class="quantityinput" type="number" value="1">
            <button class="remove-from-cart" type="button">remove from Cart</button>
        </div>`
        cartrow.innerHTML = cartRowContents
    cartItems.append(cartrow)
    cartrow.getElementsByClassName("remove-from-cart")[0].addEventListener("click", removeCartItem)
    cartrow.getElementsByClassName("quantityinput")[0].addEventListener("change", quantityChanged)
}

function purchaseclicked() {
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}