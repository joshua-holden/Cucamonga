package com.storageforage.resources;

import javax.inject.Named;

import dagger.Binds;
import dagger.Module;
import dagger.multibindings.IntoSet;

@Module
public interface ResourceModule {

	@Binds
	@IntoSet
	@Named("instance")
	public Object bindAccountResource(AccountResource accountResrource);
	
	@Binds
	@IntoSet
	@Named("instance")
	public Object bindPostingResource(PostingResource postingResrource);
	
	@Binds
	@IntoSet
	@Named("instance")
	public Object bindStatusResource(StatusResource statusResource);
}
