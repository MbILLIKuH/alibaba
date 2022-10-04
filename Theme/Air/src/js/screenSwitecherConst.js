class ScreenSwitcher {
	constructor($container, callback, onInit) {
		this.$container = $container;
		this.$sections = $container.children();
		this.callback = callback;
		this.dataParam = 'param';
		this.attr = `data-${this.dataParam}`;
		this.active = this.$container.children('.-active').data(this.dataParam);
		this.flag = false;
		this.animationClasses = {
			'up': { current: '-scrollCurrentDown', new: '-scrollNewDown' },
			'down': { current: '-scrollCurrentUp', new: '-scrollNewUp' },
			'left': { current: '-scrollCurrentRight', new: '-scrollNewRight' },
			'right': { current: '-scrollCurrentLeft', new: '-scrollNewLeft' },
		};
		this.scroll();
		this.keyPress();
		this.touch();
		if (typeof onInit === 'function') {
        	setTimeout(onInit, 0);
        }
	}

	switcher(id, direction) {  //direction: up,down,left,right
		if (this.flag || this.active === id) return;
    	this.flag = true;
    	const $currentActiveSection = this.$sections.closest(`[${this.attr}="${this.active}"]`);
    	const $newActiveSection = this.$sections.closest(`[${this.attr}="${id}"]`);
    	const currentActiveSectionAnimate = this.animationClasses[direction].current;
    	const newActiveSectionAnimate = this.animationClasses[direction].new;

    	$currentActiveSection.addClass(currentActiveSectionAnimate);
    	$newActiveSection.addClass(newActiveSectionAnimate);
		$newActiveSection.one('animationend', () => {
			this.$sections.removeClass(`${currentActiveSectionAnimate} ${newActiveSectionAnimate} -active`);
			$newActiveSection.addClass('-active');
        	this.active = id;
        	this.flag = false;
        	if (typeof this.callback === 'function') {
        		this.callback();
        	}
		});
		$newActiveSection.find('.-stop').one('animationend', function(event) {
	    	event.stopPropagation();
	    });
	}

	scroll() {
		this.$container.bind('mousewheel DOMMouseScroll', (event) => {
			if ($(event.target).closest('.-inActive').length) {
				return true;
			}
			const $activeSection = this.$sections.closest(`[${this.attr}="${this.active}"]`);
			let id = null;
			let direction;

	        if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
	        	const $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');
	            if ($prevActiveSection.length) {
	            	id = $prevActiveSection.first().data(this.dataParam);
	            	direction = 'up';
	            }
	        } else {
	            const $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');
	            if ($nextActiveSection.length) {
	            	id = $nextActiveSection.first().data(this.dataParam);
	            	direction = 'down';
	            }
	        }
	        if (event.ctrlKey == false) {
		        if (id) {
		            this.switcher(id, direction);
		        }
		    }
		});
	}

	keyPress() {
		$(document).on('keydown', (event) => {
			const $activeSection = this.$sections.closest(`[${this.attr}="${this.active}"]`);
			let id = null;
			let direction;

			if (event.keyCode == 38) {
				const $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');
	            if ($prevActiveSection.length) {
	            	id = $prevActiveSection.first().data(this.dataParam);
	            	direction = 'up';
	            }
			} else if (event.keyCode == 40) {
				const $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');
	            if ($nextActiveSection.length) {
	            	id = $nextActiveSection.first().data(this.dataParam);
	            	direction = 'down';
	            }
			}

			if (!$(event.target).is('input')) {
				if (id) {
			        this.switcher(id, direction);
			    }
			}
		});
	}

	touch() {
		let id = null;
		let direction;
		let touchStart = null;
		let touchEnd = null;

		$(window).on('touchstart' , (event) => {
			if ($(event.target).closest('.-inActive').length) {
				return true;
			}
			touchStart = event.originalEvent.changedTouches[0].pageY;
		});
		$(window).on('touchend' , (event) => {
			if ($(event.target).closest('.-inActive').length) {
				return true;
			}
			id = null;
			touchEnd = event.originalEvent.changedTouches[0].pageY;

			const $activeSection = this.$sections.closest(`[${this.attr}="${this.active}"]`);
			let touchDifference = touchStart - touchEnd;

			if (touchDifference < -75) {
				const $prevActiveSection = $activeSection.prevAll(':not(.-no-global)');
	            if ($prevActiveSection.length) {
	            	id = $prevActiveSection.first().data(this.dataParam);
	            	direction = 'up';
	            }
			} else if (touchDifference > 75) {
				const $nextActiveSection = $activeSection.nextAll(':not(.-no-global)');
	            if ($nextActiveSection.length) {
	            	id = $nextActiveSection.first().data(this.dataParam);
	            	direction = 'down';
	            }
			}

			if (id) {
			    this.switcher(id, direction);
			}
		});
	}
}