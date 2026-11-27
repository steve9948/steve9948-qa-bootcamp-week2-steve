import { setWorldConstructor, World, type IWorldOptions } from '@cucumber/cucumber';
import type { BrowserContext, Page } from '@playwright/test';

export class PlaywrightWorld extends World {
  context!: BrowserContext;
  page!: Page;
  productName='';
  /** Remembered between steps so the last step can reuse it. */
  quantity = 0;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(PlaywrightWorld);