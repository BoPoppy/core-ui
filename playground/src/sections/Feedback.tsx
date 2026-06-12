import {
  Alert,
  Banner,
  Button,
  CircularProgress,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  EmptyState,
  Progress,
  Skeleton,
  Spinner,
  useToast,
} from "@bopoppy/core-ui";
import { useState } from "react";
import { Grp, Row, Section } from "../chrome/Section";

function InboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.5 5.5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.5A2 2 0 0 0 16.8 4H7.2a2 2 0 0 0-1.7 1.5z" />
    </svg>
  );
}

function MegaphoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 11l18-5v12L3 13v-2z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  );
}

/** Fires toasts via `useToast()` — must live under the app-root ToastProvider. */
function ToastDemo() {
  const { toast } = useToast();
  return (
    <Row>
      <Button onClick={() => toast({ title: "Saved", description: "Your changes are live." })}>
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({ variant: "success", title: "Uploaded", description: "3 files added." })
        }
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          toast({
            variant: "danger",
            title: "Failed",
            description: "Could not connect.",
            action: { label: "Retry", onClick: () => {} },
          })
        }
      >
        With action
      </Button>
    </Row>
  );
}

/** A controlled confirmation dialog that actually opens and closes. */
function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open live dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogBody>
          <DialogTitle>Delete project?</DialogTitle>
          <DialogDescription>
            This permanently removes “Marketing Site” and all of its files. This action cannot be
            undone.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="danger">Delete</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Feedback() {
  return (
    <>
      <Section num="01" title="Alert" note="info · success · warn · danger">
        <Grp label="variants · with dismiss">
          <div className="col" style={{ gap: 12, maxWidth: 560 }}>
            <Alert variant="info" title="Heads up" onClose={() => {}}>
              A new version is available. Refresh to get the latest.
            </Alert>
            <Alert variant="success" title="Saved" onClose={() => {}}>
              Your changes have been published successfully.
            </Alert>
            <Alert variant="warn" title="Approaching limit" onClose={() => {}}>
              You&apos;ve used 90% of your monthly quota.
            </Alert>
            <Alert variant="danger" title="Payment failed" onClose={() => {}}>
              We couldn&apos;t charge your card. Update your billing details.
            </Alert>
          </div>
        </Grp>
        <Grp label="title-only · no close">
          <div className="col" style={{ gap: 12, maxWidth: 560 }}>
            <Alert variant="info" title="Maintenance scheduled for Sunday at 02:00 UTC." />
          </div>
        </Grp>
      </Section>

      <Section num="02" title="Banner" note="page-level message bar">
        <Grp label="solid · subtle">
          <div className="col" style={{ gap: 12, maxWidth: 620 }}>
            <Banner
              variant="solid"
              icon={<MegaphoneIcon />}
              description="Upgrade before Friday to keep your team's seats."
              action={
                <Button variant="secondary" size="sm">
                  Upgrade
                </Button>
              }
              onClose={() => {}}
            >
              Your trial ends in 3 days
            </Banner>
            <Banner
              variant="subtle"
              description="We've refreshed the dashboard layout."
              onClose={() => {}}
            >
              New look, same data
            </Banner>
          </div>
        </Grp>
      </Section>

      <Section num="03" title="Progress" note="determinate · indeterminate">
        <Grp label="linear bar">
          <div className="col" style={{ gap: 16, maxWidth: 360 }}>
            <Progress value={65} />
            <Progress />
          </div>
        </Grp>
        <Grp label="circular ring · spinner">
          <Row>
            <CircularProgress value={65} showLabel />
            <CircularProgress value={30} />
            <Spinner />
          </Row>
        </Grp>
      </Section>

      <Section num="04" title="Skeleton" note="block · text · circle">
        <Grp label="shimmering placeholders">
          <div className="demo-panel" style={{ maxWidth: 420 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Skeleton variant="circle" className="size-12" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <Skeleton variant="text" className="w-1/2" />
                <Skeleton variant="text" className="w-3/4" />
              </div>
            </div>
            <Skeleton variant="block" className="mt-4 h-32 w-full" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-5/6" />
            </div>
          </div>
        </Grp>
      </Section>

      <Section num="05" title="Toast" note="fired imperatively via useToast()">
        <Grp label="click to fire — appears bottom-right">
          <ToastDemo />
        </Grp>
      </Section>

      <Section num="06" title="Empty State" note="centered placeholder + cta">
        <Grp label="no content yet">
          <div className="demo-panel" style={{ maxWidth: 520 }}>
            <EmptyState
              icon={<InboxIcon />}
              title="No messages yet"
              description="When you receive messages, they'll show up here."
              action={<Button>Compose</Button>}
            />
          </div>
        </Grp>
      </Section>

      <Section num="07" title="Modal & Dialog" note="focus-trapping confirmation">
        <Grp label="working open / close">
          <DialogDemo />
        </Grp>
      </Section>
    </>
  );
}
