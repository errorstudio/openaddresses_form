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

    /*
    Presets. Can be overidden with a call to .configure()
     */
    this.labelText = "Address";
    this.placeholder = "Enter an address";

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
        _this.setStatus('collecting');
    });
    this.buttons.success.click(function(event) {
        _this.setStatus('collecting');
    });
    this.input.focus();
};



OA.InputForm.prototype.isValid = function() {
    if (this.input.val()) {
        return true;
    } else {
        this.setStatus('error');
        return false;
    }
};

// Submit the form to OA
OA.InputForm.prototype.submitForm = function() {
    if (this.isValid()) {
        $.ajax({
            method: 'post',
            url: OA.url,
            data: {
                address: this.input.val(),
                contribute: this.checkbox.prop('checked')
            },
            context: this,
            beforeSend: function(xhr,obj) {
                this.onLoading();
            },
            success: function(data,status,xhr) {
                this.handleSuccess(data);
            },
            error: function(xhr,status,error) {
                this.handleError(error);
            }
        })
    };
};

// Handle successful submission to OA
OA.InputForm.prototype.onLoading = function() {
    console.log("loading");
    this.setStatus('loading')
};

// Handle successful submission to OA
OA.InputForm.prototype.handleSuccess = function(data) {
    console.log(data);
    this.setStatus('success')
};

// Handle unsuccessful submission to OA
OA.InputForm.prototype.handleError = function(message) {
    console.log("Error: "+ message);
    this.setStatus('error');
};

OA.InputForm.prototype.setStatus = function(status) {
    var className = 'is-'+status;
    var _container = this.container;
    $(this.formStatuses).each(function(i,val) {
        _container.removeClass("is-"+val);
    });
    this.container.addClass(className);
    if (status == 'collecting') {
        this.input.focus();
    }
};


