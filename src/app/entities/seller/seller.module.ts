import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerComponent } from './seller.component';
import { SellerModalComponent } from './seller-modal/seller-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerService } from './seller.service';

@NgModule({
  declarations: [SellerComponent, SellerModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  entryComponents: [
    SellerComponent, SellerModalComponent
],
providers: [
    SellerService,
],
exports: [
  SellerComponent, SellerModalComponent
]
})
export class SellerModule { }
