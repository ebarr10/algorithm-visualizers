import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isGhPages = mode === "gh-pages";

    return {
        plugins: [react()],
        base: isGhPages ? "/algorithm-visualizers/" : "/",
        server: {
            host: "127.0.0.1",
            port: 5173,
        },
    };
});
