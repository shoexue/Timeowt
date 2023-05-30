chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.activateBackgroundJS) {
        console.log("extension on");
        //if request is to activate background, store local data that the extension is on
        chrome.storage.local.set({ extOn: true }).then(() => {
            console.log("Value is set to " + true);
          });
    } else if (request.activateBackgroundJS == false) {
        console.log("extension off");
        //if request is to deactivate background, store local data that the extension is off
        chrome.storage.local.set({ extOn: false }).then(() => {
            console.log("Value is set to " + false);
          });
    }

    //if request is to add a new entry to the list of blocked sites, store list with new entry in local storage
    if (request.newEntry){
        console.log("enter clicked")
        //blocklist.push(request.newEntry)
        //chrome.storage.local.set({entryText: blocklist})
        chrome.storage.local.set({entryText: request.newEntry})
        console.log(request.newEntry)
    }

    //if request is to delete an entry from list of blocked sites
    if (request.deleteEntry){
        console.log("entry deleted")

        //get current blocklist from local storage
        chrome.storage.local.get(["entryText"], (result) => {
            //get index of blocklist item that is to be deleted
            const delIndex = result.entryText.indexOf(request.deleteEntry)
            
            if (delIndex > -1) { // only splice array when item is found
                //splice array and store new list in storage
                result.entryText.splice(delIndex, 1);
                chrome.storage.local.set({entryText: result.entryText})
                console.log(result.entryText)
            }
        });
    }
    
});


//On switching to a different tab
chrome.tabs.onActivated.addListener((activeInfo) => {
    setTimeout(() => {
        //Check to see if extension is on
        chrome.storage.local.get(["extOn"], (result) =>{
            console.log("Value currently is " + result.extOn);

            //Get list of sites to be blocked
            chrome.storage.local.get(["entryText"], (result2) =>{
                console.log(result2.entryText) 

                //If extension on
                if (result.extOn==true){
                    chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                        var url = tabs[0].url;
                        console.log(url);
                        var redirect = chrome.runtime.getURL("redirect.html") + '?url=' + encodeURIComponent(url)
                    
                        for (let i =0; i < result2.entryText.length; i++) {
                            if (url.includes(result2.entryText[i])){
                                chrome.tabs.update(url.id, {url: redirect});
                                redirect = "";
                            }
                        }
                        
                    });
                }
            }); 
        });
    }, 100);
    
});

//On entering a new URL
chrome.tabs.onUpdated.addListener((tabId, tab) => {

    //Check to see if extension is on
    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);
        console.log("update",tab.url)

        //Get list of sites to be blocked
        chrome.storage.local.get(["entryText"], (result2) =>{
            console.log(result2.entryText)

            //If extension on
            if (result.extOn==true){
                for (var i = 0; i < result2.entryText.length; i++){
                    if (tab.url.includes(result2.entryText[i])){
                        var redirect = chrome.runtime.getURL("redirect.html") + '?url=' + encodeURIComponent(tab.url)
                
                        if (!tab.url.includes("redirect.html?url=chrome-extension")){
                        chrome.tabs.update(tabId, {url: redirect});
                        redirect = "";
                    }
                    }

                }
            }
        });
    });
});
