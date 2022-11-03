song1 ="";
song2 ="";
song3 ="";

song1_status ="";
song2_status ="";
song3_status ="";

scoreRightWrist = 0;
scoreEye = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

righteyeX = 0;
righteyeY = 0;


function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
	song3 = loadSound("pasoori.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('poseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	scoreEye =  results[0].pose.keypoints[2].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
	righteyeX = results[0].pose.rightEye.x;	
	righteyeY = results[0].pose.rightEye.y;	
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	
	song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();
	song3_status = song3.isPlaying();

	fill("#FF0000");
	stroke("#FF0000");

	if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song2.stop();
            song3.stop();
		if(song1_status == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();
            song3.stop();
		if(song2_status == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

	if(scoreEye > 0.2)
	{ 
		circle(righteyeX,righteyeY,20);

			song2.stop();
            song1.stop();
		if(song3_status == false)
		{
			song3.play();
			document.getElementById("song").innerHTML = "Playing - pasoori"
		}
	}

}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
