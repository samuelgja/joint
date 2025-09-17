import { PAPER_CLASSNAME } from 'storybook-config/theme';
import '../index.css';
import { createElements, Diagram } from '@joint/react';

const initialElements = createElements([
  {
    id: '1',
    x: 20,
    y: 25,
    width: 100,
    height: 50,
    type: 'standard.BorderedImage',
    attrs: {
      label: {
        text: 'Bordered Image',
      },
      border: {
        rx: 5,
      },
      image: {
        xlinkHref: 'https://picsum.photos/100/50',
      },
    },
  },
]);

function Main() {
  return (
    // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Diagram.View width="100%" className={PAPER_CLASSNAME} height={100} />
    </div>
  );
}

export default function App() {
  return (
    <Diagram elements={initialElements}>
      <Main />
    </Diagram>
  );
}
