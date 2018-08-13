import { Component, AfterViewInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';
import * as mammoth from 'mammoth';
import * as $ from 'jquery';

@Component({
    selector: 'jhi-document-modal',
    templateUrl: './document-preview.component.html',
    styleUrls: [
        'document-preview.css'
    ]
})

export class JhiDocumentModalComponent implements AfterViewInit {
    @ViewChild('document') document;
    docHTML: String = "";
    
    constructor(
        private elementRef: ElementRef,
        private router: Router,
        private dataUtils: JhiDataUtils,
        private renderer: Renderer,
        public activeModal: NgbActiveModal
    ) {}

    ngAfterViewInit() {
        this.loadPreview();
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#document-info'), 'focus', []);
        $('#box').hover(
            function() {
                $(this).css({
                    'background-color': '#212529',
                    'cursor': 'pointer'
                });
                $('.show-doc-text').show();
            },
            function() {
                $(this).css({
                    'background-color': 'white',
                    'cursor': 'default'
                });
                $('.show-doc-text').hide();
            }
        )
    }

    loadPreview() {
        const bs = atob(this.document.file);
        const buffer = new ArrayBuffer(bs.length);
        const ba = new Uint8Array(buffer);
        for (let i = 0; i < bs.length; i++) {
            ba[i] = bs.charCodeAt(i);
        }

        mammoth.convertToHtml({arrayBuffer: ba}).then((result) => {
            this.docHTML = result.value;
        });
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
