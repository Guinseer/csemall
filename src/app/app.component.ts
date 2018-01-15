import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import {MnFullpageOptions, MnFullpageService} from 'ngx-fullpage';
import {Item} from './pages/item';
import {ITEMS} from './pages/mock-items';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFirestore} from 'angularfire2/firestore';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
interface Item_inf {
    name: string;
    original: number;
    current: number;
    hasDiscount: boolean;
    hasTimeout: boolean;
    discount: number;
    day: number;
    hour: number;
    min: number;
    sec: number;
}
interface User {
    name: string
}
declare var jQuery: any;
declare var $: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
    user: Observable<User>;
    items: Item[] = ITEMS;
    item: Item;
    opacity = [false, false, false];
    active = [false, false, false];
    slideIndex = 1;
    slide_length = 3;
    slow = false;
    @Output() public options: MnFullpageOptions = new MnFullpageOptions({
        navigation: true,
    });
    onLeave = (index: number, nextIndex: number, direction: string) => {
        if (index === 2 && direction === 'up') {
            this.page.setScrollingSpeed(900);
        }
        if (index === 2 && direction === 'down') {
            this.page.setFitToSection(false);
            this.page.setScrollingSpeed(0);
        }
        if (index === 3 && direction === 'up') {
            this.page.setAutoScrolling(true);
        }
    };
    afterLoad = (anchorLink: string, index: number) => {
        if (anchorLink === 'slide3') {
            this.page.setAutoScrolling(false);
            this.page.setScrollingSpeed(0);
            this.slow = true;
        }
        else if (anchorLink === 'slide2') {
            if (this.slow) {
                this.page.setScrollingSpeed(900);
                this.slow = false;
            } else {
                this.page.setScrollingSpeed(0);
            }

            //this.page.setScrollingSpeed(500);
            //this.page.setAutoScrolling(true);
        } else {
            //this.page.setScrollingSpeed(500);
        }
    };

    constructor(public page: MnFullpageService,
                private afAuth: AngularFireAuth,
                private afs: AngularFirestore) {
        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs.doc<User>(`users/${user.email}`).valueChanges();
                } else {
                    return Observable.of(null);
                }
            });
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        // console.log(n);
        let i;
        if (n > this.slide_length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = this.slide_length
        }

        for (i = 0; i < this.slide_length; i++) {
            this.opacity[i] = true;
        }
        for (i = 0; i < this.slide_length; i++) {
            this.active[i] = false;
        }
        this.opacity[this.slideIndex - 1] = false;
        this.active[this.slideIndex - 1] = true;
        // console.log(this.opacity);
    }

    ngOnInit() {
        this.showSlides(1);

    }

    ngAfterViewInit() {
        //this.page = new MnFullpageService();
        this.items.forEach((obj) => {
            console.log(obj);
            setInterval(()=>{this.countDown(obj);}, 1000);
        });
        // this.page.setAutoScrolling(false);
    }
    countDown(item){
        if(item.sec == 0){
            if(item.min == 0){
                if(item.hour == 0){
                    if(item.day == 0){
                        return;
                    }else{
                        item.day--;
                        item.hour = 59;
                    }
                }
                item.hour--;
                item.min = 59;
                item.sec = 59;
            }else{
                item.min --;
                item.sec = 59;
            }
        }else{
            item.sec--;
        }



    }
    numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
