import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionalGroup } from '../regional-group.model';
import { RegionalGroupService } from '../regional-group.service';


@Component({
  selector: 'op-regional-group-modal',
  templateUrl: './regional-group-modal.component.html',
  styleUrls: ['./regional-group-modal.component.css']
})
export class RegionalGroupModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: RegionalGroup;
    @Input() viewMsg;

    statuses = ['Active', 'Inactive'];
    regionalGroup: RegionalGroup;
    statusSelected: string;
    drivers: RegionalGroup[];
    isFormDirty: Boolean = false;

    constructor(
        public regionalGroupService: RegionalGroupService,
        public modalService: NgbModal
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.regionalGroup = this.objEdit;
            if (this.regionalGroup.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
    }

    setDefaultValue() {
        this.regionalGroup= {};
        this.regionalGroup.id =0;
        this.statusSelected = this.statuses[0];
    }

    save(): void {
        this.regionalGroup.status = (this.statusSelected === 'Active' ? 1 : 0);
        this.isFormDirty = true;

        if (this.regionalGroup.id ==0) {
            this.regionalGroupService.save(this.regionalGroup).subscribe(result => {
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

        this.regionalGroupService.update(this.regionalGroup).subscribe(result => {
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
