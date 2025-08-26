import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    dts: true,       // 👈 ensures index.d.ts is built
    sourcemap: true,
    clean: true,
});