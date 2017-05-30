/**
 * Created by Марина on 29.05.2017.
 */
"use strict";

function makeRequest(callback, type = 'GET', data = {}) {

    let req = new XMLHttpRequest();

    req.open(type, 'https://chat-1c82d.firebaseio.com/messages.json', true);
    req.addEventListener('readystatechange', (event) => {
        if (req.readyState !== 4) {
            return;
        }
        let respData = JSON.parse(req.responseText);
        callback(respData);
    });

    req.send(JSON.stringify(data));
}
