import { IMetadataCell, Metadata, MetadataCellType } from './Metadata'

/**
 * 属性装饰器
 */
export function Column(
    options: Partial<IMetadataCell> = {},
): PropertyDecorator {
    return function (/** 属性装饰器,默认指向原型对象 */ target, name) {
        Metadata(target.constructor as any).addMetadata({
            type: options.type || MetadataCellType.COLUMN,
            column: name,
            transformer: options.transformer || [],
        })
    }
}
