import { AttachmentRequestBody } from "@shared/model/attachment-request-body.model";

export interface RegisterCompanyRequest {
  commercialNumber: string;
  name: string;
  managerName: string;
  taxNumber: string;
  industryNumber: string;
  acceptEEANumber: string;
  activityId: number;
  userId?: number;
  ownerId?: number;
  importCardNumber: string,
  gov_id?:number;
  phoneNumber: string;
  email: string;
  quotaValidFrom: string;
  quotaValidTo: string;
  quota: number;
  purpose: string;
  address: string;
  companyTypeId: number;
  renewPermitStatus:string;
  attachments: AttachmentRequestBody[];
}

export  interface  EditCompanyRequest extends RegisterCompanyRequest{}

