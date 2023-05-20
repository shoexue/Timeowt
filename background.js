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
});


chrome.tabs.onActivated.addListener((activeInfo) => {

    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);

        if (result.extOn==true){
            console.log("confirmed");

            chrome.tabs.query({'active': true, 'lastFocusedWindow': true, 'currentWindow': true}, function (tabs) {
                var url = tabs[0].url;
                console.log(url);
                var redirect = chrome.runtime.getURL("new.html") + '?url=' + encodeURIComponent(url)

                if (url.includes("instagram.com")){
                    chrome.tabs.update(url.id, {url: redirect});
                    redirect = "";
                    
                }
            });
        }
    });
    
});
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);
        console.log("update",tab.url)
        if (result.extOn==true){

            if (tab.url && tab.url.includes("instagram")){
                console.log("check",tab.url)

                var redirect = chrome.runtime.getURL("new.html") + '?url=' + encodeURIComponent(tab.url)
                
                if (!tab.url.includes("new.html?url=chrome-extension")){
                    chrome.tabs.update(tabId, {url: redirect});
                    redirect = "";
                }


                
            }
        }
    });
    
});

