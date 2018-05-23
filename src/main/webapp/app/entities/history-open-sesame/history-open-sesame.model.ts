import { BaseEntity } from './../../shared';

export class HistoryOpenSesame implements BaseEntity {
    constructor(
        public id?: number,
        public createdon?: any,
        public description?: string,
        public createdfor?: string,
        public documentId?: number,
    ) {
    }
}
