chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.activateBackgroundJS) {
        console.log("extension on");
        //if request is to activate background, store local data that the extension is on
        chrome.storage.local.set({ extOn: true }).then(() => {
            console.log("Value is set to " + true);
          });
    // } else if(request.inst){
    //     chrome.storage.local.set({ instOn: true }).then(() => {
    //         console.log("inst checked")
    //       });
    // }else if(request.inst==false){
    //     chrome.storage.local.set({ instOn: false }).then(() => {
    //         console.log("inst unchecked")
    //       });
    } else {
        console.log("extension off");
        //if request is to deactivate background, store local data that the extension is off
        chrome.storage.local.set({ extOn: false }).then(() => {
            console.log("Value is set to " + false);
          });
    }
    if (request.newEntry){
        console.log("enter clicked")
        chrome.storage.local.set({entryText: request.newEntry})
        console.log(request.newEntry)
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
                var redirect = chrome.runtime.getURL("redirect.html") + '?url=' + encodeURIComponent(url)
                fetch('blocklist.json')
                .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
                .then(data => showInfo(data));
               
                function showInfo(data){
                    console.log(Object.keys(data));
                    console.log("lenth"+Object.keys(data).length)
                    for (let i =0; i < Object.keys(data).length; i++) {
                        if (url.includes(data[i])){
                            chrome.tabs.update(url.id, {url: redirect});
                            redirect = "";
                        }
                        console.log(data[i]+"data")


                    }
                }

                // if (url.includes("instagram.com")){
                //     chrome.tabs.update(url.id, {url: redirect});
                //     redirect = "";
                    
                // }
            });
        }
    });
    
});
chrome.tabs.onUpdated.addListener((tabId, tab) => {
    chrome.storage.local.get(["extOn"], (result) =>{
        console.log("Value currently is " + result.extOn);
        console.log("update",tab.url)
        if (result.extOn==true){

            fetch("blocklist.json")
            .then((response) => response.json())
            .then((data) => showInfo(data));
       
             function showInfo(data){
                console.log(data +"data")
                 blocklist = data
                 console.log(data["website"] + "blocked lists")
                 console.log(data.length)
                 for (var i = 0; i < Object.keys(data).length; i++){
                    if (tab.url.includes(data[i])){
                        var redirect = chrome.runtime.getURL("redirect.html") + '?url=' + encodeURIComponent(tab.url)
                   
                        if (!tab.url.includes("redirect.html?url=chrome-extension")){
                          chrome.tabs.update(tabId, {url: redirect});
                         redirect = "";
                      }
                    }
   
                 }
             }
            // if (tab.url && tab.url.includes("instagram")){
            //     console.log("check",tab.url)

            //     var redirect = chrome.runtime.getURL("redirect.html") + '?url=' + encodeURIComponent(tab.url)
                
            //     if (!tab.url.includes("redirect.html?url=chrome-extension")){
            //         chrome.tabs.update(tabId, {url: redirect});
            //         redirect = "";
            //     }


                
            // }
        }
    });
    
});

