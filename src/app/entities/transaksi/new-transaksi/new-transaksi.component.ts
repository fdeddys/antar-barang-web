import { Component, Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Transaksi, TransaksiPageDto } from '../transaksi.model';
import { TOTAL_RECORD_PER_PAGE } from '../../../shared/constants/base-constant';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbDateStruct, NgbDateAdapter, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TransaksiService } from '../transaksi.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TransaksiModalComponent } from '../transaksi-modal/transaksi-modal.component';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

@Component({
  selector: 'op-new-transaksi',
  templateUrl: './new-transaksi.component.html',
  styleUrls: ['./new-transaksi.component.css'],
  providers: [
    // {provide: NgbDateAdapter, useClass: CustomAdapter},
  ]
})
export class NewTransaksiComponent implements OnInit {

    appname = "Transaksi"
    transaksis: Transaksi[];
    curPage = 1;
    totalData = 0;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    searchTerm = {
        sellerName: '',
        driverName: '',
        customerName: '',
        status:'',
        tgl1:'',
        tgl2:''
    };
    closeResult: string;
    tgl1: NgbDateStruct;
    tgl2: NgbDateStruct;
    // tgl1:''
    // tgl2:''
    
    constructor(private route: ActivatedRoute,
        private modalService: NgbModal,
        private transaksiService: TransaksiService,
        private location: Location, ) { }

    ngOnInit() {
        var todayDate = new Date();
        this.tgl1 = { year: todayDate.getFullYear(), month: todayDate.getMonth()+1, day: todayDate.getDate() };
        this.tgl2 = { year: todayDate.getFullYear(), month: todayDate.getMonth()+1, day: todayDate.getDate() };
        this.loadAll(this.curPage);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadAll(page) {
        this.searchTerm.tgl1 = this.tgl1.year + "-" + this.tgl1.month + "-"+ this.tgl1.day
        this.searchTerm.tgl2 = this.tgl2.year + "-" + this.tgl2.month + "-"+ this.tgl2.day

        this.transaksiService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord,
        }).subscribe(
            (res: HttpResponse<TransaksiPageDto>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { }
        );
        console.log(page);
        // console.log(this.brand);
    }

    open(status, obj) {
        console.log(status, obj);

        const modalRef = this.modalService.open(TransaksiModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = obj;

        modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
            console.log(this.closeResult);
            this.curPage = 1;
            this.loadAll(this.curPage);
        }, (reason) => {
            console.log(reason);
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            console.log(this.closeResult);
            this.loadAll(this.curPage);
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    private onSuccess(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.transaksis = data.contents;
        this.totalData = data.totalRow;
    }

    private onError(error) {
        console.log('error..');
    }

    getStatus(status: number) {
        switch (status) {
            case 0:
                return "NEW"
                break;
            case 1:
              return "NEW"
              break;
            case 2:
                return "ON_PROCCESS"
                break;
            case 3:
                return "ON_THE_WAY"
                break;
            case 4:
                return "DONE"
                break;
            case 5:
                return "CANCEL"
                break;
            default:
                return "UNKNOWN " + status
                break;
        }
    }

    resetFilter() {
        this.searchTerm = {
            sellerName: '',
            driverName: '',
            customerName: '',
            status:'',
            tgl1:'',
            tgl2:''
        };
        this.loadAll(1);
    }

    loadPage() {
        this.loadAll(this.curPage);
    }

    goBack() {
        this.location.back();
    }

    save() {

    }

    onDateSelection(date: NgbDate) {
        console.log(date)
      }
}
