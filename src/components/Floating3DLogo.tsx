"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

export default function Floating3DLogo() {
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div className="fixed bottom-20 right-6 z-[60] hidden lg:block pointer-events-auto">
      <Link 
        href="/" 
        aria-label="Volver al inicio"
        onClick={() => {
          if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative transition-transform duration-200 ease-out"
          style={{ transformStyle: "preserve-3d", transform }}
        >
          <div className="animate-float-spin" style={{ transformStyle: "preserve-3d" }}>
            <Image
              ref={imgRef}
              src={siteConfig.brand.logoPath}
              alt="TC Insurance Logo"
              width={siteConfig.brand.logoWidth}
              height={siteConfig.brand.logoHeight}
              className="h-[5rem] w-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)]"
              style={{ transform: "translateZ(30px)" }}
              priority
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
