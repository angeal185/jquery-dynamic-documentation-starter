//js
function htmlEncode( html ) {
	return document.createElement( 'a' ).appendChild(
		document.createTextNode( html ) ).parentNode.innerHTML;
};

function checkExistElement(element) {
	if ($(element).length > 0) {
		return true;
	}
	var $liCurrent = $('a[href="' + element + '"]').parent();
	var count = 0;
	$('li > a', $liCurrent).each(function() {
		var id = $(this).attr('href');
		if ($(id).length > 0) {
			count++;
		}
	});
	return count > 0;
}

function showAllChildSection(element) {
	var $liCurrent = $('a[href="' + element + '"]').parent();
	$('li > a', $liCurrent).each(function() {
		var id = $(this).attr('href');
		$(id).show();
	});
}

function scrollToCurrentLocation(id) {
	var liCurrentTop = $('a[href="' + id + '"]').position().top;
	var liHeight = $('a[href="' + id + '"]').outerHeight();
	var scrollTop = $('.nav-wrapper').scrollTop();
	var navWrapperHeight = $('.nav-wrapper').outerHeight();
	if (liCurrentTop < 0) {
		$('.nav-wrapper').animate({scrollTop: (scrollTop + liCurrentTop) + 'px'},300);
	}
	else if (liCurrentTop + liHeight > navWrapperHeight) {
		$('.nav-wrapper').animate({scrollTop: ((liCurrentTop + liHeight - navWrapperHeight) + scrollTop) + 'px'},300);
	}
}

$(document).ready(function() {
	$('textarea[data-lang]').each(function() {
		var $this = $(this);
		var data_lang = $this.attr('data-lang');
	});

	$('.nav-wrapper').perfectScrollbar({
		wheelSpeed: 0.5,
		suppressScrollX: true
	});

    $('.nav-wrapper-r').perfectScrollbar({
		wheelSpeed: 0.5,
		suppressScrollX: true
	});

	var hash = location.hash;
	var currentSection = $('section:first-child').attr('id');
	if (typeof (currentSection) != "undefined") {
		currentSection = '#' + currentSection;
		$('a[href="' + currentSection + '"]').parent().addClass('current');
	}

	var allowClick = true;

	if ((hash != null) && (hash != '')) {
		if (checkExistElement(hash)) {
			allowClick = false;
			$('a[href="' + currentSection + '"]').parent().removeClass('current');
			$('a[href="' + hash + '"]').parent().addClass('current');
			$(currentSection).fadeOut(function() {
				$(hash).fadeIn(function() {
					allowClick = true;
				});
				currentSection = hash;
				showAllChildSection(currentSection);
				scrollToCurrentLocation(currentSection);
			});
		}
	}

	$('nav li a, a.data-ref').click(function() {
		if (!allowClick) {
			return;
		}
		var id = $(this).attr('href');
		if (typeof (id) != "undefined" && id != null & id != '' && (id.indexOf('#') != -1)) {
			if (checkExistElement(id)) {
				allowClick = false;
				$('a[href="' + currentSection + '"]').parent().removeClass('current');
				$('a[href="' + id + '"]').parent().addClass('current');
				$('section').hide();
				$('html,body').animate({scrollTop: '0px'},10, function() {
					$(id).show();
					currentSection = id;
					showAllChildSection(id);
					allowClick = true;
				});
				scrollToCurrentLocation(id);
			}
		}
	});

});