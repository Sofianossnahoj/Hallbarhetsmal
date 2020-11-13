
const UN_API = 'https://unstats.un.org/SDGAPI/swagger/v1/swagger.json';
const HEADERBTN = document.getElementById('headerBtn')
const unGoalContainer = document.getElementById('unGoalData');
var initialData;

// Initial code to try out the fetch fuction and is not called for. 
function getGoalList(GoalList) {
    fetch(UN_API)
    .then( res => {
        return res.json()
    })
    .catch(error => console.log('error'))
    console.log(UN_API)
}

// goaltemplate genereates new html which display's the fetched data [aka the un goals]
function Goaltemplate(initialData) {
    return `
            <div class="mainUNGoalContainer" id="mainUNGoalContainer${initialData.code}" onclick="fetchTargetData(${initialData.code})">
                <h3 class="mainUNGoalContainer--goalNumber"> Goal ${initialData.code}</h3>
                <p class="mainUNGoalContainer--title"> ${initialData.title} </p>
                <p class="mainUNGoalContainer--description"> ${initialData.description}</p>
            </div>`
}

//fetches all of the initial goal list data from the API
function fetchData(){
    fetch("https://unstats.un.org/SDGAPI/v1/sdg/Goal/List?includechildren=true")
    .then(response => {
        return response.json();
    })
    .then(data => {
        initialData = data;
        console.log(initialData)
        document.getElementById('unGoalData').innerHTML = `
        ${initialData.map(Goaltemplate).join('')}
        `
    })
}


fetchData();

// fetches all of the data for a specific goal
function fetchTargetData(code){
    fetch(`https://unstats.un.org/SDGAPI/v1/sdg/Goal/${code}/Target/List?includechildren=true`)
    .then(response => {
        return response.json();
    })
    .then(targetData => {
        console.log(targetData)
        document.getElementById(`mainUNGoalContainer${code}`).innerHTML = `
        ${targetData.map(targetTemplate).join(' ')}
        `
    })
}

// generates new html for the selected goal after click
function targetTemplate (targetData) {
    console.log(targetData.code)

    return `
    ${targetData.targets.map(function(targetList){
        console.log(targetList.code)
        return `
        <h3 class="mainUNGoalContainer--targetNumber">
        ${targetList.code}
        </h3>
        <p class="mainUNGoalContainer--targetDescription">
        ${targetList.description}
        </p>

        `
    }).join('')}
    `
}
