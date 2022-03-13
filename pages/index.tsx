
import Layout from '../components/Layout';
import { client } from '../libs/client';
import type { Cat, Post, Tag } from '../types/blog';
import Link from 'next/link'

type Props = {
  posts: Array<Post>;
  tagall: Tag[];
  catall:Cat[];
};

export default function Home({ posts,catall,tagall }: Props) {
  if (!posts && !catall && !tagall) {
    return <div>Loading...</div>
  }
  return (
    <>
    <Layout title='aaa'>
    <div className='p-5'> 
      <div className='max-w-5xl mx-auto gap-5 grid md:grid-cols-1 lg:grid-cols-3'>
        <div className="md:col-span-2 sm:col-span-1 grid md:grid-cols-2 gap-5">
        {
                posts.map((post)=>(
                  <>
                    <div className="rounded overflow-hidden shadow-lg bg-gray-900">
                      <Link href="">
                        <a>
                          <img className="w-full" src={post.img.url} alt="Sunset in the mountains" />
                          <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{post.title}</div>
                            <p className="text-gray-400 text-base">
                              #{post.cat.name}
                            </p>
                          </div>
                          <div className="px-6 pb-2">
                            {
                              post?.tag.map((tag)=>(
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.tag}</span>
                              ))
                            }
                        </div>
                        </a>
                      </Link>
                    </div>
                  </>
                ))
              }
        </div>

        {/* sidebar */}
        <div className="col-span-1 bg-gray-900 p-4 rounded">
          <input className="w-full h-8 px-2 text-sm text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" placeholder="key words"/>
          <section className='mt-8'>
            <h2 className='border-b-2 border-white border-solid pb-2'>カテゴリ一覧</h2>
            <ul>
              {
                 catall.map((cat)=>(
                  <li className='mt-2'>
                      <Link href="">
                          <a>・{cat.name}</a>
                      </Link>
                  </li>
                 ))
              }
            </ul>
          </section>

          <section className='mt-8'>
            <h2 className='border-b-2 border-white border-solid pb-2'>タグ一覧</h2>
            <ul>
              {
                 tagall.map((cat)=>(
                  <li className='mt-2'>
                      <Link href="">
                          <a>・{cat.tag}</a>
                      </Link>
                  </li>
                 ))
              }
            </ul>
          </section>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}

export const getServerSideProps = async () => {
  const data = await client.get({ endpoint: 'posts' });
  const tagall = await client.get({ endpoint: 'tag' });
  const catall = await client.get({ endpoint: 'cat' });

  return {
    props: {
      posts: data.contents,
      tagall: tagall.contents,
      catall: catall.contents,
    },
    // revalidate: 3,
  };
};