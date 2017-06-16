/**
 * Created by Марина on 27.05.2017.
 */

//import
import {Chat} from '../chat/chat';
import {Form} from '../form/form';
import {ChatService} from '../modules/chatService';


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

       document.addEventListener('DOMContentLoaded', () =>{
           if (window.localStorage.getItem('name')) {
               this.chat.setUserName(window.localStorage.getItem('name'));
               this.form.setNameValue(window.localStorage.getItem('name'));
           }

       });



        this.form.onSubmit = (message) => {

            if (message.username) {
                this.chat.setUserName(message.username);
            }

            let data = {
                message: message.message,
                username: this.chat.getUsername()
            };


            chatService.sendMessage(data, () => {
                console.log('send new Message');
            });

           this.chat.addMessages();
           this.chat.render();
           this.form.reset();
        };


    }
}

window.App = App;