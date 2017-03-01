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
        .then(data => JSON.parse(data)['result'])
}

module.exports = getBangumis;