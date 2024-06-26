import Link from "next/link";

export default function Menu() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/profile">Profile</Link>
      </li>
      <li>
        <Link href="/users">Users</Link>
      </li>
      <li>
        <Link href="/notes">Notes</Link>
      </li>
      <li>
        <Link href="/posts">Posts</Link>
      </li>
    </ul>
  );
}
