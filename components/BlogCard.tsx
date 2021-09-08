/* eslint-disable @next/next/no-img-element */
import { Blog } from "../lib/api"
import styles from './BlogCard.module.scss'

export const BlogCard = (blog:Blog) => {
    return(
        <div className={styles.card}>
            {/* <div className={styles.image_container}><div className={styles.image} style={{backgroundImage:`url(${blog.coverImage.url})`}} alt={blog.title}/></div> */}
            {/* {blog.coverImage.credits && <span>{blog.coverImage.credits}</span>} */}
            <div className={styles.title}>{blog.title}</div>
            <div className={styles.author}>
                <span>{blog.author.name}</span>
                <span>{blog.author.email}</span>
            </div>
            <p>{blog.excerpt}</p>
        </div>
    )
}