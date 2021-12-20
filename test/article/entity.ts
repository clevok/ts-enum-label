import { Entity, PrimaryColumn, Column } from '../../src/index'

@Entity()
export class Book_Entity {
    @PrimaryColumn()
    bookId: string

    @Column()
    bookName: string
}