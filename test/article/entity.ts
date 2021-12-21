import { Entity, PrimaryColumn, Column, BeforeInsert } from '../../src/index'

export class Book_Entity extends Entity {
    @PrimaryColumn()
    bookId: string

    @Column()
    bookName: string

    @BeforeInsert()
    beforeInsert() {
        this.bookId
    }
}
