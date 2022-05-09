import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Driver } from '../driver.model';
import { DriverService } from '../driver.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'op-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.css']
})
export class DriverModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: Driver;
    @Input() viewMsg;

    statuses = ['Active', 'Inactive'];
    driver: Driver;
    statusSelected: string;
    drivers: Driver[];
    isFormDirty: Boolean = false;

    constructor(
        public driverService: DriverService,
        public modalService: NgbModal
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.driver = this.objEdit;
            if (this.driver.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
    }

    setDefaultValue() {
        this.driver= {};
        this.statusSelected = this.statuses[0];
    }

    save(): void {
        this.driver.status = (this.statusSelected === 'Active' ? 1 : 0);
        this.isFormDirty = true;

        if (this.driver.id ==0) {
            this.driverService.save(this.driver).subscribe(result => {
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

        this.driverService.update(this.driver).subscribe(result => {
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
