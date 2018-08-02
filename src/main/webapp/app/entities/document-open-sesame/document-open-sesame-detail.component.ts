import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils, JhiAlertService } from 'ng-jhipster';
import { WindowRef , Account, Principal} from '../../shared';
import { DocumentOpenSesame, Status } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { CommentOpenSesame } from '../comment-open-sesame/comment-open-sesame.model';
import { CommentOpenSesameService } from '../comment-open-sesame/comment-open-sesame.service';
import * as mammoth from 'mammoth';

@Component({
    selector: 'jhi-document-open-sesame-detail',
    templateUrl: './document-open-sesame-detail.component.html',
    styleUrls: [
      "doc.css"
    ],
})


export class DocumentOpenSesameDetailComponent implements OnInit, OnDestroy {
    account: Account;
    document: DocumentOpenSesame;
    comments: Object;
    modalRef: NgbModalRef;
    dueCountdown: String;
    mouseOver: Boolean = false;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private window: WindowRef;
	private docHTML: String = "<p>Loading</p>";
    private files: any;
    private order: any[];
    private test: any;
    private enumValues:Array<string>=   Object.keys(Status)
      .map((k: any) => Status[k])
      .filter((v: any) => typeof v === 'string');
    private enumDictionary:any = {
      "AUTHOR" : "Author",
      "TE1" : "Tech Edit",
      "CR" : "Content Reviewer",
      "SIO" : "Senior Intel Officer",
      "ER" : "Executive Reviewer",
      "RO" : "Read Off",
      "TE2": "TE|GFX|PCO",
      "DONE": "Done"
    };

    private enumUserRoleDict: any = {
      "AUTHOR" : "ROLE_AUTHOR",
      "TE1" : "ROLE_TE",
      "CR" : "ROLE_CR",
      "SIO" : "ROLE_SIO",
      "ER" : "ROLE_ER",
      "RO" : "ROLE_RO",
      "TE2" : "ROLE_PCO",
    }

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private principal: Principal,
        private documentService: DocumentOpenSesameService,
        private commentService: CommentOpenSesameService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute
    ) {
    }



    approve(){
      this.documentService.approve(this.document.id)
          .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
              this.document = documentResponse.body;
          });
    }

    getAuthority(){
      return this.enumUserRoleDict[this.document.currstate];

    }


    statusDictionary(status:string){
      return this.enumDictionary[status];
    }

    isDone(){
      return this.document.currstate.toString() == "DONE";
    }

    isAuthor(){
      return this.document.currstate.toString() == "AUTHOR" && this.document.laststate.toString() == "AUTHOR";
    }

    deny(val:any){
      this.documentService.deny(this.document.id, val)
          .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
              this.document = documentResponse.body;
          });
    }

    denyShow(dIndex:number){
      if(this.document.currstate != this.document.laststate)
        return true;

      let index = this.enumValues.indexOf(this.document.currstate.toString());
      if(dIndex >= index){
        return true;
      }
      return false;
    }

    progress(progress:string) {

      let cssClasses = {};
      let index = this.enumValues.indexOf(this.document.currstate.toString());
      let lastIndex = this.enumValues.indexOf(this.document.laststate.toString());
      let progressIndex = this.enumValues.indexOf(progress);

      if(index != lastIndex && progressIndex == lastIndex){
          return {"last": true}
      }

      if(index > progressIndex || this.document.currstate.toString() == "DONE"){
        return {"completed": true}
      }
      else if(index == progressIndex){
        return {"active": true}
      }
      return {"none": true}
    }

    loadAll() {
        this.commentService.query().subscribe(
            (res: HttpResponse<CommentOpenSesame[]>) => {
                this.comments = this.initComments();
                res.body
                    .filter((comment) => this.document.id === comment.documentId)
                    .forEach((comment: any) => {
                        this.comments[comment.reason].push(comment);
                    });
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
	}

	initComments() {
		return {
			"Grammar": [],
			"Citations": [],
			"Lack of Detail": [],
			"Word Choice": []
		};
	}

    commentKeys() {
		this.comments = this.comments || this.initComments();
        return Object.keys(this.comments);
    }

    ngOnInit() {
	  this.docHTML = "";
      this.principal.identity().then((account) => {
          this.account = account;
      });
      var that = this.order;
      this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
      });

		this.registerChangeInDocuments();
		this.registerChangeInComments();

		this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    setDueCountdown() {
        if (this.document.duedate) {
            const timeDiff = this.document.duedate.getTime() - new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;
            const duration = Math.ceil((timeDiff) / (oneDay));
            if (duration > 0) {
                this.dueCountdown = `(${duration} ${duration === 1 ? 'Day' : 'Days'} Remaining)`;
            }
        }
    }

    showOptions(comment, show) {
        const options = $(`#options-${comment.id}`);
        if (show && this.account && comment.createdby === `${this.account.firstName} ${this.account.lastName}`) {
            options.show();
        } else {
            options.hide();
        }
    }
 
    deleteComment(comment) {
        this.commentService.delete(comment.id).subscribe((res) => {
            this.eventManager.broadcast({ name: 'commentListModification', content: 'OK'});
        });
    }

    editComment(comment) {
        
    }
 
    load(id) {
        this.documentService.find(id)
            .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
                this.document = documentResponse.body;
                this.window = new WindowRef();

                this.setDueCountdown();
                this.loadAll();
               

                // this.bar = this.window.nativeWindow.docxJS = this.window.nativeWindow.createDocxJS();

             
 

                const bs = atob(this.document.file);
				                const buffer = new ArrayBuffer(bs.length);
				                const ba = new Uint8Array(buffer);
				                for (let i = 0; i < bs.length; i++) {
				                    ba[i] = bs.charCodeAt(i);
				                }
               
			   var that = this;

			    mammoth.convertToHtml({arrayBuffer: ba})
			                   .then(function(result){
							   
							  that.docHTML = result.value;
							   
							   })
			                   .done();
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

    registerChangeInComments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'commentListModification',
            (response) => this.loadAll()
        );
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
