song = ""; 
songstatus = "";


scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0; 

function preload() 
{
     song1 = loadSound("Believer mp3 Imagine Dragons.mp3");
     song2 = loadSound("Satisfya Imran Khan.mp3"); 
} 
     
function setup() 
{
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
  console.log('PoseNet is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  scoreLeftWrist = results[0].pose.keypoints[9].score;
  console.log("scoreLeftWrist = " + scoreLeftWrist);  
  {
    console.log(results);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristy = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + "leftWristY =" + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristy = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY =" + rightWristY);
  }
}

function draw() 
{
   image(video, 0, 0, 600, 500); 
   fill("#FF0000");
   stroke("#FF0000");
   songstatus = song1.isPlaying();

   if(scoreLeftWrist > 0.2)
   {
     circle(leftWristX,leftWristY,20);
     InNumberleftWristY = Number(leftWristY);
     remove_decimals = floor(InNumberleftWristY);
     volume = remove_decimals/500;
     document.getElementById("volume").innerHTML = "volume  = " + volume;
     song.setVolume(volume);
     song2.stop();
   }
   if(songstatus == "false")
   {
     song = "Believer mp3 Imagine Dragons.mp3";
     play();
   }
} 

function play() 
{
  song.play();
  song.setVolume(1);
  song.rate(1);
}


