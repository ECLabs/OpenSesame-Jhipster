import { BaseEntity } from './../../shared';

export enum Status {
    'AUTHOR',
    'TE1',
    'CR',
    'SIO',
    'ER',
    'RO',
    'TE2',
    'DONE'
}

export class DocumentOpenSesame implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public createdon?: any,
        public createdby?: string,
        public fileContentType?: string,
        public file?: any,
        public duedate?: any,
        public currstate?: Status,
        public laststate?: Status,
        public currversionId?: number,
        public histories?: BaseEntity[],
        public comments?: BaseEntity[],
        public versions?: BaseEntity[],
    ) {
    }
}
