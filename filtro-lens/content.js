

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.configuracion) {
        console.log('Opción seleccionada en el popup:', request.configuracion);
        localStorage.setItem('configPreferences', JSON.stringify(request.configuracion));
        barrido();
        sendResponse({ status: 'Opción recibida y manejada' });
    }
});



function barrido(){
    let config = localStorage.getItem('configPreferences');
    console.log(config);
    if (config) {
        let links = document.querySelectorAll('a');
        let aceptados = [];
        config = JSON.parse(config);
        for (let key in config) {
            if (config[key]) {
                aceptados.push(key);
            }
        }
        console.log(aceptados)
        links.forEach((link) => {
            let valido = false;
            aceptados.forEach((aceptado) => {
                if (link.href.includes(aceptado)) {
                    valido = true;
                }
            });
            if (!valido) {
                console.log('Ocultando link:', link);
                link.parentNode.removeChild(link);
            }
        });
    }
}

setInterval(barrido, 1000);
