import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
// import { VitePWA } from "vite-plugin-pwa";
// import { manifestForPlugIn } from "./manifest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // VitePWA(manifestForPlugIn),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern", // or "modern-compiler"
        silenceDeprecations: ["legacy-js-api", "import"],
      },
    },
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: "modern-compiler", // or "modern", "legacy"
  //       importers: [
  //         // ...
  //       ],
  //     },
  //   },
  // },
});
