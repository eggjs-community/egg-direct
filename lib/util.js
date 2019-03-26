/* eslint-disable no-new-func */
'use strict';

/**
 * @description Determine if a function is a constructor.
 * @param {Function} fn - function
 * @return {Boolean} return is constructor function
 */
const isConstructor = fn => {
  try {
    if (fn.prototype.constructor.caller === null) {
      if (Object.getOwnPropertyNames(fn.prototype).length > 1) {
        return true;
      } else if (Object.keys(new fn()).length > 0) {
        return true;
      }
      return false;
    }
    return false;
  } catch (e) {
    return true;
  }
};

/**
 * @description Get the function name from the function's string.
 * @param {Function} callee - function
 * @return {String} return name of a function.
 */
const getFnName = callee => {
  return callee.toString().match(/function\s*([^(]*)\(/)[1];
};

/**
 * @description Get the router object on the controller method.
 * @param {Function} fn - controller method.
 * @return {Object} return default options of function.
 */
const getMethodRouter = fn => {
  const fnString = fn.toString()
    .replace(/\r\n/g, '')
    .replace(/\n/g, '')
    .replace(/\s/g, '')
    .replace('async', 'function $')
    .replace('){', '){return typeof router!==\'undefined\'?router:{}}\n')
    .split('\n')[0];
  const router = new Function(`return ${fnString}`)()();
  return {
    router,
    name: getFnName(fnString).substr(1),
  };
};

/**
 * @description Get the value of the depth object.
 * @param {Object} obj - object.
 * @param {Array} keyArray - keys array.
 * @return {Any} any value.
 */
const callStack = function(obj, keyArray) {
  let _obj = obj;
  keyArray.forEach(key => {
    _obj = _obj[key];
  });
  return _obj;
};

module.exports = {
  isConstructor,
  getFnName,
  getMethodRouter,
  callStack,
};
