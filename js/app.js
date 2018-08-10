/*First Notes 9/08/18 
TODO:

[ ]passing this to React
[ ]using handlebars
[ ]using view
[ ] search a better api for  bring fotos or find the way 
[ ] trying to make shopping cart 

FIXME:
[ ] Modal template must be separated , maybe in the same call.
[ ] it must be a simplier way with less lines for the template
[ ] put recall to home button 
[X] erase the sales button
[X] use diferent variables to modal
[ ] Use api for sandbox
[X] use prices in the description Note:dont used.
[ ]asking for home <a> redirect to mainShow function
[ ] why isnt working searchin function

*/

/////////////////////////MAIN , Callback, Templates/////////////////////

$( document ).ready(function mainShow() { //make this function the first one on load
    let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda_alternativa";
    $.ajax({
        url: getMainShow,
        type: "GET",
        crossDomain: true,
    }).done(function(responseMain) {
        console.log(responseMain); //returns object
        
        $("#itemsContainer").html(""); //this clean the html
        
        fillingMain(responseMain);
        
        function fillingMain( responseMain) {
            let responseMainTemplateFill =responseMain.results;
            console.log(responseMainTemplateFill);//return array of results 
            
            for (let i = 0; i < responseMainTemplateFill.length; i++) {
                
                let principalTemplateMain=` <!--Cards-->
                <div class="card margincard cardstyle d-inline-block" style="width: 15rem;">
                <img class="card-img-top" src="{{thumbnail}}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title">{{title}}</h5>                    
                <!--Launch Demo Modal-->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
                Detalles
                </button>        
                </div>
                </div>
                <!--Ends Card-->`
                let mainModalBox = `<!-- Modal -->
                <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                </div>
                <div class="modal-body">
                <div class="row">
                <img class=" col-3 offset-5"  src="{{thumbnailModal}}" alt="">
                </div>
                <div class="row itemsTitles">
                <span class="col-3">ID</span>
                <span class="col-3">Lugar de Origen</span>
                <span class="col-3">Existencias</span>
                <span class="col-3">Precio</span>
                </div>
                <div class="row">
                <span class="col-3">{{idModal}}</span>
                <span class="col-3">{{whereModal}}</span>
                <span class="col-3">{{stockModal}}</span>
                <span class="col-3">{{priceModal}}</span>
                </div>
                <div class="row marginBtnsModal">
                <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
                <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>
                
                </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>`
                
                
                //used for a good control on replace
                
                let titleMain = responseMain.results[i].title;
                let thumbnailMain= responseMain.results[i].thumbnail;
                let idMain = responseMain.results[i].id;
                let priceMain= responseMain.results[i].price;
                let placeMain= responseMain.results[i].address.state_name;
                let stockMain= responseMain.results[i].available_quantity;
                
                
                let fillingTemplateMain= principalTemplateMain.replace("{{thumbnail}}", thumbnailMain)
                .replace("{{title}}",titleMain).replace("{{price}}}", priceMain);
                
                let fillingTemplateModal= mainModalBox.replace("{{thumbnailModal}}", thumbnailMain)
                .replace("{{titleModal}}", titleMain)
                .replace("{{idModal}}", idMain )
                .replace("{{whereModal}}",placeMain)
                .replace("{{stockModal}}",stockMain )
                .replace("{{priceModal}}", priceMain);
                
                $("#itemsContainer").append(fillingTemplateMain);
                $("#itemsContainer").append(fillingTemplateModal);
                
                
                
            }                   
        }    
        // fillingMain(responseMain);  
    })
}); 


/////////////////////////CATEGORIES, FUNCTIONS AND TEMPLATES////////////////

$(".category").click(function(event){
    console.log(event.target.id);
    if (event.target.id == "gothic") {
        categoryRequest("goth");
        console.log("entro goth");
        $("#itemsContainer").html("");
    }else if (event.target.id == "cybergoth"){
        categoryRequest("cybergoth");
        console.log("entro cybergoth");
        $("#itemsContainer").html("");
    }else if(event.target.id == "steampunk"){
        categoryRequest("steampunk");
        $("#itemsContainer").html("");  
    }
})

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
    })
}; 
function fillingCategory( responseCategory) {
    for (let i = 0; i < (responseCategory.results).length; i++) {
        let principalTemplateCategories=` <!--Cards--> <div class="card margincard cardstyle d-inline-block" style="width: 15rem;">
        <img class="card-img-top" src="{{thumbnail}}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">{{title}}</h5>                    
        <!--Launch Demo Modal-->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
        Detalles
        </button>        
        </div>
        </div>
        <!--Ends Card-->`
        let mainModalBox = `<!-- Modal -->
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        </div>
        <div class="modal-body">
        <div class="row">
        <img class=" col-3 offset-5"  src="{{thumbnailModal}}" alt="">
        </div>
        <div class="row itemsTitles">
        <span class="col-3">ID</span>
        <span class="col-3">Lugar de Origen</span>
        <span class="col-3">Existencias</span>
        <span class="col-3">Precio</span>
        </div>
        <div class="row">
        <span class="col-3">{{idModal}}</span>
        <span class="col-3">{{whereModal}}</span>
        <span class="col-3">{{stockModal}}</span>
        <span class="col-3">{{priceModal}}</span>
        </div>
        <div class="row marginBtnsModal">
        <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
        <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>
        
        </div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>`
        
        
        //used for a good control on replace
        
        let titleCategories = responseCategory.results[i].title;
        let thumbnailCategories= responseCategory.results[i].thumbnail;
        let idCategories = responseCategory.results[i].id;
        let priceCategories= responseCategory.results[i].price;
        let placeCategories= responseCategory.results[i].address.state_name;
        let stockCategories= responseCategory.results[i].available_quantity;
        
        
        let fillingTemplateCategories= principalTemplateCategories.replace("{{thumbnail}}", thumbnailCategories)
        .replace("{{title}}",titleCategories).replace("{{price}}", priceCategories);
        
        let fillingTemplateCategoriesModal= mainModalBox.replace("{{thumbnailModal}}", thumbnailCategories)
        .replace("{{titleModal}}", titleCategories)
        .replace("{{idModal}}", idCategories )
        .replace("{{whereModal}}",placeCategories)
        .replace("{{stockModal}}",stockCategories)
        .replace("{{priceModal}}", priceCategories);
        
        $("#itemsContainer").append(fillingTemplateCategories);
        $("#itemsContainer").append(fillingTemplateCategoriesModal);
    }
}
///////////////// SEARCH  EVENT ////////////////

//search Function
$("#search-btn").click(function(){
    let inputSearchVal = $("#search-input").val();
    console.log(inputSearchVal);
    searchingRequest(inputSearchVal);
})


// //Function for the API for the seach 
function searchingRequest(inputSearchVal) { 
    console.log(inputSearchVal);
    
    let searchWithscores = inputSearchVal.replace(" ","_");
    
    console.log(searchWithscores);
    
    let getsearchingUrl = "https://api.mercadolibre.com/sites/MLM/search?q="+ searchWithscores;
    $.ajax({
        url: getsearchingUrl,
        type: "GET",
        crossDomain: true,
    }).done(function(response) {
        console.log(response);
        $("#itemsContainer").html("");
    })
    // searchingRequest(response);
    
}; 

// function searchingRequest(response){
//     for(let i = 0 ; i < (response.results).length; i+=1){
//         console.log(i);
//         console.log(response.results);


//     }
// }


// let principalTemplateSearch=` <!--Cards--> <div class="card margincard cardstyle d-inline-block" style="width: 15rem;">
// <img class="card-img-top" src="{{thumbnail}}" alt="Card image cap">
// <div class="card-body">
// <h5 class="card-title">{{title}}</h5>     
// <h4>{{price}}<h4>               
// <!--Launch Demo Modal-->
// <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
// Detalles
// </button>        
// </div>
// </div>
// <!--Ends Card-->`

// let SearchModalBox = `<!-- Modal -->
// <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
// <div class="modal-dialog" role="document">
// <div class="modal-content">
// <div class="modal-header">
// <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
// <button type="button" class="close" data-dismiss="modal" aria-label="Close">
// <span aria-hidden="true">&times;</span>
// </button>
// </div>
// </div>
// <div class="modal-body">
// <div class="row">
// <img class=" col-4 offset-4 img-fluid"  src="{{thumbnailModal}}" alt="">
// </div>
// <div class="row itemsTitles">
// <span class="col-3">ID</span>
// <span class="col-3">Lugar de Origen</span>
// <span class="col-3">Existencias</span>
// <span class="col-3">Precio</span>
// </div>
// <div class="row">
// <span class="col-3">{{idModal}}</span>
// <span class="col-3">{{whereModal}}</span>
// <span class="col-3">{{stockModal}}</span>
// <span class="col-3">{{priceModal}}</span>
// </div>
// <div class="row marginBtnsModal">
// <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
// <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>

// </div>
// </div>
// <div class="modal-footer">
// <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
// </div>
// </div>`


//used for a good control on replace

// let titleSearch = response.results[i].title;
// let thumbnailSearch= response.results[i].thumbnail;
// let idSearch = response.results[i].id;
// let priceSearch= response.results[i].price;
// let placeSearch= response.results[i].address.state_name;
// let stockSearch= response.results[i].available_quantity;


// let fillingTemplateSearch= principalTemplateSearch.replace("{{thumbnail}}", thumbnailSearch)
// .replace("{{title}}",titleSearch).replace("{{price}}", priceSearch);

// let fillingTemplateSearchModal= SearchModalBox.replace("{{thumbnailModal}}", thumbnailSearch)
// .replace("{{titleModal}}", titleSearch)
// .replace("{{idModal}}", idSearch )
// .replace("{{whereModal}}",placeSearch)
// .replace("{{stockModal}}",stockSearch)
// .replace("{{priceModal}}", priceSearch);

// $("#itemsContainer").append(fillingTemplateSearch);
// $("#itemsContainer").append(fillingTemplateSearchModal);
//     }                   

// };        