const _ = require('underscore');

function $ (context, selector) {
  if (!selector) {
    selector = context;
    context = document;
  }

  return context.querySelector(selector);
}

function $$ (context, selector) {
  if (!selector) {
    selector = context;
    context = document;
  }

  return _.toArray(context.querySelectorAll(selector));
}

$.addClass = function (element, classes) {
  if (_.isArray(element)) {
    element.forEach(e => $.addClass(e, classes));
  }

  for (const str of classes.split(/ +/)) {
    element.classList.add(str);
  }
};

$.removeClass = function (element, classes) {
  if (_.isArray(element)) {
    element.forEach(e => $.removeClass(e, classes));
  }

  for (const str of classes.split(/ +/)) {
    element.classList.remove(str);
  }
};

module.exports = {
  $,
  $$,
};
