/**
 * acfun.js
 * get bangumis from acfun.com
 */
"use strict";

const cheerio = require('cheerio');
const moment = require('moment');
const Promise = require('bluebird');
const request = Promise.promisify(require('request'), { multiArgs: true });

const URL = 'http://www.acfun.cn';
const WEEK_DAY = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
function getBangumis() {
    return request({ url: URL })
        .then(data => data[1])
        .then(data => {
            let bangumis = [];
            var $ = cheerio.load(data);
            $('div[m-type="11"]').each((m, item) => {
                $(item).find('li').each((n, bangumi) => {
                    let temp = $(bangumi);
                    bangumis.push({
                        title: `${temp.find('b').text()} ${temp.find('p').text()}`,
                        pub_date: get_time_from_week(WEEK_DAY.indexOf($(item).attr('m-name'))),
                        url: URL + temp.find('a').attr('href')
                    });
                });
            })
            return bangumis;
        });
}

function get_time_from_week(weekday = 0) {
    let current = moment();
    return `${current.add(weekday - current.weekday(), 'days').format('YYYY-MM-DD')} 19:00`;
}

module.exports = getBangumis;