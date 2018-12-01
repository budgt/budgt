import { SpyObject } from './spyobject';
import Spy = jasmine.Spy;
import { MatDialogRef } from '@angular/material';

export class MockActiveDialog extends SpyObject {

    dismissSpy: Spy;

    constructor() {
        super(MatDialogRef);
        this.dismissSpy = this.spy('close').andReturn(this);
    }
}
