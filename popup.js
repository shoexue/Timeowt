// chrome.runtime.getBackgroundPage(function(backgroundPage) {
//     console = backgroundPage.console;
//   })

// function activateBackground() {
//     chrome.runtime.sendMessage({action: "activate"});
//   }

// document.getElementById("checkbox").addEventListener("change", function() {
//     if (this.checked) {
//       chrome.runtime.sendMessage({activateBackgroundJS: true});
//     } else {
//       chrome.runtime.sendMessage({activateBackgroundJS: false});
//     }
//   });

//Event DOMContentLoaded fires when initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", 
    function(){
    var checkToggleswitch = document.getElementById('extonoff')

    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            chrome.runtime.sendMessage({activateBackgroundJS: true});
        }else{
            chrome.runtime.sendMessage({activateBackgroundJS: false});
        }
    });

    
    // if (document.getElementById('instagram').checked == true) {
    //     console.log("instagram check");
    // }
    // var id = ['youtube','instagram','tiktok','other'];
    // var checkTiktok = document.getElementById('tiktok');
    
    // checkTiktok.addEventListener('change',function(){
    //     if (checkTiktok.checked){
    //         console.log("tiktok");
    //     }
    // });
    
});


function checkClickFunc(){
    var checkbox = document.getElementById('instagram');
    if (checkbox.checked == true){
        alert("Checkbox is clicked");
    }
}
    // var checkPageButton = document.getElementById('clickIt');
    // checkPageButton.addEventListener('click', function(){

    //     chrome.tabs.query({
    //         active: true,
    //         lastFocusedWindow: true
    //     },function(tab){
    //         alert("Timeowout!");
        
    //     });
    // }, false);
