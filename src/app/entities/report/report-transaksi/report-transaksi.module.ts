import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportTransaksiComponent } from './report-transaksi.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportTransaksiService } from './report-transaksi.service';

@NgModule({
    declarations: [
        ReportTransaksiComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    providers:[
        ReportTransaksiService
    ],
    entryComponents:[
        ReportTransaksiComponent
    ]
})
export class ReportTransaksiModule { }
