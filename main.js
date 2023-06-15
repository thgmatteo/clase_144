video = "";
status = "";
objects = [];
function setup()
{
    canvas = createCanvas(300, 235);
    canvas.position(367, 90);
    video.hide();
}
function preload()
{
    video = createVideo('video.mp4');
}
function draw()
{
    image(video, 0, 0, 300, 235);
    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML ="Estado: Objeto detectado";
            document.getElementById("Number_of_objects").innerHTML = "Numero de objetos detectados:" + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 135, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x - 150, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}
function modelLoaded()
{
    console.log("Modelo Cargado");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function start()
{
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Estatus:Detectando Objetos";
}
function gotResult(error, results)
{
    if (error)
    {
      console.log(error);
    }
    else (results)
    
        console.log(results);
        objects = results;
}