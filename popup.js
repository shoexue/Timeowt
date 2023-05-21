//Event DOMContentLoaded fires when initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded",
    function(){
    var checkToggleswitch = document.getElementById('extonoff')
    var textinpt = document.getElementById('siteInpt')
    var inptButton = document.getElementById('inptButton')
    // Get a reference to the button container div
    var buttonContainer = document.getElementById("buttonContainer");
    
    // var checkInst = document.getElementById('instagram')


    //check local storage to see if extension was last turned on or off
    chrome.storage.local.get(["extOn"], (result) => {
        if (result.extOn==true){
            //if extension is on, show toggle switch as "on" (checked) in popup
            document.getElementById("extonoff").checked = true;
        }
    });

    chrome.storage.local.get(["entryText"], (result) => {
        blocklist = result.entryText
        //blocklist = JSON.parse(JSON.stringify(result.entryText))
        // Generate the buttons using a for loop
        for (var i = 0; i < blocklist.length; i++) {
            // Create a new button element
            var button = document.createElement("button");

            // Set the button's text
            button.innerHTML = blocklist[i];
            button.className = "button";
            button.onclick = function(label) {
                return function() {
                    //alert(this.innerHTML);
                    chrome.runtime.sendMessage({deleteEntry:this.innerHTML});
                    buttonContainer.removeChild(this);

                // Do something else when the button is clicked
                };
            }(blocklist[i]);
            // button.addEventListener('click',function(){
            //     alert(button.innerHTML);
            //     chrome.runtime.sendMessage({deleteEntry:button.innerHTML});
            // })

            // Append the button to the button container
            buttonContainer.appendChild(button);
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
    
    //check for button click (submitting new site url to be blocked)
    inptButton.addEventListener('click',function(){
        //alert(textinpt.value);
        blocklist.push(textinpt.value)
        //chrome.runtime.sendMessage({newEntry: textinpt.value})
        chrome.runtime.sendMessage({newEntry: blocklist});
    
        
    });

});
