import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';

@Component({
    selector: 'jhi-document-open-sesame-detail',
    templateUrl: './document-open-sesame-detail.component.html'
})
export class DocumentOpenSesameDetailComponent implements OnInit, OnDestroy {

    document: DocumentOpenSesame;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private documentService: DocumentOpenSesameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocuments();
    }

    load(id) {
        this.documentService.find(id)
            .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
                this.document = documentResponse.body;
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

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentListModification',
            (response) => this.load(this.document.id)
        );
    }
}
