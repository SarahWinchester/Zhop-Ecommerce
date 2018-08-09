//search Function
// $(document).ready(function(){
$("#search-btn").click(function(){
    let inputSearchVal = $("#search-input").val();
    console.log(inputSearchVal);
    searchingRequest(inputSearchVal);
})
// })
//category calls
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
        
        $("#itemsContainer").html("");
        
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
    })
}; 

//shows the first thig to appear
$( document ).ready(function mainShow() { 
    let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda_alternativa";
    $.ajax({
        url: getMainShow,
        type: "GET",
        crossDomain: true,
    }).done(function(responseMain) {
        console.log(responseMain);
        $("#itemsContainer").html("");
        
        // fillingMain(responseMain);
        
        function fillingMain( responseMain) {
            let responseMainTemplateFill =responseMain.results;
            console.log(responseMainTemplateFill);
            
            for (let i = 0; i < responseMainTemplateFill.length; i++) {
                
                let principalTemplateMain=` <!--Cards-->
                <div class="card margincard cardstyle d-inline-block" style="width: 18rem;">
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
                <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                <div class="row">
                <img class=" col-12 img-fluid"  src="{{thumbnailModal}}" alt="">
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
                <!--Ends Card-->`
                
                console.log(responseMain.results[i].title);
                console.log(responseMain.results[i].thumbnail);
                console.log(responseMain.results[i].id);
                console.log(responseMain.results[i].price);
                console.log(responseMain.results[i].address.state_name);
                console.log(responseMain.results[i].available_quantity);
                
                let titleMain = responseMain.results[i].title;
                let thumbnailMain= responseMain.results[i].thumbnail;
                let idMain = responseMain.results[i].id;
                let priceMain= responseMain.results[i].price;
                let nameMain= responseMain.results[i].address.state_name;
                let quantityMain= responseMain.results[i].available_quantity;
                
                
                
                let fillingTemplateMain= principalTemplateMain.replace("{{title}}", titleMain).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
                .replace("{{price}}", price)
                .replace("{{where}}", name)
                .replace("{{brand}}",quantity)
                .replace("{{titleModal}}",title)
                .replace("{{thumbnailModal}}", thumbnail);
                $("#itemsContainer").append(fillingTemplateMain);
                
                
                
            }                   
        }    
        fillingMain(responseMain);  
    })
}); 




function fillingCategory( responseCategory) {
    for (let i = 0; i < (responseCategory.results).length; i++) {
        
        let principalTemplate=` <!--Cards-->
        <div class="card margincard cardstyle d-inline-block" style="width: 18rem;">
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
        <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div class="row">
        <img class=" col-12 img-fluid"  src="{{thumbnailModal}}" alt="">
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
        <!--Ends Card-->`
        
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
        
        
        
        let fillingTemplateCategory= principalTemplate.replace("{{title}}", title).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
        .replace("{{price}}", price)
        .replace("{{where}}", name)
        .replace("{{brand}}",quantity)
        .replace("{{titleModal}}",title)
        .replace("{{thumbnailModal}}", thumbnail);
        $("#itemsContainer").append(fillingTemplateCategory);
    }                   
    
};        

// $( document ).ready(function fillingMain( responseMain) {
//     for (let i = 0; i < (responseMain.results).length; i++) {

//         let principalTemplateMain=` <!--Cards-->
//         <div class="card margincard cardstyle d-inline-block" style="width: 18rem;">
//         <img class="card-img-top" src="{{thumbnail}}" alt="Card image cap">
//         <div class="card-body">
//         <h5 class="card-title">{{title}}</h5>
//         <!--Launch Demo Modal-->
//         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
//         Detalles
//         </button>        
//         </div>
//         </div>
//         <!-- Modal -->
//         <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
//         <div class="modal-dialog" role="document">
//         <div class="modal-content">
//         <div class="modal-header">
//         <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//         </button>
//         </div>
//         <div class="modal-body">
//         <div class="row">
//         <img class=" col-12 img-fluid"  src="{{thumbnailModal}}" alt="">
//         </div>
//         <div class="row itemsTitles">
//         <span class="col-3">ID</span>
//         <span class="col-3">State</span>
//         <span class="col-3">quantity</span>
//         <span class="col-3">Price</span>
//         </div>
//         <div class="row">
//         <span class="col-3">{{id}}</span>
//         <span class="col-3">{{where}}</span>
//         <span class="col-3">{{brand}}</span>
//         <span class="col-3">{{price}}</span>
//         </div>
//         <div class="row marginBtnsModal">
//         <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
//         <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>

//         </div>
//         </div>
//         <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//         </div>
//         </div>
//         </div>
//         <!--Ends Card-->`

//         console.log(responseMain.results[i].title);
//         console.log(responseMain.results[i].thumbnail);
//         console.log(responseMain.results[i].id);
//         console.log(responseMain.results[i].price);
//         console.log(responseMain.results[i].address.state_name);
//         console.log(responseMain.results[i].available_quantity);

//         let title = responseMain.results[i].title;
//         let thumbnail= responseMain.results[i].thumbnail;
//         let id = responseMain.results[i].id;
//         let price= responseMain.results[i].price;
//         let name= responseMain.results[i].address.state_name;
//         let quantity= responseMain.results[i].available_quantity;



//         let fillingTemplateMain= principalTemplateMain.replace("{{title}}", title).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
//         .replace("{{price}}", price)
//         .replace("{{where}}", name)
//         .replace("{{brand}}",quantity)
//         .replace("{{titleModal}}",title)
//         .replace("{{thumbnailModal}}", thumbnail);
//         $("#itemsContainer").append(fillingTemplateMain);
//     }                   

// });       