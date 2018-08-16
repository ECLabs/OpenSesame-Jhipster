import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { JhiTrackerService } from '../shared/tracker/tracker.service';
import * as $ from 'jquery';
import 'jqueryui';
import 'fullcalendar';
import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-director',
    templateUrl: './director.component.html',
    styleUrls: [
        'director.css'

    ],
    providers: [NgbPopoverConfig]
})
export class DirectorComponent implements OnInit, OnDestroy {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private config: NgbPopoverConfig,
        private trackerService: JhiTrackerService,
    ) {
        config.placement = 'right';
        config.triggers = 'hover';
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    ngOnDestroy() {
      this.trackerService.unsubscribe();
    }

    registerAuthenticationSuccess() {
        this.trackerService.subscribe();
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

    getContent() {
        return ['Created on: ', 'Created by: ', 'Due Date: ', 'Current State: ', 'Last State: ', 'Version: ', 'Comments: '];
    }
}
