
import { ICardHost } from './index';

export interface IGrid {
    cardHosts: Array<ICardHost>
    columns: number
    rows: number
    rowHeight: number
    columnWidth: number
    addCardHost(cardHost: ICardHost): void
}