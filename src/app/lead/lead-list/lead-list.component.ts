import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LeadService } from '../lead.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource, } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DocsComponent } from '../docs/docs.component';
import { ToastMessageService } from 'src/app/toastr.service';
import { ComModalComponent } from '../com-modal/com-modal.component';

@Component({
  selector: 'app-lead-list',
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css']
})
export class LeadListComponent implements OnInit, AfterViewInit, OnDestroy {

  public allLeads = new MatTableDataSource<any>();
  public leadSubs: Subscription;

  docsModalRef;
  comModalRef;

  modalOptions = {
    disableClose: true,
  };

  comModalOptions = {
    disableClose: true,
    width: '600px',
    // height: '700px',
  };

  @ViewChild(MatSort) sortingTable: MatSort;

  @ViewChild(MatPaginator) tablePaginator: MatPaginator;

  columnsToDisplay = ['id', 'name', 'mobile', 'status', 'policy type', 'complaint type', 'actions'];

  pageSizeOptions = [5, 10, 20];
  pageLength;
  pageSize = 10;
  pageNumber = 0;

  allLeadsCount;

  unSortedData;

  constructor(
    private leadService: LeadService,
    private toast: ToastMessageService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getLeadsCount();
    this.getLeads();
    this.allLeads.paginator = this.tablePaginator;
  }

  ngAfterViewInit() {
    this.allLeads.sort = this.sortingTable;
  }

  getLeads() {
    this.leadService.fetchAllUserLeads(this.pageNumber, this.pageSize);
    this.allLeads.data = this.leadService.getAllUserLeads();
    this.leadSubs = this.leadService.getUpdatedUserLeadsListener()
      .subscribe((leads) => {
        this.allLeads.data = [...leads];
        this.unSortedData = [...leads];
      });
  }

  getLeadsCount() {
    this.leadService.fetchLeadsCount()
      .subscribe((response) => {
        this.allLeadsCount = response.data;
        this.pageLength = this.allLeadsCount;
      }, (error) => {
        console.log(error.error);
      });
  }


  pageEvent(event) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex;
    this.getLeads();
  }

  sortData(sort: Sort) {
    const data = this.allLeads.data;
    if (sort.direction === '' || !sort.active) {
      this.allLeads.data = this.unSortedData;
      return;
    }

    this.allLeads.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return this.compare(a.leadId, b.leadId, isAsc);
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        case 'policy type': return this.compare(a.policyTypeId.name, b.policyTypeId.name, isAsc);
        case 'complaint type': return this.compare(a.complaintTypeId.name, b.complaintTypeId.name, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  openDocsModal(lead) {
    this.docsModalRef = this.dialog.open(DocsComponent, this.modalOptions);
    this.docsModalRef.componentInstance.leadId = lead._id;
  }

  openComModal(lead) {
    this.comModalRef = this.dialog.open(ComModalComponent, this.comModalOptions);
    this.comModalRef.componentInstance.leadId = lead._id;
  }

  doFilter(filter) {
    filter = filter.trim().toLowerCase();
    this.allLeads.filter = filter;
    // this.leadService.getFilteredLeads(filter, this.pageNumber, this.pageSize)
    //   .subscribe((response) => {
    //     if (!response.error) {
    //       this.allLeads.data = response.data;
    //     }
    //   }, (error) => {
    //     console.log(error.error);
    //     this.toast.toastError(error.error.message);
    //   });
  }

  ngOnDestroy() {
    this.leadSubs.unsubscribe();
  }

}
