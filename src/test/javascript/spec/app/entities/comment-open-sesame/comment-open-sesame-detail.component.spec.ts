/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { OpenSesameTestModule } from '../../../test.module';
import { CommentOpenSesameDetailComponent } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame-detail.component';
import { CommentOpenSesameService } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.service';
import { CommentOpenSesame } from '../../../../../../main/webapp/app/entities/comment-open-sesame/comment-open-sesame.model';

describe('Component Tests', () => {

    describe('CommentOpenSesame Management Detail Component', () => {
        let comp: CommentOpenSesameDetailComponent;
        let fixture: ComponentFixture<CommentOpenSesameDetailComponent>;
        let service: CommentOpenSesameService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [OpenSesameTestModule],
                declarations: [CommentOpenSesameDetailComponent],
                providers: [
                    CommentOpenSesameService
                ]
            })
            .overrideTemplate(CommentOpenSesameDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CommentOpenSesameDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentOpenSesameService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CommentOpenSesame(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.comment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
