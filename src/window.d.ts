export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: PromptResponse;
  preventDefault(): void;
  prompt(): PromptResponse;
}

type PromptResponse = Promise<{
  outcome: "accepted" | "dismissed";
  platform: string;
}>;

interface RelatedApplication {
  platform: string;
  url: string;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    getInstalledRelatedApps: () => Promise<RelatedApplication[]>;
  }
}
