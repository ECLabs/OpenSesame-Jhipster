import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';

import { Account, LoginModalService, Principal } from '../shared';
import { DocumentOpenSesameService } from '../entities/document-open-sesame/document-open-sesame.service';
import { DocumentOpenSesame } from '../entities/document-open-sesame';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    user: Object = {
        firstName: '',
        lastName: '',
        role: ''
    };
    modalRef: NgbModalRef;
    closeResult: string;
    documentsRoleSpecific: DocumentOpenSesame[];
    dueWeekDocuments: DocumentOpenSesame[];
    nextSaturday: Date = this.getDateForDay(6, true);
    prevSunday: Date = this.getDateForDay(0, false);

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private router: Router,
        private documentService: DocumentOpenSesameService
    ) { }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (account) {
                this.user = {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    role: this.getRole(account.authorities, true)
                };
                this.getDocuments();
            }
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.user = {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    role: this.getRole(account.authorities, true)
                };
                this.getDocuments();
            });
        });
    }

    // Helper function to find the date for the next x day from today's date (ex: date of the next sunday)
    // Days of the week are 0 (Sunday) - 6 (Saturday)
    // Next is a boolean - if it's true it means you want the next date for that day of the week
    // If it's false it means you want the previous date for that day of the week
    getDateForDay(dayOfWeek, next) {
        const today = new Date();
        const date = new Date(today.getTime());
        date.setDate(today.getDate() + ((next ? 7 : -7) + dayOfWeek - today.getDay()) % 7);
        date.setHours(0, 0, 0, 0);
        return date;
    }

    getDocuments() {
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => {
                this.dueWeekDocuments = res.body.filter((doc) => {
                    const dueDate = new Date(doc.duedate);
                    return dueDate >= this.prevSunday && dueDate <= this.nextSaturday;
                });

                this.documentsRoleSpecific = res.body.filter((doc) => {
                    const status = this.getRole(this.account.authorities, false);
                    return status === 'ADMIN' ? true : String(doc.currstate) === status;
                });
            });
    }

    goToDoc(docId) {
        this.router.navigateByUrl(`/document-open-sesame/${docId}`);
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    open(content) {
        this.modalRef = this.modalService.open(content, {});
    }

    redirect() {
      this.modalRef.close();
      this.router.navigate(['doc']);
    }

    getRole(rolesArray, formatted) {
        switch(rolesArray[rolesArray.length - 1]) {
            case 'ROLE_USER':
                return 'User';
            case 'ROLE_ADMIN': 
                return formatted ? 'Administrator' : 'ADMIN';
            case 'ROLE_MANAGER':
                return formatted ? 'Manager' : 'ADMIN';
            case 'ROLE_SIO':
                return formatted ? 'Senior Intel Officer' : 'SIO';
            case 'ROLE_ER':
                return formatted ? 'Executive Reviewer' : 'ER';
            case 'ROLE_AUTHOR':
                return formatted ? 'Author' : 'AUTHOR';
            case 'ROLE_TE':
                return formatted ? 'Tech Editor' : 'TE1';
            case 'ROLE_CR':
                return formatted ? 'Content Reviewer' : 'CR';
            case 'ROLE_PCO':
                return formatted ? 'PCO' : 'TE2';
        }
    }

}
