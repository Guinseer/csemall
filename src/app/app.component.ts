import {AfterViewInit, Component, Input, OnInit, Output} from '@angular/core';
import { MnFullpageOptions } from 'ngx-fullpage';
import { MnFullpageService } from 'ngx-fullpage';
interface Item {
    name: string;
    price: number;
}
declare var jQuery: any;
declare var $: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
    opacity= [false, false, false];
    active = [false, false, false];
    title = 'app';
    slideIndex = 1;
    slide_length = 3;
    slow = false;
    @Output() public options: MnFullpageOptions = new MnFullpageOptions({
        navigation: true,
    });
    onLeave = (index: number, nextIndex: number, direction: string) => {
        if(index === 2 && direction === 'up'){
            this.page.setScrollingSpeed(900);
        }
       if(index === 2 && direction === 'down'){
           this.page.setFitToSection(false);
           this.page.setScrollingSpeed(0);
       }
        if(index === 3 && direction === 'up'){
            this.page.setAutoScrolling(true);
        }
    }
    afterLoad = (anchorLink: string, index: number) => {
        if(anchorLink === 'slide3'){
            this.page.setAutoScrolling(false);
            this.page.setScrollingSpeed(0);
            this.slow = true;
        }
        else if(anchorLink === 'slide2') {
            if(this.slow){
                this.page.setScrollingSpeed(900);
                this.slow = false;
            }else{
                this.page.setScrollingSpeed(0);
            }

            //this.page.setScrollingSpeed(500);
            //this.page.setAutoScrolling(true);
        }else{
            //this.page.setScrollingSpeed(500);
        }
    }
    constructor(public page: MnFullpageService){

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
           this.opacity[i]=true;
        }
        for (i = 0; i < this.slide_length; i++) {
            this.active[i]=false;
        }
        this.opacity[this.slideIndex-1]=false;
        this.active[this.slideIndex-1]=true;
        // console.log(this.opacity);
    }

    ngOnInit(){
        this.showSlides(1);

    }
    ngAfterViewInit(){
        this.page = new MnFullpageService();
        // this.page.setAutoScrolling(false);
    }


}
