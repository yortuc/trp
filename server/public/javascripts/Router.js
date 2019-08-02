class Router {
    constructor(mb) {
        this.mb = mb;

        //listen for link click events at the document level
        if (document.addEventListener) {
            document.addEventListener('click', this.interceptClickEvent.bind(this));
        } else if (document.attachEvent) {
            document.attachEvent('onclick', this.interceptClickEvent.bind(this));
        }
    }

    interceptClickEvent(e) {
        var href;
        var target = e.target || e.srcElement;
        if (target.tagName === 'A') {
            href = target.getAttribute('href');
    
            console.log("Link clicked:", href);
            
            this.mb.say("/link/clicked", href);
        
            e.preventDefault();
        }
    }
}
