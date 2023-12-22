import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <h1 className="text-center font-semibold mt-52 text-2xl underline">
        Welcome to India's Most Loving Website.
      </h1>
      <Link href="/pages/products">
        <h1 className="text-center mt-10">Visit Products Page...</h1>
      </Link>
    </main>
  );
}
