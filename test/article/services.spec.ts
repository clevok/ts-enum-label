import { ref, watch } from 'vue'
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

    static Query$() {
        return new Observable(async (handle) => {
            Query().then((data) => {
                handle.next(data)
            })

            watch(Repository(Book_Entity), () => {})
            Repository(Book_Entity).BeforeInsert(() => {})

            onScopeDispose(() => {})

            return
        })
    }
}

test('test book server', async () => {
    // data, error, isloading
    const books = Query$()
    const books2 = createLoading(() => {
        return function () {
            
        }
    })

    expect(
        Repository(Book_Entity).Get({ bookId: '5' }) === books.value[5],
    ).toBe(true)
})
