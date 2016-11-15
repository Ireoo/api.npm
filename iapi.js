/**
 * Created by ireoo on 16-11-15.
 */
var needle = require('needle');

needle.defaults({
    open_timeout: 5000,
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0'
});

module.exports = {
    config: {
        key: ""
    },

    api: function(url, data, callback) {
        try {
            data.key = this.config.key;
            needle.post("http://api.daoapp.io/" + url, JSON.stringify(data), function(err, res) {
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