var bookList;
function getProduct(){
    return fetch('./product.json')
    .then(res => res.json())
    .then(json => bookList = json.book);
};

function load(itemCounter) {
    var end = itemCounter + 1;
    return getProduct().then(bookList => {
        for (let counter = itemCounter; counter <= end; counter++) {
            var divNode = document.createElement("div");
            var imgNode = document.createElement("img");
            divNode.className = "box1";
            imgNode.src = bookList[counter].link;
            imgNode.width = "250";
            imgNode.height = "320";
            divNode.appendChild(imgNode);
            divNode.appendChild(document.createElement("br"));
            var pNode = document.createElement("p");
            pNode.innerHTML = "Click to see more";
            pNode.className = "clickElement";
            divNode.appendChild(pNode);
            document.getElementsByClassName("itemSection")[0].appendChild(divNode);         
            arr.push(counter);   
        };
    });
}

function loadAgain(itemCounter, val) {
    if (val == "all") {
        return load(itemCounter);
    }
    else {
        return getProduct().then(bookList => {
            var check = 0;
            var counter = 0;
            while (check < 2 && counter < 16) {
                if (bookList[counter].topic == val) {
                    if (itemCounter > 0) {
                        itemCounter--;
                    } else { 
                        var divNode = document.createElement("div");
                        var imgNode = document.createElement("img");
                        divNode.className = "box1";
                        imgNode.src = bookList[counter].link;
                        imgNode.width = "250";
                        imgNode.height = "320";
                        divNode.appendChild(imgNode);
                        divNode.appendChild(document.createElement("br"));
                        var pNode = document.createElement("p");
                        pNode.innerHTML = "Click to see more";
                        pNode.className = "clickElement";
                        divNode.appendChild(pNode);
                        document.getElementsByClassName("itemSection")[0].appendChild(divNode);
                        check++;
                        arr.push(counter);
                    }
                }
                counter++;
            }
        })
    }
}

function deleteAll() {
    var parentNode = document.getElementsByClassName("itemSection")[0];
    while (document.getElementsByClassName("itemSection")[0].hasChildNodes()) {
        parentNode.removeChild(parentNode.firstChild);
    };
}

function clickAdd(divNode, index) {
    return getProduct().then(bookList => {
        var realIndex = arr[index];
        if (divNode.getElementsByTagName("p").length == 3) {
            divNode.removeChild(divNode.lastChild);
            divNode.removeChild(divNode.lastChild);
        }
        else {
            var pNode = document.createElement("p");
            pNode.innerHTML = bookList[realIndex].name;
            pNode.className = "clickInfo";
            divNode.appendChild(pNode);
            var pNode2 = document.createElement("p");
            pNode2.innerHTML = "$" + bookList[realIndex].price;
            pNode2.className = "clickInfo";
            divNode.appendChild(pNode2);    
        }
    })
}

var val = "all";
var arr = [];
let itemCounter = 0;
document.addEventListener('DOMContentLoaded', load(itemCounter));
itemCounter = itemCounter + 2;

document.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if ((itemCounter <= 16 && val == "all") || (itemCounter <= 4 && val != "all")) {
            setTimeout(loadAgain(itemCounter, val), 4000);
            itemCounter = itemCounter + 2;
        }
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('select').onchange = function() {
        val = document.querySelector("select").value;
        deleteAll();
        arr = [];
        itemCounter = 0;
        loadAgain(itemCounter, val);
        itemCounter = itemCounter + 2;
    }
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('button').forEach(function(button) {
        button.onclick = function() {
            val = document.querySelector("input").value;
            deleteAll();
            arr = [];
            itemCounter = 0;
            loadAgain(itemCounter, val);
            itemCounter = itemCounter + 2;
        }
    })
})

document.addEventListener('click', function(event) {
    var target = event.target;
    if (target.innerHTML == "Click to see more") {
        var box1 = target.parentNode;
        var i = 0;
        for (var k = 0; k < document.getElementsByClassName("box1").length; k++) {
            if (document.getElementsByClassName("box1")[k] === box1) {
                i = k;
            }
        }
        clickAdd(box1, i);
    }
});