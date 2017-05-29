/**
 * Created by Марина on 25.05.2017.
 */
(function () {
    'use strict';

    //import
    const tmpl= window.chatTmpl;

    /**
     * @typedef {Object} ChatMessage
     * @property {string} username
     * @property {string} message
     */

    class Chat {
        constructor({ el, data = { messages:[] } }) {
            this.el = el;
            this.data = data;
        }

        render() {
            this.el.innerHTML = tmpl(this.data);
        }

        /**
         * Add message into chat store. Without render
         * @param {ChatMessage} данные сообщения
         */
        addMessages(message) {
            this.data.messages.push(message);
        }
    }

    //export
    window.Chat = Chat;
})();