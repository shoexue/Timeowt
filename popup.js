//Event DOMContentLoaded fires when initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded",
    function(){
    //Get references to elements on HTML (extension on/off toggle switch, blocklist site input form, form submit button)
    var checkToggleswitch = document.getElementById('extonoff')
    var textinpt = document.getElementById('siteInpt')
    var inptButton = document.getElementById('inptButton')
    
    //Get reference to button container div
    var buttonContainer = document.getElementById("buttonContainer");
    
    //check local storage to see if extension was last turned on or off
    chrome.storage.local.get(["extOn"], (result) => {
        if (result.extOn==true){
            //if extension is on, show toggle switch as "on" (checked) in popup
            document.getElementById("extonoff").checked = true;
        }
    });

    //get current list of blocked sites from local storage
    chrome.storage.local.get(["entryText"], (result) => {
        blocklist = result.entryText
        
        //Generate buttons with names of blocked sites
        for (var i = 0; i < blocklist.length; i++) {
            //Create new button element
            var button = document.createElement("button");

            //Set the button's text
            button.innerHTML = blocklist[i];
            button.className = "button";
            button.onclick = function(label) {
                return function() {
                    //on click, send message to background.js to delete site from blocklist + remove button interface from HTML container
                    chrome.runtime.sendMessage({deleteEntry:this.innerHTML});
                    buttonContainer.removeChild(this);

                };
            }(blocklist[i]);
            // button.addEventListener('click',function(){
            //     alert(button.innerHTML);
            //     chrome.runtime.sendMessage({deleteEntry:button.innerHTML});
            // })

            //Append the button to the button container
            buttonContainer.appendChild(button);
        }
    });

    //check for change in toggle switch state, if on, send message to activate background script, if not, don't
    checkToggleswitch.addEventListener('change',function(){
        if (checkToggleswitch.checked){
            chrome.runtime.sendMessage({activateBackgroundJS: true});
        }else{
            chrome.runtime.sendMessage({activateBackgroundJS: false});
        }
    });
    
    //check for submit button click (submitting new site url to be blocked)
    inptButton.addEventListener('click',function(){
        chrome.storage.local.get(["entryText"], (result) => {
            blocklist = result.entryText
            //add new entry to list of blocked sites
            blocklist.push(textinpt.value)
            chrome.runtime.sendMessage({newEntry: blocklist});
        });
        //chrome.runtime.sendMessage({newEntry: textinpt.value})
        
    });

});
