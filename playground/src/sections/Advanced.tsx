import {
  Button,
  type CommandItem,
  CommandPalette,
  ColorPicker,
  DatePicker,
  type DateRange,
  DateRangePicker,
  FileDropzone,
  TimePicker,
  type TimeValue,
  useCommandPaletteShortcut,
} from "@bopoppy/core-ui";
import { useState } from "react";
import { Col, Grp, Row, Section } from "../chrome/Section";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d={d} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Inline read-out of a selected value, mirroring the wireframe's range/output pills. */
function ReadOut({ label, value }: { label: string; value: string }) {
  return (
    <span className="col" style={{ gap: 5 }}>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          color: "var(--text-faint)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: 14,
          color: "var(--text)",
          border: "var(--line-w) solid var(--border)",
          borderRadius: "var(--r-sm)",
          background: "var(--surface-2)",
          padding: "6px 10px",
          minWidth: 160,
        }}
      >
        {value}
      </span>
    </span>
  );
}

export function Advanced() {
  // 01 — File Dropzone
  const [fileNames, setFileNames] = useState<string[]>([]);

  // 02 — Command Palette
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>("—");
  useCommandPaletteShortcut(() => setPaletteOpen((o) => !o));
  const commands: CommandItem[] = [
    {
      id: "new",
      label: "New file",
      group: "Actions",
      shortcut: "⌘N",
      icon: icon("M12 5v14M5 12h14"),
      onSelect: () => setLastCommand("New file"),
    },
    {
      id: "search",
      label: "Search files",
      group: "Actions",
      shortcut: "⌘P",
      icon: icon("M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z"),
      onSelect: () => setLastCommand("Search files"),
    },
    {
      id: "settings",
      label: "Open settings",
      group: "Navigate",
      shortcut: "⌘,",
      icon: icon("M12 15a3 3 0 100-6 3 3 0 000 6z"),
      onSelect: () => setLastCommand("Open settings"),
    },
    {
      id: "theme",
      label: "Toggle theme",
      group: "Navigate",
      icon: icon("M12 3v2m0 14v2M5 12H3m18 0h-2"),
      onSelect: () => setLastCommand("Toggle theme"),
    },
  ];

  // 03 — Date Picker
  const [date, setDate] = useState<Date>();

  // 04 — Color Picker
  const [color, setColor] = useState("#2563eb");

  // 05 — Date Range
  const [range, setRange] = useState<DateRange>({});

  // 06 — Time Picker
  const [time, setTime] = useState<TimeValue>({ hour: 9, minute: 30, period: "AM" });

  const fmt = (d: Date) => d.toLocaleDateString();

  return (
    <>
      <Section num="01" title="File Dropzone" note="drag & drop · click to browse">
        <Grp>
          <Row>
            <FileDropzone
              accept="image/*,.pdf"
              description="PNG, JPG or PDF · up to 25 MB"
              onFilesChange={(files) => setFileNames(files.map((f) => f.name))}
            />
            <Col>
              <ReadOut
                label="selected files"
                value={fileNames.length ? fileNames.join(", ") : "none yet"}
              />
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                drop files above, or click to pick
              </span>
            </Col>
          </Row>
        </Grp>
      </Section>

      <Section num="02" title="Command Palette" note="⌘k · type to filter · ↑↓ to navigate">
        <Grp>
          <Row>
            <Button variant="secondary" onClick={() => setPaletteOpen(true)}>
              Open palette (⌘K)
            </Button>
            <ReadOut label="last command" value={lastCommand} />
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
              also works with your keyboard
            </span>
          </Row>
          <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} items={commands} />
        </Grp>
      </Section>

      <Section num="03" title="Date Picker" note="month grid · selectable · today">
        <Grp>
          <Row>
            <DatePicker value={date} onValueChange={setDate} />
            <ReadOut label="selected date" value={date ? fmt(date) : "—"} />
          </Row>
        </Grp>
      </Section>

      <Section num="04" title="Color Picker" note="swatch grid · hue track · hex">
        <Grp>
          <Row>
            <ColorPicker value={color} onValueChange={setColor} />
            <Col>
              <ReadOut label="selected color" value={color} />
              <span
                aria-hidden="true"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "var(--r-sm)",
                  background: color,
                  border: "var(--line-w) solid var(--card-line-color)",
                  boxShadow: "var(--shadow-1)",
                }}
              />
            </Col>
          </Row>
        </Grp>
      </Section>

      <Section num="05" title="Date Range" note="pick a start & end · highlighted span">
        <Grp>
          <Row>
            <DateRangePicker value={range} onValueChange={setRange} />
            <Row>
              <ReadOut label="start" value={range.start ? fmt(range.start) : "—"} />
              <span style={{ color: "var(--text-faint)" }}>→</span>
              <ReadOut label="end" value={range.end ? fmt(range.end) : "—"} />
            </Row>
          </Row>
        </Grp>
      </Section>

      <Section num="06" title="Time Picker" note="hours · minutes · am/pm">
        <Grp>
          <Row>
            <TimePicker value={time} onValueChange={setTime} minuteStep={5} />
            <ReadOut
              label="selected time"
              value={`${time.hour.toString().padStart(2, "0")}:${time.minute
                .toString()
                .padStart(2, "0")} ${time.period}`}
            />
          </Row>
        </Grp>
      </Section>
    </>
  );
}
