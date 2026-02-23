import type { NextConfig } from "next";

const legacyBlogSlugRedirects = [
  {
    source: "/blog/texas-tiene-la-tasa-m-s-alta-de-personas-sin-seguro-m-dico-d",
    destination: "/blog/texas-tiene-la-tasa-mas-alta-de-personas-sin-seguro-medico",
  },
  {
    source: "/blog/por-qu-podr-a-recibir-una-factura-del-m-dico-despu-s-de-su-c",
    destination: "/blog/por-que-podria-recibir-una-factura-del-medico-despues-de-su-chequeo-anual",
  },
  {
    source: "/blog/the-cochrun-group-m-s-de-dos-d-cadas-protegiendo-y-sirviendo",
    destination: "/blog/the-cochrun-group-mas-de-dos-decadas-protegiendo-y-sirviendo",
  },
  {
    source: "/blog/el-aumento-vertiginoso-de-las-primas-del-obamacare-obliga-a-",
    destination: "/blog/el-aumento-vertiginoso-de-las-primas-del-obamacare-obliga-a-tomar-decisiones-dificiles",
  },
] as const;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 72, 75, 90],
  },
  async redirects() {
    return legacyBlogSlugRedirects.map((rule) => ({ ...rule, permanent: true }));
  },
};

export default nextConfig;
