import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentOpenSesame } from './document-open-sesame.model';
import { DocumentOpenSesamePopupService } from './document-open-sesame-popup.service';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { CommentOpenSesameService } from '../comment-open-sesame/comment-open-sesame.service';
import { JhiTrackerService } from '../../shared';

@Component({
    selector: 'jhi-document-open-sesame-delete-dialog',
    templateUrl: './document-open-sesame-delete-dialog.component.html'
})
export class DocumentOpenSesameDeleteDialogComponent {

    document: DocumentOpenSesame;

    constructor(
        private documentService: DocumentOpenSesameService,
        private commentService: CommentOpenSesameService,
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
