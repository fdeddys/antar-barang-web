import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TOTAL_RECORD_PER_PAGE } from '../../shared/constants/base-constant';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Regional, RegionalPageDto } from './regional.model';
import { RegionalService } from './regional.service';
import { RegionalModalComponent } from './regional-modal/regional-modal.component';
import { RegionalGroup, RegionalGroupPageDto } from '../regional-group/regional-group.model';
import { RegionalGroupService } from '../regional-group/regional-group.service';


@Component({
  selector: 'op-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.css']
})
export class RegionalComponent implements OnInit {

    appname = "regional"
    regionals: Regional[];
    regionalGroups: RegionalGroup[];
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
        private regionalService: RegionalService,
        private regionalGroupService: RegionalGroupService,
        private location: Location, ) { }

    ngOnInit() {
        this.loadRegionalGroup();
        this.loadAll(this.curPage);
    }

    onFilter() {
        this.loadAll(this.curPage);
    }

    loadRegionalGroup(){
        this.regionalGroupService.filter({
            filter: {
                kode: '',
                nama: '',
            },
            page: 1,
            count:1000
        }).subscribe(
            (res: HttpResponse<RegionalGroupPageDto>) => this.onSuccessRegionalGroup(res.body, res.headers),
            (res: HttpErrorResponse) => console.log('Error get seller list : ' + res.message),
            () => { }
        )
    }

    private onSuccessRegionalGroup(data, headers) {
        if (data.contents.length < 0) {
            return;
        }
        this.regionalGroups =(data.contents);
        var regionalGroup :RegionalGroup = new RegionalGroup(0,'-- Pilih Regional Group --',0,'','','','');
        this.regionalGroups.push(regionalGroup);
        
        console.log("regional groups success, total = " + this.regionalGroups.length)
    }


    loadAll(page) {
        this.regionalService.filter({
            filter: this.searchTerm,
            page: page,
            count: this.totalRecord,
        }).subscribe(
            (res: HttpResponse<RegionalPageDto>) => this.onSuccess(res.body, res.headers),
            (res: HttpErrorResponse) => this.onError(res.message),
            () => { }
        );
        console.log(page);
        // console.log(this.brand);
    }

    open(status, obj) {
        console.log(status, obj);

        const modalRef = this.modalService.open(RegionalModalComponent, { size: 'lg' });
        modalRef.componentInstance.statusRec = status;
        modalRef.componentInstance.objEdit = obj;
        modalRef.componentInstance.regionalGroups = this.regionalGroups;
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
        this.regionals = data.contents;
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
