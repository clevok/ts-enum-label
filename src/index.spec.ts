import { DefineEnumLabel } from '.'

it('基本测试', () => {
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

    expect(LiquidUnitLabel.OZ_UA).toEqual({
        value: LiquidUnitEnum.OZ_UA,
        label: 'oz_ua',
    })

    expect(LiquidUnitLabel.values()).toEqual([
        { value: LiquidUnitEnum.ML, label: 'ml' },
        { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
    ])

    expect(LiquidUnitLabel(LiquidUnitEnum.ML)).toEqual('ml')
})
it('第二种用法', () => {
    enum LiquidUnitEnum {
        ML = 1,
        OZ_UA = 2,
    }
    const LiquidUnitLabel = DefineEnumLabel({
        Enum: LiquidUnitEnum,
        Values: [
            { value: LiquidUnitEnum.ML, label: 'ml' },
            { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
        ] as const,
    })

    expect(LiquidUnitLabel.OZ_UA).toEqual({
        value: LiquidUnitEnum.OZ_UA,
        label: 'oz_ua',
    })

    expect(LiquidUnitLabel.values()).toEqual([
        { value: LiquidUnitEnum.ML, label: 'ml' },
        { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
    ])

    expect(LiquidUnitLabel(LiquidUnitEnum.ML)).toEqual('ml')
})
