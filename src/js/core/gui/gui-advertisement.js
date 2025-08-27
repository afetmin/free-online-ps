/*
 * miniPaint - https://github.com/afetmin/free-online-ps
 * author: ranxiu
 */

import config from './../../config.js';

var instance = null;

var template = `
	<div class="ad-placeholder">
		<div>Advertisement Space</div>
		<div style="font-size: 10px; margin-top: 5px;">Loading...</div>
	</div>
`;

/**
 * GUI class responsible for rendering advertisement on right sidebar
 */
class GUI_advertisement_class {

    constructor(GUI_class) {
        //singleton
        if (instance) {
            return instance;
        }
        instance = this;

        this.adContainer = null;
        this.isLoaded = false;

        if (GUI_class != undefined) {
            this.GUI = GUI_class;
        }
    }

    render_main_advertisement() {
        this.adContainer = document.getElementById('toggle_advertisement');

        // Debug: Check if element exists
        if (!this.adContainer) {
            console.error('Advertisement container not found: toggle_advertisement');
            return;
        }

        console.log('Advertisement container found:', this.adContainer);
        this.adContainer.innerHTML = template;

        this.set_events();
    }

    set_events() {
        var _this = this;

        // Example ad content - replace with your actual ad code
        this.adContent = `
			<div class="ad-container">
				<a href="#" target="_blank" rel="noopener noreferrer">
					<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QWR2ZXJ0aXNlbWVudCBTcGFjZTwvdGV4dD4KPHRleHQgeD0iMTUwIiB5PSIxNTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2NjY2NjYyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPjMwMHgxNTAgLSBSZXBsYWNlIHdpdGggeW91ciBhZCBjb2RlPC90ZXh0Pgo8L3N2Zz4K" alt="Advertisement" />
				</a>
			</div>
		`;

        // Auto-load advertisement after a short delay
        setTimeout(() => {
            _this.load_advertisement();
        }, 1000);
    }

    load_advertisement() {
        if (this.isLoaded) {
            return;
        }

        this.isLoaded = true;

        // Replace placeholder with actual ad content
        this.adContainer.innerHTML = this.adContent;

        // Emit event for tracking
        if (this.GUI && this.GUI.emit) {
            this.GUI.emit('advertisement_loaded');
        }
    }

    // Method to update ad content dynamically
    update_ad_content(htmlContent) {
        if (this.adContainer) {
            this.adContainer.innerHTML = htmlContent;
            this.isLoaded = true;
        }
    }

    // Method to reset ad (for testing)
    reset_ad() {
        this.isLoaded = false;
        this.adContainer.innerHTML = template;
    }

}

export default GUI_advertisement_class;
