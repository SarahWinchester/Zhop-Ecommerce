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
[ ] erase the sales button
[ ] use diferent variables to modal
[ ] Use api for sandbox
[ ] use prices in the description.

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
                        <img class=" col-4 offset-4 img-fluid"  src="{{thumbnailModal}}" alt="">
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




// ///////////////EVENT CALLERS////////////////

// //search Function
// $("#search-btn").click(function(){
//     let inputSearchVal = $("#search-input").val();
//     console.log(inputSearchVal);
//     searchingRequest(inputSearchVal);
// })

// //category calls
// $(".category").click(function(event){
//     console.log(event.target.id);
//     if (event.target.id == "gothic") {
//         categoryRequest("goth");
//         console.log("entro goth");
//         $("#itemsContainer").html("");
//     }else if (event.target.id == "cybergoth"){
//         categoryRequest("cybergoth");
//         console.log("entro cybergoth");
//         $("#itemsContainer").html("");

//     }else if(event.target.id == "steampunk"){
//         categoryRequest("steampunk");
//         $("#itemsContainer").html("");  
//     }
// })
// ////////////////////////        Api Functions ///////////////////////////
// //Function for the API for the seach 
// function searchingRequest(inputSearchVal) { 
//     console.log(inputSearchVal);

//     let searchWithscores = inputSearchVal.replace(" ","_");
//     console.log(searchWithscores);
//     let getsearchingUrl = "https://api.mercadolibre.com/sites/MLM/search?q="+ searchWithscores;
//     $.ajax({
//         url: getsearchingUrl,
//         type: "GET",
//         crossDomain: true,
//     }).done(function(searchingResponse) {
//         console.log(searchingResponse);
//         $("#itemsContainer").html("");
//         searchingRequest(searchingResponse)
//     })
// }; 

// //Function for API for the search
// function categoryRequest(categorySelected) { 
//     let getsearchingUrlCategory = "https://api.mercadolibre.com/sites/MLM/search?q="+ categorySelected;
//     $.ajax({
//         url: getsearchingUrlCategory,
//         type: "GET",
//         crossDomain: true,
//     }).done(function(responseCategory) {
//         console.log(responseCategory);
//         //Aqui debo esconder la data anterior que esta por default en la pagina en cada uno de los else.
//         fillingCategory(responseCategory);
//     })
// }; 

// //first call to api and print on load with fill template thats why it have the template inside
// $( document ).ready(function mainShow() { 
//     let getMainShow = "https://api.mercadolibre.com/sites/MLM/search?q=moda_alternativa";
//     $.ajax({
//         url: getMainShow,
//         type: "GET",
//         crossDomain: true,
//     }).done(function(responseMain) {
//         console.log(responseMain);
//         $("#itemsContainer").html("");

//         function fillingMain( responseMain) {
//             let responseMainTemplateFill =responseMain.results;
//             console.log(responseMainTemplateFill);

//             for (let i = 0; i < responseMainTemplateFill.length; i++) {

//                 let principalTemplateMain=` <!--Cards-->
//                 <div class="card margincard cardstyle d-inline-block" style="width: 18rem;">
//                 <img class="card-img-top" src="{{thumbnailModal}}" alt="Card image cap">
//                 <div class="card-body">
//                 <h5 class="card-title">{{titleModal}}</h5>
//                 <!--Launch Demo Modal-->
//                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
//                 Detalles
//                 </button>        
//                 </div>
//                 </div>
//                 <!-- Modal -->
//                 <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
//                 <div class="modal-dialog" role="document">
//                 <div class="modal-content">
//                 <div class="modal-header">
//                 <h5 class="modal-title" id="exampleModalLongTitle ">{{titleModal}}</h5>
//                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//                 </button>
//                 </div>
//                 <div class="modal-body">
//                 <div class="row">
//                 <img class=" col-12 img-fluid"  src="{{thumbnailModal}}" alt="">
//                 </div>
//                 <div class="row itemsTitles">
//                 <span class="col-3">ID</span>
//                 <span class="col-3">State</span>
//                 <span class="col-3">quantity</span>
//                 <span class="col-3">Price</span>
//                 </div>
//                 <div class="row">
//                 <span class="col-3">{{idModal}}</span>
//                 <span class="col-3">{{whereModal}}</span>
//                 <span class="col-3">{{brandModal}}</span>
//                 <span class="col-3">{{priceModal}}</span>
//                 </div>
//                 <div class="row marginBtnsModal">
//                 <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnModalAdd" type="button">Zhoping Cart</button>
//                 <button class="btn btn-outline-success my-2 my-sm-0 searchbtn col-4 offset-1" id="search-btnBuy" type="button">Buy</button>

//                 </div>
//                 </div>
//                 <div class="modal-footer">
//                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//                 </div>
//                 </div>
//                 </div>
//                 <!--Ends Card-->`

//                 // console.log(responseMain.results[i].title);
//                 // console.log(responseMain.results[i].thumbnail);
//                 // console.log(responseMain.results[i].id);
//                 // console.log(responseMain.results[i].price);
//                 // console.log(responseMain.results[i].address.state_name);
//                 // console.log(responseMain.results[i].available_quantity);

//                 //used for a good control on replace

//                 let titleMain = responseMain.results[i].title;
//                 let thumbnailMain= responseMain.results[i].thumbnail;
//                 let idMain = responseMain.results[i].id;
//                 let priceMain= responseMain.results[i].price;
//                 let nameMain= responseMain.results[i].address.state_name;
//                 let quantityMain= responseMain.results[i].available_quantity;



//                 let fillingTemplateMain= principalTemplateMain.replace("{{titleModal}}", titleMain).replace("{{idModal}}", idMain).replace("{{thumbnailModal}}", thumbnailMain)
//                 .replace("{{priceModal}}", priceMain)
//                 .replace("{{whereModal}}", nameMain)
//                 .replace("{{brandModal}}",quantityMain)
//                 .replace("{{titleModal}}",titleMain)
//                 .replace("{{thumbnailModal}}", thumbnailMain);
//                 $("#itemsContainer").append(fillingTemplateMain);



//             }                   
//         }    
//         fillingMain(responseMain);  
//     })
// }); 


// //////////////////////////////////Fillers//////////////////////////
// //filling category 
// function fillingCategory( responseCategory) {
//     for (let i = 0; i < (responseCategory.results).length; i++) {

//         let principalTemplate=` <!--Cards-->
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

//         // console.log(responseCategory.results[i].title);
//         // console.log(responseCategory.results[i].thumbnail);
//         // console.log(responseCategory.results[i].id);
//         // console.log(responseCategory.results[i].price);
//         // console.log(responseCategory.results[i].address.state_name);
//         // console.log(responseCategory.results[i].available_quantity);


//         //Using variables for a better control 
//         let title = responseCategory.results[i].title;
//         let thumbnail= responseCategory.results[i].thumbnail;
//         let id = responseCategory.results[i].id;
//         let price= responseCategory.results[i].price;
//         let name= responseCategory.results[i].address.state_name;
//         let quantity= responseCategory.results[i].available_quantity;


//         //replacing everything  on the card
//         let fillingTemplateCategory= principalTemplate.replace("{{title}}", title).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
//         .replace("{{price}}", price)
//         .replace("{{where}}", name)
//         .replace("{{brand}}",quantity)
//         .replace("{{titleModal}}",title)
//         .replace("{{thumbnailModal}}", thumbnail);
//         $("#itemsContainer").append(fillingTemplateCategory);
//     }                   

// };        


// function searchingRequest( searchingResponse) {
//     let SearchR = searchingResponse.results;
//     console.log(SearchR);

//     for (let i = 0; i < SearchR.length; i++) {

//         let principalTemplateSearch=` <!--Cards-->
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
//         <h5 class="modal-title" id="exampleModalLongTitle ">{{title}}</h5>
//         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//         <span aria-hidden="true">&times;</span>
//         </button>
//         </div>
//         <div class="modal-body">
//         <div class="row">
//         <img class=" col-12 img-fluid"  src="{{thumbnail}}" alt="">
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

//         // console.log(responseCategory.results[i].title);
//         // console.log(responseCategory.results[i].thumbnail);
//         // console.log(responseCategory.results[i].id);
//         // console.log(responseCategory.results[i].price);
//         // console.log(responseCategory.results[i].address.state_name);
//         // console.log(responseCategory.results[i].available_quantity);


//         //Using variables for a better control 
//         let title = SearchR[i].title;
//         let thumbnail= searchingResponse.results[i].thumbnail;
//         let id = searchingResponse.results[i].id;
//         let price= searchingResponse.results[i].price;
//         let name= searchingResponse.results[i].address.state_name;
//         let quantity= searchingResponse.results[i].available_quantity;


//         //replacing everything  on the card
//         let fillingTemplateSearch= principalTemplateSearch.replace("{{title}}", title).replace("{{id}}", id).replace("{{thumbnail}}", thumbnail)
//         .replace("{{price}}", price)
//         .replace("{{where}}", name)
//         .replace("{{brand}}",quantity)
//         .replace("{{titleModal}}",title)
//         .replace("{{thumbnail}}", thumbnail);
//         $("#itemsContainer").append(fillingTemplateSearch);
//     }                   

// };        