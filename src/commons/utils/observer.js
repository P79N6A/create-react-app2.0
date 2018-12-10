import $ from "jquery";

var o = $({});

$.subscribe = function() {
    o.bind.apply(o, arguments);
};

$.unsubscribe = function() {
    o.unbind.apply(o, arguments);
};

$.publish = function() {
    o.trigger.apply(o, arguments);
};
