import Image from "next/image";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));
const Content = dynamic(() => import("@/components/content"));

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response : ", res))
      .catch((err) => console.log("error : ", err));
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <Content />
        <Image src="/code.jpg" width={400} height={400} alt="next img" />
        <img
          src="/code.jpg"
          style={{ width: 400, height: 400 }}
          alt="next img"
        />
      </LayoutComponent>
    </>
  );
}
