import {
  Autocomplete,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  Checkbox,
  Combobox,
  Fab,
  Input,
  NumberField,
  OTPInput,
  Radio,
  RadioGroup,
  Rating,
  Select,
  Slider,
  Switch,
  TagInput,
  TextField,
  ToggleButtons,
  ToggleButtonsItem,
} from "@bopoppy/core-ui";
import { useState } from "react";
import { Grp, Section } from "../chrome/Section";

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);

const FRAMEWORKS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "angular", label: "Angular" },
];

export function Inputs() {
  const [seats, setSeats] = useState(4);
  const [picked, setPicked] = useState<string[]>(["react"]);
  const [tags, setTags] = useState<string[]>(["design", "ui"]);
  const [code, setCode] = useState("");

  return (
    <>
      <Section num="01" title="Buttons" note="variants · sizes · states">
        <Grp label="variants">
          <div className="row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </Grp>
        <Grp label="sizes">
          <div className="row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Grp>
        <Grp label="states">
          <div className="row">
            <Button loading>Saving…</Button>
            <Button variant="secondary" loading>
              Loading
            </Button>
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
        </Grp>
        <Grp label="as link (asChild)">
          <div className="row">
            <Button asChild>
              <a href="https://example.com">I am an anchor</a>
            </Button>
          </div>
        </Grp>
      </Section>

      <Section num="02" title="Button Group" note="segmented · single · multiple">
        <Grp label="single select">
          <div className="row">
            <ButtonGroup type="single" defaultValue="week">
              <ButtonGroupItem value="day">Day</ButtonGroupItem>
              <ButtonGroupItem value="week">Week</ButtonGroupItem>
              <ButtonGroupItem value="month">Month</ButtonGroupItem>
            </ButtonGroup>
          </div>
        </Grp>
        <Grp label="multiple select">
          <div className="row">
            <ButtonGroup type="multiple" defaultValue={["bold"]}>
              <ButtonGroupItem value="bold">B</ButtonGroupItem>
              <ButtonGroupItem value="italic">I</ButtonGroupItem>
              <ButtonGroupItem value="underline">U</ButtonGroupItem>
            </ButtonGroup>
          </div>
        </Grp>
      </Section>

      <Section num="03" title="Toggle Buttons" note="raised pill · view modes">
        <Grp label="single — view mode">
          <div className="row">
            <ToggleButtons type="single" defaultValue="grid">
              <ToggleButtonsItem value="list">List</ToggleButtonsItem>
              <ToggleButtonsItem value="grid">Grid</ToggleButtonsItem>
              <ToggleButtonsItem value="board">Board</ToggleButtonsItem>
            </ToggleButtons>
          </div>
        </Grp>
        <Grp label="multiple — formatting">
          <div className="row">
            <ToggleButtons type="multiple" defaultValue={["bold"]}>
              <ToggleButtonsItem value="bold">B</ToggleButtonsItem>
              <ToggleButtonsItem value="italic">I</ToggleButtonsItem>
              <ToggleButtonsItem value="underline">U</ToggleButtonsItem>
            </ToggleButtons>
          </div>
        </Grp>
      </Section>

      <Section num="04" title="Floating Action Button" note="icon-only · extended">
        <div className="row">
          <Fab aria-label="Add item">
            <PlusIcon />
          </Fab>
          <Fab size="sm" aria-label="Add item">
            <PlusIcon />
          </Fab>
          <Fab extended>
            <PlusIcon />
            Create
          </Fab>
        </div>
      </Section>

      <Section num="05" title="Text Field" note="label · hint · validation">
        <div className="row">
          <div className="col">
            <TextField label="Email" placeholder="you@example.com" hint="We'll never share it." />
            <TextField label="Email" error="That email is already taken." defaultValue="x@y" />
            <TextField label="Email" success="Looks good!" defaultValue="me@fv.dev" />
            <TextField label="Locked" disabled defaultValue="locked@fv.dev" />
          </div>
          <div className="col">
            <Input placeholder="Bare input — no label" />
          </div>
        </div>
      </Section>

      <Section num="06" title="Select" note="native · label · error">
        <div className="row">
          <Select label="Country" hint="Where should we ship?">
            <option value="us">United States</option>
            <option value="vn">Vietnam</option>
            <option value="jp">Japan</option>
            <option value="de">Germany</option>
          </Select>
          <Select label="Country" error="Please choose a country.">
            <option value="us">United States</option>
            <option value="vn">Vietnam</option>
          </Select>
        </div>
      </Section>

      <Section num="07" title="Checkbox" note="independent on/off">
        <div className="col">
          <Checkbox label="Email notifications" defaultChecked />
          <Checkbox label="SMS notifications" />
          <Checkbox label="Push notifications" defaultChecked />
          <Checkbox label="Unavailable" disabled />
        </div>
      </Section>

      <Section num="08" title="Radio Group" note="one of a set">
        <RadioGroup defaultValue="standard">
          <Radio value="standard" label="Standard shipping" />
          <Radio value="express" label="Express shipping" />
          <Radio value="overnight" label="Overnight" />
          <Radio value="pickup" label="In-store pickup" disabled />
        </RadioGroup>
      </Section>

      <Section num="09" title="Switch" note="instant setting">
        <div className="col">
          <Switch label="Airplane mode" />
          <Switch label="Wi-Fi" defaultChecked />
          <Switch label="Locked" disabled />
        </div>
      </Section>

      <Section num="10" title="Slider" note="continuous · stepped · range">
        <div className="col">
          <Slider defaultValue={[50]} max={100} step={1} />
          <Slider defaultValue={[40]} max={100} step={20} />
          <Slider defaultValue={[25, 75]} max={100} step={1} />
          <Slider defaultValue={[30]} disabled />
        </div>
      </Section>

      <Section num="11" title="Rating" note="capture · display">
        <div className="row">
          <Rating defaultValue={3} aria-label="Rate this product" />
          <Rating value={4} readOnly aria-label="Average rating" />
          <Rating defaultValue={7} max={10} aria-label="Rate out of ten" />
        </div>
      </Section>

      <Section num="12" title="Number Field" note="steppers · clamped">
        <div className="row">
          <NumberField aria-label="Seats" value={seats} onValueChange={setSeats} min={0} max={10} />
          <NumberField aria-label="Page size" defaultValue={0} step={25} min={0} max={100} />
        </div>
      </Section>

      <Section num="13" title="Autocomplete" note="single-select · type to filter">
        <Autocomplete
          options={["Apple", "Banana", "Blueberry", "Cherry", "Grape", "Mango", "Orange", "Peach"]}
          aria-label="Fruit"
          placeholder="Search fruit…"
          className="w-full max-w-72"
        />
      </Section>

      <Section num="14" title="Combobox" note="multi-select · chips">
        <Combobox
          options={FRAMEWORKS}
          value={picked}
          onValueChange={setPicked}
          aria-label="Frameworks"
          placeholder="Pick frameworks…"
          className="w-full max-w-72"
        />
      </Section>

      <Section num="15" title="Tag Input" note="free-form tokens">
        <TagInput
          value={tags}
          onValueChange={setTags}
          placeholder="Add skills…"
          className="w-full max-w-80"
        />
      </Section>

      <Section num="16" title="OTP Input" note="verification code · auto-advance">
        <OTPInput value={code} onValueChange={setCode} aria-label="Verification code" />
      </Section>
    </>
  );
}
