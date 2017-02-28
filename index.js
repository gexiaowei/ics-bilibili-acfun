"use strict"

const fs = require('fs');
const ICS = require('ics');
const acfun = require('./lib/acfun');
const bilibili = require('./lib/bilibili');

var ics = new ICS();

return Promise
    .all([bilibili(), acfun()])
    .then(data => {
        data[0].forEach(item => {
            let {pub_date, ontime, title, season_id} = item;
            ics.addEvent({
                start: `${pub_date} ${ontime}`,
                title: `bilibili-${title}`,
                url: `http://bangumi.bilibili.com/anime/${season_id}`,
                status: 'confirmed',
                categories: ['bilibili', 'bangumis']
            })
        })
        return ics.toFile();
    })
    .then(data => {

    })
