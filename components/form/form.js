/**
 * Created by Марина on 25.05.2017.
 */


//import
import tmpl from './form.tmpl.pug';

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
        this.setNameValue(formData.username);
    }

    onSubmit(message) {
        console.info(`message: ${message}`);
        console.warn('Error in event onSubmit file form.js');
    }

    setNameValue(name) {
        name = name || window.localStorage.getItem('name');
        if (name) {
            this.input[0].value = name;
            this.input[0].hidden = true;
        }
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
        this.input = this.el.querySelectorAll('input');
        this.formEl = this.el.querySelector('form');
    }

    reset() {
        this.formEl.reset();
    }



}


//export
export {Form};