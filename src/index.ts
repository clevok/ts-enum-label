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
export function CustomStatus<
    IConfig extends {
        [key: string]: Readonly<[string | number, any]>
    },
>(config: IConfig) {
    type IConfigKey = keyof IConfig
    type GetLabelByValue<T, KEY> = T extends Readonly<[KEY, infer R]>
        ? R
        : never

    /**
     *
     * 根据 key/value 获取对于的 item值
     */
    function find<IKey extends IConfigKey>(
        keyOrValue: IKey,
    ): { value: IConfig[IKey][0]; label: IConfig[IKey][1] }
    /**
     *
     * 重载: 根据value 查找
     */
    function find<IValue extends IConfig[IConfigKey][0]>(
        keyOrValue: IValue,
    ): { value: IValue; label: GetLabelByValue<IConfig[IConfigKey], IValue> }
    function find(keyOrValue: any): any {
        const findKey = Object.keys(config).find((configKey) => {
            return (
                configKey === keyOrValue || config[configKey][0] === keyOrValue
            )
        })

        return findKey
            ? {
                  value: config[findKey][0],
                  label: config[findKey][1],
              }
            : undefined
    }

    /**
     * 重载: 根据key查找
     */
    function getLabel<IKey extends IConfigKey>(
        keyOrValue: IKey,
    ): IConfig[IKey][1]
    /**
     *
     * 重载: 根据value查找
     */
    function getLabel<IValue extends IConfig[IConfigKey][0]>(
        keyOrValue: IValue,
    ): GetLabelByValue<IConfig[IConfigKey], IValue>
    function getLabel(keyOrValue: any): any {
        return find(keyOrValue)?.label
    }

    const values = <T extends IConfigKey>(): {
        key: T
        value: IConfig[T][0]
        label: IConfig[T][1]
    }[] => {
        return Object.keys(config).map((key) => {
            const [value, label] = config[key]
            return { key, value, label }
        }) as any
    }

    type GetValue<IConfig> = IConfig extends {
        [key: string]: Readonly<[infer R, any]>
    }
        ? R
        : never

    const Enum = Object.keys(config).reduce((pre, key) => {
        if (Object.prototype.hasOwnProperty.call(pre, config[key][0])) {
            throw new Error('枚举定义异常, 存在value和key同名且非对应关系')
        }

        return Object.assign(pre, {
            [key]: config[key][0],
            [config[key][0]]: key,
        })
    }, {}) as {
        [P in IConfigKey]: IConfig[P][0]
    } & {
        [F in GetValue<IConfig>]: IConfigKey
    }

    getLabel['values'] = values
    getLabel['find'] = find
    getLabel['getLabel'] = getLabel

    Object.keys(Enum).forEach((enumKey) => {
        getLabel[enumKey] = Enum[enumKey]
    })

    return getLabel as typeof getLabel & {
        values: typeof values
        find: typeof find
        getLabel: typeof getLabel
    } & {
        [P in IConfigKey]: IConfig[P][0]
    } & {
        [F in GetValue<IConfig>]: IConfigKey
    }
}
