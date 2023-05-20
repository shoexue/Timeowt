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


async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    console.log(tab)
    return tab;
  }
    //     console.log(tab)

// chrome.tabs.onActivated.addListener((tab)=>{
//     console.log(tab)
//     setTimeout(() => {
//         chrome.tabs.query({
//             active: true,
//             currentWindow: true,
//         }, function(tab){
//             var currentURL = tab[0].url;
//             if (currentURL.includes("instagram")){
//                 console.log("unproductive tab true")
//                 chrome.tabs.remove(tab[0].id, function() { });
//                 chrome.tabs.create({
//                     url: "https://kognity.com/"
//                 })
//             }
//         })
//      }, 100);   
// })

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// chrome.tabs.get(tab.tabID, (currentTabData) => {
//     if (currentTabData.url.includes("youtube")){
//         console.log("true")
//     }
// })