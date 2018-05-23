import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { VersionOpenSesame } from './version-open-sesame.model';
import { VersionOpenSesameService } from './version-open-sesame.service';

@Injectable()
export class VersionOpenSesamePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private versionService: VersionOpenSesameService

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
                this.versionService.find(id)
                    .subscribe((versionResponse: HttpResponse<VersionOpenSesame>) => {
                        const version: VersionOpenSesame = versionResponse.body;
                        if (version.createdon) {
                            version.createdon = {
                                year: version.createdon.getFullYear(),
                                month: version.createdon.getMonth() + 1,
                                day: version.createdon.getDate()
                            };
                        }
                        this.ngbModalRef = this.versionModalRef(component, version);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.versionModalRef(component, new VersionOpenSesame());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    versionModalRef(component: Component, version: VersionOpenSesame): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.version = version;
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
