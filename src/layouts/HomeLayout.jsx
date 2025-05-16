import Hero from "../components/Hero";
import CategoryCards from "../components/CategoryCard";
import FilterBar from "../components/FilterBar";
import TestGrid from "../components/TestGrid";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
export default function HomeLayout() {
  return (
    <div>
      <Hero />
      <CategoryCards />
      <FilterBar />
      <TestGrid />
      <Banner />
      <Footer />
    </div>
  );
}
