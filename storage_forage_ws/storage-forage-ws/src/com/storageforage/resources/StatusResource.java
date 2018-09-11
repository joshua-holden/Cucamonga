package com.storageforage.resources;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;

@Singleton
@Path("")
public class StatusResource {

	@Inject
	public StatusResource() {}
	
	@GET
	public String getMessage() {
		return "Hello world!";
	}
}
