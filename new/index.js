const gravity = -9.8;
var speedY = 0;
var speedX = 0;
var speed = 0;
var angle = 0;
var altitude = 0;
var y = 0;

function init() {
    $("form").on("submit", (e) => {
        e.preventDefault();
    });
}

init()

function go() {

    angle = $("#angle").val();
    speed = $("#speed").val();
    speedY = speed * (Math.sin(angle * (Math.PI / 180.0)));
    speedX = speed * (Math.cos(angle * (Math.PI / 180.0)));

    console.log("speedY", Math.abs(speedY));
    console.log("speedX", Math.abs(speedX));

    var ty = Math.abs(speedY / gravity);
    console.log("Ty", ty);

    var tx = ty * 2;
    console.log("Tx", tx);


    var dx = tx * speedX;
    console.log("Dx", dx);


    var dy = speedY * ty + 0.5 * (gravity * Math.pow(ty, 2));

    console.log("Dy", dy);

    var factor = dx / 10;

    var timeCtx = document.getElementById('time').getContext('2d');
    var altitudeCtx = document.getElementById('altitude').getContext('2d');
    var altitude_distanceCtx = document.getElementById('altitude_distance').getContext('2d');

    var timeCfg = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: []
            }]
        }
    };
    var altitudeCfg = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: []
            }]
        }
    };
    var altitude_distanceCfg = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                data: []
            }]
        }
    };

    var time = new Chart(timeCtx, timeCfg);

    var altitude = new Chart(altitudeCtx, altitudeCfg);

    var altitude_distance = new Chart(altitude_distanceCtx, altitude_distanceCfg);

    for (let i = 0; i <= dx + 1; i = i + factor) {

        let t = parseFloat(i / speedX).toFixed(2);
        setTimeout(function () {
            timeCfg.data.labels.push(parseInt(i));
            timeCfg.data.datasets.forEach(function (dataset) {
                dataset.data.push({ x: 0 + speedY * t + 0.5 * gravity * Math.pow(t, 2), y: t });
            });

            altitudeCfg.data.labels.push(t);
            altitudeCfg.data.datasets.forEach(function (dataset) {
                dataset.data.push({ x: t, y: 0 + speedY * t + 0.5 * gravity * Math.pow(t, 2) });
            });


            altitude_distanceCfg.data.labels.push(parseInt(i));
            altitude_distanceCfg.data.datasets.forEach(function (dataset) {
                dataset.data.push({ x: t, y: 0 + speedY * t + 0.5 * gravity * Math.pow(t, 2) });
            });

            time.update();
            altitude.update();
            altitude_distance.update();
        }, t * $("#graph_speed").val());
    }

    setTimeout(function () {
        $("label#distance").text("Distancia: " + parseFloat(dx).toFixed(2) + " metros");
        $("label#height").text("Altitude: " + parseFloat(dy).toFixed(2) + " metros");
        $("label#time").text("Tempo: " + parseFloat(tx).toFixed(2) + " segundos");
    }, tx * $("#graph_speed").val());

}
