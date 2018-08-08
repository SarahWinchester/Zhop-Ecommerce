//search Function
$(document).ready(function(){
    $("#search-btn").click(function(){
        let inputSearchVal = $("#search-input").val();
        console.log(inputSearchVal);
        searchingRequest(inputSearchVal);
    })
})