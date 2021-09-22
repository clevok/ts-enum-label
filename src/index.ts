export function DefineEnumLabel<
    E extends { [key: string]: any },
    V extends Readonly<{ value: any; label: any }[]>,
>(
    callback:
        | (() => {
              Enum: E
              Values: V
          })
        | {
              Enum: E
              Values: V
          },
) {
    type GetLabel<T, K> = T extends { value: K; label: infer R } ? R : never

    const { Enum, Values } =
        typeof callback === 'function' ? callback() : callback

    function getLabelByValue<T extends V[number]['value']>(v: T) {
        return Values.find((value) => value.value === v)?.label as GetLabel<
            V[number],
            T
        >
    }

    /**
     *
     * 获取 [values, label] 数组
     * @returns
     */
    const values = () => [...Values]

    /**
     * 获取 value,label 对象
     * @returns
     */
    const valueOf = <T extends V[number]['value']>(v: T) =>
        Values.find((value) => value.value === v) as {
            value: T
            label: GetLabel<V[number], T>
        }

    Object.keys(Enum).forEach((enumKey) => {
        getLabelByValue[enumKey] = valueOf(enumKey) || valueOf(Enum[enumKey])
    })

    getLabelByValue['values'] = values

    return getLabelByValue as typeof getLabelByValue & {
        [key in keyof E]: V[number]
    }
}
