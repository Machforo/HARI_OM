import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Custom plugin to serve .docx files from the public folder
// Vite's default static file server fails on filenames containing & (encoded as %26)
// This middleware fully decodes the URL first, then reads the file directly from disk.
function docxStaticPlugin(): Plugin {
  return {
    name: "docx-static-serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url) return next();

        // Only handle .docx requests
        if (!req.url.includes(".docx")) return next();

        try {
          // Fully decode the URL to get the real filename (e.g. %26 -> &)
          const decodedUrl = decodeURIComponent(req.url.split("?")[0]);
          const filePath = path.join(process.cwd(), "public", decodedUrl);

          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            res.writeHead(200, {
              "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "Content-Length": stat.size,
              "Cache-Control": "public, max-age=3600",
            });
            fs.createReadStream(filePath).pipe(res);
          } else {
            console.warn(`[docx-static-plugin] File not found: ${filePath}`);
            next();
          }
        } catch (e) {
          console.error("[docx-static-plugin] Error serving file:", e);
          next();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    docxStaticPlugin(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
