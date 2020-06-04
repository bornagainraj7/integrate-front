import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LeadService } from '../lead.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocModalComponent } from '../doc-modal/doc-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css']
})
export class DocsComponent implements OnInit {

  baseUrl = environment.baseUrl;
  userId;
  dialogRef;

  authStatusSubs: Subscription;

  leadId;
  leadData;

  policyType = 'General Insurance';

  generalInsurance = {
    policyBook: '',
    rejectionLetter: '',
    claimBill: '',
    surveyorReport: '',
  };


  lifeInsurance = {
    policySchedule: '',
    emailExchange: '',
  };


  healthInsurance = {
    dischargeSummary: '',
    rejectionLetter: '',
    claimBill: '',
    dischargeDocument: '',
  };

  dialogOptions = {
    // height: '400px',
    // width: '650px',
    disableClose: true,
    data: {},
  };

  data = {
    id: 8794561,
  };

  constructor(
    private authService: AuthService,
    private leadService: LeadService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: { id: string },
    public docsDailogRef: MatDialogRef<DocsComponent>,
  ) { }

  ngOnInit(): void {
    this.getLeadData();
    this.dialogOptions.data = this.data;
  }

  getLeadData() {
    this.leadService.fetchSingleLead(this.leadId)
      .subscribe((response) => {
        this.leadData = response.data;
        this.policyType = this.leadData.policyTypeId.name;
        this.userId = this.leadData.userId._id;
      });
  }

  onClose() {
    this.docsDailogRef.close();
  }

  onImagePickedGeneral(event) {
    const formData = new FormData();
    if (event.path[0].name === 'policyBook') {
      this.generalInsurance.policyBook = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'PolicyBook');
    }

    if (event.path[0].name === 'rejectionLetter') {
      this.generalInsurance.rejectionLetter = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'RejectionLetter');
    }

    if (event.path[0].name === 'claimBill') {
      this.generalInsurance.claimBill = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'ClaimBill');
    }

    if (event.path[0].name === 'surveyorReport') {
      this.generalInsurance.surveyorReport = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'SurveyorReport');
    }

    this.leadService.updateLeadDocs(this.leadId, formData);
    this.getLeadData();
    setTimeout(() => {
      this.generalInsurance = {
        policyBook: '',
        rejectionLetter: '',
        claimBill: '',
        surveyorReport: '',
      };
    }, 3000);
  }

  onImagePickedLife(event) {
    const formData = new FormData();
    if (event.path[0].name === 'policySchedule') {
      this.lifeInsurance.policySchedule = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'PolicySchedule');
    }

    if (event.path[0].name === 'emailExchange') {
      this.lifeInsurance.emailExchange = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'EmailExchange');
    }

    this.leadService.updateLeadDocs(this.leadId, formData);
    this.getLeadData();
    setTimeout(() => {
      this.lifeInsurance = {
        policySchedule: '',
        emailExchange: '',
      };
    }, 3000);
  }

  onImagePickedHealth(event) {
    const formData = new FormData();
    if (event.path[0].name === 'dischargeSummary') {
      this.healthInsurance.dischargeSummary = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'DischargeSummary');
    }

    if (event.path[0].name === 'rejectionLetter') {
      this.healthInsurance.rejectionLetter = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'RejectionLetter');
    }

    if (event.path[0].name === 'claimBill') {
      this.healthInsurance.claimBill = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'ClaimBill');
    }

    if (event.path[0].name === 'dischargeDocument') {
      this.healthInsurance.dischargeDocument = event.target.files[0].name;
      formData.append(event.path[0].name, event.target.files[0], 'DischargeDocument');
    }

    this.leadService.updateLeadDocs(this.leadId, formData);
    this.getLeadData();
    setTimeout(() => {
      this.healthInsurance = {
        dischargeSummary: '',
        rejectionLetter: '',
        claimBill: '',
        dischargeDocument: '',
      };
    }, 3000);
  }

  openModal(event) {
    this.dialogRef = this.dialog.open(DocModalComponent, this.dialogOptions);
    // this.dialogRef.componentInstance.some = 'hey';
    this.dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result !== 'close') {
        this.leadService.updateLeadDocs(this.leadId, result);
      }
    });
  }
}
