import { Component, Input, OnInit } from '@angular/core';
import { Regional } from '../regional.model';
import { RegionalGroup } from '../../regional-group/regional-group.model';
import { RegionalService } from '../regional.service';
import { RegionalGroupService } from '../../regional-group/regional-group.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'op-regional-modal',
  templateUrl: './regional-modal.component.html',
  styleUrls: ['./regional-modal.component.css']
})
export class RegionalModalComponent implements OnInit {

    @Input() statusRec;
    @Input() objEdit: Regional;
    @Input() regionalGroups: RegionalGroup[];
    @Input() viewMsg;

    statuses = ['Active', 'Inactive'];
    regional: Regional;
    
    regionalGroupSelected: number;
    statusSelected: string;
    regionals: Regional[];
    isFormDirty: Boolean = false;

    constructor(
        public regionalService: RegionalService,
        public modalService: NgbModal,
    ) { }

    ngOnInit() {
        console.log('obj to edit -> ', this.objEdit);
        console.log(this.statusRec);
        if (this.statusRec === 'addnew') {
            this.setDefaultValue();
        } else {
            this.regional = this.objEdit;
            this.regionalGroupSelected = this.regional.regionalGroupId;
            if (this.regional.status === 1) {
                this.statusSelected = this.statuses[0];
            } else {
                this.statusSelected = this.statuses[1];
            }
        }
    }

    setDefaultValue() {
        this.regional = {};
        this.regional.id = 0;
        this.regionalGroupSelected = 0;
        this.statusSelected = this.statuses[0];
    }

    save(): void {

      if (this.regional.id == 0 ) {
        this.regional.regionalGroupId = +this.regionalGroupSelected;
        this.regional.status = (this.statusSelected === 'Active' ? 1 : 0);
        this.regionalService.save(this.regional).subscribe(result => {
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
        this.regional.regionalGroupId = +this.regionalGroupSelected;
        this.regional.status = (this.statusSelected === 'Active' ? 1 : 0);
        this.regionalService.update(this.regional).subscribe(result => {
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
