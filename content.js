var config = {}

// Obtiene la configuración de la extensión al cargar la pagina
chrome.storage.sync.get(['configPreferences'])
    .then((result) => {
        Object.assign(config, result.configPreferences);
        barrido();
    })
    .catch(()=>{
        console.log('Error al obtener la configuración');
    })

// Obtiene la configuración de la extensión al ser cambiada
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for(let key in changes) {
        if (key === 'configPreferences') {
            let storageChange = changes[key];
            Object.assign(config, storageChange.newValue);
            barrido();
        }
    }
});



function barrido(){
    console.log(config);
    if (config) {
        if(config.estaActivo){
            let links = document.querySelectorAll('a');
            let aceptados = [];
            for (let key in config.sites) {
                if (config[key]) {
                    aceptados.push(key);
                }
            }
            // console.log(aceptados)
            links.forEach((link) => {
                let valido = false;
                aceptados.forEach((aceptado) => {
                    if (link.href.includes(aceptado)) {
                        valido = true;
                    }
                });
                if (!valido) {
                    // console.log('Ocultando link:', link);
                    link.parentNode.removeChild(link);
                }
            });
        }
    }
}
