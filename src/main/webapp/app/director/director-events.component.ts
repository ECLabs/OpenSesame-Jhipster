import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModalRef, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { DocumentOpenSesame } from '../entities/document-open-sesame/document-open-sesame.model';
import { DocumentOpenSesameService } from '../entities/document-open-sesame/document-open-sesame.service';
import { CommentOpenSesameService } from '../entities/comment-open-sesame/comment-open-sesame.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'jqueryui';
import 'fullcalendar';
import { Account } from '../shared';
import { staticEvents } from './staticEvents';

@Component({
    selector: 'jhi-director-events',
    templateUrl: './director-events.component.html',
    styleUrls: [
        'director.css'

    ],
    providers: [NgbPopoverConfig]
})

export class DirectorEventsComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    documents: DocumentOpenSesame[];
    duedates = {};
    staticEventTitles: String[] = this.getStaticEventTitles();

    constructor(
        private documentService: DocumentOpenSesameService,
        private commentService: CommentOpenSesameService
    ) {}

    getContent() {
        return ['Created on: ', 'Created by: ', 'Due Date: ', 'Current State: ', 'Last State: ', 'Version: ', 'Comments: '];
    }

    loadAll() {
        this.documentService.query({
        }).subscribe(
            (res: HttpResponse<DocumentOpenSesame[]>) => {
                this.documents = res.body;
                res.body.forEach(({ id, duedate }) => {
                    this.duedates[id] = duedate;
                });
            });
    }

    ngOnInit() {
        this.loadAll();
    }


    loadEvents() {
        /****************************************************************************
        *                         External Event Elements                           *
        ****************************************************************************/
        const __this = this;
        $('#external-events .fc-event').each(function() {
            // store data so the calendar knows to render an event upon drop
            $(this).data('event', {
                title: $.trim($(this).find('.title').text()), // use the element's text as the event title
                stick: true, // maintain when user navigates (see docs on the renderEvent method)
                color: $(this).find('span').attr('color'), // use the element's color value as the color of task
            });
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                appendTo: 'body',
                scroll: false,
                helper: 'clone',
                containment: 'widnow',
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
            if ($(this).find($('.due-date')).text()) { // has due date
                $(this).draggable('disable');
                $(this).css('background-color', '#99ff99');
            } else {
                $(this).draggable('enable');
                $(this).css('background-color', 'white');
            }

            /* document color keying */
            const currState = $(this).attr('id');
            const color = __this.getColor(currState);
            $(this).find('span.dot').attr('color', color);
            $(this).find('span.dot').attr('style', `background-color:${color}`);

            /*removing items from queue*/
            const remove_icon = $(this).find('.queue-remove');
            $(this).mouseenter(function() {
                if ($(this).css('backgroundColor') === 'rgb(255, 255, 255)') {
                    remove_icon.show();
                }
            }).mouseleave(function() {
                remove_icon.hide();
            });
        });

        /****************************************************************************
        *                         Calendar Elements                                 *
        ****************************************************************************/

        const containerEl: JQuery = $('#calendar');
        // Get the element in the queue associated with the parameter event
        const getParentEvent = function(event) {
            return $('#external-events .fc-event').filter(function() {
                return $(this).text().trim().includes(event.text());
            })[0];
        };

        containerEl.fullCalendar({
            displayEventTime: false,
            eventStartEditable: true,
            droppable: true, // this allows things to be dropped onto the calendar
            events: this.getEvents(),
            eventRender: (event, element) => {
                // Don't add the ability to remove the static events
                if (!this.staticEventTitles.includes(event.title)) {
                    const icon = $('<div><i class="fa fa-times icon" style="margin-right:3px;"></i></div>');

                    icon.css({
                        'color': 'white',
                        'border-right': '1px solid white',
                        'display': 'inline',
                        'height': '100%',
                    }).hide();

                    // Attach remove icon with click event handler on event render
                    icon.on('click', () => {
                        let document = JSON.parse($(getParentEvent(element)).find('#document-id').text());
                        this.duedates[document.id] = '';
                        document.duedate = null;
                        this.documentService.update(document).subscribe();
                        containerEl.fullCalendar('removeEvents', event._id);
                    });

                    element.mouseenter(function() {
                        icon.show();
                    }).mouseleave(function() {
                        icon.hide();
                    });

                    element.find('.fc-content').prepend(icon);
                }
            },
            eventAfterRender: (event: any, element) => {
                // Make static events unclickable/undraggable
                if (this.staticEventTitles.includes(event.title)) {
                    element.css('pointer-events', 'none');
                }

                // Add title to parent because pointer-events are removed for the static events
                element.parent().attr('title', event.title);

                const object = $(getParentEvent(element)).find('#document-id');

				if (object.length !== 0) {
                    const document = JSON.parse(object.text());
                    const newDueDate = moment(event.start).add(1, 'day');
                    const dueDateFormatted = new Date(new Date(newDueDate.toString()).setHours(0));

                    // Checks if the new due date is different from the old one to prevent unecessary updates
                    if (new Date(document.duedate).getTime() !== dueDateFormatted.getTime()) {
                        // Duedate has to be formatted like this for angular datepipe
                        document.duedate = {
                            year: event.start.year(),
                            month: event.start.month() + 1,
                            day: event.start.date(),
                        }

                        // Change local duedate to for document
                        // Local due date object prevents entire re-render of the page on a due date change
                        this.duedates[document.id] = newDueDate;
                        // Change due date in database
                        this.documentService.update(document).subscribe();
                    }
                }
            },
            displayEventEnd: true,
            eventLimit: false,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            eventTextColor: 'white',
        });
    }

    removeQueue(document) {
      var deleteComment = (comments) => {
        var doneDeleting = false;
        for(let comment_id in comments){
          if(document.id == comments[comment_id].documentId){
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
              this.documentService.delete(document.id).subscribe(res => this.ngOnInit());
            })
            .catch(function(err){
              console.log(err);
            })
        });
    }

    getStaticEventTitles() {
        return staticEvents.map(event => event.title);
    }

    getEvents() {
        let events = [];
        for (const document of this.documents) {
            events.push({
                title: document.name,
                start: document.duedate,
                color: this.getColor(document.currstate),
                eventStartEditable: true,
                allDay: true
            });
        }

        // Add static events to events rendering array
        events.push(...staticEvents);
        return events;
    }

    getColor(currstate) {
        let color = '';
        switch (currstate) {
            case 'CREATED':
                color = 'green';
                break;
            case 'AUTHOR':
                color = 'blue';
                break;
            case 'TE1':
                color = 'red';
                break;
            case 'CR':
                color = 'peru';
                break;
            case 'SIO':
                color = 'aqua';
                break;
            case 'ER':
                color = 'violet';
                break;
            case 'RO':
                color = 'purple';
                break;
            case 'TE2':
                color = 'grey';
                break;
            case 'GRAPHICS':
                color = 'grey';
                break;
            case 'PCO':
                color = 'grey';
                break;
            case 'DONE':
                color = 'black';
                break;
        }
        return color;
    }
}
