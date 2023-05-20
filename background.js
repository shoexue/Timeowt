//var blocklist = []

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.activateBackgroundJS) {
        console.log("extension on");
        //if request is to activate background, store local data that the extension is on
        chrome.storage.local.set({ extOn: true }).then(() => {
            console.log("Value is set to " + true);
          });
    } else {
        console.log("extension off");
        //if request is to deactivate background, store local data that the extension is off
        chrome.storage.local.set({ extOn: false }).then(() => {
            console.log("Value is set to " + false);
          });
    }
    if (request.newEntry){
        console.log("enter clicked")
        //blocklist.push(request.newEntry)
        //chrome.storage.local.set({entryText: blocklist})
        chrome.storage.local.set({entryText: request.newEntry})
        console.log(request.newEntry)
    }
});


chrome.tabs.onActivated.addListener((activeInfo) => {

    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);

        chrome.storage.local.get(["entryText"], (result2) =>{
            console.log(result2.entryText) 

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
    
});


chrome.tabs.onUpdated.addListener((tabId, tab) => {
    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);
        console.log("update",tab.url)

        chrome.storage.local.get(["entryText"], (result2) =>{
            console.log(result2.entryText)

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
