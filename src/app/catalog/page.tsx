import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import CatalogGallery from "@/components/catalog/CatalogGallery";

export const metadata: Metadata = {
  title: "Katalog",
  description: "Cappafe ürün kataloğu — tüm ürün gamımızı tek bir katalogda inceleyin.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    type: "website",
    url: "/catalog",
    title: "Katalog — Cappafe",
    description: "Cappafe ürün kataloğu — tüm ürün gamımızı tek bir katalogda inceleyin.",
  },
};

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="relative z-[1]">
        <section className="pt-[110px] pb-[clamp(70px,11vw,130px)] sm:pt-[130px] lg:pt-[140px]">
          <div className="mx-auto max-w-[1360px] px-5 sm:px-6 lg:px-10">
            <CatalogHeader />
          </div>
          <div className="mx-auto mt-14 max-w-[1360px] px-5 sm:px-6 lg:px-10">
            <CatalogGallery />
          </div>
        </section>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
