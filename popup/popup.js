var config = {sites: {}};

const competitorsByCountry = {
    MLA: [
        // {name: 'BPR', id: 'provinciacompras.com.ar/' },
        {name: 'COT', id: 'cotodigital3.com.ar' },
        {name: 'CRA', id: 'carrefour.com.ar' },
        {name: 'DXT', id: 'dexter.com.ar/' },
        {name: 'ESY', id: 'easy.com.ar/' },
        {name: 'FMC', id: 'farmacity.com/' },
        {name: 'FVG', id: 'fravega.com' },
        {name: 'JUA', id: 'juleriaque.com.ar/' },
        {name: 'JUM', id: 'jumbo.com.ar/' },
        {name: 'MGT', id: 'megatone.net/' },
        {name: 'MUS', id: 'musimundo.com/' },
        {name: 'SCA', id: 'stockcenter.com.ar/' },
        {name: 'SDA', id: 'solodeportes.com.ar/' },
        {name: 'SMA', id: 'shop.samsung.com/ar/' },
        {name: 'SPL', id: 'sportline.com.ar/' },
        { name: 'MLA', id: 'mercadolibre.com.ar'},
        { name: 'AMA', id: 'amazon.com/'},
        { name: 'ALL', id: 'selectAll'}
    ],
    MLB: [
        { name: 'ADB', id: 'adidas.com.br' },
        { name: 'ALB', id: 'aliexpress.com' },
        { name: 'AMB', id: 'amazon.com.br' },
        { name: 'AMR', id: 'americanas.com.br' },
        { name: 'CBH', id: 'casasbahia.com.br' },
        { name: 'CEN', id: 'centauro.com.br' },
        { name: 'CMB', id: 'mercado.carrefour.com.br' },
        { name: 'DAF', id: 'dafiti.com.br' },
        { name: 'EXT', id: 'extra.com.br' },
        { name: 'FAS', id: 'fastshop.com.br' },
        { name: 'LMN', id: 'leroymerlin.com.br' },
        { name: 'MDR', id: 'madeiramadeira.com.br' },
        { name: 'MGL', id: 'magazineluiza.com.br' }, 
        { name: 'NET', id: 'netshoes.com.br' },
        { name: 'PAO', id: 'paodeacucar.com' },
        { name: 'RNN', id: 'lojasrenner.com.br' },
        { name: 'SHN', id: 'br.shein.com' },
        { name: 'SMB', id: 'shop.samsung.com/br' },
        { name: 'ZAT', id: 'zattini.com.br' },
        { name: 'BWB', id: 'belezanaweb.com.br/' },
        { name: 'TEB', id: 'temu.com/br/' },
        { name: 'CAB', id: 'camicado.com.br/' },

        { name: 'MLB', id: 'mercadolivre.com.br' },
        { name: 'ALL', id: 'selectAll'}

    ],
    MLC: [
        {name: 'FBC', id: 'falabella.com/falabella-cl' },
        {name: 'WAC', id: 'lider.cl/' },
        {name: 'PRS', id: 'paris.cl' },
        {name: 'RIP', id: 'simple.ripley.cl' },
        {name: 'SHC', id: 'cl.shein.com/' },
        { name: 'MLC', id: 'mercadolibre.cl' },
        { name: 'ALL', id: 'selectAll'}

    ],
    MCO: [
        {name: 'ALK', id: 'alkosto.com/' },
        {name: 'ALO', id: 'es.aliexpress.com/' },
        {name: 'EXI', id: 'exito.com' },
        {name: 'FBO', id: 'falabella.com.co/falabella-co' },
        {name: 'MER', id: 'merqueo.com/' },
        {name: 'SHO', id: 'shein.com.co/' },
        { name: 'AMO', id: 'amazon.com/'},
        { name: 'MCO', id: 'mercadolibre.com.co' },
        { name: 'ALL', id: 'selectAll'}
    ],
    MLM: [
        { name: 'ADM', id: 'adidas.mx' },
        { name: 'ALM', id: 'aliexpress.com' },
        { name: 'AMX', id: 'amazon.com.mx' },
        { name: 'CNV', id: 'converse.com.mx' },
        { name: 'COP', id: 'coppel.com' },
        { name: 'HDP', id: 'homedepot.com.mx' },
        { name: 'INN', id: 'innovasport.com' },
        { name: 'LIV', id: 'liverpool.com.mx' },
        { name: 'PDH', id: 'elpalaciodehierro.com/' },
        { name: 'SHM', id: 'shein.com.mx' },
        { name: 'SMM', id: 'samsung.com/mx' },
        { name: 'TEMU', id: 'temu.com/mx'},
        { name: 'WAL', id: 'walmart.com.mx' },
        { name: 'WAS', id: 'super.walmart.com.mx' },
        { name: 'EKM', id: 'elektra.mx/' },
        { name: 'BOM', id: 'bodegaaurrera.com.mx/' },
        { name: 'MLM', id: 'mercadolibre.com.mx' },
        { name: 'ALL', id: 'selectAll'}

    ],
    MPE: [
        { name: 'FBP', id: 'falabella.com.pe/falabella-pe' },
        { name: 'MPE', id: 'mercadolibre.com.pe' },
        { name: 'ALL', id: 'selectAll'}
    ],
    MLU: [
        {name: 'TMU', id: 'tiendamia.com/uy/' },
        { name: 'MLU', id: 'mercadolibre.uy' },
        { name: 'ALL', id: 'selectAll'}
    ]
};

// Cargar configuraciones guardadas al iniciar
chrome.storage.sync.get(['configPreferences'])
    .then((result) => {
        // Si no hay configuraciones guardadas, se crea una nueva
        if (!result.configPreferences) {
            Object.assign(config, { estaActivo: true, sites: {} });
            chrome.storage.sync.set({ configPreferences: config });
        }else{
            Object.assign(config, result.configPreferences);
        }
        renderizarActivos();
    })

function competidoresActivos(pais){
    const competidores = competitorsByCountry[pais];
    let cantActivos = 0;
    competidores.forEach(function(competidor){
        const site = competidor.id;
        if(site !== 'selectAll' && config.sites[site]){
            cantActivos++;
        }
    });

    return cantActivos;
}

function renderizarActivos(){
    let competidoresPais = document.querySelectorAll('.competitor-btn');
    competidoresPais.forEach(function(competidor){
        let pais = competidor.getAttribute('data-competitor');
        if(pais){
            let cantActivos = competidoresActivos(pais);
            competidor.textContent = `${pais} (${cantActivos})`;
            competidor.classList.toggle('btn-borde', cantActivos > 0);
        }
    });
}



document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');

    // Renderiza la cantidad de competidores activos
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for(let key in changes) {
            if (key === 'configPreferences') {
                renderizarActivos();
            }
        }
    });
    renderizarActivos();

    // Configuración del boton de estado
    const botonEstado = document.getElementById('estado-activo');

    // Evita errores visuales cuando carga el html antes del JS
    if(config.estaActivo === undefined){
        this.location.reload();
    }

    // Estado al ser renderizado el popup
    if(config.estaActivo){
        botonEstado.classList.add('activo');
        botonEstado.textContent = 'Activa';
    }else{
        botonEstado.classList.remove('activo');
        botonEstado.style.color = 'red';
        botonEstado.textContent = 'Desactivada';
        container.classList.add('hidden');
    }

    // Estado al ser clickeado
    botonEstado.addEventListener('click', () => {
        botonEstado.classList.toggle('activo');
        if(botonEstado.classList.contains('activo')){ // Se encontraba desactivado
            config['estaActivo'] = true;
            botonEstado.style.color = 'green';
            botonEstado.textContent = 'Activa';
            if(container.classList.contains('hidden')){
                container.classList.remove('hidden');
            }
        }else{                                        //Se encontraba activado
            config['estaActivo'] = false;
            botonEstado.style.color = 'red';
            botonEstado.textContent = 'Desactivada';
            container.classList.add('hidden');
        }
        chrome.storage.sync.set({ configPreferences: config });
    });


    const competitorButtons = document.querySelectorAll('.competitor-btn');
    const competitorContent = document.getElementById('competitor-content');
    const backButton = document.createElement('button');
    const messageBox = document.createElement('div');

    // Inicialización del mensaje de confirmación
    messageBox.classList.add('message-box');
    messageBox.style.display = 'none';
    container.appendChild(messageBox);

    // Configuración del botón "Volver atrás"
    backButton.textContent = 'Volver atrás';
    backButton.classList.add('competitor-btn');
    backButton.addEventListener('click', () => {
        messageBox.style.display = 'none';
        competitorContent.classList.add('hidden');
        document.querySelector('.competitors').classList.remove('hidden');
        backButton.remove();
    });

    competitorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const country = button.getAttribute('data-competitor');
            updateCompetitorContent(country);
            competitorContent.classList.remove('hidden');
            document.querySelector('.competitors').classList.add('hidden');
            container.insertBefore(backButton, container.lastElementChild);
        });
    });

    let checkboxes;

    function guardarConfiguracion() {
        // Asegurarse de recoger todos los checkboxes actuales en el contenido del competidor
        checkboxes = document.querySelectorAll('.button-config');
        // obtiene los sitios guardados en la configuración
        let sites = config.sites || {};
        checkboxes.forEach(checkbox => {
            sites[checkbox.id] = checkbox.classList.contains('active');
        });

        config.sites = sites;

        chrome.storage.sync.set({ configPreferences: config })
        .then(() => {
            console.log({config});
        })
        .catch(() => {
            if(!messageBox.classList.contains('success') && !competitorContent.classList.contains('hidden')){
                messageBox.textContent = 'Error al guardar la configuracion, prueba nuevamente';
                messageBox.style.display = 'block';
                messageBox.style.color = 'red';
                setTimeout(() => {
                    messageBox.style.display = 'none';
                }, 3000);
            }
        });
    }
    
    
    function updateCompetitorContent(country) {
        const competitors = competitorsByCountry[country] || [];
        competitorContent.innerHTML = competitors.map(comp => {
            if (comp.name === "ALL") {
                return `
                    <button class="competitor-btn select-all-checkbox" id="${comp.id}">${comp.name}</button>  
                `;
            } else {
                return `
                    <button class="competitor-btn button-config" id="${comp.id}">${comp.name}</button>     
                `;
            }
        }).join('');

        // Agregar funcionalidad para manejar la selección de todos los checkboxes
        const selectAllCheckbox = document.querySelector('.select-all-checkbox');
        const competitorCheckboxes = document.querySelectorAll('.button-config');

        // Funcion para gurdar la configuración al hacer click en un boton
        competitorCheckboxes.forEach(button => {
            button.addEventListener('click', () => {
                    button.classList.toggle('active');
                    const isActive = button.classList.contains('active');
                    if(!isActive){
                        selectAllCheckbox.classList.toggle('active', isActive);
                    }
                    guardarConfiguracion();
            });
        });

        // Funcion para guardar la configuración al hacer click en el boton de seleccionar todos
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('click', () => {
                selectAllCheckbox.classList.toggle('active');
                const isActive = selectAllCheckbox.classList.contains('active');
                competitorCheckboxes.forEach(checkbox => {
                    checkbox.classList.toggle('active', isActive);
                });
                guardarConfiguracion();
            });
        }

        // Restaurar estados guardados para cada checkbox
        competitorCheckboxes.forEach(checkbox => {
            checkbox.classList.toggle('active', config.sites[checkbox.id] || false);
        });

        // Ajustar el estado del checkbox 'Seleccionar Todos' basado en los estados individuales al cargar
        selectAllCheckbox.classList.toggle("active", Array.from(competitorCheckboxes).every(checkbox => checkbox.classList.contains('active')));
    }
});