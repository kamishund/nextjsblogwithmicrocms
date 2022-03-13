export type Post = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    body: string
    img: {
      url: string
      height: number
      width: number
    }
    tag: Tag[],
    cat: any,
  }

  export type Tag = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    tag: string
  }
  export type Cat = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    name: string
  }