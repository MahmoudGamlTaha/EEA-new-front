import { AttachmentRequestBody } from "@shared/model/attachment-request-body.model";

export interface ValidateCompanyRequest {
  customerName: string;
  commercialNumber: number;
  email: string;
  taxNumber: string;
  phoneNumber: string;
  job: string;
  nationalNumber: number;
  companyId?: number;
  attachments: AttachmentRequestBody[];
}

