import { SpyObject } from './spyobject';
import Spy = jasmine.Spy;
import { MatDialogRef } from '@angular/material';

export class MockActiveDialog<T, R = any> extends SpyObject {

    dismissSpy: Spy;

    constructor() {
        super(MatDialogRef);
        this.dismissSpy = this.spy('close').andReturn(this);
    }
}
