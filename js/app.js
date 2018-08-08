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
    let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda_alternativa";
    $.ajax({
        url: getMainShow,
        type: "GET",
        crossDomain: true,
    }).done(function(responseMain) {
        console.log(responseMain);
        //Aqui debo esconder la data anterior que esta por default en la pagina en cada uno de los else.
    })
}; 

let templateCard = `  <div class="card margincard cardstyle" style="width: 18rem;">
<img class="card-img-top" src="css/assets/images/635765797582729582194945323_zombie.png" alt="Card image cap">
<div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <!--Launch Demo Modal-->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
        Launch demo modal
    </button>        
</div>
</div>
<!-- Modal -->
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
<div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
</div>
</div>`