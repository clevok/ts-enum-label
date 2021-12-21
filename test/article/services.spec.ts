import { Repository } from '../../src/index'
import { Book_Entity } from './entity'
import { QueryBooks } from './mock'

class BookService {
    static async Query() {
        const books = await QueryBooks()

        return books.map((value) => {
            return Repository(Book_Entity).Save(value)
        })
    }
}

test('test book server', async () => {
    const books = await BookService.Query()
    console.log(books)
})
