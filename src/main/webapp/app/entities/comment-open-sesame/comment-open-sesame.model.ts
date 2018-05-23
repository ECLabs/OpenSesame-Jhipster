import { BaseEntity } from './../../shared';

export class CommentOpenSesame implements BaseEntity {
    constructor(
        public id?: number,
        public createdon?: any,
        public comment?: any,
        public createdby?: string,
        public documentId?: number,
    ) {
    }
}
