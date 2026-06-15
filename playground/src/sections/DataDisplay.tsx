import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Divider,
  Kbd,
  KbdCombo,
  Link,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  Timeline,
  type TimelineItem,
  Tooltip,
  type TreeNode,
  TreeView,
} from "@bopoppy/core-ui";
import { useState } from "react";
import { Grp, Row, Section } from "../chrome/Section";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M13 2v7h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const MEMBERS = [
  { name: "Ada Lovelace", initials: "AL", role: "Owner", status: "Active", joined: "Jan 2024" },
  { name: "Grace Hopper", initials: "GH", role: "Admin", status: "Active", joined: "Mar 2024" },
  { name: "Alan Turing", initials: "AT", role: "Editor", status: "Invited", joined: "Jun 2024" },
  {
    name: "Katherine J.",
    initials: "KJ",
    role: "Viewer",
    status: "Suspended",
    joined: "Sep 2024",
  },
] as const;

type StatusKind = (typeof MEMBERS)[number]["status"];

function statusVariant(status: StatusKind): "success" | "danger" | "neutral" {
  if (status === "Active") return "success";
  if (status === "Suspended") return "danger";
  return "neutral";
}

const TREE_DATA: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: <FolderIcon />,
    children: [
      { id: "index", label: "index.html", icon: <FileIcon /> },
      {
        id: "components",
        label: "components",
        icon: <FolderIcon />,
        children: [
          { id: "button", label: "Button.jsx", icon: <FileIcon /> },
          { id: "card", label: "Card.jsx", icon: <FileIcon /> },
        ],
      },
      { id: "styles", label: "styles.css", icon: <FileIcon /> },
    ],
  },
];

const TIMELINE: TimelineItem[] = [
  {
    time: "09:24",
    title: "Project created",
    description: "Ada set up the workspace and invited the team.",
    status: "done",
  },
  {
    time: "11:02",
    title: "First commit pushed",
    description: "Initial component scaffold merged to main.",
    status: "done",
  },
  {
    time: "14:47",
    title: "Review requested",
    description: "Grace requested review on the tokens PR.",
    status: "active",
  },
  {
    time: "—",
    title: "Release",
    description: "Scheduled once review is complete.",
    status: "upcoming",
  },
];

type TableState = "data" | "empty" | "error";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

const WarnIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

/** Centered empty/error block for a table state cell, mirroring the design. */
function StateBlock({
  icon,
  title,
  children,
  error,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-5 py-[34px] text-center text-muted">
      <span
        className={`grid size-10 place-items-center rounded-full border-solid [border-width:var(--line-w)] [&_svg]:size-5 ${
          error
            ? "border-transparent bg-danger-soft text-danger"
            : "[border-color:var(--border)] bg-surface-2"
        }`}
      >
        {icon}
      </span>
      <span className="text-sm font-bold text-fg">{title}</span>
      <span className="text-[13px]">{children}</span>
    </div>
  );
}

export function DataDisplay() {
  const [tableState, setTableState] = useState<TableState>("data");

  return (
    <>
      <Section num="01" title="Avatars" note="sizes · fallback · status · group">
        <Grp label="sizes">
          <Row>
            <Avatar size="xs" fallback="AL" />
            <Avatar size="sm" fallback="AL" />
            <Avatar size="md" fallback="AL" />
            <Avatar size="lg" fallback="AL" />
            <Avatar size="xl" fallback="AL" />
          </Row>
        </Grp>
        <Grp label="fallbacks & status">
          <Row>
            <Avatar variant="accent" fallback="GH" />
            <Avatar fallback={<UserIcon />} />
            <Avatar size="lg" fallback="AT" status="online" />
            <Avatar size="lg" fallback="KJ" status="busy" />
            <Avatar size="lg" fallback="MM" status="offline" />
          </Row>
        </Grp>
        <Grp label="stacked group">
          <Row>
            <AvatarGroup>
              <Avatar fallback="AL" />
              <Avatar variant="accent" fallback="GH" />
              <Avatar fallback="AT" />
              <Avatar fallback="KJ" />
              <Avatar fallback="+5" />
            </AvatarGroup>
            <span className="note">
              <span className="arr">↜</span> hover to fan out
            </span>
          </Row>
        </Grp>
      </Section>

      <Section num="02" title="Badges" note="status · labels · counts">
        <Row>
          <Badge>Neutral</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success" dot>
            Active
          </Badge>
          <Badge variant="danger" dot>
            Failed
          </Badge>
          <Badge>v2.4.1</Badge>
          <Badge variant="accent">New</Badge>
        </Row>
      </Section>

      <Section num="03" title="Data Table" note="data · empty · error states">
        <Grp label="state">
          <Row>
            <Button
              variant={tableState === "data" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTableState("data")}
            >
              With data
            </Button>
            <Button
              variant={tableState === "empty" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTableState("empty")}
            >
              Empty
            </Button>
            <Button
              variant={tableState === "error" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setTableState("error")}
            >
              Error
            </Button>
          </Row>
        </Grp>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableState === "data" ? (
              MEMBERS.map((m) => (
                <TableRow key={m.name}>
                  <TableCell>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                      <Avatar size="xs" fallback={m.initials} />
                      {m.name}
                    </span>
                  </TableCell>
                  <TableCell>{m.role}</TableCell>
                  <TableCell>
                    {m.status === "Invited" ? (
                      <Badge>{m.status}</Badge>
                    ) : (
                      <Badge variant={statusVariant(m.status)} dot>
                        {m.status}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{m.joined}</TableCell>
                </TableRow>
              ))
            ) : tableState === "empty" ? (
              <TableEmpty colSpan={4} className="p-0">
                <StateBlock icon={<SearchIcon />} title="No members found">
                  Try adjusting your filters or invite someone new.
                </StateBlock>
              </TableEmpty>
            ) : (
              <TableEmpty colSpan={4} className="p-0">
                <StateBlock error icon={<WarnIcon />} title="Couldn't load members">
                  Something went wrong.{" "}
                  <Link variant="underline" href="#" onClick={(e) => e.preventDefault()}>
                    Retry
                  </Link>
                </StateBlock>
              </TableEmpty>
            )}
          </TableBody>
        </Table>
      </Section>

      <Section num="04" title="Divider" note="solid · dashed · labelled · vertical">
        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 460 }}>
          <div>
            <div className="grp-label">solid</div>
            <Divider />
          </div>
          <div>
            <div className="grp-label">dashed</div>
            <Divider variant="dashed" />
          </div>
          <div>
            <div className="grp-label">with label</div>
            <Divider>OR CONTINUE WITH</Divider>
          </div>
          <div>
            <div className="grp-label">vertical</div>
            <div className="row" style={{ height: 40, alignItems: "center" }}>
              <span className="t-small">Edit</span>
              <Divider orientation="vertical" />
              <span className="t-small">Duplicate</span>
              <Divider orientation="vertical" />
              <span className="t-small">Archive</span>
            </div>
          </div>
        </div>
      </Section>

      <Section num="05" title="List" note="icon · two-line · meta">
        <List style={{ maxWidth: 420 }}>
          <ListItem
            icon={<ActivityIcon />}
            title="Activity"
            subtitle="Last sync 2 minutes ago"
            meta="›"
          />
          <ListItem
            icon={<CheckIcon />}
            title="Completed tasks"
            subtitle="128 this week"
            meta="›"
          />
          <ListItem
            icon={<ClockIcon />}
            title="Scheduled"
            subtitle="Next run at 6:00 PM"
            meta="›"
          />
        </List>
      </Section>

      <Section num="06" title="Tooltip" note="hover · four directions">
        <Row>
          <Tooltip content="Helpful hint text" side="top">
            <Button variant="secondary" size="sm">
              Top
            </Button>
          </Tooltip>
          <Tooltip content="Helpful hint text" side="bottom">
            <Button variant="secondary" size="sm">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip content="Helpful hint text" side="right">
            <Button variant="secondary" size="sm">
              Right
            </Button>
          </Tooltip>
          <Tooltip content="Helpful hint text" side="top" defaultOpen>
            <Badge variant="accent">i</Badge>
          </Tooltip>
          <span className="note">
            <span className="arr">↜</span> hover any of these
          </span>
        </Row>
      </Section>

      <Section num="07" title="Typography" note="scale · weights · styles">
        <div className="type-spec">
          <div className="type-row">
            <span className="type-tag">h1 · 44</span>
            <span className="t-h1">The quick brown fox</span>
          </div>
          <div className="type-row">
            <span className="type-tag">h2 · 32</span>
            <span className="t-h2">The quick brown fox</span>
          </div>
          <div className="type-row">
            <span className="type-tag">h3 · 24</span>
            <span className="t-h3">The quick brown fox</span>
          </div>
          <div className="type-row">
            <span className="type-tag">body · 15</span>
            <span className="t-body">
              The quick brown fox jumps over the lazy dog. Body copy sits at a comfortable reading
              size with relaxed line height for longer passages.
            </span>
          </div>
          <div className="type-row">
            <span className="type-tag">small · 13</span>
            <span className="t-small">Secondary supporting text in a muted tone.</span>
          </div>
          <div className="type-row">
            <span className="type-tag">caption</span>
            <span className="t-caption">Overline / caption label</span>
          </div>
          <div className="type-row">
            <span className="type-tag">link</span>
            <span className="t-body">
              Inline text with a <span className="t-link">highlighted link</span> in the accent
              color.
            </span>
          </div>
        </div>
      </Section>

      <Section num="08" title="Popover" note="click trigger · rich floating content">
        <Row>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <PopoverTitle>Share this project</PopoverTitle>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "var(--text-muted)" }}>
                  Anyone with the link can view. Toggle access from settings.
                </p>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button size="sm">Copy link</Button>
                </div>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Row>
      </Section>

      <Section num="09" title="Keyboard Key" note="shortcut hints">
        <Row>
          <KbdCombo>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <span className="t-small">Command palette</span>
          </KbdCombo>
          <KbdCombo>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>P</Kbd>
            <span className="t-small">Quick actions</span>
          </KbdCombo>
          <KbdCombo>
            <Kbd>Esc</Kbd>
            <span className="t-small">Dismiss</span>
          </KbdCombo>
          <KbdCombo>
            <Kbd>↵</Kbd>
            <span className="t-small">Confirm</span>
          </KbdCombo>
        </Row>
      </Section>

      <Section num="10" title="Tree View" note="nested · expand / collapse">
        <TreeView
          data={TREE_DATA}
          defaultExpanded={["src", "components"]}
          style={{ maxWidth: 320 }}
        />
      </Section>

      <Section num="11" title="Timeline" note="chronological activity feed">
        <Timeline items={TIMELINE} style={{ maxWidth: 460 }} />
      </Section>
    </>
  );
}
