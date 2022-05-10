import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Transaksi, TransaksiPageDto } from '../transaksi.model';
import { TOTAL_RECORD_PER_PAGE } from '../../../shared/constants/base-constant';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransaksiService } from '../transaksi.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TransaksiModalComponent } from '../transaksi-modal/transaksi-modal.component';

@Component({
  selector: 'op-new-transaksi',
  templateUrl: './new-transaksi.component.html',
  styleUrls: ['./new-transaksi.component.css']
})
export class NewTransaksiComponent implements OnInit {

    appname = "Transaksi"
    transaksis: Transaksi[];
    curPage = 1;
    totalData = 0;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    searchTerm = {
        kode: '',
        nama: '',
    };
    closeResult: string;
    constructor(private route: ActivatedRoute,
        private modalService: NgbModal,
        private transaksiService: TransaksiService,
        private location: Location, ) { }

    ngOnInit() {
        this.loadAll(this.curPage);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadAll(page) {
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

    resetFilter() {
        this.searchTerm = {
            kode: '',
            nama: '',
        };
        this.loadAll(1);
    }

    loadPage() {
        this.loadAll(this.curPage);
    }

    goBack() {
        this.location.back();
    }
}
