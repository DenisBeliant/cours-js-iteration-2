
/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */

// function test_update_modale() {
//     $("#serie-modal").append('Petit animal gentil');
//     $("#type-modal").append('Animal à quatre pattes');
//     $("#image-modal").children().attr('src', 'https://file1.science-et-vie.com/var/scienceetvie/storage/images/1/0/9/109824/pangolin-eteau-resserre-dans-enquete-sur-origine-coronavirus.jpg?alias=exact1024x768_l&size=x100&format=webp');
//     $('#status-modal').attr('class', 'card bg-success');
// }


function load_components() {

    console.log("Chargement des données de la page");
    // Ajouter ici le code permettant de charger dynamiquement les éléments de la page
    $.get('/objects', function (data) {

        for (let e of data.objects) {

            add_line_to_table(e);

        }

    });
}

function load_modale(balise) {

    $.get('/object/full/' + balise, function (d) {

        // Vidage de la map pour ne pas quelle bug..
        let mymap;
        var container = L.DomUtil.get('google-api'); if(container != null){ container._leaflet_id = null; }

        console.log(d);

        // Info :
        $("#serie-modal").html(`Numéro de série : ${d.serial}`);
        $("#type-modal").html(`Description : ${d.description}`);
        $("#image-modal").children().attr('src', `/static/images/${d.default_image}`);
        if (d.status) {
            $('#status-modal').attr('class', 'card bg-success');
            $('#status-modal').html(' Connecté');
        }
        else {
            $('#status-modal').attr('class', 'card bg-danger');
            $('#status-modal').html(' Non connecté');
        }

        // Capteurs :
        for (let e in d.sensors) {
            let remplissage = `<div class="capteurs-modal">
                <h3>Capteurs : ${e}</h3>
                <div class="card bloc-capteur">Type : ${e} <span id="unite-capeur">Unité : ${e}</span></div>
            </div>`;
            $('.bloc-capteur').append(remplissage);
        }
        
        // Localisation :
        // console.log(d.location.split(', '));

        let locs = d.location.split(', ');
        mymap = L.map('google-api').setView([locs[0], locs[1]], 13);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiYnV0dGVyczczIiwiYSI6ImNrOGZxNXU0azAyd2QzbHBrazgyejUydDQifQ.KI60BPzP9wR5w4-L_B0YKw'
        }).addTo(mymap);

    });

};


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
        <td>${data.serial}</td>
        <td><img src="/static/images/${data.image}" width="40px" height="40px"/></td>
        <td>${data.description}</td>
        <td><input type="checkbox" ${(data.status) ? 'checked' : ''} /></td>
        <td><div class="content" id="content_div">
        <input type="button" class="btn-danger details" value="Détails" data-toggle="modal" data-target="#modal-details" onclick="load_modale(this.parentNode.parentNode.parentNode.querySelectorAll('td')[0].textContent)"/>
    </div></td>
    </tr>`;

    // 
    // In JS :
    // document.getElementById('table_body').innerHTML += line;

    // In Jquery baby !
    $('#table_body').append(line);

};

// Solution 1 :
// load_components();


