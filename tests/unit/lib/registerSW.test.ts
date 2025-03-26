import { registerServiceWorker } from '@/lib/registerSW';

describe('Service Worker Registration', () => {
  const mockRegister = jest.fn();
  const mockSync = { register: jest.fn() };
  const mockPushManager = { subscribe: jest.fn() };
  const mockRegistration = {
    sync: mockSync,
    pushManager: mockPushManager,
    update: jest.fn(),
    addEventListener: jest.fn(),
  };

  let originalNavigator: any;

  beforeAll(() => {
    originalNavigator = global.navigator;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window.navigator.serviceWorker
    Object.defineProperty(global, 'navigator', {
      value: {
        serviceWorker: {
          register: mockRegister.mockResolvedValue(mockRegistration),
          ready: Promise.resolve(mockRegistration),
          controller: { state: 'activated' },
        },
      },
      configurable: true,
      writable: true,
    });

    // Mock window.Notification
    Object.defineProperty(global, 'Notification', {
      value: {
        permission: 'granted',
        requestPermission: jest.fn().mockResolvedValue('granted'),
      },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    // Restore original navigator
    Object.defineProperty(global, 'navigator', {
      value: originalNavigator,
      configurable: true,
      writable: true,
    });
  });

  it('should register service worker in browser environment', async () => {
    await registerServiceWorker();
    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
  });

  it('should not register service worker if not in browser environment', async () => {
    // Remove serviceWorker from navigator to simulate non-browser environment
    Object.defineProperty(global, 'navigator', {
      value: {},
      configurable: true,
      writable: true,
    });

    await registerServiceWorker();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('should register background sync if supported', async () => {
    mockRegister.mockResolvedValueOnce(mockRegistration);
    await registerServiceWorker();
    expect(mockSync.register).toHaveBeenCalledWith('sync-requests');
  });

  it('should handle push notification subscription', async () => {
    mockRegister.mockResolvedValueOnce(mockRegistration);
    mockPushManager.subscribe.mockResolvedValueOnce({ endpoint: 'test-endpoint' });
    
    await registerServiceWorker();
    
    expect(mockPushManager.subscribe).toHaveBeenCalledWith({
      userVisibleOnly: true,
      applicationServerKey: undefined,
    });
  });

  it('should handle push notification subscription failure', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockPushManager.subscribe.mockRejectedValueOnce(new Error('Subscription failed'));

    await registerServiceWorker();
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to subscribe to push notifications:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });

  it('should handle service worker updates', async () => {
    mockRegistration.addEventListener.mockImplementation((event, callback) => {
      if (event === 'updatefound') {
        callback();
      }
    });

    await registerServiceWorker();

    expect(mockRegistration.update).toHaveBeenCalled();
  });
}); 