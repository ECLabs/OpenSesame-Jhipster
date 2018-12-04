import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesamePopupService } from './document-open-sesame-popup.service';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { CommentOpenSesameService } from '../comment-open-sesame/comment-open-sesame.service';
import { JhiTrackerService } from '../../shared';
import { VersionOpenSesameService } from '../version-open-sesame';
import { resolve } from 'url';

@Component({
    selector: 'jhi-document-open-sesame-delete-dialog',
    templateUrl: './document-open-sesame-delete-dialog.component.html'
})
export class DocumentOpenSesameDeleteDialogComponent {

    document: DocumentOpenSesame;

    constructor(
        private documentService: DocumentOpenSesameService,
        private commentService: CommentOpenSesameService,
        private versionService: VersionOpenSesameService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private trackerService: JhiTrackerService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
      var deleteComment = (comments) => {
        var doneDeleting = false;
        for(let comment_id in comments){
          if(id == comments[comment_id].documentId){
            // console.log(comments)
             this.commentService.delete(comments[comment_id].id).subscribe((res)=>{
             // callback after deleting
           });
          }
        }
          doneDeleting = true;
          return new Promise((resolve, reject)=>{
            if(doneDeleting){
              resolve('Done Deleting!');
            }else{
              var reason = new Error('did not finish deleting comments');
              reject(reason);
            }
          })
    }

        this.versionService.query().subscribe((res) => {
            let promises = [];

            for (let version of res.body) {
                if (version.documentId === id) {
                    promises.push(new Promise((resolve, reject) => {
                        this.versionService.delete(version.id).subscribe((res) => {
                            resolve('Delete complete');
                        }, (err) => {
                            reject(err);
                        });
                    }));
                }
            }

            Promise.all(promises).then(() => {
                this.commentService.query().subscribe((res) => {
                    deleteComment(res.body)
                    .then((fullfilled) => {
                        this.documentService.delete(id).subscribe((response) => {
                            this.eventManager.broadcast({
                                name: 'documentListModification',
                                content: 'Deleted an document'
                            });
                            this.activeModal.dismiss(true);
                        });
                        this.trackerService.sendDocumentActivity("Document with ID " + id + " was Deleted");
                        })
                    .catch(function(err){
                        console.log(err);
                    })
                });
            });
        });

        this.versionService.query().subscribe((res) => { console.log(res.body) });
    }
}

@Component({
    selector: 'jhi-document-open-sesame-delete-popup',
    template: ''
})
export class DocumentOpenSesameDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentPopupService: DocumentOpenSesamePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentPopupService
                .open(DocumentOpenSesameDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
