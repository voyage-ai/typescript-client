'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const commandBase_js_1 = require('../validation/commandBase.js');
const string_js_1 = require('../validation/string.js');
class ReferencesBatcher extends commandBase_js_1.CommandBase {
  constructor(client) {
    super(client);
    this.withFromId = (id) => {
      this.fromId = id;
      return this;
    };
    this.withToId = (id) => {
      this.toId = id;
      return this;
    };
    this.withFromClassName = (className) => {
      this.fromClassName = className;
      return this;
    };
    this.withFromRefProp = (refProp) => {
      this.fromRefProp = refProp;
      return this;
    };
    this.validateIsSet = (prop, name, setter) => {
      if (prop == undefined || prop == null || prop.length == 0) {
        this.addError(`${name} must be set - set with ${setter}`);
      }
    };
    this.validate = () => {
      this.validateIsSet(this.fromId, 'fromId', '.withFromId(id)');
      this.validateIsSet(this.toId, 'toId', '.withToId(id)');
      this.validateIsSet(this.fromClassName, 'fromClassName', '.withFromClassName(className)');
      this.validateIsSet(this.fromRefProp, 'fromRefProp', '.withFromRefProp(refProp)');
    };
    this.payload = () => {
      this.validate();
      if (this.errors.length > 0) {
        throw new Error(this.errors.join(', '));
      }
      let beaconTo = `weaviate://localhost`;
      if ((0, string_js_1.isValidStringProperty)(this.toClassName)) {
        beaconTo = `${beaconTo}/${this.toClassName}`;
      }
      return {
        from: `weaviate://localhost/${this.fromClassName}/${this.fromId}/${this.fromRefProp}`,
        to: `${beaconTo}/${this.toId}`,
      };
    };
    this.do = () => {
      return Promise.reject(new Error('Should never be called'));
    };
  }
  withToClassName(className) {
    this.toClassName = className;
    return this;
  }
}
exports.default = ReferencesBatcher;
