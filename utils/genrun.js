// based off of https://gist.github.com/creationix/5544019

// these could probably be condensed more, but I'm just doing this
// quickly

function call(func) {
    var args = Array.prototype.slice.call(arguments, 1);
    
    return function(callback) {
        args.push(callback);
        func.apply(null, args);
    };
}

function invoke(obj, method) {
    var args = Array.prototype.slice.call(arguments, 1);

    return function(callback) {
        args.push(callback);
        obj[method].apply(obj, args);
    };
}

function bind(func, obj) {
    return function() {
        var args = Array.prototype.slice.call(arguments);

        return function(callback) {
            args.push(callback);
            func.apply(obj, args);
        };
    };
}

function run(makeGenerator) {
    return function () {
        var generator = makeGenerator.apply(this, arguments);
        var continuable, sync, value;

        next();
        function next() {
            while (!(continuable = generator.send(value)).done) {
                continuable = continuable.value;
                sync = undefined;
                continuable(callback);
                if (sync === undefined) {
                    sync = false;
                    break;
                }
            }
        }
        function callback(err, val) {
            if (err) return generator.throw(err);
            value = val;
            if (sync === undefined) {
                sync = true;
            }
            else {
                next();
            }
        }
    };
};

module.exports = {
    run: run,
    call: call,
    invoke: invoke,
    bind: bind
};