import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

function Swatches() {
  const colors = ['#f43f5e', '#facc15', '#22c55e', '#0ea5e9'];
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {colors.map((c) => (
        <div key={c} style={{ width: 18, height: 48, borderRadius: 6, background: c }} />
      ))}
    </div>
  );
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0B0E',
        }}
      >
        <Swatches />
      </div>
    ),
    { ...size }
  );
}
