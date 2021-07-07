document.addEventListener("DOMContentLoaded", ()=> {
    let dogBar = document.getElementById("dog-bar")
    console.log(dogBar)


    function fetchApi(){
        fetch("http://localhost:3000/pups").then(function(response){
            return response.json();
        })
        .then(function(json){
            parseData(json)
        });
    }
    fetchApi();

    function parseData(data){
        data.forEach(dog => {addNewDog(dog)
        });
    }

    function addNewDog(dog){
        let span = document.createElement("span")
        span.innerHTML = `
         <p class="dog-item" id="${dog.id}">${dog.name}</p>
         
        `
        dogBar.append(span)
    }

    document.addEventListener("click", (e) =>{
        if (e.target.classList[0] === 'dog-item'){
            console.log(e.target)
            getDogDetails(e.target.id)
        }
    })

    function getDogDetails(dogId){
        fetch(`http://localhost:3000/pups/${dogId}`)
        .then(resp=>resp.json())
        .then(dog=>dogDetails(dog))
    }

    let dogInfo = document.getElementById("dog-info") 

    function dogDetails(dog){
        dogInfo.innerHTML = `
        <img src=${dog.image}>
        <h2>${dog.name}</h2>
        <button>Good Dog!</button>
        `
    }






})