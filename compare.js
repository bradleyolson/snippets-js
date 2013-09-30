// USE:
// compare(obj1, obj2, obj3)
//
// returns:
//   true - if all objects passed are the same
//   false - if all objects passed are different

if( typeof compare === "undefined" ) {

  var compare = (function(comparison) {
    return (function() {
      var current = arguments[0]
        , is_similar = true;

      if( arguments.length > 1 ) {
        for( objects in arguments ) {
          if( !compare( this, arguments[objects] ) ) {
            is_similar = false;
          }
        }

        return is_similar;
      }

      for( var iter in current ) {
        if( current.hasOwnProperty(iter) ) {
          if( typeof this[iter] === "object" && typeof current[iter] === "object" ) {
            // Recur if value of object is itself an object
            if( !compare(this[iter], current[iter]) ) {
              is_similar = false;
            }
            continue;
          }

          if( this[iter] !== current[iter] ) {
            is_similar = false;
          }
        }
      }

      // Ensure that no keys were missed
      // in loop of `current`
      for( var key in this ) {
        if( !current.hasOwnProperty(key) ) {
          is_similar = false;
        }
      }

      return is_similar;
    }).apply(comparison, Array.prototype.slice.call(arguments, 1));
  });

}
