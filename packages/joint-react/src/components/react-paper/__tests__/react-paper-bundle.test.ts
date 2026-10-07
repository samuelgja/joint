import { execFileSync } from 'node:child_process';
import path from 'node:path';

const PACKAGE_ROOT = path.resolve(__dirname, '../../../..');

/** JointJS view-layer modules a pure-React paper must never pull in. */
const VIEW_LAYER = /joint-core\/src\/(dia\/(Paper|CellView|ElementView|LinkView)|mvc\/View)\.mjs$/;

interface ConsumerBundle {
  /** Source files with code in the output. */
  readonly inputs: readonly string[];
  /** External modules the output imports. */
  readonly externals: readonly string[];
  /** Minified size of the output. */
  readonly bytes: number;
}

/**
 * The esbuild run, as a Node script: esbuild refuses to run inside jsdom,
 * where `TextEncoder` output is not an instance of the realm's `Uint8Array`.
 */
const BUNDLE_SCRIPT = `
  const { build } = require('esbuild');
  const component = process.argv[1];
  build({
    stdin: {
      contents: "import { GraphProvider, " + component + " } from './src/index.ts'; console.log(GraphProvider, " + component + ");",
      resolveDir: process.cwd(),
      loader: 'ts',
    },
    bundle: true,
    minify: true,
    format: 'esm',
    write: false,
    metafile: true,
    external: ['react', 'react-dom', 'react/jsx-runtime', 'use-sync-external-store/*'],
    loader: { '.css': 'empty' },
    define: { 'process.env.NODE_ENV': '"production"' },
  }).then((result) => {
    const [output] = Object.values(result.metafile.outputs);
    process.stdout.write(JSON.stringify({
      inputs: Object.keys(output.inputs).filter((file) => output.inputs[file].bytesInOutput > 0),
      externals: output.imports.map((imported) => imported.path),
      bytes: result.outputFiles[0].contents.length,
    }));
  });
`;

/**
 * Bundles a consumer the way an application bundler would and reports what
 * ended up in the output.
 * @param component - The paper component the consumer imports.
 * @returns The bundled input files, the externals and the minified size.
 */
function bundleConsumer(component: 'Paper' | 'ReactPaper'): ConsumerBundle {
  const output = execFileSync(process.execPath, ['-e', BUNDLE_SCRIPT, component], {
    cwd: PACKAGE_ROOT,
    encoding: 'utf8',
  });
  return JSON.parse(output) as ConsumerBundle;
}

describe('ReactPaper bundle', () => {
  it('pulls in neither the JointJS view layer nor react-dom portals', () => {
    const { inputs, externals } = bundleConsumer('ReactPaper');
    expect(inputs.filter((file) => VIEW_LAYER.test(file))).toEqual([]);
    // No `createPortal`: the paper needs nothing from react-dom at all.
    expect(externals).not.toContain('react-dom');
    // The models and the routing it reuses from joint-core are there.
    expect(inputs.some((file) => file.endsWith('joint-core/src/dia/Graph.mjs'))).toBe(true);
    expect(inputs.some((file) => file.endsWith('joint-core/src/routers/rightAngle.mjs'))).toBe(
      true
    );
  }, 60_000);

  it('is substantially smaller than a <Paper> consumer', () => {
    const reactPaper = bundleConsumer('ReactPaper');
    const paper = bundleConsumer('Paper');
    expect(paper.inputs.some((file) => VIEW_LAYER.test(file))).toBe(true);
    // Measured at 327 KB against 500 KB minified; the bound leaves room to grow.
    expect(reactPaper.bytes).toBeLessThan(paper.bytes * 0.75);
  }, 60_000);
});
