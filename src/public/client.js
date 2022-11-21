//1  object storage for aplication data
//I think I should use inmmutable js in here but my code keep breaking when I aply inmmutable here and in my 
//update store function.
let store = {
  user: { name: "Student" },
  apod: "",
  rovers: [],
};
//2 store root div on variable to append html components
const root = document.getElementById("root");

// 3 listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// 4 assing the value of the function App to our root innerHTM
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// 5 create content
const App = (state) => {
  let { rovers, apod } = state;
  console.log(rovers);
  if (rovers.length === 0) {
    return `<section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
     <div class = 'buttons'>
     <button  onclick = "getOpportunityData(store)">Opportunity</button>
     <button onclick = "getCuriosityData(store)">Curiosity</button>
     <button onclick = "getSpiritData(store)">Spirit</button>
     </div>           
    </section>`;
  } else {
    if (rovers.opportunityData) {
      return `
    <section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
     <div class = 'buttons'>
     <button  onclick = "getOpportunityData(store)">Opportunity</button>
     <button onclick = "getCuriosityData(store)">Curiosity</button>
     <button onclick = "getSpiritData(store)">Spirit</button>
     </div>           
    <section class= 'results'>    
    <h1>Rover Name : ${rovers.opportunityData.photos[0].rover.name}</h1>
    <h2>Landing Date :${rovers.opportunityData.photos[0].rover.landing_date}</h2>
    <h2>Launch Date :${rovers.opportunityData.photos[0].rover.launch_date}</h2>
    <h2>Status :${rovers.opportunityData.photos[0].rover.status}</h2>   
   </section>
   
   <section class = 'results-images'>
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.opportunityData.photos[0].earth_date}</h2>
   <img src='${rovers.opportunityData.photos[0].img_src}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.opportunityData.photos[1].earth_date}</h2>
   <img src='${rovers.opportunityData.photos[1].img_src}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.opportunityData.photos[2].earth_date}</h2>
   <img src='${rovers.opportunityData.photos[2].img_src}' ></img>  
   </section> 
   
   </section>
   </section>`;
    } else if (rovers.curiosityData) {
      return `
   <section class='main-section'>
   <header> <h1>Mars Rovers</h1>        
   </header>
    <div class = 'buttons'>
    <button  onclick = "getOpportunityData(store)">Opportunity</button>
    <button onclick = "getCuriosityData(store)">Curiosity</button>
    <button onclick = "getSpiritData(store)">Spirit</button>
    </div>           
   <section class= 'results'>    
   <h1>Rover Name : ${rovers.curiosityData.photos[0].rover.name}</h1>
   <h2>Landing Date :${rovers.curiosityData.photos[0].rover.landing_date}</h2>
   <h2>Launch Date :${rovers.curiosityData.photos[0].rover.launch_date}</h2>
   <h2>Status :${rovers.curiosityData.photos[0].rover.status}</h2>   
  </section>
  
  <section class = 'results-images'>
  <section class='image-title-section'>
  <h2>Picture Date :${rovers.curiosityData.photos[0].earth_date}</h2>
  <img src='${rovers.curiosityData.photos[0].img_src}' ></img>  
  </section> 
  <section class='image-title-section'>
  <h2>Picture Date :${rovers.curiosityData.photos[1].earth_date}</h2>
  <img src='${rovers.curiosityData.photos[1].img_src}' ></img>  
  </section> 
  <section class='image-title-section'>
  <h2>Picture Date :${rovers.curiosityData.photos[2].earth_date}</h2>
  <img src='${rovers.curiosityData.photos[2].img_src}' ></img> 
  
  </section> 
  
  </section>
  </section>`;
    } else if (rovers.spiritData) {
      return `
    <section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
     <div class = 'buttons'>
     <button  onclick = "getOpportunityData(store)">Opportunity</button>
     <button onclick = "getCuriosityData(store)">Curiosity</button>
     <button onclick = "getSpiritData(store)">Spirit</button>
     </div>           
    <section class= 'results'>    
    <h1>Rover Name : ${rovers.spiritData.photos[0].rover.name}</h1>
    <h2>Landing Date :${rovers.spiritData.photos[0].rover.landing_date}</h2>
    <h2>Launch Date :${rovers.spiritData.photos[0].rover.launch_date}</h2>
    <h2>Status :${rovers.spiritData.photos[0].rover.status}</h2>   
   </section>
   
   <section class = 'results-images'>
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.spiritData.photos[0].earth_date}</h2>
   <img src='${rovers.spiritData.photos[0].img_src}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.spiritData.photos[1].earth_date}</h2>
   <img src='${rovers.spiritData.photos[1].img_src}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${rovers.spiritData.photos[2].earth_date}</h2>
   <img src='${rovers.spiritData.photos[2].img_src}' ></img>  
   </section> 
   
   </section>
   </section>`;
    }
  }
};

//9 function to update storage
const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  console.log(store);
  render(root, store);
};

// 8------------------------------------------------------  API CALLS

//get request to oportunity route
const getOpportunityData = (state) => {
  let { rovers } = state;
  fetch(`http://localhost:3000/opportunity`)
    .then((res) => res.json())
    .then((rovers) => updateStore(store, { rovers }));
};

//get request to curiosity route
const getCuriosityData = (state) => {
  let { rovers } = state;
  console.log(rovers);
  const data = fetch(`http://localhost:3000/curiosity`)
    .then((res) => res.json())
    .then((rovers) => updateStore(store, { rovers }));
};

//get request to spirit route
const getSpiritData = (state) => {
  let { rovers } = state;
  console.log(rovers);
  const data = fetch(`http://localhost:3000/spirit`)
    .then((res) => res.json())
    .then((rovers) => updateStore(store, { rovers }));
};
