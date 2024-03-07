import { ApiResponse } from "./api-response.model";
import { CompanyType } from "./company-type";
import { Attachement } from "./input.model";

export interface CompanyResponse extends ApiResponse {
  content?: Company[]
}

export interface Company {
  acceptEEA?: boolean,
  acceptEEANumber?: number,
  address?: string,
  attachments?: Attachement[]
  commercialNumber?: string,
  companyType?: CompanyType,
  companyTypeId?: number,
  email?: string,
  id?: number
  importCardNumber?: string,
  industryNumber?: string,
  managerName?: string,
  name?: string,
  ownerId?: number,
  phoneNumber?: string,
  purpose?: string,
  quota?: number,
  status?: string
  taxNumber?: string
}

