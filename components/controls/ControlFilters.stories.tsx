import type { Meta, StoryObj } from '@storybook/react';
import ControlFilters from './ControlFilters';

const meta: Meta<typeof ControlFilters> = {
  title: 'Controls/ControlFilters',
  component: ControlFilters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Control filters component allowing users to filter HIPAA controls by status, category, priority, and search terms.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Filters',
  parameters: {
    docs: {
      description: {
        story: 'Standard control filters with all filter options available and no active filters.',
      },
    },
  },
};

export const WithActiveFilters: Story = {
  name: 'With Active Filters',
  parameters: {
    docs: {
      description: {
        story: 'Control filters with some filters already applied to show the active state.',
      },
    },
  },
};

export const SearchFocused: Story = {
  name: 'Search Focused',
  parameters: {
    docs: {
      description: {
        story: 'Control filters with search input focused and populated with search terms.',
      },
    },
  },
};
