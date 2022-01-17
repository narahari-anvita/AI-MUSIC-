harry_potter = " "
peter_pan = " "
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist=0;
song_peter_pan="";


function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload(){
    harry_potter = loadSound("music.mp3");
    peter_pan = loadSound("music2.mp3");
}
function draw(){
    image(video,0,0,600,500);

    fill("#FFF000"); 
    stroke("#FFF000");

    song_peter_pan = peter_pan.isPlaying();
    console.log(song_peter_pan);

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        harry_potter.stop();
        if(song_peter_pan == false){
            peter_pan.play();
        }else{
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan";
        }

    }
    
}

function modelLoaded(){
    console.log("Posenet Intialized");
}


function gotPoses(results){

    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristY = " + leftWristY + "leftWristX = " + leftWristX);
    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristY = " + rightWristY + "rightWristX = " + rightWristX);
      
}}
