import React from "react";

const TableHead = () => {
  return (
    <tr>
      <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
        Date:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        Address:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        PinCode:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        Mobile:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        Amount:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        Payment:{" "}
      </th>
      <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
        Status:{" "}
      </th>
      <th className="p-3 text-sm font-semibold tracking-wide text-left">
        Products:{" "}
      </th>
    </tr>
  );
};

export default TableHead;
