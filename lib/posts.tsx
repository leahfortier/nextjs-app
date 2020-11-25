import fs from 'fs'
import matter, { GrayMatterFile } from 'gray-matter'
import path from 'path'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory: string = path.join(process.cwd(), 'posts')

// Metadata in the input post file
type FileMeta = {
    title: string,
    date: string,
}

// Data needed to preview the post in the list
export type PostMeta = FileMeta & { id: string }

// Data to view the entire post on its own page
export type PostData = PostMeta & { contentHtml: string }

// Will only include content when content is true (if false can be cast to PostMeta)
type RawPostData = PostMeta & { content?: string }
function readPostData(id: string, content: boolean): RawPostData {
    // Read markdown file as string
    const fullPath: string = path.join(postsDirectory, `${id}.md`)
    const fileContents: string = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult: GrayMatterFile<string> = matter(fileContents)
    const data: FileMeta = matterResult.data as FileMeta

    // Combine the data with the id
    const postData: RawPostData = { id, ...data }
    if (content) {
        postData.content = matterResult.content
    }

    return postData
}

// Returns a list of all the posts with their metadata (but not their content)
export function getSortedPostsData(): PostMeta[] {
    const ids: string[] = getAllPostIds()
    const allPostsData: PostMeta[] = ids.map(id => readPostData(id, false))

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        return a.date < b.date ? 1 : -1
    })
}

// Ids are the base of each filename (Ex: p1.md -> p1)
export function getAllPostIds(): string[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)

    // Remove ".md" from file name to get id
    return fileNames.map(fileName => fileName.replace(/\.md$/, ''))
}

// Returns all the data (including content) about a single post
export async function getPostData(id: string): Promise<PostData> {
    // Read the raw data from the post, retrieves content as a string
    const postData: RawPostData = readPostData(id, true)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(postData.content)
    const contentHtml = processedContent.toString()

    return {
        contentHtml,
        ...postData
    }
}
