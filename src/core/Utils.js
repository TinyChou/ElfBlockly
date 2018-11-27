function Utils() {
  // empty
};

/**
  * 给一个对象添加某个属性的getter和setter，其中setFunc为可选
  * @param obj 为当前对象
  * @param key 为设置setter/getter的属性对应名字
  * @param getFunc 当前属性的getter function
  * @param opt_setFunc 当前属性的setter function
  * @example
  *  var obj = { a_: 'a', b_: 'b', c_: 'c' };
  *  Utils.defineGetterSetter(obj, 'a', function() {
  *    return this.a_;
  *  }, function(newValue) {
  *    this.a_ = newValue;
  *  });
  *  obj.a = 1; // obj.a_ === obj.a === 1
  */
Utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {
  if (Object.defineProperty) {
    var desc = {
      get: getFunc,
      configurable: true
    };
    if (opt_setFunc) {
      desc.set = opt_setFunc;
    }
    Object.defineProperty(obj, key, desc);
  } else {
    obj.__defineGetter__(key, getFunc);
    if (opt_setFunc) {
      obj.__defineSetter__(key, opt_setFunc);
    }
  }
};

// 可以只指定添加一个属性的getter
Utils.defineGetter = Utils.defineGetterSetter;

// 私有属性遵循命名为在属性名最后添加"_"
// 我们添加一个批量生成getter和setter工具方法
Utils.batchDefineGetterSetter = function(obj) {
  for (var key in obj) {
    if (typeof obj[key] !== 'function' &&
      /[a-zA-Z0-9]*\_/.test(key)) {

      (function(key) {
        Utils.defineGetterSetter(obj, key.substring(0, key.length - 1), function() {
          return this[key];
        }, function(newValue) {
          this[key] = newValue;
        })
      })(key);
    }
  }
};

// polyfill for Array.prototype.indexOf
Utils.arrayIndexOf = function(array, item) {
  if (array.indexOf) return array.indexOf(item);

  var N = array.length;
  for (var i = 0; i < N; i++) {
    if (array[i] === item) {
      return i;
    }
  }
  return -1;
};

// remove item from an array
Utils.arrayRemove = function(array, item) {
  var index = Utils.arrayIndexOf(array, item);
  if (index > -1) {
    array.splice(index, 1);
    return true;
  }
  return false;
};

Utils.typeName = function(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
};

Utils.isArray = Array.isArray || function(obj) {
  return Utils.typeName(obj) === 'Array';
};

Utils.isDate = function(date) {
  return (date instanceof Date);
};

// does a deep clone of the object
Utils.deepClone = function(obj) {
  if (!obj || typeof obj === 'function' || Utils.isDate(obj) || typeof obj !== 'object') {
    return obj;
  }

  var retVal, i;

  if (Utils.isArray(obj)) {
    retVal = [];
    for (i = 0; i < obj.length; ++i) {
      retVal.push(Utils.deepClone(obj[i]));
    }
    return retVal;
  }

  retVal = {};
  for (i in obj) {
    if ((!(i in retVal) || retVal[i] !== obj[i]) &&
      typeof obj[i] !== 'undefined' &&
      typeof obj[i] !== 'unknown') {
      retVal[i] = Utils.deepClone(obj[i]);
    }
  }
  return retVal;
};

Utils.close = function(context, func, params) {
  return function() {
    var args = params || arguments;
    return func.apply(context, args);
  };
};

Utils.extend = (function() {
  // proxy used to establish prototype chain
  var F = function() {};
  // extend Child from Parent
  return function(Child, Parent) {
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.__super__ = Parent.prototype;
    Child.prototype.constructor = Child;
  };
})();

function createUUIDPart(length) {
  var uuidPart = '';
  for (var i = 0; i < length; i++) {
    var uuidChar = parseInt((Math.random() * 256), 10).toString(16);
    if (uuidChar.length === 1) {
      uuidChar = '0' + uuidChar;
    }
    uuidPart += uuidChar;
  }
  return uuidPart;
};

Utils.createUUID = function() {
  return createUUIDPart(4) + '-' +
    createUUIDPart(2) + '-' +
    createUUIDPart(2) + '-' +
    createUUIDPart(2) + '-' +
    createUUIDPart(6);
};

export default Utils;
