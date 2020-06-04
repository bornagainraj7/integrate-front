import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ToastMessageService } from '../toastr.service';
import { Router } from '@angular/router';
import { ResponseData } from '../models/responseData.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private baseUrl = `${environment.baseUrl}/api/v1/lead`;
  private insUrl = `${environment.baseUrl}/api/v1/ins-comp`;
  private compUrl = `${environment.baseUrl}/api/v1/com-type`;
  private policyUrl = `${environment.baseUrl}/api/v1/policy-type`;

  private allUserLeads: [];
  private allInsCompanies: [];
  private allPolicyTypes: [];

  private usersLeadsList = new Subject<any[]>();
  private insCompaniesList = new Subject<any[]>();
  private policyTypesList = new Subject<any[]>();
  private complaintTypesList = new Subject<any[]>();


  constructor(
    private http: HttpClient,
    private toast: ToastMessageService,
    private router: Router,
  ) { }


  getAllUserLeads() {
    return this.allUserLeads;
  }

  getAllInsCompanies() {
    return this.allInsCompanies;
  }

  getAllPolicyTypes() {
    return this.allPolicyTypes;
  }


  getUpdatedInsCompaniesListener() {
    return this.insCompaniesList.asObservable();
  }

  getUpdatedPolicyTypesListener() {
    return this.policyTypesList.asObservable();
  }

  getUpdatedComplaintTypesListener() {
    return this.complaintTypesList.asObservable();
  }

  getUpdatedUserLeadsListener() {
    return this.usersLeadsList.asObservable();
  }


  fetchAllInsCompanies() {
    this.http.get<ResponseData>(`${this.insUrl}/getall`)
      .subscribe((response) => {
        if (!response.error) {
          this.allInsCompanies = response.data;
          this.insCompaniesList.next([...this.allInsCompanies]);
        } else {
          this.insCompaniesList.next(null);
        }
      }, (error) => {
        console.log(error.error);
      });
  }

  fetchAllPolicyTypes() {
    this.http.get<ResponseData>(`${this.policyUrl}/getall`)
      .subscribe((response) => {
        if (!response.error) {
          this.allPolicyTypes = response.data;
          this.policyTypesList.next([...this.allPolicyTypes]);
        } else {
          this.policyTypesList.next(null);
        }
      }, (error) => {
        console.log(error.error);
      });
  }

  fetchComplaintTypes(policyId) {
    return this.http.get<ResponseData>(`${this.compUrl}/get/${policyId}`);
  }

  fetchAllUserLeads(page, size) {
    this.http.get<ResponseData>(`${this.baseUrl}/get?page=${page}&size=${size}`)
      .subscribe((response) => {
        if (!response.error) {
          this.allUserLeads = response.data;
          this.usersLeadsList.next([...this.allUserLeads]);
        } else {
          this.usersLeadsList.next(null);
        }
      }, (error) => {
        console.log(error.error);
      });
  }


  fetchLeadsCount() {
    return this.http.get<ResponseData>(`${this.baseUrl}/count`);
  }


  fetchSingleLead(leadId) {
    return this.http.get<ResponseData>(`${this.baseUrl}/single/${leadId}`);
  }


  submitLead(leadData) {
    this.http.post<ResponseData>(`${this.baseUrl}/new`, leadData)
      .subscribe((response) => {
        if (!response.error) {
          this.toast.toastSuccess(response.message);
          this.router.navigate(['/portal/lead/list']);
        }
      }, (error) => {
        console.log(error.error);
      });
  }

  leadWithoutToken(leadData, userId) {
    return this.http.post<ResponseData>(`${this.baseUrl}/create/new/${userId}`, leadData);
  }

  updateLeadDocs(leadId, leadDocs) {
    this.http.put<ResponseData>(`${this.baseUrl}/update/docs/${leadId}`, leadDocs)
      .subscribe((response) => {
        if (!response.error) {
          this.toast.toastSuccess(response.message);
          // this.router.navigate([`/portal/lead/docs/${leadId}`]);
        }
      }, (error) => {
        console.log(error.error);
        this.toast.toastError(error.error.message);
      });
  }

  getFilteredLeads(search, page, size) {
    return this.http.get<ResponseData>(`${this.baseUrl}/filter?search=${search}&page=${page}&size=${size}`);
  }

  addComment(leadId, comData) {
    this.http.put<ResponseData>(`${this.baseUrl}/comment/add/${leadId}`, comData)
      .subscribe((response) => {
        if (!response.error) {
          this.toast.toastSuccess(response.message);
        } else {
          this.toast.toastError(response.message);
        }
      }, (error) => {
        console.log(error.error);
        this.toast.toastError(error.error.message);
      });
  }
}
