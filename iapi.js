/**
 * Created by ireoo on 16-11-15.
 */
var needle = require('needle');

needle.defaults({
    open_timeout: 60 * 1000,
    user_agent: 'iApi.npm'
});

module.exports = {
    config: {
        url: "http://api.daoapp.io/",
        key: ""
    },

    api: function(url, data, callback) {
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