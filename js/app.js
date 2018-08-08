//search Function
$(document).ready(function(){
    $("#search-btn").click(function(){
        let inputSearchVal = $("#search-input").val();
        console.log(inputSearchVal);
        searchingRequest(inputSearchVal);
    })
})
//category calls
$(".category").click(function(event){
    console.log(event.target.id);
    let eventTarget = event.target.id;
    if (event.target.id == "gothic") {
        categoryRequest("goth");
        console.log("entro goth");
    }else if (event.target.id == "cybergoth"){
        categoryRequest("cybergoth");
        console.log("entro cybergoth");
    }else if(event.target.id == "steampunk"){
        categoryRequest("steampunk");
    }
    
})

//Function for the API for the seach 
function searchingRequest(inputSearchVal) { 
    let searchWithscores = inputSearchVal.replace(" ","_");
    console.log(searchWithscores);
    let getsearchingUrl = "https://api.mercadolibre.com/sites/MLM/search?q="+ searchWithscores;
    $.ajax({
        url: getsearchingUrl,
        type: "GET",
        crossDomain: true,
    }).done(function(response) {
        console.log(response);
    })
}; 
//Function for the category
function categoryRequest(categorySelected) { 
    let getsearchingUrlCategory = "https://api.mercadolibre.com/sites/MLM/search?q="+ categorySelected;
    $.ajax({
        url: getsearchingUrlCategory,
        type: "GET",
        crossDomain: true,
    }).done(function(responseCategory) {
        console.log(responseCategory);
        //Aqui debo esconder la data anterior que esta por default en la pagina en cada uno de los else.
    })
}; 

function mainShow() { 
    let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda-alternativa";
    $.ajax({
        url: getMainShow,
        type: "GET",
        crossDomain: true,
    }).done(function(responseMain) {
        console.log(responseMain);
        //Aqui debo esconder la data anterior que esta por default en la pagina en cada uno de los else.
    })
}; 

let templateCard = ``