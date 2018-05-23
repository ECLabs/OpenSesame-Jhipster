import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CommentOpenSesame } from './comment-open-sesame.model';
import { CommentOpenSesamePopupService } from './comment-open-sesame-popup.service';
import { CommentOpenSesameService } from './comment-open-sesame.service';

@Component({
    selector: 'jhi-comment-open-sesame-delete-dialog',
    templateUrl: './comment-open-sesame-delete-dialog.component.html'
})
export class CommentOpenSesameDeleteDialogComponent {

    comment: CommentOpenSesame;

    constructor(
        private commentService: CommentOpenSesameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.commentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'commentListModification',
                content: 'Deleted an comment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-comment-open-sesame-delete-popup',
    template: ''
})
export class CommentOpenSesameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private commentPopupService: CommentOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.commentPopupService
                .open(CommentOpenSesameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
