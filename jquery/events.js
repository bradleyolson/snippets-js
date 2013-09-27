// Bind necessary events to a global object. Why?
//
// Occasionally need a wrapper around several actions in an event.
// Can bind from several files (based on file directive).
// May need to overwrite methods as states change (like AJAX).

// create global object if non-existent
var PageName = PageName || {};

// house specific events
PageName.events = PageName.events || {};
PageName.events.event_type = {}; 
// practical example: PageName.events.resize

PageName.events.event_type["foo"] = function( event ) {
  // do things in this
  event.preventDefault();
}

jQuery( document ).ready(function($) {
  // attaching the binds

  $(selector).bind('event', function(e) {
    return _.each(PageName.events.event_type, function( method, key) {
      method( e );
    });
  })
});


// RESIZE EVENT
//
// Save the user from process/render hell

// jQuery( document ).ready(function($) {
  var screen = {
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
      set: function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        return true;
      }
    },
    event: false, // will be the ID of setTimeout
    timeout: 100 // run every `n` seconds while resizing
  };

  $( window ).bind('resize', function( e ) {
    if( screen.event !== false ) {
      // an event is going on
      // so stop
      return;
    }

    screen.size.set();

    screen.event = (function() {
      return window.setTimeout(function() {
        _.each(PageName.events.resize, function( method, source ) {
          method( e, screen );
        });
        
        screen.event = false;
      }, screen.timeout);
    })();
  });

// });
