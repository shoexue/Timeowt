console.log("hello")

//add listener to check if extension has been turned on (received request from popup js)
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


//add listener to check if extension is on or off each time the user switches to a tab
chrome.tabs.onActivated.addListener((tab)=>{
    chrome.storage.local.get(["extOn"], (result) => {
        console.log("Value currently is " + result.extOn);

        //if extension on, block tabs
        if (result.extOn==true){
            console.log("confirmed");
            setTimeout(() => {
                chrome.tabs.query({
                    active: true,
                    currentWindow: true,
                }, function(tab){
                    var currentURL = tab[0].url;
                    console.log(currentURL)
                    if (currentURL.includes("instagram")){
                        console.log("unproductive tab true")
                        chrome.tabs.remove(tab[0].id, function() { });
                        chrome.tabs.create({
                            url: "https://kognity.com/"
                        })
                    }
                })
             }, 100);
        }else{
            //if extension off, do not block anything
            console.log("not running")
        }
            
    });
    console.log(tab)
    
})

