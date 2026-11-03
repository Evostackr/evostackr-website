// C:\Users\ujwal\.gemini\antigravity-ide\scratch\software-company-site\scratch\test-suite\challenge-m1-styling.mjs
// Empirical Challenge Verification Harness: Milestone 1 UI Layout, Styling Constraints, and Performance Invariants

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

console.log('='.repeat(70));
console.log('  CHALLENGER 2: EMPIRICAL STYLING & PERFORMANCE INVARIANT HARNESS  ');
console.log('='.repeat(70));
console.log(`Project Root: ${projectRoot}`);
console.log(`Timestamp: ${new Date().toISOString()}\n`);

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function recordTest(name, passed, details) {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`  ✓ PASS: ${name}`);
  } else {
    failedTests++;
    console.log(`  ✗ FAIL: ${name}`);
    if (details) {
      console.log(`    -> ${details}`);
    }
  }
}

// -----------------------------------------------------------------------------
// Helper: Simple CSS Rule Parser
// -----------------------------------------------------------------------------
function parseCssDeclarations(cssContent, fileName) {
  // Strip comments
  const cleanCss = cssContent.replace(/\/\*[\s\S]*?\*\//g, '');
  const lines = cssContent.split('\n');

  // Extract declarations with line numbers
  const declarations = [];
  lines.forEach((line, lineIndex) => {
    // Check if line contains property: value
    const match = line.match(/^\s*([a-zA-Z\-]+)\s*:\s*([^;]+);/);
    if (match) {
      declarations.push({
        file: fileName,
        line: lineIndex + 1,
        rawLine: line.trim(),
        property: match[1].trim().toLowerCase(),
        value: match[2].trim(),
      });
    }
  });

  return declarations;
}

// =============================================================================
// TEST SUITE 1: Border-Radius Strictly 0px (No values > 0)
// =============================================================================
console.log('\n>>> [TEST SUITE 1] Border-Radius Invariant (Strictly 0px / No border-radius > 0)...');

const cssFiles = [
  'src/views/BlogIndex.css',
  'src/views/BlogArticle.css',
  'src/views/BlogCategory.css',
];

let nonZeroBorderRadiusFound = [];

for (const relPath of cssFiles) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${relPath}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const decls = parseCssDeclarations(content, relPath);

  decls.forEach(d => {
    if (d.property === 'border-radius' || d.property.endsWith('-radius')) {
      // Check if value is strictly 0, 0px, 0rem, 0%, or none
      const cleanVal = d.value.replace(/!important/g, '').trim();
      const isZero = /^0(px|rem|em|%)?$/.test(cleanVal) || cleanVal === 'none';
      if (!isZero) {
        nonZeroBorderRadiusFound.push(d);
      }
    }
  });
}

if (nonZeroBorderRadiusFound.length === 0) {
  recordTest('Strict 0px border-radius invariant across all blog CSS files', true);
} else {
  const details = nonZeroBorderRadiusFound
    .map(d => `${d.file}:${d.line} -> "${d.rawLine}"`)
    .join('; ');
  recordTest('Strict 0px border-radius invariant across all blog CSS files', false, details);
  findings.push({
    category: 'border-radius',
    severity: 'CRITICAL',
    description: `Found ${nonZeroBorderRadiusFound.length} instance(s) of border-radius > 0`,
    items: nonZeroBorderRadiusFound,
  });
}

// =============================================================================
// TEST SUITE 2: Box-Shadow & Drop-Shadow Invariant (Zero instances)
// =============================================================================
console.log('\n>>> [TEST SUITE 2] Box-Shadow and Drop-Shadow Invariant (Strictly Zero)...');

let shadowsFound = [];

for (const relPath of cssFiles) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  const decls = parseCssDeclarations(content, relPath);

  decls.forEach(d => {
    if (d.property === 'box-shadow') {
      const cleanVal = d.value.replace(/!important/g, '').trim().toLowerCase();
      if (cleanVal !== 'none' && cleanVal !== '0') {
        shadowsFound.push(d);
      }
    }
    if (d.value.toLowerCase().includes('drop-shadow')) {
      shadowsFound.push(d);
    }
  });
}

if (shadowsFound.length === 0) {
  recordTest('Zero box-shadow and zero drop-shadow across all blog CSS files', true);
} else {
  const details = shadowsFound
    .map(d => `${d.file}:${d.line} -> "${d.rawLine}"`)
    .join('; ');
  recordTest('Zero box-shadow and zero drop-shadow across all blog CSS files', false, details);
  findings.push({
    category: 'shadows',
    severity: 'CRITICAL',
    description: `Found ${shadowsFound.length} box-shadow/drop-shadow instance(s)`,
    items: shadowsFound,
  });
}

// =============================================================================
// TEST SUITE 3: Design Token Enforcement (All colors use var(--color-*))
// =============================================================================
console.log('\n>>> [TEST SUITE 3] Color Design Token Invariant (var(--color-*))...');

// Properties that specify colors
const colorProperties = new Set([
  'color',
  'background-color',
  'border-color',
  'border-top-color',
  'border-bottom-color',
  'border-left-color',
  'border-right-color',
  'outline-color',
  'fill',
  'stroke',
]);

// Color keywords that are standard CSS / transparent
const allowedKeywords = new Set([
  'transparent',
  'currentcolor',
  'inherit',
  'initial',
  'unset',
  'none',
]);

let literalColorsFound = [];

for (const relPath of cssFiles) {
  const fullPath = path.join(projectRoot, relPath);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  const decls = parseCssDeclarations(content, relPath);

  decls.forEach(d => {
    const val = d.value.toLowerCase();

    // Check dedicated color properties
    if (colorProperties.has(d.property)) {
      if (allowedKeywords.has(val)) return;

      // Must contain var(--color-
      if (!val.includes('var(--color-')) {
        literalColorsFound.push({
          ...d,
          reason: `Property "${d.property}" does not use var(--color-*)`,
        });
      }
    }

    // Check shorthand properties: 'background', 'border', 'border-top', etc.
    if (['background', 'border', 'border-top', 'border-bottom', 'border-left', 'border-right'].includes(d.property)) {
      if (allowedKeywords.has(val)) return;

      // Detect raw hex values (#111827, #fff, etc.)
      const hexMatch = val.match(/#[0-9a-f]{3,8}\b/i);
      // Detect rgb() or rgba()
      const rgbMatch = val.match(/rgba?\([^)]+\)/i);
      // Detect hsl() or hsla()
      const hslMatch = val.match(/hsla?\([^)]+\)/i);

      if (hexMatch) {
        literalColorsFound.push({
          ...d,
          reason: `Literal hex color "${hexMatch[0]}" used instead of var(--color-*)`,
        });
      } else if (rgbMatch) {
        literalColorsFound.push({
          ...d,
          reason: `Literal rgb/rgba "${rgbMatch[0]}" used instead of var(--color-*)`,
        });
      } else if (hslMatch) {
        literalColorsFound.push({
          ...d,
          reason: `Literal hsl/hsla "${hslMatch[0]}" used instead of var(--color-*)`,
        });
      }
    }
  });
}

if (literalColorsFound.length === 0) {
  recordTest('All colors strictly use var(--color-*) design tokens', true);
} else {
  console.log(`    ! Found ${literalColorsFound.length} instances of non-token color declarations:`);
  literalColorsFound.slice(0, 10).forEach(d => {
    console.log(`      • ${d.file}:${d.line} [${d.property}] -> ${d.rawLine} (${d.reason})`);
  });
  if (literalColorsFound.length > 10) {
    console.log(`      ... and ${literalColorsFound.length - 10} more`);
  }
  recordTest(
    'All colors strictly use var(--color-*) design tokens',
    false,
    `${literalColorsFound.length} literal color instance(s) detected (e.g. #fff, #111827, rgba)`
  );
  findings.push({
    category: 'colors',
    severity: 'MEDIUM',
    description: `CSS rules contain ${literalColorsFound.length} literal hex / rgba declarations instead of var(--color-*) tokens`,
    items: literalColorsFound,
  });
}

// =============================================================================
// TEST SUITE 4: Aspect-Ratio 16 / 9 on All Image Containers
// =============================================================================
console.log('\n>>> [TEST SUITE 4] Image Container Aspect-Ratio Invariant (aspect-ratio: 16 / 9)...');

const requiredImageContainers = [
  { file: 'src/views/BlogIndex.css', selector: '.featured-card__media' },
  { file: 'src/views/BlogIndex.css', selector: '.article-card__media' },
  { file: 'src/views/BlogArticle.css', selector: '.article-banner__media' },
  { file: 'src/views/BlogArticle.css', selector: '.article-diagram__media' },
];

let missingAspectRatio = [];

for (const container of requiredImageContainers) {
  const fullPath = path.join(projectRoot, container.file);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Find block for selector
  const regex = new RegExp(`${container.selector.replace('.', '\\.')}\\s*\\{([^}]+)\\}`, 'm');
  const match = content.match(regex);

  if (!match) {
    missingAspectRatio.push({ ...container, reason: 'Selector block not found in CSS' });
  } else {
    const blockContent = match[1];
    const hasAspectRatio =
      blockContent.includes('aspect-ratio: 16 / 9') ||
      blockContent.includes('aspect-ratio: 16/9') ||
      blockContent.includes('aspect-ratio:16/9');

    if (!hasAspectRatio) {
      missingAspectRatio.push({ ...container, reason: 'Missing aspect-ratio: 16 / 9' });
    }
  }
}

if (missingAspectRatio.length === 0) {
  recordTest('Explicit aspect-ratio: 16 / 9 on all blog media image containers', true);
} else {
  const details = missingAspectRatio.map(c => `${c.file} ${c.selector} (${c.reason})`).join('; ');
  recordTest('Explicit aspect-ratio: 16 / 9 on all blog media image containers', false, details);
  findings.push({
    category: 'aspect-ratio',
    severity: 'HIGH',
    description: `Missing aspect-ratio: 16 / 9 on ${missingAspectRatio.length} container(s)`,
    items: missingAspectRatio,
  });
}

// =============================================================================
// TEST SUITE 5: <img> Tags Explicit width, height, and loading Attributes
// =============================================================================
console.log('\n>>> [TEST SUITE 5] Component <img> Attributes Verification (width, height, loading)...');

const viewFiles = [
  'src/views/BlogIndex.tsx',
  'src/views/BlogArticle.tsx',
  'src/views/BlogCategory.tsx',
];

function extractImgTags(sourceCode, fileName) {
  const imgRegex = /<img\b([^>]*)\/?>/gs;
  const imgs = [];
  let match;

  while ((match = imgRegex.exec(sourceCode)) !== null) {
    const rawTag = match[0];
    const attrs = match[1];

    // Compute line number
    const line = sourceCode.substring(0, match.index).split('\n').length;

    // Check width, height, loading
    const hasWidth = /\bwidth\s*=\s*[{'"]/.test(attrs);
    const hasHeight = /\bheight\s*=\s*[{'"]/.test(attrs);
    const hasLoading = /\bloading\s*=\s*[{'"]/.test(attrs);

    // Extract className or role
    const classMatch = attrs.match(/\bclassName\s*=\s*["']([^"']+)["']/);
    const className = classMatch ? classMatch[1] : 'unspecified';

    imgs.push({
      file: fileName,
      line,
      className,
      hasWidth,
      hasHeight,
      hasLoading,
      rawTag: rawTag.replace(/\s+/g, ' ').trim(),
    });
  }

  return imgs;
}

let allImgs = [];
for (const relPath of viewFiles) {
  const fullPath = path.join(projectRoot, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  allImgs = allImgs.concat(extractImgTags(content, relPath));
}

console.log(`  Identified ${allImgs.length} <img> tags across blog view components:`);
const imgDimensionsMissing = [];
const imgLoadingMissing = [];

allImgs.forEach(img => {
  const isDimOk = img.hasWidth && img.hasHeight;
  const isLoadOk = img.hasLoading;

  console.log(`  - [${img.file}:${img.line}] class="${img.className}": width=${img.hasWidth}, height=${img.hasHeight}, loading=${img.hasLoading}`);

  if (!isDimOk) {
    imgDimensionsMissing.push(img);
  }
  if (!isLoadOk) {
    imgLoadingMissing.push(img);
  }
});

// Dimension test
if (imgDimensionsMissing.length === 0) {
  recordTest('All <img> tags declare explicit width and height attributes', true);
} else {
  const details = imgDimensionsMissing.map(i => `${i.file}:${i.line} (${i.className})`).join('; ');
  recordTest('All <img> tags declare explicit width and height attributes', false, details);
  findings.push({
    category: 'img-dimensions',
    severity: 'HIGH',
    description: `${imgDimensionsMissing.length} <img> tag(s) missing width or height`,
    items: imgDimensionsMissing,
  });
}

// Loading test
if (imgLoadingMissing.length === 0) {
  recordTest('All <img> tags declare explicit loading attribute (eager or lazy)', true);
} else {
  const details = imgLoadingMissing.map(i => `${i.file}:${i.line} (${i.className})`).join('; ');
  recordTest(
    'All <img> tags declare explicit loading attribute (eager or lazy)',
    false,
    `${imgLoadingMissing.length} <img> tag(s) lack loading attribute: ${details}`
  );
  findings.push({
    category: 'img-loading',
    severity: 'LOW',
    description: `${imgLoadingMissing.length} author avatar <img> tag(s) omit explicit loading attribute`,
    items: imgLoadingMissing,
  });
}

// =============================================================================
// TEST SUITE 6: Verification of Compiled Production Bundles in dist/
// =============================================================================
console.log('\n>>> [TEST SUITE 6] Production Bundle Verification (dist/ assets)...');

const distCssFiles = fs.readdirSync(path.join(projectRoot, 'dist/assets')).filter(f => f.endsWith('.css'));
if (distCssFiles.length > 0) {
  const distCssContent = fs.readFileSync(path.join(projectRoot, 'dist/assets', distCssFiles[0]), 'utf8');

  // Check if dist CSS contains aspect-ratio: 16 / 9
  const hasAspectRatioInDist = distCssContent.includes('aspect-ratio:16/9') || distCssContent.includes('aspect-ratio: 16/9') || distCssContent.includes('aspect-ratio:16 / 9');
  recordTest('Production CSS bundle contains aspect-ratio:16/9', hasAspectRatioInDist);

  // Check for box-shadow in dist CSS
  // Note: the whole site may or may not have box-shadow, let's check if .article- or .blog- has it
  const blogShadowRegex = /\.(blog|article|category|featured-card)[^\{]*\{[^}]*box-shadow:(?!none)/g;
  const distShadowMatch = distCssContent.match(blogShadowRegex);
  recordTest('Zero box-shadow on blog classes in production CSS bundle', !distShadowMatch);
} else {
  console.warn('No dist CSS bundle found.');
}

// =============================================================================
// Summary & Structured Output
// =============================================================================
console.log('\n' + '='.repeat(70));
console.log('                 CHALLENGE VERIFICATION SUMMARY                 ');
console.log('='.repeat(70));
console.log(`Total Invariant Checks : ${totalTests}`);
console.log(`Passed                 : ${passedTests}`);
console.log(`Failed / Flagged       : ${failedTests}`);
console.log(`Total Findings         : ${findings.length}`);
console.log('='.repeat(70));

const summary = {
  timestamp: new Date().toISOString(),
  totalTests,
  passedTests,
  failedTests,
  findings,
};

fs.writeFileSync(
  path.join(projectRoot, 'scratch/test-suite/challenge-m1-styling-results.json'),
  JSON.stringify(summary, null, 2),
  'utf8'
);
console.log(`Results saved to scratch/test-suite/challenge-m1-styling-results.json\n`);
