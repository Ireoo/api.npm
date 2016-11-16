/**
 * Created by ireoo on 16-11-15.
 */
var needle = require('needle'),
    _ = {
        extend: require('lodash.assignin'),
        bind: require('lodash.bind'),
        forEach: require('lodash.foreach'),
        defaults: require('lodash.defaults')
    };

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

    api: function(url, data, callback) {
        this.config = _.defaults(this.config || {}, config_default);
        try {
            data.key = this.config.key;
            needle.post(this.config.url + url, JSON.stringify(data), function(err, res) {
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