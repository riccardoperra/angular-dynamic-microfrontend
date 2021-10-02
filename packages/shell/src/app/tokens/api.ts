import {InjectionToken, ValueProvider} from '@angular/core';

export type AppApi = typeof apiConfiguration;

export const API_TOKEN = new InjectionToken<AppApi>('Application api');

export const apiConfiguration = {
  getPlatformList: '/api/platform',
};

export const provideApiToken = (): ValueProvider => {
  return {
    provide: API_TOKEN,
    useValue: apiConfiguration
  };
};
