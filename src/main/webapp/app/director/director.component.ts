import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
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
export class DirectorComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private config: NgbPopoverConfig
    ) {
      config.placement = 'right';
      config.triggers = 'hover';
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();

        // $('#external-events .fc-event').each(function() {
        //       // store data so the calendar knows to render an event upon drop
        //       $(this).data('event', {
        //         title: $.trim($(this).find('.title').text()), // use the element's text as the event title
        //         stick: true, // maintain when user navigates (see docs on the renderEvent method)
        //         color: $(this).find('span').attr('color'), // use the element's color value as the color of task
        //       });
        //       // make the event draggable using jQuery UI
        //      $(this).draggable({
        //         zIndex: 999,
        //         revert: true,      // will cause the event to go back to its
        //         revertDuration: 0  //  original position after the drag
        //       });
        //     });


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

    getContent() {
        return ['Created on: ', 'Created by: ', 'Due Date: ', 'Current State: ', 'Last State: ', 'Version: ', 'Comments: '];
    }
}
