'use client';

import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Type,
  Info
} from 'lucide-react';
import {
  MATH_SYMBOLS_CATALOG,
  QUICK_MATH_SYMBOLS,
  MathSymbolItem,
  copySymbolToClipboard
} from '@/lib/math-symbols';

export interface MathSymbolPaletteProps {
  onInsert: (symbol: string) => void;
  onAutoFormat?: () => void;
  activeTargetName?: string;
  targets?: { id: string; label: string }[];
  activeTargetId?: string;
  onSelectTarget?: (id: string) => void;
  compact?: boolean;
  className?: string;
}

type CategoryType = 'all' | 'exponents' | 'subscripts' | 'sets' | 'algebra' | 'logic' | 'calculus' | 'greek' | 'geometry';

export default function MathSymbolPalette({
  onInsert,
  onAutoFormat,
  activeTargetName,
  targets,
  activeTargetId,
  onSelectTarget,
  compact = false,
  className = ''
}: MathSymbolPaletteProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mode, setMode] = useState<'insert' | 'copy'>('insert');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('exponents');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2200);
  };

  const handleSymbolClick = async (symbol: string, name?: string) => {
    if (mode === 'copy') {
      const ok = await copySymbolToClipboard(symbol);
      if (ok) {
        setCopiedSymbol(symbol);
        showToast(`Copied "${symbol}" (${name || 'symbol'}) to clipboard!`);
        setTimeout(() => setCopiedSymbol(null), 1500);
      }
    } else {
      // Insert mode
      onInsert(symbol);
      showToast(`Inserted "${symbol}" into ${activeTargetName || 'field'}`);
    }
  };

  const handleCopyExplicit = async (e: React.MouseEvent, symbol: string, name?: string) => {
    e.stopPropagation();
    const ok = await copySymbolToClipboard(symbol);
    if (ok) {
      setCopiedSymbol(symbol);
      showToast(`Copied "${symbol}" to clipboard!`);
      setTimeout(() => setCopiedSymbol(null), 1500);
    }
  };

  const filteredSymbols = useMemo(() => {
    let list = MATH_SYMBOLS_CATALOG;
    if (activeCategory !== 'all') {
      list = list.filter((s) => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.symbol.includes(q) ||
          s.name.toLowerCase().includes(q) ||
          (s.latex && s.latex.toLowerCase().includes(q)) ||
          (s.keywords && s.keywords.some((k) => k.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const categories: { id: CategoryType; label: string }[] = [
    { id: 'exponents', label: 'Powers / Exponents (x², eˣ, xⁿ)' },
    { id: 'subscripts', label: 'Subscripts (a₀, xₙ)' },
    { id: 'sets', label: 'Sets & Numbers (∈, ∉, ℝ, ℤ, ∅)' },
    { id: 'algebra', label: 'Algebra & Signs (≠, ≤, ≥, ±, √, ∞)' },
    { id: 'logic', label: 'Logic & Proofs (∀, ∃, ⇒, ⇔, ∴)' },
    { id: 'calculus', label: 'Calculus & Operators (∫, ∂, ∇, ∑)' },
    { id: 'greek', label: 'Greek (α, β, θ, π, Δ, Ω)' },
    { id: 'geometry', label: 'Geometry & Units (°, ∠, ⊥, ∥)' },
    { id: 'all', label: 'All Symbols' }
  ];

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-neutral-950/80 backdrop-blur-md ${
        compact ? 'p-2.5 space-y-2 text-xs' : 'p-3 space-y-2.5'
      } transition-all text-left shadow-lg ${className}`}
    >
      {/* Toast popup */}
      {toastMessage && (
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-[11px] text-cyan-300 animate-fadeIn">
          <div className="flex items-center gap-1.5 truncate">
            <Check size={12} className="text-cyan-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <span className="text-[9px] font-mono text-cyan-400/70 shrink-0">Ready to paste</span>
        </div>
      )}

      {/* Header bar with controls */}
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`${compact ? 'text-[9px]' : 'text-[10px]'} font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1`}>
            <Sparkles size={compact ? 11 : 12} />
            <span>Math & Exponents</span>
          </span>

          {activeTargetName && (
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
              Target:{' '}
              <strong className="text-purple-300 font-medium">{activeTargetName}</strong>
            </span>
          )}

          {targets && targets.length > 1 && onSelectTarget && (
            <div className="flex items-center gap-1">
              <span className="text-[9px] text-neutral-500 font-mono">Insert into:</span>
              <select
                value={activeTargetId || ''}
                onChange={(e) => onSelectTarget(e.target.value)}
                className="bg-neutral-900 border border-white/10 rounded-lg px-2 py-0.5 text-[10px] text-neutral-200 outline-none focus:border-cyan-500"
              >
                {targets.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mode Switch: Insert vs Copy */}
          <div className="flex items-center bg-neutral-900 border border-white/10 rounded-lg p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => setMode('insert')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                mode === 'insert'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Clicking a symbol inserts it directly into the active text box at cursor"
            >
              ✍️ Insert
            </button>
            <button
              type="button"
              onClick={() => setMode('copy')}
              className={`px-2 py-0.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                mode === 'copy'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Clicking a symbol copies it to clipboard so you can paste with Ctrl+V"
            >
              <Copy size={10} />
              <span>Copy Mode</span>
            </button>
          </div>

          {/* Auto Format Carets Button */}
          {onAutoFormat && (
            <button
              type="button"
              onClick={onAutoFormat}
              className="px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
              title="Auto-convert carets (^ to exponents), e.g. x^2 → x², e^x → eˣ, != → ≠, in target field"
            >
              <Zap size={10} className="text-amber-400" />
              <span>Auto-Format (^ → ²)</span>
            </button>
          )}

          {/* Toggle Full Drawer */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-neutral-300 font-mono flex items-center gap-1 transition-all"
            title="Open comprehensive categorized math symbol palette"
          >
            <span>{isExpanded ? 'Less' : 'More'}</span>
            {isExpanded ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
          </button>
        </div>
      </div>

      {/* Quick Pinned Symbols Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400">
          <span>Quick Symbols (Click to {mode === 'copy' ? 'copy' : 'insert'}):</span>
          <span className="text-neutral-500 text-[8px] italic">Right-click any to copy</span>
        </div>
        <div className="flex flex-wrap gap-1 items-center">
          {QUICK_MATH_SYMBOLS.map((sym) => {
            const isJustCopied = copiedSymbol === sym;
            return (
              <button
                key={sym}
                type="button"
                onClick={() => handleSymbolClick(sym)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  handleCopyExplicit(e, sym);
                }}
                title={`Symbol: "${sym}" • Click to ${mode === 'copy' ? 'copy' : 'insert'} • Right-click to copy`}
                className={`min-w-[28px] h-6.5 px-1.5 rounded-lg border font-mono text-xs flex items-center justify-center transition-all ${
                  isJustCopied
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 scale-105'
                    : 'bg-white/[0.03] border-white/10 text-neutral-100 hover:bg-purple-600/20 hover:border-purple-500/40 hover:text-white active:scale-95'
                }`}
              >
                {sym}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Full Categorized Palette Drawer */}
      {isExpanded && (
        <div className="pt-3 border-t border-white/10 space-y-3 animate-fadeIn">
          {/* Category Tabs & Search */}
          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Search symbol (e.g. square, in, real, pi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-600 outline-none focus:border-cyan-500"
              />
            </div>

            {/* Hint */}
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-mono">
              <Info size={11} className="text-cyan-400 shrink-0" />
              <span>
                {mode === 'copy'
                  ? 'Clicking any symbol copies it to clipboard'
                  : 'Clicking any symbol inserts at cursor'}
              </span>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap border transition-all ${
                  activeCategory === cat.id && !searchQuery
                    ? 'bg-purple-600/20 border-purple-500 text-purple-200 font-bold'
                    : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:bg-white/[0.05] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Symbol Grid */}
          <div className="max-h-56 overflow-y-auto pr-1">
            {filteredSymbols.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-500">
                No symbols found matching &quot;{searchQuery}&quot;. Try searching for &quot;power&quot;, &quot;real&quot;, or &quot;root&quot;.
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-1.5">
                {filteredSymbols.map((item, idx) => {
                  const isJustCopied = copiedSymbol === item.symbol;
                  return (
                    <div
                      key={`${item.symbol}-${idx}`}
                      className="group relative flex items-center justify-center"
                    >
                      <button
                        type="button"
                        onClick={() => handleSymbolClick(item.symbol, item.name)}
                        className={`w-full h-9 rounded-xl border flex flex-col items-center justify-center transition-all p-1 ${
                          isJustCopied
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                            : 'bg-neutral-900/90 border-white/10 hover:border-purple-500/50 hover:bg-neutral-800 text-white'
                        }`}
                        title={`${item.name} (${item.symbol})${item.latex ? ` • LaTeX: ${item.latex}` : ''}`}
                      >
                        <span className="text-sm font-semibold font-mono leading-none">
                          {item.symbol}
                        </span>
                        <span className="text-[8px] text-neutral-400 truncate w-full text-center group-hover:text-neutral-200">
                          {item.name.replace(/^(Superscript|Subscript) /, '')}
                        </span>
                      </button>

                      {/* Explicit Copy icon button on hover */}
                      <button
                        type="button"
                        onClick={(e) => handleCopyExplicit(e, item.symbol, item.name)}
                        className="absolute top-1 right-1 p-0.5 rounded bg-black/80 text-neutral-400 hover:text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity"
                        title={`Copy "${item.symbol}" to clipboard`}
                      >
                        <Copy size={9} />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
