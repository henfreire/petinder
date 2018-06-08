$(document).ready(function() {
    
});

function showPetsPage() {
    if (!window.location.href.match('perfil.html'))
        window.location.href = "./pages/perfil.html";
    $('#pagina-altera').hide();
    $('#pagina-cadastropets').hide();
}


function validateEmail(email) {
    return !!email.match(/\w+\@\w+.\w{3}/g);
}

