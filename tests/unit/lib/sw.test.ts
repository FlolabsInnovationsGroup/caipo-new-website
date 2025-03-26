/// <reference lib="webworker" />
/// <reference lib="dom" />

import { jest } from '@jest/globals';

// Mock service worker types
interface MockServiceWorkerContainer {
  register: jest.Mock;
  ready: Promise<ServiceWorkerRegistration>;
  controller: { state: string };
}

interface MockServiceWorkerGlobalScope extends EventTarget {
  addEventListener: (type: string, handler: (event: Event) => void) => void;
  removeEventListener: jest.Mock;
  registration: {
    showNotification: jest.Mock;
  };
  clients: {
    openWindow: jest.Mock;
    claim: jest.Mock;
  };
  skipWaiting: jest.Mock;
  dispatchEvent: (event: Event) => boolean;
}

// Mock cache types
interface MockCache {
  match: jest.Mock;
  put: jest.Mock;
  addAll: jest.Mock;
}

interface MockCacheStorage {
  open: jest.Mock;
  keys: jest.Mock;
  delete: jest.Mock;
  match: jest.Mock;
}

// Mock classes for service worker events
class MockEvent implements Event {
  bubbles: boolean = false;
  cancelBubble: boolean = false;
  cancelable: boolean = false;
  composed: boolean = false;
  currentTarget: EventTarget | null = null;
  defaultPrevented: boolean = false;
  eventPhase: number = 0;
  isTrusted: boolean = false;
  returnValue: boolean = true;
  srcElement: EventTarget | null = null;
  target: EventTarget | null = null;
  timeStamp: number = 0;
  type: string = '';

  constructor(type: string) {
    this.type = type;
  }

  composedPath(): EventTarget[] { return []; }
  initEvent(): void {}
  preventDefault(): void {}
  stopImmediatePropagation(): void {}
  stopPropagation(): void {}

  readonly AT_TARGET = 2 as const;
  readonly BUBBLING_PHASE = 3 as const;
  readonly CAPTURING_PHASE = 1 as const;
  readonly NONE = 0 as const;
}

class MockExtendableEvent extends MockEvent implements ExtendableEvent {
  constructor(type: string) {
    super(type);
  }

  waitUntil(promise: Promise<any>): void {}
}

class MockFetchEvent extends MockExtendableEvent {
  readonly request: Request;
  readonly preloadResponse: Promise<any>;
  readonly clientId: string = '';
  readonly resultingClientId: string = '';
  readonly replacesClientId: string = '';
  readonly handled: Promise<undefined> = Promise.resolve(undefined);
  isReload: boolean = false;

  constructor(request: Request) {
    super('fetch');
    this.request = request;
    this.preloadResponse = Promise.resolve();
  }

  respondWith(response: Promise<Response> | Response): void {
    // Store the response for testing
    (this as any).response = response;
  }
}

interface ISyncEvent extends ExtendableEvent {
  readonly tag: string;
  readonly lastChance: boolean;
}

class MockSyncEvent extends MockExtendableEvent implements ISyncEvent {
  readonly tag: string;
  readonly lastChance: boolean = false;

  constructor(tag: string) {
    super('sync');
    this.tag = tag;
  }
}

class MockPushEvent extends MockExtendableEvent implements PushEvent {
  readonly data: PushMessageData | null;

  constructor(data: { text(): string }) {
    super('push');
    this.data = {
      text: data.text,
      arrayBuffer: () => new ArrayBuffer(0),
      blob: () => new Blob(),
      json: () => ({}),
      bytes: () => new Uint8Array(),
    };
  }
}

class MockNotificationEvent extends MockExtendableEvent implements NotificationEvent {
  readonly notification: Notification;
  readonly action: string;

  constructor(notification: Notification, action: string) {
    super('notificationclick');
    this.notification = notification;
    this.action = action;
  }
}

describe('Service Worker', () => {
  let mockServiceWorker: MockServiceWorkerGlobalScope;
  let mockCache: MockCache;
  let mockCaches: MockCacheStorage;
  let eventHandlers: { [key: string]: (event: Event) => void };
  let removeEventListener: jest.Mock;
  let originalNavigator: Navigator;

  beforeEach(() => {
    eventHandlers = {};
    removeEventListener = jest.fn();
  
    // Set up mock cache
    mockCache = {
      match: jest.fn(),
      put: jest.fn(() => Promise.resolve()),
      addAll: jest.fn(() => Promise.resolve()),
    };
  
    mockCaches = {
      open: jest.fn(() => Promise.resolve(mockCache)),
      keys: jest.fn(() => Promise.resolve(['old-cache-v1', 'old-cache-v2'])),
      delete: jest.fn(() => Promise.resolve(true)),
      match: jest.fn(),
    };
  
    // Set up mock service worker
    mockServiceWorker = {
      addEventListener: (type: string, handler: (event: Event) => void) => {
        eventHandlers[type] = handler;
      },
      removeEventListener,
      registration: {
        showNotification: jest.fn(),
      },
      clients: {
        openWindow: jest.fn(),
        claim: jest.fn(),
      },
      skipWaiting: jest.fn(),
      dispatchEvent: (event: Event) => {
        const handler = eventHandlers[event.type];
        if (handler) {
          handler(event);
          return true;
        }
        return false;
      },
    } as unknown as MockServiceWorkerGlobalScope;
  
    // Mock global objects
    global.caches = {
      ...mockCaches,
      match: jest.fn(() => Promise.resolve()),
    } as unknown as CacheStorage;
    global.fetch = jest.fn(() => Promise.resolve(new Response())) as unknown as typeof fetch;
    global.URL = jest.fn((url: string) => ({ pathname: '/' })) as unknown as typeof URL;
  
    // Store original navigator
    originalNavigator = window.navigator;
  
    // Mock navigator.serviceWorker
    const mockServiceWorkerContainer = {
      register: jest.fn(() => Promise.resolve({} as ServiceWorkerRegistration)),
      ready: Promise.resolve({} as ServiceWorkerRegistration),
      controller: { state: 'activated' },
    } as MockServiceWorkerContainer;
  
    // Create a new navigator object with our mock service worker
    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        serviceWorker: mockServiceWorkerContainer,
      },
      configurable: true,
      writable: true,
    });
  
    // Mock self as ServiceWorkerGlobalScope
    (global as any).self = mockServiceWorker as unknown as ServiceWorkerGlobalScope;
  
    // Load and execute the service worker code
    const swModule = require('@/lib/sw');
    if (typeof swModule === 'function') {
      swModule();
    }
  });
  
  afterEach(() => {
    // Restore original navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    });
    // Restore original self
    delete (global as any).self;
    jest.resetModules();
  });
  
  it('should register service worker', async () => {
    const { registerServiceWorker } = require('@/lib/sw');
    await registerServiceWorker();
    expect(window.navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js');
  });

  it('should handle install event and cache static assets', async () => {
    const installEvent = new MockExtendableEvent('install');
    const swModule = require('@/lib/sw');
    await swModule.eventHandlers.install(installEvent);
    
    expect(mockCaches.open).toHaveBeenCalledWith('caipo-static-v1');
    expect(mockCache.addAll).toHaveBeenCalledWith([
      '/',
      '/offline',
      '/android-chrome-192x192.png',
      '/android-chrome-512x512.png',
      '/apple-touch-icon.png',
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/manifest.json',
      '/site.webmanifest'
    ]);
    expect(mockServiceWorker.skipWaiting).toHaveBeenCalled();
  });

  it('should handle fetch events and return cached responses', async () => {
    const request = new Request('/');
    const mockResponse = new Response('test content');
    (global.caches.match as jest.Mock).mockImplementation(() => Promise.resolve(mockResponse));

    const fetchEvent = new MockFetchEvent(request);
    const { eventHandlers } = require('@/lib/sw');
    await eventHandlers.fetch(fetchEvent);

    // Wait for all promises to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(global.caches.match).toHaveBeenCalledWith(request);
    expect(global.fetch).not.toHaveBeenCalled(); // Should not fetch if cached
  });

  it('should handle fetch events and fetch from network when not cached', async () => {
    const request = new Request('/');
    const mockResponse = new Response('test content');
    (global.caches.match as jest.Mock).mockImplementation(() => Promise.resolve(null));
    (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockResponse));

    const fetchEvent = new MockFetchEvent(request);
    const { eventHandlers } = require('@/lib/sw');
    await eventHandlers.fetch(fetchEvent);

    // Wait for all promises to resolve
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(global.caches.match).toHaveBeenCalledWith(request);
    expect(global.fetch).toHaveBeenCalledWith(request);
  });

  it('should handle activate event and clean old caches', async () => {
    const activateEvent = new MockExtendableEvent('activate');
    const swModule = require('@/lib/sw');
    await swModule.eventHandlers.activate(activateEvent);

    expect(mockCaches.keys).toHaveBeenCalled();
    expect(mockCaches.delete).toHaveBeenCalledWith('old-cache-v1');
    expect(mockCaches.delete).toHaveBeenCalledWith('old-cache-v2');
    expect(mockServiceWorker.clients.claim).toHaveBeenCalled();
  });
}); 