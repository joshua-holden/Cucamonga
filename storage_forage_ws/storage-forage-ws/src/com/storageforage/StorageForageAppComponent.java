package com.storageforage;

import javax.inject.Singleton;

import com.storageforage.resources.AccountResource;
import com.storageforage.resources.PostingResource;

import dagger.Component;

@Singleton
@Component
public interface StorageForageAppComponent {
	
	AccountResource getAccountResource();	
	PostingResource getPostingResource();
}
