'use client';
import { useEffect, useState, useMemo } from "react";
import { Table, TableHeader, TableColumn, TableBody, Button, TableRow, TableCell, Pagination } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Divider, Link } from "@heroui/react";

import { title } from "@/components/primitives";
import { SearchIcon } from "@/components/icons";

const animals = [
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

  type Type = {
    key: string;
    label: string;
  };

  const [partlistdata, setPartlistdata] = useState<Part[]>([]);
  const [listtype, setListtype] = useState<Type[]>([]);
  const [listbrand, setListbrand] = useState<Type[]>([]);
  const [listmodel, setListmodel] = useState<Type[]>([]);

  const [seltype, setSeltype] = useState("");
  const [selbrand, setSelbrand] = useState("");
  const [selmodel, setSelmodel] = useState("");

  const [isclearSel, setClearSel] = useState(false);
  const [isUpdate, setIsupdate] = useState(false);

  const [page, setPage] = useState(1)
  const rowsPerPage = 4

  const pages = Math.ceil(partlistdata.length / rowsPerPage)
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start - rowsPerPage

    return partlistdata.slice(start, end)
  }, [page, partlistdata])

  {/** Get All Partlist init */ }
  useEffect(() => {
    const fetchData_all = async () => {
      try {
        await fetch('/api/radata/partlist/allitem')
          .then(res => res.json())
          .then(data => {
            setPartlistdata(data);
          })
      } catch (error) {
        setPartlistdata([])
      }
    }

    fetchData_all();
  }, [])

  {/** Update Sort Partlist */ }
  useEffect(() => {
    setPartlistdata(partlistdata)
  }, [partlistdata])

  {/** Get list Search */ }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('/api/radata/partlist/listtype')
          .then(res => res.json())
          .then(data => {
            setListtype(data)
          })

        await fetch('/api/radata/partlist/listbrand')
          .then(res => res.json())
          .then(data => {
            setListbrand(data)
          })
      } catch (error) {

      }
    }

    fetchData();
  }, [])

  {/**Brand Fillter */ }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (seltype !== "") {
          await fetch('/api/radata/partlist/listbrand?type=' + seltype)
            .then(res => res.json())
            .then(data => {
              setListbrand(data)
            })
        }
      } catch (error) {
        setListbrand([])
      }
    }

    fetchData();
  }, [seltype])

  {/**Model Fillter */ }
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (seltype !== "" && selbrand !== "") {
          await fetch('/api/radata/partlist/listmodel?type=' + seltype + "&brand=" + selbrand)
            .then(res => res.json())
            .then(data => {
              setListmodel(data)
            })
        }
      } catch (error) {
        setListmodel([])
      }
    }

    fetchData();
  }, [seltype, selbrand])


  const handleSubmit = () => {
    if (selbrand === "" && selmodel === "" && seltype === "") {
      
      const fetchData_all = async () => {
        try {
          await fetch('/api/radata/partlist/allitem')
            .then(res => res.json())
            .then(data => {
              setPartlistdata(data);
            })
        } catch (error) {
          setPartlistdata([])
        }
      }

      fetchData_all();
    } else {
      const fetchData_sort = async () => {
        try {
          await fetch('/api/radata/partlist/sortitem?type='+seltype+'&brand='+selbrand+'&model='+selmodel)
            .then(res => res.json())
            .then(data => {
              setPartlistdata(data);
            })
        } catch (error) {
          setPartlistdata([])
        }
      }

      fetchData_sort();
    }
  }

  const clearSel = () => {
    setClearSel(true)
    setSelbrand("")
    setSelmodel("")
    setSeltype("")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-1 flex-col items-start">
        <p className="text-4xl font-prompt text-white">PART LIST</p>
        <p className="text-lg text-gray-100">รายการอุปกรณ์</p>
      </div>
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
                <Autocomplete className="w-full" label="Select Type" selectedKey={seltype} onSelectionChange={(key) => setSeltype(key as string)}>
                  {listtype.map((type) => (
                    <AutocompleteItem key={type.key}>{type.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="text-default-500 text-small">Brand</h3>
                <Autocomplete className="w-full"
                  label="Select Brand"
                  selectedKey={selbrand}
                  onSelectionChange={(key) => setSelbrand(key as string)}
                >
                  {listbrand.map((brand) => (
                    <AutocompleteItem key={brand.key}>{brand.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <h3 className="text-default-500 text-small">Model</h3>
                <Autocomplete className="w-full" label="Select Model" selectedKey={selmodel} onSelectionChange={(key) => setSelmodel(key as string)}>
                  {listmodel.map((model) => (
                    <AutocompleteItem key={model.key}>{model.label}</AutocompleteItem>
                  ))}
                </Autocomplete>
              </div>

            </div>
          </CardBody>
          <CardFooter>
            <div className="w-full flex flex-row items-end justify-end gap-2">
              <Button className=" text-white" color="danger" onPress={clearSel}>ล้างข้อมูล</Button>
              <Button className=" text-white" color="success" onPress={handleSubmit}>ค้นหา</Button>
            </div>

          </CardFooter>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <div className="flex flex-row gap-2 items-center">
              <SearchIcon />
              <h2 className="text-2xl font-medium text-gray-700">ตารางข้อมูล</h2>
            </div>
          </CardHeader>
          <Divider />
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