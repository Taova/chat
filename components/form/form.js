/**
 * Created by Марина on 25.05.2017.
 */
(function () {
    'use strict';

    class Form {
        constructor({el}) {
            this.el = el;
            this._initEvents();
        }

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
            this.el.innerHTML = `
            <form class="form">
                <input type="text" name="username" placeholder="Name" required>
                <textarea name="message" rows="4" placeholder="Message" required></textarea>
                <br/>
                <input type="submit">
            </form>
            `;
        }
    }


    //export
    window.Form = Form;
})();