import { returnIfHas } from './util/has'

/**
 *
 * @param {object} target 构造函数
 * @returns
 */
export function Metadata(target: {
    new (): any
}): ReturnType<typeof useMetadata> {
    return returnIfHas(target.prototype, 'Metadata', useMetadata)
}

export enum MetadataCellType {
    /** 主键 */
    PRIMARY = 'primary',

    /** 普通键 */
    COLUMN = 'column',

    /** 插入前调用的函数 */
    BEFORE_INSERT = 'BeforeInsert',
}

export interface IMetadataCell {
    /** 是否为主键 */
    type: MetadataCellType
    /** 键名 */
    column: string | symbol
    /** 转换方法 */
    transformer: Function[]
}

function useMetadata() {
    const values: IMetadataCell[] = []

    const addMetadata = (option: IMetadataCell) => {
        if (option.type !== 'primary') {
            return values.push(option)
        }

        if (findPrimary()) {
            throw new Error('发现存在多条PrimaryColumn')
        }

        return values.push(option)
    }

    const findPrimary = () => {
        return values.find((cell) => cell.type === 'primary')
    }

    return {
        values,
        addMetadata,
        findPrimary,
    }
}
