import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { UserLogin } from '../Models/userLogin';
import { UserRegister } from '../Models/userRegister';
import { BehaviorSubject, first, firstValueFrom, from, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userSubject: BehaviorSubject<User | undefined>;

    currentUser$: Observable<User | undefined>;

    private userKeyName = 'userInfo';
    private tokenKeyName = 'accessToken';

    constructor(
        private userService: UserService,
    ) {
        this.userSubject = new BehaviorSubject<User | undefined>(this.getUserInfo());
        this.currentUser$ = this.userSubject.asObservable();
    }

    isAuthorized() {
        return this.getUserToken() && this.getUserInfo();
    }

    // register(user: UserRegister) {
    //     return this.createUser(
    //         from(this.afAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
    //             first(),
    //             tap(() => this.sendVerificationMail()),
    //         ),
    //         undefined,
    //         user.userName,
    //     );
    // }

    // login(userDto: UserLogin) {
    //     return from(this.afAuth.signInWithEmailAndPassword(userDto.email, userDto.password)).pipe(
    //         switchMap(() => this.afAuth.idToken),
    //         first(),
    //         tap((token) => {
    //             this.setIdToken(token!);
    //         }),
    //         switchMap(() => this.userService.getCurrentUser()),
    //         tap((user) => this.setUserInfo(user)),
    //     );
    // }

    logout() {
        this.removeUserInfo();
        this.userSubject.next(undefined);
    }

    getUserToken(): string | null {
        return localStorage.getItem(this.tokenKeyName);
    }

    getUserInfo(): User | undefined {
        const userInfo = localStorage.getItem(this.userKeyName);

        if (userInfo) {
            return JSON.parse(userInfo);
        }

        return undefined;
    }

    getUser(): Observable<User> {
        return of(this.getUserInfo()!);
    }

    setUserInfo(user: User) {
        localStorage.setItem(this.userKeyName, JSON.stringify(user));
        this.userSubject.next(user);
    }


    // private createUser(
    //     auth: Observable<firebase.auth.UserCredential>,
    //     provider: boolean | undefined = false,
    //     userName: string | undefined = undefined,
    // ) {
    //     return auth.pipe(
    //         switchMap((resp) =>
    //             this.userService.createUser({
    //                 uid: resp.user?.uid,
    //                 userName: userName ?? resp.user?.displayName!,
    //                 email: resp.user?.email ?? '',
    //                 image: resp.user?.photoURL ?? undefined,
    //                 timezone: new Date().getTimezoneOffset() / 60,
    //                 isWithProvider: provider ?? false,
    //             })),
    //         tap((user) => this.setUserInfo(user)),
    //     );
    // }

    private setIdToken(token: string) {
        localStorage.setItem(this.tokenKeyName, token);
    }

    private removeUserInfo() {
        localStorage.removeItem(this.userKeyName);
    }
}
