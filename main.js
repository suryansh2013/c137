status = "";
input = "";
objects = [];
function preload() {}
function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(480, 380);
    video.hide();
}
function draw() {
    image(video, 0, 0, 480, 380);
}
function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for ( i = 0; i < objects.length; i++) {
            document.getElementById("model").innerHTML = "Status : Objects Detceted";
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == input) {
                video.stop();
                objectDetector.detect(gotResult);
                synth = window.speechSynthesis;
                utterThis = "Object mentioned is found";
                synth.speak(utterThis);
                document.getElementById("status").innerHTML = "Object Found";
            } else {
                document.getElementById("status").innerHTML = "Object Not Found";
            }
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}