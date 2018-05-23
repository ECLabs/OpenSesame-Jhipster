import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { CommentOpenSesame } from './comment-open-sesame.model';
import { CommentOpenSesameService } from './comment-open-sesame.service';

@Component({
    selector: 'jhi-comment-open-sesame-detail',
    templateUrl: './comment-open-sesame-detail.component.html'
})
export class CommentOpenSesameDetailComponent implements OnInit, OnDestroy {

    comment: CommentOpenSesame;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private commentService: CommentOpenSesameService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInComments();
    }

    load(id) {
        this.commentService.find(id)
            .subscribe((commentResponse: HttpResponse<CommentOpenSesame>) => {
                this.comment = commentResponse.body;
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

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentListModification',
            (response) => this.load(this.comment.id)
        );
    }
}
