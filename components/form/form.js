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
                <input class="form__username" type="text" name="username" placeholder="Name" required>
                <textarea class="form__msg" name="message" rows="4" placeholder="Message" required></textarea>
                <input class="form__submit" type="submit">
            </form>
            `;
        }
    }


    //export
    window.Form = Form;
})();