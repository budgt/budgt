import {NgModule} from '@angular/core';
import {MatButtonModule, MatToolbarModule, MatExpansionModule, MatListModule, MatDialogModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}
