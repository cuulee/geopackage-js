var GeoPackageManager = require('../../../../lib/geoPackageManager')
  , ContentsDao = require('../../../../lib/core/contents').ContentsDao
  , Contents = require('../../../../lib/core/contents').Contents
  , should = require('chai').should()
  , path = require('path');

describe('Contents tests', function() {

  var geoPackage;
  var contentsDao

  beforeEach('should open the geopackage', function(done) {
    var filename = path.join(__dirname, '..', '..', '..', 'fixtures', 'rivers.gpkg');
    GeoPackageManager.open(filename, function(err, gp) {
      geoPackage = gp;
      should.not.exist(err);
      should.exist(gp);
      should.exist(gp.getDatabase().getDBConnection());
      gp.getPath().should.be.equal(filename);
      contentsDao = new ContentsDao(gp.getDatabase());
      done();
    });
  });

  it('should get the contents', function(done) {
    contentsDao.queryForAll(function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contents.should.have.property('length', 2);
      contents[0].should.have.property('table_name', 'TILESosmds');
      contents[0].should.have.property('data_type', 'tiles');
      contents[0].should.have.property('identifier', 'TILESosmds');
      contents[0].should.have.property('description', null);
      contents[0].should.have.property('last_change', '2015-12-04T15:28:53.871Z');
      contents[0].should.have.property('min_x', -180);
      contents[0].should.have.property('min_y', -85.0511287798066);
      contents[0].should.have.property('max_x', 180);
      contents[0].should.have.property('max_y', 85.0511287798066);
      contents[0].should.have.property('srs_id', 4326);

      contents[1].should.have.property('table_name', 'FEATURESriversds');
      contents[1].should.have.property('data_type', 'features');
      contents[1].should.have.property('identifier', 'FEATURESriversds');
      contents[1].should.have.property('description', null);
      contents[1].should.have.property('last_change', '2015-12-04T15:28:59.122Z');
      contents[1].should.have.property('min_x', -20037508.342789244);
      contents[1].should.have.property('min_y', -19971868.88040857);
      contents[1].should.have.property('max_x', 20037508.342789244);
      contents[1].should.have.property('max_y', 19971868.880408563);
      contents[1].should.have.property('srs_id', 3857);
      done();
    });
  });

  it('should get the contents from the ID TILESosmds', function(done) {
    contentsDao.queryForIdObject('TILESosmds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contents.should.have.property('tableName', 'TILESosmds');
      contents.should.have.property('dataType', 'tiles');
      contents.should.have.property('identifier', 'TILESosmds');
      contents.should.have.property('description', null);
      contents.should.have.property('lastChange', '2015-12-04T15:28:53.871Z');
      contents.should.have.property('minX', -180);
      contents.should.have.property('minY', -85.0511287798066);
      contents.should.have.property('maxX', 180);
      contents.should.have.property('maxY', 85.0511287798066);
      contents.should.have.property('srsId', 4326);
      done();
    });
  });

  it('should get the contents from the ID FEATURESriversds', function(done) {
    contentsDao.queryForIdObject('FEATURESriversds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contents.should.have.property('tableName', 'FEATURESriversds');
      contents.should.have.property('dataType', 'features');
      contents.should.have.property('identifier', 'FEATURESriversds');
      contents.should.have.property('description', null);
      contents.should.have.property('lastChange', '2015-12-04T15:28:59.122Z');
      contents.should.have.property('minX', -20037508.342789244);
      contents.should.have.property('minY', -19971868.88040857);
      contents.should.have.property('maxX', 20037508.342789244);
      contents.should.have.property('maxY', 19971868.880408563);
      contents.should.have.property('srsId', 3857);
      done();
    });
  });

  it('should get the projection from the ID TILESosmds', function(done) {
    contentsDao.queryForIdObject('TILESosmds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getProjection(contents, function(err, projection) {
        should.not.exist(err);
        should.exist(projection);
        done();
      });
    });
  });

  it('should get the projection from the ID FEATURESriversds', function(done) {
    contentsDao.queryForIdObject('FEATURESriversds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getProjection(contents, function(err, projection) {
        should.not.exist(err);
        should.exist(projection);
        done();
      });
    });
  });

  it('should get the GeometryColumns from the ID TILESosmds', function(done) {
    contentsDao.queryForIdObject('TILESosmds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getGeometryColumns(contents, function(err, columns) {
        should.not.exist(err);
        should.not.exist(columns);
        done();
      });
    });
  });

  it('should get the GeometryColumns from the ID FEATURESriversds', function(done) {
    contentsDao.queryForIdObject('FEATURESriversds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getGeometryColumns(contents, function(err, columns) {
        should.not.exist(err);
        should.exist(columns);
        columns.should.have.property('tableName', 'FEATURESriversds');
        columns.should.have.property('columnName', 'geom');
        columns.should.have.property('geometryTypeName', 'GEOMETRY');
        columns.should.have.property('srsId', 3857);
        columns.should.have.property('z', 0);
        columns.should.have.property('m', 0);
        done();
      });
    });
  });

  it('should get the TileMatrixSet from the ID TILESosmds', function(done) {
    contentsDao.queryForIdObject('TILESosmds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getTileMatrixSet(contents, function(err, matrixSet) {
        should.not.exist(err);
        should.exist(matrixSet);
        matrixSet.should.have.property('tableName', 'TILESosmds');
        matrixSet.should.have.property('srsId', 3857);
        matrixSet.should.have.property('minX', -20037508.342789244);
        matrixSet.should.have.property('minY', -20037508.342789244);
        matrixSet.should.have.property('maxX', 20037508.342789244);
        matrixSet.should.have.property('maxY', 20037508.342789244);
        done();
      });
    });
  });

  it('should get the TileMatrixSet from the ID FEATURESriversds', function(done) {
    contentsDao.queryForIdObject('FEATURESriversds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getTileMatrixSet(contents, function(err, matrixSet) {
        should.not.exist(err);
        should.not.exist(matrixSet);
        done();
      });
    });
  });

  it('should get the TileMatrix from the ID TILESosmds', function(done) {
    contentsDao.queryForIdObject('TILESosmds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getTileMatrix(contents, function(err, matrix) {
        should.not.exist(err);
        should.exist(matrix);
        matrix.should.have.property('length', 4);
        matrix[0].should.be.deep.equal({
          tableName: 'TILESosmds',
          zoomLevel: 0,
          matrixWidth: 1,
          matrixHeight: 1,
          tileWidth: 256,
          tileHeight: 256,
          pixelXSize: 156543.03392804097,
          pixelYSize: 156543.033928041
        });
        done();
      });
    });
  });

  it('should get the TileMatrix from the ID FEATURESriversds', function(done) {
    contentsDao.queryForIdObject('FEATURESriversds', function(err, contents) {
      should.exist(contents);
      should.not.exist(err);
      contentsDao.getTileMatrix(contents, function(err, matrix) {
        should.not.exist(err);
        should.not.exist(matrix);
        done();
      });
    });
  });

});
