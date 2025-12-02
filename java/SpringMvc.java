
/**
 *      Contract first development
 *      1. Submodule contract into either consumes (app is client of another app) or implements (app establishes this service)
 *      2. During build maven build plugin openapi-generator will set up auto generated code from contract
 *
 * */



/**
 *	Spring MVC - https://ci.nw-dev.uk/newan/contracts/virtual-wan/vwd-data-store
 *	
 *     
 * Incoming request matched by DispatcherServlet to some handler method based on URL path, method, optional params
 * 
 * Other annotations: @GetMapping, @PostMapping, @RequestMapping
 * 
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

