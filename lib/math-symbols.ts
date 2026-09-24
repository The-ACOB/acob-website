/**
 * Math and Scientific Symbols Catalog & Utilities
 * Comprehensive support for exponents, subscripts, set theory, algebra, calculus, and Greek symbols.
 */

export interface MathSymbolItem {
  symbol: string;
  name: string;
  latex?: string;
  category: 'exponents' | 'subscripts' | 'sets' | 'algebra' | 'logic' | 'calculus' | 'greek' | 'geometry';
  keywords?: string[];
}

export const MATH_SYMBOLS_CATALOG: MathSymbolItem[] = [
  // Exponents & Superscripts
  { symbol: '⁰', name: 'Superscript 0', category: 'exponents', keywords: ['power', 'zero'] },
  { symbol: '¹', name: 'Superscript 1', category: 'exponents', keywords: ['power', 'one'] },
  { symbol: '²', name: 'Superscript 2 (Squared)', category: 'exponents', keywords: ['power', 'two', 'square'] },
  { symbol: '³', name: 'Superscript 3 (Cubed)', category: 'exponents', keywords: ['power', 'three', 'cube'] },
  { symbol: '⁴', name: 'Superscript 4', category: 'exponents', keywords: ['power', 'four'] },
  { symbol: '⁵', name: 'Superscript 5', category: 'exponents', keywords: ['power', 'five'] },
  { symbol: '⁶', name: 'Superscript 6', category: 'exponents', keywords: ['power', 'six'] },
  { symbol: '⁷', name: 'Superscript 7', category: 'exponents', keywords: ['power', 'seven'] },
  { symbol: '⁸', name: 'Superscript 8', category: 'exponents', keywords: ['power', 'eight'] },
  { symbol: '⁹', name: 'Superscript 9', category: 'exponents', keywords: ['power', 'nine'] },
  { symbol: '⁺', name: 'Superscript Plus', category: 'exponents', keywords: ['plus', 'positive'] },
  { symbol: '⁻', name: 'Superscript Minus', category: 'exponents', keywords: ['minus', 'negative', 'inverse'] },
  { symbol: '⁼', name: 'Superscript Equals', category: 'exponents', keywords: ['equal'] },
  { symbol: '⁽', name: 'Superscript Left Paren', category: 'exponents', keywords: ['open paren'] },
  { symbol: '⁾', name: 'Superscript Right Paren', category: 'exponents', keywords: ['close paren'] },
  { symbol: 'ˣ', name: 'Superscript x', category: 'exponents', keywords: ['power x', 'exponent x', 'e^x'] },
  { symbol: 'ʸ', name: 'Superscript y', category: 'exponents', keywords: ['power y'] },
  { symbol: 'ᶻ', name: 'Superscript z', category: 'exponents', keywords: ['power z'] },
  { symbol: 'ⁿ', name: 'Superscript n', category: 'exponents', keywords: ['power n', 'nth power'] },
  { symbol: 'ᵃ', name: 'Superscript a', category: 'exponents', keywords: ['power a'] },
  { symbol: 'ᵇ', name: 'Superscript b', category: 'exponents', keywords: ['power b'] },
  { symbol: 'ᶜ', name: 'Superscript c', category: 'exponents', keywords: ['power c'] },
  { symbol: 'ᵈ', name: 'Superscript d', category: 'exponents', keywords: ['power d'] },
  { symbol: 'ᵉ', name: 'Superscript e', category: 'exponents', keywords: ['power e'] },
  { symbol: 'ᵏ', name: 'Superscript k', category: 'exponents', keywords: ['power k'] },
  { symbol: 'ᵐ', name: 'Superscript m', category: 'exponents', keywords: ['power m'] },
  { symbol: 'ᵗ', name: 'Superscript t', category: 'exponents', keywords: ['power t'] },

  // Subscripts
  { symbol: '₀', name: 'Subscript 0', category: 'subscripts', keywords: ['sub zero'] },
  { symbol: '₁', name: 'Subscript 1', category: 'subscripts', keywords: ['sub one'] },
  { symbol: '₂', name: 'Subscript 2', category: 'subscripts', keywords: ['sub two'] },
  { symbol: '₃', name: 'Subscript 3', category: 'subscripts', keywords: ['sub three'] },
  { symbol: '₄', name: 'Subscript 4', category: 'subscripts', keywords: ['sub four'] },
  { symbol: '₅', name: 'Subscript 5', category: 'subscripts', keywords: ['sub five'] },
  { symbol: '₆', name: 'Subscript 6', category: 'subscripts', keywords: ['sub six'] },
  { symbol: '₇', name: 'Subscript 7', category: 'subscripts', keywords: ['sub seven'] },
  { symbol: '₈', name: 'Subscript 8', category: 'subscripts', keywords: ['sub eight'] },
  { symbol: '₉', name: 'Subscript 9', category: 'subscripts', keywords: ['sub nine'] },
  { symbol: '₊', name: 'Subscript Plus', category: 'subscripts', keywords: ['sub plus'] },
  { symbol: '₋', name: 'Subscript Minus', category: 'subscripts', keywords: ['sub minus'] },
  { symbol: '₌', name: 'Subscript Equals', category: 'subscripts', keywords: ['sub equal'] },
  { symbol: '₍', name: 'Subscript Left Paren', category: 'subscripts', keywords: ['open paren'] },
  { symbol: '₎', name: 'Subscript Right Paren', category: 'subscripts', keywords: ['close paren'] },
  { symbol: 'ₐ', name: 'Subscript a', category: 'subscripts', keywords: ['sub a'] },
  { symbol: 'ₑ', name: 'Subscript e', category: 'subscripts', keywords: ['sub e'] },
  { symbol: 'ₕ', name: 'Subscript h', category: 'subscripts', keywords: ['sub h'] },
  { symbol: 'ᵢ', name: 'Subscript i', category: 'subscripts', keywords: ['sub i'] },
  { symbol: 'ⱼ', name: 'Subscript j', category: 'subscripts', keywords: ['sub j'] },
  { symbol: 'ₖ', name: 'Subscript k', category: 'subscripts', keywords: ['sub k'] },
  { symbol: 'ₗ', name: 'Subscript l', category: 'subscripts', keywords: ['sub l'] },
  { symbol: 'ₘ', name: 'Subscript m', category: 'subscripts', keywords: ['sub m'] },
  { symbol: 'ₙ', name: 'Subscript n', category: 'subscripts', keywords: ['sub n'] },
  { symbol: 'ₒ', name: 'Subscript o', category: 'subscripts', keywords: ['sub o'] },
  { symbol: 'ₚ', name: 'Subscript p', category: 'subscripts', keywords: ['sub p'] },
  { symbol: 'ᵣ', name: 'Subscript r', category: 'subscripts', keywords: ['sub r'] },
  { symbol: 'ₛ', name: 'Subscript s', category: 'subscripts', keywords: ['sub s'] },
  { symbol: 'ₜ', name: 'Subscript t', category: 'subscripts', keywords: ['sub t'] },
  { symbol: 'ᵤ', name: 'Subscript u', category: 'subscripts', keywords: ['sub u'] },
  { symbol: 'ᵥ', name: 'Subscript v', category: 'subscripts', keywords: ['sub v'] },
  { symbol: 'ₓ', name: 'Subscript x', category: 'subscripts', keywords: ['sub x'] },

  // Sets & Numbers
  { symbol: '∈', name: 'Element of', latex: '\\in', category: 'sets', keywords: ['in', 'belongs to', 'member'] },
  { symbol: '∉', name: 'Not element of', latex: '\\notin', category: 'sets', keywords: ['not in', 'does not belong'] },
  { symbol: '⊂', name: 'Proper subset', latex: '\\subset', category: 'sets', keywords: ['subset'] },
  { symbol: '⊆', name: 'Subset or equal', latex: '\\subseteq', category: 'sets', keywords: ['subset equal'] },
  { symbol: '⊄', name: 'Not subset', latex: '\\not\\subset', category: 'sets', keywords: ['not subset'] },
  { symbol: '⊃', name: 'Superset', latex: '\\supset', category: 'sets', keywords: ['superset'] },
  { symbol: '⊇', name: 'Superset or equal', latex: '\\supseteq', category: 'sets', keywords: ['superset equal'] },
  { symbol: '∪', name: 'Union', latex: '\\cup', category: 'sets', keywords: ['union', 'or'] },
  { symbol: '∩', name: 'Intersection', latex: '\\cap', category: 'sets', keywords: ['intersection', 'and'] },
  { symbol: '∖', name: 'Set difference', latex: '\\setminus', category: 'sets', keywords: ['without', 'minus'] },
  { symbol: '∅', name: 'Empty set', latex: '\\emptyset', category: 'sets', keywords: ['null set', 'empty', 'phi'] },
  { symbol: 'ℝ', name: 'Real numbers', latex: '\\mathbb{R}', category: 'sets', keywords: ['reals', 'real', 'R'] },
  { symbol: 'ℤ', name: 'Integers', latex: '\\mathbb{Z}', category: 'sets', keywords: ['integers', 'Z'] },
  { symbol: 'ℕ', name: 'Natural numbers', latex: '\\mathbb{N}', category: 'sets', keywords: ['naturals', 'N'] },
  { symbol: 'ℚ', name: 'Rational numbers', latex: '\\mathbb{Q}', category: 'sets', keywords: ['rationals', 'Q'] },
  { symbol: 'ℂ', name: 'Complex numbers', latex: '\\mathbb{C}', category: 'sets', keywords: ['complex', 'C'] },
  { symbol: 'ℵ', name: 'Aleph', latex: '\\aleph', category: 'sets', keywords: ['cardinality'] },

  // Algebra & Relations
  { symbol: '≠', name: 'Not equal to', latex: '\\neq', category: 'algebra', keywords: ['not equal', '!=', '=/='] },
  { symbol: '≤', name: 'Less than or equal', latex: '\\le', category: 'algebra', keywords: ['<=', 'le'] },
  { symbol: '≥', name: 'Greater than or equal', latex: '\\ge', category: 'algebra', keywords: ['>=', 'ge'] },
  { symbol: '≈', name: 'Approximately equal', latex: '\\approx', category: 'algebra', keywords: ['approx', 'tilde'] },
  { symbol: '≡', name: 'Identically equal / Congruent', latex: '\\equiv', category: 'algebra', keywords: ['identity', 'congruent'] },
  { symbol: '±', name: 'Plus-minus', latex: '\\pm', category: 'algebra', keywords: ['plus or minus', '+-'] },
  { symbol: '∓', name: 'Minus-plus', latex: '\\mp', category: 'algebra', keywords: ['minus or plus', '-+'] },
  { symbol: '×', name: 'Multiplication (cross)', latex: '\\times', category: 'algebra', keywords: ['times', 'cross', '*'] },
  { symbol: '÷', name: 'Division', latex: '\\div', category: 'algebra', keywords: ['divide', 'slash'] },
  { symbol: '·', name: 'Center dot (multiplication)', latex: '\\cdot', category: 'algebra', keywords: ['dot', 'times'] },
  { symbol: '√', name: 'Square root', latex: '\\sqrt', category: 'algebra', keywords: ['root', 'sqrt', 'radical'] },
  { symbol: '∛', name: 'Cube root', latex: '\\sqrt[3]', category: 'algebra', keywords: ['cube root'] },
  { symbol: '∜', name: 'Fourth root', latex: '\\sqrt[4]', category: 'algebra', keywords: ['fourth root'] },
  { symbol: '∞', name: 'Infinity', latex: '\\infty', category: 'algebra', keywords: ['inf', 'infinite', 'forever'] },
  { symbol: '∝', name: 'Proportional to', latex: '\\propto', category: 'algebra', keywords: ['proportional'] },
  { symbol: '%', name: 'Percent', category: 'algebra', keywords: ['percentage'] },
  { symbol: '‰', name: 'Per mille', category: 'algebra', keywords: ['per thousand'] },

  // Logic & Proofs
  { symbol: '∀', name: 'For all (Universal quantifier)', latex: '\\forall', category: 'logic', keywords: ['forall', 'for every'] },
  { symbol: '∃', name: 'There exists (Existential quantifier)', latex: '\\exists', category: 'logic', keywords: ['exists', 'there is'] },
  { symbol: '∄', name: 'There does not exist', latex: '\\nexists', category: 'logic', keywords: ['does not exist'] },
  { symbol: '∴', name: 'Therefore', latex: '\\therefore', category: 'logic', keywords: ['therefore', 'hence'] },
  { symbol: '∵', name: 'Because / Since', latex: '\\because', category: 'logic', keywords: ['because', 'since'] },
  { symbol: '→', name: 'Right arrow / Approaches', latex: '\\rightarrow', category: 'logic', keywords: ['arrow', 'tends to', '->'] },
  { symbol: '⇒', name: 'Implies', latex: '\\Rightarrow', category: 'logic', keywords: ['implies', '=>'] },
  { symbol: '⇔', name: 'If and only if (iff)', latex: '\\Leftrightarrow', category: 'logic', keywords: ['iff', '<=>', 'equivalent'] },
  { symbol: '↔', name: 'Left right arrow', latex: '\\leftrightarrow', category: 'logic', keywords: ['bidirectional'] },
  { symbol: '¬', name: 'Negation / NOT', latex: '\\neg', category: 'logic', keywords: ['not', 'negation'] },
  { symbol: '∧', name: 'Logical AND', latex: '\\land', category: 'logic', keywords: ['and', 'conjunction'] },
  { symbol: '∨', name: 'Logical OR', latex: '\\lor', category: 'logic', keywords: ['or', 'disjunction'] },

  // Calculus & Advanced
  { symbol: '∫', name: 'Integral', latex: '\\int', category: 'calculus', keywords: ['integral', 'integrate'] },
  { symbol: '∬', name: 'Double integral', latex: '\\iint', category: 'calculus', keywords: ['double integral'] },
  { symbol: '∭', name: 'Triple integral', latex: '\\iiint', category: 'calculus', keywords: ['triple integral'] },
  { symbol: '∮', name: 'Contour integral', latex: '\\oint', category: 'calculus', keywords: ['contour'] },
  { symbol: '∂', name: 'Partial derivative', latex: '\\partial', category: 'calculus', keywords: ['partial', 'del'] },
  { symbol: '∇', name: 'Nabla / Del / Gradient', latex: '\\nabla', category: 'calculus', keywords: ['nabla', 'gradient'] },
  { symbol: '∆', name: 'Delta / Change', latex: '\\Delta', category: 'calculus', keywords: ['delta', 'change', 'difference'] },
  { symbol: '∑', name: 'Summation / Sigma', latex: '\\sum', category: 'calculus', keywords: ['sum', 'sigma'] },
  { symbol: '∏', name: 'Product / Pi', latex: '\\prod', category: 'calculus', keywords: ['product', 'pi'] },
  { symbol: 'lim', name: 'Limit', latex: '\\lim', category: 'calculus', keywords: ['limit', 'as x approaches'] },

  // Greek Letters
  { symbol: 'α', name: 'Alpha (α)', latex: '\\alpha', category: 'greek', keywords: ['alpha'] },
  { symbol: 'β', name: 'Beta (β)', latex: '\\beta', category: 'greek', keywords: ['beta'] },
  { symbol: 'γ', name: 'Gamma (γ)', latex: '\\gamma', category: 'greek', keywords: ['gamma'] },
  { symbol: 'δ', name: 'Delta (δ)', latex: '\\delta', category: 'greek', keywords: ['delta'] },
  { symbol: 'ε', name: 'Epsilon (ε)', latex: '\\epsilon', category: 'greek', keywords: ['epsilon'] },
  { symbol: 'ζ', name: 'Zeta (ζ)', latex: '\\zeta', category: 'greek', keywords: ['zeta'] },
  { symbol: 'η', name: 'Eta (η)', latex: '\\eta', category: 'greek', keywords: ['eta'] },
  { symbol: 'θ', name: 'Theta (θ)', latex: '\\theta', category: 'greek', keywords: ['theta', 'angle'] },
  { symbol: 'λ', name: 'Lambda (λ)', latex: '\\lambda', category: 'greek', keywords: ['lambda', 'wavelength'] },
  { symbol: 'μ', name: 'Mu (μ)', latex: '\\mu', category: 'greek', keywords: ['mu', 'micro', 'mean'] },
  { symbol: 'π', name: 'Pi (π)', latex: '\\pi', category: 'greek', keywords: ['pi', '3.14'] },
  { symbol: 'ρ', name: 'Rho (ρ)', latex: '\\rho', category: 'greek', keywords: ['rho', 'density'] },
  { symbol: 'σ', name: 'Sigma (σ)', latex: '\\sigma', category: 'greek', keywords: ['sigma', 'std'] },
  { symbol: 'τ', name: 'Tau (τ)', latex: '\\tau', category: 'greek', keywords: ['tau', 'torque'] },
  { symbol: 'φ', name: 'Phi (φ)', latex: '\\phi', category: 'greek', keywords: ['phi', 'golden ratio'] },
  { symbol: 'ψ', name: 'Psi (ψ)', latex: '\\psi', category: 'greek', keywords: ['psi'] },
  { symbol: 'ω', name: 'Omega (ω)', latex: '\\omega', category: 'greek', keywords: ['omega', 'frequency'] },
  { symbol: 'Δ', name: 'Capital Delta (Δ)', latex: '\\Delta', category: 'greek', keywords: ['capital delta'] },
  { symbol: 'Ω', name: 'Capital Omega (Ω)', latex: '\\Omega', category: 'greek', keywords: ['ohm', 'omega'] },
  { symbol: 'Σ', name: 'Capital Sigma (Σ)', latex: '\\Sigma', category: 'greek', keywords: ['summation', 'capital sigma'] },

  // Geometry & Units
  { symbol: '°', name: 'Degree symbol', category: 'geometry', keywords: ['degree', 'deg', 'angle', 'temperature'] },
  { symbol: '′', name: 'Prime / Minute', category: 'geometry', keywords: ['prime', 'minute', 'derivative'] },
  { symbol: '″', name: 'Double Prime / Second', category: 'geometry', keywords: ['double prime', 'second'] },
  { symbol: '∠', name: 'Angle', latex: '\\angle', category: 'geometry', keywords: ['angle'] },
  { symbol: '⊥', name: 'Perpendicular', latex: '\\perp', category: 'geometry', keywords: ['perpendicular', 'orthogonal'] },
  { symbol: '∥', name: 'Parallel', latex: '\\parallel', category: 'geometry', keywords: ['parallel'] },
  { symbol: '△', name: 'Triangle', category: 'geometry', keywords: ['triangle'] }
];

/**
 * Top frequently needed symbols for quick one-click toolbar
 */
export const QUICK_MATH_SYMBOLS: string[] = [
  '²', '³', 'ˣ', 'ⁿ', '⁺', '⁻', '∈', '∉', 'ℝ', '≠', '≤', '≥', '±', '√', '∞', 'π', '°', '∅', '∪', '∩', 'θ', 'α', 'β'
];

/**
 * Map of standard characters to superscripts
 */
export const SUPERSCRIPT_MAP: Record<string, string> = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
  '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾',
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ',
  'f': 'ᶠ', 'g': 'ᵍ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ',
  'p': 'ᵖ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ', 'u': 'ᵘ',
  'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
  'A': 'ᴬ', 'B': 'ᴮ', 'D': 'ᴰ', 'E': 'ᴱ', 'G': 'ᴳ',
  'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ', 'K': 'ᴷ', 'L': 'ᴸ',
  'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'R': 'ᴿ',
  'T': 'ᵀ', 'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ'
};

/**
 * Map of standard characters to subscripts
 */
export const SUBSCRIPT_MAP: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎',
  'a': 'ₐ', 'e': 'ₑ', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ',
  'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ'
};

/**
 * Convert caret string (e.g. "2x+1") to superscript Unicode chars
 */
export function toSuperscript(str: string): string {
  return str
    .split('')
    .map(ch => SUPERSCRIPT_MAP[ch] || ch)
    .join('');
}

/**
 * Convert subscript string (e.g. "1") to subscript Unicode chars
 */
export function toSubscript(str: string): string {
  return str
    .split('')
    .map(ch => SUBSCRIPT_MAP[ch] || ch)
    .join('');
}

/**
 * Intelligent math & caret formatter:
 * Automatically converts caret notations (x^2, e^x, x^(n+1)), subscripts (a_0, x_n),
 * HTML tags (<sup>2</sup>), and common keyboard math shortcuts (!=, <=, >=, +-, etc.)
 * into proper Unicode mathematical notation.
 */
export function convertCaretsAndMath(text: string): string {
  if (!text) return '';

  let res = text;

  // 1. Convert HTML tags <sup>...</sup> and <sub>...</sub>
  res = res.replace(/<sup>(.*?)<\/sup>/gi, (_, content) => toSuperscript(content));
  res = res.replace(/<sub>(.*?)<\/sub>/gi, (_, content) => toSubscript(content));

  // 2. Convert caret with braces / parentheses first: e.g. x^{2n+1} or x^(2n+1)
  res = res.replace(/\^\{([^}]+)\}/g, (_, exp) => toSuperscript(exp));
  res = res.replace(/\^\(([^)]+)\)/g, (_, exp) => toSuperscript(exp));

  // 3. Convert caret with single/integer token: e.g. x^2, e^x, 10^5, x^-1, y^n, 2^10
  // Does not greedily swallow subsequent minus/plus or expressions: e.g. x^2-3x+2 => x²-3x+2
  res = res.replace(/\^([+-]?(?:[0-9]+|[a-zA-Z]))/g, (_, exp) => toSuperscript(exp));

  // 4. Convert underscore subscripts with braces / parentheses: e.g. a_{n+1} or a_(n+1)
  res = res.replace(/_\{([^}]+)\}/g, (_, sub) => toSubscript(sub));
  res = res.replace(/_\(([^)]+)\)/g, (_, sub) => toSubscript(sub));

  // 5. Convert single underscore subscripts: e.g. a_0, x_1, a_n
  res = res.replace(/_([+-]?(?:[0-9]+|[a-zA-Z]))/g, (_, sub) => toSubscript(sub));

  // 6. Common relation & operator shortcuts
  // Inequality: =!=, =!, !=
  res = res.replace(/(?:=!=|=!|!=)/g, '≠');
  // Comparisons: <= and >=
  res = res.replace(/<=/g, '≤');
  res = res.replace(/>=/g, '≥');
  // Plus minus: +-
  res = res.replace(/\+-/g, '±');
  // Minus plus: -+
  res = res.replace(/-\+/g, '∓');
  // Approx: ~= or =~
  res = res.replace(/(?:~=|=~)/g, '≈');
  // Arrows
  res = res.replace(/<=>/g, '⇔');
  res = res.replace(/=>/g, '⇒');
  res = res.replace(/->/g, '→');

  // 7. Strip LaTeX math mode wrappers: $$...$$, $...$, \[...\], \(...\)
  res = res.replace(/\\\[([\s\S]*?)\\\]/g, '$1');
  res = res.replace(/\\\(([\s\S]*?)\\\)/g, '$1');
  res = res.replace(/\$\$([\s\S]*?)\$\$/g, '$1');
  res = res.replace(/\$([^$]+)\$/g, '$1');

  // 8. LaTeX font and text wrappers
  res = res.replace(/\\text\{([^}]+)\}/g, '$1');
  res = res.replace(/\\(mathbf|mathit|mathrm|operatorname)\{([^}]+)\}/g, '$2');
  res = res.replace(/\\left\s*\\\{/g, '{');
  res = res.replace(/\\right\s*\\\}/g, '}');
  res = res.replace(/\\left\s*\(/g, '(');
  res = res.replace(/\\right\s*\)/g, ')');
  res = res.replace(/\\left\s*\[/g, '[');
  res = res.replace(/\\right\s*\]/g, ']');
  res = res.replace(/\\left\s*\|/g, '|');
  res = res.replace(/\\right\s*\|/g, '|');
  res = res.replace(/\\\{/g, '{');
  res = res.replace(/\\\}/g, '}');
  res = res.replace(/\\(quad|qquad)/g, '  ');
  res = res.replace(/\\([,;:!])/g, ' ');

  // 9. Fractions: \frac{a}{b} -> a/b or (a)/(b)
  res = res.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, (_, num, den) => {
    const cleanNum = num.trim();
    const cleanDen = den.trim();
    if (/^[a-zA-Z0-9]+$/.test(cleanNum) && /^[a-zA-Z0-9]+$/.test(cleanDen)) {
      return `${cleanNum}/${cleanDen}`;
    }
    return `(${cleanNum})/(${cleanDen})`;
  });

  // 10. Square roots: \sqrt{x} -> √x or √(x)
  res = res.replace(/\\sqrt\[3\]\{([^{}]+)\}/g, '∛($1)');
  res = res.replace(/\\sqrt\[4\]\{([^{}]+)\}/g, '∜($1)');
  res = res.replace(/\\sqrt\{([^{}]+)\}/g, (_, inside) => {
    const clean = inside.trim();
    if (/^[a-zA-Z0-9]+$/.test(clean)) return `√${clean}`;
    return `√(${clean})`;
  });

  // 11. Standard math functions (strip backslash)
  res = res.replace(/\\(ln|log|exp|sin|cos|tan|cot|sec|csc)\b/g, '$1');

  // 12. Common LaTeX / math shorthand commands with backslash
  res = res.replace(/\\in\s*R(?=[\s:,\]\}]|$)/g, '∈ ℝ');
  res = res.replace(/\bFor\s+R\b/g, 'For ℝ');
  res = res.replace(/\\in\b/g, '∈');
  res = res.replace(/\\notin\b/g, '∉');
  res = res.replace(/\\ni\b/g, '∋');
  res = res.replace(/\\subset\b/g, '⊂');
  res = res.replace(/\\subseteq\b/g, '⊆');
  res = res.replace(/\\supset\b/g, '⊃');
  res = res.replace(/\\supseteq\b/g, '⊇');
  res = res.replace(/\\cup\b/g, '∪');
  res = res.replace(/\\cap\b/g, '∩');
  res = res.replace(/\\(emptyset|empty)\b/g, '∅');
  res = res.replace(/\\(infty|inf)\b/g, '∞');
  res = res.replace(/\\sqrt\b/g, '√');
  res = res.replace(/\\times\b/g, '×');
  res = res.replace(/\\cdot\b/g, '·');
  res = res.replace(/\\div\b/g, '÷');
  res = res.replace(/\\pm\b/g, '±');
  res = res.replace(/\\mp\b/g, '∓');
  res = res.replace(/\\(ne|neq)\b/g, '≠');
  res = res.replace(/\\(le|leq)\b/g, '≤');
  res = res.replace(/\\(ge|geq)\b/g, '≥');
  res = res.replace(/\\approx\b/g, '≈');
  res = res.replace(/\\equiv\b/g, '≡');
  res = res.replace(/\\cong\b/g, '≅');
  res = res.replace(/\\(degree|deg)\b/g, '°');
  res = res.replace(/\\angle\b/g, '∠');
  res = res.replace(/\\perp\b/g, '⊥');
  res = res.replace(/\\parallel\b/g, '∥');
  res = res.replace(/\\(cdots|ldots|dots)\b/g, '…');
  res = res.replace(/\\(implies|Rightarrow)\b/g, '⇒');
  res = res.replace(/\\(iff|Leftrightarrow)\b/g, '⇔');
  res = res.replace(/\\(to|rightarrow)\b/g, '→');
  res = res.replace(/\\leftarrow\b/g, '←');
  res = res.replace(/\\pi\b/g, 'π');
  res = res.replace(/\\theta\b/g, 'θ');
  res = res.replace(/\\alpha\b/g, 'α');
  res = res.replace(/\\beta\b/g, 'β');
  res = res.replace(/\\gamma\b/g, 'γ');
  res = res.replace(/\\delta\b/g, 'δ');
  res = res.replace(/\\Delta\b/g, 'Δ');
  res = res.replace(/\\lambda\b/g, 'λ');
  res = res.replace(/\\mu\b/g, 'μ');
  res = res.replace(/\\sigma\b/g, 'σ');
  res = res.replace(/\\Sigma\b/g, 'Σ');
  res = res.replace(/\\omega\b/g, 'ω');
  res = res.replace(/\\Omega\b/g, 'Ω');
  res = res.replace(/\\sum\b/g, '∑');
  res = res.replace(/\\prod\b/g, '∏');
  res = res.replace(/\\int\b/g, '∫');
  res = res.replace(/\\partial\b/g, '∂');
  res = res.replace(/\\forall\b/g, '∀');
  res = res.replace(/\\exists\b/g, '∃');
  res = res.replace(/\\therefore\b/g, '∴');
  res = res.replace(/\\because\b/g, '∵');
  res = res.replace(/\\mathbb\{R\}|\\R\b/g, 'ℝ');
  res = res.replace(/\\mathbb\{Z\}|\\Z\b/g, 'ℤ');
  res = res.replace(/\\mathbb\{N\}|\\N\b/g, 'ℕ');
  res = res.replace(/\\mathbb\{Q\}|\\Q\b/g, 'ℚ');
  res = res.replace(/\\mathbb\{C\}|\\C\b/g, 'ℂ');

  return res;
}

/**
 * Robust copy-to-clipboard function supporting modern API and fallback
 */
export async function copySymbolToClipboard(text: string): Promise<boolean> {
  if (!text || typeof window === 'undefined') return false;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {
    console.warn('Clipboard writeText failed, falling back to execCommand:', e);
  }

  // Fallback using temporary textarea
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Copy fallback failed:', err);
    return false;
  }
}
