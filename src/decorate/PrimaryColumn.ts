import { getPrototype } from './util/prototype'

/**
 * 属性装饰器
 */
export function PrimaryColumn(): PropertyDecorator {
    return function (/** 属性装饰器,默认指向原型对象 */ target, name) {
        const proto = getPrototype(target)

        proto.Metadata.addMetadata({
            primary: true,
            column: name,
            transformer: [],
        })
    }
}
