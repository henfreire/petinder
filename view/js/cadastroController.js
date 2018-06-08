function cadastroController() {

    var salvarPet = function(dadosPet) {
        salvarNoFirebase('pet', dadosPet);
    };
    // Função que pega os valores do formulário
    var salvarUsuario = function(email, password, data) {
        auth.createUserWithEmailAndPassword(email, password).then(function(user) {
            db.collection("donos").doc(user.uid).set(data).then(function() {
                $("#modalCadSucesso").modal();
            }).catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;

                // Mostrar erro
                console.error(errorCode + errorMessage);
            });
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // Mostrar erro
            console.error(errorCode + errorMessage);
        });
    };

    // Função que pega os valores do formulário
    var pegarDadosSalvarPerfilDono = function() {
        var name = $('#cadDonoName').val();
        var email = $('#cadDonoEmail').val();
        var sexo = $('#cadDonoSexo').val();
        var nasc = $('#cadDonoNascimento').val();
        var bios = $('#cadDonoBios').val();

        var obj = {
            displayName: name,
            email: email,
            sexo: sexo,
            nasc: nasc,
            bios: bios
        };
        var user = auth.currentUser;

        console.log(user.uid);

        db.collection("donos").doc(user.uid).set(obj).then(function() {
            // Buscar dados do Firebase
            location.reload();
            // db.collection("donos").doc(user.uid).get(obj).then(function(response) {
            //     // var data = response.data();


            //     // if (!!auth.currentUser && !!auth.currentUser.displayName) {

            //     //     $('#cadDonoName').val(data.displayName);
            //     //     $('#cadDonoEmail').val(data.email);
            //     //     $('#cadDonoSexo').val(data.sexo);
            //     //     $('#cadDonoNascimento').val(data.nasc);
            //     //     $('#cadDonoBios').val(data.bios);

            //     // }
            // });
        }).catch(function(error) {});
    };

    var salvarPerfilPets = function() {
        // Recebe os valores de cada elemento do formulário
        var name = $('#cadPetName').val();
        var esp = $('#cadPetEsp').val();
        var raca = $('#cadPetRaca').val();
        var sexo = $('#cadPetSexo').val();
        var desc = $('#cadPetDesc').val();
        var user = auth.currentUser;

        var obj = {
            idDono: user.uid,
            nomePet: name,
            especie: esp,
            raca: raca,
            sexo: sexo,
            descricao: desc
        };

        db.collection("pets").add(obj).then((pet) => {
                var file = cadPetImg.prop("files")[0];
                var storage = stor.ref("pets/" + pet.id + "/");

                storage.put(file);
                // location.reload();
            })
            .catch(function(error) {});
    };

    var salvarImagemDono = () => {
        var cadPetImg = $("#cadDonoAvatar");
        var name = $('#cadDonoName').val();
        var user = auth.currentUser;


        var file = cadPetImg.prop("files")[0];
        var storage = stor.ref("donos/" + user.uid);

        storage.put(file);
    };

    var salvarImagemPet = () => {
        var cadPetImg = $("#cadPetImg");
        var name = $('#cadPetName').val();

        db.collection("pets").where("idDono", "==", auth.currentUser.uid).where("nomePet", "==", name).get().then(function(pets) {
            pets.forEach(function(pet) {
                var user = auth.currentUser;

            });
        });
    };


    var infUser = () => {
        var user = auth.currentUser;
        db.collection('donos').doc(auth.currentUser.uid).get().then(function(response) {
            $("#cadDonoName").val(response.data().displayName);
            $("#cadDonoEmail").val(response.data().email);
            $("#cadDonoBios").val(response.data().bios);
        });
    };



    var funcoesDoCadDono = () => {
        $("#salvarDadosDono").click(() => {
            pegarDadosSalvarPerfilDono();
            salvarImagemDono();
        });
        infUser();
    };

    var funcoesDoCadPets = () => {

        $("#btnCadPets").click(() => {
            salvarPerfilPets();
            salvarImagemPet();

            console.log("Funcionou Carai");
        });


    };

    /*
    Função que salva o objeto de dados  
    @param nomeColecao - nome da coleção de dados onde vai inserir o objeto (documento)
    @param object - nome do objeto que sera salvo
    */
    var salvarNoFirebase = function(nomeColecao, object) {
        return db.collection(nomeColecao).add(object)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
    };

    /*
    Função que busca os dados da coleção no firebase 
    @param nomeColecao - nome da coleção onde vai buscar os documentos (dados)
    */
    var pegarDadosFirebase = function(nomeColecao) {
        db.collection(nomeColecao).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });
    };

    var getAllPets = (func) => {
        var promises = [];

        db.collection('donos').doc(auth.currentUser.uid).collection('myPets').get().then(pets => {
            pets.docs.forEach((pet) => {
                promises.push(db.collection('donos').doc(auth.currentUser.uid).collection('myPets').doc(pet.id).get());
            });

            $.when.apply($, promises).then(func);
        });
    };

    return {
        salvarUsuario: salvarUsuario,
        pegarDadosSalvarPerfilDono: pegarDadosSalvarPerfilDono,
        salvarNoFirebase: salvarNoFirebase,
        pegarDadosFirebase: pegarDadosFirebase,
        salvarPet: salvarPet,
        funcoesDoCadDono: funcoesDoCadDono,
        funcoesDoCadPets: funcoesDoCadPets,
        infUser: infUser,
        getAllPets: getAllPets
    };
}

cadastroController();
