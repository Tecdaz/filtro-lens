document.addEventListener('DOMContentLoaded', function () {
    const competitorButtons = document.querySelectorAll('.competitor-btn');
    const competitorContent = document.getElementById('competitor-content');
    const backButton = document.createElement('button');
    const saveButton = document.getElementById('botonGuardar');
    const container = document.querySelector('.container');
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

    // Cargar configuraciones guardadas al iniciar
    let config = localStorage.getItem('configPreferences');
    config = config ? JSON.parse(config) : {};

    function guardarConfiguracion() {
        // Asegurarse de recoger todos los checkboxes actuales en el contenido del competidor
        checkboxes = document.querySelectorAll('.competitor-checkbox');
        checkboxes.forEach(checkbox => {
            config[checkbox.id] = checkbox.checked;
        });
        // No olvides incluir el checkbox de 'Seleccionar Todos' si es necesario
        const selectAllCheckbox = document.querySelector('.select-all-checkbox');
        if (selectAllCheckbox) {
            config[selectAllCheckbox.id] = selectAllCheckbox.checked;
        }
        
        localStorage.setItem('configPreferences', JSON.stringify(config));
        chrome.tabs.query({}, function(tabs) {
            tabs.forEach((tab) => {
                chrome.tabs.sendMessage(tab.id, { configuracion: config }, function(response) {
                    console.log(response);
                    if(response){
                        // Mostrar mensaje de confirmación
                        messageBox.classList.add('success');
                        messageBox.textContent = 'Configuración guardada exitosamente';
                        messageBox.style.display = 'block';
                        messageBox.style.color = 'green';
                        setTimeout(() => {
                            messageBox.classList.remove('success');
                            messageBox.style.display = 'none';
                            // Volver a la pantalla anterior
                            competitorContent.classList.add('hidden');
                            document.querySelector('.competitors').classList.remove('hidden');
                            backButton.remove();
                            saveButton.classList.add('hidden');
                        }, 2000);
                    }else{
                        // Mostrar mensaje de confirmación
                        if(!messageBox.classList.contains('success')){    
                            messageBox.textContent = 'Error al guardar la configuracion, prueba nuevamente';
                            messageBox.style.display = 'block';
                            messageBox.style.color = 'red';
                        }
                        
                    }
                });
            });
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
            checkbox.checked = config[checkbox.id] || false;
        });
        // Ajustar el estado del checkbox 'Seleccionar Todos' basado en los estados individuales al cargar
        selectAllCheckbox.checked = Array.from(competitorCheckboxes).every(checkbox => checkbox.checked);
    }

    
});