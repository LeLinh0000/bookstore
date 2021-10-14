function Validator(formSelector) {
    var _this = this;
    var formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector))
                return element.parentElement;
            else {
                element = element.parentElement;
            }
        }
    }
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Vui lòng điền đầy đủ thông tin';
        },
        email: function (value) {
            var regex =
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập ít nhất ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui lòng nhập tối đa ${max} ký tự`;
            };
        },
    };

    // Lay ra form Element trong DOM theo form selector
    var formElement = document.querySelector(formSelector);

    // Chi xu ly khi co element trong DOM
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                var isRuleHasValue = rule.includes(':');
                if (isRuleHasValue) {
                    var ruleInfo = rule.split(':');

                    var ruleFunc = validatorRules[ruleInfo[0]](ruleInfo[1]);
                } else {
                    var ruleFunc = validatorRules[rule];
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            //Lang nghe su kien de validate (blur, change,...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        // Ham thuc hien validate
        function handleValidate(event) {
            var rules = formRules[event.target.name];
            var errorMessage;

            for (var rule of rules) {
                errorMessage = rule(event.target.value);
                if (errorMessage) break;
            }

            // Neu co loi thi hien ra UI
            if (errorMessage) {
                var formGroup = getParent(event.target, '.form-group');

                if (formGroup) {
                    var formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerText = errorMessage;
                        formGroup.classList.add('invalid');
                    }
                }
            }
            return !errorMessage;
        }
        //Clear
        function handleClearError(event) {
            var formGroup = getParent(event.target, '.form-group');

            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = '';
                }
            }
        }
    }
    //Xu ly hanh vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        _this.onSubmit();

        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        // Khi khong co loi thi submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll(
                    '[name]:not([disable])',
                );
                var formValues = Array.from(enableInputs).reduce(function (
                    values,
                    input,
                ) {
                    switch (input.type) {
                        case 'radio':
                            if (input.matches(':checked')) {
                                values[input.name] = input.value;
                            }
                            break;
                        case 'checkbox':
                            if (!input.matches(':checked')) {
                                values[input.name] = '';
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }

                            values[input.name].push(input.value);

                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                },
                {});

                //Goi lai ham onsubmit va tra ve gia tri cua form
                _this.onSubmit(formValues);
            } else {
                formElement.submit();
            }
        }
    };
}
