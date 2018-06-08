// Variável constante que recebe o elemento formulario de cadastro de donos
const formulario = document.getElementById("formularioCadastroDono");

// Função que pega os valores do formulário
function pegarDadosSalvar(evt) {
    // evt.preventDefault();



    // Recebe os valores de cada elemento do formulário

    let nome = $("#cadName").val();
    let email = $("#cadEmail").val();
    let senha = $("#cadNewPassword").val();
    let object = {
        displayName: nome,
        email: email,
        
    }

    auth.createUserWithEmailAndPassword(email, senha).then(function(evt) {
        db.collection("donos").doc(evt.uid).set(object).then(() => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        })
        // ...
    });
    // Chama a função para salvar dados no 
    // salvarNoFirebase("donos", object);
}

/*
Função que salva o objeto de dados 
@param nomeColecao - nome da coleção de dados onde vai inserir o objeto (documento)
@param object - nome do objeto que sera salvo
*/
function salvarNoFirebase(nomeColecao, object) {
    db.collection(nomeColecao).add(object)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}
/*
Função que busca os dados da coleção no firebase 
@param nomeColecao - nome da coleção onde vai buscar os documentos (dados)
*/
function pegarDadosFirebase(nomeColecao) {
    db.collection(nomeColecao).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        });
    });
}
