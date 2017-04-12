  $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [':disabled'],
        fields: {
            first_name: {
                validators: {
                        stringLength: {
                        min: 2,
                    },
                        notEmpty: {
                        message: 'Please supply your first name'
                    }
                }
            },
             last_name: {
                validators: {
                     stringLength: {
                        min: 2,
                    },
                    notEmpty: {
                        message: 'Please supply your last name'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your email address'
                    },
                    emailAddress: {
                        message: 'Please supply a valid email address'
                    }
                }
            },
            phone: {
                validators: {
                  stringLength: {
                        min: 10,
                        max : 10
                    }, 
                    notEmpty: {
                        message: 'Please supply your phone number'
                    }
                }
            },
            address: {
                validators: {
                     stringLength: {
                        min: 8,
                    },
                    notEmpty: {
                        message: 'Please supply your street address'
                    }
                }
            },
            state: {
                validators: {
                  callback: {
                            message: 'Please select State !',
                            callback: function (value, validator, $field) {
                                // Determine the numbers which are generated in captchaOperation
                                var value = $('#listBox').find(":selected").text();
                                console.log("State : "+value);
                                return value != "SELECT STATE";
                            }
                        }
                }
            },
            category: {
                validators: {
                  callback: {
                            message: 'Please select problem category !',
                            callback: function (value, validator, $field) {
                                // Determine the numbers which are generated in captchaOperation
                                var value = $('#problemList').find(":selected").text();
                                console.log("State : "+value);
                                return value != "SELECT PROBLEM";
                            }
                        }
                }
            },

            zip: {
                validators: {
                    notEmpty: {
                        message: 'Please supply your zip code'
                    },
                  max : 6,
                  min : 6
                }
            },
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            console.log("Before doing post request");
            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log("result is : "+result);
                $("#success_message").html("Success <i class='glyphicon glyphicon-thumbs-up'></i> Thanks for creating complaint. Your token no is "+result.token);
            }, 'json');
        });
});


