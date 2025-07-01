'use client';

import { Card, CardBody, CardHeader, Link } from "@heroui/react";
export default function DocsPage() {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col items-start">
        <p className="text-4xl font-prompt text-white">EMPLOYEE</p>
        <p className="text-lg text-gray-100">พนักงาน</p>
      </div>
      <Card className="flex flex--1 min-h-screen" aria-expanded="false">
        <CardBody>

        </CardBody>
      </Card>
    </div>
  );
}
