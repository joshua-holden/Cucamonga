package com.storageforage.data;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Account {

	private String firstName;
	private String lastName;
	private String email;
	private LocalDate birthdate;
	private String password;
	private Set<Posting> postings;
	
	public Account(String firstName, 
					String lastName, 
					String email,
					LocalDate birthdate,
					String password) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.birthdate = birthdate;
		this.password = password;
		postings = new HashSet<>();
	}
}
