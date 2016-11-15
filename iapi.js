/**
 * Created by ireoo on 16-11-15.
 */
var needle  = require('needle');

needle.defaults({
    open_timeout: 5000,
    user_agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0'
});

module.exports = function (url, data, callback) {
    needle.post(url, JSON.stringify(data), function(err, res) {
        if(!err) {
            try {
                var json = JSON.parse(res.body);
                callback(null, json);
            }catch (e) {
                callback(e, null);
            }
        } else {
            callback(err, null);
        }
    });
};