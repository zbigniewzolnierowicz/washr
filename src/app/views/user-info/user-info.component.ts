import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userID: string;
  userInfo: Observable<any>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    this.userInfo = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.db.doc(`users/${params.get('id')}`).valueChanges().pipe(tap(data => console.log(data))))
    );
  }

  ngOnInit() {}

}
