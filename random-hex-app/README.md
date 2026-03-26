## Description
A slim JavaScript app showing an outline of the hexagonal architecture (ports & adapters) in JavaScript.


## Ports + Adapters (Hexagonal Architecture) 

### Ports
The 'business' interface, communicating the business contribution.

### Adapters
The underlying implementation of the interface. The idea being these can easily be switched out in the composition root as long as the implementation adheres to the contract.

### Composition Root (Entry point)
Wires in the concrete implementations and internal logic uses only interfaces (contracts)


### Naming Patterns 

| Concept          | Pattern Example                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Inbound Port     | `<Verb><Entity>`                               → `ProcessThings`                                       |
| Outbound Port    | `<Entity><Action>` or `<DOMAIN Intention>`     → `ThingFetcher`, `ThingProcessor`, `ThingGenerator`    |
| Use Case / Core  | `<Verb><Entity>Service`                        → `ProcessThingsService`                                |
| Inbound Adapter  | `<Mechanism><Entity>Handler`                   → `LambdaProcessThingsHandler`                          |
| Outbound Adapter | `<Mechanism><Entity><Adapter>`                 → `HttpThingFetcherAdapter`                             |


### Example File Structure 

``` bash
 core/
├── ports/
│   ├── in/
│   │   └── ProcessThings.js                     // Inbound Port
│   └── out/
│       ├── ThingFetcher.js                     // Outbound Port
│       └── ThingScheduler.js
├── usecase/
│   └── ProcessThingsService.js                 // Application / Use Case

adapters/
├── in/
│   └── lambda/
│       └── LambdaProcessThingsHandler.js       // Inbound Adapter
├── out/
│   ├── http/
│   │   ├── HttpThingFetcher.js
│   │   └── HttpThingScheduler.js
│   └── lambda/
│       └── LambdaThingScheduler.js
```

### Code Example 
``` TypeScript 

/** @abstract For retrieving things */ 
class ThingFetcher {
  getThings(request) {
    throw new Error("Not implemented");
  }
}

class HttpThingFetcher extends ThingFetcherPort {
  getThings(request) {
    // TODO: fetch from external source
  }
}

// index.js: 

async function handler(event) {
  const scheduler = new LambdaThingScheduler();
  const fetcher = new HttpThingFetcherAdapter();

  const service = new ProcessThingsService(fetcher, scheduler);
  await service.process(event);
}

```