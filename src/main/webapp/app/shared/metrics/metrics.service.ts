import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { JhiMetricsModalComponent } from './metrics.component';

@Injectable()
export class MetricsModalService {
    private isOpen = false;
    constructor(    
        private modalService: NgbModal
    ) {}

    open(): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiMetricsModalComponent, { size : 'lg' });
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
