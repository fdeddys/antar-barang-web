import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Seller } from '../../seller/seller.model';
import { SellerService } from '../../seller/seller.service';

@Component({
    selector: 'op-customer-modal',
    templateUrl: './customer-modal.component.html',
    styleUrls: ['./customer-modal.component.css']
})
export class CustomerModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: Customer;
    @Input() sellers: Seller[];
    @Input() viewMsg;
    @Input() regionals;

    statuses = ['Active', 'Inactive'];
    customer: Customer;
    regionalSelected: number;
    sellerSelected: number;
    statusSelected: string;
    customers: Customer[];
    isFormDirty: Boolean = false;

    constructor(
        public customerService: CustomerService,
        public modalService: NgbModal,
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.customer = this.objEdit;
            this.sellerSelected = this.customer.sellerId;
            this.regionalSelected = this.customer.regionalId;
            if (this.customer.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
    }

    setDefaultValue() {
        this.customer = {};
        this.customer.id = 0;
        this.sellerSelected = 0;
        this.statusSelected = this.statuses[0];
    }

    save(): void {
    
    this.customer.sellerId = +this.sellerSelected;
    this.customer.regionalId = +this.regionalSelected;
    this.customer.status = (this.statusSelected === 'Active' ? 1 : 0);
    // this.customer.lng = this.customer.lng

      if (this.customer.id == 0 ) {
        this.customerService.save(this.customer).subscribe(result => {
            this.isFormDirty = true;
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
        // this.customer.sellerId = +this.sellerSelected;
        // this.customer.status = (this.statusSelected === 'Active' ? 1 : 0);
        // this.customer.regionalId = +this.regionalSelected;
        this.customerService.update(this.customer).subscribe(result => {
          this.isFormDirty = true;
          if (result.body.errCode === '00') {
              console.log('success');
              Swal.fire('Success', 'Save success ', 'info');
              this.modalService.dismissAll('refresh');
          } else {
              console.log('Toast err');
          }
      });

        // this.lookup.lookupGroup = this.lookupGroupSelected;
    }

    closeForm(): void {
        if (this.isFormDirty === true) {
            this.modalService.dismissAll('refresh');
        } else {
            this.modalService.dismissAll('close');
        }
    }

}
