QUnit.test( 'checkLastPage', function( assert ) {

  var done = assert.async();

  // ----- checkLastPage: true ----- //

  var infScroll = new InfiniteScroll( '.demo--check-last-page', {
    path: '.check-last-page-next-link',
    append: '.post',
    scrollThreshold: false,
    history: false,
  });

  infScroll.on( 'last', onTrueLast1 );
  infScroll.once( 'append', onTrueAppend1 );

  function onTrueLast1() {
    assert.ok( false, 'last should not trigger on 2nd page' );
  }

  function onTrueAppend1() {
    infScroll.off( 'last', onTrueLast1 );
    loadTruePage3();
  }

  infScroll.loadNextPage();

  function loadTruePage3() {
    infScroll.once( 'last', function() {
      assert.ok( true, 'checkLastPage: true, last triggered on 3rd page' );
      checkString();
    });

    infScroll.loadNextPage();
  }

  // ----- checkLastPage: 'string' ----- //

  function checkString() {
    // reset
    infScroll.destroy();
    infScroll = new InfiniteScroll( '.demo--check-last-page', {
      path: 'page/{{#}}.html',
      checkLastPage: '.check-last-page-next-link',
      append: '.post',
      scrollThreshold: false,
      history: false,
    });

    infScroll.on( 'last', onStringLast1 );
    infScroll.once( 'append', onStringAppend1 );
    infScroll.loadNextPage();
  }

  function onStringLast1() {
    assert.ok( false, 'last should not trigger on 2nd page' );
  }

  function onStringAppend1() {
    infScroll.off( 'last', onStringLast1 );
    loadStringPage3();
  }

  infScroll.loadNextPage();

  function loadStringPage3() {
    infScroll.once( 'last', function() {
      assert.ok( true, 'checkLastPage: \'string\', last triggered on 3rd page' );
      setTimeout( checkPathFunction );
    });

    infScroll.loadNextPage();
  }

  // ----- path: function ----- //

  function checkPathFunction() {
    infScroll.destroy();
    infScroll = new InfiniteScroll( '.demo--check-last-page', {
      // provide only page/2.html, then falsy
      path: function() {
        if ( this.pageIndex < 3 ) {
          var nextIndex = this.pageIndex + 1;
          return 'page/' + nextIndex + '.html';
        }
      },
      checkLastPage: true,
      append: '.post',
      scrollThreshold: false,
      history: false,
    });

    infScroll.on( 'last', onFunctionLast2 );
    infScroll.once( 'append', onFunctionAppend2 );

    infScroll.loadNextPage();
  }

  function onFunctionLast2() {
    assert.ok( false, 'last should not trigger on function page 2' );
  }

  function onFunctionAppend2() {
    infScroll.off( 'last', onFunctionLast2 );

    infScroll.on( 'last', function( response, path ) {
      assert.ok( true, 'path: function, last triggered' );
      assert.ok( response, 'path: function, response there on last' );
      assert.ok( path, 'path: function, path there on last' );
      done();
    });

    infScroll.loadNextPage();
  }

});
