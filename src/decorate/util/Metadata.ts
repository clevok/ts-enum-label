/**
 *
 * @param {object} target 构造函数
 * @returns
 */
export function Metadata(target: {
    new (): any
}): ReturnType<typeof useMetadata> {
    if (Object.prototype.hasOwnProperty.call(target.prototype, 'Metadata')) {
        return target.prototype['Metadata']
    }

    return (target.prototype['Metadata'] = useMetadata())
}

interface IMetadataCell {
    /** 是否为主键 */
    primary: boolean
    /** 键名 */
    column: string
    /** 转换方法 */
    transformer: Function[]
}

function useMetadata() {
    const cell: IMetadataCell[] = []

    const addMetadata = (option: IMetadataCell) => {
        if (!option.primary) {
            return cell.push(option)
        }

        if (findPrimary()) {
            throw new Error('发现存在多条PrimaryColumn')
        }

        return cell.push(option)
    }

    const findPrimary = () => {
        return cell.find((cell) => cell.primary)
    }

    return {
        addMetadata,
        findPrimary,
    }
}
