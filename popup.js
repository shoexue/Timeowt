//Event DOMContentLoaded fires when initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded",
    function(){
    var checkToggleswitch = document.getElementById('extonoff')
    var textinpt = document.getElementById('siteInpt')
    var inptButton = document.getElementById('inptButton')
    // var checkInst = document.getElementById('instagram')


    //check local storage to see if extension was last turned on or off
    chrome.storage.local.get(["extOn"], (result) => {
        if (result.extOn==true){
            //if extension is on, show toggle switch as "on" (checked) in popup
            document.getElementById("extonoff").checked = true;
        }
    });

    // chrome.storage.local.get(["instOn"], (result) => {
    //     if (result.instOn==true){
    //         //if extension is on, show toggle switch as "on" (checked) in popup
    //         document.getElementById("instagram").checked = true;
    //     }
    // });


    //check for change in toggle switch state, if on activate background script, if not don't
    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            chrome.runtime.sendMessage({activateBackgroundJS: true});
        }else{
            chrome.runtime.sendMessage({activateBackgroundJS: false});
        }
    });
    
    inptButton.addEventListener('click',function(){
        //alert(textinpt.value);
        chrome.runtime.sendMessage({newEntry: textinpt.value})
        //chrome.runtime.sendMessage({entryText: textinpt.value});
    });
   
    // checkInst.addEventListener('change',function(){
    //     if (checkInst.checked){
    //         chrome.runtime.sendMessage({inst: true});
    //     }else{
    //         chrome.runtime.sendMessage({inst: false});
    //     }
    // });

});
