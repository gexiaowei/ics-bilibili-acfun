/**
 * bilibili.js
 * get bangumis from bilibili.com
 */
"use strict";
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { multiArgs: true });

const URL = 'http://bangumi.bilibili.com/web_api/timeline_v4.json'

function getBangumis() {
    return request({ url: URL })
        .then(data => data[1])
        .then(data => {
            console.log('data: ', data);
            return JSON.parse(data)['result']
        })


}

getBangumis().then(data => {
    console.log('data: ', data);
});