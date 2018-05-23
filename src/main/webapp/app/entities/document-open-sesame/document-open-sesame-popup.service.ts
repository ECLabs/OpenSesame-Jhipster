import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';

@Injectable()
export class DocumentOpenSesamePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private documentService: DocumentOpenSesameService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.documentService.find(id)
                    .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
                        const document: DocumentOpenSesame = documentResponse.body;
                        if (document.createdon) {
                            document.createdon = {
                                year: document.createdon.getFullYear(),
                                month: document.createdon.getMonth() + 1,
                                day: document.createdon.getDate()
                            };
                        }
                        if (document.duedate) {
                            document.duedate = {
                                year: document.duedate.getFullYear(),
                                month: document.duedate.getMonth() + 1,
                                day: document.duedate.getDate()
                            };
                        }
                        this.ngbModalRef = this.documentModalRef(component, document);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.documentModalRef(component, new DocumentOpenSesame());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    documentModalRef(component: Component, document: DocumentOpenSesame): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.document = document;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
