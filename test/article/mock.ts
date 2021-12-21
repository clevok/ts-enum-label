export async function QueryBooks() {
    return new Array(10).map((value, index) => {
        return {
            bookId: String(index),
            bookName: `书籍${index}`,
        }
    })
}
