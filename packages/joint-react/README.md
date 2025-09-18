<div style="display:flex;align-items:center;background:#131E29;padding:1.25rem 1rem;margin-bottom:1.25rem;">
  <img src="https://cdn.prod.website-files.com/63061d4ee85b5a18644f221c/633045c1d726c7116dcbe582_JJS_logo.svg" alt="JointJS Logo" height="40" style="margin-right:1rem;display:inline-block;" />
</div>

# @joint/react

**React-first diagramming.** Build flowcharts, workflows, network maps, mind maps — any graph‑based UI — with an idiomatic React API on top of JointJS. Type‑safe, customizable, and production‑ready.

---

## ✨ Highlights

- **API** — Components and hooks, no imperative glue required.
- **TypeScript by default** — Written in TypeScript with full type definitions
- **Custom rendering** — SVG or real HTML with an overlay.
- **Interactive** — Dragging, connecting, selection, events.
- **Composable** — Multiple views per diagram (e.g., canvas + minimap).

---

## 📦 Installation

### npm
```bash
npm install @joint/react
```

### yarn
```bash
yarn add @joint/react
```

### bun
```bash
bun add @joint/react
```

> Requires React 16.8+ and a modern browser (Chrome, Firefox, Safari, Edge).

---

## 🧭 Core Ideas

- **Elements (nodes)** and **links (edges)** are plain objects.
- Define **`id` explicitly** and mark it as a literal (`'foo' as const`) so TypeScript keeps it precise.
- The **`Diagram`** component provides the graph context; **`Diagram.View`** renders it.
- Use hooks like `useElements`, `useLinks`, `useGraph`, `usePaper` for reading/updating state.

---

## 🚀 Quick Start (TypeScript)

`id` must be present for every element and link.

```tsx
import React from 'react'
import { Diagram } from '@joint/react'

const elements = [
  { id: 'node1', label: 'Start', x: 100, y: 50, width: 120, height: 60 },
  { id: 'node2', label: 'End',   x: 100, y: 200, width: 120, height: 60 },
] as const

const links = [
  { id: 'link1', source: 'node1', target: 'node2' },
] as const

// Narrow element type straight from the array:
type Element = typeof elements[number]

export default function App() {
  return (
    <Diagram elements={elements} links={links}>
      <Diagram.View
        width="100%"
        height={360}
        useHTMLOverlay
        renderElement={(el: Element) => (
          <div style={{
            padding: 10,
            border: '2px solid #3498db',
            borderRadius: 8,
            background: '#fff'
          }}>
            {el.label}
          </div>
        )}
      />
    </Diagram>
  )
}
```

---

## 🧩 Idiomatic Patterns & Examples

### 1) Multiple views (canvas + minimap)
Share one diagram across views. Give each view a stable `id`.

```tsx
import React from 'react'
import { Diagram } from '@joint/react'

const elements = [
  { id: 'a' as const, label: 'A', x: 40,  y: 60,  width: 80, height: 40 },
  { id: 'b' as const, label: 'B', x: 260, y: 180, width: 80, height: 40 },
] as const

const links = [{ id: 'a-b' as const, source: 'a', target: 'b' }] as const

export function MultiView() {
  return (
    <Diagram elements={elements} links={links}>
      <Diagram.View id="main" width="100%" height={420} />
      <div style={{ position: 'absolute', right: 16, bottom: 16 }}>
        <Diagram.View id="mini" width={180} height={120} interactive={false} scale={0.25} />
      </div>
    </Diagram>
  )
}
```

### 2) SVG vs real HTML nodes
SVG with `<foreignObject>` keeps everything in one tree; `useHTMLOverlay` renders real HTML above the SVG for full CSS support.

```tsx
// ForeignObject (SVG)
<Diagram.View
  renderElement={({ width, height, label }) => (
    <foreignObject width={width} height={height}>
      <div style={{ display: 'grid', placeItems: 'center', height: '100%', background: '#eee' }}>
        {label}
      </div>
    </foreignObject>
  )}
/>

// HTML overlay (React portal outside SVG)
<Diagram.View
  useHTMLOverlay
  renderElement={({ label }) => (
    <div style={{ padding: 8, borderRadius: 8, background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,.15)' }}>
      {label}
    </div>
  )}
/>
```

### 3) Events & interactions
Subscribe to pointer events on elements/links.

```tsx
<Diagram.View
  onElementPointerClick={(el) => console.log('Clicked:', el.id)}
  onBlankPointerDown={() => console.log('Canvas mousedown')}
/>
```

### 4) Controlled updates (React state drives the graph)
Pass `elements/links` + `onElementsChange/onLinksChange` to keep React in charge.

```tsx
import React, { useState } from 'react'
import { Diagram } from '@joint/react'

const initialElements = [
  { id: 'n1' as const, label: 'Item', x: 60, y: 60, width: 100, height: 40 },
] as const

const initialLinks = [] as const

export function Controlled() {
  const [els, setEls] = useState([...initialElements])
  const [lns, setLns] = useState([...initialLinks])

  return (
    <Diagram
      elements={els}
      links={lns}
      onElementsChange={setEls}
      onLinksChange={setLns}
    >
      <Diagram.View height={320} />
    </Diagram>
  )
}
```

### 5) Imperative access (ref) for one‑off actions
Useful for `fitToContent`, scaling, exporting.

```tsx
import React, { useEffect, useRef } from 'react'
import type { ViewConfig } from '@joint/react'

export function FitOnMount() {
  const ref = useRef<ViewConfig | null>(null)
  useEffect(() => {
    ref.current?.paper.fitToContent({ padding: 20 })
  }, [])

  return (
    <Diagram elements={elements} links={links}>
      <Diagram.View ref={ref} />
    </Diagram>
  )
}
```

---

## 🧠 Best Practices

- **Define ids as literals**: `id: 'node1' as const` — enables exact typing and prevents mismatches.
- **Type elements from data**: `type Element = typeof elements[number]` — reuse data as your source of truth.
- **Memoize renderers & handlers**: `useCallback` to minimize re-renders.
- **Keep overlay HTML lightweight**: Prefer simple layout; avoid heavy transforms/animations in `<foreignObject>` (Safari can be picky).
- **Give each view a stable `id`** when rendering multiple `Diagram.View` instances.
- **Prefer declarative first**: Reach for hooks/props; use imperative APIs (refs/graph methods) for targeted operations only.
- **Test in Safari early** when using `<foreignObject>`; fall back to `useHTMLOverlay` if needed.

---

## ⚙️ API Surface (at a glance)

- **Components**
  - `Diagram` — provides the shared graph
  - `Diagram.View` — renders the graph (Paper)

- **Hooks**
  - `useElements()` / `useLinks()` — subscribe to data
  - `useGraph()` — low-level graph access
  - `usePaper()` — access the underlying Paper (from within a view)

- **Controlled mode props**
  - `elements`, `links`, `onElementsChange`, `onLinksChange`

> Tip: You can pass an existing JointJS `dia.Graph` into `Diagram` if you need to integrate with external data lifecycles.

---

## 🐞 Notes & caveats

- **`<foreignObject>` CSS** — Avoid `position` (non‑static), `transform`, `transition`, and certain `-webkit-*` properties inside SVG foreign objects; some browsers (esp. Safari) may flicker or misrender. Consider `useHTMLOverlay` for complex HTML.
- **Performance** — Favor memoized renderers, avoid heavy component trees inside `renderElement`.
- **Flicker** — Rapid port/size changes can cause transient flickers while elements measure; we’re improving defaults.

---

## 🔗 Further reading

- API Reference & Guides: https://react.jointjs.com/api/index.html  
- Storybook & Examples: https://react.jointjs.com/learn/?path=/docs/introduction--docs

---

## 📝 License

MIT
