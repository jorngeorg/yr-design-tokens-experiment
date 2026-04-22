import { Badge, Tag } from "@digdir/designsystemet-react";
import { Card } from "../Card"
import { Heading, Paragraph } from "../Typography"
import "./Pollen.css";

interface PollenType {
  id: string;
  name: string;
}

interface PollenDistribution {
  pollenTypes: PollenType[];
  distributionName: string;
}

interface PollenForecast {
  date: string;
  distributions: Record<string, PollenDistribution>;
}

interface PollenEntry {
  id: string;
  name: string;
  severity: string;
  severityName: string;
}

interface DayForecast {
  date: string;
  pollenTypes: PollenEntry[];
}

const severityToColor: Record<string, string> = {
  none: "neutral",
  low: "success",
  moderate: "warning",
  high: "warning",
  severe: "danger",
};

function transformForecast(forecast: PollenForecast[]): DayForecast[] {
  return forecast.map((day) => ({
    date: day.date,
    pollenTypes: Object.entries(day.distributions).flatMap(
      ([severity, distribution]) =>
        distribution.pollenTypes.map((pollenType) => ({
          id: pollenType.id,
          name: pollenType.name,
          severity,
          severityName: distribution.distributionName,
        }))
    ),
  }));
}

export interface PollenProps {
  title: string;
  subtitle: string;
  forecast: PollenForecast[];
}

export const Pollen = ({
  title = '',
  subtitle = '',
  forecast
}: PollenProps) => {
  const days = transformForecast(forecast);

  return (
    <Card data-color="neutral">
      <Heading level={1} data-size="xs">{title}</Heading>
      <Paragraph className="pollen-card__subtitle" data-size="sm">{subtitle}</Paragraph>
      {days.map((day) => (
        <div key={day.date} className="pollen-card__day">
          <Paragraph data-weight="medium" data-size="md">{day.date}</Paragraph>
          {day.pollenTypes.map((entry) => (
            <div className="pollen-card__pollen-type">
              <Paragraph key={entry.id} data-size="md">
                {entry.name}
              </Paragraph>
              <Tag data-color={severityToColor[entry.severity] ?? "neutral"}>{entry.severityName}</Tag>
            </div>
          ))}
        </div>
      ))}
    </Card>
  )
}