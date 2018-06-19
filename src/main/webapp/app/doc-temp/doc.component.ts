import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import * as $ from 'jquery';
import 'jqueryui';

import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'jhi-doc',
    templateUrl: './doc.component.html',
    styleUrls: [
        'doc.css'
    ]

})
export class DocComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

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

    approve() {
      const author: JQuery = $('#author');
      const te: JQuery = $('#te');
      const cr: JQuery = $('#cr');
      const sio: JQuery = $('#sio');
      const er: JQuery = $('#er');
      const ro: JQuery = $('#ro');
      const pco: JQuery = $('#pco');
      const done: JQuery = $('#done');

      if (author.hasClass("active") && te.hasClass("none")) {
        author.removeClass("active").addClass("completed");
        te.removeClass("none").addClass("active");
      } else if (te.hasClass("active") && cr.hasClass("none")) {
        te.removeClass("active").addClass("completed");
        cr.removeClass("none").addClass("active");
      } else if (cr.hasClass("active") && sio.hasClass("none")) {
        cr.removeClass("active").addClass("completed");
        sio.removeClass("none").addClass("active");
      } else if (sio.hasClass("active") && er.hasClass("none")) {
        sio.removeClass("active").addClass("completed");
        er.removeClass("none").addClass("active");
      } else if (er.hasClass("active") && ro.hasClass("none")) {
        er.removeClass("active").addClass("completed");
        ro.removeClass("none").addClass("active");
      } else if (ro.hasClass("active") && pco.hasClass("none")) {
        ro.removeClass("active").addClass("completed");
        pco.removeClass("none").addClass("active");
      } else if (pco.hasClass("active") && done.hasClass("none")) {
        pco.removeClass("active").addClass("completed");
        done.removeClass("none").addClass("completed");
      }
    }

    deny() {
      const author: JQuery = $('#author');
      const te: JQuery = $('#te');
      const cr: JQuery = $('#cr');
      const sio: JQuery = $('#sio');
      const er: JQuery = $('#er');
      const ro: JQuery = $('#ro');
      const pco: JQuery = $('#pco');
      const done: JQuery = $('#done');

      if (done.hasClass("completed") && pco.hasClass("completed")) {
        done.removeClass("completed").addClass("none");
        pco.removeClass("completed").addClass("active");
      } else if (pco.hasClass("active") && ro.hasClass("completed")) {
        pco.removeClass("active").addClass("none");
        ro.removeClass("completed").addClass("active");
      } else if (ro.hasClass("active") && er.hasClass("completed")) {
        ro.removeClass("active").addClass("none");
        er.removeClass("completed").addClass("active");
      } else if (er.hasClass("active") && sio.hasClass("completed")) {
        er.removeClass("active").addClass("none");
        sio.removeClass("completed").addClass("active");
      } else if (sio.hasClass("active") && cr.hasClass("completed")) {
        sio.removeClass("active").addClass("none");
        cr.removeClass("completed").addClass("active");
      } else if (cr.hasClass("active") && te.hasClass("completed")) {
        cr.removeClass("active").addClass("none");
        te.removeClass("completed").addClass("active");
      } else if (te.hasClass("active") && author.hasClass("completed")) {
        te.removeClass("active").addClass("none");
        author.removeClass("completed").addClass("active");
      }


    }
}
