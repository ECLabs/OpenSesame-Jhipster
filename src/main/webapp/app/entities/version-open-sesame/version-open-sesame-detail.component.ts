import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { VersionOpenSesame } from './version-open-sesame.model';
import { VersionOpenSesameService } from './version-open-sesame.service';

@Component({
    selector: 'jhi-version-open-sesame-detail',
    templateUrl: './version-open-sesame-detail.component.html'
})
export class VersionOpenSesameDetailComponent implements OnInit, OnDestroy {

    version: VersionOpenSesame;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private versionService: VersionOpenSesameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVersions();
    }

    load(id) {
        this.versionService.find(id)
            .subscribe((versionResponse: HttpResponse<VersionOpenSesame>) => {
                this.version = versionResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVersions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'versionListModification',
            (response) => this.load(this.version.id)
        );
    }
}
