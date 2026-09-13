import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'ColorTools Studio — Creative Agency Grade Color Suite';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Swatches() {
  const colors = ['#f43f5e', '#f97316', '#facc15', '#22c55e', '#0ea5e9', '#8b5cf6'];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {colors.map((c) => (
        <div key={c} style={{ width: 24, height: 60, borderRadius: 8, background: c }} />
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0B0E',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', marginBottom: 44 }}>
          <Swatches />
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: '#ffffff', letterSpacing: -1, marginBottom: 20 }}>
          ColorTools Studio
        </div>
        <div style={{ fontSize: 28, color: '#94a3b8', maxWidth: 940, textAlign: 'center' }}>
          Creative Agency Grade Color Suite
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['Palettes', 'Contrast Checker', 'Gradients', 'Converter'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(99,102,241,0.12)',
                color: '#c7d2fe',
                fontSize: 19,
                border: '1px solid rgba(99,102,241,0.3)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
