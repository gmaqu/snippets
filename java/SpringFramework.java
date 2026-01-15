/**
 *		TLDR;  
 *
 *		1. ApplicationContext = composition root 
 *		Spring scans packages on class path at start up if there's concrete classes 
 *		(e.g. implementations of adapters with @Service, @Component, @Repository, @Controller, 
 *		@Configuration or @Bean in an @Configuration class) Spring creates a new instance wiring up 
 *		it dependencies and puts in Application Context.
 *
 *		2. "No Qualifying Bean" = need to disambiguate 
 *		- @Qualifier
 *		- Naming beans 
 *		- Java Config with explicit @Bean definitions
 *
 *		3. Explicit config classes are only required when you need to:
 *		- Override defaults
 *		- Disambiguate multiple implementations
 *		- Inject properties in a purist way i.e. no @Service in core
 * */

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 *      Contract First Development
 *      1. Submodule contract into either consumes (app is client of another app) or implements (app establishes this service)
 *      2. During build maven build plugin openapi-generator will set up auto generated code from contract
 *      3. Business interfaces/services are written for these and used throughout the code 
 *          (com.some.project.component.core.service + com.some.project.component.core.domain.object) [supports non functional understanding + swap of adapters]
 *      4. The composition root for Spring should be in (com.some.project.component.config) where concrete adapters are wired in with 
 *          @Configuration and a method annotated with @Bean. These point at auto gen adapters from 2.
 * */



/**
 * Spring MVC
 * 
 * Incoming request matched by DispatcherServlet to some handler method based on URL path, method, optional params
 * Other annotations: @GetMapping, @PostMapping, @RequestMapping
 * 
 * Json body is converted to domain object via Jackson + passed into method as param 
 * */
@RestController 
public class SomeController implements SomeApi {
	@GetMapping("someEndpoint/")
	public String hello(){
		return "Hello";
	}
}







/**
 *	TLDR:3.  Explicit Config classes
 * */
package com.some.project.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;


@Configuration
public class SomeClientConfig {
	
	@Value("${restClient.someService.basePath}") // From src/resources/application.properties
  	protected String basePath;

	@Bean
  public DefaultApi defaultApi() {
    return new DefaultApi(apiClient());
  }
}
