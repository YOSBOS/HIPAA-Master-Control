import type { Meta, StoryObj } from '@storybook/react';
import DashboardHeader from './DashboardHeader';

const meta: Meta<typeof DashboardHeader> = {
  title: 'Layout/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dashboard header component with application title, notifications, and user menu.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Header',
  parameters: {
    docs: {
      description: {
        story: 'Standard dashboard header with title, notification bell, and user menu.',
      },
    },
  },
};

export const WithNotifications: Story = {
  name: 'With Notification Badge',
  parameters: {
    docs: {
      description: {
        story: 'Header showing notification badge indicating unread notifications.',
      },
    },
  },
};

export const WithUserMenuOpen: Story = {
  name: 'With User Menu Open',
  parameters: {
    docs: {
      description: {
        story: 'Header with user menu dropdown open showing user options.',
      },
    },
  },
};
