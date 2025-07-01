import { Card, CardHeader, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { BotIcon } from "lucide-react";

interface RobotData {
  area: string;
  run: number;
  total: number;
}

interface RobotStatusCardProps {
  data: RobotData;
}

const COLORS = ["#10b981", "#ef4444"]; // เขียว, แดง

export function RobotStatusCard({ data }: RobotStatusCardProps) {
  const pieData = [
    { name: "Run", value: data.run },
    { name: "Stop", value: data.total - data.run },
  ];

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 0.4,
        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
      }}
    >
      <Card className="w-full shadow-lg rounded-2xl p-4">
        <CardHeader className="flex items-center gap-2">
          <BotIcon className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">{data.area}</h2>
        </CardHeader>

        <CardBody className="flex flex-col items-center">
          <div className="text-4xl font-bold text-gray-900">
            {data.total}
          </div>
          <div className="text-sm text-gray-500 mb-4">จำนวน Robot</div>

          <div className="h-40 w-40">
            <ResponsiveContainer height="100%" width="100%" >
              <PieChart>
                <Pie
                  cx="50%"
                  cy="50%"
                  data={pieData}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={60}

                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-between w-full text-sm text-gray-700">
            <span className="text-green-600 font-4xl">🟢 Run: {data.run}</span>
            <span className="text-red-500 font-4xl">🔴 Stop: {data.total - data.run}</span>
          </div>
        </CardBody>
      </Card>
    </motion.div>

  );
}