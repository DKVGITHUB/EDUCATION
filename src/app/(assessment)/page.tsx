"use client";

import { UnisPage } from "@/components/dataset";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    localStorage.setItem("UnisPage", JSON.stringify(UnisPage));
  }, []);
  return (
    <main>
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
