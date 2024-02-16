let container = document.getElementById('container');
let shoesCart = document.getElementsByClassName('items');
for (let i = 0; i < shoesCart.length; i++) {
    shoesCart[i].addEventListener("click", info);
}


//cartContainer
let cartContainer = document.querySelector('.cartContainer');
let cartCloseIcon = document.querySelector('#cartCloseIcon');
cartCloseIcon.addEventListener("click", cartCloseIconFn);
function cartCloseIconFn() {
    let cartIcon = document.getElementById('cartIcon');
    cartContainer.classList.remove('cartContainerShow');
    cartIcon.style.display = "inline";
}
cartContainer.appendChild(cartCloseIcon);
// for viewing carted items
let cartIcon = document.getElementById('cartIcon');
cartIcon.addEventListener('click', cartIconFn);

function cartIconFn() {
    if (cartContainer.children.length > 1) {
        cartContainer.classList.add("cartContainerShow");
        cartIcon.style.display = "none";
    }
    else {
        alert("Nothing is here!");
    }

}
//for viewing the item
function info(event) {
    let shoeInfoDiv = document.createElement('div');
    shoeInfoDiv.setAttribute("class", `shoeInfoDiv`);
    shoeInfoDiv.classList.add("shoeInfoDiv");
    document.body.appendChild(shoeInfoDiv);


    let infoCloseIcon = document.createElement('i');
    infoCloseIcon.setAttribute("class", "bx bx-x")
    infoCloseIcon.id = "infoCloseIcon";
    shoeInfoDiv.appendChild(infoCloseIcon);
    let clickedDiv = event.target.parentNode.children;
    let shoeInfo = document.createElement('div');
    shoeInfo.setAttribute("class", "shoeInfo");
    for (let j = 0; j < clickedDiv.length; j++) {
        if (clickedDiv[j].className === "shoeName") {
            let shoeName = document.createElement("h1");
            shoeName.innerText = clickedDiv[j].innerText;
            shoeName.setAttribute("class", "shoeName");
            shoeInfo.appendChild(shoeName);
            shoeInfoDiv.setAttribute("id", shoeName.innerText);
        }
        if (clickedDiv[j].className === "shoeImage") {
            let shoeImage = document.createElement('img');
            shoeImage.src = clickedDiv[j].src;
            shoeImage.setAttribute("class", "shoeImage");
            shoeInfoDiv.appendChild(shoeImage);
        }
        if (clickedDiv[j].className === "shoePrice") {
            let shoePrice = document.createElement("h3");
            shoePrice.innerText = clickedDiv[j].innerText;
            shoePrice.setAttribute("class", "shoePrice");
            shoeInfo.appendChild(shoePrice);
        }
        if (clickedDiv[j].className === "shoeType") {
            let shoeType = document.createElement('h4');
            shoeType.innerText = clickedDiv[j].innerText;
            shoeType.setAttribute("class", "shoeType");
            shoeInfo.appendChild(shoeType);
        }
        shoeInfoDiv.appendChild(shoeInfo);
    }

    //adding quantity
    let selectQuantity = document.getElementById("selectQuantity");
    let label = document.createElement('label');
    label.innerText = "Quantity: ";
    let quantityBox = document.createElement('span');
    selectQuantity.style.display = "inline";
    quantityBox.appendChild(label);
    quantityBox.appendChild(selectQuantity);
    quantityBox.classList.add("selectQuantityShow");
    shoeInfoDiv.appendChild(quantityBox);

    selectQuantity.addEventListener("change", getQuantity);
    let quantityOfItem = selectQuantity.value;
    function getQuantity() {
        quantityOfItem = selectQuantity.value;
    }
    // for shoe sizes
    let sizeLabel = document.createElement('span');
    sizeLabel.innerText = "Size: ";
    let shoeSizes = document.getElementById("shoeSizes");
    let selectedSize = document.createElement("span");
    shoeSizes.addEventListener("change", getSizeValue);
    let shoeSizeValue = shoeSizes.value;
    function getSizeValue() {
        shoeSizeValue = shoeSizes.value;
    }

    selectedSize.innerText = `Size: ${shoeSizeValue}`;
    shoeSizes.style.display = "inline";

    let shoeSizeBox = document.createElement("span");
    shoeSizeBox.classList.add("shoeSizes");
    shoeSizeBox.appendChild(sizeLabel);
    shoeSizeBox.appendChild(shoeSizes);
    shoeInfoDiv.appendChild(shoeSizeBox);


    let buyButton = document.createElement("button");
    buyButton.setAttribute("id", "buyButton");
    buyButton.setAttribute("class", "buyButton");
    buyButton.innerText = "BUY";
    shoeInfoDiv.appendChild(buyButton);

    let addCartButton = document.createElement("button");
    addCartButton.setAttribute("class", "addCartButton");
    addCartButton.innerText = "Add to cart";
    shoeInfoDiv.appendChild(addCartButton);

    //cartButton functionality
    addCartButton.addEventListener("click", addToCart);
    infoCloseIcon.addEventListener("click", infoCloseIconFn);
    function infoCloseIconFn() {
        shoeInfoDiv.style.display = "none";
    }
    //adding to cart
    function addToCart(event) {
        // for selecting quantity
        let selectQuantity = document.getElementById("selectQuantity");
        let shoeSizes = document.getElementById("shoeSizes");

        let cartToBeAdd = event.target.parentNode;
        let emptyQuote = document.getElementById("emptyQuote");
        if (cartContainer.contains(emptyQuote)) {
            emptyQuote.style.display = "none";
        } else {
            emptyQuote.style.display = "inline";
        }


        cartToBeAdd = cartToBeAdd.children;
        let cartDiv = document.createElement('div');
        cartDiv.setAttribute('id', cartToBeAdd);
        cartDiv.classList.add('cartDiv');

        for (let k = 0; k < cartToBeAdd.length; k++) {
            if (cartToBeAdd[k].className === "shoeImage") {
                let shoeImage = document.createElement('img');
                shoeImage.src = cartToBeAdd[k].src;
                cartDiv.appendChild(shoeImage);
            }
            if (cartToBeAdd[k].className === "shoeInfo") {
                cartToBeAdd[k] = cartToBeAdd[k].childNodes;
                let shoeName = document.createElement('h1');
                shoeName.innerText = cartToBeAdd[k].firstChild.innerText;
                cartDiv.appendChild(shoeName);
            }
            if (cartToBeAdd[k].className === "shoeInfo") {
                cartToBeAdd[k] = cartToBeAdd[k].childNodes;
                //for shoe price according to quantity
                let shoePrice = document.createElement('h3');
                let price = cartToBeAdd[k].lastChild.innerText.replace(/\D/g, '');
                price = price * quantityOfItem;
                shoePrice.innerText = `MRP: ${price}`;
                cartDiv.appendChild(shoePrice);
                //for no of shoes in cart
                let quantityOfShoe = document.createElement("span");
                quantityOfShoe.innerText = `Quantity:  ${quantityOfItem}`;
                cartDiv.appendChild(quantityOfShoe);
                selectQuantity.value = "1";
                //for size oof shoe in cart 
                let shoeSize = document.createElement("span");
                shoeSize.innerText = `Size:${shoeSizeValue}`;
                cartDiv.appendChild(shoeSize);
                shoeSizes.value = "7";
            }


        }
        let removeCartedItemIcon = document.createElement('i');
        removeCartedItemIcon.setAttribute("class", "bx bx-trash");
        removeCartedItemIcon.setAttribute("id", "removeCartedItemIcon")
        cartDiv.appendChild(removeCartedItemIcon);
        removeCartedItemIcon.addEventListener("click", function removeCartedItemIconFn(event) {
            event.target.parentNode.remove();
            if (cartContainer.children.length == 2) {
                emptyQuote.style.display = "inline";
            }
        }
        );
        infoCloseIconFn();
        cartContainer.appendChild(cartDiv);

    }

}

//for searching the shoes according to their name
let allItems = document.getElementsByClassName("items");
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener('input', searchInputFn);

function searchInputFn() {
    let searchInputValue = searchInput.value;
    let allItems = document.querySelectorAll('.shoeName');
    allItems.forEach(item => {
        item.parentNode.style.display = "none";
        let allItemsName = item.textContent.toLowerCase();
        if (allItemsName.includes(searchInputValue)) {
            item.parentNode.style.display = "inline";
        }
    })
}


//for sorting running shoes
let runningShoes = document.querySelectorAll('.running');
let runningSection = document.getElementById("runningSection");
runningSection.addEventListener('click', showRunningShoes);
function showRunningShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    runningShoes.forEach(item => {
        item.style.display = "inline";
    })
}
//for basketBall shoes
let basketBallShoes = document.querySelectorAll(".basketBall");
let basketBallSection = document.getElementById("basketBallSection");
basketBallSection.addEventListener("click", showBasketBallShoes);
function showBasketBallShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    basketBallShoes.forEach(item => {
        item.style.display = "inline";
    })
}

//for sorting jordan shoes 
let jordanShoes = document.querySelectorAll('.jordan');
let jordanSection = document.getElementById("jordanSection");
jordanSection.addEventListener('click', showJordanShoes);
function showJordanShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    jordanShoes.forEach(item => {
        item.style.display = "inline";
    })
}

//for skateboarding
let skateBoardingShoes = document.querySelectorAll(".skateBoarding");
let skateBoardingSection = document.getElementById("skateBoardingSection");
skateBoardingSection.addEventListener("click", showSkateBoardingShoes);
function showSkateBoardingShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    skateBoardingShoes.forEach(item => {
        item.style.display = "inline";
    })
}

//for viewing all shoes
let allShoesCart = document.getElementById("allShoes");
allShoesCart.addEventListener("click", showAllShoes);
function showAllShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "inline";
    }
}
// kids section
let allKidsShoes = document.querySelectorAll(".kids");
let kidsSection = document.getElementById("kidsSection");
kidsSection.addEventListener("click", showKidsShoes);
function showKidsShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    allKidsShoes.forEach(item => {
        item.style.display = "inline";
    })
}


// men section
let allMenShoes = document.querySelectorAll(".men");
let menSection = document.getElementById("menSection");
menSection.addEventListener("click", showMenShoes);
function showMenShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    allMenShoes.forEach(item => {
        item.style.display = "inline";
    })
}

// men section
let allWomenShoes = document.querySelectorAll(".women");
let womenSection = document.getElementById("womenSection");
womenSection.addEventListener("click", showWomenShoes);
function showWomenShoes() {
    let allItems = document.getElementsByClassName("items");
    for (let i of allItems) {
        i.style.display = "none";
    }
    allWomenShoes.forEach(item => {
        item.style.display = "inline";
    })
}
