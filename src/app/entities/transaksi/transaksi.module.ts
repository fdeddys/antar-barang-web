import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewTransaksiComponent } from './new-transaksi/new-transaksi.component';
import { TransaksiModalComponent } from './transaksi-modal/transaksi-modal.component';

@NgModule({
  declarations: [NewTransaksiComponent, TransaksiModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  entryComponents:[
    NewTransaksiComponent, TransaksiModalComponent
  ],
  exports:[ 
    NewTransaksiComponent
  ]
})
export class TransaksiModule { }
