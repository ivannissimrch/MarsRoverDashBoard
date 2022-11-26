//1  object storage for aplication data
let store = Immutable.Map({});

//9 function to update storage
const updateStore = (state, newState) => {
  store = state.merge(newState);
  render(root, store);
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
  if (state.get("data") === undefined) {
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
    const newData = state.toJS();
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
    <h1>Rover Name : ${newData.data[0].name}</h1>
    <h2>Landing Date :${newData.data[0].landingDate}</h2>
    <h2>Launch Date :${newData.data[0].launchDate}</h2>
    <h2>Status :${newData.data[0].status}</h2>   
   </section>   
   <section class = 'results-images'>
   <section class='image-title-section'>
   <h2>Picture Date :${newData.data[0].earthDate}</h2>
   <img src='${newData.data[0].photos}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${newData.data[1].earthDate}</h2>
   <img src='${newData.data[1].photos}' ></img>  
   </section> 
   <section class='image-title-section'>
   <h2>Picture Date :${newData.data[2].earthDate}</h2>
   <img src='${newData.data[2].photos}' ></img>  
   </section>   
   </section>
   </section>`;
  }
};

// 8------------------------------------------------------  API CALLS

//get request to oportunity route
const getOpportunityData = (state) => {
  const data = fetch(`http://localhost:3000/opportunity`)
    .then((res) => res.json())
    .then((rovers) => {
      const roverData = rovers.opportunityData.photos;
      const selectedData = roverData.map((item) => {
        const roverInfo = {};
        {
          (roverInfo["name"] = item.rover.name),
            (roverInfo["landingDate"] = item.rover.landing_date),
            (roverInfo["launchDate"] = item.rover.launch_date),
            (roverInfo["status"] = item.rover.status),
            (roverInfo["earthDate"] = item.earth_date),
            (roverInfo["photos"] = item.img_src);
        }
        return roverInfo;
      });
      const newObject = { data: selectedData };
      updateStore(state, newObject);
    });
};

//get request to curiosity route
const getCuriosityData = (state) => {
  const data = fetch(`http://localhost:3000/curiosity`)
    .then((res) => res.json())
    .then((rovers) => {
      console.log(rovers.curiosityData.photos);
      const roverData = rovers.curiosityData.photos;
      const selectedData = roverData.map((item) => {
        const roverInfo = {};
        {
          (roverInfo["name"] = item.rover.name),
            (roverInfo["landingDate"] = item.rover.landing_date),
            (roverInfo["launchDate"] = item.rover.launch_date),
            (roverInfo["status"] = item.rover.status),
            (roverInfo["earthDate"] = item.earth_date),
            (roverInfo["photos"] = item.img_src);
        }
        return roverInfo;
      });
      const newObject = { data: selectedData };
      updateStore(state, newObject);
    });
};

//get request to spirit route
const getSpiritData = (state) => {
  const data = fetch(`http://localhost:3000/spirit`)
    .then((res) => res.json())
    .then((rovers) => {
      console.log(rovers.spiritData.photos);
      const roverData = rovers.spiritData.photos;
      const selectedData = roverData.map((item) => {
        const roverInfo = {};
        {
          (roverInfo["name"] = item.rover.name),
            (roverInfo["landingDate"] = item.rover.landing_date),
            (roverInfo["launchDate"] = item.rover.launch_date),
            (roverInfo["status"] = item.rover.status),
            (roverInfo["earthDate"] = item.earth_date),
            (roverInfo["photos"] = item.img_src);
        }
        return roverInfo;
      });
      const newObject = { data: selectedData };
      updateStore(state, newObject);
    });
};
