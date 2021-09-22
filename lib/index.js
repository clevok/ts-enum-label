"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefineEnumLabel = void 0;
function DefineEnumLabel(callback) {
    var _a = typeof callback === 'function' ? callback() : callback, Enum = _a.Enum, Values = _a.Values;
    function getLabelByValue(v) {
        var _a;
        return (_a = Values.find(function (value) { return value.value === v; })) === null || _a === void 0 ? void 0 : _a.label;
    }
    /**
     *
     * 获取 [values, label] 数组
     * @returns
     */
    var values = function () { return __spreadArray([], Values, true); };
    /**
     * 获取 value,label 对象
     * @returns
     */
    var valueOf = function (v) {
        return Values.find(function (value) { return value.value === v; });
    };
    Object.keys(Enum).forEach(function (enumKey) {
        getLabelByValue[enumKey] = valueOf(enumKey) || valueOf(Enum[enumKey]);
    });
    getLabelByValue['values'] = values;
    return getLabelByValue;
}
exports.DefineEnumLabel = DefineEnumLabel;
