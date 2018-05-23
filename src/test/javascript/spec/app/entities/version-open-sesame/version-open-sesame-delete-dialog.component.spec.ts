/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { OpenSesameTestModule } from '../../../test.module';
import { VersionOpenSesameDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame-delete-dialog.component';
import { VersionOpenSesameService } from '../../../../../../main/webapp/app/entities/version-open-sesame/version-open-sesame.service';

describe('Component Tests', () => {

    describe('VersionOpenSesame Management Delete Component', () => {
        let comp: VersionOpenSesameDeleteDialogComponent;
        let fixture: ComponentFixture<VersionOpenSesameDeleteDialogComponent>;
        let service: VersionOpenSesameService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [VersionOpenSesameDeleteDialogComponent],
                providers: [
                    VersionOpenSesameService
                ]
            })
            .overrideTemplate(VersionOpenSesameDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionOpenSesameDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionOpenSesameService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
