import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventService } from './event.service';
declare var $: any;
import * as moment from 'moment';

import { Account, LoginModalService, Principal} from '../shared';

@Component({
    selector: 'jhi-director',
    templateUrl: './director.component.html',
    styleUrls: [
        'director.css'
    ]

})
export class DirectorComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    calendarOptions: Options;
    displayEvent: any;

    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    constructor(
        protected eventService: EventService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {}
    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.eventService.getEvents().subscribe((data) => {
            this.calendarOptions = {
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            drop(date, jsEvent) {
                console.log(date, jsEvent);
            },
            eventLimit: false,
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: data
            };
        });
    }
    clickButton(model: any) {
        this.displayEvent = model;
    }
    eventClick(model: any) {
        model = {
            event: {
                id: model.event.id,
                start: model.event.start,
                end: model.event.end,
                title: model.event.title,
                allDay: model.event.allDay
                // other params
            },
            duration: {}
        };
        this.displayEvent = model;
    }
    updateEvent(model: any) {
        model = {
          event: {
            id: model.event.id,
            start: model.event.start,
            end: model.event.end,
            title: model.event.title
            // other params
          },
          duration: {
            _data: model.duration._data
          }
        };
        this.displayEvent = model;
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    externalEvents() {
        const externalEvents = {
            title: $.trim($('.fc-event').text()),
        }; // creating event object and makes event text as its title

        $('.fc-event').data('externalEvents', externalEvents); // saving events into DOM

        $('.fc-event').draggable({
            revert: true,      // immediately snap back to original position
            revertDuration: 0,
            zIndex: 999
        });
    }
}
