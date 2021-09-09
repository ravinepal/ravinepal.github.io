import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="theme-color" content="#000" />
      <title>Ravi Kumar, @RaviNepal</title>
      <meta
        name="description"
        content={`Developing data-driven, open source and user-centered solutions to improve lives, and building a data literate world.`}
      />
       <link rel="icon" href="/images/ravi.jpg" />
      <meta property="og:image" content={'/images/ravi.jpg'} />
      </Head>
  )
}

export default Meta
