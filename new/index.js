var gravity = -9.8;
var speedY = 0;
var speedX = 0;
var speed = 0;
var angle = 0;
var y = 0;

function init() {
    $("form").on("submit", (e) => {
        e.preventDefault();
    });
}

init()

function go() {

    angle = parseFloat($("#angle").val());
    speed = parseFloat($("#speed").val());
    gravity = parseFloat($("#gravity").val());
    height = parseFloat($("#height").val());

    if(speed <= 0 || speed >=9000){
        alert("Too slow or too fast");
        return;
    }

    if(angle <= 0 || angle >=90){
        alert("Angle cant be negative or greater than 89");
        return;
    }

    if(gravity >= 0){
        alert("Gravity cant be positive");
        return;
    }

    speedY = speed * (Math.sin(angle * (Math.PI / 180.0)));
    speedX = speed * (Math.cos(angle * (Math.PI / 180.0)));

    console.log("speedY", Math.abs(speedY));
    console.log("speedX", Math.abs(speedX));


    var a = gravity/2;
    var b = speedY;
    var c = height;
    var delta = Math.sqrt(Math.pow(b, 2)-4*a*c);

    console.log("delta", delta);

    var x1 = ((b*-1) + delta)/(2*a);
    var x2 = ((b*-1) - delta)/(2*a);


    console.log("x1", x1);
    console.log("x2", x2);

    var ty = Math.abs(speedY / gravity);
    console.log("Ty", ty);

    tx = x1 < x2 ? x2 : x1;    

    //var tx = ty * 2;
    console.log("Tx", tx);


    var dx = tx * speedX;
    console.log("Dx", dx);


    var dy =  speedY * ty + 0.5 * (gravity * Math.pow(ty, 2));
    
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
                label: "Tempo X Distancia",
                data: []
            }]
        }
    };
    var altitudeCfg = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Altitude X Tempo",
                data: []
            }]
        }
    };
    var altitude_distanceCfg = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Altura X Distancia",
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
                dataset.data.push({ x: height + speedY * t + 0.5 * gravity * Math.pow(t, 2), y: t });
            });

            altitudeCfg.data.labels.push(t);
            altitudeCfg.data.datasets.forEach(function (dataset) {
                dataset.data.push({ x: t, y: height + speedY * t + 0.5 * gravity * Math.pow(t, 2) });
            });


            altitude_distanceCfg.data.labels.push(parseInt(i));
            altitude_distanceCfg.data.datasets.forEach(function (dataset) {
                dataset.data.push({ x: t, y: height + speedY * t + 0.5 * gravity * Math.pow(t, 2) });
            });

            time.update();
            altitude.update();
            altitude_distance.update();
        }, t * $("#graph_speed").val());
    }

    setTimeout(function () {
        $("label#distance").text("Distancia: " + parseFloat(dx).toFixed(2) + " metros");
        $("label#height").text("Altitude: " + parseFloat(dy+height).toFixed(2) + " metros");
        $("label#time").text("Tempo: " + parseFloat(tx).toFixed(2) + " segundos");
    }, tx * $("#graph_speed").val());

}
