import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule],
  exports: [MatButtonModule, MatDialogModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatListModule, MatToolbarModule]
})
export class MaterialModule {}
