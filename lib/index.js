"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomStatus = void 0;
/**
 *
 * @param config
 * @returns
 *
```js
enum LiquidUnitEnum {
        ML = 0,
        OZ_UA = 1,
        OZ_UK = 2,
    }

    const LiquidUnitEnumStatus = CustomStatus({

         ML: [LiquidUnitEnum.ML, 'milliliter'],

         OZ_UA: [LiquidUnitEnum.OZ_UA, 'ounce'],

         OZ_UK: [LiquidUnitEnum.OZ_UK, 'ounce'],
     } as const)

```
 */
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
    return getLabel;
}
exports.CustomStatus = CustomStatus;
