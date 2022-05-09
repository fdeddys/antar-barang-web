import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Seller } from '../seller.model';
import { SellerService } from '../seller.service';

@Component({
  selector: 'op-seller-modal',
  templateUrl: './seller-modal.component.html',
  styleUrls: ['./seller-modal.component.css']
})
export class SellerModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: Seller;
    @Input() viewMsg;

    statuses = ['Active', 'Inactive'];
    seller: Seller;
    statusSelected: string;
    sellers: Seller[];
    isFormDirty: Boolean = false;

    constructor(
        public sellerService: SellerService,
        public modalService: NgbModal
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.seller = this.objEdit;
            if (this.seller.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
    }

    setDefaultValue() {
        this.seller= {};
        this.statusSelected = this.statuses[0];
    }

    save(): void {
        // this.lookup.lookupGroup = this.lookupGroupSelected;
        this.seller.status = (this.statusSelected === 'Active' ? 1 : 0);
        this.isFormDirty = true;

        if (this.seller.id ==0) {
            this.sellerService.save(this.seller).subscribe(result => {
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

        this.sellerService.update(this.seller).subscribe(result => {
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


}
