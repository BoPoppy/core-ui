import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/styles/index.css";

const PERSONALITIES = ["pebble", "slate", "pop"] as const;

/** Global toolbar controls to switch personality + theme live. */
const withTokens: Decorator = (Story, context) => {
  const { personality, theme } = context.globals;
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-personality", personality);
    el.setAttribute("data-theme", theme);
    el.style.background = "var(--bg)";
  }, [personality, theme]);
  return (
    <div style={{ padding: 32, minHeight: "100vh", background: "var(--bg)" }}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "fullscreen",
  },
  globalTypes: {
    personality: {
      description: "Personality",
      defaultValue: "pebble",
      toolbar: {
        title: "Personality",
        icon: "paintbrush",
        items: PERSONALITIES.map((p) => ({ value: p, title: p })),
        dynamicTitle: true,
      },
    },
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTokens],
};

export default preview;
