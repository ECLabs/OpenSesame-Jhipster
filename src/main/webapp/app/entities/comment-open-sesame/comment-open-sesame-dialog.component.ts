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
import { Principal, Account } from '../../shared';

@Component({
    selector: 'jhi-comment-open-sesame-dialog',
    templateUrl: './comment-open-sesame-dialog.component.html'
})
export class CommentOpenSesameDialogComponent implements OnInit {

    comment: CommentOpenSesame;
    isSaving: boolean;
    val: any;
    documentId: Number;
    account: Account;

    document: DocumentOpenSesame;
    createdonDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private principal: Principal,
        private route: ActivatedRoute,
        private jhiAlertService: JhiAlertService,
        private commentService: CommentOpenSesameService,
        private documentService: DocumentOpenSesameService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });

        this.isSaving = false;
        this.route.queryParams.subscribe((params) => {
            this.val = (params['val']);
            this.documentId = Number(params['docId']);
        });
        this.documentService.query()
            .subscribe((res: HttpResponse<DocumentOpenSesame[]>) => {
                this.document = res.body.filter((document) => document.id === this.documentId)[0];
                this.document.createdby = this.val;
            }, (res: HttpErrorResponse) => this.onError(res.message));
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

    deny() {
      this.documentService.deny(this.document.id, this.document.createdby)
          .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
              this.document = documentResponse.body;
          });
      this.clear();
    }

    save() {
        this.isSaving = true;
        this.setAutomaticFields();
        if (this.comment.id !== undefined) {
            this.subscribeToSaveResponse(
                this.commentService.update(this.comment));
        } else {
            this.subscribeToSaveResponse(
                this.commentService.create(this.comment));
        }
        this.deny();
    }

    setAutomaticFields() {
        this.comment.documentId = this.document.id;
        this.comment.createdby = `${this.account.firstName} ${this.account.lastName}`;
        const today = new Date();
        this.comment.createdon = {
            year: today.getFullYear(),
            month: today.getMonth() + 1,
            day: today.getDate()
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
