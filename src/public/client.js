//  object storage for aplication data
let store = Immutable.Map({ rovers: "noInfo", rover: Immutable.List(["no"]) });

// function to update storage
const updateStore = (state, newState) => {
  store = state.merge(newState);  
  render(root, store);
};

//2 store root div on variable to append html components
const root = document.getElementById("root");

// 3 assing the value of the function App to our root innerHTM
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// 4 listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// 5 create content
const App = (state) => {
  if (state.getIn(["rovers"]) === "noInfo") {
    return `<section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
    ${addButtons()}
    </section>`;
  } else {
    return `
    <section class='main-section'>
    <header> <h1>Mars Rovers</h1>        
    </header>
    ${addButtons()}
    ${selectRover(state, displayRoverInfo)}
    ${selectRover(state, displayRoverImage)}
   </section>`;
  }
};

// 6------------------------------------------------------  API CALLS

//get any Rover data
const getRoverData = (state, id) => {  
  let { rovers } = state;
  const data = fetch(`http://localhost:3000/${id}`)
    .then((res) => res.json())
    .then((rovers) => updateStore(state, { rovers }))
    .catch(function() {
      console.log("error");
  })
};

//Create content functions
const addButtons = () => {
  return ` <div class = 'buttons'>
  <button id='opportunity' onclick = "getRoverData(store,this.id)">Opportunity</button>
  <button id='curiosity' onclick = "getRoverData(store,this.id)">Curiosity</button>
  <button  id='spirit' onclick = "getRoverData(store,this.id)">Spirit</button>
  </div> `;
};

const selectRover = (state, displayInfo) => {
  let roverDataArray = [];  
  if (state.getIn(["rovers", "curiosityData", "latest_photos"])) {
    roverDataArray = state.getIn(["rovers", "curiosityData", "latest_photos"]);
  } else if (state.getIn(["rovers", "opportunityData", "latest_photos"])) {
    roverDataArray = state.getIn(["rovers", "opportunityData", "latest_photos"]);
  } else if (state.getIn(["rovers", "spiritData", "latest_photos"])) {
    roverDataArray = state.getIn(["rovers", "spiritData", "latest_photos"]);
  }

  const selectedData = roverDataArray.map((item) => {
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

  return displayInfo(selectedData);
};

const displayRoverInfo = (rover) => {
  return `<section class= 'results'> 
  <h1>Rover Name : ${rover[0].name}</h1>
  <h2>Landing Date :${rover[0].landingDate}</h2>
  <h2>Launch Date :${rover[0].launchDate}</h2>
  <h2>Status :${rover[0].status}</h2>   
 </section> `;
};

const displayRoverImage = (rover) => {  
  return `<section class = 'results-images'>
 <section class='image-title-section'>
 <h2>Latest Pictures Date :${rover[0].earthDate}</h2>
 ${rover.map(item => `<img src='${item.photos}' ></img>`)} 
 </section> 
 </section>`;
};


