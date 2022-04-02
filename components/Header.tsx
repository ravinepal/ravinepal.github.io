import Link from 'next/link'
export const Header = () => {
    return(
        <div className="header">
          <h1>Ravi Kumar, <a href="https://twitter.com/RaviNepal" rel="noreferrer" target="_blank">@RaviNepal</a></h1>
           <p className ="alignright">
               <Link href="/"> Home </Link> <Link href="/speaking"> | Speaking </Link> <Link href="/blogs"> | Blog </Link> <Link href="/media"> | Media </Link>
        <div style={{clear: 'both'}}></div>
        </div>
    )
}
