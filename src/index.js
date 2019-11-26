document.addEventListener("DOMContentLoaded", ()=>{
    let dogBar = document.querySelector("div#dog-bar")
    let dogInfo = document.querySelector("div#dog-info")
    let filter = document.querySelector("button#good-dog-filter")
    function spanDogs(dogs){
        dogs.forEach(function(dog){
            let span = document.createElement("span")
            span.innerHTML = `
            ${dog.name}
            `
            span.dataset.id = dog.id
            span.dataset.purpose = "pup-span"
            span.style.display = "inline-flex"
            span.dataset.isGoodDog = dog.isGoodDog
            dogBar.append(span)
        });
        
        
    }
    
    function divDogs(dogs){
        dogs.forEach(function(dog){
            let div = document.createElement("div")
            if (dog.isGoodDog){
                div.innerHTML = `
                <img src = ${dog.image} class = "dog-image"/>
                <h2>${dog.name}</h2>
                <button data-id= ${dog.id} data-status = "${dog.isGoodDog}">Good Dog!</button>
                `
            }else{
                div.innerHTML = `
                <img src = ${dog.image} class = "dog-image"/>
                <h2>${dog.name}</h2>
                <button data-id= ${dog.id} data-status = "${dog.isGoodDog}">Bad Dog!</button>
                `
            }
            div.dataset.purpose = "dog-div"
            div.dataset.id = dog.id
            div.style.display = "none"
            dogInfo.append(div)
            
        })
    }
    
    function fetchDogs(){
        fetch("http://localhost:3000/pups")
        .then(function(resp){
            return resp.json()
        })
        .then(function(dogs){
            spanDogs(dogs)
            divDogs(dogs)
        })
    }
    fetchDogs()
    
    
    function updateGoodDog(id, status){
        fetch(`http://localhost:3000/pups/${id}`,{
            method: "PATCH",
            headers:{
                "Content-type": "application/json",
                accept: "application/json"
            },
            body: JSON.stringify({isGoodDog: status})
        })
        .then(function(resp){
            return resp.json()
        })
    }

    dogBar.addEventListener("click", function(e){
        if(e.target.dataset.purpose === "pup-span"){
            let dog = document.querySelector(`div[data-id = "${e.target.dataset.id}"]`)
            let dogs = document.querySelectorAll("div[data-purpose='dog-div']")
            dogs.forEach(function(d){
                if(d.dataset.id !== e.target.dataset.id){
                    d.style.display = "none"
                }
            })
            dog.style.display = ""
        }
    })
    
    
    function turnOnFilter(){
        let spans = document.querySelectorAll("span")
        
        spans.forEach(function(dog){
            console.log(dog.dataset.isGoodDog)
            if(dog.dataset.isGoodDog === 'false'){
                dog.style.display = "none"
                
            }
        })
    }
    function turnOffFilter(){
        let spans = document.querySelectorAll("span")
        spans.forEach(function(dog){
            dog.style.display = "inline-flex"
        })
    }
    filter.addEventListener("click", function(e){
        if(e.target.innerText === "Filter good dogs: OFF"){
            e.target.innerText = "Filter good dogs: ON"
            turnOnFilter()
        }else{
            e.target.innerText = "Filter good dogs: OFF"
            turnOffFilter()
        }
    })

    dogInfo.addEventListener("click", function(e){
        if(e.target.dataset.status !== ""){
            let status = (e.target.dataset.status === 'true')
            let dogSpan = document.querySelector(`span[data-id = "${e.target.dataset.id}"]`)
            console.log(dogSpan)
            if(status === true){
                status = false
    
            }else{
                status = true
            }
            if(e.target.innerHTML === "Good Dog!"){
                e.target.innerHTML = "Bad Dog!"
                e.target.dataset.status = 'false'
                dogSpan.dataset.isGoodDog = 'false'
            }else{
                e.target.innerHTML = "Good Dog!"
                e.target.dataset.status = 'true'
                dogSpan.dataset.isGoodDog = 'true'
            }
            updateGoodDog(e.target.dataset.id, status)
        }
    })


})