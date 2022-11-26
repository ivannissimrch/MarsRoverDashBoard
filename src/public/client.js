//1  object storage for aplication data
let store = Immutable.Map({data: 'noInfo'});

//7 function to update storage
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
  if (state.get("data") === 'noInfo') {
    return `<section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
    ${addButtons()}
    </section>`;
  } else {
    const newData = state.toJS();    
    return `
    <section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
    ${addButtons()}
    ${addRoverInfo(newData)}
   </section>`;
  }
};

// 6------------------------------------------------------  API CALLS

//get request to oportunity route
const getOpportunityData = (state) => {
  const data = fetch(`http://localhost:3000/opportunity`)
    .then((res) => res.json())
    .then((rovers) => {
      //store array of objects recived from API on roverData. make a copy using map and create and object, return that object to variable
      // selectedData and use it to set the values on  the key data inside  newObject,
      // pass newObject to updateStore function.
      //Doing this will prevent each updateStore call to add diferent key values to store object, that way I can eliminate the need of if staments
      //to select wicth rover data to display on App()  
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
     //store array of objects recived from API on roverData. make a copy using map and create and object, return that object to variable
      // selectedData and use it to set the values on  the key data inside  newObject,
      // pass newObject to updateStore function.
      //Doing this will prevent each updateStore call to add diferent key values to store object, that way I can eliminate the need of if staments
      //to select wicth rover data to display on App() 
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
      //store array of objects recived from API on roverData. make a copy using map and create and object, return that object to variable
      // selectedData and use it to set the values on  the key data inside  newObject,
      // pass newObject to updateStore function.
      //Doing this will prevent each updateStore call to add diferent key values to store object, that way I can eliminate the need of if staments
      //to select wicth rover data to display on App() 
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


//Create content functions
function addButtons(){
  return` <div class = 'buttons'>
  <button  onclick = "getOpportunityData(store)">Opportunity</button>
  <button onclick = "getCuriosityData(store)">Curiosity</button>
  <button onclick = "getSpiritData(store)">Spirit</button>
  </div>           `
}

function addRoverInfo(rover){
  return `<section class= 'results'> 

  <h1>Rover Name : ${rover.data[0].name}</h1>
  <h2>Landing Date :${rover.data[0].landingDate}</h2>
  <h2>Launch Date :${rover.data[0].launchDate}</h2>
  <h2>Status :${rover.data[0].status}</h2>   
 </section>   

 <section class = 'results-images'>
 <section class='image-title-section'>
 <h2>Picture Date :${rover.data[0].earthDate}</h2>
 <img src='${rover.data[0].photos}' ></img>  
 </section> 

 <section class='image-title-section'>
 <h2>Picture Date :${rover.data[1].earthDate}</h2>
 <img src='${rover.data[1].photos}' ></img>  
 </section> 

 <section class='image-title-section'>
 <h2>Picture Date :${rover.data[2].earthDate}</h2>
 <img src='${rover.data[2].photos}' ></img>  
 </section> 

 </section>`

}
