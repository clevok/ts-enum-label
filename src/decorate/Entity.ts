export function Entity(): ClassDecorator {
    return function <Target extends Object>(
        /** 默认指向构造函数 */
        Constructor,
    ) {
        return Constructor
    }
}
