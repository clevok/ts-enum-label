/**
 *
 * @param {object} target 原型对象
 * @returns
 */
export function Metadata(target: Object): ReturnType<typeof useMetadata> {
    if (Object.prototype.hasOwnProperty.call(target, 'Metadata')) {
        return target['Metadata']
    }

    return (target['Metadata'] = useMetadata())
}

interface IMetadataCell {
    /** 是否为主键 */
    primary: boolean
    /** 键名 */
    column: string | symbol
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

class MetadataClass {
    cell: IMetadataCell[] = []

    addMetadata(option: IMetadataCell) {
        if (!option.primary) {
            return this.cell.push(option)
        }

        if (this.findPrimary()) {
            throw new Error('发现存在多条PrimaryColumn')
        }

        return this.cell.push(option)
    }

    findPrimary() {
        return this.cell.find((cell) => cell.primary)
    }
}
