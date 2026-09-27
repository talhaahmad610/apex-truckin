import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // New in this eslint-plugin-react-hooks version. False-positives on two established,
      // correct patterns already in this codebase: deriving state from a browser-only API on
      // mount (FlightScrub's reduced-motion/saveData check) and resetting UI state when an
      // external value changes (Navbar closing the menu on route change). Kept visible as a
      // warning rather than silenced outright.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default eslintConfig;
