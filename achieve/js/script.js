var $sideBarWidth = 70;   //sidebar width
var $desktop = 1200;		 //desktop for media query
var $tablet = 768;		 //desktop for media query
var $toggleBox = false;

//initial setup
$(document).ready(function() {

	clickBoxPop('.js-btn-popup ','.js-box-order');		//modal popup
	sideBar();		//load sitebar expand funciton
	navCollapse();  //drop down menu for mobile
	popupOverlay();	//load popupoverlay (for search)
	closePopup();	//closepopup
	tab();			//tab navigation
	tooltip();		//tooltip

	mdInput();		// material design input
	fadeOffTimer(".js-fadeoff");		//Fade off effect with timer
	fadeOffButton(".js-alert");			//Fade off effect once click
	adjustHeight(".js-sidebar",".js-content");   // to extend object height equal to the viewport height
	//$( ".js-calendar" ).datepicker();

});


function clickBoxPop(btnPop,popupBox){
	var $orderBox = $(popupBox);
	$orderBox.css({"top":70,"right": 25});

	$(btnPop).bind("click", function(){
		if ($(this).parent().find(popupBox).data('shown')){
	       hide(popupBox);
	    }else{
	    	display($(this).parent().find(popupBox),popupBox);
	    }
	});

}

function display(objectClassName, hideObject) {
    if ($(objectClassName).children().length > 0) {
        $(objectClassName).velocity("fadeIn",250, function() {
            $(document).bind("click", function() { hide(hideObject); });
            $(objectClassName).data('shown', true);
        });
    }
}

function hide(objectClassName) {
    if (!$(window.event).hasClass('js-noclick')) {
        $(objectClassName).velocity("fadeOut",250, function() {
            $(document).unbind("click");
            $(objectClassName).data('shown', false);
        });
    }
}


function fadeOffButton(object){
	$(".js-btnclose").on("click", function(){
		$(object).fadeOut();
	})
}


function fadeOffTimer(object){
	setTimeout(function(){
		$(object).fadeOut(function(){
			$(object).remove()
		});
	}, 4000);

}

function fixLabel(input) {
	if ( input.val().trim() != "" ) {
		input.addClass("used");
	} else {
		input.removeClass("used");
	}
};

function mdInput() {

	// Fix input at initial state
	$('.input-group--md input').each( function(index, input) {
 		fixLabel($(input));
	});

	$('.input-group--md input').on("blur change keyup",function(e) {
		fixLabel($(e.currentTarget));
	});

}//mdInput()

function tab(){
	$('.js-tab-btn li').on('click',function(e){
		var curID = $(this).attr('data-tab');

		$('.js-tab-btn li').removeClass('active');
		$('.js-tab-content').removeClass('active');

		$(this).addClass('active');
		$("#"+curID).addClass('active');
	})
}//tab


function tooltip(){

	if ($(window).width() <= $tablet) {
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
}//tooltip

function closePopup(){
	$('.js-btnclose').on('click',function(e){
		$('.js-overlay').velocity("fadeOut",function(){
			//$('.js-overlay').remove();
			$('html,body').css('overflow','auto');
		});
	});
}//closePopup

function popupOverlay(){
	$('.js-popup').on('click',function(e){
		e.preventDefault();
		$('.js-overlay').velocity("fadeIn");
		$('html,body').css('overflow','hidden')
		//$('.js-overlay').load('search.html');
	});
}//popupOverlay


function popupBox(){
	var $orderBox = $(".js-box-order");
	var $pos;

	$('.js-btn-edit').on("click",function(e){
		$pos = $(this).offset();

		e.preventDefault();
		$orderBox.css({"top":$pos.top+50,"right":  ($(window).width() - ($pos.left + $(this).outerWidth())-35)});
		$orderBox.toggle();
	});
}//popupBox


function navCollapse(){
	$('.js-collapse').on("click",function(e){
		$(".nav-tab ul").slideToggle();
	});
}//navCollapse


// For tab navigation when in movie become drop down
function navTab(){

	var toggleTab = false;

	if ($(window).width() <= $desktop ) {

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

				toggleTab = false;
			}

		})//click
	}
}//navTab

function adjustHeight(sidebar, content){

	setTimeout(function(){

	  var sidebar_height = $(sidebar).outerHeight();
	  var content_height = $(content).outerHeight();
	  var viewport_height = $(window.document).height();

	  //console.log(sidebar_height + " sidebar |",content_height + " content |",viewport_height + " viewport");

	  if(sidebar_height < viewport_height && content_height < viewport_height){
	    $(sidebar).css({'height': viewport_height});
	  }else if(content_height > sidebar_height){
	    $(sidebar).css({'height': content_height});
	  }

	},50);
}


// Sidebar collapse
function sideBar(){

	var $toggleSlide = false;
	var $slideTime = 300;

	if($(window).width() <= 1024 && $(window).width() >= 600){
		$toggleSlide = true;
	}

	$('.js-expand').on("click",function(event){
		console.log('click');
		adjustHeight(".js-sidebar",".js-content");   // to extend object height equal to the viewport height
		if ($(window).width() <= $tablet) {
			//mobile
			if($toggleSlide){
				switchExpand(false,false);
				$toggleSlide = false;
			}else{
				switchExpand(true,false);
				$toggleSlide = true;
			}
		}else{
			//tablet desktop size
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

			$(".js-content").velocity({
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

			$(".js-content").velocity({
				"margin-left": $marginLeft
			},$slideTime);

			$('.js-expand').removeClass("open");
			$('.js-expand').addClass("close");
		}
	}//switchExpand
}
