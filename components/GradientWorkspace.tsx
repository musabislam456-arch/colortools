'use client';

import React, { useState, useMemo } from 'react';
import { useToast } from '@/components/Toast';
import {
  Layers,
  Copy,
  Download,
  Plus,
  Trash2,
  RotateCw,
  Sparkles,
  Eye,
  Check,
  Smartphone,
  CreditCard,
  Code
} from 'lucide-react';

export interface GradientStop {
  id: string;
  color: string;
  position: number; // 0 - 100
}

export function GradientWorkspace() {
  const { copyToClipboard, showToast } = useToast();

  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [stops, setStops] = useState<GradientStop[]>([
    { id: '1', color: '#4F46E5', position: 0 },
    { id: '2', color: '#7C3AED', position: 50 },
    { id: '3', color: '#06B6D4', position: 100 },
  ]);
  const [colorSpace, setColorSpace] = useState<'srgb' | 'oklch'>('srgb');
  const [previewSurface, setPreviewSurface] = useState<'hero' | 'card' | 'device'>('hero');

  // Generate CSS string
  const cssGradient = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

    if (type === 'linear') {
      if (colorSpace === 'oklch') {
        return `linear-gradient(in oklch ${angle}deg, ${stopsString})`;
      }
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else {
      if (colorSpace === 'oklch') {
        return `radial-gradient(in oklch circle at center, ${stopsString})`;
      }
      return `radial-gradient(circle at center, ${stopsString})`;
    }
  }, [type, angle, stops, colorSpace]);

  // Tailwind class representation
  const tailwindClass = useMemo(() => {
    return `bg-[${cssGradient.replace(/\s+/g, '_')}]`;
  }, [cssGradient]);

  const addStop = () => {
    if (stops.length >= 6) {
      showToast('Maximum 6 color stops supported');
      return;
    }
    const newId = String(Date.now());
    const lastColor = stops[stops.length - 1]?.color || '#EC4899';
    const newPos = Math.min(100, Math.round((stops[stops.length - 1]?.position || 50) + 15));
    setStops([...stops, { id: newId, color: '#EC4899', position: newPos }]);
    showToast('Added color stop');
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) {
      showToast('Minimum 2 color stops required');
      return;
    }
    setStops(stops.filter((s) => s.id !== id));
  };

  const updateStopColor = (id: string, newColor: string) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, color: newColor.toUpperCase() } : s)));
  };

  const updateStopPosition = (id: string, newPos: number) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, position: newPos } : s)));
  };

  // Studio Gradient Presets
  const presets = [
    {
      name: 'Cyber Aura',
      type: 'linear' as const,
      angle: 135,
      stops: [
        { id: '1', color: '#06B6D4', position: 0 },
        { id: '2', color: '#6366F1', position: 52 },
        { id: '3', color: '#D946EF', position: 100 },
      ],
    },
    {
      name: 'Obsidian Velvet',
      type: 'linear' as const,
      angle: 180,
      stops: [
        { id: '1', color: '#0F172A', position: 0 },
        { id: '2', color: '#1E1B4B', position: 55 },
        { id: '3', color: '#090A0E', position: 100 },
      ],
    },
    {
      name: 'Hyper Sunset',
      type: 'linear' as const,
      angle: 90,
      stops: [
        { id: '1', color: '#F43F5E', position: 0 },
        { id: '2', color: '#FB923C', position: 50 },
        { id: '3', color: '#FBBF24', position: 100 },
      ],
    },
    {
      name: 'Bioluminescent Sea',
      type: 'radial' as const,
      angle: 0,
      stops: [
        { id: '1', color: '#10B981', position: 0 },
        { id: '2', color: '#0E7490', position: 60 },
        { id: '3', color: '#030712', position: 100 },
      ],
    },
    {
      name: 'Titanium Rose',
      type: 'linear' as const,
      angle: 45,
      stops: [
        { id: '1', color: '#334155', position: 0 },
        { id: '2', color: '#64748B', position: 50 },
        { id: '3', color: '#FDA4AF', position: 100 },
      ],
    },
    {
      name: 'Deep Ultraviolet',
      type: 'linear' as const,
      angle: 225,
      stops: [
        { id: '1', color: '#581C87', position: 0 },
        { id: '2', color: '#3B82F6', position: 100 },
      ],
    },
  ];

  const applyPreset = (preset: (typeof presets)[0]) => {
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops);
    showToast(`Applied "${preset.name}" preset`);
  };

  const downloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let grad;
    if (type === 'linear') {
      const rad = ((angle - 90) * Math.PI) / 180;
      const x1 = (canvas.width / 2) * (1 - Math.cos(rad));
      const y1 = (canvas.height / 2) * (1 - Math.sin(rad));
      const x2 = (canvas.width / 2) * (1 + Math.cos(rad));
      const y2 = (canvas.height / 2) * (1 + Math.sin(rad));
      grad = ctx.createLinearGradient(x1, y1, x2, y2);
    } else {
      grad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
    }

    stops.forEach((s) => {
      grad.addColorStop(Math.min(1, Math.max(0, s.position / 100)), s.color);
    });

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `colortools-gradient-${Date.now()}.png`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded 1080p PNG gradient');
    });
  };

  const downloadSvg = () => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopsSvg = sortedStops
      .map((s) => `<stop offset="${s.position}%" stop-color="${s.color}" />`)
      .join('\n    ');

    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    ${
      type === 'linear'
        ? `<linearGradient id="studio-grad" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${angle})">
    ${stopsSvg}
  </linearGradient>`
        : `<radialGradient id="studio-grad" cx="50%" cy="50%" r="50%">
    ${stopsSvg}
  </radialGradient>`
    }
  </defs>
  <rect width="1920" height="1080" fill="url(#studio-grad)"/>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `colortools-gradient-${Date.now()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded SVG gradient vector');
  };

  return (
    <div className="space-y-8">
      {/* Top Studio Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Panel (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-pink-400" />
              <h3 className="text-base font-bold text-white">Gradient Parameters</h3>
            </div>

            {/* Type selector */}
            <div className="flex items-center rounded-xl border border-white/[0.1] bg-[#181B24] p-1 text-xs">
              <button
                type="button"
                onClick={() => setType('linear')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  type === 'linear' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Linear
              </button>
              <button
                type="button"
                onClick={() => setType('radial')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  type === 'radial' ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Radial
              </button>
            </div>
          </div>

          {/* Angle Wheel & Slider (for linear) */}
          {type === 'linear' && (
            <div className="space-y-3 rounded-xl border border-white/[0.06] bg-[#181B24] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 font-semibold flex items-center gap-1.5">
                  <RotateCw className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Direction Angle</span>
                </span>
                <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">
                  {angle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between gap-1">
                {[0, 45, 90, 135, 180, 270].map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => setAngle(deg)}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-mono transition-colors ${
                      angle === deg
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Stops Manager */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Color Stops ({stops.length}/6)
              </span>
              <button
                type="button"
                onClick={addStop}
                className="inline-flex items-center gap-1 rounded-lg border border-white/[0.1] bg-[#181B24] px-2.5 py-1 text-xs font-medium text-zinc-200 hover:bg-white/[0.08] hover:text-white transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Color Stop</span>
              </button>
            </div>

            <div className="space-y-2">
              {stops.map((stop, index) => (
                <div
                  key={stop.id}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[#181B24] p-3"
                >
                  <span className="text-xs font-mono font-bold text-zinc-500 w-4">
                    {index + 1}
                  </span>

                  <label
                    htmlFor={`stop-color-${stop.id}`}
                    className="relative h-8 w-8 rounded-lg border border-white/20 cursor-pointer overflow-hidden shrink-0 shadow-sm"
                    style={{ backgroundColor: stop.color }}
                  >
                    <input
                      id={`stop-color-${stop.id}`}
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStopColor(stop.id, e.target.value)}
                      className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                    />
                  </label>

                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateStopColor(stop.id, e.target.value)}
                    className="w-24 rounded-md border border-white/[0.1] bg-[#0E1017] px-2 py-1 font-mono text-xs font-bold text-white uppercase focus:outline-none"
                    maxLength={7}
                  />

                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateStopPosition(stop.id, Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-zinc-400 w-10 text-right">
                      {stop.position}%
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeStop(stop.id)}
                    disabled={stops.length <= 2}
                    className="rounded-lg p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-white/[0.05] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Color Space Mode */}
          <div className="flex items-center justify-between rounded-xl bg-[#181B24] p-3 border border-white/[0.06] text-xs">
            <div>
              <p className="font-bold text-white">Color Interpolation Space</p>
              <p className="text-[11px] text-zinc-400">
                {colorSpace === 'oklch'
                  ? 'Perceptually uniform OKLCH removes intermediate gray zones'
                  : 'Standard sRGB linear interpolation'}
              </p>
            </div>
            <div className="flex rounded-lg border border-white/10 p-0.5 bg-[#0E1017]">
              <button
                type="button"
                onClick={() => setColorSpace('srgb')}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold ${
                  colorSpace === 'srgb' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                sRGB
              </button>
              <button
                type="button"
                onClick={() => setColorSpace('oklch')}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-semibold ${
                  colorSpace === 'oklch' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                in OKLCH
              </button>
            </div>
          </div>
        </div>

        {/* Right Output & Code Panel (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Generated CSS &amp; Code
              </span>
              <span className="text-xs text-indigo-400 font-mono">Real-time</span>
            </div>

            {/* CSS Output Box */}
            <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4">
              <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Standard CSS</p>
              <pre className="font-mono text-xs text-zinc-200 break-all whitespace-pre-wrap leading-relaxed">
                {`background: ${cssGradient};`}
              </pre>
              <button
                type="button"
                onClick={() => copyToClipboard(`background: ${cssGradient};`, 'CSS background')}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy CSS</span>
              </button>
            </div>

            {/* Tailwind Output Box */}
            <div className="relative rounded-xl border border-white/[0.08] bg-[#0A0B0E] p-4">
              <p className="text-[10px] font-mono uppercase text-zinc-500 mb-1">Tailwind CSS Class</p>
              <pre className="font-mono text-xs text-zinc-200 break-all whitespace-pre-wrap leading-relaxed">
                {tailwindClass}
              </pre>
              <button
                type="button"
                onClick={() => copyToClipboard(tailwindClass, 'Tailwind class')}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#181B24] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-zinc-200 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Class</span>
              </button>
            </div>
          </div>

          {/* Export Assets Buttons */}
          <div className="space-y-2 pt-2 border-t border-white/[0.08]">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Export Graphic Files
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={downloadPng}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>PNG (1080p)</span>
              </button>
              <button
                type="button"
                onClick={downloadSvg}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#181B24] py-2.5 text-xs font-medium text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>SVG Vector</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Studio Presets Row */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <h4 className="text-sm font-bold text-white">Curated Studio Gradient Presets</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {presets.map((preset) => {
            const stopsString = preset.stops.map((s) => `${s.color} ${s.position}%`).join(', ');
            const previewGrad =
              preset.type === 'linear'
                ? `linear-gradient(${preset.angle}deg, ${stopsString})`
                : `radial-gradient(circle at center, ${stopsString})`;

            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                className="group flex flex-col rounded-xl border border-white/[0.08] overflow-hidden bg-[#181B24] text-left hover:border-indigo-500/50 transition-all hover:scale-[1.02]"
              >
                <div className="h-20 w-full" style={{ background: previewGrad }} />
                <div className="p-2.5">
                  <p className="text-xs font-semibold text-white group-hover:text-indigo-400 transition-colors">
                    {preset.name}
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono capitalize">
                    {preset.type} {preset.type === 'linear' ? `${preset.angle}°` : ''}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Interactive Preview Surface */}
      <div className="rounded-2xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-indigo-400" />
              <span>Live Gradient Surface Preview</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Inspect depth, angle consistency, and visual resonance across high-end interface containers
            </p>
          </div>

          <div className="flex items-center rounded-xl border border-white/[0.1] bg-[#181B24] p-1 text-xs">
            <button
              type="button"
              onClick={() => setPreviewSurface('hero')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                previewSurface === 'hero' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Hero Stage
            </button>
            <button
              type="button"
              onClick={() => setPreviewSurface('card')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                previewSurface === 'card' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Glass Card
            </button>
            <button
              type="button"
              onClick={() => setPreviewSurface('device')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                previewSurface === 'device' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Mobile Screen
            </button>
          </div>
        </div>

        {/* Dynamic Surface Container */}
        <div className="transition-all">
          {previewSurface === 'hero' && (
            <div
              className="relative rounded-3xl p-8 sm:p-16 overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center min-h-[360px]"
              style={{ background: cssGradient }}
            >
              <div className="relative z-10 max-w-xl space-y-4 text-white drop-shadow-md">
                <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-xs font-mono uppercase tracking-widest backdrop-blur-md border border-white/20">
                  Studio Atmosphere
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                  Luminous Digital Surfaces
                </h2>
                <p className="text-sm sm:text-base opacity-90 leading-relaxed max-w-md mx-auto">
                  Seamless multi-stop color transitions mapped with optical precision.
                </p>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`background: ${cssGradient};`, 'CSS Gradient')}
                  className="mt-4 rounded-xl bg-white text-zinc-950 font-bold px-6 py-3 text-xs uppercase tracking-wider shadow-2xl hover:bg-zinc-100 transition-transform active:scale-95"
                >
                  Copy This Look
                </button>
              </div>
            </div>
          )}

          {previewSurface === 'card' && (
            <div className="flex justify-center py-6 bg-[#08090C] rounded-2xl p-6">
              <div
                className="w-full max-w-md rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden"
                style={{ background: cssGradient }}
              >
                <div className="relative z-10 space-y-6 text-white">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs tracking-widest uppercase opacity-80">
                      Studio Card Pass
                    </span>
                    <CreditCard className="h-6 w-6 opacity-90" />
                  </div>
                  <div className="py-6">
                    <p className="text-xl font-mono tracking-widest">•••• •••• •••• 2026</p>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <p className="text-[10px] opacity-75 uppercase font-mono">Token Holder</p>
                      <p className="font-bold">CREATIVE DIRECTOR</p>
                    </div>
                    <div>
                      <p className="text-[10px] opacity-75 uppercase font-mono">Expires</p>
                      <p className="font-bold">12 / 28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {previewSurface === 'device' && (
            <div className="flex justify-center py-6 bg-[#08090C] rounded-2xl p-6">
              <div className="w-full max-w-xs rounded-[2.5rem] border-4 border-zinc-700 bg-zinc-950 p-4 shadow-2xl">
                <div className="w-20 h-4 bg-zinc-800 rounded-full mx-auto mb-4" />
                <div
                  className="rounded-2xl p-6 text-white h-96 flex flex-col justify-between shadow-inner"
                  style={{ background: cssGradient }}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                      Now Playing
                    </span>
                    <h4 className="text-xl font-black mt-3">Chromatic Flow</h4>
                    <p className="text-xs opacity-80">Bioluminescent Series</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-white rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono opacity-80">
                      <span>02:45</span>
                      <span>04:12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
