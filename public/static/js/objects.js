
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */

function load_components() {
    console.log("Chargement des données de la page");
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    $.get('/objects', function(data) { 

        for(let e of data.objects) {

         add_line_to_table(e);
        }
   
    });
}

function loadDefautPic(data) {

    $.get('/object/full/'+data.serial, function(d) {

        Object.assign(data, {'image':d.default_image});
        console.log(data.image);
        $('td:contains('+data.serial+')').next().children().attr('src', '/static/images/'+data.image);
        console.log(document.getElementsByTagName(`td:contains(${data.serial})`).nextSibling);
       });

}

function add_line_to_table(data) {

    if(data.image == undefined) loadDefautPic(data);
    
    let line = `<tr>
    <td>'${data.serial}'</td>
    <td><img src="/static/images/${data.image}" width="40px" height="40px"/></td>
    <td>${data.description}</td>
    <td><input type="checkbox" ${(data.status) ? 'checked' : ''} /></td>
    <td><input type="button" value="Détails" class="btn-outline-warning"/></td>
</tr>`;


// In JS :
// document.getElementById('table_body').innerHTML += line;

// In Jquery baby !
$('#table_body').append(line);

}
// Solution 1 :
// load_components();

function test_add_line() {
    return data = {
        "serial": "OBJ_001",
        "type": "raspberry_TH",
        "image": "raspberry-pi-4.jpg",
        "description": "Capteur de température et d'humidité de la salle de cours du Campus de Chambéry",
        "location": "45.644065, 5.867810",
        "refresh": 5,
        "status": true,
        "provisionning":{
            "date": "2020-03-20",
            "operator": "JPA"
        }
    };
}


