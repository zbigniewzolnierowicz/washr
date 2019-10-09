import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  profileEdit = new FormGroup({
    bio: new FormControl(null),
    displayName: new FormControl(null)
  });
  status: string;
  userData$: Observable<User>;
  constructor(private udS: UserDataService) {}

  ngOnInit() {
    this.userData$ = this.udS.loggedInUserData();
    this.userData$.subscribe(data => this.profileEdit.setValue({ bio: data.bio, displayName: data.displayName }));
  }

  onSubmit() {
    this.udS
      .updateUserData({ bio: this.profileEdit.value.bio as string, displayName: this.profileEdit.value.displayName })
      .then(() => {
        this.status = 'Bio updated!';
      })
      .catch(err => (this.status = err));
  }
}
