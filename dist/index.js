/**
 * 长期或自定义时间段组件.js v0.0.4
 * (c) 2017 yuronghui
 * @license MIT
 */
"use strict";

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _templateObject = _taggedTemplateLiteral([ '<div class="lego-dateradio">\n            <chkgroup id="chkgroup_', '"></chkgroup>\n            <datepicker id="datepicker_', '"></datepicker>\n        </div>' ], [ '<div class="lego-dateradio">\n            <chkgroup id="chkgroup_', '"></chkgroup>\n            <datepicker id="datepicker_', '"></datepicker>\n        </div>' ]);

function _taggedTemplateLiteral(strings, raw) {
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var View = function(_Lego$UI$Baseview) {
    _inherits(View, _Lego$UI$Baseview);
    function View() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck(this, View);
        var options = {
            typeValue: 0,
            startValue: "",
            endValue: "",
            minDate: "",
            maxDate: "",
            format: "YYYY-MM-DD HH:mm:ss",
            onChange: function onChange() {}
        };
        Object.assign(options, opts);
        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, options));
    }
    _createClass(View, [ {
        key: "components",
        value: function components() {
            var opts = this.options, that = this;
            this.result = this.result || {};
            this.addCom([ {
                el: "#chkgroup_" + opts.vid,
                type: "radio",
                name: "hidden_type_" + opts.vid,
                data: [ {
                    label: "长期",
                    value: "0",
                    checked: !opts.typeValue
                }, {
                    label: "自定义",
                    value: "1",
                    checked: opts.typeValue
                } ],
                onChange: function onChange(self, result) {
                    var datepickerView = Lego.getView("#datepicker_" + opts.vid);
                    if (datepickerView) {
                        if (parseInt(result.value)) {
                            datepickerView.$el.show();
                        } else {
                            datepickerView.$el.hide();
                        }
                    }
                    that.result = {
                        type: result.value
                    };
                    if (typeof opts.onChange == "function") opts.onChange(that, that.result);
                }
            }, {
                el: "#datepicker_" + opts.vid,
                type: "range",
                showClose: true,
                showClear: true,
                startName: "hidden_start_" + opts.vid,
                endName: "hidden_end_" + opts.vid,
                startValue: opts.startValue,
                endValue: opts.endValue,
                minDate: opts.minDate,
                maxDate: opts.maxDate,
                format: opts.format,
                style: {
                    display: "none"
                },
                onChange: function onChange(self, result, type) {
                    that.result[type + "Date"] = result;
                    if (typeof opts.onChange == "function") opts.onChange(that, that.result);
                }
            } ]);
        }
    }, {
        key: "render",
        value: function render() {
            var opts = this.options;
            return hx(_templateObject, opts.vid, opts.vid);
        }
    }, {
        key: "getValue",
        value: function getValue() {
            return this.result;
        }
    } ]);
    return View;
}(Lego.UI.Baseview);

Lego.components("dateradio", View);

module.exports = View;
