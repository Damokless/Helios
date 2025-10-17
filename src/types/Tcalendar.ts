export default interface TCalendar {
  transferShifts: Array<{
    id: number;
    label: string;
    startDateTime: string;
    endDateTime: string;
    segments: Array<{
      startDateTime: string;
      endDateTime: string;
      orgJobRef: {
        id: number;
        qualifier: string;
      };
    }>;
  }>;
}
