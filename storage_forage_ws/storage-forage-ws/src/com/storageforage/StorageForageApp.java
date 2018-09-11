package com.storageforage;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Path("")
public class StorageForageApp {

    public StorageForageApp() {
//        comp = DaggerStorageForageAppComponent.builder()
//                .storageForageAppModule(new StorageForageAppModule(this))
//                .build();
//        comp.getInstance();
    }
    
    @GET
    public String get() {
        return "hello world!";
    }
}
