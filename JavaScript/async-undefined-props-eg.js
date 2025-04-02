/*
Async Functions && Class properties
    * An example for how async functions may lose context of a class reference `this` === undefined
    * Or try to access before initialisation of class === undefined
*/

class SomeClass {
  constructor(){
    this.prop = {scope: 'some-scope'};
  }

  // NOTE: There will be a loss of context in callbacks - regular functions have their own `this` separate from classes `this`
  async getPropNormalFunction() {
    setTimeout(function () {
      console.log(this.prop);
    }, 1000);
  }

  // 1: Bind `this`
  async getPropBindThis() {
    setTimeout(function () {
      console.log(this.prop);
    }.bind(this), 1000);
  }

  // 2. Arrow function
  async getPropArrowFn() {
    setTimeout(() => {
      console.log(this.prop);
    }, 5);
  }
}

const someClass = new SomeClass();
setTimeout(() => {}, 1000);
someClass.getPropNormalFunction();
someClass.getPropBindThis();
someClass.getPropArrowFn();


