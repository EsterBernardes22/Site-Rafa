var firebaseConfig = {
    apiKey: "AIzaSyBn6-thJEEwwXbtYqAJjxPxtgVIAEzUA2o",
    authDomain: "mathrafa-58826.firebaseapp.com",
    projectId: "mathrafa-58826",
    storageBucket: "mathrafa-58826.appspot.com",
    messagingSenderId: "272226767018",
    appId: "1:272226767018:web:1dff2124c6782c67ce40d3",
    measurementId: "G-MDC2W8YETY"
};
firebase.initializeApp(firebaseConfig);

var auth = null;

function loginn() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function (userCredential) {
            // Retrieve user's name (this should be retrieved from your database, here it's a placeholder)
            var nome = document.getElementById("nome").value;
            localStorage.setItem("userName", nome);
            alert("Logado com sucesso");
            window.location.href = "index.html";
        }).catch(function (error) {
            alert("Falha ao logar: " + error.message);
        });
}


function cadastrar() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(function (userCredential) {
            // Save the user's name in localStorage
            localStorage.setItem("userName", nome);
            alert("Cadastrado com sucesso");
            window.location.href = "index.html";
        }).catch(function (error) {
            alert("Falha ao cadastrar: " + error.message);
        });
}