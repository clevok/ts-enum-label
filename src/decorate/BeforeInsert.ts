import { IMetadataCell, Metadata, MetadataCellType } from './Metadata'

/**
 * 方法装饰器
 * 插入前触发
 */
export function BeforeInsert(): MethodDecorator {
    return function (
        /** 属性装饰器,默认指向原型对象 */
        target,
        name,
        descriptor,
    ) {
        Metadata(target.constructor as any).addMetadata({
            type: MetadataCellType.BEFORE_INSERT,
            column: name,
            transformer: [],
        })
    }
}
