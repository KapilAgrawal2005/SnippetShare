import React from "react";

type ActivityDay = {
  date: string; // e.g., "2024-06-01"
  count: number;
};

type Props = {
  data: ActivityDay[];
  days?: number; // default: 90 (last 3 months)
};

const getColor = (count: number) => {
  if (count === 0) return "#2a2a2a";
  if (count < 2) return "#9be9a8";
  if (count < 5) return "#40c463";
  if (count < 10) return "#30a14e";
  return "#216e39";
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function groupByWeek(daysArr: ActivityDay[]) {
  const weeks: ActivityDay[][] = [];
  let week: ActivityDay[] = [];
  for (let i = 0; i < daysArr.length; i++) {
    const day = daysArr[i];
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  // Fill last week if not complete
  if (week.length > 0) {
    while (week.length < 7) {
      week.push({ date: "", count: 0 });
    }
    weeks.push(week);
  }
  return weeks;
}

// Returns: [{ label: "Apr", span: 4 }, ...]
function getMonthSpans(weeks: ActivityDay[][]) {
  let lastMonth = "";
  const result: { label: string; span: number }[] = [];
  weeks.forEach((week) => {
    const firstDay = week[0];
    if (!firstDay.date) {
      if (result.length > 0) result[result.length - 1].span += 1;
      return;
    }
    const month = new Date(firstDay.date).toLocaleString("default", {
      month: "short",
    });
    if (month === lastMonth && result.length > 0) {
      result[result.length - 1].span += 1;
    } else {
      result.push({ label: month, span: 1 });
      lastMonth = month;
    }
  });
  return result;
}

export default function ActivityBar({ data, days = 90 }: Props) {
  // Fill missing days with 0
  const today = new Date();
  const daysArr = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (days - 1 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const found = data.find((x) => x.date === dateStr);
    return { date: dateStr, count: found ? found.count : 0 };
  });

  // Align to week start (Sunday)
  const firstDayOfWeek = new Date(daysArr[0].date).getDay();
  const paddedDaysArr = [
    ...Array.from({ length: firstDayOfWeek }, () => ({ date: "", count: 0 })),
    ...daysArr,
  ];
  const weeks = groupByWeek(paddedDaysArr);
  const monthSpans = getMonthSpans(weeks);

  return (
    <div className="w-full overflow-x-auto">
      {/* Month labels */}
      <div className="flex min-w-[340px] ml-10 mb-1">
        {monthSpans.map((m, i) => (
          <span
            key={i}
            className="text-xs text-gray-400 text-center"
            style={{
              width: `${m.span * 22}px`,
              minWidth: `${m.span * 22}px`,
              display: "inline-block",
            }}
          >
            {m.label}
          </span>
        ))}
      </div>
      <div className="flex min-w-[340px]">
        {/* Weekday labels */}
        <div className="flex flex-col items-center gap-[2px] mr-2">
          {weekDays.map((wd, i) => (
            <span
              key={i}
              className="text-xs text-gray-400"
              style={{
                height: 20,
                lineHeight: "20px",
                width: 28,
                minWidth: 28,
                textAlign: "right",
              }}
            >
              {wd}
            </span>
          ))}
        </div>
        {/* Contribution grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${weeks.length}, 20px)`,
            gridTemplateRows: `repeat(7, 20px)`,
            gap: "2px",
          }}
        >
          {weeks.map((week, wi) =>
            week.map((day, di) => (
              <div
                key={`${wi}-${di}`}
                title={
                  day.date && new Date(day.date) <= today
                    ? `${day.date}: ${day.count} snippet${
                        day.count !== 1 ? "s" : ""
                      }`
                    : ""
                }
                style={{
                  width: 18,
                  height: 18,
                  border: "1px solid #ffffff1a",
                  background:
                    day.date && new Date(day.date) > today
                      ? "transparent"
                      : getColor(day.count),
                  borderRadius: 3,
                  transition: "background 0.2s",
                  gridColumn: wi + 1,
                  gridRow: di + 1,
                  opacity: day.date && new Date(day.date) > today ? 0 : 1,
                  pointerEvents:
                    day.date && new Date(day.date) > today ? "none" : "auto",
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
