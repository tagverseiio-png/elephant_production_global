import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format, isValid } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  label: string;
  value: string; // Stored value in ISO or DD-MM-YYYY format
  onChange: (value: string) => void;
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  // Try to parse the incoming value if it's not empty
  let selectedDate: Date | null = null;
  if (value) {
    const parsedISODate = new Date(value);
    const parsedLocal = parse(value, 'dd-MM-yyyy', new Date());
    
    if (isValid(parsedLocal)) {
      selectedDate = parsedLocal;
    } else if (isValid(parsedISODate)) {
      selectedDate = parsedISODate;
    }
  }

  const handleChange = (date: Date | null) => {
    if (date) {
      // Store value as DD-MM-YYYY to match display requirement, 
      // but ISO string can also be formatted if backend strictly requires it.
      // Based on original requirement: "Internally... may store in ISO, while displaying as DD-MM-YYYY"
      // We'll store it as ISO string to be safe, but react-datepicker handles the display format.
      // Let's pass ISO string to parent
      onChange(format(date, 'yyyy-MM-dd'));
    } else {
      onChange('');
    }
  };

  return (
    <div>
      <label className="block text-[10px] tracking-widest uppercase text-white/60 mb-1">
        {label}
      </label>
      <div className="relative">
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleChange}
          dateFormat="dd-MM-yyyy"
          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-elephant-ivory outline-none focus:border-white/30 transition-colors pl-10"
          placeholderText="DD-MM-YYYY"
          isClearable
          showPopperArrow={false}
          todayButton="Today"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
          <Calendar size={16} />
        </div>
      </div>
      {/* Add global styles to override react-datepicker theme for dark mode if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .react-datepicker {
          background-color: #111 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          font-family: inherit !important;
        }
        .react-datepicker__header {
          background-color: #1a1a1a !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header {
          color: #fff !important;
        }
        .react-datepicker__day-name, .react-datepicker__day, .react-datepicker__time-name {
          color: #ccc !important;
        }
        .react-datepicker__day:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
          background-color: #f3f3f3 !important;
          color: #000 !important;
        }
        .react-datepicker__day--today {
          font-weight: bold;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        .react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle {
          fill: #1a1a1a !important;
          color: #1a1a1a !important;
          stroke: rgba(255, 255, 255, 0.1) !important;
        }
        .react-datepicker__close-icon::after {
          background-color: transparent !important;
          color: #fff !important;
          font-size: 16px !important;
        }
      `}} />
    </div>
  );
}
