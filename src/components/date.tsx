import { format, parseISO } from 'date-fns'

// isoDate should be in the format yyyy-mm-dd (Ex: 2020-11-23)
// Returns a time element with a date string with sample format November 23, 2020
type DateProps = { isoDate: string }
export default function Date({ isoDate }: DateProps): JSX.Element {
    const date: Date = parseISO(isoDate)
    const formattedDate: string = format(date, 'LLLL d, yyyy')
    return <time dateTime={isoDate}>{formattedDate}</time>
}
