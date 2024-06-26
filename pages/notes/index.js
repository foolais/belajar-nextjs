import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  console.log("notes data => ", notes);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {notes?.data.map((item) => (
          <div>
            <Link href={`/notes/${item.id}`}>{item.title}</Link>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();
  return { props: { notes }, revalidate: 10 };
}
