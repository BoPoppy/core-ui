import {
  BottomNav,
  Breadcrumbs,
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  Link,
  Menu,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenuContent,
  MenuItem,
  MenuLabel,
  MenuSeparator,
  MenuTrigger,
  Pagination,
  SpeedDial,
  Stepper,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@bopoppy/core-ui";
import { useState } from "react";
import { Grp, Row, Section } from "../chrome/Section";

/** Inline 24×24 stroke icon helper, matching the component stories. */
function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const NAV_ITEMS = [
  { value: "home", label: "Home", icon: <Icon d="M3 11l9-8 9 8M5 10v10h14V10" /> },
  {
    value: "search",
    label: "Search",
    icon: <Icon d="M21 21l-4.3-4.3M11 18a7 7 0 100-14 7 7 0 000 14z" />,
  },
  {
    value: "alerts",
    label: "Alerts",
    icon: <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" />,
  },
  {
    value: "profile",
    label: "Profile",
    icon: <Icon d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />,
  },
];

export function Navigation() {
  const [page, setPage] = useState(4);
  const [tab, setTab] = useState("home");

  return (
    <>
      <Section num="01" title="Link" note="animated underline · variants">
        <Row>
          <Link href="#">Animated underline</Link>
          <Link href="#" variant="underline">
            Always underlined
          </Link>
          <Link href="#" variant="muted">
            Muted link
          </Link>
        </Row>
      </Section>

      <Section num="02" title="Breadcrumbs" note="hierarchical path">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#" },
            { label: "Projects", href: "#" },
            { label: "Marketing Site", href: "#" },
            { label: "Settings" },
          ]}
        />
      </Section>

      <Section num="03" title="Pagination" note="page navigation · live">
        <Pagination page={page} count={12} onPageChange={setPage} />
      </Section>

      <Section num="04" title="Stepper" note="multi-step progress">
        <Stepper
          current={2}
          steps={[
            { label: "Account" },
            { label: "Profile" },
            { label: "Billing" },
            { label: "Review" },
          ]}
        />
      </Section>

      <Section num="05" title="Bottom Navigation" note="mobile tab bar · live">
        <BottomNav value={tab} onValueChange={setTab} items={NAV_ITEMS} style={{ maxWidth: 360 }} />
      </Section>

      <Section num="06" title="Tabs" note="underline & pill · live">
        <Grp label="underline">
          <Tabs defaultValue="overview" style={{ maxWidth: 420 }}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              Overview panel — a summary of recent activity and key metrics.
            </TabsContent>
            <TabsContent value="activity">
              Activity panel — a chronological feed of everything that happened.
            </TabsContent>
            <TabsContent value="settings">
              Settings panel — preferences, members and integrations.
            </TabsContent>
          </Tabs>
        </Grp>
        <Grp label="pill">
          <Tabs defaultValue="monthly">
            <TabsList variant="pill">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </Grp>
      </Section>

      <Section num="07" title="Menu" note="dropdown · live">
        <Menu>
          <MenuTrigger asChild>
            <Button variant="secondary">Open menu</Button>
          </MenuTrigger>
          <MenuContent>
            <MenuLabel>Account</MenuLabel>
            <MenuItem>
              <Icon d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0" />
              Profile
            </MenuItem>
            <MenuItem shortcut="⌘,">
              <Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 13a7.5 7.5 0 000-2l2-1.5-2-3.5-2.3 1a7.5 7.5 0 00-1.7-1L17 3.5h-4l-.4 2.5a7.5 7.5 0 00-1.7 1l-2.3-1-2 3.5 2 1.5a7.5 7.5 0 000 2l-2 1.5 2 3.5 2.3-1a7.5 7.5 0 001.7 1L13 20.5h4l.4-2.5a7.5 7.5 0 001.7-1l2.3 1 2-3.5z" />
              Settings
            </MenuItem>
            <MenuSeparator />
            <MenuItem danger shortcut="⌘Q">
              <Icon d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              Sign out
            </MenuItem>
          </MenuContent>
        </Menu>
      </Section>

      <Section num="08" title="Menubar" note="desktop file / edit / view · live">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem shortcut="⌘N">New</MenubarItem>
              <MenubarItem shortcut="⌘O">Open</MenubarItem>
              <MenubarSeparator />
              <MenubarItem shortcut="⌘S">Save</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem shortcut="⌘Z">Undo</MenubarItem>
              <MenubarItem shortcut="⇧⌘Z">Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Zoom in</MenubarItem>
              <MenubarItem>Zoom out</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>

      <Section num="09" title="Speed Dial" note="fanned-out actions · live">
        <div
          className="demo-panel"
          style={{ display: "grid", placeItems: "center", minHeight: 220 }}
        >
          <SpeedDial
            direction="up"
            actions={[
              {
                label: "Edit",
                icon: <Icon d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z" />,
                onClick: () => {},
              },
              {
                label: "Share",
                icon: <Icon d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />,
                onClick: () => {},
              },
              {
                label: "Delete",
                icon: <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </Section>

      <Section num="10" title="Drawer" note="edge panel · opens & closes">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="secondary">Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="left">
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20 }}>
              <DrawerTitle>Navigation</DrawerTitle>
              <DrawerDescription>Jump to a section of the workspace.</DrawerDescription>
              <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Link href="#">Overview</Link>
                <Link href="#">Analytics</Link>
                <Link href="#">Reports</Link>
                <Link href="#">Settings</Link>
              </nav>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm">
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </Section>
    </>
  );
}
