/**
 * Created by Марина on 27.05.2017.
 */
(function () {
    'use strict';

    //import
    const Chat = window.Chat;
    const Form = window.Form;

    class App {
        constructor(options) {
            this.el = options.el;

            this._createComponents();
            this._initMediate();

            this.el.appendChild(this.chat.el);
            this.el.appendChild(this.form.el);

            this.render();
        }

        render() {
            this.form.render();
            this.chat.render();
        }

        _createComponents() {
            this.form = new Form({
                el: document.createElement('div')
            });

            this.chat = new Chat({
                el: document.createElement('div')
            });
        }

        _initMediate() {
            this.form.onSubmit = (message) => {
                this.chat.addMessages(message);
                this.chat.render();
                this.form.reset();
            };
        }
    }
    window.App = App;
})();
