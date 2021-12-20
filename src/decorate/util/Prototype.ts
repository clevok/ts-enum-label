import { Metadata } from './Metadata'

type IPrototype = {
    /** 实例 */
    Cache: Map<any, any>
    /** 属性描述 */
    Metadata: Metadata
}

/**
 * 获取格式化后的原型对象
 * 通过装饰器定义的属性,都将挂在到原型对象上
 */
export function getPrototype(
    /** 原型对象 */
    target: Object,
) {
    if (Object.prototype.hasOwnProperty.call(target, 'Metadata')) {
        return target as IPrototype
    }

    return initPrototype(target)
}

/**
 * 初始化原型对象
 */
function initPrototype<Target extends Object>(
    target: Target,
): IPrototype & Target {
    const Cache = new Map()
    const _Metadata = new Metadata()

    return Object.assign(target, {
        Cache,
        Metadata: _Metadata,
    })
}
