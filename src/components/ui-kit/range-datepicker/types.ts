export interface RangeDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (data: {
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}
