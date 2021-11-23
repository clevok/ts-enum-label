import { CustomStatus } from '.';
it('CustomEnum测试', function () {
    var LiquidUnitEnum = CustomStatus({
        /**
         * 毫升
         */
        ML: [0, 'milliliter'],
        /**
         *
         * 美制盎司
         */
        OZ_UA: [1, 'ounce'],
        /**
         * 英制盎司
         */
        OZ_UK: [2, 'ounce'],
    });
    expect(LiquidUnitEnum.ML).toEqual(0);
    expect(LiquidUnitEnum.OZ_UA).toEqual(1);
    expect(LiquidUnitEnum.OZ_UK).toEqual(2);
    expect(LiquidUnitEnum[0]).toEqual('ML');
    expect(LiquidUnitEnum[1]).toEqual('OZ_UA');
    expect(LiquidUnitEnum[2]).toEqual('OZ_UK');
    expect(LiquidUnitEnum.getLabel(0)).toEqual('milliliter');
    expect(LiquidUnitEnum.getLabel('ML')).toEqual('milliliter');
    expect(LiquidUnitEnum.getLabel(1)).toEqual('ounce');
    expect(LiquidUnitEnum.getLabel('OZ_UA')).toEqual('ounce');
    expect(LiquidUnitEnum.getLabel(2)).toEqual('ounce');
    expect(LiquidUnitEnum.getLabel('OZ_UK')).toEqual('ounce');
    expect(LiquidUnitEnum.values()).toEqual([
        { value: 0, label: 'milliliter', key: 'ML' },
        { value: 1, label: 'ounce', key: 'OZ_UA' },
        { value: 2, label: 'ounce', key: 'OZ_UK' },
    ]);
    expect(LiquidUnitEnum.find(LiquidUnitEnum.ML)).toEqual({
        value: 0,
        label: 'milliliter',
    });
    expect(LiquidUnitEnum.find(LiquidUnitEnum.OZ_UK)).toEqual({
        value: 2,
        label: 'ounce',
    });
    expect(LiquidUnitEnum(LiquidUnitEnum.ML)).toEqual('milliliter');
    expect(LiquidUnitEnum(LiquidUnitEnum.OZ_UK)).toEqual('ounce');
});
it('CustomEnum测试Enum', function () {
    var LiquidUnitEnum;
    (function (LiquidUnitEnum) {
        LiquidUnitEnum[LiquidUnitEnum["ML"] = 0] = "ML";
        LiquidUnitEnum[LiquidUnitEnum["OZ_UA"] = 1] = "OZ_UA";
        LiquidUnitEnum[LiquidUnitEnum["OZ_UK"] = 2] = "OZ_UK";
    })(LiquidUnitEnum || (LiquidUnitEnum = {}));
    var LiquidUnitEnumStatus = CustomStatus({
        /**
         * 毫升
         */
        ML: [LiquidUnitEnum.ML, 'milliliter'],
        /**
         *
         * 美制盎司
         */
        OZ_UA: [LiquidUnitEnum.OZ_UA, 'ounce'],
        /**
         * 英制盎司
         */
        OZ_UK: [LiquidUnitEnum.OZ_UK, 'ounce'],
    });
    expect(LiquidUnitEnumStatus.ML).toEqual(0);
    expect(LiquidUnitEnumStatus.OZ_UA).toEqual(1);
    expect(LiquidUnitEnumStatus.OZ_UK).toEqual(2);
    expect(LiquidUnitEnumStatus[0]).toEqual('ML');
    expect(LiquidUnitEnumStatus[1]).toEqual('OZ_UA');
    expect(LiquidUnitEnumStatus[2]).toEqual('OZ_UK');
    expect(LiquidUnitEnumStatus.getLabel(0)).toEqual('milliliter');
    expect(LiquidUnitEnumStatus.getLabel('ML')).toEqual('milliliter');
    expect(LiquidUnitEnumStatus.getLabel(1)).toEqual('ounce');
    expect(LiquidUnitEnumStatus.getLabel('OZ_UA')).toEqual('ounce');
    expect(LiquidUnitEnumStatus.getLabel(2)).toEqual('ounce');
    expect(LiquidUnitEnumStatus.getLabel('OZ_UK')).toEqual('ounce');
    expect(LiquidUnitEnumStatus.values()).toEqual([
        { value: 0, label: 'milliliter', key: 'ML' },
        { value: 1, label: 'ounce', key: 'OZ_UA' },
        { value: 2, label: 'ounce', key: 'OZ_UK' },
    ]);
    expect(LiquidUnitEnumStatus.find(LiquidUnitEnum.ML)).toEqual({
        value: 0,
        label: 'milliliter',
    });
    expect(LiquidUnitEnumStatus.find(LiquidUnitEnum.OZ_UK)).toEqual({
        value: 2,
        label: 'ounce',
    });
});
