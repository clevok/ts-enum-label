## 下载

> npm i vue3-typeorm --save

## 使用

### 定义实体模型

```js
import { Entity, PrimaryColumn, Column } from '../../src/index'

/**
 * 不在追求树状结构, 通过 BookService(Book.Get(Entity)).QueryUser() 来获取对对应的数据
 */
@Entity()
class Book_Entity {
    @PrimaryColumn()
    bookId: string

    @Column({
        comment: '',
        transformer: [allowType(['string', 'null']), toString()],
    })
    bookName: string

    author?: string
}


// 往缓存里插入实例
UserEntity.Insert(user2)

const UserTable = Table(UserEntity)
UserTable.Insert(user2)
```

```js
const UserRepository = getRepository(UserEntity)

UserRepository.find() // 响应式容器,返回所有的
UserRepository.insert() // 仅仅往容器里面插入内容, 不涉及到与后端的交互
```

```js
const userModal = getModal(UserEntity)

userModal.find()
```

```js
fetch().then(({ data }) => {
    data.map((value) => {
        return UserEntity.insert(value)
    })
})
```

```js
// 理想的modal, 前端设计成了各种交互
class UserModal {
    GetDetail(id) {
        const user = UserEntity.findOne({ id })
        const userBindBooks = UserBindBooksEntity.find({ userId: id })
        const books = userBindBooks.map((bind) => {
            return BookEntity.findOne({ id: bind.bookId })
        })

        return (user.books = books)
    }
}
```

但是实际上应该不会设计成这样, 一般情况下, 后端都给你组好结构了, 你不需要自己拼装

例如,一个 api 获取 post 列表
进入详情页后,通过 postid 获取了所有的 rely[]
rely 由 user 组成

```js
interface PostEntity {
    postId: string
    author: UserEntity[]
    rely: RelyEntity[]
}

class PostModal {
    Query(params) {
        const posts = await fetch()

        return posts.map((post) => {
            return PostEntity.insert({
                ...post,
                author: UserEntity.insert(post)
            })
        })
    }

    Delete (post: PostEntity) {
        await fetch()
        
        post.slice()
        return PostEntity.delete(post)
    }
}

class RelyModal {
    Query (post: PostEntity) {
        const relys = await fetch()

        return relys.map((rely) => {
            return RelyEntity.insert({
                ...rely,
                relyUser: UserEntity.insert(rely.user)
            })
        })
    }

    Create (rely) {
        const relys = await fetch(rely)

        return RelyEntity.create(rely)
    }
}
```
