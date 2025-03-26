/** @jest-environment jsdom */
import '@testing-library/jest-dom';
import React from 'react';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import type { ImageProps } from 'next/image';
import type { JSX } from 'react';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    query: {},
    pathname: '/',
    route: '/',
    asPath: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage(props: Partial<ImageProps>): JSX.Element {
    return React.createElement('img', { 'data-testid': 'next-image', ...props });
  }
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: function MotionDiv({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('div', { 'data-testid': 'motion-div', ...props }, children);
    },
    span: function MotionSpan({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('span', { 'data-testid': 'motion-span', ...props }, children);
    },
    h1: function MotionH1({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('h1', { 'data-testid': 'motion-h1', ...props }, children);
    },
    h2: function MotionH2({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('h2', { 'data-testid': 'motion-h2', ...props }, children);
    },
    p: function MotionP({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('p', { 'data-testid': 'motion-p', ...props }, children);
    },
    section: function MotionSection({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('section', { 'data-testid': 'motion-section', ...props }, children);
    },
    li: function MotionLi({ children, ...props }: { children?: React.ReactNode; [key: string]: any }): JSX.Element {
      return React.createElement('li', { 'data-testid': 'motion-li', ...props }, children);
    },
  },
  AnimatePresence: function AnimatePresence({ children }: { children?: React.ReactNode }): JSX.Element {
    return React.createElement(React.Fragment, null, children);
  },
  useScroll: () => ({ scrollY: { get: () => 0 } }),
  useTransform: () => 0,
}));

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock sonner
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  Toaster: () => null,
}));

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor() {
    return this;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// Mock ResizeObserver
class MockResizeObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  constructor() {
    return this;
  }
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: MockResizeObserver,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock getComputedStyle
window.getComputedStyle = jest.fn().mockImplementation(() => ({
  getPropertyValue: jest.fn(),
  transform: 'perspective(1000px)',
}));

// Mock navigator.serviceWorker
Object.defineProperty(window.navigator, 'serviceWorker', {
  writable: true,
  value: {
    register: jest.fn().mockResolvedValue({ scope: '/' }),
    ready: Promise.resolve({
      active: {
        postMessage: jest.fn(),
      },
    }),
  },
});

// Mock TextEncoder/TextDecoder
class MockTextEncoder {
  encode(input: string): Uint8Array {
    return new Uint8Array(Buffer.from(input));
  }
}

class MockTextDecoder {
  decode(input?: Uint8Array): string {
    return input ? Buffer.from(input).toString() : '';
  }
}

Object.defineProperty(global, 'TextEncoder', {
  writable: true,
  configurable: true,
  value: MockTextEncoder,
});

Object.defineProperty(global, 'TextDecoder', {
  writable: true,
  configurable: true,
  value: MockTextDecoder,
});

// Mock DOM APIs
class MockMutationObserver implements MutationObserver {
  disconnect = jest.fn();
  observe = jest.fn();
  takeRecords = jest.fn(() => []);
  callback: MutationCallback;

  constructor(callback: MutationCallback) {
    this.callback = callback;
  }
}

class MockDOMRect implements DOMRect {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  top = 0;
  right = 0;
  bottom = 0;
  left = 0;
  toJSON() { return {}; }
}

global.MutationObserver = MockMutationObserver as unknown as typeof MutationObserver;
global.DOMRect = MockDOMRect as unknown as typeof DOMRect;

// Mock Headers with proper interface implementation
interface HeadersIterator<T> extends IterableIterator<T> {
  map<U>(fn: (value: T, index: number) => U): U[];
  filter(fn: (value: T) => boolean): T[];
  take(n: number): T[];
  drop(n: number): T[];
  flatMap<U>(fn: (value: T) => U): U[];
  reduce<U>(fn: (acc: U, value: T) => U, initial: U): U;
  toArray(): T[];
  forEach(fn: (value: T) => void): void;
  find(fn: (value: T) => boolean): T | undefined;
  findIndex(fn: (value: T) => boolean): number;
  findLast?(fn: (value: T) => boolean): T | undefined;
  findLastIndex?(fn: (value: T) => boolean): number;
  some(fn: (value: T) => boolean): boolean;
  every(fn: (value: T) => boolean): boolean;
  includes(value: T): boolean;
  [Symbol.toStringTag]: string;
  [Symbol.dispose](): void;
}

class MockHeaders implements Headers {
  private headers: Map<string, string>;

  constructor(init?: HeadersInit) {
    this.headers = new Map();
    if (init) {
      if (init instanceof MockHeaders) {
        this.headers = new Map(init.headers);
      } else if (Array.isArray(init)) {
        init.forEach(([key, value]) => this.append(key, value));
      } else {
        Object.entries(init).forEach(([key, value]) => this.append(key, value));
      }
    }
  }

  append(name: string, value: string): void {
    this.headers.set(name.toLowerCase(), value);
  }

  delete(name: string): void {
    this.headers.delete(name.toLowerCase());
  }

  get(name: string): string | null {
    return this.headers.get(name.toLowerCase()) || null;
  }

  has(name: string): boolean {
    return this.headers.has(name.toLowerCase());
  }

  set(name: string, value: string): void {
    this.headers.set(name.toLowerCase(), value);
  }

  forEach(callbackfn: (value: string, key: string, parent: Headers) => void): void {
    this.headers.forEach((value, key) => callbackfn(value, key, this));
  }

  entries(): HeadersIterator<[string, string]> {
    const entries = Array.from(this.headers.entries());
    return this.createIterator(entries);
  }

  keys(): HeadersIterator<string> {
    const keys = Array.from(this.headers.keys());
    return this.createIterator(keys);
  }

  values(): HeadersIterator<string> {
    const values = Array.from(this.headers.values());
    return this.createIterator(values);
  }

  [Symbol.iterator](): HeadersIterator<[string, string]> {
    return this.entries();
  }

  getSetCookie(): string[] {
    return [];
  }

  private createIterator<T>(array: T[]): HeadersIterator<T> {
    let index = 0;
    const iterator: HeadersIterator<T> = {
      next: () => {
        if (index >= array.length) {
          return { done: true, value: undefined };
        }
        return { done: false, value: array[index++] };
      },
      [Symbol.iterator]: () => iterator,
      map: <U>(fn: (value: T, index: number) => U) => array.map(fn),
      filter: (fn: (value: T) => boolean) => array.filter(fn),
      take: (n: number) => array.slice(0, n),
      drop: (n: number) => array.slice(n),
      flatMap: <U>(fn: (value: T) => U) => array.flatMap(fn),
      reduce: <U>(fn: (acc: U, value: T) => U, initial: U) => array.reduce(fn, initial),
      toArray: () => array,
      forEach: (fn: (value: T) => void) => array.forEach(fn),
      find: (fn: (value: T) => boolean) => array.find(fn),
      findIndex: (fn: (value: T) => boolean) => array.findIndex(fn),
      findLast: (fn: (value: T) => boolean) => array.findLast?.(fn),
      findLastIndex: (fn: (value: T) => boolean) => array.findLastIndex?.(fn),
      some: (fn: (value: T) => boolean) => array.some(fn),
      every: (fn: (value: T) => boolean) => array.every(fn),
      includes: (value: T) => array.includes(value),
      [Symbol.toStringTag]: 'HeadersIterator',
      [Symbol.dispose]: () => {},
    };
    return iterator;
  }
}

// Mock Response with proper interface implementation
class MockResponse implements Response {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  private bodyContent: string | null;
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;

  constructor(body?: BodyInit | null, init: ResponseInit = {}) {
    this.headers = new MockHeaders(init.headers);
    this.ok = init.status ? init.status >= 200 && init.status < 300 : true;
    this.redirected = false;
    this.status = init.status || 200;
    this.statusText = init.statusText || 'OK';
    this.type = 'default';
    this.url = '';
    this.bodyContent = body ? String(body) : null;
    this.body = null;
    this.bodyUsed = false;
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  async blob(): Promise<Blob> {
    return new Blob();
  }

  async formData(): Promise<FormData> {
    return new FormData();
  }

  async json(): Promise<any> {
    return this.bodyContent ? JSON.parse(this.bodyContent) : null;
  }

  async text(): Promise<string> {
    return this.bodyContent || '';
  }

  clone(): Response {
    return new MockResponse(this.bodyContent, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText,
    });
  }

  get bytes(): () => Promise<Uint8Array> {
    return () => Promise.resolve(new Uint8Array());
  }
}

// Mock Request with proper interface implementation
class MockRequest implements Request {
  readonly cache: RequestCache;
  readonly credentials: RequestCredentials;
  readonly destination: RequestDestination;
  readonly headers: Headers;
  readonly integrity: string;
  readonly keepalive: boolean;
  readonly method: string;
  readonly mode: RequestMode;
  readonly redirect: RequestRedirect;
  readonly referrer: string;
  readonly referrerPolicy: ReferrerPolicy;
  readonly signal: AbortSignal;
  private _url: string;
  readonly body: ReadableStream<Uint8Array> | null;
  readonly bodyUsed: boolean;

  constructor(input: RequestInfo | URL, init: RequestInit = {}) {
    this.cache = init.cache || 'default';
    this.credentials = init.credentials || 'same-origin';
    this.destination = 'document';
    this.headers = new MockHeaders(init.headers);
    this.integrity = '';
    this.keepalive = init.keepalive || false;
    this.method = init.method || 'GET';
    this.mode = init.mode || 'cors';
    this.redirect = init.redirect || 'follow';
    this.referrer = init.referrer || 'about:client';
    this.referrerPolicy = init.referrerPolicy || 'no-referrer';
    this.signal = init.signal || new AbortController().signal;
    this._url = typeof input === 'string' ? input : input.toString();
    this.body = null;
    this.bodyUsed = false;
  }

  get url(): string {
    return this._url;
  }

  clone(): Request {
    return new MockRequest(this.url, {
      method: this.method,
      headers: this.headers,
      mode: this.mode,
      credentials: this.credentials,
      cache: this.cache,
      redirect: this.redirect,
      referrerPolicy: this.referrerPolicy,
      signal: this.signal,
    });
  }

  async arrayBuffer(): Promise<ArrayBuffer> {
    return new ArrayBuffer(0);
  }

  async blob(): Promise<Blob> {
    return new Blob();
  }

  async formData(): Promise<FormData> {
    return new FormData();
  }

  async json(): Promise<any> {
    return null;
  }

  async text(): Promise<string> {
    return '';
  }

  get bytes(): () => Promise<Uint8Array> {
    return () => Promise.resolve(new Uint8Array());
  }
}

// Mock fetch
global.fetch = jest.fn().mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
  return Promise.resolve(new MockResponse());
});

global.Headers = MockHeaders as any;
global.Response = MockResponse as any;
global.Request = MockRequest as any;

// Create root element for testing
if (typeof document !== 'undefined') {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

// Create a custom render function
const render = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderResult => {
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.Fragment, null, children);
  };

  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
};

// Override render method
export { render };