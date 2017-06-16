/**
 * Created by Марина on 25.05.2017.
 */

//import
import tmpl from './chat.tmpl.pug';
import {utils} from '../modules/utils';


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
        // this.startPolling();
        this.addMessages();
    }

    // startPolling() {
    //     this._pollingId = setInterval(() => {
    //         this.addMessages();
    //
    //     }, 8000);
    // }

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
    addMessages() {
        this.chatService.getMessage((data) => {
            console.log('Получаем сообщение из ', data);
            this.setMessages(data);
            this.render();
        });
    }


    /**
     * Устанавливаем текущего юзера
     */
    setUserName (name) {
        this.data.user = name;
        this.saveUserName(name);

  }

    /**
     * Получаем текущего юзера
     */
    getUsername () {
        return this.data.user || window.localStorage.getItem('name');
    }

    /**
     *  Сохраняем текущего юзера
     */

    saveUserName (value) {
        window.localStorage.setItem('name', value);
    }

    setMessages(messages) {
        messages = Object.values(messages);
        this.data.messages = messages.map( (item) => ({
            message: item.message,
            username: item.username,
            isMine: this.getIsMine(item.username, window.localStorage.getItem('name')),
            data: this.setData(item.data) || null,
            img: item.img || './components/img/noavatar.png'
        }));
    }

    getIsMine(name, localname) {
        if (name == localname) {
            return true;
        }
        return false;
    }

    setData(timeMs){
        let ms  = new Date(timeMs);
        let month = ms.getMonth();
        let day = ms.getDate();
        let hours = ms.getHours();
        let min = ms.getMinutes();

        switch(month) {
            case 0: month = 'января'; break;
            case 1: month = 'февраля'; break;
            case 2: month="марта"; break;
            case 3: month="апреля"; break;
            case 4: month="мае"; break;
            case 5: month="июня"; break;
            case 6: month="июля"; break;
            case 7: month="августа"; break;
            case 8: month="сентября"; break;
            case 9: month="октября"; break;
            case 10: month="ноября"; break;
            case 11: month="декабря"; break;

        }
        if (day <= 9) day = "0" + day;
        if (hours <= 9) hours = "0" + hours;
        if (min <= 9) min = "0" + min;

        return `${day} ${month} ${hours} : ${min}`;
    }
}

export {Chat};