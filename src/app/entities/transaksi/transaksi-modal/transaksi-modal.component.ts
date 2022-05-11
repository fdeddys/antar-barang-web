import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbCalendar, NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Transaksi } from '../transaksi.model';
import { TransaksiService } from '../transaksi.service';
import Swal from 'sweetalert2';
import { Seller, SellerPageDto } from '../../seller/seller.model';
import { SellerService } from '../../seller/seller.service';
import { HttpResponse } from '@angular/common/http';
import { CustomerService } from '../../customer/customer.service';
import { Customer, CustomerPageDto } from '../../customer/customer.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'op-transaksi-modal',
  templateUrl: './transaksi-modal.component.html',
  styleUrls: ['./transaksi-modal.component.css']
})
export class TransaksiModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: Transaksi;
    @Input() viewMsg;

    statuses = ['Active', 'Inactive'];
    transaksi: Transaksi;
    statusSelected: string;
    isFormDirty: Boolean = false;

    sellers: Seller[]=[];
    sellerSelected: number;

    customers: Customer[]=[];
    customerSelected: number;

    tanggalAntar: NgbDateStruct;
    tanggalMax: NgbDateStruct;
    tanggalMin: NgbDateStruct;

    jamAntar: NgbTimeStruct; 

    constructor(
        public transaksiService: TransaksiService,
        public sellerService: SellerService,
        public customerService: CustomerService,
        public modalService: NgbModal,
        private calendar: NgbCalendar
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.transaksi = this.objEdit;
            if (this.transaksi.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
        this.sellers.push({
            id:0,
            nama: "PLEASE SELECT SELLER",
            kode:"",
        })
        this.sellerSelected =0;
        this.loadSeller();

        this.customers.push({
            id:0,
            nama: "PLEASE SELECT CUSTOMER",
        })
        this.customerSelected=0;

        var todayDate = new Date();
        var maxDate = new Date();
        var minDate = new Date();

        todayDate.setDate(todayDate.getDate() + 1);
        maxDate.setDate(todayDate.getDate()+60);

        this.tanggalAntar =  { year: todayDate.getFullYear(), month: todayDate.getMonth(), day: todayDate.getDate() };
        this.tanggalMax= { year: maxDate.getFullYear(), month: maxDate.getMonth(), day: maxDate.getDate() };
        this.tanggalMin = { year: minDate.getFullYear(), month: minDate.getMonth(), day:minDate.getDate() };
    
        this.jamAntar = {hour: 9, minute: 0, second:0};
    }

    // loadData(transaksiId: number) {
    //     this.loadSeller();
        // this.loadCustomer();
        // console.log('id ==>?', transaksiId);
        // if (transaksiId === 0) {
        //     this.loadSeller();
        //     // this.addNew();
        //     return;
        // }
        // this.loadDataTransaksi();
    // }

    // loadDataTransaksi() {

    //     let supplierReq = this.sellerService.filter({
    //         page: 1,
    //         count: 10000,
    //         filter: {
    //             code: '',
    //             name: '',
    //         }
    //     });

    //     let customerReq = this.customerService.filter({
    //         page: 1,
    //         count: 10000,
    //         filter: {
    //             code: '',
    //             name: '',
    //             sellerId: this.transaksi.idSeller,
    //         }
    //     });

    //     const requestArray = [];
    //     requestArray.push(supplierReq);
    //     requestArray.push(customerReq);

    //     forkJoin(requestArray).subscribe(results => {
    //         this.processPurchaseOrder(results[0]);
    //         this.processSupplier(results[1]);
    //         this.processPurchaseOrderDtil(results[2]);
    //         this.setSupplierDefault();
    //     });

    // }

    // addNew() {
    //     this.total = 0;
    //     this.grandTotal = 0;
    //     this.taxAmount = 0;
    //     this.priceAdded = 0;
    //     this.purchaseOrder = new PurchaseOrder();
    //     this.purchaseOrder.id = 0;
    //     this.purchaseOrder.status = 0;
    //     this.purchaseOrderDetails = [];
    //     this.setToday() ;
    //     this.clearDataAdded();
    //     if (this.suppliers !== undefined) {
    //         this.purchaseOrder.supplier = this.suppliers[0];
    //         this.setSupplierDefault();
    //     }
    //     // ini langsung generate no jika add new
    //     this.saveHdr()
    // }

    loadSeller() {
        this.sellerService.filter({
            page: 1,
            count: 10000,
            filter: {
                code: '',
                name: '',
            },
        }).subscribe(
            (response: HttpResponse<SellerPageDto>) => {
                if (response.body.contents.length <= 0) {
                    Swal.fire('error', 'failed get supplier data !', 'error');
                    return;
                }
                this.sellers= this.sellers.concat(response.body.contents);
                console.log("1. sellers")
                if (this.transaksi.id == 0) {
                    this.transaksi.idSeller = this.sellers[0].id;
                    console.log("2. sellers : ",this.sellers[0].id)
                }
                this.sellerSelected = this.transaksi.idSeller;
                console.log("3. sellers : ",this.sellerSelected)
            });
    }

    loadCustomer(selledId: number) {
        this.customerService.filter({
            page: 1,
            count: 10000,
            filter: {
                code: '',
                name: '',
                sellerId:selledId,
            },
        }).subscribe(
            (response: HttpResponse<CustomerPageDto>) => {
                if (response.body.contents.length <= 0) {
                    Swal.fire('error', 'failed get Customer data !', 'error');
                    return;
                }
                this.customers= this.customers.concat(response.body.contents);
                if (this.transaksi.id === 0) {
                    this.transaksi.idCustomer = this.customers[0].id;
                }
                this.customerSelected = this.transaksi.idCustomer;
            });
    }

    setDefaultValue() {
        this.transaksi= new Transaksi();
        this.statusSelected = this.statuses[0];
    }

    save(): void {
        // this.lookup.lookupGroup = this.lookupGroupSelected;
        this.transaksi.status = 1;
        this.isFormDirty = true;

        if (this.transaksi.id ==0) {
            this.transaksiService.newTransaksi(this.transaksi).subscribe(result => {
                if (result.body.errCode === '00') {
                    console.log('success');
                    Swal.fire('Success', 'Save success ', 'info');
                    this.modalService.dismissAll('refresh');
                } else {
                    console.log('Toast err');
                }
            });
            return
        }

        this.transaksiService.update(this.transaksi).subscribe(result => {
            // this.isFormDirty = true;
            if (result.body.errCode === '00') {
                console.log('success');
                Swal.fire('Success', 'Save success ', 'info');
                this.modalService.dismissAll('refresh');
            } else {
                console.log('Toast err');
            }
        });
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

    selectSeller(event) {
        console.log(event);
        this.customers=[];
        this.customers.push({
            id:0,
            nama: "PLEASE SELECT CUSTOMER",
        })
        this.customerSelected=0;
        if (event == 0 ) {
            return
        }
        this.loadCustomer(event);
    }
}
