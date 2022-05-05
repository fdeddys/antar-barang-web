import { Component, OnInit } from '@angular/core';
import { TOTAL_RECORD_PER_PAGE } from 'src/app/shared/constants/base-constant';
import { ProductGroup } from './product-group.model';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductGroupService } from './product-group.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ProductGroupModule } from './product-group.module';
import { Location } from '@angular/common';
import { ProductGroupModalComponent } from './product-group-modal/product-group-modal.component';

@Component({
    selector: 'op-product-group',
    templateUrl: './product-group.component.html',
    styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

    groupName: string;
    productGroups: ProductGroup[];
    curPage = 1;
    totalData = 0;
    totalRecord = TOTAL_RECORD_PER_PAGE;
    searchTerm = {
        code: '',
        name: '',
        description: ''
    };
    closeResult: string;
    constructor(private route: ActivatedRoute,
        private modalService: NgbModal,
        private productGroupService: ProductGroupService,
        private location: Location,
    ) { }

    ngOnInit() {
        this.loadAll(this.curPage);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadAll(page) {
        this.productGroupService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord,
        }).subscribe(
            (res: HttpResponse<ProductGroupModule[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { }
        );
        console.log(page);
        console.log(this.groupName);
    }

    open(status, obj) {
        console.log(status, obj);

        const modalRef = this.modalService.open(ProductGroupModalComponent, { size: 'lg' });
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
        this.productGroups = data.contents;
        this.totalData = data.totalRow;
    }

    private onError(error) {
        console.log('error..');
    }

    resetFilter() {
        this.searchTerm = {
            code: '',
            name: '',
            description: ''
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
