package com.storageforage;

import java.util.Set;

import javax.inject.Named;
import javax.inject.Singleton;

import com.storageforage.resources.ResourceModule;

import dagger.Component;

@Singleton
@Component( modules = {  
    ResourceModule.class 
})
public interface StorageForageAppComponent {
	
	@Named("instance")
	public Set<Object> getInstance();
}
