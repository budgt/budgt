import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule
  ]
})
export class MaterialModule {}
