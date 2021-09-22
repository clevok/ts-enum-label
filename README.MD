## 定义

```js
export enum LiquidUnitEnum {
    ML = 0,
    OZ_UA = 1,
    OZ_US = 2
}
export const LiquidUnitLabel = DefineEnumLabel({
    Enum: LiquidUnitEnum,
    Values: [
        { value: LiquidUnitEnum.ML, label: 'ml' },
        { value: LiquidUnitEnum.OZ_UA, label: 'oz' },
        { value: LiquidUnitEnum.OZ_US, label: 'oz' },
    ]
})

LiquidUnitLabel.ML // { value: LiquidUnitEnum.ML, label: 'ml' }
LiquidUnitLabel.values() // [ {value: LiquidUnitEnum.ML, label: 'ml'}... ]
LiquidUnitLabel(LiquidUnitEnum.ML) // ml

```

### 问题
和一开始设想不一致,没有找到理想的办法

```js
const LiquidUnitEnum = DefineEnum({
    ML: [0, 'ml'],
    OZ_UA: [1, 'oz'],
    OZ_US: [2, 'oz'],
})

LiquidUnitEnum.ML // 1
LiquidUnitEnum(LiquidUnitEnum.ML) // ml
```

存在问题
```js
const unit = LiquidUnitEnum.ML  // number
```
类型定义是number,当后期数据量躲起来, 类型为number太难快速定位了,远不如 类型为 enum, 没有好的方法了