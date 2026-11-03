/**
 * Evostackr Blog System — Test Utilities & Assertion Helpers
 * 
 * Provides assertions, XML parsing, Schema.org verification,
 * and RFC 822 / ISO 8601 validators for the 4-tier E2E test suite.
 */

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// import.meta.dirname is <root>/scratch/test-suite/utils -> go up 3 levels to reach project root
export const PROJECT_ROOT = path.resolve(import.meta.dirname, '../../..');

export class AssertionError extends Error {
  constructor(message, actual, expected) {
    super(message);
    this.name = 'AssertionError';
    this.actual = actual;
    this.expected = expected;
  }
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, condition, true);
  }
}

export function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    const msg = message || `Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`;
    throw new AssertionError(msg, actual, expected);
  }
}

export function assertMatch(str, regex, message) {
  if (typeof str !== 'string' || !regex.test(str)) {
    const msg = message || `Expected "${str}" to match ${regex}`;
    throw new AssertionError(msg, str, regex.toString());
  }
}

export function assertIncludes(container, item, message) {
  const includes = Array.isArray(container)
    ? container.includes(item)
    : typeof container === 'string'
      ? container.includes(item)
      : false;
  if (!includes) {
    const msg = message || `Expected ${JSON.stringify(container)} to include ${JSON.stringify(item)}`;
    throw new AssertionError(msg, container, item);
  }
}

export function assertTrue(val, message = 'Expected true') {
  assertEqual(val, true, message);
}

export function assertFalse(val, message = 'Expected false') {
  assertEqual(val, false, message);
}

export function readProjectFile(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File does not exist: ${relPath} (Full path: ${fullPath})`);
  }
  return fs.readFileSync(fullPath, 'utf-8');
}

export function projectFileExists(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  return fs.existsSync(fullPath);
}

/**
 * Dynamically imports a TypeScript/JavaScript module on Windows/Linux using file:// URLs
 */
export async function importProjectModule(relPath) {
  const fullPath = path.resolve(PROJECT_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Cannot import module, file does not exist: ${relPath}`);
  }
  const fileUrl = pathToFileURL(fullPath).href;
  return await import(fileUrl);
}

/**
 * Validates RFC 822 / RFC 2822 date string format (e.g. "Tue, 03 Nov 2026 10:00:00 GMT")
 */
export function isValidRfc822Date(dateStr) {
  if (typeof dateStr !== 'string') return false;
  // RFC 822 / 2822 format: DayName, DD Mon YYYY HH:MM:SS Timezone
  const rfc822Regex = /^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s+\d{2}:\d{2}:\d{2}\s+(?:GMT|[+-]\d{4})$/;
  if (!rfc822Regex.test(dateStr.trim())) return false;
  const parsed = Date.parse(dateStr);
  return !isNaN(parsed);
}

/**
 * Validates ISO 8601 date string format (e.g. "2026-11-03T10:00:00Z")
 */
export function isValidIso8601Date(dateStr) {
  if (typeof dateStr !== 'string') return false;
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
  if (!isoRegex.test(dateStr.trim())) return false;
  const parsed = Date.parse(dateStr);
  return !isNaN(parsed);
}

/**
 * Lightweight, robust XML Parser and Well-Formedness Validator
 */
export function parseAndValidateXml(xmlContent, filename = 'XML') {
  assert(typeof xmlContent === 'string' && xmlContent.length > 0, `${filename} content is empty`);
  
  // 1. Must contain XML declaration
  assertMatch(
    xmlContent,
    /^\s*<\?xml\s+version=["']1\.0["'](\s+encoding=["'][^"']+["'])?\s*\?>/i,
    `${filename} missing valid XML declaration <?xml version="1.0" ... ?>`
  );

  // 2. Well-formedness check: tags balance
  const tagStack = [];
  const tokenRegex = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>|<(\/)?([a-zA-Z0-9_:-]+)([^>]*?)(\/)?>/g;
  let match;
  let hasRootTag = false;

  while ((match = tokenRegex.exec(xmlContent)) !== null) {
    const [fullMatch, isClosing, tagName, attrs, isSelfClosing] = match;
    
    // Skip comments, CDATA, processing instructions
    if (fullMatch.startsWith('<!--') || fullMatch.startsWith('<![CDATA[') || fullMatch.startsWith('<?')) {
      continue;
    }

    if (isClosing) {
      if (tagStack.length === 0) {
        throw new Error(`${filename} syntax error: unexpected closing tag </${tagName}> without matching open tag`);
      }
      const lastTag = tagStack.pop();
      if (lastTag !== tagName) {
        throw new Error(`${filename} syntax error: mismatched closing tag </${tagName}>, expected </${lastTag}>`);
      }
    } else if (isSelfClosing || attrs.trim().endsWith('/')) {
      hasRootTag = true;
    } else {
      tagStack.push(tagName);
      hasRootTag = true;
    }
  }

  if (tagStack.length > 0) {
    throw new Error(`${filename} syntax error: unclosed XML tags remaining: ${tagStack.join(', ')}`);
  }
  assert(hasRootTag, `${filename} must contain at least one root element`);

  return {
    raw: xmlContent,
    extractAllTags(tagName) {
      const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
      const results = [];
      let m;
      while ((m = regex.exec(xmlContent)) !== null) {
        results.push(m[1].trim());
      }
      return results;
    },
    extractTagValues(tagName) {
      const regex = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'gi');
      const values = [];
      let m;
      while ((m = regex.exec(xmlContent)) !== null) {
        let val = m[1].trim();
        // Unwrap CDATA if present
        const cdataMatch = val.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
        if (cdataMatch) {
          val = cdataMatch[1].trim();
        }
        values.push(val);
      }
      return values;
    }
  };
}

/**
 * Validates Schema.org BlogPosting object
 */
export function validateSchemaOrgBlogPosting(schema, contextName = 'BlogPosting') {
  assert(schema && typeof schema === 'object', `${contextName}: schema must be an object`);
  assert(
    schema['@context'] === 'https://schema.org' || schema['@context'] === 'http://schema.org',
    `${contextName}: @context must be "https://schema.org"`
  );
  assert(
    schema['@type'] === 'BlogPosting' || (Array.isArray(schema['@type']) && schema['@type'].includes('BlogPosting')),
    `${contextName}: @type must be "BlogPosting"`
  );
  assert(typeof schema.headline === 'string' && schema.headline.trim().length > 0, `${contextName}: headline is required`);
  assert(schema.image, `${contextName}: image is required`);
  assert(isValidIso8601Date(schema.datePublished), `${contextName}: datePublished must be ISO 8601`);
  assert(isValidIso8601Date(schema.dateModified), `${contextName}: dateModified must be ISO 8601`);
  assert(schema.author && typeof schema.author === 'object', `${contextName}: author must be an object`);
  assert(typeof schema.author.name === 'string' && schema.author.name.length > 0, `${contextName}: author.name is required`);
  assert(schema.publisher && typeof schema.publisher === 'object', `${contextName}: publisher must be an object`);
  assert(schema.publisher.name === 'Evostackr', `${contextName}: publisher.name must be "Evostackr"`);
  assert(
    typeof schema.description === 'string' && schema.description.length > 0,
    `${contextName}: description is required`
  );
  assert(schema.mainEntityOfPage, `${contextName}: mainEntityOfPage is required`);
}

/**
 * Validates Schema.org BreadcrumbList object
 */
export function validateSchemaOrgBreadcrumbList(schema, contextName = 'BreadcrumbList') {
  assert(schema && typeof schema === 'object', `${contextName}: schema must be an object`);
  assert(
    schema['@context'] === 'https://schema.org' || schema['@context'] === 'http://schema.org',
    `${contextName}: @context must be "https://schema.org"`
  );
  assert(schema['@type'] === 'BreadcrumbList', `${contextName}: @type must be "BreadcrumbList"`);
  assert(Array.isArray(schema.itemListElement), `${contextName}: itemListElement must be an array`);
  assert(schema.itemListElement.length >= 2, `${contextName}: breadcrumbs must have at least 2 items`);

  schema.itemListElement.forEach((item, index) => {
    assert(item['@type'] === 'ListItem', `${contextName}[${index}]: @type must be "ListItem"`);
    assert(item.position === index + 1, `${contextName}[${index}]: position must be ${index + 1}`);
    assert(typeof item.name === 'string' && item.name.length > 0, `${contextName}[${index}]: name required`);
    assert(typeof item.item === 'string' && item.item.length > 0, `${contextName}[${index}]: item URL required`);
  });
}
