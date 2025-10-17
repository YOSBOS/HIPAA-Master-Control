import type { Meta, StoryObj } from '@storybook/react';
import RecentActivity from './RecentActivity';

const meta: Meta<typeof RecentActivity> = {
  title: 'Dashboard/RecentActivity',
  component: RecentActivity,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Recent activity component showing a timeline of recent HIPAA compliance activities, assessments, and incidents.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Recent Activity',
  parameters: {
    docs: {
      description: {
        story: 'Standard recent activity feed showing various compliance-related activities with timestamps and status indicators.',
      },
    },
  },
};

export const HighActivity: Story = {
  name: 'High Activity Period',
  parameters: {
    docs: {
      description: {
        story: 'Recent activity feed during a period of high compliance activity with multiple recent events.',
      },
    },
  },
};

export const WithIncidents: Story = {
  name: 'Activity with Incidents',
  parameters: {
    docs: {
      description: {
        story: 'Recent activity feed including security incidents and non-compliance events that require attention.',
      },
    },
  },
};
