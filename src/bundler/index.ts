import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetchPlugin';

let isInitialized = false;

async function ensureInitialized() {
  if (!isInitialized) {
    await esbuild.initialize({
      wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    });
    isInitialized = true;
  }
}

const bundler = async (
  rawCode: string
): Promise<{ code: string; error: string }> => {
  await ensureInitialized();

  try {
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    return {
      code: result.outputFiles[0].text,
      error: '',
    };
  } catch (err) {
    console.error('Build failed:', err);
    return {
      code: '',
      error: err.message,
    };
  }
};

export default bundler;
