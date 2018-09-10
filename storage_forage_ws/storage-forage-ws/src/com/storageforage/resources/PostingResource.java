package com.storageforage.resources;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Singleton
@Path("postings")
public class PostingResource {

	@Inject
	public PostingResource() {}
	
	@GET
	@Produces("text/plain")
	public String getHelloWorld() {
		return "Postings!";
	}
}
