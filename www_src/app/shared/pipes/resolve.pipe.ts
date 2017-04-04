import { Pipe, PipeTransform} from '@angular/core';
import * as _ from 'underscore';

@Pipe({name:'resolve'})
export class resolvePipe implements PipeTransform {
    transform(array: Array<any>, testVals: Array<any>, contains: Boolean): Array<any> {
        return array.filter(elem => _.contains(testVals, elem._id) === contains)
    }
}