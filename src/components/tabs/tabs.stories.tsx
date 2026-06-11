import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = { title: "Navigation/Tabs", component: Tabs, tags: ["autodocs"] } satisfies Meta<
  typeof Tabs
>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">The overview panel.</TabsContent>
      <TabsContent value="activity">Recent activity here.</TabsContent>
      <TabsContent value="settings">Settings live here.</TabsContent>
    </Tabs>
  ),
};

export const Pill: Story = {
  render: () => (
    <Tabs defaultValue="day">
      <TabsList variant="pill">
        <TabsTrigger value="day">Day</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};
