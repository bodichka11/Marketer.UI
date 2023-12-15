import { User } from "./User";
import { Interchange } from "./interchange";

export interface Chat {
    id: number;
    creationDate: Date;
    interchanges: Interchange[];
   }