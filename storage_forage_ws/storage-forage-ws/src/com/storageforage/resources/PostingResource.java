package com.storageforage.resources;

import java.io.IOException;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import com.fasterxml.jackson.databind.ObjectMapper;

@Singleton
@Path("postings")
public class PostingResource {
	
	@Inject
	public PostingResource() {
		
	}
	
	@GET
	@Produces("application/json")
	public Response getMessage() {
		return Response.ok().build();
	}
}
