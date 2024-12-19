const searchbutton = document.querySelector(".link")
const searchbox = document.querySelector("#search-input")
const viewdetailbutton = document.querySelector(".detail-button")
const detailsPage = document.querySelector("#details-page");
const searchPage = document.querySelector("#searchResults");
const generatbutton =document.querySelector(".generate")
const recepiDetailcontent = document.querySelector(".recipe-details-content");
const mealDetailcontent = document.querySelector(".meal-details");
const searchResult = document.querySelector("showResult");
const divresult = document.querySelector(".divResult");

document.addEventListener('DOMContentLoaded', () => {showHomepage()})

// Function to show the search results page
function showSearchResults() {
    document.getElementById('searchResults').classList.remove('close');
    document.getElementById('homepage').classList.add('close');
    }
    // Function to show the homepage
    function showHomepage() {
    document.getElementById('searchResults').classList.add('close');
    document.getElementById('homepage').classList.remove('close');
    document.getElementById('details-page').classList.add('close');
}
function showDetailpage() {
    document.getElementById('searchResults').classList.add('close');
    document.getElementById('homepage').classList.add('close');
    document.getElementById('details-page').classList.remove('close'); 
}
// ################ Homepage ################ 
const recipcontainer = document.querySelector(".recepi-container")
const URL = "https://www.themealdb.com/api/json/v1/1/random.php"

const getFacts = async()=>{
  //console.log("getting data...");
  let response = await fetch(URL);
  //console.log(response);
  let data = await response.json();
  console.log (data);
   //const cocktail = data.meals.at(0)
   //data.meals[0]
   data.meals.forEach( element => {
    const mealdiv = document.createElement('div');
    mealdiv.classList.add('card');
    mealdiv.innerHTML =`
 <img src = "${element.strMealThumb}">
 <h1>${element.strMeal}</h1>
 

 `
 recipcontainer.replaceChild(mealdiv, recipcontainer.children[0]);
 
 
  }
)};
getFacts();// romdomly selects meal

generatbutton.addEventListener('click', (event)=>{
     event.preventDefault();
    console.log("butten click")
    getFacts();
    
    });

//########## Search anad geting details  ###########

getName = async(pasta)=>{
  const baseURL =(`https://www.themealdb.com/api/json/v1/1/search.php?s=${pasta}`);
  //console.log("getting data...");
let resp = await fetch(baseURL);

console.log(resp);
let details = await resp.json();
console.log (details)
searchbox.value= "";
//searchPage.innerHTML="";


details.meals.forEach( element => {
  const mealnamediv = document.createElement('div');
  mealnamediv.classList.add('cardd');
  mealnamediv.innerHTML =`
  <img src = "${element.strMealThumb}">
  <h1>${element.strMeal}</h1>
  
  
  `
  
  const buttonn = document. createElement('button');
buttonn.classList.add('detail-buttonn');
buttonn.textContent='View details';
  mealnamediv.appendChild(buttonn);
  buttonn.addEventListener('click' ,() =>{
    openRecepi(element);
   
});
searchPage.appendChild(mealnamediv);

 
});

  }

  function maprawMealdata(element){
    console.log(element);
  
  }
// geting meal data
const mapRawmealData =( element )=>{
  console.log(element);
  let ingredientsDetails =[];
   for(let i = 1; i<=21; i ++){
    const measurent = element[`strMeasure${i}`];
    if(measurent){
      const ingredient = element[`strIngredient${i}`];
      ingredientsDetails += `<ul>${measurent} ${ingredient}</ul>`
       
    }
    else{
      break;
    }
  }
  return ingredientsDetails;
    }
  // display on detailpage
  const openRecepi =(element) =>{
  recepiDetailcontent.innerHTML = `
  <h1>Name:${element.strMeal}</h1>
  <h2>Id:${element.idMeal}</h2>
  <h3>Place:${element.strArea}</h3>
  <ul>Ingredients and measures ${mapRawmealData(element)}</ul>
  
  <h3> Instructions:</h3>
  <p>${element.strInstructions}</p>
  
   
  `
  showDetailpage(); // function  to display detailpage
  

}

searchbutton.addEventListener('click', function(event){
  event.preventDefault();
  let inputValue = (searchbox.value) ;
  if (inputValue ==""){
    
   alert ("*Inter search value.");
   
  }else{
  getName(inputValue);
  } 
});

