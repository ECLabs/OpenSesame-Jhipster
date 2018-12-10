import { BaseEntity } from './../../shared';

export class VersionOpenSesame implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public createdon?: any,
        public createdby?: string,
        public fileContentType?: string,
        public file?: any,
        public versionNumber?: number,
        public documentId?: number,
    ) {
    }
}
