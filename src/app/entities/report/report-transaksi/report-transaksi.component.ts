import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportTransaksiService } from './report-transaksi.service';

@Component({
  selector: 'op-report-transaksi',
  templateUrl: './report-transaksi.component.html',
  styleUrls: ['./report-transaksi.component.css']
})
export class ReportTransaksiComponent implements OnInit {

    selectedDate1: NgbDateStruct;
    selectedDate2: NgbDateStruct;
    constructor(
        private spinner: NgxSpinnerService,
        private reportService: ReportTransaksiService,
    ) { }

    ngOnInit() {
        this.setToday()
    }

    setToday() {
        const today = new Date();
        this.selectedDate1 = {
            year: today.getFullYear(),
            day: today.getDate(),
            month: today.getMonth() + 1,
        };

        this.selectedDate2 = {
            year: today.getFullYear(),
            day: today.getDate(),
            month: today.getMonth() + 1,
        };

    }

    getSelectedDate1(): string{

        const month = ('0' + this.selectedDate1.month).slice(-2);
        const day = ('0' + this.selectedDate1.day).slice(-2);
        // const tz = 'T00:00:00+07:00';
        const tz = '';

        return this.selectedDate1.year + '-' + month + '-' + day + tz;
    }

    getSelectedDate2(): string{

        const month = ('0' + this.selectedDate2.month).slice(-2);
        const day = ('0' + this.selectedDate2.day).slice(-2);
        // const tz = 'T00:00:00+07:00';
        const tz = '';
            
        return this.selectedDate2.year + '-' + month + '-' + day + tz;
    }


    onPreview() {
        let tgl1 = this.getSelectedDate1();
        let tgl2 = this.getSelectedDate2();
        console.log('tg  bettwen ',tgl1, ' : ', tgl2);

        let filename = "report-payment-cash" + tgl1 + "+" + tgl2 +  ".xlsx"; 
        this.spinner.show();
        setTimeout(() => {
            this.spinner.hide();
        }, 5000);

        this.reportService.reportTransaksiService(tgl1, tgl2)
            .subscribe(dataBlob => {
                console.log('data blob ==> ', dataBlob);

                const newBlob = new Blob([dataBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const objBlob = window.URL.createObjectURL(newBlob);
                const element = document.createElement("a");
                element.href = objBlob;
                element.download = filename
                element.click();
                this.spinner.hide();


                // window.open(objBlob);
            });
    }

}
