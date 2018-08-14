import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';

import { DocumentOpenSesame } from '../../entities/document-open-sesame/document-open-sesame.model';
import { DocumentOpenSesameService } from '../../entities/document-open-sesame/document-open-sesame.service';

@Component({
    selector: 'jhi-document-modal',
    templateUrl: './metrics.component.html',
    styleUrls: [
        'metrics.css'
    ]
})

export class JhiMetricsModalComponent implements AfterViewInit, OnInit {
    documents: DocumentOpenSesame[];
    countries: Object = {};

    constructor(
        private elementRef: ElementRef,
        private router: Router,
        private dataUtils: JhiDataUtils,
        private renderer: Renderer,
        private documentService: DocumentOpenSesameService,
        public activeModal: NgbActiveModal,
    ) {}

    ngOnInit() {
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => {
                this.documents = res.body;

                this.documents.forEach((document) => {
                    this.countries[document.country] = this.countries[document.country] + 1 || 1;
                })
            });
    }

    countryKeys() {
        return Object.keys(this.countries);
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#metrics'), 'focus', []);
    }
}
