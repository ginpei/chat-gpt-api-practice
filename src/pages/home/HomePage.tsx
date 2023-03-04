import Head from 'next/head'

export function HomePage(): JSX.Element {
  return (
    <div className="HomePage m-4">
    <Head>
      <title>Home</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <h1 className="text-red-500">HomePage</h1>
    </div>
  );
}
