import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData, PostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

// PostData without the id
type StaticProps = {
    title: string,
    date: string,
    contentHtml: string,
}

// Required format for getStaticPaths
type PathParams = { params: Id }
type Id = { id: string }

export const getStaticPaths: GetStaticPaths<Id> = async () => {
    const ids: string[] = getAllPostIds()
    const paths: PathParams[] = ids.map(id => ({ params: { id } }))
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({ params }: PathParams) => {
    const postData: PostData = await getPostData(params.id)
    return {
        props: { ...postData }
    }
}

export default function Post({ title, date, contentHtml }: StaticProps): ReactNode {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{title}</h1>
                <div className={utilStyles.lightText}>
                    <Date isoDate={date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </Layout>
    )
}
