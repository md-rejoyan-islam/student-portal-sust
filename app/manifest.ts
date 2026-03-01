import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SUST EEE Student Portal",
    short_name: "SUST EEE Portal",
    description:
      "Official academic management portal for the Department of Electrical and Electronic Engineering (EEE), Shahjalal University of Science and Technology (SUST).",
    start_url: "/login",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#0f172a",
    orientation: "portrait-primary",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/logo.png",
        sizes: "120x120",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "120x120",
        type: "image/png",
        purpose: "maskable",
      },

      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
