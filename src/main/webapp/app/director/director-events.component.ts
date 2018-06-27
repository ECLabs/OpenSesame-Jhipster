import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { DocumentOpenSesame } from '../entities/document-open-sesame/document-open-sesame.model';
import { DocumentOpenSesameService } from '../entities/document-open-sesame/document-open-sesame.service';
import { Subscription } from 'rxjs/Subscription';

import * as $ from 'jquery';
import 'jqueryui';
import 'fullcalendar';
import { Account, LoginModalService, Principal, DocumentModalService } from '../shared';

@Component({
    selector: 'jhi-director-events',
    templateUrl: './director-events.component.html',
    styleUrls: [
        'director.css'

    ],
    providers: [NgbPopoverConfig]
})

export class DirectorEventsComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    documents: DocumentOpenSesame[];
    duedates = {};

    constructor(
        private documentService: DocumentOpenSesameService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private config: NgbPopoverConfig,
        private documentModalSerivce: DocumentModalService,
    ) {
        config.placement = 'right';
        config.triggers = 'hover';
    }

    getContent() {
        return ['Created on: ', 'Created by: ', 'Due Date: ', 'Current State: ', 'Last State: ', 'Version: ', 'Comments: '];
    }

    loadAll() {
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => this.onSuccess(res.body, res.headers)
            );
    }

    private onSuccess(data, headers) {
        this.documents = data;
        data.forEach((doc) => {
            this.duedates[doc.id] = doc.duedate;
        });
    }

    ngOnInit() {
        this.loadAll();
    }

    loadEvents() {
        $('#external-events .fc-event').each(function() {
            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).find('.title').text()), // use the element's text as the event title
                stick: true, // maintain when user navigates (see docs on the renderEvent method)
                color: $(this).find('span').attr('color'), // use the element's color value as the color of task
            });
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
            if ($(this).find($('.due-date')).text()) { //has due date
                $(this).draggable('disable');
                $(this).css('background-color', '#99ff99');
            } else {
                $(this).draggable('enable');
                $(this).css('background-color', 'white');
            }

            /*document color keying*/
            const currState = $(this).attr('id');
            switch (currState) {
                case 'CREATED':
                    $(this).find('span.dot').attr('color', 'green');
                    $(this).find('span.dot').attr('style', 'background-color:green');
                    break;
                case 'AUTHOR':
                    $(this).find('span.dot').attr('color', 'blue');
                    $(this).find('span.dot').attr('style', 'background-color:blue');
                    break;
                case 'TE1':
                    $(this).find('span.dot').attr('color', 'red');
                    $(this).find('span.dot').attr('style', 'background-color:red');
                    break;
                case 'CR':
                    $(this).find('span.dot').attr('color', 'peru');
                    $(this).find('span.dot').attr('style', 'background-color:peru');
                    break;
                case 'SIO':
                    $(this).find('span.dot').attr('color', 'aqua');
                    $(this).find('span.dot').attr('style', 'background-color:aqua');
                    break;
                case 'ER':
                    $(this).find('span.dot').attr('color', 'violet');
                    $(this).find('span.dot').attr('style', 'background-color:violet');
                    break;
                case 'RO':
                    $(this).find('span.dot').attr('color', 'purple');
                    $(this).find('span.dot').attr('style', 'background-color:purple');
                    break;
                case 'TE2':
                    $(this).find('span.dot').attr('color', 'grey');
                    $(this).find('span.dot').attr('style', 'background-color:grey');
                    break;
                case 'GRAPHICS':
                    $(this).find('span.dot').attr('color', 'grey');
                    $(this).find('span.dot').attr('style', 'background-color:grey');
                    break;
                case 'PCO':
                    $(this).find('span.dot').attr('color', 'grey');
                    $(this).find('span.dot').attr('style', 'background-color:grey');
                    break;
                case 'DONE':
                    $(this).find('span.dot').attr('color', 'black');
                    $(this).find('span.dot').attr('style', 'background-color:black');
                    break;
            }
        });
        const containerEl: JQuery = $('#calendar');
        const getParentEvent = function(event) {
            return $('#external-events .fc-event').filter(function() {
                return $(this).text().trim().includes(event[0].innerText.trim());
            })[0];
        };

        containerEl.fullCalendar({
            displayEventTime: false,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            events: (start, end, timezone, callback) => { //renders the calendar with all events available in database
                let all_events = this.getEvents(start.month(), end.month());
                callback(all_events);
            },
            eventRender: (event, element) => {
                const icon = $('<div><i class="fa fa-times icon" style="margin-right:2%;"></i></div>');
                
                icon.css({
                    'color': 'white',
                    'border-right': '1px solid white',
                    'display': 'inline',
                    'height': '100%',
                }).hide();

                icon.on('click', () => {  
                    let document = JSON.parse($(getParentEvent(element)).find('#document-id').text());
                    this.duedates[document.id] = '';
                    document.duedate = null;
                    this.documentService.update(document).subscribe(() => {});
                    containerEl.fullCalendar('removeEvents', event._id);
                });

                element.mouseenter(function() {
                    icon.show();
                }).mouseleave(function() {
                    icon.hide();
                });

                element.find('.fc-content').prepend(icon);
            },
            eventAfterRender: (event: any, element) => {
                let dueDate;

                if (!event.end) {
                    const date = new Date(event.start);
                    dueDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
                } else {
                    dueDate = new Date(event.end);
                }
                
                let document = ($(getParentEvent(element)).find('#document-id').text());
                if (document) {
                    let document = JSON.parse($(getParentEvent(element)).find('#document-id').text());
                    document.duedate = {
                        day: dueDate.getDate(),
                        month: dueDate.getMonth() + 1,
                        year: dueDate.getFullYear()
                    };
                    this.duedates[document.id] = dueDate;

                    this.documentService
                        .update(document)
                        .subscribe((res: HttpResponse<DocumentOpenSesame>) => {});
                }
            },
            drop() {
                $(this).draggable('disable');
                $(this).css('background-color', '#99ff99');
            },
            displayEventEnd: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            eventTextColor: 'white',
        });
    }
    openDocPreview(document) {
        this.modalRef = this.documentModalSerivce.open(document);
    }

    getEvents(start, end) {
        let events = [];
        for (let document of this.documents) {
            events.push({
                title: document.name,
                start: document.duedate,
                color: this.getColor(document.currstate),
                stick: true,
            });
        }
        return events;
    }

    private getColor(currstate) {
        let color = '';
        switch (currstate) {
            case 'CREATED':
                color = 'green';
                break;
            case 'AUTHOR':
                color = 'blue';
                break;
            case 'TE1':
                color = 'red';
                break;
            case 'CR':
                color = 'peru';
                break;
            case 'SIO':
                color = 'aqua';
                break;
            case 'ER':
                color = 'violet';
                break;
            case 'RO':
                color = 'purple';
                break;
            case 'TE2':
                color = 'grey';
                break;
            case 'GRAPHICS':
                color = 'grey';
                break;
            case 'PCO':
                color = 'grey';
                break;
            case 'DONE':
                color = 'black';
                break;
        }
        return color;
    }
}
