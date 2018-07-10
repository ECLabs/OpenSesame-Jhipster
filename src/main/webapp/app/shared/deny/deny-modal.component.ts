import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
    selector: 'jhi-deny-modal',
    templateUrl: './deny-modal.component.html',
    styleUrls: [
        'deny-modal.css'
    ]
})

export class JhiDenyModalComponent implements AfterViewInit {
    docName: string;

    constructor(
        private elementRef: ElementRef,
        private dataUtils: JhiDataUtils,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {}

    ngAfterViewInit() {

    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

}
