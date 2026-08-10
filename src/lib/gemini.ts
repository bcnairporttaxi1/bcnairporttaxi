import { GoogleGenAI } from '@google/genai';

/**
 * Image generation with automatic key rotation.
 *
 * Three AI Studio keys share the free-tier daily quota. When one returns 429 /
 * RESOURCE_EXHAUSTED we move to the next rather than failing the run. The
 * starting key rotates per process so load spreads across all three instead of
 * always burning key 1 first.
 */

const MODEL = 'gemini-2.5-flash-image';

function loadKeys(): string[] {
  return [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3,
  ].filter((k): k is string => Boolean(k && k.trim()));
}

/** Rotates the starting offset so repeated runs don't always hit key 1 first. */
let startOffset = Math.floor(Math.random() * 3);

function isQuotaError(err: unknown): boolean {
  const e = err as { status?: number; response?: { status?: number }; message?: string };
  const status = e?.status ?? e?.response?.status;
  if (status === 429) return true;
  return /RESOURCE_EXHAUSTED|quota|rate limit/i.test(String(e?.message ?? ''));
}

async function callGemini(apiKey: string, prompt: string): Promise<Buffer> {
  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    const data = part.inlineData?.data;
    if (data) return Buffer.from(data, 'base64');
  }

  throw new Error(
    `Gemini returned no image data. Response: ${JSON.stringify(response).slice(0, 400)}`,
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Generate one image, walking the key list on quota errors.
 * Throws only when every key is exhausted or a non-quota error occurs — the
 * caller is expected to fall back to a committed placeholder so builds survive.
 */
export async function generateImageWithFailover(prompt: string): Promise<Buffer> {
  const keys = loadKeys();
  if (keys.length === 0) {
    throw new Error(
      'No GEMINI_API_KEY_1..3 set — cannot generate images. Falling back to placeholder.',
    );
  }

  let lastErr: unknown;

  for (let i = 0; i < keys.length; i++) {
    const idx = (startOffset + i) % keys.length;
    try {
      const buf = await callGemini(keys[idx], prompt);
      startOffset = (idx + 1) % keys.length;
      return buf;
    } catch (err) {
      if (isQuotaError(err)) {
        lastErr = err;
        console.warn(`  key #${idx + 1} exhausted, rotating…`);
        await sleep(800 * (i + 1)); // small exponential backoff
        continue;
      }
      throw err; // a real error — don't burn the remaining keys
    }
  }

  throw lastErr ?? new Error('All Gemini keys exhausted');
}
