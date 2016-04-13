var GeoPackage = require('../../geopackage')
  , should = require('chai').should()
  , path = require('path');

describe.skip('JAVA GeoPackage tests', function() {

  it('should run this test', function(){

  });

  it('should open the geopackage', function(done) {
    var gp = new GeoPackage();
    gp.openGeoPackageFile(path.join(__dirname, '..', 'fixtures', 'gdal_sample.gpkg'), function(err, gp) {
      gp.getFeatureTables(function(err, tableNames) {
        console.log('tableNames', tableNames);
        tableNames.length.should.be.equal(1);
        tableNames[0].should.be.equal('FEATURESriversds');
        done();
      });
    });
  });

  it('should not open the geopackage', function(done) {
    var gp = new GeoPackage();
    gp.openGeoPackageFile(path.join(__dirname, __filename), function(err, gp) {
      console.log('err', err);
      console.log('gp', gp);
      done();
    });
  });
});
