'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const commandBase_js_1 = require('../validation/commandBase.js');
const string_js_1 = require('../validation/string.js');
class Updater extends commandBase_js_1.CommandBase {
  constructor(client, objectsPath) {
    super(client);
    this.withVector = (vector) => {
      this.vector = vector;
      return this;
    };
    this.withVectors = (vectors) => {
      this.vectors = vectors;
      return this;
    };
    this.withProperties = (properties) => {
      this.properties = properties;
      return this;
    };
    this.withId = (id) => {
      this.id = id;
      return this;
    };
    this.withClassName = (className) => {
      this.className = className;
      return this;
    };
    this.withTenant = (tenant) => {
      this.tenant = tenant;
      return this;
    };
    this.validateClassName = () => {
      if (!(0, string_js_1.isValidStringProperty)(this.className)) {
        this.addError('className must be set - use withClassName(className)');
      }
    };
    this.validateId = () => {
      if (this.id == undefined || this.id == null || this.id.length == 0) {
        this.addError('id must be set - initialize with updater(id)');
      }
    };
    this.withConsistencyLevel = (cl) => {
      this.consistencyLevel = cl;
      return this;
    };
    this.payload = () => ({
      tenant: this.tenant,
      properties: this.properties,
      class: this.className,
      id: this.id,
      vector: this.vector,
      vectors: this.vectors,
    });
    this.validate = () => {
      this.validateClassName();
      this.validateId();
    };
    this.do = () => {
      this.validate();
      if (this.errors.length > 0) {
        return Promise.reject(new Error('invalid usage: ' + this.errors.join(', ')));
      }
      return this.objectsPath
        .buildUpdate(this.id, this.className, this.consistencyLevel)
        .then((path) => this.client.put(path, this.payload()));
    };
    this.objectsPath = objectsPath;
  }
}
exports.default = Updater;
