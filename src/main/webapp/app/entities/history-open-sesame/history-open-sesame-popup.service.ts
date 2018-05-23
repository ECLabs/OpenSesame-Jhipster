import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { HistoryOpenSesame } from './history-open-sesame.model';
import { HistoryOpenSesameService } from './history-open-sesame.service';

@Injectable()
export class HistoryOpenSesamePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private historyService: HistoryOpenSesameService

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
                this.historyService.find(id)
                    .subscribe((historyResponse: HttpResponse<HistoryOpenSesame>) => {
                        const history: HistoryOpenSesame = historyResponse.body;
                        if (history.createdon) {
                            history.createdon = {
                                year: history.createdon.getFullYear(),
                                month: history.createdon.getMonth() + 1,
                                day: history.createdon.getDate()
                            };
                        }
                        this.ngbModalRef = this.historyModalRef(component, history);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.historyModalRef(component, new HistoryOpenSesame());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    historyModalRef(component: Component, history: HistoryOpenSesame): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.history = history;
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
