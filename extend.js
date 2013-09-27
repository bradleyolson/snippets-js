// deprecated because underscore is better than me.

if( typeof extend !== "undefined" ) {
  // extend multiple objects

  var extend = function(overwritten) {
    return (function() {
      if( arguments.length > 1 ) {
        for( objects in arguments ) {
          extend( this, arguments[objects] );
        }
      }

      for( var key in arguments[0] ) {
        if( arguments[0].hasOwnProperty(key) ) {
          if( typeof this[key] === "object" ) {
            this[key] = extend(this[key], arguments[0][key]);
          } else {
            this[key] = arguments[0][key];
          }
        }
      }

      return this;
    }).apply(overwritten, Array.prototype.slice.call(arguments, 1));
  }
}
