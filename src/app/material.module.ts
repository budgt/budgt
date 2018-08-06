import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatExpansionModule, MatListModule} from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule
  ]
})
export class MaterialModule {}
