/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OpenSesameTestModule } from '../../../test.module';
import { DocumentOpenSesameDetailComponent } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame-detail.component';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.service';
import { DocumentOpenSesame } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.model';

describe('Component Tests', () => {

    describe('DocumentOpenSesame Management Detail Component', () => {
        let comp: DocumentOpenSesameDetailComponent;
        let fixture: ComponentFixture<DocumentOpenSesameDetailComponent>;
        let service: DocumentOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [DocumentOpenSesameDetailComponent],
                providers: [
                    DocumentOpenSesameService
                ]
            })
            .overrideTemplate(DocumentOpenSesameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentOpenSesameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DocumentOpenSesame(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.document).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
