/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { OpenSesameTestModule } from '../../../test.module';
import { CommentOpenSesameComponent } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.component';
import { CommentOpenSesameService } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.service';
import { CommentOpenSesame } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.model';

describe('Component Tests', () => {

    describe('CommentOpenSesame Management Component', () => {
        let comp: CommentOpenSesameComponent;
        let fixture: ComponentFixture<CommentOpenSesameComponent>;
        let service: CommentOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [CommentOpenSesameComponent],
                providers: [
                    CommentOpenSesameService
                ]
            })
            .overrideTemplate(CommentOpenSesameComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentOpenSesameComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CommentOpenSesame(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.comments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
