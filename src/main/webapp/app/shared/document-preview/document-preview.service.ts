import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { JhiDocumentModalComponent } from './document-preview.component';

@Injectable()
export class DocumentModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal
    ) {}

    open(document): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiDocumentModalComponent);
        modalRef.componentInstance.document = document;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
