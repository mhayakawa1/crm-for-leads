"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditData } from "@/components/EditData";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { FilterDropdown } from "@/components/FilterDropdown";
import { FilterInput } from "@/components/FilterInput";
import DetailsLink from "@/components/DetailsLink";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: string;
  setFilterBy: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterBy,
  setFilterBy,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="m-auto overflow-hidden rounded-md bg-white border border-solid border-gray-300 shadow-sm w-full">
      <div className="flex items-center py-4">
        <FilterDropdown setFilterBy={setFilterBy} />
        <FilterInput
          filterBy={filterBy}
          value={(table.getColumn(filterBy)?.getFilterValue()) ?? ""}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup: any) => (
            <TableRow key={headerGroup.id} className="border-b border-gray-300">
              {headerGroup.headers.map((header: any) => {
                return (
                  <TableHead key={header.id} className="pl-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row: any) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border border-gray-300"
                >
                  {row.getVisibleCells().map((cell: any) => {
                    const date = new Date(
                      row.original.created_at,
                    ).toUTCString();
                    const { id, column, getContext } = cell;
                    const { name, email } = row.original.assigned_to;
                    return (
                      <TableCell key={id} className="pl-4">
                        {id.includes("created_at")
                          ? date
                          : id.includes("assigned_to")
                            ? `${name} (${email})`
                            : flexRender(column.columnDef.cell, getContext())}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    key="buttons"
                    className="w-fit flex justify-between items-center gap-[8px]"
                  >
                    <DetailsLink id={row.original.id} />
                    <EditData data={row.original} />
                    <ConfirmDelete data={row.original} />
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
