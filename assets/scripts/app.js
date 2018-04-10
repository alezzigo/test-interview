'use strict';

var dropdowner = function (selector) {

    function init() {

        var elements = document.getElementsByClassName(selector);

        if (elements.length <= 0) return;
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.addEventListener('click', onClick);
        }
    }
    function onClick(event) {
        var parent = event.target && event.target.parentNode;
        parent && parent.toggleCalss('open');
    }

    Element.prototype.toggleCalss = function (classname) {
        if (!this.hasClass(classname)) {
            return this.className += ' ' + classname;
        }

        return this.className = this.className.replace(' ' + classname, '');
    };

    Element.prototype.hasClass = function (classCheck) {
        if (typeof classCheck !== 'string' || classCheck === '') return true;
        var classArray = this.className.split(' ');
        return classArray.indexOf(classCheck) > 0 ? true : false;
    };

    return {
        start: function start() {
            init();
        }
    };
}('icon-expand');

var validater = function (selector, namesValidate) {

    function init() {

        document.getElementById(selector).addEventListener('submit', onSubmit);
    }

    function onSubmit(event) {

        event.preventDefault();
        var formData = document.forms['form'];
        var objectData = {};
        for (var i = 0; i < namesValidate.length; i++) {
            var name = namesValidate[i];

            var element = formData[name];

            if (!element) {
                continue;
            }

            if (element.value === '') {
                alert('This ' + name + ' need content');
                break;
            }

            objectData[name] = element.value;

            console.log(name, ' : ', element.value);
        }

        console.log('Data', objectData);
    }

    return {
        start: function start() {
            init();
        }
    };
}('form', ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'firstname', 'lastname', 'company_name', 'email_address', 'office_address', 'phone_number', 'contact', 'send_email']);

var app = function () {
    var stack = [];
    return {
        add: function add(serve) {
            stack.push(serve);
        },
        start: function start() {
            stack.forEach(function (serve) {
                serve.start();
            });
        }
    };
}();

app.add(validater);
app.add(dropdowner);

window.onload = app.start;