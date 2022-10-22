import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import Table from "./Table";

export default {
  title: "Table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => (
  <div style={{ height: "95vh" }}>
    <Table {...args} />
  </div>
);

export const ColumnGrouping = Template.bind({});
ColumnGrouping.args = {
  columnGrouping: true,
  columns: [
    {
      headerName: "Name",
      children: [
        {
          id: "firstname",
          label: "First Name",
        },
        {
          id: "lastname",
          label: "Last Name",
        },
      ],
    },
    {
      headerName: "Name 2",
      children: [
        {
          id: "firstname 2",
          label: "First Name",
        },
        {
          id: "lastname 2",
          label: "Last Name",
        },
      ],
    },
  ],
};

export const Default = Template.bind({});
Default.args = {
  columnGrouping: false,
  columns: [
    {
      id: "firstname",
      label: "First Name",
    },
    {
      id: "lastname",
      label: "Last Name",
    },
  ],
};
