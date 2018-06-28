QUnit.test( 'pageLoad error', function( assert ) {

  var demoElem = document.querySelector('.demo--page-load-error');
  var done = assert.async( 2 );

  var infScroll = new InfiniteScroll( demoElem, {
    // page not there
    path: function() {
      return 'page/4.html';
    },
    scrollThreshold: false,
    history: false,
  });

  infScroll.on( 'request', function() {
    assert.ok( true, 'request event' );
    done();
  });

  infScroll.on( 'error', function( error ) {
    assert.ok( error, 'error event, with error argument' );
    done();
  });

  infScroll.on( 'load', function() {
    assert.ok( false, 'load event should not trigger' );
    done();
  });

  infScroll.loadNextPage();

});
