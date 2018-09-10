package com.storageforage.resources;

import javax.inject.Named;

import dagger.Binds;
import dagger.Module;
import dagger.multibindings.IntoSet;

@Module
public abstract class ResourceModule {

	@Binds
	@IntoSet
	@Named("instance")
	public abstract Object accountResource(AccountResource accountResrource);
	
	@Binds
	@IntoSet
	@Named("instance")
	public abstract Object postingResource(PostingResource postingResrource);
}
