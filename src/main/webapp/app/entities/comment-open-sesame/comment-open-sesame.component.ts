import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CommentOpenSesame } from './comment-open-sesame.model';
import { CommentOpenSesameService } from './comment-open-sesame.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-comment-open-sesame',
    templateUrl: './comment-open-sesame.component.html'
})
export class CommentOpenSesameComponent implements OnInit, OnDestroy {
comments: CommentOpenSesame[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private commentService: CommentOpenSesameService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.commentService.query().subscribe(
            (res: HttpResponse<CommentOpenSesame[]>) => {
                this.comments = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInComments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CommentOpenSesame) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe('commentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
