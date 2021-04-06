import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Profile } from 'src/app/models/profile.model';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-contact-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.css']
})
export class ProfilesListComponent implements OnInit, OnDestroy {
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  profiles: Profile[] = [];
  profile: Profile = {
    name: "",
    email: "",
    username: "",
    phone: ""
  };
  isLoading = false;
  isNoUserSelected = true;
  private profilesSub: Subscription;
  selectedProfiles: Profile;

  //listening to change of the table
  dtTrigger: Subject<any> = new Subject<any>();

  //when component is constructed trying to get data if is there something
  constructor(private dataService: DataService) {
    this.profilesSub = this.dataService.profiles.subscribe(profiles => {
      debugger;
      this.profiles = profiles;
    });
  }



  ngOnInit() {
    //initing table with paging options.
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.isLoading = true;
    //fetching Profiles to get updated data.
    this.dataService.fetchProfiles().subscribe(() => {
      this.isLoading = false;
    });
  }



  openProfile(profile: Profile) {
    this.profile = profile;
    this.isNoUserSelected = false;


  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy() {
    if (this.profilesSub) {
      this.profilesSub.unsubscribe();
    }
    this.dtTrigger.unsubscribe();
  }
}
