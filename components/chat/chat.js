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
        constructor({ el, data = { messages:[] }, chatService }) {
            this.el = el;
            this.data = data;
            this.chatService = chatService;
            this._init();
        }

        _init() {
            this.startPolling();
            this.addMessages();
        }

        startPolling() {
            this._pollingId = setInterval(() => {
                this.addMessages();

            }, 8000);
        }

        stopPolling() {
            clearInterval(this._pollingId);
        }

        render() {
            this.el.innerHTML = tmpl(this.data);
        }

        /**
         * Add message into chat store. Without render
         * @param {ChatMessage} данные сообщения
         */
        adMessages(message) {
            this.data.messages.push(message);
        }

        addMessages() {
            this.chatService.getMessage((data) => {
                console.log('Получаем сообщение из ', data);
                this.setMessages(data);
                this.render();
            });
        }


        setMessages(messages) {
            messages = Object.values(messages);
            this.data.messages = messages.map( (item) => ({
                message: item.message,
                username: item.username,
                data: item.data || null,
                img: item.img || './components/img/noavatar.png'
            }));
        }
    }

    //export
    window.Chat = Chat;
})();