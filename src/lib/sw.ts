/// <reference lib="webworker" />
/// <reference lib="dom" />

declare const self: ServiceWorkerGlobalScope;

interface ExtendableEvent extends Event {
  waitUntil(promise: Promise<any>): void;
}

interface NotificationAction {
  action: string;
  title: string;
}

// Service worker code
const CACHE_NAME = 'caipo-static-v1';
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/manifest.json',
  '/site.webmanifest',
];

// Install event - precache static assets
self.addEventListener('install', ((event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
}) as EventListener);

// Activate event - clean up old caches
self.addEventListener('activate', ((event: ExtendableEvent) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      }),
      self.clients.claim(),
    ])
  );
}) as EventListener);

// Fetch event - handle different caching strategies
self.addEventListener('fetch', ((event: FetchEvent) => {
  const url = new URL(event.request.url);
  
  // Cache-first strategy for static assets
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Network-first strategy for HTML pages
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/offline').then(response => {
            if (response) return response;
            throw new Error('No offline page available');
          });
        })
    );
    return;
  }

  // Stale-while-revalidate strategy for API requests
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Pass through all other requests
  event.respondWith(fetch(event.request));
}) as EventListener);

// Background sync event
interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
}

// Helper function for background sync
export const syncRequests = async (): Promise<void> => {
  // Implement your sync logic here
  // For example, sync offline form submissions
  console.log('Syncing requests...');
};

self.addEventListener('sync', ((event: SyncEvent) => {
  if (event.tag === 'sync-requests') {
    event.waitUntil(syncRequests());
  }
}) as EventListener);

// Push notification event
interface PushEvent extends ExtendableEvent {
  readonly data: PushMessageData | null;
}

interface PushMessageData {
  text(): string;
}

self.addEventListener('push', ((event: PushEvent) => {
  const options: NotificationOptions & { actions?: NotificationAction[] } = {
    body: event.data?.text() || 'New notification',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  event.waitUntil(
    (self as unknown as ServiceWorkerGlobalScope).registration.showNotification('CAIPO Update', options)
  );
}) as EventListener);

// Notification click event
interface NotificationEvent extends ExtendableEvent {
  readonly notification: Notification;
  readonly action: string;
}

self.addEventListener('notificationclick', ((event: NotificationEvent) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
}) as EventListener);

// Export the event handlers for testing
export const eventHandlers = {
  install: (event: ExtendableEvent) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
    );
    self.skipWaiting();
  },
  activate: (event: ExtendableEvent) => {
    event.waitUntil(
      Promise.all([
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames
              .filter((name) => name !== CACHE_NAME)
              .map((name) => caches.delete(name))
          );
        }),
        self.clients.claim(),
      ])
    );
  },
  fetch: (event: FetchEvent) => {
    const url = new URL(event.request.url);
    
    // Cache-first strategy for static assets
    if (STATIC_ASSETS.includes(url.pathname)) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request).then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          });
        })
      );
      return;
    }

    // Network-first strategy for HTML pages
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .catch(() => {
            return caches.match('/offline').then(response => {
              if (response) return response;
              throw new Error('No offline page available');
            });
          })
      );
      return;
    }

    // Stale-while-revalidate strategy for API requests
    if (event.request.method === 'GET') {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
          return cachedResponse || fetchPromise;
        })
      );
      return;
    }

    // Pass through all other requests
    event.respondWith(fetch(event.request));
  },
};

// Export registration function for testing
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration;
    } catch (error) {
      console.error('Service worker registration failed:', error);
      throw error;
    }
  }
}; 