// import { Repository } from '../../src/index'
import { Book_Entity } from './entity'
import { QueryBooks } from './mock'

class BookService {
    static async Query() {
        const books = await QueryBooks()

        return books.map((value) => {
            return Book_Entity.Create(value)
        })
    }
}

test('test book server', async () => {
    const books = await BookService.Query()
})

function Repository<Entity extends Object>(options: {
    /** 构造函数 */
    Constructor: { new (): Entity }
    /** 主键keyName */
    PrimaryColumnName: string
}) {
    const Save = (value: Entity) => {}

    return {
        Save,
    }
}
const Operate = (v: any) => {}
const Manager = (v: any) => {}
const Resource = (v: any) => {}

Repository({ Constructor: Book_Entity, PrimaryColumnName: '' }).Save({
    bookId: '',
    bookName: '',
})
