package com.storageforage.resources;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
	   DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
	   LocalDateTime now = LocalDateTime.now();   
		return "Hello world!\nthe current date and time is: " + dtf.format(now);
	}
}
