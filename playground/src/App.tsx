import { useState } from "react";
import { type CategoryId, CategoryTabs } from "./chrome/CategoryTabs";
import { Masthead } from "./chrome/Masthead";
import { PersonalityTabs } from "./chrome/PersonalityTabs";
import { TweaksPanel } from "./chrome/TweaksPanel";
import { Advanced } from "./sections/Advanced";
import { DataDisplay } from "./sections/DataDisplay";
import { Feedback } from "./sections/Feedback";
import { Foundations } from "./sections/Foundations";
import { Inputs } from "./sections/Inputs";
import { Navigation } from "./sections/Navigation";
import { Surfaces } from "./sections/Surfaces";

const PANELS: Record<CategoryId, () => React.JSX.Element> = {
  foundations: Foundations,
  inputs: Inputs,
  data: DataDisplay,
  feedback: Feedback,
  surfaces: Surfaces,
  nav: Navigation,
  advanced: Advanced,
};

export function App() {
  const [cat, setCat] = useState<CategoryId>("foundations");
  const Panel = PANELS[cat];
  return (
    <div className="sheet">
      <Masthead />
      <PersonalityTabs />
      <CategoryTabs active={cat} onChange={setCat} />
      <main className="canvas" id="canvas">
        <div className="catpanel" key={cat}>
          <Panel />
        </div>
      </main>
      <TweaksPanel />
    </div>
  );
}
