OA.InputForm = function(element, configuration) {
    /*
    Get all the parts of the form for easy access later.
     */
    this.container = $(element);
    this.label = $(this.container.find('label')[0]);
    this.input = $(this.container.find('textarea')[0]);
    this.checkbox = $(this.container.find('input[type=checkbox]')[0]);
    this.buttons = {
        collecting: $('.action-collecting button'),
        error: $('.action-error button'),
        success: $('.action-success button')
    };

    if (typeof(URI(window.location).query(true).parentLocation) !== 'undefined') {
        this.parentLocation = URI(window.location).query(true).parentLocation;
    } else {
        // assume we're not in an iframe for some weird reason and set to ourself
        this.parentLocation = window.location.origin;
    };

    /*
    Presets. Can be overidden with a call to .configure()
     */
    this.labelText = "Address";
    this.placeholder = "Enter an address";

    //Statuses for the form - this relates to what is shown; you can set these with setState()
    this.formStatuses = [
        "collecting",
        "success",
        "loading",
        "error"
    ];

    //configure the form; .configure() can be called later as well / instead.
    if (typeof(configuration) !== 'undefined') {
        this.configure(configuration);
    }
    this.init();

};

// Configure the fields with an object provided
OA.InputForm.prototype.configure = function(config) {
    if (typeof(config) !== 'undefined') {
        this.labelText = ((config.labelText == null) ? this.labelText : config.labelText);
        this.placeHolder = ((config.placeHolder == null) ? this.placeHolder : config.placeHolder);
    };
};

// initialize the form
OA.InputForm.prototype.init = function() {
    var _this = this;
    this.label.html(this.labelText);
    this.input.attr('placeholder', this.placeHolder);
    this.buttons.collecting.click(function(event) {
        _this.submitForm();
    });
    this.buttons.error.click(function(event) {
        _this.setState('collecting');
    });
    this.buttons.success.click(function(event) {
        _this.setState('collecting');
    });
};


//check the form is valid; set the error state if it's not
OA.InputForm.prototype.validate = function() {
    if (this.input.val()) {
        return true;
    } else {
        this.setState('error');
        this.sendMessageToParent('error',"You need to enter an address");
        return false;
    }
};

// Submit the form to OA
OA.InputForm.prototype.submitForm = function() {
    var data = {
        address: this.input.val(),
        contribute: this.checkbox.prop('checked')
    };
    if (this.validate()) {
        $.ajax({
            method: 'post',
            url: OA.url,
            data: data,
            context: this,
            beforeSend: function(xhr,obj) {
                this.onLoading(data);
            },
            success: function(data,status,xhr) {
                this.onSuccess(data);
            },
            error: function(xhr,status,error) {
                this.onError(error);
            }
        })
    }
};

// Handle successful submission to OA
OA.InputForm.prototype.onLoading = function(data) {
    this.sendMessageToParent('loading', data);
    this.setState('loading')
};

// Handle successful submission to OA
OA.InputForm.prototype.onSuccess = function(data) {
    this.sendMessageToParent('success', data);
    this.setState('success')
};

// Handle unsuccessful submission to OA
OA.InputForm.prototype.onError = function(message) {
    this.sendMessageToParent('error',message);
    this.setState('error');
};

OA.InputForm.prototype.setState = function(status) {
    var className = 'is-'+status;
    var _container = this.container;
    $(this.formStatuses).each(function(i,val) {
        _container.removeClass("is-"+val);
    });
    this.container.addClass(className);
    if (status == 'collecting') {
        this.input.attr('disabled',false);
        this.input.focus();
    }

    if (status == 'loading' || status == 'error') {
        this.input.attr('disabled',true);
    }
};

OA.InputForm.prototype.sendMessageToParent = function(type,data) {
    var content = {
        type: type,
        data: data
    };
    parent.postMessage(content,this.parentLocation);
};


