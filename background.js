chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log('batchexec:', details);
        chrome.storage.sync.set({batchexec: true});
    },
    {urls: ["https://lens.google.com/*"]},
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openWithGoogleLens",  
    title: "Buscar imagen en Google Lens",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "openWithGoogleLens") {
    const imageUrl = info.srcUrl;
    const lensUrl = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageUrl)}`;

    chrome.tabs.create({url: lensUrl});
}
});
