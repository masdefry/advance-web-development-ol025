'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [postsData, setPostsData] = useState<any[]>([]);

  const getPostsData = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts'); // Format response is JSON
      const posts = await res.json();
      setPostsData(posts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <>
      <h1>CSR PAGE</h1>
      {postsData?.map((post: any, index: number) => {
        return <h2 key={index}>{post?.title}</h2>;
      })}
    </>
  );
}
