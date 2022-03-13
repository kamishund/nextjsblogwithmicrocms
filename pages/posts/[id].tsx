import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { client } from '../../libs/client';
import { Post } from '../../types/blog';

type Props = {
  article: Post;
};

export default function Article({ article }: Props) {
  return (
      <Layout title='sss'>
          <div className="">
            <div className="px-10 py-6 mx-auto">
                <div className="max-w-6xl px-10 py-6 mx-auto ">
                <img
                    className="object-cover w-full shadow-sm h-full"
                    src={article.img.url}
                />
                <div className="mt-2">
                    <div className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-blue-500">
                    {article.title}
                    </div>
                </div>
                {article.cat && (
                    <div className="flex items-center justify-start mt-4 mb-4">
                    <div className="px-2 py-1 font-bold bg-red-400 text-white rounded-lg">
                        #{article.cat.name}
                    </div>
                    </div>
                )}
                <div className="mt-2">
                    <div className="text-2xl text-white mt-4 rounded ">
                    {article.body}
                    </div>
                </div>
                </div>
            </div>
            </div>
      </Layout>
    
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({
    endpoint: 'posts',
    contentId: idExceptArray,
  });

  return {
    props: {
      article: data,
    },
  };
};