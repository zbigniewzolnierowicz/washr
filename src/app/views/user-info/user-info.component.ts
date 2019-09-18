import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userID: string;
  userInfo: Observable<any>;

  constructor(private route: ActivatedRoute, private uS: UserDataService) {
    this.userInfo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.uS.getUserData(params.get('id')))
    );
  }

  ngOnInit() {}

}
