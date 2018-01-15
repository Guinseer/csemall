import {Item} from './item';
/**
 * Created by chou6 on 2017-12-25.
 */
export const ITEMS: Item[] = [
    {
        name: '레인부츠',
        src: 'assets/images/items/woman_1.jpg',
        original: 1000,
        current: 500,
        new: true,
        hasSale: true,
        hasTimeout: true,
        discount: 50,
        day: 0,
        hour: 0,
        min: 3,
        sec: 0,
    },
    {
        name: '남자 셔츠',
        src: 'assets/images/items/man_1.jpg',
        original: 500,
        current: 325,
        new: false,
        hasSale: true,
        hasTimeout: true,
        discount: 25,
        day: 0,
        hour: 0,
        min: 2,
        sec: 30,
    }

];