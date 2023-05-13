/*
  Javascript for browsing available cars
  This is probably the largest section, and the default homepage
*/
// Below is an array I used to store the details of all available cars
// In the future (for an expansion) I would keep these details stored in an online database, to make them easier to modify when needed
const cars = [
    {
      id: 1,
      model: "Robin",
      manufacturer: "Reliant",
      condition: "pretty bad, think it has toppled over a few times :(",
      year: 1975,
      price: 1200.00,
      description: "one goofy ah car",
      image: "car2.jpg",
      
    },
    {
      id: 2,
      model: "Aztek",
      manufacturer: "Pontiac",
      condition: "Seen better days",
      year: 2004,
      price: 50.00,
      description: "Jesse!",
      image: "walter white car.jpg",
      
    },
    {
      id: 3,
      model: "Acoustic Car",
      manufacturer: "unknown",
      condition: "Still has both wheels - though brakewires have been cut",
      year: 1996,
      price: 250.00,
      description: "Beats walking",
      image: "acoustic car.jpg",
      
    },
    {
      id: 4,
      model: "Submersible Car",
      manufacturer: "Unclear",
      condition: "Still a bit wet",
      year: 2006,
      price: 250000.00,
      description: "Collection only from the bottom of a lake",
      image: "submersible car 1.jpg",
      
    },
    {
      id: 5,
      model: "Hot Wheels",
      manufacturer: "Tesla",
      condition: "n/a",
      year: 2018,
      price: 1200.00,
      description: "It's a fixer upper",
      image: "fixer upper car.jpg",
      
    },
    {
      id: 6,
      model: "Family Guy Car Family Guy Car",
      manufacturer: "GOD",
      condition: "PERFECT",
      year: "unknown",
      price: 99999999.99,
      description: "No description needed, gonna sell fast so be quick",
      image: "car4.jpg",
      
    },
   
   
  ];
  // This is an array to store the details of the dealerships for the cars
  // Would also move this to a database in the future
  const dealerships = [
    {
      name: "Jerry's Motors",
      latitude: 51.89859,
      longitude: -2.11985,
      postcode: "GL51 0EX",
      hours: "9am - 5pm",

    },
    {
      name: "Crackin' Cars",
      latitude: 52.37813,
      longitude: -1.55756,
      postcode: "CV4 7ES",
      hours: "9am - 6pm",

    },
    {
      name: "Discount Dealers",
      latitude: 52.41313,
      longitude: -1.50274,
      postcode: "CV1 5LY",
      hours: "11am - 4pm",

    },
    {
      name: "Transcendental Transport",
      latitude: 51.18434,
      longitude: -1.85740,
      postcode: "SP4 7DE",
      hours: "9am - 5pm",

    },
  
  ];

  const carImages = document.querySelectorAll("#cars-list .car-image");
  const navArrows = document.querySelectorAll("#cars-list .car-arrow");

  var currIndex = 0;
  var carCount = cars.length;

  function changeImgs(ignore) {   // Change images of all except the index specified by ignore (-1 for none)
    let ub = 2;
    let lb = -1;

    // not working 100% rn, displays blank image on 1st and last cars (left and right respectively)
    // this code here for navigating cars was taken from HBCS CW2 Assignment

    if (ignore === 2) {
        navArrows[1].style.visibility = "hidden";   // Hide right nav arrow
        ub = 1;
    }
    else if (ignore === 0) {
        navArrows[0].style.visibility = "hidden";   // Hide left nav arrow
        lb = 0
    }
    else {
        navArrows[1].style.visibility = "visible";  // Unhide arrows
        navArrows[0].style.visibility = "visible";
    }

    for (let i = lb; i < ub; i++) {
        carImages[i + 1].src = cars[currIndex + i].image;
    }
  }
  
  const carDetails = document.querySelector("#car-details");
  const carTitle = carDetails.children[0];
  const expandBtn = carDetails.children[1];
  const carDesc = carDetails.children[3];
  
  


  function createElementFromString(htmlString) {   // Return element from HTML string
    let temp = document.createElement("div");
    temp.innerHTML = htmlString;
  
    return temp.firstElementChild;
  }

  async function makeDescription() {     // Update description below image
    let height =  window.scrollY ;  // Calculate the height to scroll

    carDetails.style.top = `${height}px`;   // Hide
    // await sleepMS(400);

    carTitle.innerHTML = cars[currIndex].model;
    // carDesc.innerHTML = cars[currIndex].description; // this was making the finance button go all funny

    

    document.getElementById("car-model").innerHTML = `<strong>Model: </strong>${cars[currIndex].model}`;
    document.getElementById("car-manufacturer").innerHTML = `<strong>Manufacturer: </strong>${cars[currIndex].manufacturer}`;
    document.getElementById("car-condition").innerHTML = `<strong>Condition: </strong>${cars[currIndex].condition}`;
    document.getElementById("car-year").innerHTML = `<strong>Year: </strong>${cars[currIndex].year}`;
    document.getElementById("car-price").innerHTML = `<strong>Price: </strong>${cars[currIndex].price}`;
    document.getElementById("car-description").innerHTML = `<strong>Description: </strong>${cars[currIndex].description}`;



    if (cars[currIndex].price.toString().split('.')[1].length < 2) {  // Add trailing zero if required
      document.getElementById("car-price").innerHTML = `<strong>Price: </strong>£${cars[currIndex].price}0`;
    }
    else {
      document.getElementById("car-price").innerHTML = `<strong>Price: </strong>£${cars[currIndex].price}`;
    }

    carDetails.style.top = "0px"; // Unhide
  }

  var descExpanded = false;

  function showDescription() {    // Scroll carDetails to reveal full contents
    if (!descExpanded) {
        let clientRect = carDetails.getBoundingClientRect();
        let height = clientRect.bottom - clientRect.top - 120;

        expandBtn.style.transform = "rotate(90deg)";   // Replace with minus symbol

        window.scroll({
            top: height,
            left: 0,
            behavior: "smooth"
        });

        descExpanded = true;
    }
    else {
        expandBtn.style.transform = "rotate(-90deg)";   // Replace with plus symbol

        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
        
        descExpanded = false;
    }
  }

  async function switchcars(dir) {    // Switch cars to the right (dir = 1) or left (dir = -1)
    carImages[1].parentNode.style.transition = "box-shadow 250ms ease-out";    // Make transition faster
    carImages[1].parentNode.style.boxShadow = "0px 0px 66px 0px rgba(255, 255, 255, 0.15)";   // Dim glow

    if (currIndex + dir < 1) {
        currIndex = 0;
        carImages[0].src = "";

        changeImgs(0);
    }
    else if (currIndex + dir > carCount - 2) {
        currIndex = carCount - 1;
        carImages[2].src = "";

        changeImgs(2);
    }
    else {
        currIndex = currIndex + dir;   // Update currIndex

        changeImgs(-1);
    }

    makeDescription();
    
    await sleepMS(250);  // Wait for transition

    carImages[1].parentNode.style.transition = "box-shadow 1s ease-out";   // Reset transition
    carImages[1].parentNode.style.boxShadow = "0px 0px 66px 27px rgba(255, 255, 255, 0.15)";  // Glow again
  }
 
  async function getLatLongFromPostcode(postcodeInput) {
    // This function is supposed to take input from a postcode, and then use an API to convert that into latitude and longitude
    // This latitiude and longitude would then be used to calculate the nearest dealer
    const apiKey = "5972ab36ef9c48e2adb425facd06b079"; //my API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(postcodeInput)}&key=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    console.log("data:", data);
    // this function is not currently working, I think it is a problem with connecting to the API
    // As this is not working, I created an alternative which uses the users current location instead
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      console.log("result:", result);
      return {
        lat: result.geometry.lat,
        lng: result.geometry.lng
      };
    } else {
      throw new Error("Unable to find coordinates for postcode");
    }
  }
  function getDistance(lat1, lon1, lat2, lon2) {
    // Using Haversine formula to calculate the shortest distance to a dealer
    // https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  
  function getCurrentLocation() {
    // this function gets the lat + long of the users current location (or IP location)
    // this will be used to find the location of the closest dealership
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const usrlat = position.coords.latitude;
        const usrlng = position.coords.longitude;
  
        document.querySelector("#latitude").value = usrlat;
        document.querySelector("#longitude").value = usrlng;
        
        dealerships.forEach(function(dealership) {
          // calculating the distance between the user and each dealership to find the closest one
          const dealershipLat = dealership.latitude;
          const dealershipLng = dealership.longitude;
          const distance = getDistance(usrlat, usrlng, dealershipLat, dealershipLng);              
          dealership.distance = distance; // Add distance to dealership object
          
        });
      
        // Sort dealerships by distance from user's location
        dealerships.sort(function(a, b) {
          return a.distance - b.distance;
        });
        // Display the closest dealership
        const closestDealership = dealerships[0];
        console.log(`Closest dealership: ${closestDealership.name}, Distance: ${closestDealership.distance} metres`);
      
        document.querySelector("#closest-dealership").value = closestDealership.name;
        document.querySelector("#closest-dealership-postcode").value = closestDealership.postcode;
        document.querySelector("#closest-dealership-hours").value = closestDealership.hours;
        
      }, (error) => {
        console.error(`Error getting current location: ${error.message}`);
        alert("Error getting current location. Please enter a postcode.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  


  

  function handleKeypress(key) {
    switch(key) {
        case "ArrowLeft":    // Left
            switchcars(-1);
            break;
        case "ArrowRight":    // Right
            switchcars(1);
            break;
        case "Enter":
            showDescription();  // Expand description when pressing enter
            break;
        default:
            return;
    }
  }

  document.onkeydown = e => {   // Dispatch keydown to handleKeypress
    handleKeypress(e.key);
  }
  
  document.onscroll = e => {
    if (window.scrollY > 32 && !descExpanded) {   // Check if user has scrolled down
        descExpanded = true;
        expandBtn.style.transform = "rotate(90deg)";   // Replace with minus symbol
    }
    else if (window.scrollY < 32) {     // User scrolled back up
        descExpanded = false;
        expandBtn.style.transform = "rotate(-90deg)";   // Replace with plus symbol
    }
  }
