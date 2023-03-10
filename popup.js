document.addEventListener("DOMContentLoaded", 
    function(){
    var checkToggleswitch = document.getElementById('extonoff')

    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            alert(currentURL);
        }else{
            alert('bye');
        }
    });

    
    for (let i=0; i<1; i++){
        var id = ['youtube','instagram','tiktok','other'];
        var checkCheckbox = document.getElementById('tiktok');
        
        checkCheckbox.addEventListener('change',function(){
            if (checkCheckbox.checked){
                alert('yes');
            }else{
                
            }
        });
    }
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
