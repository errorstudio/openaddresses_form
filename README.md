# OpenAddresses Sorting Office Form - Address Form as a Service
This is an *address form as a service* widget from [Open Addresses](http://www.openaddressesuk.org).

The Open Addresses Sorting Office API will return well-formatted address data to your page, which you can handle as necessary. Your users can also submit their address to Open Addresses to improve accuracy.

# Prequisites
There are a few prerequisites to using this widget:

* Javascript is required
* You will need to hande the data which is returned, using Javascript

# Usage
## Basic Usage
Include this code on your page - either in your `<head>` or at the bottom of the `<body>`:

```
<script type="text/javascript" async defer>
    (function(config) {
        var oa = document.createElement('script');
        var config = (typeof(config) === 'undefined' ? {} : config);
        oa.src = 'https://21ae14e6.ngrok.com/embed.js';
        oa.type = 'text/javascript';
        oa.async = 'true';
        oa.onload = oa.onreadystatechange = function() {
            var rs = this.readyState;
            if (rs && rs != 'complete' && rs != 'loaded') return;
            try { OpenAddresses.SortingOffice.embed(config); } catch (e) {}
        };
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(oa, s);
    })({
        //your configuration options go here
    });
</script>
```

And this html where you want to put the form:

```
<div id="openaddresses-form"></div>
```

## Configuration Options
```
{
    onLoading: function(data) {
        // Do something with data being sent to Sorting Office
    },
    onError: function(message) {
        // Do something with the error message
    },
    onSuccess: function(data) {
        // Do something with the data returned from Sorting Office
    },
    embedInto: document.getElementById('your-id')[0]
}
```
### Callback Configuration
If you use the script block at the start of this document, you'll get a form on your page, but you aren't handling the response from OpenAddresses. There are 3 callbacks you can configure in the options.
 
#### `onLoading`
The onLoading callback is called as soon as the call to Open Addresses starts, and includes the data being sent to Sorting Office. 

#### `onError`
The onError callback is called whenever an error state is encountered, either before the form is submitted (because validation failed) or after Sorting Office returns an error.

#### `onSuccess`
onSuccess is called when there's some useful data returned from OpenAddresses. See the [Sorting Office Documentation](https://github.com/OpenAddressesUK/sorting_office/blob/master/README.md) for more details of the format.

### Changing where to embed the form
By default, the widget expects an HTML element with an ID of `openaddresses-form` to embed the form into.

You can change this by using the `embedInto` configuration option. Be sure to pass a DOM element into this, not a class or ID reference.

# Advanced Usage
There isn't any advanced usage yet :-) It might be possible to add more configuration options to change colours and things. 
