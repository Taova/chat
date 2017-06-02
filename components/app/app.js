/**
 * Created by Марина on 27.05.2017.
 */
(function () {
    'use strict';

    //import
    const Chat = window.Chat;
    const Form = window.Form;
    const ChatService = window.ChatService;
    const chatService = new ChatService({
        baseUrl : 'https://chat-1c82d.firebaseio.com/messages.json'
    });

    class App {
        constructor(options) {
            this.el = options.el;

            this._createComponents();
            this._initMediate();

            this.render();
        }

        render() {
            this.form.render();
            this.chat.render();
        }

        _createComponents() {
            this.form = new Form({
                el: document.querySelector('.js-form')
            });

            this.chat = new Chat({
                el: document.querySelector('.js-chat'),
                chatService
            });

        }

       _initMediate() {

           document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'hidden') {
                  this.chat.stopPolling();
              } else {
                  this.chat.stopPolling();
                  this.chat.startPolling();
              }
           });

           // document.addEventListener("DOMContentLoaded", this.chat.startPolling);


            // this.chatService.getMessage( (newMessage) => {
            //     let msg =  Object.values(newMessage);
            //     this.chat.setMessages(msg);
            //     this.chat.render();
            //     this.form.reset();
            // });



            this.form.onSubmit = (message) => {
                let data = {
                    message: message.message,
                    username: message.username
                };

                chatService.sendMessage(data, () => {
                    console.log('send new Message');
                });

                //получить сообщения ?
               this.chat.addMessages();
               this.chat.render();
               this.form.reset();

           //     this.chatService.sendMessage(senData, () => {
           //          this.chat.render();
           //          this.form.reset();
           //          return function (msg) {
           //              console.log(msg);
           //          }
           //      });
           //     this.chatService.getMessage( (newMessage) => {
           //         let msg =  Object.values(newMessage);
           //     this.chat.setMessages(msg);
           //     this.chat.render();
           //     this.form.reset();
           // });

            };
        }
    }
    window.App = App;
})();
