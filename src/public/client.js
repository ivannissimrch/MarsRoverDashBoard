function test(){
  alert('tseting buuton click event');
}

//1  object storage for aplication data
let store = {
  user: { name: "Student" },
  apod: "",
  rovers: ['opportunity', 'curiosity', 'spirit']
};
//2 store root div on variable to append html components
const root = document.getElementById("root");


//9 function to update storage
const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  console.log(store.rovers.spiritData.photos[0].rover)
  render(root, store);
};

// 4 assing the value of the function App to our root innerHTM
const render = async (root, state) => {
  root.innerHTML = App(state);
};

// 5 create content
const App = (state) => {
  let { rovers, apod } = state;

  return `        
        <section class='main-section'>
        <header> <h1>Mars Rovers</h1>        
        </header>
         <div class = 'buttons'>
         <button  onclick = "test()">Opportunity</button>
         <button>Curiosity</button>
         <button id='spiritButton'>Spirit</button>
         </div>           
        </section>
        <section class = 'rover1'>
      
        </section>
    `;
};

// 3 listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  
  getSpiritData(store)
  render(root, store); 
  // const spiritButton = document.getElementById('spiritButton');
  // spiritButton.addEventListener('click', function(){
  //   console.log('clicked');
  // });
 
});


//6 & 7 ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//   if (name) {
//     return `
//             <h1>Welcome, ${name}!</h1>
//         `;
//   }

//   return `
//         <h1>Hello!</h1>
//     `;
// };

// 7 Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
    //const today = new Date();   
    //const photodate = new Date(apod.image);
    //console.log(apod.image.explanation)    
  if (!apod || apod === "") {
    getImageOfTheDay(store);
  } else {
    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
      return `
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `;
    } else {
      return `
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `;
    }
  }
};

// 8------------------------------------------------------  API CALLS
const getImageOfTheDay = (state) => {
  let { apod } = state;

  const data = fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));
};

//get request to curiosity route
const getCuriosityData = (state) => {
  let { rovers } = state;
    console.log(rovers)
  const data = fetch(`http://localhost:3000/opportunity`)
    .then((res) => res.json())   
    .then((rovers) => updateStore(store, { rovers }));
};

//get request to oportunity route
const getOportunityData = (state) => {
  let { rovers } = state;
    console.log(rovers)
  const data = fetch(`http://localhost:3000/oportunity`)
    .then((res) => res.json())   
    .then((rovers) => updateStore(store, { rovers }));
};

//get request to spirit route
const getSpiritData = (state) => {
  let { rovers } = state;
    console.log(rovers)
  const data = fetch(`http://localhost:3000/spirit`)
    .then((res) => res.json())   
    .then((rovers) => updateStore(store, { rovers }));
};
