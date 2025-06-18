'use client';
import { useEffect, useState, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, Pagination } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Divider } from "@heroui/react";

import { title } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";

export const animals = [
  { label: "Cat", key: "cat", description: "The second most popular pet in the world" },
  { label: "Dog", key: "dog", description: "The most popular pet in the world" },
  { label: "Elephant", key: "elephant", description: "The largest land animal" },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  { label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds" },
  { label: "Zebra", key: "zebra", description: "A several species of African equids" },
  {
    label: "Shark",
    key: "shark",
    description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  { label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae" },
  { label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile" },
];

const columns = [
  {
    key: "type",
    label: "Type",
  },
  {
    key: "brand",
    label: "Brand",
  },
  {
    key: "partname",
    label: "Partname",
  },
  {
    key: "price",
    label: "Price",
  },
];

export default function DocsPage() {

  type Part = {
    id: number;
    partname: string;
    type: string;
    brand: string;
    qty: number;
    unit: string;
    detail: string;
    vendor: string;
    price: number;
    update: string;
    model: string;
    subtype: string;
  };

  const [partlistdata, setPartlistdata] = useState<Part[]>([]);
  const [page, setPage] = useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(partlistdata.length / rowsPerPage)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start - rowsPerPage

    return partlistdata.slice(start, end)
  }, [page, partlistdata])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/radata/partlist')
          .then(res => res.json())
          .then(data => {
            setPartlistdata(data);
            console.log(data)
          })
          .catch(error => console.error("Fetch error:", error))
      } catch (error) {
        console.error("Error fetching PLC data:", error);
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Card className="px-2 py-2">
          <CardHeader>
            <div className="flex flex-row gap-2 items-center">
              <SearchIcon />
              <h2 className="text-2xl font-medium text-gray-700">ค้นหาข้อมูล</h2>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-1 flex-row gap-4">
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="text-default-500 text-small">Type</h3>
                <Autocomplete className="w-full" label="Select Type">
                  {animals.map((animal) => (
                    <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="text-default-500 text-small">Brand</h3>
                <Autocomplete className="w-full" label="Select Brand">
                  {animals.map((animal) => (
                    <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="text-default-500 text-small">Model</h3>
                <Autocomplete className="w-full" label="Select Model">
                  {animals.map((animal) => (
                    <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

            </div>
          </CardBody>
          <CardFooter>
            <div className="w-full flex flex-row items-end justify-end gap-2">
              <Button className=" text-white" color="danger">ล้างข้อมูล</Button>
              <Button className=" text-white" color="success">ค้นหา</Button>
            </div>

          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardBody className="max-h-[400px] overflow-auto">
            <Table aria-label="Example table with dynamic content"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              maxTableHeight={300}
              rowHeight={40}
            >
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={partlistdata}>
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.partname}</TableCell>
                    <TableCell>{item.price}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}




/**export default function App() {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
    </Table>
  );
}*/