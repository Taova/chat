/**
 * Created by Марина on 25.05.2017.
 */
(function () {
    'use strict';

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
            let messageHtml = this.data.messages.map(messageData => {
                return `<div class="chat__item">
                            <div class="chat__message">
                                <span class="chat__autor">${messageData.username}</span>
                                ${messageData.message}
                            </div>
                        </div>`;
                }).join('<br/>');
            this.el.innerHTML = `
                <div class="chat">
                    ${messageHtml}
                </div>
            `;
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