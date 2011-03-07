exports.create = function (v) {
    var value = v;
    return {
        get: function() {
            return value;
        },
        set: function(new_value) {
            value = new_value;
        }
    };
};
