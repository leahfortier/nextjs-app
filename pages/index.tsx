import classNames from 'classnames'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData, PostMeta } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

type StaticProps = {
  postsData: PostMeta[]
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postsData: PostMeta[] = getSortedPostsData()
  return {
    props: { postsData }
  }
}

function getPostListItem({ title, date, id }: PostMeta): ReactNode {
  return <li className={utilStyles.listItem} key={id}>
    <Link href={"posts/" + id}>
      <a>{title}</a>
    </Link>
    <br />
    <small className={utilStyles.lightText}>
      <Date isoDate={date} />
    </small>
  </li>
}

export default function Home({ postsData }: StaticProps) {
  const postListItems: ReactNode[] = postsData.map(meta => getPostListItem(meta))

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi!!! We are cute doggies and we like to woof woof woof!!!!!</p>
      </section>
      <section className={classNames(utilStyles.headingMd, utilStyles.padding1px)}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>{postListItems}</ul>
      </section>
    </Layout>
  )
}
