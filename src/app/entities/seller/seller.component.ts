import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CustomerPageDto } from '../customer/customer.model';
import { Seller } from './seller.model';
import { TOTAL_RECORD_PER_PAGE } from '../../shared/constants/base-constant';
import { SellerService } from './seller.service';
import { SellerModalComponent } from './seller-modal/seller-modal.component';
import { Location } from '@angular/common';
import { RegionalService } from '../regional/regional.service';
import { Regional, RegionalPageDto } from '../regional/regional.model';
import { NgModuleRef } from '@angular/core/src/render3';

@Component({
  selector: 'op-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

    appname = "Seller"
    sellers: Seller[];
    regionals: Regional[];
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
        private sellerService: SellerService,
        private location: Location, 
        private regionalService: RegionalService,
    ) { }

    ngOnInit() {
        this.loadRegional();
        this.loadAll(this.curPage);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadRegional(){
        this.regionalService.filter({
            filter: {
                kode: '',
                nama: '',
            },
            page: 1,
            count:1000
        }).subscribe(
            (res: HttpResponse<RegionalPageDto>) => this.onSuccessRegional(res.body, res.headers),
            (res: HttpErrorResponse) => console.log('Error get seller list : ' + res.message),
            () => { }
        )
    }

    private onSuccessRegional(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.regionals =(data.contents);
        var regional :Regional = new Regional(0,'-- Pilih Regional Group --',0,0,'','','','');
        this.regionals.push(regional);
        
        console.log("regional groups success, total = " + this.regionals.length)
    }

    loadAll(page) {
        this.sellerService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord,
        }).subscribe(
            (res: HttpResponse<CustomerPageDto>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { }
        );
        console.log(page);
        // console.log(this.brand);
    }

    addnew(){
        var seller = new Seller(0,'','','','','',1,0,'','','','')
        this.open("addnew", seller)
    }

    open(status, obj) {
        console.log(status, obj);

        const modalRef = this.modalService.open(SellerModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = obj;
        modalRef.componentInstance.regionals = this.regionals;
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
        this.sellers = data.contents;
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
