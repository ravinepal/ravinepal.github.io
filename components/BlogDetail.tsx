/* eslint-disable @next/next/no-img-element */
import { Blog } from "../lib/api"
import styles from './BlogDetail.module.scss'
import HtmlRenderer from "./HtmlRenderer"
import Link from 'next/link'

export const BlogDetail = (blog:Blog) => {
    return(
        <>
        <div className={styles.breadcrumbs}>
        <span><Link href="/blogs" passHref>
                <a>
                    Blogs
                </a>
            </Link></span>
            <span>{blog.title}</span>
        </div>
        <div className={styles.card}>
            
            <div className={styles.image_container}><div className={styles.image} style={{backgroundImage:`url(${blog.coverImage.url})`}}/></div>
            {blog.coverImage.credits && <p className={styles.credits}>{blog.coverImage.credits}</p>}
            <div className={styles.title}>{blog.title}</div>
            <div className={styles.author}>
                <span>{blog.author.name}</span>
                <span>{blog.author.email}</span>
            </div>
            <div className={styles.content_wrapper}>
            <HtmlRenderer content={blog.content}/>
            </div>
        </div>
        </>
    )
}