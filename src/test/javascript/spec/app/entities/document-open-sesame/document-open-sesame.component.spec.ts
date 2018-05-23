/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenSesameTestModule } from '../../../test.module';
import { DocumentOpenSesameComponent } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.component';
import { DocumentOpenSesameService } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.service';
import { DocumentOpenSesame } from '../../../../../../main/webapp/app/entities/document-open-sesame/document-open-sesame.model';

describe('Component Tests', () => {

    describe('DocumentOpenSesame Management Component', () => {
        let comp: DocumentOpenSesameComponent;
        let fixture: ComponentFixture<DocumentOpenSesameComponent>;
        let service: DocumentOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [DocumentOpenSesameComponent],
                providers: [
                    DocumentOpenSesameService
                ]
            })
            .overrideTemplate(DocumentOpenSesameComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentOpenSesameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DocumentOpenSesame(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.documents[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
