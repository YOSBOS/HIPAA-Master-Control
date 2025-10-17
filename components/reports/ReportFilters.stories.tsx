import type { Meta, StoryObj } from '@storybook/react';
import ReportFilters from './ReportFilters';

const meta: Meta<typeof ReportFilters> = {
  title: 'Reports/ReportFilters',
  component: ReportFilters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Report filters component allowing users to filter compliance reports by type, date range, and generator.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Report Filters',
  parameters: {
    docs: {
      description: {
        story: 'Standard report filters with all filter options available and no active filters.',
      },
    },
  },
};

export const WithActiveFilters: Story = {
  name: 'With Active Filters',
  parameters: {
    docs: {
      description: {
        story: 'Report filters with some filters already applied to show the active state.',
      },
    },
  },
};

export const DateRangeFocused: Story = {
  name: 'Date Range Focused',
  parameters: {
    docs: {
      description: {
        story: 'Report filters with date range selector focused and showing recent time periods.',
      },
    },
  },
};
