function petController(cadastroController) {

    // Imagem DE PET, BUSCA DO STORAGE DO FIREBASE.
    var imagemPet = () => {
        db.collection('donos').doc(auth.currentUser.uid).collection('myPets').get().then(pets => {
            pets.docs.forEach(pet => {
                stor.ref('pets/' + auth.currentUser.uid + "/" + pet.id).getDownloadURL().then(function(url) {
                    // a URL esta recebendo o caminho onde esta o arquivo
                    $('#' + pet.id).attr("src", url);
                }).catch(function(error) {
                    // aqui nos colocamos os erros
                });
            });
        });
    };


    var teste = () => {



    };






    var getPets = (petsObj) => {
        var data = [],
            aux = {},
            cont = 0,
            html = '',
            promises = [];

        imagemPet();

    
        return db.collection("pets").where("idDono", "==", auth.currentUser.uid).get().then(function(e) {

            e.forEach(function(pet) {
                var pet = pet.data();
                if (cont === 0) {
                    html += "<div class=\"row text-center justify-content-center\">";
                }

                html += "<div class=\"col-sm-4 \"><div class=\" conteudo\"><div class=\"container conteudo\"><ul class=\"list-unstyled components\"><li><a><img class=\"imgmeudog img-fluid rounded-circle \" id=\"" + pet.nomePet + "\" src=" + pet.urlPhoto + "></a></li></ul></div><ul class=\"text-left list-unstyled components txtmeupet\"><li class=\"petNome\">Nome:" + pet.nomePet + "</li><li class=\"petEspecie\">Espécie: " + pet.especie + "</li><li class=\"petSexo\">Sexo: " + pet.sexo + " </li></ul></div></div>";

                if (cont === 2) {
                    html += "</div>";
                    cont = -1;
                }
                cont++;
            });

            $('#listUserPets').html(html);
        });


        // return db.collection('donos').doc(auth.currentUser.uid).collection('myPets').get().then(pets => {
        //     pets.docs.forEach((pet) => {
        //         promises.push(db.collection('donos').doc(auth.currentUser.uid).collection('myPets').doc(pet.id).get());
        //     });

        //     $.when.apply($, promises).then(function() {
        //         var objects = arguments;
        //         for (petObj in objects) {
        //             data.push(objects[petObj].data());
        //         }

        //         data.forEach(function(pet) {
        //             if (cont === 0) {
        //                 html += "<div class=\"row text-center justify-content-center\">";
        //             }

        //             html += "<div class=\"col-sm-4 \"><div class=\" conteudo\"><div class=\"container conteudo\"><ul class=\"list-unstyled components\"><li><a><img class=\"imgmeudog img-fluid rounded-circle \" id=\"" + pet.nomePet + "\" src=" + pet.urlPhoto + "></a></li></ul></div><ul class=\"text-left list-unstyled components txtmeupet\"><li class=\"petNome\">Nome:" + pet.nomePet + "</li><li class=\"petEspecie\">Espécie: " + pet.especie + "</li><li class=\"petSexo\">Sexo: " + pet.sexo + " </li></ul></div></div>";

        //             if (cont === 2) {
        //                 html += "</div>";
        //                 cont = -1;
        //             }
        //             cont++;
        //         });

        //         $('#listUserPets').html(html);
        //     });
        // });
    };

    return {
        getPets: getPets
    };
}

petController(cadastroController());
