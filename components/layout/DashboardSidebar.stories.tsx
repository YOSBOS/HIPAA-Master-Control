import type { Meta, StoryObj } from '@storybook/react';
import DashboardSidebar from './DashboardSidebar';

const meta: Meta<typeof DashboardSidebar> = {
  title: 'Layout/DashboardSidebar',
  component: DashboardSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dashboard sidebar navigation component providing access to main application sections and admin functions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Sidebar',
  parameters: {
    docs: {
      description: {
        story: 'Standard dashboard sidebar with navigation links to all main sections and admin functions.',
      },
    },
  },
};

export const WithActiveItem: Story = {
  name: 'With Active Navigation Item',
  parameters: {
    docs: {
      description: {
        story: 'Sidebar showing an active navigation item (simulated by setting the current pathname).',
      },
    },
  },
};

export const Collapsed: Story = {
  name: 'Collapsed Sidebar',
  parameters: {
    docs: {
      description: {
        story: 'Sidebar in collapsed state for smaller screens or when space is limited.',
      },
    },
  },
};
