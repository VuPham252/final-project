import { ApexOptions } from '../components/chart/chart.component';
import { mergeDeep } from './merge-deep';

export const defaultChartOptions = (options: Partial<ApexOptions> = {}): ApexOptions => mergeDeep({

}, options);
