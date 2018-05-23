import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { CommentOpenSesame } from './comment-open-sesame.model';
import { CommentOpenSesamePopupService } from './comment-open-sesame-popup.service';
import { CommentOpenSesameService } from './comment-open-sesame.service';
import { DocumentOpenSesame, DocumentOpenSesameService } from '../document-open-sesame';

@Component({
    selector: 'jhi-comment-open-sesame-dialog',
    templateUrl: './comment-open-sesame-dialog.component.html'
})
export class CommentOpenSesameDialogComponent implements OnInit {

    comment: CommentOpenSesame;
    isSaving: boolean;

    documents: DocumentOpenSesame[];
    createdonDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private commentService: CommentOpenSesameService,
        private documentService: DocumentOpenSesameService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.documentService.query()
            .subscribe((res: HttpResponse<DocumentOpenSesame[]>) => { this.documents = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CommentOpenSesame>>) {
        result.subscribe((res: HttpResponse<CommentOpenSesame>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CommentOpenSesame) {
        this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDocumentById(index: number, item: DocumentOpenSesame) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-comment-open-sesame-popup',
    template: ''
})
export class CommentOpenSesamePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.commentPopupService
                    .open(CommentOpenSesameDialogComponent as Component, params['id']);
            } else {
                this.commentPopupService
                    .open(CommentOpenSesameDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
