document.addEventListener("DOMContentLoaded", function(){
    var checkPageButton = document.getElementById('clickIt');
    checkPageButton.addEventListener('click', function(){

        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        },function(tab){
            alert("Timeowout!");
        
        });
    }, false);
}, false);