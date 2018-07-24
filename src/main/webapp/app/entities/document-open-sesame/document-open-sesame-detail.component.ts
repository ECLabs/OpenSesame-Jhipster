import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { WindowRef , Account, Principal} from '../../shared';
import { DocumentOpenSesame, Status } from './document-open-sesame.model';
import { DocumentOpenSesameService } from './document-open-sesame.service';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

import { DenyModalService } from '../../shared';



@Component({
    selector: 'jhi-document-open-sesame-detail',
    templateUrl: './document-open-sesame-detail.component.html',
    styleUrls: [
      "doc.css"
    ],
    providers: [NgbPopoverConfig]
})


export class DocumentOpenSesameDetailComponent implements OnInit, OnDestroy {
    account: Account;
    document: DocumentOpenSesame;
    modalRef: NgbModalRef;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private window: WindowRef;
    private docxJS: any;
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
        private route: ActivatedRoute,
        private denyModalSerivce: DenyModalService
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
       this.modalRef = this.denyModalSerivce.open();

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

    ngOnInit() {

      this.principal.identity().then((account) => {
          this.account = account;
      });
      var that = this.order;
      this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
      });

      this.registerChangeInDocuments();

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

    load(id) {
        this.documentService.find(id)
            .subscribe((documentResponse: HttpResponse<DocumentOpenSesame>) => {
                this.document = documentResponse.body;
                this.window = new WindowRef();



                // this.bar = this.window.nativeWindow.docxJS = this.window.nativeWindow.createDocxJS();

                const docxJS = new this.window.nativeWindow.DocxJS();
                const fileURL = `${this.document.file}`;

                const bs = atob(fileURL);
                const buffer = new ArrayBuffer(bs.length);
                const ba = new Uint8Array(buffer);
                for (let i = 0; i < bs.length; i++) {
                    ba[i] = bs.charCodeAt(i);
                }
                const file = new Blob([ba], { type: this.document.fileContentType });

                // File Parsing
                docxJS.parse(
                    file,
                    function() {
                        // After Rendering
                        docxJS.render($('#docxjs-wrapper')[0], function(result) {
                            if (result.isError) {
                                console.log(result.msg);
                            } else {
                                console.log('Success Render');
                            }
                        });
                    }, function(e) {
                        console.log('Error!', e);
                    }
                );
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
