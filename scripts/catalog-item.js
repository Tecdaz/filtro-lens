
itemid = document.querySelector("input[name='item_id']").value;

fetch(`https://api.mercadolibre.com/items/${itemid}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    let catalog = data.catalog_listing;
    // Hacer la funcion 5 veces
    whileImplementation(catalog);
});

async function whileImplementation(catalog){
    let init = 0;
    let end = 5000;
    let interval = 200;
    for(let i = init; i < end; i+=interval){
        let categorization = await getCatalogCategorization();
        if (!categorization) {
            await insertCategorization(catalog);
        }

        await new Promise(resolve => setTimeout(resolve, interval));
    }
    
}

function getCatalogCategorization(){
    let type = document.querySelector("#catalog-categorization");
    if(type != null){
        return true;
    }
    return false;
};

function insertCategorization(catalog){
    const container = document.querySelector('.ui-pdp-header');
    let type = document.createElement("div");
    type.id = "catalog-categorization";
    // agregar en la segunda posicion
    container.appendChild(type);
    
    //Agregarlo como hermano de un nodo
    let content = '';
    let color = '';
    if(catalog){
        content = "Buy Box - ( producto )";
        color = "orange";
    }
    else{
        content = "1P ( articulo )";
        color = "green";
    }
    type.textContent = content;
    type.style.backgroundColor = color;
    type.style.color = "white";
    type.style.padding = "5px";
    type.style.borderRadius = "5px"; 
    type.style.width = "fit-content";
    type.ariaDescription = "Categorización de catalogo";
}