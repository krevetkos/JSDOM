const firstTask = {};
firstTask.el = {};
firstTask.el.price = document.querySelectorAll(".first .price");
firstTask.el.amount = document.querySelectorAll(".first .amount");
firstTask.el.total = document.querySelector(".total");
firstTask.method = {};
firstTask.method.kayFilter = function(event){
    if (event.keyCode == 8) {
        return;
    } else if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
    }
}
firstTask.method.sumTotal = function(total,price,amount){
    let first = (+(+(price[0].value)* +(amount[0].value)));
    let secont = (+(+(price[1].value)* +(amount[1].value)));
    let third = (+(+(price[2].value)* +(amount[2].value)));
    total.innerText =  first + secont + third;
}
firstTask.el.price.forEach(function(element){
    element.addEventListener('keydown',function(){
        firstTask.method.kayFilter(event); 
    })
    element.addEventListener('input', function(){
        firstTask.method.sumTotal(firstTask.el.total,firstTask.el.price,firstTask.el.amount);
    })   
});
firstTask.el.amount.forEach(function(element){
    element.addEventListener('keydown',function(){
        firstTask.method.kayFilter(event); 
    })     
    element.addEventListener('input', function(){
        firstTask.method.sumTotal(firstTask.el.total,firstTask.el.price,firstTask.el.amount);
    }) 
 });

const secondTask = {};
secondTask.el = {};
secondTask.el.product = document.querySelector(".second .product");
secondTask.el.price = document.querySelector(".second .price");
secondTask.el.amount = document.querySelector(".second .amount");
secondTask.el.addBtn = document.querySelector(".second .add-btn");
secondTask.el.itemContainer = document.querySelector(".second .item-container");
secondTask.el.total  = document.querySelector(".total-second")

secondTask.method = {};
secondTask.method.kayFilter = function(event){
    if (event.keyCode == 8) {
        return;
    } else if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
        event.preventDefault();
    }
}
secondTask.method.addItem = function(product,price,amount,container){
    if(container.children.length < 10){
        container.innerHTML += `
        <tr>
        <th ><p class="product-name">${product.value}</p></th>
        <td ><input type="text" class="price-holder" value="${price.value}"></td>
        <td ><input type="text" class="amount-holder" value="${amount.value}"></td>
        <td ><button class="delete-btn">Delete</button></td>
        </tr>
        `
        product.value = "";
        price.value = "";
        amount.value = "";
    }else{
        return
    }
}
secondTask.method.makeTotal = function(total,container){
    let price = container.querySelectorAll(".item-container .price-holder");
    let amount = container.querySelectorAll(".item-container .amount-holder");
    let totalSum = 0;
    for(let i = 0; i < container.children.length; i++){
        totalSum += parseInt(price[i].value) * parseInt(amount[i].value);
    }
    total.innerText = totalSum;
}
secondTask.method.onInputTotal = function(container){
    let price = container.querySelectorAll(".item-container .price-holder");
    let amount = container.querySelectorAll(".item-container .amount-holder");
    price.forEach(function(element){
        element.addEventListener('keydown',function(){
            secondTask.method.kayFilter(event); 
        })
        element.addEventListener('input',function(){
            secondTask.method.makeTotal(secondTask.el.total,secondTask.el.itemContainer);
        })
    })
    amount.forEach(function(element){
        element.addEventListener('keydown',function(){
            secondTask.method.kayFilter(event); 
        })
        element.addEventListener('input',function(){
            secondTask.method.makeTotal(secondTask.el.total,secondTask.el.itemContainer);
        })
    })
}
secondTask.el.itemContainer.addEventListener("click",function(event){
    let target = event.target;
    if(target.tagName == "BUTTON"){
        secondTask.el.itemContainer.removeChild(target.parentNode.parentNode);
    }
    secondTask.method.makeTotal(secondTask.el.total,secondTask.el.itemContainer);
})
secondTask.el.addBtn.addEventListener('click', function(){
    secondTask.method.addItem(secondTask.el.product,secondTask.el.price,secondTask.el.amount,secondTask.el.itemContainer); 
    secondTask.method.makeTotal(secondTask.el.total,secondTask.el.itemContainer);
    secondTask.method.onInputTotal(secondTask.el.itemContainer);
})
