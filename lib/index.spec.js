"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
it('基本测试', function () {
    var LiquidUnitEnum;
    (function (LiquidUnitEnum) {
        LiquidUnitEnum[LiquidUnitEnum["ML"] = 1] = "ML";
        LiquidUnitEnum[LiquidUnitEnum["OZ_UA"] = 2] = "OZ_UA";
    })(LiquidUnitEnum || (LiquidUnitEnum = {}));
    var LiquidUnitLabel = (0, _1.DefineEnumLabel)(function () {
        return {
            Enum: LiquidUnitEnum,
            Values: [
                { value: LiquidUnitEnum.ML, label: 'ml' },
                { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
            ],
        };
    });
    expect(LiquidUnitLabel.OZ_UA).toEqual({
        value: LiquidUnitEnum.OZ_UA,
        label: 'oz_ua',
    });
    expect(LiquidUnitLabel.values()).toEqual([
        { value: LiquidUnitEnum.ML, label: 'ml' },
        { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
    ]);
    expect(LiquidUnitLabel(LiquidUnitEnum.ML)).toEqual('ml');
});
it('第二种用法', function () {
    var LiquidUnitEnum;
    (function (LiquidUnitEnum) {
        LiquidUnitEnum[LiquidUnitEnum["ML"] = 1] = "ML";
        LiquidUnitEnum[LiquidUnitEnum["OZ_UA"] = 2] = "OZ_UA";
    })(LiquidUnitEnum || (LiquidUnitEnum = {}));
    var LiquidUnitLabel = (0, _1.DefineEnumLabel)({
        Enum: LiquidUnitEnum,
        Values: [
            { value: LiquidUnitEnum.ML, label: 'ml' },
            { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
        ],
    });
    expect(LiquidUnitLabel.OZ_UA).toEqual({
        value: LiquidUnitEnum.OZ_UA,
        label: 'oz_ua',
    });
    expect(LiquidUnitLabel.values()).toEqual([
        { value: LiquidUnitEnum.ML, label: 'ml' },
        { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
    ]);
    expect(LiquidUnitLabel(LiquidUnitEnum.ML)).toEqual('ml');
});
