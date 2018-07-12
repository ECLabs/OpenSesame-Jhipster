import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { DocumentOpenSesame } from '../entities/document-open-sesame/document-open-sesame.model';
import { DocumentOpenSesameService } from '../entities/document-open-sesame/document-open-sesame.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import 'jqueryui';
import 'fullcalendar';
import { Account, DocumentModalService } from '../shared';

@Component({
    selector: 'jhi-director-events-filter',
    templateUrl: './director-events-filter.component.html',
    styleUrls: [
        'director.css'
    ],
})

export class DirectorEventsFilterComponent implements OnInit {
    private statuses = [
        { color: 'green', name: 'Created', status: 'CREATED' },
        { color: 'blue', name: 'Author', status: 'AUTHOR' },
        { color: 'red', name: 'Tech Editor', status: 'TE1' },
        { color: 'peru', name: 'Content Reviewer', status: 'CR' },
        { color: 'aqua', name: 'Senior Intel Officer', status: 'SIO' },
        { color: 'violet', name: 'Executive Reviewer', status: 'ER' },
        { color: 'purple', name: 'Read Off', status: 'RO' },
        { color: 'grey', name: 'Tech Editor/Graphics/PCO', status: 'TE2' },
        { color: 'black', name: 'Done' }
    ];
    documents: any[];
    private currFiltStatus: string;

    constructor(
        private documentService: DocumentOpenSesameService,
    ) {
        this.documents = [];
    }

    ngOnInit() {
        this.currFiltStatus = 'CREATED';
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => {
                res.body.forEach(({ id }) => {
                    this.documents.push(id);
                });
            });
        console.log("initiated DirectorEventsFilter");
    }

    getStatuses() {
        return this.statuses;
    }

    filterByStatus(status) {
        const __this = this;
        if (status == 'CREATED') {
            $('.fc-event').each(function() {
                if ($(this).find('#document-id').text()) {
                    const id = JSON.parse($(this).find('#document-id').text()).id;
                    if (__this.documents.includes(id)) {
                        $(this).css('display', 'block');
                    } else {
                        $(this).css('display', 'none');
                    }
                }
            })
        } else {
            $('.fc-event').each(function() {
                if ($(this).find('#document-id').text()) {
                    const id = JSON.parse($(this).find('#document-id').text()).id;
                    if (__this.documents.includes(id) && $(this).attr('id') == status) {
                        $(this).css('display', 'block');
                    } else {
                        $(this).css('display', 'none');
                    }
                }
            });
        }
        this.currFiltStatus = status;
    }

    search() {
        const term = $('#search-term').val();
        const re = /^\s*$/;
        const __this = this;

        __this.documents = [];
        if (re.test(term)) {
            $('.fc-event').each(function() {
                if ($(this).find('#document-id').text()) {
                    __this.documents.push(JSON.parse($(this).find('#document-id').text()).id);
                }
            });
        } else {
            $('.fc-event').each(function() {
                if ($(this).find('#document-id').text()) {
                    if (JSON.parse($(this).find('#document-id').text()).name.includes(term)) {
                        const id = JSON.parse($(this).find('#document-id').text()).id
                        __this.documents.push(id);
                    }
                }
            });
        }
        this.filterByStatus(this.currFiltStatus);
    }
}
