/**
 * Created by Марина on 02.06.2017.
 */
(function () {
    'use strict';

    class ChatService {
        constructor({baseUrl}) {
            this.baseUrl = baseUrl;
        }

        _makeRequest(cb, type = 'GET', data = {}) {
            let xhr = new XMLHttpRequest();
            xhr.open(type, this.baseUrl, true);

            xhr.onload = function () {
                cb(JSON.parse(xhr.responseText));
            };

            xhr.send(JSON.stringify(data));
        }

        getMessage (cb) {
            this._makeRequest( (msg) => {
                cb(Object.values(msg));
            });
        }

        sendMessage (data, cb) {
            data.data = Date.now();
            this._makeRequest(cb, 'POST', data);
        }

    }

    //export
    window.ChatService = ChatService;
})();