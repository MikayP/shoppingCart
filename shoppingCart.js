     $(".addToCart").click(function(event) {
            event.preventDefault(); //prevents link from doing its normal link behavior
            var name = $(this).attr("data-name"); //(this) is to select just the one thats clicked. attr for accessing one of the attributes in the link
            var price = Number($(this).attr("data-price")); //Number converts string to number if needed
            shoppingCart.addItemToCart(name, price, 1);
            displayCart();
        })

        $("#clearCart").click(function(event) {
            shoppingCart.clearCart();
            displayCart();
        });

        function displayCart() {
            var cartArray = shoppingCart.listCart();
            var output = "";
            for (var i in cartArray) {
                output += "<li>"
                    +cartArray[i].name
                    +" <input class='itemCount' type='number' data-name='"
                    +cartArray[i].name
                    +"'value='"+cartArray[i].count+"'>"
                    +" x " + cartArray[i].price
                    +" = " + cartArray[i].total
                    +" <button class='plusItem' data-name='" + cartArray[i].name + "'>+</button>"
                    +" <button class='subtractItem' data-name='" + cartArray[i].name + "'>-</button>"
                    +" <button class='deleteItem' data-name='" + cartArray[i].name + "'>Delete Item</button>"
                    +"</li>";
            }
            $("#showCart").html(output);
            $("#count_Cart").html(shoppingCart.countCart());
            $('#totalCart').html(shoppingCart.totalCart()); // calls function of total value
        }

        $('#showCart').on("click", ".deleteItem", function(event) {
            var name = $(this).attr("data-name");
            shoppingCart.removeItemFromCartAll(name);
            displayCart();
        });

        $('#showCart').on("click", ".subtractItem", function(event) {
            var name = $(this).attr("data-name");
            shoppingCart.removeItemFromCart(name);
            displayCart();
        });

        $('#showCart').on("click", ".plusItem", function(event) {
            var name = $(this).attr("data-name");
            shoppingCart.addItemToCart(name, 0, 1);
            displayCart();
        });

        $('#showCart').on("change", ".itemCount", function (event){
            var name = $(this).attr("data-name")
            var count = Number ($(this).val()); //turns string into number
            shoppingCart.setCountForItem(name, count);
            displayCart();
        });



var shoppingCart = {};
shoppingCart.cart = [];
shoppingCart.Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count

};

shoppingCart.addItemToCart = function (name, price, count) {
    for (var i in shoppingCart.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            this.saveCart(); //needed to save each time the loop happens
            return;
        } //used if you add the same item more than once
    }
    var item = new this.Item(name, price, count); //this can be used if referring to the owner of the method (shoppingCart.)
    this.cart.push(item);
    this.saveCart();
};

shoppingCart.setCountForItem = function (name, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count = count;
            break;
        }
    }
    this.saveCart();
};

shoppingCart.removeItemFromCart = function (name) { //removes 1 item
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count--; //subtracts one
            if (this.cart[i].count === 0) { // when count is 0 or below
                this.cart.splice(i, 1); //removes the item from the cart i = position, 1 = # of items
            }
            break;
        }
    }
    shoppingCart.saveCart();
};

shoppingCart.removeItemFromCartAll = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    shoppingCart.saveCart();
}; //removes all items

shoppingCart.clearCart = function () { //clears the cart
    this.cart = [];
    shoppingCart.saveCart();
};

shoppingCart.countCart = function () { //returns total cart of each item
    var totalCount = 0; // variable outside so that when is loops it doesnt go back to 0
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
};

shoppingCart.totalCart = function () { //total price
    var totalCost = 0;
    for (var i in this.cart) {
        totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2); //converts number to string (2 decimal places)
};

shoppingCart.listCart = function () {
    var cartCopy = []; //making copy instead of cart so it doesn't reference the original cart when counting, adding, deleting
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2); //shows price times amount
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};

shoppingCart.saveCart = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart)); //

};
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
};


shoppingCart.loadCart();
displayCart();

//Raw Functions

//        //***************************
//        var cart = [];
//        //name price count x X
//        var Item = function(name, price, count) {
//            this.name = name
//            this.price = price
//            this.count = count
//
//        };
//
//
//        function addItemToCart(name, price, count) {
//
//            for (var i in cart) {
//                if (cart[i].name === name) {
//                    cart[i].count += count;
//                    saveCart(); //needed to save each time the loop happens
//                    return;
//                } //used if you add the same item more than once
//            }
//            var item = new Item(name, price, count);
//            cart.push(item);
//            saveCart();
//        };
//
//
//
//        function removeItemFromCart(name) { //removes 1 item
//            for (var i in cart) {
//                if (cart[i].name === name) {
//                    cart[i].count--; //subtracts one
//                    if (cart[i].count === 0) { // when count is 0 or below
//                        cart.splice(i, 1); //removes the item from the cart i = position, 1 = # of items
//                    }
//                    break;
//                }
//            }
//            saveCart();
//        };
//
//
//        function removeItemFromCartAll(name) {
//            for (var i in cart) {
//                if (cart[i].name === name) {
//                    cart.splice(i, 1);
//                    break;
//                }
//            }
//            saveCart();
//        }; //removes all items
//
//
//
//
//        function clearCart() { //clears the cart
//            cart = [];
//            saveCart();
//        };
//
//
//
//        function countCart() { //returns total cart of each item
//            var totalCount = 0; // variable outside so that when is loops it doesnt go back to 0
//            for (var i in cart) {
//                totalCount += cart[i].count;
//
//            }
//            return totalCount;
//        };
//
//
//
//        function totalCart() { //total price
//            var totalCost = 0;
//            for (var i in cart) {
//                totalCost += cart[i].price * cart[i].count;
//            }
//            return totalCost.toFixed(2); //converts number to string (2 decimal places)
//        };
//
//        //array of Items listed in HTML
//
//        function listCart() {
//            var cartCopy = []; //making copy instead of cart so it doesn't reference the original cart when counting, adding, deleting
//            for (var i in cart) {
//                var item = cart[i];
//                var itemCopy = {};
//                for (var p in item) {
//                    itemCopy[p] = item[p];
//                }
//                itemCopy.total = (item.price * item.count).toFixed(2); //shows price times amount
//                cartCopy.push(itemCopy);
//            }
//            return cartCopy;
//        };
//
//
//        function saveCart() {
//            localStorage.setItem("shoppingCart", JSON.stringify(cart)); //
//
//        };
//
//        function loadCart() {
//            cart = JSON.parse(localStorage.getItem("shoppingCart"));
//        };
//
//
//        loadCart();
//        displayCart();

