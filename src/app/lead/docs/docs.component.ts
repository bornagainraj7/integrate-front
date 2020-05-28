import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { LeadService } from '../lead.service';
import { MatDialog } from '@angular/material/dialog';
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


  genInsFile = {
    policyBook: {
      name: '',
      file: '',
    },
    rejectionLetter: {
      name: '',
      file: '',
    },
    claimBill: {
      name: '',
      file: '',
    },
    surveyorReport: {
      name: '',
      file: '',
    },
  };

  lifeInsFile = {
    policySchedule: {
      name: '',
      file: '',
    },
    emailExchange: {
      name: '',
      file: '',
    },
  };

  healthInsFile = {
    dischargeSummary: {
      name: '',
      file: '',
    },
    rejectionLetter: {
      name: '',
      file: '',
    },
    claimBill: {
      name: '',
      file: '',
    },
    dischargeDocument: {
      name: '',
      file: '',
    },
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
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      if (param.has('leadId')) {
        this.leadId = param.get('leadId');

        this.leadService.fetchSingleLead(this.leadId)
          .subscribe((response) => {
            this.leadData = response.data;
            this.policyType = this.leadData.policyTypeId.name;
            this.userId = this.leadData.userId._id;
          });
      }
    });

    this.dialogOptions.data = this.data;
  }

  generalSubmit(form: NgForm) {
    console.log(form.value);
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('policyBook', this.genInsFile.policyBook.file, this.genInsFile.policyBook.name);
    formData.append('rejectionLetter', this.genInsFile.rejectionLetter.file, this.genInsFile.rejectionLetter.name);
    formData.append('claimBill', this.genInsFile.claimBill.file, this.genInsFile.claimBill.name);
    formData.append('surveyorReport', this.genInsFile.surveyorReport.file, this.genInsFile.surveyorReport.name);

    // this.leadService.updateLeadDocs(this.leadId, formData);
    console.log(formData);
  }

  lifeSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('policySchedule', this.lifeInsFile.policySchedule.file, this.lifeInsFile.policySchedule.name);
    formData.append('emailExchange', this.lifeInsFile.emailExchange.file, this.lifeInsFile.emailExchange.name);
    // console.log(this.lifeInsFile);

    this.leadService.updateLeadDocs(this.leadId, formData);
  }

  healthSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('dischargeSummary', this.healthInsFile.dischargeSummary.file, this.healthInsFile.dischargeSummary.name);
    formData.append('rejectionLetter', this.healthInsFile.rejectionLetter.file, this.healthInsFile.rejectionLetter.name);
    formData.append('claimBill', this.healthInsFile.claimBill.file, this.healthInsFile.claimBill.name);
    formData.append('dischargeDocument', this.healthInsFile.dischargeDocument.file, this.healthInsFile.dischargeDocument.name);

    this.leadService.updateLeadDocs(this.leadId, formData);
  }

  onImagePickedGeneral(event) {
    console.log(event);
    console.log(event.target.files);

    if (event.path[0].name === 'policyBook') {
      this.generalInsurance.policyBook = event.target.files[0].name;
      this.genInsFile.policyBook.name = 'PolicyBook';
      this.genInsFile.policyBook.file = event.target.files[0];
    }

    if (event.path[0].name === 'rejectionLetter') {
      this.generalInsurance.rejectionLetter = event.target.files[0].name;
      this.genInsFile.rejectionLetter.name = 'RejectionLetter';
      this.genInsFile.rejectionLetter.file = event.target.files[0];
    }

    if (event.path[0].name === 'claimBill') {
      this.generalInsurance.claimBill = event.target.files[0].name;
      this.genInsFile.claimBill.name = 'ClaimBill';
      this.genInsFile.claimBill.file = event.target.files[0];
    }

    if (event.path[0].name === 'surveyorReport') {
      this.generalInsurance.surveyorReport = event.target.files[0].name;
      this.genInsFile.surveyorReport.name = 'SurveyorReport';
      this.genInsFile.surveyorReport.file = event.target.files[0];
    }
  }

  onImagePickedLife(event) {
    if (event.path[0].name === 'policySchedule') {
      this.lifeInsurance.policySchedule = event.target.files[0].name;
      this.lifeInsFile.policySchedule.name = 'PolicySchedule';
      this.lifeInsFile.policySchedule.file = event.target.files[0];
    }

    if (event.path[0].name === 'emailExchange') {
      this.lifeInsurance.emailExchange = event.target.files[0].name;
      this.lifeInsFile.emailExchange.name = 'EmailExchange';
      this.lifeInsFile.emailExchange.file = event.target.files[0];
    }
  }

  onImagePickedHealth(event) {
    if (event.path[0].name === 'dischargeSummary') {
      this.healthInsurance.dischargeSummary = event.target.files[0].name;
      this.healthInsFile.dischargeSummary.name = 'DischargeSummary';
      this.healthInsFile.dischargeSummary.file = event.target.files[0];
    }

    if (event.path[0].name === 'rejectionLetter') {
      this.healthInsurance.rejectionLetter = event.target.files[0].name;
      this.healthInsFile.rejectionLetter.name = 'RejectionLetter';
      this.healthInsFile.rejectionLetter.file = event.target.files[0];
    }

    if (event.path[0].name === 'claimBill') {
      this.healthInsurance.claimBill = event.target.files[0].name;
      this.healthInsFile.claimBill.name = 'ClaimBill';
      this.healthInsFile.claimBill.file = event.target.files[0];
    }

    if (event.path[0].name === 'dischargeDocument') {
      this.healthInsurance.dischargeDocument = event.target.files[0].name;
      this.healthInsFile.dischargeDocument.name = 'DischargeDocument';
      this.healthInsFile.dischargeDocument.file = event.target.files[0];
    }
  }

  openModal(event) {
    this.dialogRef = this.dialog.open(DocModalComponent, this.dialogOptions);
    this.dialogRef.componentInstance.some = 'hey';
    this.dialogRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result !== 'close') {
        this.leadService.updateLeadDocs(this.leadId, result);
      }
    });
  }
}
