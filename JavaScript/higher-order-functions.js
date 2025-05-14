// i.e. functions where the return is another function with some bits stubbed out, e.g. 

function createAuditLogger(baseEvent) {
  return function log(eventCode) {
    baseEvent.eventDateTime = new Date();
    baseEvent.auditEventType = eventCode;
    console.log(JSON.stringify(sanitiseAuditEvent(baseEvent)));
  };
}

// Usage
const logAuditEvent = createAuditLogger(baseAuditEvent);
logAuditEvent(eventCodes.someCode.CODE_1);
logAuditEvent(eventCodes.someCode.CODE_2);



// or better approach for saving state 

class AuditLogger {
  constructor(baseEvent) {
    this.baseEvent = baseEvent;
  }

  log(eventCode) {
    this.baseEvent.eventDateTime = new Date();
    this.baseEvent.auditEventType = eventCode;
    console.log(sanitiseAuditEvent(this.baseEvent));
  }
}

// Usage
const auditLogger = new AuditLogger(baseAuditEvent);
auditLogger.log(eventCodes.someCode.CODE_1);
auditLogger.log(eventCodes.someCode.CODE_2);
