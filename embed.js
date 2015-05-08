/*
Configuration options:

{
 onLoading: function() {},  // called when loading begins
 onError: function(error) {}, // called when an error occurs
 onSuccess: function(data) {}, // called when OA returns data
 embedInto: container // if specified, we embed into the container instead of the default.



}
 */

if(!console.log) console.log = function(){};
var OpenAddresses = {
    SortingOffice: {
        embedUrl: "http://clients.errorstudio.co.uk/oa/embed.html",

        // Configure the object
        configure: function(config) {
            var _this = OpenAddresses.SortingOffice;
            _this.config = ((typeof(config) === 'undefined') ? {} : config);
            window.addEventListener('message', _this.receiveMessage, false);
        },

        // handle message received from the message event listener.
        receiveMessage: function(event) {
            var _this = OpenAddresses.SortingOffice;
            var data = event.data.data;
            var messageType = event.data.type;
            //check the message is from the iframe URL
            switch (messageType) {
                case 'error':
                    _this.onError(data);
                    break;
                case 'success':
                    _this.onSuccess(data);
                    break;
                case 'loading':
                    _this.onloading(data);
                    break;
            }

        },

        // called using postMessage from the iframe. If there's an onLoading callback configured,
        // this function will call that
        onloading: function(sentData) {
            _this = OpenAddresses.SortingOffice
            if (typeof(_this.config.onLoading) === 'function') {
                _this.config.onLoading(sentData);
            }
        },
        // called using postMessage from the iframe. If there's an onSuccess callback configured,
        // this function will call that
        onSuccess: function(receivedData) {
            _this = OpenAddresses.SortingOffice
            if (typeof(_this.config.onSuccess) === 'function') {
                _this.config.onSuccess(receivedData);
            }
        },

        // called using postMessage from the iframe. If there's an onError callback configured,
        // this function will call that
        onError: function(message) {
            _this = OpenAddresses.SortingOffice
            if (typeof(_this.config.onError) === 'function') {
                _this.config.onError(message);
            }
        },

        // inject the iframe into the page
        injectIframe: function() {
            _this = OpenAddresses.SortingOffice
            var iframe = document.createElement("iframe");
            var queryString = '?parentLocation=' + window.location;
            iframe.src= OpenAddresses.SortingOffice.embedUrl + queryString;
            iframe.width = '500px';
            iframe.height = '290px';
            iframe.scrolling = 'no';
            iframe.frameBorder = 0;
            iframe.seamless = 'seamless';
            iframe.style = "margin: 0; padding: 0";
            iframe.id = "openaddresses-form-iframe";
            if (typeof(_this.config.embedInto) !== 'undefined' && _this.config.embedInto != null) {
                _this.config.embedInto.appendChild(iframe)
            } else {
                var elem = document.getElementById("openaddresses-form");
                if (elem != null) {
                    elem.appendChild(iframe);
                } else {
                    throw("You haven't specified a location to embed the address form into, and there is no element with ID 'openaddresses-form'");
                }
            }
        },

        // the method called by the developer doing the embedding - receives a config object.
        embed: function(config) {
            _this = OpenAddresses.SortingOffice;
            _this.configure(config);
            _this.injectIframe();
        }
    }
};







