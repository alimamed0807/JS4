let myimage = document.querySelector("#myimg");

let l = document.querySelector("#left");
let r = document.querySelector("#right");
let images = document.querySelector("#images");

let index = 1;
let min = 1;
let max = 9;

let showAll = false;

function createImages() {
    images.innerHTML = "";

    let count = showAll ? max : 4;

    for (let i = 1; i <= count; i++) {
        images.innerHTML += `
            <img src="${i}.jpg" draggable="false" onclick="change(${i})">
        `;
    }

    if (!showAll && max > 4) {
        images.innerHTML += `
            <div class="more" onclick="showMore()">
                +${max - 4}
            </div>
        `;
    }
}

function showMore() {
    showAll = true;
    createImages();
}

function left() {
    if (index > min) {
        index--;
    }

    update();
}

function right() {
    if (index < max) {
        index++;
    }

    update();
}

function change(number) {
    index = number;
    update();
}

function update() {
    myimage.src = `${index}.jpg`;

    l.style.display = index == min ? "none" : "inline-block";
    r.style.display = index == max ? "none" : "inline-block";
}

var clear;

function Slide() {
    clear = setInterval(() => {
        if (index == max) {
            index = min;
        } else {
            index++;
        }

        update();
    }, 1000);
}

function MouseMove() {
    clearInterval(clear);
}

function MouseOut() {
    clearInterval(clear);
    Slide();
}

createImages();
update();
Slide();

let isDown = false;
let startX;
let scrollLeft;

images.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    isDown = true;
    startX = e.pageX;
    scrollLeft = images.scrollLeft;
});

document.addEventListener("mouseup", (e) => {
    if (!isDown) return;

    let difference = e.pageX - startX;

    if (Math.abs(difference) > 50) {
        images.scrollLeft = scrollLeft - difference;
    }

    isDown = false;
});

images.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    let walk = (e.pageX - startX) * 2;
    images.scrollLeft = scrollLeft - walk;
});

let main = document.querySelector(".main");

let mainDown = false;
let mainStartX = 0;

myimage.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;

    mainDown = true;
    mainStartX = e.pageX;
});

document.addEventListener("mouseup", (e) => {
    if (!mainDown) return;

    let difference = e.pageX - mainStartX;

    if (difference < -50) {
        right();
    }

    if (difference > 50) {
        left();
    }

    mainDown = false;
});
myimage.addEventListener("dragstart", (e) => {
    e.preventDefault();
});