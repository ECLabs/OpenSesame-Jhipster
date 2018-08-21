import { Component, AfterViewInit, Renderer, ElementRef, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiDataUtils } from 'ng-jhipster';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

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
    totalMetrics: Object = this.instantiateMetrics();
    monthMetrics: Object = this.instantiateMetrics();
    currentDate: Date = new Date();

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
                let currentMonthDocuments = 0;
                const firstOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
                const lastOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

                this.documents.forEach((document: any) => {
                    this.countries[document.country] = this.countries[document.country] + 1 || 1;
                    this.updateMetrics(this.totalMetrics, document.name, document.timeElapsed);
                    if (document.duedate >= firstOfMonth && document.duedate <= lastOfMonth) {
                        console.log(document.timeElapsed);
                        this.updateMetrics(this.monthMetrics, document.name, document.timeElapsed);
                        currentMonthDocuments++;
                    }
                });
                // Calculate average time elapsed for all documents
                this.totalMetrics['averageTimeElapsed'] /= this.countryKeys().length;
                // Calculate average time elapsed only for documents due in the current month
                this.monthMetrics['averageTimeElapsed'] /= currentMonthDocuments;
    
                // Generate pie chart
                new Chart($('#countryChart'), {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: this.countryKeys().map((country) => this.countries[country]),
                            backgroundColor: this.generateRandomColorArray()
                        }],
                        labels: this.countryKeys()
                    }
                });
            });

    }

    updateMetrics(metricObject, docTitle, timeElapsed) {
        metricObject['averageTimeElapsed'] += timeElapsed;

        if (timeElapsed < metricObject['shortestTimeElapsed']['time']) {
            metricObject['shortestTimeElapsed'] = { document: docTitle, time: timeElapsed };
        }
        if (timeElapsed > metricObject['longestTimeElapsed']['time']) {
            metricObject['longestTimeElapsed'] = { document: docTitle, time: timeElapsed };
        }
    }

    // Generate an array of random colors for the different countries in the graph
    generateRandomColorArray() {
        return this.countryKeys().map(() => '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    }

    instantiateMetrics() {
        return {
            averageTimeElapsed: 0,
            shortestTimeElapsed: { document: null, time: Number.MAX_SAFE_INTEGER },
            longestTimeElapsed: { document: null, time: Number.MIN_SAFE_INTEGER }
        }
    }

    countryKeys() {
        return Object.keys(this.countries);
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#metrics'), 'focus', []);
    }
}
