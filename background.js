chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log('batchexec:', details);
        chrome.storage.sync.set({batchexec: true});
    },
    {urls: ["https://lens.google.com/*"]},
);
  
