
interface Event{
    path: string;
    date: Date;
}

export default async function TrackView(event: Event) {
    console.log(event)
}