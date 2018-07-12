import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Account, LoginModalService, Principal } from '../shared';

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

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private router: Router,
    ) { }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            if (account) {
                this.user = {
                    firstName: account.firstName,
                    lastName: account.lastName,
                    role: this.getRole(account.authorities)
                };
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
                    role: this.getRole(account.authorities)
                };
            });
        });
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

    getRole(rolesArray) {
        switch(rolesArray[rolesArray.length - 1]) {
            case 'ROLE_USER':
                return 'User';
            case 'ROLE_ADMIN': 
                return 'Administrator';
            case 'ROLE_MANAGER':
                return 'Manager';
            case 'ROLE_SIO':
                return 'Senior Intel Officer';
            case 'ROLE_ER':
                return 'Executive Reviewer';
            case 'ROLE_AUTHOR':
                return 'Author';
            case 'ROLE_TE':
                return 'Tech Editor';
            case 'ROLE_CR':
                return 'Content Reviewer';
            case 'ROLE_PCO':
                return 'PCO';
        }
    }

}
