// 'use strict';
var numOfImages = 3;
var maxNumberOfClicks = 25;
var randomNumberArray = [];
var imgE;
var imgSection = document.querySelector('#imgSection');
var divE = document.getElementById('imgDiv');

var productNamesArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg'];
var totalClicks = 0;
Products.all = [];


function Products(name) {
    this.productName = name.slice(0, name.length - 4);
    this.imagePath = `images/${name}`;
    this.views = 0;
    this.clicks = 0;
    Products.all.push(this);
}


for (var i = 0; i < productNamesArr.length; i++) {
    new Products(productNamesArr[i]);
}
generateImgTags();
render();
function generateImgTags() {
    for (let index = 0; index < numOfImages; index++) {
        let imgE = document.createElement('img');
        imgE.setAttribute('id' ,`img${index}`);
        imgE.setAttribute('class','productsImg');
        imgE.setAttribute('alt','');
        imgE.setAttribute('title','');

        divE.appendChild(imgE);

            }
        }
        function render() {
            randomNumberArray = randomNumber(0, productNamesArr.length - 1, numOfImages);
            for (let index = 0; index < randomNumberArray.length; index++) {
                let imgE = document.getElementById(`img${index}`);
                imgE.src = Products.all[randomNumberArray[index]].imagePath;
                imgE.alt = Products.all[randomNumberArray[index]].productName;
                imgE.title = Products.all[randomNumberArray[index]].productName;
                Products.all[randomNumberArray[index]].views++;
            }
            document.getElementById('roundH3').textContent = `Round ${(totalClicks + 1)}`;

        }


        imgSection.addEventListener('click', clickHandler);
        function clickHandler(event) {

            clicksCounter(event.target.id.substr(3));

            totalClicks++;

            if (totalClicks == maxNumberOfClicks) {
                imgSection.removeEventListener('click', clickHandler);
                while (divE.hasChildNodes()) {
                    divE.removeChild(divE.firstChild);
                }

                renderResults();
            } else {
                render();
            }
        }
        function renderResults() {
            let classAttr = document.createAttribute('class');
            classAttr.value = 'imgResult';
            let h3E = document.createElement('h3');
            divE.appendChild(h3E);
            h3E.textContent = 'RESULTS';

            for (let index = 0; index < productNamesArr.length; index++) {
                let liE = document.createElement('li');
                divE.appendChild(liE);
                let imgE = document.createElement('img');
                liE.appendChild(imgE);
                let classAttr = document.createAttribute('class');
                classAttr.value = 'imgResult';
                imgE.setAttributeNode(classAttr);
                imgE.src = Products.all[index].imagePath;
                imgE.alt = Products.all[index].productName;
                imgE.title = Products.all[index].productName;
                let pE = document.createElement('p');
                liE.appendChild(pE);

                pE.textContent = `${Products.all[index].productName} had ${Products.all[index].clicks} votes and was shown ${Products.all[index].views} times`;
            }

        }
        function clicksCounter(index) {
            console.log(index);
            Products.all[randomNumberArray[index]].clicks++;

        }

        function randomNumber(min, max, numOfImages) {
            var randomNumberArr = [];

            var unique = 0;
            for (var index = 0; index < numOfImages; index++) {

                var unicityKey = false;
                var temp;


                while (true) {
                    temp = Math.floor(Math.random() * (max - min + 1)) + min;
                    for (var i = 0; i < index + 1; i++) {
                        if (randomNumberArr[i] == temp) {
                            unicityKey = false;
                            break;
                        }
                        else {
                            unicityKey = true;
                        }
                    }
                    if (unicityKey == true) {
                        unique = temp;
                        break;
                    }
                }

                randomNumberArr.push(unique);
            }
            return randomNumberArr;
        }
