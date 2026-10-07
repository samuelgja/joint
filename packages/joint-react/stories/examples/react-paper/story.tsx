import type { Meta, StoryObj } from '@storybook/react-vite';
import { getAPILink } from '../../utils/get-api-documentation-link';
import Code from './code';
import codeRaw from './code?raw';

const meta = {
  title: 'Examples/React paper',
  component: Code,
  tags: ['example'],
  parameters: {
    showcase: {
      description:
        'A diagram rendered by React alone: no portals and no JointJS view layer. Drag the nodes; the links are routed by JointJS core from the models.',
      apiUrl: getAPILink('ReactPaper', 'Components'),
      code: codeRaw,
      canvasHeight: 440,
    },
  },
} satisfies Meta<typeof Code>;

export default meta;

export type Story = StoryObj<typeof Code>;

export const Default: Story = {};
