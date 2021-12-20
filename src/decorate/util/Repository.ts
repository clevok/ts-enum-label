import { reactive } from 'vue'
import { Metadata } from './Metadata'

/**
 * 储存库
 * @param {object} target 构造函数
 * @returns
 */
export function Repository<Con extends { new (): any }>(
    target: Con,
): ReturnType<typeof useRepository> {
    if (Object.prototype.hasOwnProperty.call(target.prototype, 'Repository')) {
        return target.prototype['Repository'] as useRepository
    }

    return (target.prototype['Repository'] = useRepository({
        Constructor: target,
        PrimaryColumnName: Metadata(target).findPrimary()?.column,
    }))
}

/**
 * 储存库
 * @param {object} target 原型对象
 */
function useRepository<Entity extends Object>(options: {
    /** 构造函数 */
    Constructor: { new (): Entity }
    /** 主键keyName */
    PrimaryColumnName: string
}) {
    const { PrimaryColumnName, Constructor } = options

    const Cache = new Map()

    const getPrimaryValue = (value: Entity) => {
        if (!value[PrimaryColumnName]) {
            throw new Error(`主键${String(PrimaryColumnName)}为空`)
        }

        return value[PrimaryColumnName]
    }

    /**
     * 通过主键ID获取实例
     */
    const GetByPrimary = (value: Entity) => {
        return Cache.get(getPrimaryValue(value))
    }

    /**
     * 删除实例
     */
    const Delete = (value: Entity) => {
        return Cache.delete(getPrimaryValue(value))
    }

    /**
     * 创建全新实例
     * 建议使用 @Save方法
     */
    const Insert = (value: Entity) => {
        const proxyValue = reactive(new Constructor())

        /**
         * 只写入实例上拥有的属性
         */
        Object.keys(value)
            .filter((key) => Object.keys(proxyValue).includes(key))
            .forEach((key) => {
                proxyValue[key] = value[key]
            })

        return Cache.set(getPrimaryValue(value), proxyValue), proxyValue
    }

    /**
     * 如果存在即更新
     * 如果不存在着创建
     */
    const Save = (value: Entity) => {
        return Object.assign(GetByPrimary(value) || Insert(value), value)
    }

    return {
        GetByPrimary,
        Delete,
        Save,
        Insert,
    }
}

