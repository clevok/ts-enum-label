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
exports.DefineEnumLabel = exports.CustomStatus = void 0;
function CustomStatus(config) {
    function find(keyOrValue) {
        var findKey = Object.keys(config).find(function (configKey) {
            return (configKey === keyOrValue || config[configKey][0] === keyOrValue);
        });
        return findKey
            ? {
                value: config[findKey][0],
                label: config[findKey][1],
            }
            : undefined;
    }
    function getLabel(keyOrValue) {
        var _a;
        return (_a = find(keyOrValue)) === null || _a === void 0 ? void 0 : _a.label;
    }
    var values = function () {
        return Object.keys(config).map(function (key) {
            var _a = config[key], value = _a[0], label = _a[1];
            return { key: key, value: value, label: label };
        });
    };
    var Enum = Object.keys(config).reduce(function (pre, key) {
        var _a;
        if (Object.prototype.hasOwnProperty.call(pre, config[key][0])) {
            throw new Error('枚举定义异常, 存在value和key同名且非对应关系');
        }
        return Object.assign(pre, (_a = {},
            _a[key] = config[key][0],
            _a[config[key][0]] = key,
            _a));
    }, {});
    getLabel['values'] = values;
    getLabel['find'] = find;
    getLabel['getLabel'] = getLabel;
    Object.keys(Enum).forEach(function (enumKey) {
        getLabel[enumKey] = Enum[enumKey];
    });
    Object.keys(Enum).forEach(function (enumKey) {
        getLabel[enumKey] = Enum[enumKey];
    });
    return getLabel;
}
exports.CustomStatus = CustomStatus;
/**
 *
 * @example
```js
enum LiquidUnitEnum {
    ML = 1,
    OZ_UA = 2,
}
const LiquidUnitLabel = DefineEnumLabel(() => {
    return {
        Enum: LiquidUnitEnum,
        Values: [
            { value: LiquidUnitEnum.ML, label: 'ml' },
            { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
        ] as const,
    }
})
```
 *
 */
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
