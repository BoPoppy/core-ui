import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Divider,
  Kbd,
  KbdCombo,
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
  TreeView,
  type TreeNode,
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

type TableState = "data" | "empty";

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
          <AvatarGroup>
            <Avatar fallback="AL" />
            <Avatar variant="accent" fallback="GH" />
            <Avatar fallback="AT" />
            <Avatar fallback="KJ" />
            <Avatar fallback="+5" />
          </AvatarGroup>
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

      <Section num="03" title="Data Table" note="populated · empty state">
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
          </Row>
        </Grp>
        <Table style={{ maxWidth: 560 }}>
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
            ) : (
              <TableEmpty colSpan={4}>
                No members found. Try adjusting your filters or invite someone new.
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
          <Tooltip content="Tooltip on top" side="top">
            <Button variant="secondary" size="sm">
              Top
            </Button>
          </Tooltip>
          <Tooltip content="Tooltip below" side="bottom">
            <Button variant="secondary" size="sm">
              Bottom
            </Button>
          </Tooltip>
          <Tooltip content="To the right" side="right">
            <Button variant="secondary" size="sm">
              Right
            </Button>
          </Tooltip>
          <Tooltip content="To the left" side="left">
            <Button variant="secondary" size="sm">
              Left
            </Button>
          </Tooltip>
        </Row>
      </Section>

      <Section num="07" title="Popover" note="click trigger · rich floating content">
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

      <Section num="08" title="Keyboard Key" note="shortcut hints">
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

      <Section num="09" title="Tree View" note="nested · expand / collapse">
        <TreeView
          data={TREE_DATA}
          defaultExpanded={["src", "components"]}
          style={{ maxWidth: 320 }}
        />
      </Section>

      <Section num="10" title="Timeline" note="chronological activity feed">
        <Timeline items={TIMELINE} style={{ maxWidth: 460 }} />
      </Section>
    </>
  );
}
