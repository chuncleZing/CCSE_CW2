/*
  JavaScript is out of scope for this assignment.
  You should not modify anything inside this file.
*/

const cars = [
  {
    id: 1,
    name: "Reliant Robin",
    manufacturer: "god",
    condition: "pretty bad",
    year: 1912,
    price: 1200.00,
    description: "goofy ahh car",
    image: "Car Images/car2.jpg",
    price: 2.49,
  },

];

// DOM generation code below

function createElementFromString(htmlString) {   // Return element from HTML string
  let temp = document.createElement("div");
  temp.innerHTML = htmlString;

  return temp.firstElementChild;
}

function generatecarDOM(carIndex) {   // Generate DOM content for a car
  const parent = document.querySelector("#cars-list");
  const car = cars[carIndex];

  const template = `<div class="car">
    <img class="car-image" src="${car.image}" alt="${car.name}" />
    <div class="car-content">
      <h4 style="margin: 0">${car.name}</h4>
      <p>
      ${car.description}
      </p>
    </div>
    <div class="car-buttons">
      <a href="/car.html?id=${car.id}">View car</a><br />
      <label>Days to rent:</label><br />
      <input id="days-to-rent-${car.id}" value="3" /><br /> <br>
      <button style="width: 100px; height: 50px" onclick="addToBasket(${car.id})">Add to Basket</button>
    </div>
  </div>`

  const elmnt = createElementFromString(template);
  parent.insertBefore(elmnt, null);
}

function generateAll() {    // Generate all cars
  for (let i = 0; i < cars.length; i++) {
    generatecarDOM(i);
  }
}


// test 