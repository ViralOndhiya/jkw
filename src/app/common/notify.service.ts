import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NotifyService {

    constructor(){}
  // Observable string sources
  private loginUser = new Subject<boolean>();
  loginUser$ = this.loginUser.asObservable();

  private openLogin = new Subject<boolean>();
  openLogin$ = this.openLogin.asObservable();

  private notifyLogin = new Subject<boolean>();
  notifyLogin$ = this.notifyLogin.asObservable();

  setOpenLogin(dt: boolean){
    this.openLogin.next(dt);
  }

  setNotifyLogin(dt: boolean){
    this.notifyLogin.next(dt)
  }

  // Service message commands
  setLoginUser(data: any) {
    this.loginUser.next(data);
  }
}