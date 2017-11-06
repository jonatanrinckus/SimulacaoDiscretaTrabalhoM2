const gravity = -9.8;
var speedY = 0;
var speedX = 0;
var speed = 1000;
var angle = 37;
var altitude = 0;
var y = 0;

function init() {
    console.log(angle);
    console.log(angle);
    console.log(Math.sin(angle * (Math.PI / 180.0)));
    console.log(Math.cos(angle * (Math.PI / 180.0)));
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

    
    var dy = speedY * ty + 0.5*(gravity*Math.pow(ty, 2));
        
    console.log("Dy", dy);


    var gDx = [];
    var seriesX = [];
    var seriesY = [];

    var factor = dx/10;

    for(let i = 0; i <= dx+1; i = i+factor){
        gDx.push(parseInt(i));
    }
    
    
    for(let i of gDx){
        let t = parseFloat(i/speedX).toFixed(2);
        seriesX.push(t);        
        
        seriesY.push(0+speedY*t+0.5*gravity*Math.pow(t, 2));
    }
    
    console.log("gDx", gDx);
    console.log("seriesX", seriesX);
    console.log("seriesY", seriesY);
    new Chartist.Line('#time', {
        labels: gDx,
        series: [seriesX]
      });

      new Chartist.Line('#altitude', {
        labels: seriesX,
        series: [seriesY]
      });

      new Chartist.Line('#altitude_distance', {
        labels: gDx,
        series: [seriesY]
      });
}
init();