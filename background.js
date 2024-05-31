chrome.webRequest.onCompleted.addListener(
    function(details) {
        if(details.url.includes("batchexec")){
            console.log('batchexec:', details);
            chrome.storage.sync.set({batchexec: true});
        }
    },
    {urls: ["https://lens.google.com/*"]},
);
  
