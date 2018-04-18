

// Variables local to the module will be private, because the module is wrapped in a function by Node.js 
const { PI } = Math;

// Functions and objects are added to the root of a module by specifying additional 
// properties on the special exports object.

exports.myDateTime = function() {
    return Date();
};


// 'exports' and 'module.exports' reference the same object
exports.area = (r) => PI * r ** 2;
module.exports.circ = (r) => 2 * PI * r;

/* 
Note, this line of code would re-assign module.exports
*/
// module.exports = "Bonjour";