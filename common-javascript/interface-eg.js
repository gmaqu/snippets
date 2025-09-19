// @ts-check

const util = require('node:util');

/**
 * @abstract
 * @description For Onboarding VWDs
 */

class SomeInterfaceClass {
  constructor() {
    if (new.target === SomeInterfaceClass) {
      throw new TypeError('Cannot instantiate interface directly');
    }

    this.checkInterfaceIsImplemented();
  }

  checkInterfaceIsImplemented() {
    const interfaceMethods = [
      this.processR.name,
      this.processI.name,
      this.processA.name,
      this.processEVR.name,
      this.processEVC.name,
      this.processS.name
    ];

    const base = SomeInterfaceClass.prototype;
    for (const interfaceMethod of interfaceMethods) {
      if (this[interfaceMethod] === base[interfaceMethod]) {
        throw new TypeError(`${this.constructor.name} must implement ${this[interfaceMethod]}`);
      }
    }
  }

  processR() {
    throw new Error(`Method ${this.processR.name} not implemented`);
  }

  processI() {
    throw new Error(`Method ${this.processI.name} not implemented`);
  }

  processA() {
    throw new Error(`Method ${this.processA.name} not implemented`);
  }

  processEVR() {
    throw new Error(`Method ${this.processEVR.name} not implemented`);
  }

  processEVC() {
    throw new Error(`Method ${this.processEVC.name} not implemented`);
  }

  processS() {
    throw new Error(`Method ${this.processS.name} not implemented`);
  }
}

module.exports = {
  SomeInterfaceClass
};

// e.g. 

// class SomeChild extends SomeInterfaceClass {
//   constructor() {
//     super();
//   }
//   processR() {}
// }

// const child = new SomeChild();
