/**
 * Created by Марина on 25.05.2017.
 */
(function () {
    'use strict';

    //import
    const tmpl = window.formTmpl;

    class Form {
        constructor({el}) {
            this.el = el;
            this._initEvents();
        }

        /**
         * init the Form events.
         */

        _initEvents() {
            this.el.addEventListener('submit', this._onSubmit.bind(this));
        }

        _onSubmit(event) {
            event.preventDefault();

            let formData = this._getFormData();
            this.onSubmit(formData);
        }

        onSubmit(message) {
            console.info(`message: ${message}`);
            console.warn('Error in event onSubmit file form.js');
        }

        _getFormData() {
            let names = this.el.querySelectorAll('[name]');
            let data = {};

            names.forEach(elem => {
                data[elem.name] = elem.value;
            });

            return data;
        }

        render() {
            this.el.innerHTML = tmpl();
            this.formEl = this.el.querySelector('form');
        }

        reset() {
            this.formEl.reset();
        }
    }


    //export
    window.Form = Form;
})();