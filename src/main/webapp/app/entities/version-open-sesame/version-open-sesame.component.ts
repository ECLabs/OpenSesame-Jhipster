import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { VersionOpenSesame } from './version-open-sesame.model';
import { VersionOpenSesameService } from './version-open-sesame.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-version-open-sesame',
    templateUrl: './version-open-sesame.component.html'
})
export class VersionOpenSesameComponent implements OnInit, OnDestroy {
versions: VersionOpenSesame[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private versionService: VersionOpenSesameService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.versionService.query().subscribe(
            (res: HttpResponse<VersionOpenSesame[]>) => {
                this.versions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVersions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VersionOpenSesame) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInVersions() {
        this.eventSubscriber = this.eventManager.subscribe('versionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
