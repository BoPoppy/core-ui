import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AppBar,
  AppBarIcon,
  AppBarSpacer,
  AppBarTitle,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardMedia,
  CardText,
  CardTitle,
  Carousel,
  Paper,
} from "@bopoppy/core-ui";
import { Grp, Row, Section } from "../chrome/Section";

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Slide({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <div
      style={{
        height: 180,
        display: "grid",
        placeItems: "center",
        fontSize: 22,
        fontWeight: 700,
        color: "#fff",
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {label}
    </div>
  );
}

export function Surfaces() {
  return (
    <>
      <Section num="01" title="Cards" note="content · media · stats">
        <Row>
          <Card style={{ width: 264 }}>
            <CardBody>
              <CardTitle>Basic card</CardTitle>
              <CardText>
                A simple container for grouped content. Borders, radius and shadow all follow the
                active personality.
              </CardText>
            </CardBody>
            <CardFooter>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
              <Button size="sm">Open</Button>
            </CardFooter>
          </Card>

          <Card style={{ width: 264 }}>
            <CardMedia
              style={{
                height: 104,
                background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                color: "#fff",
              }}
            >
              image / preview
            </CardMedia>
            <CardBody>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
              >
                <CardTitle>Media card</CardTitle>
                <Badge variant="success" dot>
                  Live
                </Badge>
              </div>
              <CardText>Drop a thumbnail or cover above the body.</CardText>
            </CardBody>
            <CardFooter>
              <Button size="sm">View</Button>
            </CardFooter>
          </Card>

          <Card style={{ width: 264 }}>
            <CardBody>
              <CardText style={{ textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Monthly revenue
              </CardText>
              <CardTitle style={{ fontSize: 30 }}>$48.2k</CardTitle>
              <span style={{ fontSize: 13, color: "var(--success)", fontWeight: 600 }}>
                ▲ 12.4% vs last month
              </span>
            </CardBody>
          </Card>
        </Row>
      </Section>

      <Section num="02" title="Accordion" note="expand · collapse · single-open">
        <Accordion
          type="single"
          collapsible
          defaultValue="a"
          style={{ width: "100%", maxWidth: 480 }}
        >
          <AccordionItem value="a">
            <AccordionTrigger>What is Core UI?</AccordionTrigger>
            <AccordionContent>
              A token-driven component kit you can drop into any project. Every element re-skins
              from a small set of CSS variables, so theming is a matter of overriding a handful of
              values.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>How do the personalities work?</AccordionTrigger>
            <AccordionContent>
              Pebble, Slate and Pop each remap the same tokens — radius, borders, shadows and font —
              so the whole catalog shifts character without touching markup.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="c">
            <AccordionTrigger>Can I customize it further?</AccordionTrigger>
            <AccordionContent>
              Yes — use the Tweaks panel to change accent color, corner radius, density and font
              live, or override the variables directly in your own stylesheet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section num="03" title="App Bar" note="accent surface · actions">
        <AppBar style={{ width: "100%", maxWidth: 560 }}>
          <AppBarIcon aria-label="Open menu">
            <MenuIcon />
          </AppBarIcon>
          <AppBarTitle>Dashboard</AppBarTitle>
          <AppBarSpacer />
          <AppBarIcon aria-label="Search">
            <SearchIcon />
          </AppBarIcon>
          <AppBarIcon aria-label="Notifications">
            <BellIcon />
          </AppBarIcon>
        </AppBar>
      </Section>

      <Section num="04" title="Paper" note="elevation levels">
        <Grp label="elevation 0 → 3">
          <Row>
            {([0, 1, 2, 3] as const).map((e) => (
              <Paper
                key={e}
                elevation={e}
                style={{
                  width: 132,
                  height: 96,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 13,
                  color: "var(--text-muted)",
                }}
              >
                Elevation {e}
              </Paper>
            ))}
          </Row>
        </Grp>
      </Section>

      <Section num="05" title="Carousel" note="slides · arrows · dots · live">
        <Carousel style={{ width: "100%", maxWidth: 480 }}>
          <Slide label="Slide one" from="#6366f1" to="#8b5cf6" />
          <Slide label="Slide two" from="#0ea5e9" to="#22d3ee" />
          <Slide label="Slide three" from="#f59e0b" to="#ef4444" />
          <Slide label="Slide four" from="#10b981" to="#059669" />
        </Carousel>
      </Section>
    </>
  );
}
