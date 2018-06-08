var loginController = (perfilController) => {

    var loadPages = function() {
       
        $('#pagina-login').load('./pages/login.html', () => {
            funcoesDoLogin();
        }).hide();
        $('#pagina-cadastro').load('./pages/cadastre.html', () => {
            funcoesDoCadastro();
        }).show();
    };

    var init = function() {
       
            checkLogin();
            loadPages();
    
            $('#loginBtn').click(() => {
                showLoginPage();
            });
            $('#cadastroBtn').click(() => {
                showCadastroPage();
            });
        
    };

    var funcoesDoLogin = function() {
        $(".btnLoginFacebook").click(() => {
            var provider = new firebase.auth.FacebookAuthProvider();
            auth.signInWithPopup(provider).then(function(result) {

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;

                // The signed-in user info.
                user = result.user;
                var newUser = {
                    displayName: user.displayName,
                    email: user.email,
                };

                db.collection("donos").doc(user.uid).set(newUser).then(function() {
                    // faz nada
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });
                // ...
            }).then(
                function() {
                    // CHAMA A FUNÇÃO QUE ESTÁ NO HOME.JS PARA CONFERIR SE LOGOU E MANDA O COLEGA PRA ONDE ELE DEVE IR.
                    exibirDados();

                }).catch(function(error) {
                // n faz nada
                // console.error
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // // The email of the user's account used.
                // var email = error.email;
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential;
                // ...
            });

        });
        $(".btnLoginEmail").click(() => {
            let email = $("#email").val();
            let password = $("#password").val();
            auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
        });
    };

    var funcoesDoCadastro = function() {
        $('#cadEnviar').click(pegarDadosSalvar);
    };

    var showLoginPage = function() {
        $('#pagina-login').show();
        $('#pagina-cadastro').hide();
    };

    var showCadastroPage = function() {
        $('#pagina-cadastro').show();
        $('#pagina-login').hide();
    };

    var loginFalse = function() {
        showCadastroPage();
    };

    var loginOk = function() {
        goToHomePage();
    };

    var goToHomePage = function() {
        if (!window.location.href.match('home.html')) {
            window.location.href = "./pages/home.html";
            // perfilController.exibirDadosUser();
        }
    };

    var checkLogin = function(func) {
        auth.onAuthStateChanged(
            (usuario) => {
                if (usuario) {
                    loginOk();
                    if(!!func) {
                        func();
                    }
                } else {
                    loginFalse();
                }
            }
        );
    };

    var logout = function() {
        auth.signOut().then(() => {
            console.log("Saiu");
            window.location.href = "https://preview.c9users.io/luancesar/tis-petinder/index.html";
        });
    };

    init();

    return {
        logout      : logout,
        checkLogin  : checkLogin
    };
};

loginController(perfilController());
