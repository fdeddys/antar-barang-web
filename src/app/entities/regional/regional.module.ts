import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionalComponent } from './regional.component';
import { RegionalModalComponent } from './regional-modal/regional-modal.component';
import { RegionalService } from './regional.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        RegionalComponent, 
        RegionalModalComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            NgbModule,
        ],
        entryComponents:[
            RegionalComponent, 
            RegionalModalComponent
        ],
      providers: [
            RegionalService
      ]
})
export class RegionalModule { }
