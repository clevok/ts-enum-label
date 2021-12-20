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

function Repository<Entity>(target: { new (): Entity }) {
    const Save = (value: Entity) => {}

    return {
        Save,
    }
}
const Operate = (v: any) => {}
const Manager = (v: any) => {}
const Resource = (v: any) => {}

Repository(Book_Entity).Save({})

class Repository2<Entity> {
    constructor(target: { new (): Entity }) {}

    Save(value: Entity) {}
}

new Repository2(Book_Entity).Save({})