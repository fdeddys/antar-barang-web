import { Component, OnInit } from '@angular/core';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { Customer, CustomerPageDto } from './customer.model';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from './customer.service';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { SellerService } from '../seller/seller.service';
import { Seller } from '../seller/seller.model';
import { Regional, RegionalPageDto } from '../regional/regional.model';
import { RegionalService } from '../regional/regional.service';

@Component({
    selector: 'op-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
    appname = "Customer"

    customers: Customer[];
    regionals: Regional[];
    sellers: Seller[];
    curPage = 1;
    totalData = 0;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    searchTerm = {
        code: '',
        name: '',
    };
    closeResult: string;


    constructor(private route: ActivatedRoute,
        private modalService: NgbModal,
        private customerService: CustomerService,
        private sellerService: SellerService,
        private location: Location, 
        private regionalService: RegionalService,
        ) { }


    ngOnInit() {
        this.loadRegional();
        this.loadAll(this.curPage);
        this.loadSeller();
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
    
    loadSeller(){
        this.sellerService.filter({
            filter: {
                kode: '',
                nama: '',
            },
            page: 1,
            count:1000
        }).subscribe(
            (res: HttpResponse<CustomerPageDto>) => this.onSuccessSeller(res.body, res.headers),
            (res: HttpErrorResponse) => console.log('Error get seller list : ' + res.message),
            () => { }
        )
    }

    private onSuccessSeller(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.sellers =(data.contents);
        var seller :Seller = new Seller(0,'','','--');
        this.sellers.push(seller);
        
        console.log("sellers success, total = " + this.sellers.length)
    }


    loadAll(page) {
        this.customerService.filter({
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

    open(status, obj) {
        console.log(status, obj);

        const modalRef = this.modalService.open(CustomerModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = obj;
        modalRef.componentInstance.sellers = this.sellers;
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
        this.customers = data.contents;
        this.totalData = data.totalRow;
    }

    private onError(error) {
        console.log('error..');
    }

    resetFilter() {
        this.searchTerm = {
            code: '',
            name: '',
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
