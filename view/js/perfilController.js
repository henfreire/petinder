
var perfilController = () => {
    
    var exibirDadosUser = function () {
        if(!!auth.currentUser && !!auth.currentUser.displayName) {
            $(".perfil-dono-name").text(auth.currentUser.displayName);
            
        }
        
        // Vai precisar de mais uma API.
        setTimeout(function() {
            $(".perfil-dono-foto").attr("src", auth.currentUser.photoURL);
        }, 10);
         
    };
    
    return {
        exibirDadosUser : exibirDadosUser
    };
};
perfilController();