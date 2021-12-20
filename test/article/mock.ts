export async function QueryBooks() {
    return new Array(10).map((value, index) => {
        return {
            bookId: index,
            bookName: `书籍${index}`,
        }
    })
}
