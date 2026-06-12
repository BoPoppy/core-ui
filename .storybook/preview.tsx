import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/styles/index.css";

const PERSONALITIES = ["pebble", "slate", "pop"] as const;

/** Global toolbar controls to switch personality + theme live. */
const withTokens: Decorator = (Story, context) => {
  const { personality, theme } = context.globals;
  // In the standalone canvas we stretch to fill the viewport so the themed
  // background reads as a full page; in autodocs each story is an inline block,
  // so we let it size to its content instead of forcing 100vh of empty space.
  const inDocs = context.viewMode === "docs";
  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-personality", personality);
    el.setAttribute("data-theme", theme);
    el.style.background = "var(--bg)";
  }, [personality, theme]);
  return (
    <div style={{ padding: inDocs ? 24 : 32, minHeight: inDocs ? undefined : "100vh", background: "var(--bg)" }}>
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
