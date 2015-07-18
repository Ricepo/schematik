// -------------------------------------------------------------------------- //
//                                                                            //
// Adds a property to the specified object.                                   //
//                                                                            //
// -------------------------------------------------------------------------- //

// This file is a Schematik-specific ES6 rewrite of:
//   chaijs/chai/lib/chai/utils/addProperty.js

export default function addProperty(context, name, getter) {
  if (typeof getter !== 'function') { getter = function() { }; }
  Object.defineProperty(context, name, {
    get: function() {
      let result = getter.call(this);
      return result === undefined ? this : result;
    }
  });
}
