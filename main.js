song = "";
song2="";
function preload()
{
	song = loadSound("music.mp3");
	song2=loadSound("music.mp3");
}

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

score_right_wrist=0;
score_left_wrist= 0;
function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}


function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    score_left_wrist= results[0].pose.keypoints[9].score;
	score_right_wrist= results[0].pose.keypoints[10].score;
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	fill("#FF0000");
	stroke("#FF0000");
	if(score_right_wrist>0.2){
		circle(rightWristX,rightWristY,20);
		song.play();
	}
	

    if(score_left_wrist>0.2){
        
        
        circle(leftWristX,leftWristY,20);

        song2.play();

    }


}

