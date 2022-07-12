Status = "";
object = [];

function setup(){
    Canvas = createCanvas(600, 500);
    Canvas.center();
    Camera = createCapture(VIDEO);
    Camera.hide();
    Objectdetection = ml5.objectDetector("cocossd",modelLoaded);

}

function draw(){
    image(Camera, 0, 0, 600, 500);
    Objectdetection.detect(Camera, gotResults);

    if(Status != ""){
        document.getElementById("status").innerHTML = "Status: Objects Detected";

         for(i = 0; i < object.length; i++){
            fill("#FF0000");
             percent = Math.floor(object[i].confidence *100);
             text(object[i].label+""+percent+"%", object[i].x +15 , object[i].y -15 );
             noFill();
             rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
         }
     }
}

function modelLoaded(){
console.log("ModelLoaded");
Status = true;
document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}