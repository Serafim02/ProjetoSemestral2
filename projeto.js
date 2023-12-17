function trocarTexto(textoId) {
    // Obtém o elemento de texto com base no ID fornecido
    var elementoTexto = document.getElementById(textoId);

    // Pode-se ajustar o texto conforme necessário
    if (textoId === 'Texto1') {
        elementoTexto.innerText = 'Novo texto para Faça viagens ou entregas';
    } else if (textoId === 'Texto2') {
        elementoTexto.innerText = 'Novo texto para Viajar';
    }
}
// contagem para a promoção legal // 

var countDownDate = new Date();
countDownDate.setDate(countDownDate.getDate() + 2); // Adicionando 2 dias

var totalTime = 2 * 24 * 60 * 60 * 1000; // 2 dias em milissegundos

var x = setInterval(function () {
    // Obtendo a data e hora atual
    var now = new Date().getTime();

    // Calculando o tempo restante
    var distance = countDownDate - now;

    // Calculando dias, horas, minutos e segundos
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Exibindo a contagem regressiva
    document.getElementById("countdown").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // Atualizando a barra de progresso
    var progress = ((totalTime - distance) / totalTime) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";

    // Se a contagem regressiva terminar, exiba uma mensagem
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "EXPIRED";
        document.getElementById("progress-bar").style.width = "0%";
    }
}, 1000);


document.addEventListener("DOMContentLoaded", function () {
    var mapElement = document.getElementById("map");

    // Adicionando um listener para o botão
    document.getElementById("mostrarMapa").addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition(funciona, erro);
    });

    // Funções funciona e erro
    function funciona(pos) {
        var la = pos.coords.latitude;
        var lo = pos.coords.longitude;

        // Cria o mapa
        var map = L.map('map').setView([la, lo], 12);

        // Adiciona um contêiner de tamanho fixo ao mapa
        var container = L.DomUtil.create('div', 'leaflet-map-container', mapElement);
        container.style.width = '50px'; 
        container.style.height = '50px';

        // Adiciona tile layer ao mapa
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Adiciona rota ao mapa
        L.Routing.control({
            waypoints: [
                L.latLng(la, lo),
                L.latLng(-23.556688148343888, -46.31376663350625)
            ]
        }).addTo(map);
    }

    function erro() {
        console.log('Não foi possível localizar');
    }
});