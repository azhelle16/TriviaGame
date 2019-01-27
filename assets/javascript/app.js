/*
 #######################################################################
 #
 #  FUNCTION NAME : 
 #  AUTHOR        : 
 #  DATE          : 
 #  MODIFIED BY   : 
 #  REVISION DATE : 
 #  REVISION #    : 
 #  DESCRIPTION   : 
 #  PARAMETERS    : 
 #
 #######################################################################
*/

/* GLOBAL VARIABLES */

var secs = "30"
var rt
var triviaArr = ["movie"]
var answers = { "movie": ["Remember Me","Storm","Rob Reiner","Jim Carrey","Franki Valli","Lady and the Tramp",
						 "Bruce Lee","The Emerald City","48 Hours","Meg Ryan"]

			  } 

$(document).ready(function() {
 	
 	//footer
 	var currdate = new Date();
 	var year = currdate.getFullYear();
 	//var canvasTop = "450";
 	var crstr = "&copy; "+year+"<br>";
 	$('footer').empty().append(crstr);
 	$(".resetButton").css("opacity","0")
 	
 	$(".startButton").on("click", function() {
 		rt = setInterval(runTimer,1000)
 		$("#mainContainer").removeClass("dispHide")//
 		$("#questionnaire").load("./assets/html/movie.html")
 		$("#doneButton").removeClass("dispHide")
		$(".startButton").css("opacity","0")
 	})

 	$("#doneButton").on("click", function() {
 		$("#correctAudio").trigger("play");
 		$("#tUp img").attr("src","./assets/images/results.png");
 		clearInterval(rt)
 		checkAnswers()
 	})
 	
 	$(".resetButton").on("click", function() {
 		secs = "30"
 		$("#countdown").empty();
 		var im2 = $("<img>")
		im2.attr("src","./assets/images/3.png")
		im2.attr("height","200")
		$("#countdown").append(im2)
		var im = $("<img>")
		im.attr("src","./assets/images/0.png")
		im.attr("height","200")
		$("#countdown").append(im)
 		rt = setInterval(runTimer,1000)
 		$("#mainContainer").removeClass("dispHide")
 		$("#questionnaire").removeClass("dispHide").load("./assets/html/movie.html")
 		$("#doneButton").removeClass("dispHide")
		$(".resetButton").css("opacity","0")
		$("#quizResult").addClass("dispHide")
 	});

})

/*
 #######################################################################
 #
 #  FUNCTION NAME : runTimer
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 22, 2019 PST 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 26, 2019 PST
 #  REVISION #    : 2
 #  DESCRIPTION   : runs the timer
 #  PARAMETERS    : 
 #
 #######################################################################
*/

function runTimer() {

	$("#countdown").empty();

	var s = parseInt(secs) - 1
	var secArr = secs.split("")

	for (var j = 0; j < secArr.length; j++) {
		var im = $("<img>")
		if (secArr.length > 1) {
			im.attr("src","./assets/images/"+secArr[j]+".png")
			im.attr("height","200")
		} else {
			var im2 = $("<img>")
			im2.attr("src","./assets/images/0.png")
			im2.attr("height","200")
			$("#countdown").append(im2)
			im.attr("src","./assets/images/"+secArr[j]+".png")
			im.attr("height","200")
		  }
		$("#countdown").append(im)  
	}

	if (s < 0) {
		$("#wrongAudio").trigger("play");
		clearInterval(rt)
		checkAnswers()
	} else if (s < 10) {
		$("#tUp img").attr("src","./assets/images/timesUp.png");
		$("#timerAudio").trigger("play");
	  }

	secs = ""+s 

}

/*
 #######################################################################
 #
 #  FUNCTION NAME : checkAnswers
 #  AUTHOR        : Maricel Louise Sumulong
 #  DATE          : January 24, 2019 PST 
 #  MODIFIED BY   : Maricel Louise Sumulong
 #  REVISION DATE : January 26, 2019 PST
 #  REVISION #    : 1
 #  DESCRIPTION   : checks the answer selected
 #  PARAMETERS    : none
 #
 #######################################################################
*/

function checkAnswers() {

	var cor = 0
	var incor = 0
	var noans = 0
	var j = 1
	while (j < 11) {
		var noc = 0 //no check counter
		$("input[name='rb"+j+"']").each(function() {
			console.log("radio")
			if ($(this).is(":checked")) {
				if (answers.movie.includes($(this).val())) {
					cor += 1
				} else {
					incor += 1
				  }
			} else {
				noc += 1
			  }
			 
		})
		j++
		if (noc == 4)
			noans += 1
	}

	$("#questionnaire, #doneButton").addClass("dispHide")
	$("#quizResult").removeClass("dispHide")
	$("#cor").text(cor)
	$("#wro").text(incor)
	$("#noa").text(noans)
	$(".resetButton").css("opacity","1")
	$(".startButton").css("opacity","0")

}
