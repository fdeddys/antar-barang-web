import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { DriverModalComponent } from './driver-modal/driver-modal.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DriverService } from './driver.service';

@NgModule({
    declarations: [DriverComponent, DriverModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
    ],
    entryComponents: [DriverComponent, DriverModalComponent],
    providers: [
        DriverService,
    ],
    exports: [DriverComponent, DriverModalComponent],
})
export class DriverModule { }
