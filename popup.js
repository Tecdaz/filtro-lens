var config = {};
// Cargar configuraciones guardadas al iniciar
chrome.storage.sync.get(['configPreferences'])
    .then((result) => {
        Object.assign(config, result.configPreferences);
    })


document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');

    // Configuración del boton de estado
    const botonEstado = document.getElementById('estado-activo');
    console.log(config);

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
        console.log(config);
        chrome.storage.sync.set({ configPreferences: config });
    });


    const competitorButtons = document.querySelectorAll('.competitor-btn');
    const competitorContent = document.getElementById('competitor-content');
    const backButton = document.createElement('button');
    const saveButton = document.getElementById('botonGuardar');
    const messageBox = document.createElement('div');

    // Inicialización del mensaje de confirmación
    messageBox.classList.add('message-box');
    messageBox.style.display = 'none';
    container.appendChild(messageBox);

    const competitorsByCountry = {
        MLA: [
            { name: 'COT', id: 'cotodigital3.com.ar' },
            { name: 'CRA', id: 'carrefour.com.ar' },
            { name: 'CTR', id: 'cetrogar.com.ar' },
            { name: 'FVG', id: 'fravega.com' },
            { name: 'JUM', id: 'jumbo.com.ar' },
            { name: 'MUS', id: 'musimundo.com' },
            { name: 'ESY', id: 'easy.com.ar' },
            { name: 'DXT', id: 'dexter.com.ar' },
            { name: 'MGT', id: 'megatone.net' },
            { name: 'FMC', id: 'farmacity.com' },
            { name: 'BPR', id: 'provinciacompras.com.ar' },
            { name: 'SMA', id: 'shop.samsung.com/ar' },
            { name: 'SDA', id: 'solodeportes.com.ar' },
            { name: 'SPL', id: 'sportline.com.ar' },
            { name: 'ALL', id: 'selectAll'}
        ],
        MLB: [
            { name: 'ADB', id: 'adidas.com.br' },
            { name: 'ALB', id: 'pt.aliexpress.com' },
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
            { name: 'SPE', id: 'shopee.com.br' },
            { name: 'ZAT', id: 'zattini.com.br' },
            { name: 'ALL', id: 'selectAll'}

        ],
        MLC: [
            { name: 'FBC', id: 'falabella.com/falabella-cl' },
            { name: 'LIS', id: 'lider.cl/supermercado' },
            { name: 'LNC', id: 'linio.cl' },
            { name: 'PRS', id: 'paris.cl' },
            { name: 'RIP', id: 'simple.ripley.cl' },
            { name: 'SPC', id: 'shopee.cl' },
            { name: 'ALL', id: 'selectAll'}

        ],
        MCO: [
            { name: 'ALK', id: 'alkosto.com' },
            { name: 'EXI', id: 'exito.com' },
            { name: 'FBO', id: 'falabella.com.co/falabella-co' },
            { name: 'MER', id: 'merqueo.com' },
            { name: 'OLI', id: 'olimpica.com' },
            { name: 'SPO', id: 'shopee.com.co' },
            { name: 'ALO', id: 'es.aliexpress.com' },
            { name: 'ALL', id: 'selectAll'}

        ],
        MLM: [
            { name: 'ALM', id: 'aliexpress.com' },
            { name: 'AMX', id: 'amazon.com.mx' },
            { name: 'COP', id: 'coppel.com' },
            { name: 'WAL', id: 'walmart.com.mx' },
            { name: 'WAS', id: 'super.walmart.com.mx' },
            { name: 'CNV', id: 'converse.com.mx' },
            { name: 'SPM', id: 'shopee.com.mx' },
            { name: 'LIV', id: 'liverpool.com.mx' },
            { name: 'SHM', id: 'shein.com.mx' },
            { name: 'ADM', id: 'adidas.mx' },
            { name: 'SMM', id: 'samsung.com/mx' },
            { name: 'INN', id: 'innovasport.com' },
            { name: 'HDP', id: 'homedepot.com.mx' },
            { name: 'PDH', id: 'elpalaciodehierro.com' },
            { name: 'ALL', id: 'selectAll'}

        ],
        MPE: [
            { name: 'FBP', id: 'falabella.com.pe/falabella-pe' },
            { name: 'ALL', id: 'selectAll'}

        ]
    };

    // Configuración del botón "Volver atrás"
    backButton.textContent = 'Volver atrás';
    backButton.classList.add('competitor-btn');
    backButton.addEventListener('click', () => {
        messageBox.style.display = 'none';
        competitorContent.classList.add('hidden');
        document.querySelector('.competitors').classList.remove('hidden');
        backButton.remove();
        saveButton.classList.add('hidden');
    });

    competitorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const country = button.getAttribute('data-competitor');
            updateCompetitorContent(country);
            competitorContent.classList.remove('hidden');
            document.querySelector('.competitors').classList.add('hidden');
            container.insertBefore(backButton, container.lastElementChild);
            saveButton.classList.remove('hidden');
        });
    });

    // Esconde el botón de guardar inicialmente
    saveButton.classList.add('hidden');

    // Funcionalidad de guardar configuración
    document.getElementById('botonGuardar').addEventListener('click', guardarConfiguracion);

    let checkboxes;

    function guardarConfiguracion() {
        // Asegurarse de recoger todos los checkboxes actuales en el contenido del competidor
        checkboxes = document.querySelectorAll('.competitor-checkbox');
        // obtiene los sitios guardados en la configuración
        let sites = config.sites || {};
        checkboxes.forEach(checkbox => {
            sites[checkbox.id] = checkbox.checked;
        });
        // No olvides incluir el checkbox de 'Seleccionar Todos' si es necesario
        const selectAllCheckbox = document.querySelector('.select-all-checkbox');
        if (selectAllCheckbox) {
            sites[selectAllCheckbox.id] = selectAllCheckbox.checked;
        }

        config.sites = sites;

        chrome.storage.sync.set({ configPreferences: config })
        .then(() => {
            messageBox.classList.add('success');
            messageBox.textContent = 'Configuración guardada exitosamente';
            messageBox.style.display = 'block';
            messageBox.style.color = 'green';

            // Remueve los botones para evitar comportamientos inesperados
            backButton.remove();
            saveButton.classList.add('hidden');

            setTimeout(() => {
                messageBox.classList.remove('success');
                messageBox.style.display = 'none';
                // Volver a la pantalla anterior
                competitorContent.classList.add('hidden');
                document.querySelector('.competitors').classList.remove('hidden');
            }, 2000);
        })
        .catch(() => {
            if(!messageBox.classList.contains('success') && !competitorContent.classList.contains('hidden')){
                messageBox.textContent = 'Error al guardar la configuracion, prueba nuevamente';
                messageBox.style.display = 'block';
                messageBox.style.color = 'red';
            }
        });
    }
    
    
    function updateCompetitorContent(country) {
        const competitors = competitorsByCountry[country] || [];
        competitorContent.innerHTML = competitors.map(comp => {
            if (comp.name === "ALL") {
                return `
                    <div class="item">
                        <p>${comp.name}</p>
                        <input type="checkbox" name="${comp.name}" id="${comp.id}" class="select-all-checkbox">
                    </div>
                `;
            } else {
                return `
                    <div class="item">
                        <p>${comp.name}</p>
                        <input type="checkbox" name="${comp.name}" id="${comp.id}" class="competitor-checkbox">
                    </div>
                `;
            }
        }).join('');

        // Agregar funcionalidad para manejar la selección de todos los checkboxes
        const selectAllCheckbox = document.querySelector('.select-all-checkbox');
        const competitorCheckboxes = document.querySelectorAll('.competitor-checkbox');

        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function () {
                competitorCheckboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });
        }

        // Restaurar estados guardados para cada checkbox
        competitorCheckboxes.forEach(checkbox => {
            checkbox.checked = config.sites[checkbox.id] || false;
        });
        // Ajustar el estado del checkbox 'Seleccionar Todos' basado en los estados individuales al cargar
        selectAllCheckbox.checked = Array.from(competitorCheckboxes).every(checkbox => checkbox.checked);
    }

    
});