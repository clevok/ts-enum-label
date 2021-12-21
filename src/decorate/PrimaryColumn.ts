import { Metadata, MetadataCellType } from './Metadata'

/**
 * 属性装饰器
 */
export function PrimaryColumn(): PropertyDecorator {
    return function (/** 属性装饰器,默认指向原型对象 */ target, name) {
        Metadata(target.constructor as any).addMetadata({
            type: MetadataCellType.PRIMARY,
            column: name,
            transformer: [],
        })
    }
}
