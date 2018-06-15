import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-document-modal',
    templateUrl: './document-preview.component.html',
    styleUrls: [
        'document-preview.css'
    ]
})

export class JhiDocumentModalComponent implements AfterViewInit {
    docName: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {}

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#doc-preview'), 'focus', []);
    }
}
