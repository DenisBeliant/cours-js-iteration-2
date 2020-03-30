
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */

function load_components() {

    console.log("Chargement des données de la page");
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    $.get('/objects', function (data) {

        for (let e of data.objects) {

            add_line_to_table(e);

        }

    });
}

function load_modale(serial) {

    console.log(serial);
    serial = "OBJ_009";

    $.get('/object/full/' + serial, function (d) {

        console.log(d.default_image);

        $("#serie-modal").append('Petit animal gentil');
        $("#type-modal").append('Animal à quatre pattes');
        $("#image-modal").children().attr('src', 'https://file1.science-et-vie.com/var/scienceetvie/storage/images/1/0/9/109824/pangolin-eteau-resserre-dans-enquete-sur-origine-coronavirus.jpg?alias=exact1024x768_l&size=x100&format=webp');
        $('#status-modal').attr('class', 'card bg-success');
    
    });

};

function test_update_modale() {
    $("#serie-modal").append('Petit animal gentil');
    $("#type-modal").append('Animal à quatre pattes');
    $("#image-modal").children().attr('src', 'https://file1.science-et-vie.com/var/scienceetvie/storage/images/1/0/9/109824/pangolin-eteau-resserre-dans-enquete-sur-origine-coronavirus.jpg?alias=exact1024x768_l&size=x100&format=webp');
    $('#status-modal').attr('class', 'card bg-success');
}


function loadDefautPic(data) {

    $.get('/object/full/' + data.serial, function (d) {

        Object.assign(data, { 'image': d.default_image });

        $('td:contains(' + data.serial + ')').next().children().attr('src', '/static/images/' + data.image);


        // Vanilla !
        // let r = document.getElementsByTagName('td');

        // for(let e = 0; e < r.length -1; e++) {

        //     if(r[e].innerHTML.indexOf(data.serial) !== -1) {

        //         r[e + 1].innerHTML = `<img src="/static/images/${data.image}" width="40px" height="40px"/>`;
        //         break;
        //     }

        // }

    });

}

function add_line_to_table(data) {

    if (data.image == undefined) loadDefautPic(data);

    let line = `<tr>
    <td>'${data.serial}'</td>
    <td><img src="/static/images/${data.image}" width="40px" height="40px"/></td>
    <td>${data.description}</td>
    <td><input type="checkbox" ${(data.status) ? 'checked' : ''} /></td>
    <td><div class="content" id="content_div">
    <input type="button" class="btn-danger" value="Détails"  id="${data.serial}"/>
</div></td>
</tr>`;

    $(`#${data.serial}`).click(function () {
        console.log("tu as cliqué");
        load_modale(this);
    });

    // data-toggle="modal" data-target="#modal-details"
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
        "provisionning": {
            "date": "2020-03-20",
            "operator": "JPA"
        }
    };
}


