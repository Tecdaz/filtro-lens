chrome.webRequest.onCompleted.addListener(
    function(details) {
        console.log('batchexec:', details);
        chrome.storage.sync.set({batchexec: true});
    },
    {urls: ["https://lens.google.com/*"]},
);

chrome.commands.onCommand.addListener(function(command) {
    console.log('Comando:', {command});
    if (command === "close-other-tabs") {
      // Obtener todas las pestañas abiertas
      chrome.tabs.query({}, function(tabs) {
        console.log(tabs);
        // Obtener el ID de la pestaña actual
        chrome.tabs.query({active: true, currentWindow: true}, function(currentTab) {
          let currentTabId = currentTab[0].id;
          
          // Iterar sobre todas las pestañas
          tabs.forEach(function(tab) {
            // Si la pestaña no es la actual, cerrarla
            if (tab.id !== currentTabId) {
              console.log('Cerrando pestaña:', {tab});
              chrome.tabs.remove(tab.id);
            }
          });
        });
      });
    }
});

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

chrome.commands.getAll(function(commands) {
    console.log('Comandos:', commands);
});