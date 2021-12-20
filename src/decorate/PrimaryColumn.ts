import { Metadata } from './util/Metadata'

/**
 * 属性装饰器
 */
export function PrimaryColumn(): PropertyDecorator {
    return function (/** 属性装饰器,默认指向原型对象 */ target, name) {
        Metadata(target.constructor as any).addMetadata({
            primary: true,
            column: String(name),
            transformer: [],
        })
    }
}
