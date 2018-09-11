package com.storageforage;

import dagger.Module;

@Module
public class StorageForageAppModule {
    StorageForageApp app;
    
    public StorageForageAppModule(StorageForageApp app) {
        this.app = app;
    }
}
