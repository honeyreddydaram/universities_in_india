//only for states in india 

let url = "http://universities.hipolabs.com/search?country=India";

async function getColleges() {
    try{
        let response = await axios.get(url);
        return response.data;
    } catch(e){
        console.log(e);
        return [];
    }
}

let btn = document.querySelector("button");
let p = document.querySelector("p");

function show(collegesA, uniqueStates){
    let list = document.querySelector("#list");
    list.innerText = "";

    for(col of collegesA){
        let li = document.createElement("li");
        li.innerHTML = col.country + " :          " + col.name + " ( " + col['state-province'] + " )";
        list.appendChild(li);
    }    
    console.log("Available states/provinces: ", uniqueStates); // logs all the available states in that country
}

btn.addEventListener("click", async ()=>{
    let stateProvinceInput = document.querySelector("input").value;
    console.log("selected state is : ",stateProvinceInput);

    let collegesA = await getColleges();

    // let uniqueStates = [];
    // let filteredColleges = [];
    
    // for (let i = 0; i < collegesA.length; i++) {
    //     let state = collegesA[i]['state-province'];
        
    //     // Collect unique states
    //     if (state && !uniqueStates.includes(state)) {
    //         uniqueStates.push(state);
    //     }
    
    //     // Filter colleges based on input
    //     if (state && state.toLowerCase() === stateProvinceInput.toLowerCase()) {
    //         filteredColleges.push(collegesA[i]);
    //     }
    // }

    let uniqueStates = [...new Set(collegesA.map(col => col['state-province']))];

    let filteredColleges = collegesA.filter(col => col['state-province']&& col['state-province'].toLowerCase() === stateProvinceInput.toLowerCase());

    show(filteredColleges, uniqueStates);
    p.innerHTML= "Showing "+filteredColleges.length+" universities in "+ stateProvinceInput;
});
