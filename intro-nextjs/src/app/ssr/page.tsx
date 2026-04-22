export const getPostsData = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // Format response is JSON
    console.log(res);
    const posts = await res.json(); // Convert JSON tobe object JS

    return posts;
  } catch (error) {
    console.log(error);
  }
};

export default async function Page() {
  const postsData = await getPostsData();
  return (
    <>
      <h1>SSR PAGE</h1>
      {postsData?.map((post: any, index: number) => {
        return <h2 key={index}>{post?.title}</h2>;
      })}
    </>
  );
}
