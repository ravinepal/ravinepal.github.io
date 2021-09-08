import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="theme-color" content="#000" />
      <title>Ravi Kumar, @RaviNepal</title>
      <meta
        name="description"
        content={`Ravi Kumar, @RaviNepal's Personal Portfilio.`}
      />
              <link rel="icon" href="/images/ravi.png" />
      <meta property="og:image" content={''} />
      </Head>
  )
}

export default Meta
