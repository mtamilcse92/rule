
var screen = {
    write: function (data, mode) {
        var ops, output = data;
        if (mode === 'json') {
            output = JSON.stringify(data,null,2);
        }
        else if (mode === 'pretty') {
            ops =
            {
                keysColor : "cyan",
                dashColor: "megenta",
                stringColor: "white",
                numberColor: "yellow"
            };
            output = prettyjson.render(data)
        }
        console.log('Result ->' + output);
    }
};
module.exports = screen;