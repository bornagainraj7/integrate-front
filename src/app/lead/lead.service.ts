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

  private baseUrl = `${environment.baseUrl}/lead`;
  private insUrl = `${environment.baseUrl}/ins-comp`;
  private compUrl = `${environment.baseUrl}/com-type`;
  private policyUrl = `${environment.baseUrl}/policy-type`;

  private allUserLeads: [];
  private allInsCompanies: [];
  private allPolicyTypes: [];
  private allComplaintTypes: [];

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

  getAllComplaintTypes() {
    return this.allComplaintTypes;
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

  fetchAllComplaintTypes() {
    this.http.get<ResponseData>(`${this.compUrl}/getall`)
      .subscribe((response) => {
        if (!response.error) {
          this.allComplaintTypes = response.data;
          this.complaintTypesList.next([...this.allComplaintTypes]);
        } else {
          this.complaintTypesList.next(null);
        }
      }, (error) => {
        console.log(error.error);
      });
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
}
