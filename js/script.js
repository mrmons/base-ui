var $sideBarWidth = 70;   //sidebar width
var $desktop = 1200;		 //desktop for media query
var $toggleBox = false;

// //Global click event 
$(document).on("click",function(e){
	// if($toggleBox==true){

	// 	$(".box-order").hide();
	// 	$toggleBox = false;
	// 	return false;
	// }
})

//initial setup
$(document).ready(function() {
	tab();			//Tab
	tooltip();		//tooltip
	sideBar();		//load sitebar expand funciton
	popupBox();		//load popupBox for table page with popup box
	navCollapse();  //drop down menu for mobile
	popupOverlay();	//load popupoverlay (for search)


	closePopup('.js-btnclose');
})


function tab(){
	$('.js-tab-btn li').on('click',function(e){
		var curID = $(this).attr('data-tab');

		$('.js-tab-btn li').removeClass('active');
		$('.js-tab-content').removeClass('active');

		$(this).addClass('active');
		$("#"+curID).addClass('active');
	})
}


function tooltip(){

	if ($(window).width() <= 768) {
		$(".js-tooltip").on("click",function() {
			$(".js-tooltip-content").toggle();
		});
	}else{
		$(".js-tooltip").hover(function() {
			$(".js-tooltip-content").show();
		},function(){
			$(".js-tooltip-content").hide();
		});
	}	
}


function popupOverlay(){
	$('.js-popup').on('click',function(e){

		$('html,body').css('overflow','hidden').append("<div class='js-overlay'></div>");
		$('.js-overlay').load('search.html');
	});
}


function closePopup($className){
	$($className).on('click',function(){
		$('.js-overlay').velocity("fadeOut",function(){
			$('.js-overlay').remove();
			$('html,body').css('overflow','auto')
		});
	});
}


function popupBox(){
	var $orderBox = $(".box-order");
	var $pos;

	$('.btn--edit-outline').on("click",function(e){
		$pos = $(this).offset();

		e.preventDefault();
		$orderBox.css({"top":$pos.top+50,"right":  ($(window).width() - ($pos.left + $(this).outerWidth())-35)});
		$orderBox.toggle();
	});
}


function navCollapse(){
	$('.js-collapse').on("click",function(e){
		$(".nav-tab ul").slideToggle();
	});
}

function navTab(){

	var toggleTab = false;

	if ($(window).width() <= 1200) {

		$('.nav-tab').on("click",function(event){

			event.preventDefault();

			if(!toggleTab){

				$('.nav-tab ul li').show();
				$('.nav-tab ul').velocity({
					height: 74 * 5 + "px"
				});

				toggleTab = true;

			}else{
				$('.nav-tab ul').velocity({
					height: "74px"
				});

				console.log("is here");
				toggleTab = false;
			}
		
		})//click

	}
}



function sideBar(){

	$('.js-sidebar').css('height', $(window.document).height());

	var $toggleSlide = false;
	var $slideTime = 300

	$('.js-expand').on("click",function(event){
		if ($(window).width() <= 1200) {
			//overflow-y: scroll;

			//mobile to tablet size
			if($toggleSlide){
				switchExpand(false,false);
				$toggleSlide = false;
			}else{
				switchExpand(true,false);
				$toggleSlide = true;
			}
		}else{
			//desktop size
			if(!$toggleSlide){
				switchExpand($toggleSlide,true);
				$toggleSlide = true;
			}else{
				switchExpand($toggleSlide,true);
				$toggleSlide = false;
			}
		}
	})

	function switchExpand($toggle, $toggleExpand){

		if($toggleExpand){
			$marginLeft = "280px";
			$width = "280px";
		}else{
			$marginLeft = "0";
			$width = "100%";
		}


		if(!$toggle){
			$('.js-sidebar').velocity({
				width: "50px"
			},$slideTime);

			$('.nav li a').velocity({
				padding: "13px"
			},$slideTime);

			$(".content").velocity({
				"margin-left": "50px"
			},$slideTime);
			$(".nav li a span, .progress").hide();

			$('.js-expand').removeClass("close");
			$('.js-expand').addClass("open");

		}else{
			//mobile to tablet size
			$('.js-sidebar').velocity({
				width: $width
			},$slideTime,function(){
				$(".nav li a span, .progress").show();
			});

			$('.nav li a').velocity({
				paddingLeft: '25px',
				paddingRight: '25px',
				paddingTop: '20px',
				paddingBottom: '20px'
			},$slideTime);

			$(".content").velocity({
				"margin-left": $marginLeft
			},$slideTime);

			$('.js-expand').removeClass("open");
			$('.js-expand').addClass("close");

		}
	}//switchExpand
}
