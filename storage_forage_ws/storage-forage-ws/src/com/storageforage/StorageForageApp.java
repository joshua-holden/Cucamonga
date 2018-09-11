package com.storageforage;

import java.util.Map;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.GET;
import com.sun.jersey.api.core.ResourceConfig;

@ApplicationPath("/")
public class StorageForageApp extends ResourceConfig{
	
	StorageForageAppComponent comp;

    public StorageForageApp() {
        comp = DaggerStorageForageAppComponent.create();
        comp.getInstance();
    }

	@Override
	public Map<String, Boolean> getFeatures() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean getFeature(String featureName) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Map<String, Object> getProperties() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getProperty(String propertyName) {
		// TODO Auto-generated method stub
		return null;
	}
}
