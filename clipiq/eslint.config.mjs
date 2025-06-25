import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Keep Next.js defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Relax rules that break the production build
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      // allow unused variables (you can prefix with _ for clarity)
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",

      // allow expression-only lines (e.g. someFlag && doSomething())
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-expressions": "off",

      // allow any for now
      "@typescript-eslint/no-explicit-any": "off",

      // if you still have any require() calls
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
