'use strict';
var productNamesArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

var numOfImages = prompt('Please input the number of images you want to see per round. Max number of images is '+Math.ceil(productNamesArr.length/2));
var maxNumberOfClicks = Number(prompt('Please input the number of rounds'));
var randomNumberArray = [];
var tempRandomNumberArray = [];
var imgSection = document.querySelector('#imgSection');
var divE = document.getElementById('imgDiv');

var totalClicks = 0;
Product.all = [];
Product.labelsArr = [];
Product.clicksArr = [];
Product.viewsArr = [];


function Product(name) {
  this.productName = name.slice(0, name.length - 4);
  this.imagePath = `images/${name}`;
  this.views = 0;
  this.clicks = 0;
  Product.all.push(this);
  Product.labelsArr.push(this.productName);
}
function updateData() {
  for (let index = 0; index < Product.all.length; index++) {
    Product.clicksArr.push(Product.all[index].clicks);
    Product.viewsArr.push(Product.all[index].views);
  }
};


for (var i = 0; i < productNamesArr.length; i++) {
  new Product(productNamesArr[i]);
}
generateImgTags();
render();
function generateImgTags() {
  for (let index = 0; index < numOfImages; index++) {
    let imgE = document.createElement('img');
    imgE.setAttribute('id', `img${index}`);
    imgE.setAttribute('class', 'productsImg');
    imgE.setAttribute('alt', '');
    imgE.setAttribute('title', '');

    divE.appendChild(imgE);

  }
}
function render() {
  tempRandomNumberArray = randomNumberArray;
  randomNumberArray = randomNumber(0, productNamesArr.length - 1, numOfImages);
  for (let index = 0; index < randomNumberArray.length; index++) {
    let imgE = document.getElementById(`img${index}`);
    imgE.src = Product.all[randomNumberArray[index]].imagePath;
    imgE.alt = Product.all[randomNumberArray[index]].productName;
    imgE.title = Product.all[randomNumberArray[index]].productName;
    Product.all[randomNumberArray[index]].views++;
  }
  document.getElementById('roundH3').textContent = `Round ${(totalClicks + 1)}`;

}


imgSection.addEventListener('click', clickHandler);
function clickHandler(event) {

  clicksCounter(event.target.id.substr(3));

  totalClicks++;

  if (totalClicks === maxNumberOfClicks) {
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
    imgE.src = Product.all[index].imagePath;
    imgE.alt = Product.all[index].productName;
    imgE.title = Product.all[index].productName;
    let pE = document.createElement('p');
    liE.appendChild(pE);

    pE.textContent = `${Product.all[index].productName} had ${Product.all[index].clicks} votes and was shown ${Product.all[index].views} times`;
  }
  updateData();
  // <div id="myChartDiv">
  //   <canvas id="myChart" width="360" height="150"></canvas>
  // </div>
  let canvasDivE = document.createElement('div');
  canvasDivE.setAttribute('id','myChartDiv');
  imgSection.appendChild(canvasDivE);
  let canvasE = document.createElement('canvas');
  canvasDivE.appendChild(canvasE);
  canvasE.setAttribute('id','myChart');





  let imgE = document.createElement('img');


  renderCanvas();


}
function clicksCounter(index) {
  Product.all[randomNumberArray[index]].clicks++;

}

function randomNumber(min, max, numOfImages) {
  var randomNumberArr = [];

  var unique = 0;
  for (var index = 0; index < numOfImages; index++) {

    var unicityKey = false;
    var temp;


    // eslint-disable-next-line no-constant-condition
    while (true) {
      temp = Math.floor(Math.random() * (max - min + 1)) + min;
      for (var i = 0; i < index + 1; i++) {
        if (randomNumberArr[i] === temp || tempRandomNumberArray[i] === temp) {
          unicityKey = false;
          break;
        }
        else {
          unicityKey = true;
        }
      }
      if (unicityKey === true) {
        unique = temp;
        break;
      }
    }

    randomNumberArr.push(unique);
  }
  console.log(randomNumberArr);
  return randomNumberArr;
}
function renderCanvas() {
  var ctx = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.labelsArr,
      datasets: [{
        label: 'Number of Clicks',
        data: Product.clicksArr,
        backgroundColor: '#f73859',
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: 'Number of Views',
        data: Product.viewsArr,
        backgroundColor: '#384259',
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}