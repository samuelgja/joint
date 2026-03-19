/* eslint-disable sonarjs/no-nested-conditional */
/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import {
  GraphProvider,
  Paper,
  useGraph,
  useMarkup,
  useMeasureNode,
  type FlatElementData,
  type FlatLinkData,
  type RenderElement,
} from '@joint/react';
import { useIsElementDragging } from '../../../hooks';
import type { dia } from '@joint/core';
import { animate } from 'motion';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// ── Theme ───────────────────────────────────────────────────────────────────

const ThemeContext = createContext(false);

const DARK = {
  canvas: '#0a0e14',
  cell: '#111820',
  cellBorder: 'rgba(56,227,200,0.12)',
  cellGlow: 'rgba(56,227,200,0.06)',
  text: '#c4dde8',
  sub: 'rgba(196,221,232,0.4)',
  primary: '#38e3c8',
  primarySoft: 'rgba(56,227,200,0.08)',
  secondary: '#e87eac',
  secondarySoft: 'rgba(232,126,172,0.08)',
  tertiary: '#7eb8e8',
  tertiarySoft: 'rgba(126,184,232,0.08)',
  link: 'rgba(56,227,200,0.25)',
  port: '#38e3c8',
  portFill: '#0a0e14',
  toolbar: '#111820',
  toolbarBorder: 'rgba(56,227,200,0.1)',
  toolbarText: 'rgba(196,221,232,0.5)',
  toolbarHover: 'rgba(56,227,200,0.06)',
  bubble: '#111820',
  bubbleBorder: 'rgba(56,227,200,0.15)',
  bubbleText: 'rgba(196,221,232,0.7)',
} as const;

const LIGHT = {
  canvas: '#f5f0e8',
  cell: '#fffdf8',
  cellBorder: 'rgba(180,120,60,0.12)',
  cellGlow: 'rgba(180,120,60,0.04)',
  text: '#3d2e1e',
  sub: 'rgba(61,46,30,0.45)',
  primary: '#d4844a',
  primarySoft: 'rgba(212,132,74,0.1)',
  secondary: '#c45c7a',
  secondarySoft: 'rgba(196,92,122,0.1)',
  tertiary: '#5c8ab4',
  tertiarySoft: 'rgba(92,138,180,0.1)',
  link: 'rgba(180,120,60,0.2)',
  port: '#d4844a',
  portFill: '#fffdf8',
  toolbar: '#fffdf8',
  toolbarBorder: 'rgba(180,120,60,0.12)',
  toolbarText: 'rgba(61,46,30,0.45)',
  toolbarHover: 'rgba(180,120,60,0.06)',
  bubble: '#fffdf8',
  bubbleBorder: 'rgba(180,120,60,0.15)',
  bubbleText: 'rgba(61,46,30,0.6)',
} as const;

type Theme = typeof DARK | typeof LIGHT;

function useTheme(): Theme {
  const isDark = useContext(ThemeContext);
  return isDark ? DARK : LIGHT;
}

// ── Keyframes (injected once) ───────────────────────────────────────────────

const STYLE_ID = 'particles-keyframes';

function ensureKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.querySelector(`#${STYLE_ID}`)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes bubble-cycle {
      0% { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.92); }
      12% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      80% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-3px) scale(0.96); }
    }
    @keyframes pulse-ring {
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes link-flow {
      to { stroke-dashoffset: -24; }
    }
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `;
  document.head.append(style);
}

// ── Data ────────────────────────────────────────────────────────────────────

const WHISPERS = [
  'you belong here',
  'keep going',
  'you are enough',
  'breathe deeply',
  'stay curious',
  'be gentle',
  'trust yourself',
  'you matter',
  'take your time',
  'shine bright',
  'embrace change',
  'find your rhythm',
  'let it flow',
  'dream bigger',
  'stay present',
  'radiate warmth',
  'be fearless',
  'grow slowly',
  'seek wonder',
  'feel alive',
];

const SPECIES = [
  { name: 'Lumina', emoji: '✦', color: 'primary' as const },
  { name: 'Coralia', emoji: '◈', color: 'secondary' as const }, // cspell:disable-line
  { name: 'Nebula', emoji: '◉', color: 'tertiary' as const },
  { name: 'Aura', emoji: '❋', color: 'primary' as const },
  { name: 'Flora', emoji: '✿', color: 'secondary' as const },
  { name: 'Celeste', emoji: '✧', color: 'tertiary' as const },
];

type ParticleNode = FlatElementData & {
  readonly name: string;
  readonly emoji: string;
  readonly colorKey: 'primary' | 'secondary' | 'tertiary';
  readonly whisper: string;
  readonly size: number;
  readonly breatheDuration: number;
  readonly bubbleDuration: number;
};

const PORT_R = 4;
const BUBBLE_SPACE = 26;
const LABEL_SPACE = 30;

function createParticle(
  x: number,
  y: number,
  speciesIndex: number,
  whisperIndex: number,
  theme: Theme
): ParticleNode {
  const species = SPECIES[speciesIndex % SPECIES.length];
  const size = 56 + Math.floor(Math.random() * 24); // eslint-disable-line sonarjs/pseudo-random
  const breatheDuration = 3 + Math.random() * 2; // eslint-disable-line sonarjs/pseudo-random
  const bubbleDuration = 6 + Math.random() * 6; // eslint-disable-line sonarjs/pseudo-random

  return {
    name: species.name,
    emoji: species.emoji,
    colorKey: species.color,
    whisper: WHISPERS[whisperIndex % WHISPERS.length],
    size,
    breatheDuration,
    bubbleDuration,
    x,
    y,
    ports: {
      out: {
        cx: 'calc(0.5 * w)',
        cy: `calc(h - ${LABEL_SPACE})`,
        width: PORT_R * 2,
        height: PORT_R * 2,
        color: theme.port,
        stroke: theme.canvas,
        strokeWidth: 2,
      },
      in: {
        cx: 'calc(0.5 * w)',
        cy: BUBBLE_SPACE,
        width: PORT_R * 2,
        height: PORT_R * 2,
        color: theme.port,
        stroke: theme.canvas,
        strokeWidth: 2,
        passive: true,
      },
    },
  };
}

function buildInitialElements(theme: Theme): Record<string, ParticleNode> {
  return {
    p1: createParticle(120, 60, 0, 0, theme),
    p2: createParticle(340, 30, 1, 3, theme),
    p3: createParticle(540, 80, 2, 6, theme),
    p4: createParticle(50, 240, 3, 9, theme),
    p5: createParticle(260, 200, 4, 12, theme),
    p6: createParticle(470, 260, 5, 15, theme),
    p7: createParticle(160, 380, 0, 1, theme),
    p8: createParticle(380, 400, 2, 7, theme),
    p9: createParticle(680, 180, 3, 2, theme),
    p10: createParticle(600, 380, 1, 5, theme),
    p11: createParticle(80, 460, 4, 8, theme),
    p12: createParticle(440, 120, 5, 11, theme),
  };
}

function buildInitialLinks(theme: Theme): Record<string, FlatLinkData> {
  const bond = (source: string, target: string): FlatLinkData => ({
    source,
    sourcePort: 'out',
    target,
    targetPort: 'in',
    color: theme.link,
    width: 1.5,
    pattern: '8,16',
    connector: {
      name: 'curve',
      args: { direction: 'auto', distanceCoefficient: 0.6, tension: 0.5 },
    },
    targetMarker: 'none',
  });

  return {
    'p1-p2': bond('p1', 'p2'),
    'p2-p3': bond('p2', 'p3'),
    'p1-p4': bond('p1', 'p4'),
    'p4-p5': bond('p4', 'p5'),
    'p5-p6': bond('p5', 'p6'),
    'p3-p6': bond('p3', 'p6'),
    'p5-p7': bond('p5', 'p7'),
    'p6-p8': bond('p6', 'p8'),
    'p7-p8': bond('p7', 'p8'),
    'p3-p9': bond('p3', 'p9'),
    'p9-p10': bond('p9', 'p10'),
    'p6-p10': bond('p6', 'p10'),
    'p7-p11': bond('p7', 'p11'),
    'p2-p12': bond('p2', 'p12'),
    'p12-p6': bond('p12', 'p6'),
  };
}

// ── Motion helpers ──────────────────────────────────────────────────────────

function useSpawnAnimation(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Gentle fade in — already mostly visible, just a subtle settle
    animate(
      element,
      { opacity: [0.6, 1], scale: [0.92, 1] },
      { type: 'spring', stiffness: 120, damping: 20, mass: 1 }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function useBreatheAnimation(ref: React.RefObject<HTMLDivElement | null>, duration: number) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const controller = animate(
      element,
      { scale: [1, 1.04, 1] },
      { duration, ease: [0.45, 0, 0.55, 1], repeat: Infinity }
    );

    return () => controller.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function useFloatAnimation(ref: React.RefObject<HTMLSpanElement | null>, duration: number) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const controller = animate(
      element,
      { y: [0, -3, 0] },
      { duration: duration * 1.3, ease: [0.45, 0, 0.55, 1], repeat: Infinity }
    );

    return () => controller.stop();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

function useDragSpring(ref: React.RefObject<HTMLDivElement | null>, isDragging: boolean) {
  const wasDraggingRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (isDragging && !wasDraggingRef.current) {
      animate(element, { scale: 1.08 }, { type: 'spring', stiffness: 400, damping: 15 });
    } else if (!isDragging && wasDraggingRef.current) {
      animate(element, { scale: 1 }, { type: 'spring', stiffness: 300, damping: 20 });
    }

    wasDraggingRef.current = isDragging;
  }, [isDragging]); // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Particle Component ──────────────────────────────────────────────────────

function RenderParticle({
  name,
  emoji,
  colorKey,
  whisper,
  size,
  breatheDuration,
  bubbleDuration,
}: Readonly<ParticleNode>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLSpanElement>(null);
  const { width, height } = useMeasureNode(contentRef);
  const theme = useTheme();
  const { selectorRef } = useMarkup();
  const isDragging = useIsElementDragging();
  const isDark = theme === DARK;

  const accentColor = theme[colorKey];
  const softColor = theme[`${colorKey}Soft` as keyof Theme] as string;

  // Motion animations
  useSpawnAnimation(contentRef);
  useBreatheAnimation(bodyRef, breatheDuration);
  useFloatAnimation(emojiRef, breatheDuration);
  useDragSpring(bodyRef, isDragging);

  return (
    <>
      <foreignObject width={width} height={height} overflow="visible">
        <div
          ref={contentRef}
          style={{
            width: size + 40,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 36,
            paddingBottom: 12,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {/* Speech bubble */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              padding: '3px 10px',
              borderRadius: 12,
              backgroundColor: theme.bubble,
              border: `1px solid ${theme.bubbleBorder}`,
              color: theme.bubbleText,
              fontSize: 10,
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontStyle: 'italic',
              letterSpacing: '0.02em',
              pointerEvents: 'none' as const,
              animation: `bubble-cycle ${bubbleDuration}s cubic-bezier(0.25, 1, 0.5, 1) infinite`,
              boxShadow: `0 2px 12px ${theme.cellGlow}`,
            }}
          >
            {whisper}
          </div>

          {/* Organism body */}
          <div
            ref={bodyRef}
            style={{
              position: 'relative',
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: softColor,
              border: `1.5px solid ${isDragging ? accentColor : theme.cellBorder}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDragging
                ? `0 0 0 1px ${accentColor}, 0 0 30px ${softColor}, 0 12px 40px rgba(0,0,0,${isDark ? 0.5 : 0.12})`
                : `0 4px 20px ${theme.cellGlow}, 0 0 40px ${softColor}`,
              transition:
                'box-shadow 200ms cubic-bezier(0.25, 1, 0.5, 1), border-color 200ms cubic-bezier(0.25, 1, 0.5, 1)',
              willChange: 'transform',
            }}
          >
            {/* Pulse ring on drag */}
            {isDragging && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: size,
                  height: size,
                  borderRadius: '50%',
                  border: `1px solid ${accentColor}`,
                  opacity: 0,
                  animation: 'pulse-ring 3s cubic-bezier(0.25, 1, 0.5, 1) infinite',
                  pointerEvents: 'none' as const,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}

            {/* Inner glow */}
            <div
              style={{
                position: 'absolute',
                inset: 4,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${accentColor}22, transparent 70%)`,
                pointerEvents: 'none',
              }}
            />

            {/* Emoji */}
            <span
              ref={emojiRef}
              style={{
                fontSize: size * 0.36,
                lineHeight: 1,
                color: accentColor,
                filter: isDragging ? `drop-shadow(0 0 8px ${accentColor})` : 'none',
                transition: 'filter 200ms cubic-bezier(0.25, 1, 0.5, 1)',
                userSelect: 'none',
                willChange: 'transform',
              }}
            >
              {emoji}
            </span>
          </div>

          {/* Name label */}
          <span
            style={{
              marginTop: 8,
              fontSize: 10,
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              color: theme.sub,
              textAlign: 'center' as const,
              userSelect: 'none',
            }}
          >
            {name}
          </span>
        </div>
      </foreignObject>

      {/* Output port — bottom of organism circle */}
      <circle
        ref={selectorRef('out')}
        magnet="active"
        cursor="crosshair"
        cx={width / 2}
        cy={height - LABEL_SPACE}
        r={PORT_R}
        fill={theme.port}
        stroke={theme.cell}
        strokeWidth={2}
        opacity={0.6}
      />
      {/* Input port — top of organism circle */}
      <circle
        ref={selectorRef('in')}
        magnet="passive"
        cx={width / 2}
        cy={BUBBLE_SPACE}
        r={PORT_R}
        fill={theme.portFill}
        stroke={theme.port}
        strokeWidth={2}
        opacity={0.6}
      />
    </>
  );
}

// ── Toolbar ─────────────────────────────────────────────────────────────────

function ToolbarButton({
  children,
  accent,
  onClick,
}: Readonly<{ children: React.ReactNode; accent?: boolean; onClick?: () => void }>) {
  const theme = useTheme();
  const isDark = theme === DARK;
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors duration-150 cursor-pointer border-0"
      style={
        accent
          ? {
              backgroundColor: theme.primary,
              color: isDark ? '#0a0e14' : '#ffffff',
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }
          : {
              color: theme.toolbarText,
              backgroundColor: 'transparent',
              fontFamily: '"DM Sans", system-ui, sans-serif',
            }
      }
      onMouseEnter={(event) => {
        if (!accent) event.currentTarget.style.backgroundColor = theme.toolbarHover;
      }}
      onMouseLeave={(event) => {
        if (!accent) event.currentTarget.style.backgroundColor = 'transparent';
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Toolbar({ paperRef }: Readonly<{ paperRef: React.RefObject<dia.Paper | null> }>) {
  const theme = useTheme();
  const { setElement } = useGraph();

  const spawnParticle = useCallback(() => {
    const id = `spawn-${Date.now()}`;
    const speciesIndex = Math.floor(Math.random() * SPECIES.length); // eslint-disable-line sonarjs/pseudo-random
    const whisperIndex = Math.floor(Math.random() * WHISPERS.length); // eslint-disable-line sonarjs/pseudo-random
    const particle = createParticle(
      100 + Math.random() * 400, // eslint-disable-line sonarjs/pseudo-random
      100 + Math.random() * 350, // eslint-disable-line sonarjs/pseudo-random
      speciesIndex,
      whisperIndex,
      theme
    );
    setElement(id, particle);
  }, [setElement, theme]);

  const onFit = useCallback(() => {
    paperRef.current?.transformToFitContent({
      padding: { top: 50, bottom: 80, left: 50, right: 50 },
      useModelGeometry: true,
      verticalAlign: 'middle',
      horizontalAlign: 'middle',
    });
  }, [paperRef]);

  const onZoomIn = useCallback(() => {
    const paper = paperRef.current;
    if (!paper) return;
    const { sx } = paper.scale();
    paper.scale(sx * 1.2, sx * 1.2);
  }, [paperRef]);

  const onZoomOut = useCallback(() => {
    const paper = paperRef.current;
    if (!paper) return;
    const { sx } = paper.scale();
    paper.scale(sx / 1.2, sx / 1.2);
  }, [paperRef]);

  return (
    <div
      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-2 rounded-2xl"
      style={{
        backgroundColor: theme.toolbar,
        border: `1px solid ${theme.toolbarBorder}`,
        boxShadow: `0 8px 32px rgba(0,0,0,${theme === DARK ? 0.5 : 0.1})`,
      }}
    >
      <ToolbarButton accent onClick={spawnParticle}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Spawn
      </ToolbarButton>

      <div style={{ width: 1, height: 20, backgroundColor: theme.toolbarBorder }} />

      <ToolbarButton onClick={onFit}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
        Fit
      </ToolbarButton>

      <div style={{ width: 1, height: 20, backgroundColor: theme.toolbarBorder }} />

      <ToolbarButton onClick={onZoomIn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </ToolbarButton>

      <ToolbarButton onClick={onZoomOut}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </ToolbarButton>
    </div>
  );
}

// ── Force field — drag repulsion ─────────────────────────────────────────────

const REPULSION_RADIUS = 120;
const REPULSION_STRENGTH = 12;
const SPRING_DURATION = 600;

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function ForceField({ paperRef }: Readonly<{ paperRef: React.RefObject<dia.Paper | null> }>) {
  const { graph } = useGraph();
  const restPositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    const saveRest = () => {
      for (const element of graph.getElements()) {
        if (!restPositionsRef.current.has(element.id as string)) {
          const pos = element.position();
          restPositionsRef.current.set(element.id as string, { x: pos.x, y: pos.y });
        }
      }
    };
    saveRest();
    graph.on('add', saveRest);

    // Stop any running transitions when drag starts so they don't fight
    const onDragStart = (cellView: dia.CellView) => {
      if (cellView.model.isElement()) {
        (cellView.model as dia.Element).stopTransitions('position');
      }
    };

    const onDragMove = (cellView: dia.CellView) => {
      const draggedModel = cellView.model;
      if (!draggedModel.isElement()) return;
      const dragPos = (draggedModel as dia.Element).position();

      // Update rest position for the dragged element
      restPositionsRef.current.set(draggedModel.id as string, { x: dragPos.x, y: dragPos.y });

      for (const other of graph.getElements()) {
        if (other.id === draggedModel.id) continue;

        const otherPos = other.position();
        const dx = otherPos.x - dragPos.x;
        const dy = otherPos.y - dragPos.y;
        const distance = Math.hypot(dx, dy);

        if (distance < REPULSION_RADIUS && distance > 0.5) {
          const force = (1 - distance / REPULSION_RADIUS) * REPULSION_STRENGTH;
          const nx = dx / distance;
          const ny = dy / distance;

          // Push immediately during drag — responsive, no transition overlap
          other.position(otherPos.x + nx * force * 0.3, otherPos.y + ny * force * 0.3);
        }
      }
    };

    // On release: spring displaced elements back to rest positions
    const onDragEnd = (cellView: dia.CellView) => {
      const draggedModel = cellView.model;

      if (draggedModel.isElement()) {
        const pos = (draggedModel as dia.Element).position();
        restPositionsRef.current.set(draggedModel.id as string, { x: pos.x, y: pos.y });
      }

      for (const other of graph.getElements()) {
        if (other.id === draggedModel.id) continue;

        const rest = restPositionsRef.current.get(other.id as string);
        if (!rest) continue;

        const currentPos = other.position();
        if (Math.abs(currentPos.x - rest.x) < 2 && Math.abs(currentPos.y - rest.y) < 2) continue;

        // Smooth spring back via JointJS transition
        other.transition('position/x', rest.x, {
          duration: SPRING_DURATION,
          timingFunction: easeOutQuart,
        });
        other.transition('position/y', rest.y, {
          duration: SPRING_DURATION,
          timingFunction: easeOutQuart,
        });
      }
    };

    const paper = paperRef.current;
    if (!paper) return;

    paper.on('element:pointerdown', onDragStart);
    paper.on('element:pointermove', onDragMove);
    paper.on('element:pointerup', onDragEnd);

    return () => {
      graph.off('add', saveRest);
      paper.off('element:pointerdown', onDragStart);
      paper.off('element:pointermove', onDragMove);
      paper.off('element:pointerup', onDragEnd);
    };
  }, [graph, paperRef]);

  return null;
}

// ── Animated links — flowing energy ─────────────────────────────────────────

function AnimatedLinks({ paperRef }: Readonly<{ paperRef: React.RefObject<dia.Paper | null> }>) {
  const { graph } = useGraph();

  useEffect(() => {
    const paper = paperRef.current;
    if (!paper) return;

    // Track which link IDs should be fast (connected to dragged element)
    const fastLinkIds = new Set<string>();

    const SPEED_NORMAL = '1.2s';
    const SPEED_FAST = '0.4s';
    // Track current speed per element to avoid re-setting (which restarts animation)
    const currentSpeedMap = new WeakMap<SVGElement, string>();

    const applyAnimations = () => {
      const lines = paper.el.querySelectorAll('[joint-selector="line"]');
      for (const line of lines) {
        const svgLine = line as SVGElement;
        const linkGroup = svgLine.closest('[model-id]');
        const modelId = linkGroup?.getAttribute('model-id') ?? '';
        const targetSpeed = fastLinkIds.has(modelId) ? SPEED_FAST : SPEED_NORMAL;

        // Only set animation if speed changed or not yet applied
        if (currentSpeedMap.get(svgLine) !== targetSpeed) {
          svgLine.style.animation = `link-flow ${targetSpeed} linear infinite`;
          currentSpeedMap.set(svgLine, targetSpeed);
        }
      }
    };

    const onDragMove = (cellView: dia.CellView) => {
      const { model } = cellView;
      if (!model.isElement()) return;

      const previousSize = fastLinkIds.size;
      fastLinkIds.clear();
      const connectedLinks = graph.getConnectedLinks(model as dia.Element);
      for (const link of connectedLinks) {
        fastLinkIds.add(link.id as string);
      }
      // Only reapply if the set of fast links changed
      if (fastLinkIds.size !== previousSize || previousSize === 0) {
        // Clear speed cache for connected links so they get updated
        for (const link of connectedLinks) {
          const linkView = paper.findViewByModel(link);
          if (!linkView) continue;
          const line = linkView.el.querySelector('[joint-selector="line"]') as SVGElement | null;
          if (line) currentSpeedMap.delete(line);
        }
        applyAnimations();
      }
    };

    const onDragEnd = () => {
      // Clear speed cache for all fast links before resetting
      const lines = paper.el.querySelectorAll('[joint-selector="line"]');
      for (const line of lines) {
        currentSpeedMap.delete(line as SVGElement);
      }
      fastLinkIds.clear();
      applyAnimations();
    };

    const timeout = setTimeout(applyAnimations, 500);
    const observer = new MutationObserver(applyAnimations);
    observer.observe(paper.el, { childList: true, subtree: true });

    paper.on('element:pointermove', onDragMove);
    paper.on('element:pointerup', onDragEnd);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      paper.off('element:pointermove', onDragMove);
      paper.off('element:pointerup', onDragEnd);
    };
  }, [graph, paperRef]);

  return null;
}

// ── Colony indicator ────────────────────────────────────────────────────────

function ColonyIndicator() {
  const theme = useTheme();
  const isDark = theme === DARK;
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dotRef.current;
    if (!element) return;
    const controller = animate(
      element,
      { scale: [1, 1.4, 1], opacity: [1, 0.7, 1] },
      { duration: 2, ease: [0.45, 0, 0.55, 1], repeat: Infinity }
    );
    return () => controller.stop();
  }, []);

  return (
    <div
      className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full"
      style={{
        backgroundColor: theme.toolbar,
        border: `1px solid ${theme.toolbarBorder}`,
        fontFamily: '"DM Sans", system-ui, sans-serif',
        boxShadow: `0 4px 16px rgba(0,0,0,${isDark ? 0.3 : 0.06})`,
      }}
    >
      <div
        ref={dotRef}
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: theme.primary,
          boxShadow: `0 0 8px ${theme.primary}`,
        }}
      />
      <span style={{ fontSize: 11, fontWeight: 600, color: theme.text, letterSpacing: '0.04em' }}>
        Colony
      </span>
      <span style={{ fontSize: 10, color: theme.sub, letterSpacing: '0.02em' }}>
        living organisms
      </span>
    </div>
  );
}

// ── Main ────────────────────────────────────────────────────────────────────

const PAPER_ID = 'particles-paper';

function Main() {
  const isDark = useContext(ThemeContext);
  const theme = isDark ? DARK : LIGHT;
  const paperRef = useRef<dia.Paper | null>(null);

  useEffect(() => {
    ensureKeyframes();
  }, []);

  const themedElements = buildInitialElements(theme);
  const themedLinks = buildInitialLinks(theme);

  return (
    <GraphProvider elements={themedElements} links={themedLinks}>
      <Paper
        ref={paperRef}
        id={PAPER_ID}
        height="100%"
        width="100%"
        gridSize={5}
        overflow
        linkPinning={false}
        snapLinks={{ radius: 30 }}
        magnetThreshold="onleave" // cspell:disable-line
        clickThreshold={10}
        defaultRouter={{ name: 'normal' }}
        defaultConnector={{
          name: 'curve',
          args: { direction: 'auto', distanceCoefficient: 0.6, tension: 0.5 },
        }}
        defaultConnectionPoint={{ name: 'boundary', args: { offset: 6, extrapolate: true } }}
        defaultLink={{ color: theme.link, width: 1.5, targetMarker: 'none' }}
        validateMagnet={(_cellView, magnet) => magnet.getAttribute('magnet') !== 'passive'}
        validateConnection={(cellViewS, _magnetS, cellViewT, magnetT) => {
          if (cellViewS === cellViewT) return false;
          return magnetT?.getAttribute('magnet') === 'passive';
        }}
        interactive={(cellView) => (cellView.model.isLink() ? false : { linkMove: false })}
        renderElement={RenderParticle as unknown as RenderElement}
      />
      <ForceField paperRef={paperRef} />
      <AnimatedLinks paperRef={paperRef} />
      <ColonyIndicator />
      <Toolbar paperRef={paperRef} />
    </GraphProvider>
  );
}

// ── Theme Switch ────────────────────────────────────────────────────────────

function ThemeSwitch({ isDark, onClick }: Readonly<{ isDark: boolean; onClick: () => void }>) {
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = knobRef.current;
    if (!element) return;
    animate(element, { x: isDark ? 30 : 3 }, { type: 'spring', stiffness: 500, damping: 30 });
  }, [isDark]);

  return (
    <button
      onClick={onClick}
      title="Toggle theme"
      className="absolute top-5 right-5 z-10 w-[56px] h-[28px] rounded-full cursor-pointer border-0 transition-colors duration-300"
      style={{ backgroundColor: isDark ? 'rgba(56,227,200,0.1)' : 'rgba(180,120,60,0.1)' }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke={isDark ? '#38e3c8' : '#d4844a'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-[7px] left-[7px]"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={isDark ? 'rgba(56,227,200,0.3)' : '#3d2e1e'}
        className="absolute top-[7px] right-[7px]"
      >
        <path d="M12.0557 3.59974C12.2752 3.2813 12.2913 2.86484 12.0972 2.53033C11.9031 2.19582 11.5335 2.00324 11.1481 2.03579C6.02351 2.46868 2 6.76392 2 12C2 17.5228 6.47715 22 12 22C17.236 22 21.5313 17.9764 21.9642 12.8518C21.9967 12.4664 21.8041 12.0968 21.4696 11.9027C21.1351 11.7086 20.7187 11.7248 20.4002 11.9443C19.4341 12.6102 18.2641 13 17 13C13.6863 13 11 10.3137 11 6.99996C11 5.73589 11.3898 4.56587 12.0557 3.59974Z" />
      </svg>
      <div
        ref={knobRef}
        className="w-[22px] h-[22px] rounded-full absolute top-[3px]"
        style={{
          transform: 'translateX(3px)',
          backgroundColor: isDark ? '#38e3c8' : '#d4844a',
          boxShadow: isDark ? '0 0 10px rgba(56,227,200,0.4)' : '0 1px 4px rgba(0,0,0,0.15)',
        }}
      />
    </button>
  );
}

// ── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={isDark}>
      <div
        className="relative w-full h-[720px] rounded-xl overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: theme.canvas, border: `1px solid ${theme.cellBorder}` }}
      >
        <Main />
        <ThemeSwitch isDark={isDark} onClick={() => setIsDark((v) => !v)} />
      </div>
    </ThemeContext.Provider>
  );
}
