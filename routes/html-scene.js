function Url(data) {
    this.data = data
}

Url.fromObject = function(o) {
    return new Url(o)
}

Url.prototype.paint = function(w, h, stdin) {
    return this.data
}

Url.prototype.dataType = function() {
    return 'staticHtml'
}

module.exports = { Url: Url }
