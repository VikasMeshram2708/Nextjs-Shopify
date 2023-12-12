import HomeCarousel from "./components/Home/Carousels/HomeCarousel";
import Latest from "./components/Home/Latest/Latest";
import Products from "./pages/products/page";

export default function Home() {
  return (
    <main>
      <HomeCarousel />
      <Products />
    </main>
  );
}
