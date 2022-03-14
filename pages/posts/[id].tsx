import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { client } from '../../libs/client';
import { Post } from '../../types/blog';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

import 'highlight.js/styles/night-owl.css';

type Props = {
  article: Post;
  highlightedBody:any;
};

export default function Article({ article,highlightedBody }: Props) {


  return (
      <Layout title='sss'>
          <div className="">
            <div className="px-4 py-6 mx-auto">
                <div className="max-w-6xl py-6 mx-auto ">
                <img
                    className="object-cover w-full shadow-sm h-full"
                    src={article.img.url}
                />
                <div className="mt-4">
                    <div className="font-bold text-3xl">
                    {article.title}
                    </div>
                </div>
                {article.cat && (
                    <div className="flex items-center justify-start mt-4 mb-4">
                    <div className="px-2 py-1 font-bold text-gray-200 text-white rounded-lg">
                        #{article.cat.name}
                    </div>
                    </div>
                )}

                {article.tag && (
                    <div className="flex items-center justify-start mt-4 mb-4 flex-wrap">
                    {
                        article?.tag.map((tag)=>(
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tag.tag}</span>
                        ))
                    }
                    </div>
                )}

                <div className="mt-2">
                    <div className="text-white mt-12 rounded bodyarea">
                        <div dangerouslySetInnerHTML={{ __html: highlightedBody }}></div>
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

    const $ = cheerio.load(data.body); 
    $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
    });

  return {
    props: {
      article: data,
      highlightedBody:$.html()
    },
  };
};