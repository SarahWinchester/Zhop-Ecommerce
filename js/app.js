//search Function

    $("#search-btn").click(function(){
        let inputSearchVal = $("#search-input").val();
        console.log(inputSearchVal);
        // mercado(inputSearchVal);
        // searchingRequest(inputSearchVal);
    })
// })
// const mercado = () => {
//     $.ajax({
//         url: `https://api.mercadolibre.com/sites/MLA/search?q=goth`,
//         type: 'GET',
//         crossDomain: true,
//         datatype: 'json',
//         success: function (response) {
//             for (var i = 0; i <= 5; i++) {
//                 var photo = response.results[i].thumbnail;
//                 console.log(photo);
//             }
//         }
//     })
// }
                //Function for the API for the seach 
                // function searchingRequest(inputSearchVal) { 
                //     let getsearchingUrl = "https://api.mercadolibre.com/sites/MLM/search?q="+ inputSearchVal;
                //     $.ajax({
                //         url: getsearchingUrl,
                //         type: "GET",
                //         crossDomain: true,
                //     }).done(function(response) {
                //         console.log(response);
                //     })
                // }; 
                