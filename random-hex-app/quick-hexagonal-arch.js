
// Model the port after the external entity


/** =========================================================================
 Hexagonal Architecture / Ports & Adapters:

 Naming Patterns:

| Concept          | Pattern Example                                                                 |
| ---------------- | ------------------------------------------------------------------------------- |
| Inbound Port     | `<Verb><Entity>`                    → `ProcessThings`                           |
| Outbound Port    | `<Entity><Action>` or `<DOMAIN Intent>`    → `ThingFetcher`, `ThingProcessor`          |
| Use Case / Core  | `<Verb><Entity>Service`             → `ProcessThingsService`                    |
| Inbound Adapter  | `<Mechanism><Entity>Handler`        → `LambdaProcessThingsHandler`             |
| Outbound Adapter | `<Mechanism><Entity><Adapter>`      → `HttpThingFetcherAdapter`                 |

File Structure:

 core/
├── ports/
│   ├── in/
│   │   └── ProcessThings.js                     // Inbound Port
│   └── out/
│       ├── ThingFetcher.js                     // Outbound Port
│       ├── ThingRequestGenerator.js
│       └── ThingScheduler.js
├── usecase/
│   └── ProcessThingsService.js                 // Application / Use Case

adapters/
├── in/
│   └── lambda/
│       └── LambdaProcessThingsHandler.js       // Inbound Adapter
├── out/
│   ├── http/
│   │   ├── HttpThingFetcherAdapter.js
│   │   ├── HttpThingRequestGenerator.js
│   │   └── HttpThingScheduler.js
│   └── lambda/
│       └── LambdaThingScheduler.js

Notes:
* The entrypoint composes concrete implementations
* Internal logic uses only interface contracts
=========================================================================*/

// 1. PORTS
/** @abstract For orchestrating thing processing */ 
class ProcessThingsPort {
  process(request) {
    throw new Error("Not implemented");
  }
}

/** @abstract For retrieving things */ 
class ThingFetcherPort {
  getThings(request) {
    throw new Error("Not implemented");
  }
}

/** @abstract For generating requests from things */ 
class ThingRequestGeneratorPort {
  generate(things) {
    throw new Error("Not implemented");
  }
}

/** @abstract For scheduling thing processing */ 
class ThingSchedulerPort {
  schedule(request) {
    throw new Error("Not implemented");
  }
}

module.exports = {
  ProcessThingsPort,
  ThingFetcherPort,
  ThingRequestGeneratorPort,
  ThingSchedulerPort
};

// 2. ADAPTERS

class LambdaThingScheduler extends ThingSchedulerPort {
  schedule(request) {
    // TODO: perform actual scheduling logic (e.g. via HTTP or Lambda)
  }
}

class JsonThingRequestGenerator extends ThingRequestGeneratorPort {
  generate(things) {
    // TODO: convert things to request format
  }
}

class HttpThingFetcherAdapter extends ThingFetcherPort {
  getThings(request) {
    // TODO: fetch from external source
  }
}

// 3. BUSINESS LOGIC USE CASE

class ProcessThingsService extends ProcessThingsPort {
  constructor(thingFetcher, requestGenerator, scheduler) {
    super();
    this.thingFetcher = thingFetcher;
    this.requestGenerator = requestGenerator;
    this.scheduler = scheduler;
  }

  async process(request) {
    const things = await this.thingFetcher.getThings(request);
    const generatedRequest = this.requestGenerator.generate(things);
    return this.scheduler.schedule(generatedRequest);
  }
}

module.exports = {
  LambdaThingScheduler,
  JsonThingRequestGenerator,
  HttpThingFetcherAdapter,
  ProcessThingsService
};

// 4. INBOUND ADAPTER (COMPOSITION ROOT)

async function handler(event) {
  const scheduler = new LambdaThingScheduler();
  const generator = new JsonThingRequestGenerator();
  const fetcher = new HttpThingFetcherAdapter();

  const service = new ProcessThingsService(fetcher, generator, scheduler);
  await service.process(event);
}
