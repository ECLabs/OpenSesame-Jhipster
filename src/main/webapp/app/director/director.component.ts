import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Options } from 'fullcalendar';
import { CalendarComponent } from 'ng-fullcalendar';

import { Account, LoginModalService, Principal } from '../shared';

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
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        this.calendarOptions = {
        editable: true,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        }
      };
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
}
