var should = require('should');
var mercatorProjection = require("../mercatorProjection");

describe('dateParser', function () {
    var start = {
        lon: "2.3521334",
        lat: "48.8565056",
    };
    var expected = {
        lon: 261838.2923294031,
        lat: 6250548.376918153,
    };
    var result = mercatorProjection.convert4326to900913(start);
    it('4326to900913', function () {
        result.lon.should.be.approximately(expected.lon, 0.0001);
        result.lat.should.be.approximately(expected.lat, 0.0001);
    });
});


function testDate(text, expectedStartDate, expectedEndDate) {
    describe(text, function () {
        var startDate = dateParser.parseStartDate(text);
        var endDate = dateParser.parseEndDate(text);
        it('startDate', function () {
            startDate.should.be.eql(expectedStartDate);
        });
        it('endDate', function () {
            endDate.should.be.eql(expectedEndDate);
        });
    });
}
