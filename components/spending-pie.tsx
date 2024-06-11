import { PieChart, FileSearch, Radar, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

import BarVariant from "./bar-variant";

import { useState } from "react";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import PieVariang from "./pie-variant";
import RadarVariant from "./radar-variant";

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("pie");
  console.log({ data });

  const onTypeChange = (type: string) => {
    // todo: add paywall
    setChartType(type);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        <div className="flex items-end">
          <Select defaultValue={chartType} onValueChange={onTypeChange}>
            <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pie">
                <div className="flex items-center">
                  <PieChart className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Pie chart</p>
                </div>
              </SelectItem>
              <SelectItem value="radar">
                <div className="flex items-center">
                  <Radar className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Radar chart</p>
                </div>
              </SelectItem>
              <SelectItem value="radial">
                <div className="flex items-center">
                  <Target className="size-4 mr-2 shrink-0" />
                  <p className="line-clamp-1">Radial chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for this period
            </p>
          </div>
        ) : (
          <>
            {chartType === "pie" && <PieVariang data={data} />}
            {chartType === "radar" && <RadarVariant data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SpendingPie;
