"use client";

import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  console.log('productInfo', router)
  return (
    <section className="max-w-[80%] mx-auto min-h-screen">
      <h1>Single Product Page</h1>
    </section>
  );
}
