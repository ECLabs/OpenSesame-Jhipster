import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Principal, AccountService } from '../shared';
import { DocumentOpenSesame } from '../entities/document-open-sesame/document-open-sesame.model';
import { DocumentOpenSesameService } from '../entities/document-open-sesame/document-open-sesame.service';
import { HttpResponse } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
    selector: 'jhi-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: [
        'metrics.css'
    ],
})
export class MetricsComponent implements OnInit, AfterContentInit {
    documents: any[];
    documents_countries: Object = {};
    documents_status: Object = {};
    documents_time_elapsed: Object = {};
    country_chart: any = {};
    status_chart: any = {};

    constructor(
        private documentService: DocumentOpenSesameService,
    ) {
    }

    ngOnInit() {
        this.loadAll();
    }

    ngAfterContentInit() {
        // this.createCountryChart();
        // this.createStatusChart();
    }

    loadAll() {
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => {
                this.documents = res.body;
                res.body.forEach(({ name, country, currstate }) => {
                    this.filterDocument(name, country, currstate);
                });
                this.createCountryChart(this.documents_countries);
                this.createStatusChart(this.documents_status);
            });
    }

    filterDocument(name, country, currstate) {
        // countries
        if (this.documents_countries[country]) {
            this.documents_countries[country].push(name);
        } else {
            this.documents_countries[country] = [name];
        }
        //current status
        if (this.documents_status[currstate]) {
            this.documents_status[currstate].push(name);
        } else {
            this.documents_status[currstate] = [name];
        }
    }


    createCountryChart(country_documents) {
        let labels = [];
        let data = [];

        // key -> country_name value -> document name
        for (var key in country_documents) {
            labels.push(key);
            data.push(country_documents[key].length);
        }

        this.country_chart = new Chart('country_canvas', {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Countries',
                    data: data,
                    backgroundColor: 'orange'
                },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Documents by State'
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                            // OR //
                            beginAtZero: true   // minimum value will be 0.
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    createStatusChart(status_documents) {
        let labels = ['CREATED', 'AUTHOR', 'TE', 'CR', 'SIO', 'ER', 'RO', 'TE2', 'DONE'];
        let colors = ['green', 'blue', 'red', 'peru', 'aqua', 'violet', 'purple', 'grey', 'black'];
        let data = [0,0,0,0,0,0,0,0,0];

        // key -> status value -> document name
        for (var key in status_documents) {
            let idx = labels.indexOf(key);
            data[idx]=(status_documents[key].length);
        }

        this.status_chart = new Chart('status_canvas', {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Status',
                    data: data,
                    backgroundColor: colors,
                }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Documents by Current Status'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

}
