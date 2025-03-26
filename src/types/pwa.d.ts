interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
  promptCalled: boolean
}

interface Window {
  beforeinstallprompt: BeforeInstallPromptEvent | null
} 