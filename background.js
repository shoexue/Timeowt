console.log("hello")

chrome.tabs.onActivated.addListener((tab)=>{
    console.log(tab)
    setTimeout(() => {
        chrome.tabs.query({
            active: true,
            currentWindow: true,
        }, function(tab){
            var currentURL = tab[0].url;
            if (currentURL.includes("instagram")){
                console.log("unproductive tab true")
                chrome.tabs.remove(tab[0].id, function() { });
                chrome.tabs.create({
                    url: "https://kognity.com/"
                })
            }
        })
     }, 100);   
})


// chrome.tabs.get(tab.tabID, (currentTabData) => {
//     if (currentTabData.url.includes("youtube")){
//         console.log("true")
//     }
// })