import { ResponseCode } from "types/enum";

export default interface ResponseDTO {
    code: ResponseCode;
    message: string;
}