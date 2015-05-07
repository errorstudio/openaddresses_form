/*
Configuration options:

{
 labelText: "Label for the field",
 placeHolder: "Enter an address",

}
 */

if(!console.log) console.log = function(){};
var OpenAddresses = {
    SortingOffice: function(config) {
        _this = this;
        configure = function() {
            var iframe = document.createElement("iframe");
            iframe.src="//localhost:8000/embed.html";
            iframe.width = '500px';
            iframe.height = '290px';
            iframe.scrolling = 'no';
            iframe.frameBorder = 0;
            iframe.seamless = 'seamless';
            document.getElementById("openaddresses-form").appendChild(iframe);
        };

        inject = function() {

        }

        OpenAddresses.config = config;
        configure();
        inject();
    }
};
OpenAddresses.SortingOffice({

});





