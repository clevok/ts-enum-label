export function returnIfHas<T>(
    target: Object,
    key: string,
    handle: () => T,
): T {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
        return target[key]
    }

    return (target[key] = handle())
}
