import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
    selector: 'jhi-document-modal',
    templateUrl: './document-preview.component.html',
    styleUrls: [
        'document-preview.css'
    ]
})

export class JhiDocumentModalComponent implements AfterViewInit {

    constructor(
        private elementRef: ElementRef,
        private router: Router,
        private dataUtils: JhiDataUtils,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {}

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#doc-preview'), 'focus', []);
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    goToDocument(documentId) {
        this.router.navigateByUrl(`/document-open-sesame/${documentId}`);
        this.activeModal.dismiss();
    }
}
