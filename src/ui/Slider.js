Tritium.UI.touchSlideX = function(slider) {
	/* Notes:
	Entity width is assumed to be fixed/constant. */
	var view = slider.getElementsByClassName('view')[0];
	var cont = view.getElementsByClassName('cont')[0];
	var ents = cont.children; // entities
	var btns = slider.getElementsByClassName('index_btns')[0].children;

	var isDrag = false;
	var startScroll;
	var endScroll;
	var startPosX;
	var endPosX;
	var index = 0;
	var startIndex = 0;

	cont.style.width = (100*ents.length)+'%';
	for(var i=0, l=ents.length; i < l; i++) {
		ents[i].style.width = (100*1/ents.length)+'%';
	}
	
	var scrollFx = new Fx.Scroll(view);

	view.onscroll = function(event) {
		index = Math.round(this.scrollLeft / this.clientWidth);

		for(var i=0, l=btns.length; i < l; i++) {
			if( i == index )
				btns[i].set('class','active');
			else
				btns[i].set('class','inactive');
		}
	};

	/* when we start dragging, need to handle via the doc since we will
	 go out of bounds */
	var start = function(e) {
		document.addEvents({
			mousemove: drag,
			mouseup: stop
		});
		document.body.addEvents({
			touchmove: drag,
			touchend: stop
		});
		
		startPosX = e.page.x;
		startScroll = view.scrollLeft;
		startIndex = index;
	};

	var drag = function(e) {
		e.preventDefault();
		isDrag = true;
		
		// move the view horizontally within the viewport as we drag
		view.scrollLeft = startScroll - (e.page.x - startPosX);
	};

	var stop = function(e) {
		// if dragging, don't allow click events to pass through
		if(isDrag) e.preventDefault();
		
		// undo all the events we added when we started dragging
		document.removeEvents({
			mousemove: drag,
			mouseup: stop
		});
		document.body.removeEvents({
			touchmove: drag,
			touchend: stop
		});
		
		isDrag = false;
		endPosX = e.page.x;
		endScroll = view.scrollLeft;
		
		if( (endScroll - startScroll) > 0 ) {
			scrollFx.start(ents[startIndex+1].offsetLeft,0);
		} else if( (endScroll - startScroll) < 0 ) {
			scrollFx.start(ents[startIndex-1].offsetLeft,0);
		} else {
			scrollFx.start(ents[startIndex].offsetLeft,0);
		}
	};

	/* add initial event to start dragging */
	view.addEvents({
		mousedown: start,
		touchstart: start
	});

	function debug() {
		document.id("debug_s").innerHTML += 
			'<br/>' + 
			'view.scrollLeft : ' + view.scrollLeft
			+ '<br/>' + 
			'index : ' + index
			+ '<br/>' + 
			'isDrag : ' + isDrag
			+ '<br/>' + 
			'startPosX : ' + startPosX
			+ '<br/>' + 
			'endPosX : ' + endPosX
			+ '<br/>' + 
			'startScroll : ' + startScroll
			+ '<br/>' + 
			'endScroll : ' + endScroll
		;
	}
};
	
