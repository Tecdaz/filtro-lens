let newLocation = location.href;
let refresh = false;

let regex = /https:\/\/(.+)\.aliexpress/
let match = regex.exec(location.href);
if(match){
    console.log(match);
    if(match[1] !== 'es' && match[1] !== 'www' && match[1] !== 'pt'){
        console.log('Changing language to Spanish');
        newLocation = newLocation.replace(match[1], 'es');
        refresh = true;
    }
}

if(refresh){
    location.href = newLocation;
}
