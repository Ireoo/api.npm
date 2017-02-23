/**
 * Created by ireoo on 16-11-15.
 */
var needle = require('needle');

needle.defaults({
    open_timeout: 60 * 1000,
    user_agent: 'iApi.npm'
});

var config_default = {
    url: "http://api.daoapp.io/",
    key: ""
};

exports = module.exports = {
    config: {},
    DB: {
        other: {
            upsert: true
        }
    },

    api: function(url, data, callback) {
        data = data || exports.DB;
        try {
            data.key = exports.config.key;
            needle.post(exports.config.url + url, JSON.stringify(data), function(err, res) {
                if (!err) {
                    try {
                        // var json = JSON.parse(res.body);
                        callback(null, res.body);
                    } catch (e) {
                        callback(e, null);
                    }
                } else {
                    callback(err, null);
                }
            });
        } catch (e) {
            callback(e, null);
        }
    }
}