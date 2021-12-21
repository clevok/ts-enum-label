import { reactive } from 'vue'
import { UnwrapNestedRefs } from '@vue/reactivity'
import { Metadata } from './Metadata'
import { returnIfHas } from './has'

/**
 * @param {object} target 构造函数
 * @returns
 */
export function Repository<Entity>(target: { new (): Entity }) {
    return returnIfHas(target.prototype, 'Repository', () => {
        return useRepository({
            Constructor: target,
            PrimaryColumnName: Metadata(target).findPrimary()?.column,
        })
    })
}

function useRepository<Entity extends Object>(options: {
    Constructor: { new (): Entity }
    PrimaryColumnName: string
}) {
    const { PrimaryColumnName, Constructor } = options
    const Cache = new Map<string, UnwrapNestedRefs<Entity>>()

    const getPrimaryValue = (value: Entity) => {
        if (!value[PrimaryColumnName]) {
            throw new Error(`主键${String(PrimaryColumnName)}为空`)
        }

        return value[PrimaryColumnName]
    }

    /**
     * 通过主键ID获取实例
     */
    const Get = (value: Entity) => {
        return Cache.get(getPrimaryValue(value))
    }

    const Delete = (value: Entity) => {
        return Cache.delete(getPrimaryValue(value))
    }

    /**
     * 创建全新实例
     * 建议使用 @Save方法
     */
    const Insert = (value: Entity) => {
        const proxyValue = reactive(new Constructor())

        Object.assign(proxyValue, filterObjectProperty(value, proxyValue))

        return Cache.set(getPrimaryValue(value), proxyValue), proxyValue
    }

    /**
     * 如果存在即更新
     * 如果不存在着创建
     */
    const Save = (value: Entity) => {
        const result = Get(value)

        if (!result) {
            return Insert(value)
        }

        return Object.assign(result, filterObjectProperty(value, result))
    }

    return {
        Get,
        Delete,
        Save,
        Insert,
    }
}

/**
 * 过滤数据的属性
 */
function filterObjectProperty(source: Object, target: Object) {
    const result = {}
    /**
     * 往实例上添补数据
     */
    Object.keys(source)
        .filter((key) => Object.keys(target).includes(key))
        .forEach((key) => {
            result[key] = source[key]
        })

    return result
}
