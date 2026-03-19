import type { Meta, StoryObj } from '@storybook/react-vite';
import Code from './code';

import RawCode from './code?raw';
export type Story = StoryObj<typeof Code>;

export default {
  title: 'Demos/Particles',
  component: Code,
  tags: ['demo'],
  parameters: {
    docs: {
      description: {
        story: 'Living particle colony with breathing animations, speech bubbles, and dark/light theme',
      },
      source: {
        code: RawCode,
      },
    },
  },
} satisfies Meta<typeof Code>;

export const Default: Story = {};
