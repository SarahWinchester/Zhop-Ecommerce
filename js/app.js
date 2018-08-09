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
    }).done(function(searchingResponse) {
        console.log(searchingResponse);
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
        fillingCategory(responseCategory);
        template();
    })
}; 

//shows the first thig to appear
function mainShow() { 
    let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda_alternativa";
    $.ajax({
        url: getMainShow,
        type: "GET",
        crossDomain: true,
    }).done(function(responseMain) {
        console.log(responseMain);
        //Aqui debo esconder la data anterior que esta por default en la pagina en cada uno de los else html"".
    })
}; 

//template
function template() {
    // console.log(this);
    let principalTemplate=` <!--Cards-->
    <div class="itemContainer" id="itemsContainer"><!--Borrar todo el contenido dentro de este para meter el otro-->
    <div class="card margincard cardstyle" style="width: 18rem;">
    <img class="card-img-top" src="{{thumbnail}}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">{{title}}</h5>
    <!--Launch Demo Modal-->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
    Detalles
    </button>        
    </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLongTitle ">{{title}}</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    <div class="row">
    <img class=" col-12"  src="{{thumbnail}}" alt="">
    </div>
    <div class="row itemsTitles">
    <span class="col-3">ID</span>
    <span class="col-3">State</span>
    <span class="col-3">quantity</span>
    <span class="col-3">Price</span>
    </div>
    <div class="row">
    <span class="col-3">{{id}}</span>
    <span class="col-3">{{where}}</span>
    <span class="col-3">{{brand}}</span>
    <span class="col-3">{{price}}</span>
    </div>
    <div class="row marginBtnsModal">
    <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
    <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>
    
    </div>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
    </div>
    </div>
    </div>
    <!--Ends Card-->`
    fillingCategory(principalTemplate);
}




function fillingCategory( responseCategory , principalTemplate) {
    let templateToUse = principalTemplate;
    for (let i = 0; i < (responseCategory.results).length; i++) {
        $("#itemsContainer").html("");
        console.log(responseCategory.results[i].title);
        console.log(responseCategory.results[i].thumbnail);
        console.log(responseCategory.results[i].id);
        console.log(responseCategory.results[i].price);
        console.log(responseCategory.results[i].address.state_name);
        console.log(responseCategory.results[i].available_quantity);

        let title = responseCategory.results[i].title;
        let thumbnail= responseCategory.results[i].thumbnail;
        let id = responseCategory.results[i].id;
        let price= responseCategory.results[i].price;
        let name= responseCategory.results[i].address.state_name;
        let quantity= responseCategory.results[i].available_quantity;
        
        
        
        let fillingTemplateCategory= templateToUse.replace("{{title}}", title).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
        .replace("{{price}}", price)
        .replace("{{where}}", name)
        .replace("{{brand}}",quantity);
        $("#itemsContainer").append(fillingTemplateCategory);
    }                   
    
    
    
    
}   