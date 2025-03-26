import { jest } from '@jest/globals';
import { registerServiceWorker, swStatusEmitter, ServiceWorkerStatusEvent } from '@/lib/registerServiceWorker';

type EventListenerFn = (event: string, handler: () => void) => void;

describe('Service Worker Registration', () => {
  let mockServiceWorkerContainer: {
    register: jest.Mock;
    controller: { state: string } | null;
  };
  let originalNavigator: Navigator;
  let mockRegistration: {
    installing: {
      addEventListener: jest.Mock;
      state: string;
    } | null;
    active: boolean;
    addEventListener: jest.Mock;
    pushManager: {
      subscribe: jest.Mock;
    };
    scope: string;
  };

  beforeEach(() => {
    // Store original navigator
    originalNavigator = window.navigator;

    // Mock service worker registration
    mockRegistration = {
      installing: {
        addEventListener: jest.fn().mockImplementation((event: string, handler: () => void) => {
          // Simulate state change to active
          setTimeout(() => {
            mockRegistration.active = true;
            handler();
          }, 0);
        }),
        state: 'installed'
      },
      active: false,
      addEventListener: jest.fn(),
      pushManager: {
        subscribe: jest.fn(() => Promise.resolve({ endpoint: 'test-endpoint' }))
      },
      scope: '/test-scope'
    };

    // Mock service worker container
    mockServiceWorkerContainer = {
      register: jest.fn(() => Promise.resolve(mockRegistration)),
      controller: { state: 'activated' }
    };

    // Mock navigator.serviceWorker
    Object.defineProperty(window, 'navigator', {
      value: {
        ...window.navigator,
        serviceWorker: mockServiceWorkerContainer
      },
      configurable: true,
      writable: true
    });

    // Mock Notification API
    (global as any).Notification = {
      requestPermission: jest.fn(() => Promise.resolve('granted'))
    };

    // Mock fetch
    (global.fetch as jest.Mock) = jest.fn(() => Promise.resolve(new Response()));
  });

  afterEach(() => {
    // Restore original navigator
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true
    });
    jest.resetModules();
  });

  it('should register service worker and emit installed status when already controlled', async () => {
    const statusChangeHandler = jest.fn();
    swStatusEmitter.addEventListener('statuschange', statusChangeHandler);

    await registerServiceWorker();

    expect(mockServiceWorkerContainer.register).toHaveBeenCalledWith('/sw.js');
    expect(statusChangeHandler).toHaveBeenCalledWith(
      expect.any(ServiceWorkerStatusEvent)
    );
    const event = statusChangeHandler.mock.calls[0][0] as ServiceWorkerStatusEvent;
    expect(event.status).toBe('installed');
  });

  it('should emit installing status when service worker is installing', async () => {
    mockServiceWorkerContainer.controller = null;
    const statusChangeHandler = jest.fn();
    swStatusEmitter.addEventListener('statuschange', statusChangeHandler);

    await registerServiceWorker();

    expect(statusChangeHandler).toHaveBeenCalledWith(
      expect.any(ServiceWorkerStatusEvent)
    );
    const event = statusChangeHandler.mock.calls[0][0] as ServiceWorkerStatusEvent;
    expect(event.status).toBe('installing');
  });

  it('should emit updating status when new service worker is available', async () => {
    // Set up initial controller to simulate update scenario
    mockServiceWorkerContainer.controller = { state: 'activated' };

    mockRegistration.addEventListener = jest.fn().mockImplementation((event: string, handler: () => void) => {
      if (event === 'updatefound') {
        // Simulate update found immediately
        mockRegistration.installing = {
          addEventListener: jest.fn().mockImplementation((stateEvent: string, stateHandler: () => void) => {
            if (stateEvent === 'statechange') {
              // Simulate state change to installed immediately
              mockRegistration.installing!.state = 'installed';
              stateHandler();
            }
          }),
          state: 'installing'
        };
        handler();
      }
    });

    const statusChangeHandler = jest.fn();
    swStatusEmitter.addEventListener('statuschange', statusChangeHandler);

    await registerServiceWorker();

    // Wait for all promises to resolve
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(statusChangeHandler).toHaveBeenCalledWith(
      expect.any(ServiceWorkerStatusEvent)
    );
    
    // Find the updating status event
    const calls = statusChangeHandler.mock.calls;
    const updateEvent = calls.find(
      call => (call[0] as ServiceWorkerStatusEvent).status === 'updating'
    )?.[0] as ServiceWorkerStatusEvent;
    
    expect(updateEvent?.status).toBe('updating');
  });

  it('should request notification permission and subscribe to push notifications', async () => {
    await registerServiceWorker();

    expect(Notification.requestPermission).toHaveBeenCalled();
    expect(mockRegistration.pushManager.subscribe).toHaveBeenCalledWith({
      userVisibleOnly: true,
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    });
    expect(fetch).toHaveBeenCalledWith('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint: 'test-endpoint' }),
    });
  });
}); 