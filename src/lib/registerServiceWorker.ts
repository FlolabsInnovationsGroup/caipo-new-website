// Event emitter for service worker status
export const swStatusEmitter = new EventTarget();

export type ServiceWorkerStatus = 'installing' | 'installed' | 'updating' | null;

// Custom event for status updates
export class ServiceWorkerStatusEvent extends Event {
  constructor(public status: ServiceWorkerStatus) {
    super('statuschange');
  }
}

export async function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  try {
    // Emit initial status if service worker is already controlling the page
    if (navigator.serviceWorker.controller) {
      swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent('installed'));
      setTimeout(() => {
        swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent(null));
      }, 3000);
    }

    const registration = await navigator.serviceWorker.register('/sw.js');
    
    // Handle installation status
    if (registration.installing) {
      swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent('installing'));
      registration.installing.addEventListener('statechange', () => {
        if (registration.active) {
          swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent('installed'));
          setTimeout(() => {
            swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent(null));
          }, 3000);
        }
      });
    }

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;
      
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent('updating'));
          setTimeout(() => {
            swStatusEmitter.dispatchEvent(new ServiceWorkerStatusEvent(null));
          }, 3000);
          
          // New content is available, show update notification
          if (confirm('New version available! Would you like to update?')) {
            window.location.reload();
          }
        }
      });
    });
    
    // Register for background sync
    if ('sync' in registration && 'register' in (registration as any).sync) {
      await (registration as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } }).sync.register('sync-requests');
    }
    
    // Request notification permission
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Subscribe to push notifications
        try {
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
          });
          
          // Send subscription to backend
          await fetch('/api/push/subscribe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
          });
        } catch (err) {
          console.error('Failed to subscribe to push notifications:', err);
        }
      }
    }
    
    // Log success
    console.log('Service Worker registered successfully:', registration.scope);
    
    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
} 