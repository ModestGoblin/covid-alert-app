import {StorageType} from './FutureStorageService';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class StoreDirectory {
  static readonly MyTestKey = {
    keyIdentifier: 'customIdentifier',
    storageType: StorageType.Secure,
  };
}
