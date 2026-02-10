"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScrollSnap } from "@/contexts/ScrollSnapContext";

export default function HashScroller() {
  const pathname = usePathname();
  const { disableSnap, enableSnap } = useScrollSnap();

  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;
      if (!hash) return;

      const id = decodeURIComponent(hash.slice(1));
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      disableSnap();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        enableSnap();
      }, 1500);
    }

    const raf = window.requestAnimationFrame(() => {
      window.setTimeout(scrollToHash, 0);
    });

    const onHashChange = () => scrollToHash();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname, disableSnap, enableSnap]);

  return null;
}
