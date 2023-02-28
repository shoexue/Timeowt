document.addEventListener("DOMContentLoaded", 
    function(){
    var checkToggleswitch = document.getElementById('extonoff')

    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            alert('hi');
        }else{
            alert('bye');
        }
    });
}, false);

    // var checkPageButton = document.getElementById('clickIt');
    // checkPageButton.addEventListener('click', function(){

    //     chrome.tabs.query({
    //         active: true,
    //         lastFocusedWindow: true
    //     },function(tab){
    //         alert("Timeowout!");
        
    //     });
    // }, false);
