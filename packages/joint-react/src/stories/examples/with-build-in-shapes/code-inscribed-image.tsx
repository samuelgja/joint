/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { PAPER_CLASSNAME } from 'storybook-config/theme';
import '../index.css';
import { createElements, Diagram } from '@joint/react';

const initialElements = createElements([
  {
    id: '1',
    x: 20,
    y: 25,
    width: 100,
    height: 100,
    type: 'standard.InscribedImage',
    attrs: {
      image: {
        xlinkHref: 'https://picsum.photos/100/100',
      },
    },
  },
]);

function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Diagram.View width="100%" className={PAPER_CLASSNAME} height={150} />
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
