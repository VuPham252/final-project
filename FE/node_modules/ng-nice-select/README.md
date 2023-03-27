# jQuery Nice Select directive for Angular 4+

## Requirements

- [jQuery](https://jquery.com/) v1.11.3 and later
- [Angular](https://angular.io/) v4.0 and later

## Installation

```
yarn add ng-nice-select
```
or

```
npm install ng-nice-select --save
```

## Usage
Import styles:
```
@import '~jquery-nice-select/css/nice-select';
```

Import module:
```
import { NiceSelectModule } from "ng-nice-select";
```

Add `nice-select` directive to your select:
```
<select nice-select (change)="onChange($event)" [value]="selectedValue" [attr.data-value]="selectedValue">
  <option>test</option>
</select>
```

`[attr.data-value]="selectedValue"` is a trick to update nice select on value change

##License
The repository code is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
