//Event DOMContentLoaded fires when initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded",
    function(){
    var checkToggleswitch = document.getElementById('extonoff')


    //check local storage to see if extension was last turned on or off
    chrome.storage.local.get(["extOn"], (result) => {
        if (result.extOn==true){
            //if extension is on, show toggle switch as "on" (checked) in popup
            document.getElementById("extonoff").checked = true;
        }
    });


    //check for change in toggle switch state, if on activate background script, if not don't
    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            chrome.runtime.sendMessage({activateBackgroundJS: true});
        }else{
            chrome.runtime.sendMessage({activateBackgroundJS: false});
        }
    });
   
});




//ignore
function checkClickFunc(){
    var checkbox = document.getElementById('instagram');
    if (checkbox.checked == true){
        alert("Checkbox is clicked");
    }
}
