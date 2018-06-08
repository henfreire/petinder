var homeController = (loginController, cadastroController, petController) => {

    var loadPages = () => {
        $('#pagina-pets').load('./pets.html', () => {
            nameUser();
            imagemPerfilDono();
        }).show();
        
        $('#pagina-altera').load('./alterarperfil.html', cadastroController.funcoesDoCadDono).hide();
        $('#pagina-cadastropets').load('./cadastropets.html', cadastroController.funcoesDoCadPets).hide();
        $('#pagina-perfilpet').load('./perfilpet.html', ).hide();
    };

    var showPerfilPetPage = () => {
        $('#pagina-perfilpet').show();
        $('#pagina-altera, #pagina-cadastropets, #pagina-pets').hide();
    };

    var showCadPetsPage = () => {
        $('#pagina-cadastropets').show();
        $('#pagina-altera, #pagina-pets, #pagina-perfilpet').hide();
    };

    var showAlteraPage = () => {
        $('#pagina-altera').show();
        $('#pagina-pets, #pagina-cadastropets, #pagina-perfilpet').hide();
    };

    var showMainPage = () => {
        $('#pagina-pets').show();
        $('#pagina-altera, #pagina-cadastropets, #pagina-perfilpet').hide();
    };


    var imagemPerfilDono = () => {
        var user = auth.currentUser;
        stor.ref('donos/' + user.uid).getDownloadURL().then(function(url) {
            // a URL esta recebendo o caminho onde esta o arquivo
            // O caminho é inserido na classe
            $(".perfil-dono-foto").attr("src", url);
        }).catch(function(error) {
            // aqui nos colocamos os erros
        });
    };

    var imagemPet = () => {
        if(!!auth.currentUser) {
            db.collection('donos').doc(auth.currentUser.uid).collection('myPets').get().then(pets => {
                pets.docs.forEach(pet => {
                    stor.ref('pets/' + auth.currentUser.uid + pet.id).getDownloadURL().then(function(url) {
                        // a URL esta recebendo o caminho onde esta o arquivo
    
                        // Não altere nada aqui AMÉM
                        // var xhr = new XMLHttpRequest();
                        // xhr.responseType = 'blob';
                        // xhr.onload = function(event) {
                        //     var blob = xhr.response;
                        //     $(".perfil-dono-foto").attr("src", url);
                        // };
                        // xhr.open('GET', url);
                        // xhr.send();
    
                        // O caminho é inserido na classe
                    }).catch(function(error) {
                        // aqui nos colocamos os erros
                    });
                });
            });
        }
    };
    
   
    var nameUser = () => {
        if(!!auth.currentUser)  {
            db.collection('donos').doc(auth.currentUser.uid).get().then(function(evt) {
                $(".perfil-dono-name").text(evt.data().displayName);
            });
        }
    };
    
    

    var logout = () => {
        loginController.logout();
    };

    var init = () => {
        loginController.checkLogin(() => {
            loadPages();
    
            $(".sair-sistema").click(() => {
                logout();
            });
            $('#btnPerfil').click(() => {
                showMainPage();
            });
            $('#btnPerfilPet').click(() => {
                showPerfilPetPage();
            });
            $('#btnAlterarPerfil').click(() => {
                showAlteraPage()
            });
            $('#btnCadastroPets').click(() => {
                showCadPetsPage();
                petController.getPets();
            });
        });
    };

    init();

    return {
        showPerfilPetPage: showPerfilPetPage,
        showAlteraPage: showAlteraPage,
        showMainPage: showMainPage,
        showCadPetsPage: showCadPetsPage,
        logout: logout
    };
};


homeController(loginController(), cadastroController(), petController());
// function gridPets() {
//     var grid;
//     getPets().then((pets) => {

//         var cont = 0;
//         var html = '';

//         console.log(pets);


//     });
// }

// var getPets = (petsObj) => {
//     var data = [],
//         aux = {};


//     db.collection("donos").doc(auth.currentUser.uid)
//         .get().then((dados) => {
//             var documents = dados;
//             console.log(documents);
//             documents.forEach(async doc => {
//                 console.log("Parent Document ID: ", doc.id);
//                 var subCollectionDocs = await collectionRef.doc(doc.id).collection("subCollection").get()
//                 subCollectionDocs.forEach(subCollectionDoc => {
//                     subCollectionDoc.forEach(doc => {
//                         console.log("Sub Document ID: ", doc.id);
//                     });
//                 });
//             });
//         });
//     return data;
// };
