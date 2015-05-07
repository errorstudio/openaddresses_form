var OpenAddresses = {};
if(!console.log) console.log = function(){};

OpenAddresses.SortingOffice = function() {
    var iframe = document.createElement("iframe");
    iframe.src="//localhost:8000/embed.html";
    iframe.width = '100%';
    //iframe.height = options.height || '650';
    iframe.frameBorder = 0;
    iframe.seamless = 'seamless';
    document.getElementById("openaddresses-form").appendChild(iframe);
};


OpenAddresses.SortingOffice.prototype.injectIframe = function() {

};



