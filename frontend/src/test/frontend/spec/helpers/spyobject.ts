export interface GuinessCompatibleSpy {
  /** By chaining the spy with and.returnValue, all calls to the function will return a specific value. */
  mockReturnValue(val: any): void;
  /** By chaining the spy with and.callFake, all calls to the spy will delegate to the supplied function. */
  mockImplementation(fn: () => void): GuinessCompatibleSpy;
  /** removes all recorded calls */
  reset();
}

export class SpyObject {
  static stub(object = null, config = null, overrides = null) {
    if (!(object instanceof SpyObject)) {
      overrides = config;
      config = object;
      object = new SpyObject();
    }

    const m = {};
    Object.keys(config).forEach(key => (m[key] = config[key]));
    Object.keys(overrides).forEach(key => (m[key] = overrides[key]));
    Object.keys(m).forEach(key => {
      object.spy(key).mockReturnValue(m[key]);
    });
    return object;
  }

  constructor(type = null) {
    if (type) {
      Object.keys(type.prototype).forEach(prop => {
        let m = null;
        try {
          m = type.prototype[prop];
        } catch (e) {
          // As we are creating spys for abstract classes,
          // these classes might have getters that throw when they are accessed.
          // As we are only auto creating spys for methods, this
          // should not matter.
        }
        if (typeof m === 'function') {
          this.spy(prop);
        }
      });
    }
  }

  spy(name) {
    if (!this[name]) {
      this[name] = this._createGuinnessCompatibleSpy(name);
    }
    return this[name];
  }

  prop(name, value) {
    this[name] = value;
  }

  /** @internal */
  _createGuinnessCompatibleSpy(name): GuinessCompatibleSpy {
    const newSpy: GuinessCompatibleSpy = jest.fn() as any;
    newSpy.mockImplementation = jest.fn().mockImplementation as any;
    newSpy.mockReturnValue = jest.fn().mockReturnValue as any;
    newSpy.reset = jest.fn().mockClear;
    return newSpy;
  }
}
