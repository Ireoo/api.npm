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
            var data_txt = JSON.stringify(data);
            data.key = this.config.key;
            options = {
                "Content-Length": data_txt.length
            };
            needle.post(this.config.url + url, data_txt, options, function(err, res) {
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