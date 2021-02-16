import { EditRequest } from "./EditRequest";
import { PublishRequest } from "./PublichRequest";

export class Posting {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public authorUsername: string,
        public publicationDate: Date,
        public lastEditedDate: Date
    ) { }

    public toPublishRequest(): PublishRequest{
        return new PublishRequest(this.title,this.content);
    }

    public toEditRequest(): EditRequest{
        return new EditRequest(this.id,this.title,this.content);
    }
}