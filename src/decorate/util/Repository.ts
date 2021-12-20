/**
 * 储存库
 * @param {object} target 原型对象
 */
function Repository<Target>(target: Object) {
    if (!primary) {
        throw new Error('未定义PrimaryColumn')
    }

    const getPrimaryValue = (value: Target) => {
        if (!value[primary.column]) {
            throw new Error(`主键${String(primary.column)}为空`)
        }

        return value[primary.column]
    }

    /**
     * 通过主键ID获取实例
     */
    const GetByPrimary = (value: Target) => {
        return Cache.get(getPrimaryValue(value))
    }

    /**
     * 删除实例
     */
    const Delete = (value: Target) => {
        return Cache.delete(getPrimaryValue(value))
    }

    /**
     * 创建全新实例
     * 建议使用 @Save方法
     */
    const Insert = (value: Target) => {
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
    const Save = (value: Target) => {
        return Object.assign(GetByPrimary(value) || Insert(value), value)
    }
}

function getRepository(target: Object) {
    if (Object.prototype.hasOwnProperty.call(target, 'Repository')) {
        return target['Repository']
    }

    return (target['Repository'] = new Map()), target
}

class RepositoryClass<Target> {
    private Cache = new Map()

    getPrimaryValue = (value: Target) => {
        if (!value[primary.column]) {
            throw new Error(`主键${String(primary.column)}为空`)
        }

        return value[primary.column]
    }

    /**
     * 通过主键ID获取实例
     */
    GetByPrimary(value: Target) {
        return this.Cache.get(getPrimaryValue(value))
    }

    /**
     * 删除实例
     */
    Delete = (value: Target) => {
        return Cache.delete(getPrimaryValue(value))
    }

    /**
     * 创建全新实例
     * 建议使用 @Save方法
     */
    Insert = (value: Target) => {
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
    Save = (value: Target) => {
        return Object.assign(GetByPrimary(value) || Insert(value), value)
    }
}
