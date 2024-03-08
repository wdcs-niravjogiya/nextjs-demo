"use client";

import { ColumnDef } from "@tanstack/react-table";

export type UserPost = {
  UserId: number;
  No: number;
  title: string;
  body: string;
};

export const columnData: ColumnDef<UserPost>[] = [
  {
    accessorKey: "userId",
    header: "User_Id",
  },
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
