import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { JhiDocumentModalComponent } from './document-preview.component';

@Injectable()
export class DocumentModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal
    ) {}

    open(docName): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        const modalRef = this.modalService.open(JhiDocumentModalComponent, { size: 'lg' });
        modalRef.componentInstance.docName = docName;
        modalRef.result.then((result) => {
            this.isOpen = false;
        }, (reason) => {
            this.isOpen = false;
        });
        return modalRef;
    }
}
