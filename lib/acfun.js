/**
 * acfun.js
 * get bangumis from acfun.com
 */
"use strict";

const cheerio = require('cheerio');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { multiArgs: true });

const URL = 'http://www.acfun.cn';

function getBangumis() {
    return request({ url: URL })
        .then(data => data[1])
        .then(data => {
            let bangumis = [];
            var $ = cheerio.load(data);
            $('div[m-type="11"]').each((m, item) => {
                $(item).find('li').each((n, bangumi) => {
                    bangumis.push({
                        title: $(bangumi).find('b').text(),
                        ep_index: $(bangumi).find('p').text(),
                        pub_date: $(item).attr('m-name')
                    });
                });
            })
            return bangumis;
        });
}

getBangumis().then(data => {
    console.log('data: ', data);

});