import { getPrototype } from './util/prototype'

/**
 * 属性装饰器
 */
export function Column(
    options: {
        /** 声明主键, 建议使用 @PrimaryColumn */
        primary?: boolean

        /** 转换器, 用于当数据 Insert/Get 时候用的, 作用于动态数据的时候数据转化和校验 */
        transformer?: Function[]
    } = {},
): PropertyDecorator {
    return function (target, name) {
        const proto = getPrototype(target)

        proto.Metadata.addMetadata({
            primary: options.primary || false,
            column: name,
            transformer: options.transformer || [],
        })
    }
}
