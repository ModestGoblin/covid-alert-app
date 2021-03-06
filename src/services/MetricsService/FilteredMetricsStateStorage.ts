import {SecureKeyValueStore} from './SecureKeyValueStorage';

const InstalledEventMarkerKeyValueUniqueIdentifier = 'A607DDBD-D592-4927-8861-DD1CCEDA8E76';
const OnboardedEventMarkerKeyValueUniqueIdentifier = '0429518A-9D4D-4EB2-A5A8-AEA985DEB1D7';
const BackgroundCheckEventMarkerKeyValueUniqueIdentifier = 'AB398409-D8A9-4BC2-91F0-63E4CEFCD89A';

export interface FilteredMetricsStateStorage {
  markInstalledEventAsPublished(): Promise<void>;
  isInstalledEventPublished(): Promise<boolean>;

  markOnboardedEventShouldBePublished(): Promise<void>;
  shouldOnboardedEventBePublished(): Promise<boolean>;
  markOnboardedEventShouldNotBePublished(): Promise<void>;

  getBackgroundCheckEvents(): Promise<Date[]>;
  saveBackgroundCheckEvents(events: Date[]): Promise<void>;
}

export class DefaultFilteredMetricsStateStorage implements FilteredMetricsStateStorage {
  private keyValueStore: SecureKeyValueStore;

  constructor(secureKeyValueStore: SecureKeyValueStore) {
    this.keyValueStore = secureKeyValueStore;
  }

  markInstalledEventAsPublished(): Promise<void> {
    return this.keyValueStore.save(InstalledEventMarkerKeyValueUniqueIdentifier, 'exists');
  }

  isInstalledEventPublished(): Promise<boolean> {
    return this.keyValueStore.retrieve(InstalledEventMarkerKeyValueUniqueIdentifier).then(result => Boolean(result));
  }

  markOnboardedEventShouldBePublished(): Promise<void> {
    return this.keyValueStore.save(OnboardedEventMarkerKeyValueUniqueIdentifier, JSON.stringify(true));
  }

  shouldOnboardedEventBePublished(): Promise<boolean> {
    return this.keyValueStore.retrieve(OnboardedEventMarkerKeyValueUniqueIdentifier).then(result => {
      if (result) {
        return JSON.parse(result);
      } else {
        return false;
      }
    });
  }

  markOnboardedEventShouldNotBePublished(): Promise<void> {
    return this.keyValueStore.save(OnboardedEventMarkerKeyValueUniqueIdentifier, JSON.stringify(false));
  }

  getBackgroundCheckEvents(): Promise<Date[]> {
    return this.keyValueStore.retrieve(BackgroundCheckEventMarkerKeyValueUniqueIdentifier).then(result => {
      if (result) {
        return result.split(',').map(timestamp => new Date(Number(timestamp)));
      } else {
        return [];
      }
    });
  }

  saveBackgroundCheckEvents(events: Date[]): Promise<void> {
    const eventsAsListOfTimestamps = events.map(event => event.getTime());
    return this.keyValueStore.save(
      BackgroundCheckEventMarkerKeyValueUniqueIdentifier,
      eventsAsListOfTimestamps.join(','),
    );
  }
}
