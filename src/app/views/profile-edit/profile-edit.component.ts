import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';
import { catchError } from 'rxjs/operators';

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
  userData$: Observable<any>;
  constructor(private udS: UserDataService) {}

  ngOnInit() {
    this.userData$ = this.udS.loggedInUserData().pipe(catchError(err => (this.status = err)));
    this.userData$.subscribe(data => {
      console.log(data);
      if (!!data) {
        let { bio } = data;
        const { displayName } = data;
        bio = !!bio ? bio : '';
        this.profileEdit.setValue({ bio, displayName });
      }
    });
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
