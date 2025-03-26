/// <reference lib="webworker" />

declare interface SyncEvent extends ExtendableEvent {
  tag: string;
}

declare interface PushEvent extends ExtendableEvent {
  data: PushMessageData;
}

declare interface PushMessageData {
  text(): string;
}

declare interface NotificationEvent extends ExtendableEvent {
  notification: Notification;
  action: string;
}

declare interface ServiceWorkerGlobalScope {
  registration: ServiceWorkerRegistration;
  clients: Clients;
  skipWaiting(): Promise<void>;
} 