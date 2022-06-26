import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionalGroupComponent } from './regional-group.component';
import { RegionalGroupModalComponent } from './regional-group-modal/regional-group-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegionalGroupService } from './regional-group.service';

@NgModule({
  declarations: [
    RegionalGroupComponent, 
    RegionalGroupModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
        NgbModule,
  ],
  entryComponents:[
    RegionalGroupComponent, 
    RegionalGroupModalComponent
  ],
  providers: [
    RegionalGroupService
  ]
})
export class RegionalGroupModule { }
