package com.storageforage.resources;

import javax.inject.Inject;
import javax.inject.Named;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import dagger.Binds;
import dagger.multibindings.IntoSet;

@Singleton
@Path("accounts")
public class AccountResource {
	
	@Inject
	public AccountResource() {}
	
	@GET
	@Produces("text/plain")
	public String getHelloWorld() {
		return "Accounts!";
	}

}