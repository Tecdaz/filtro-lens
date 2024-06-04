var config = {}
chrome.storage.sync.set({batchexec: false});

const interval = setInterval(barrido2, 500);
    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
document.addEventListener('DOMContentLoaded', () =>{
    console.log('DOM cargado');  
});

// Obtiene la configuración de la extensión al cargar la pagina
chrome.storage.sync.get(['configPreferences'])
    .then((result) => {
        if(!result.configPreferences){
            Object.assign(config, {estaActivo: false, sites: {}});
        }else{
            Object.assign(config, result.configPreferences);
        }
        barrido2();
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
            barrido2();
        }
        // Si se detecta que se ejecutó el batchexec, se ejecuta el barrido
        if(key === 'batchexec' && changes[key].newValue === true){
            barrido2();
            chrome.storage.sync.set({batchexec: false});
        }
    }
});

// Función que valida si un item de la lista es un link válido
function validar(item){
    let link = item.querySelector('a');
    if(link){
        let valido = false;
        for (let key in config.sites) {
            if (config.sites[key]) {
                if (link.href.includes(key)) {
                    valido = true;
                    break;
                }
            }
        }
        if (!valido) {
            item.style.display = 'none';
        }else{
            // Restaura items ocultos si se cambia la configuración
            if(item.style.display === 'none'){
                if(item.type === 'li'){
                    item.style.display = 'list-item';
                }else{
                    item.style.display = 'block';
                }
            }
        }
    }
}

function barrido2(){
    console.log('Barrido');
    let lista =  document.querySelector('ul');
    let listaDivs = document.querySelectorAll('.G19kAf');
    if(config.estaActivo){
        listaDivs.forEach((item) => validar(item));
    }else{
        listaDivs.forEach((item) => item.style.display = 'block');
    }
    

    if(lista){
        let items = lista.querySelectorAll('li');
        if(config.estaActivo){
            items.forEach(item => validar(item));
        }else{
            items.forEach(item => item.style.display = 'list-item');
        } 
    }
    // Configurar el observador de mutaciones para la lista de resultados exactos
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Iterar a través de las mutaciones
        for(let mutation of mutationsList) {
            // Verificar si se agregaron nodos
            if (mutation.type === 'childList') {
                // Iterar a través de los nodos agregados
                mutation.addedNodes.forEach(function(node) {
                    // Verificar si el nodo agregado es un elemento
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // El elemento ha sido agregado a la lista
                        validar(node);
                    }
                });
            }
        }
    });
    const observerConfig = { childList: true };

    // Iniciar la observación del elemento de la lista con las opciones configuradas
    if(lista && config.estaActivo){
        observer.observe(lista, observerConfig);
    }
}
