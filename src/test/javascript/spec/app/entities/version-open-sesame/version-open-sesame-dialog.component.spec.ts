/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { VersionOpenSesameDialogComponent } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame-dialog.component';
import { VersionOpenSesameService } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.service';
import { VersionOpenSesame } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.model';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame';

describe('Component Tests', () => {

    describe('VersionOpenSesame Management Dialog Component', () => {
        let comp: VersionOpenSesameDialogComponent;
        let fixture: ComponentFixture<VersionOpenSesameDialogComponent>;
        let service: VersionOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [VersionOpenSesameDialogComponent],
                providers: [
                    DocumentOpenSesameService,
                    VersionOpenSesameService
                ]
            })
            .overrideTemplate(VersionOpenSesameDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionOpenSesameDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VersionOpenSesame(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.version = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'versionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VersionOpenSesame();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.version = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'versionListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
