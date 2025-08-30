import { useState, type ReactNode } from "react";
import type { MouseEvent } from "react";
import { FiMoreVertical } from "react-icons/fi";
import Loader from "../Loader/Loader";

type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableAction<T> = {
  icon: ReactNode;
  label: string;
  onClick: (row: T) => void;
  className?: string;
};

type TableProps<T> = {
  columns: TableColumn[];
  data: T[];
  actions?: TableAction<T>[];
  rowKey: keyof T;
  isLoading?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends Record<string, any>>({
  columns,
  data,
  actions = [],
  rowKey,
  isLoading,
}: TableProps<T>) {
  const [openMenu, setOpenMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const toggleMenu = (event: MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    setOpenMenu((prev) =>
      prev?.id === id ? null : { id, x: clientX, y: clientY }
    );
  };

  // Close dropdown if clicked outside
  const handleClickOutside = () => setOpenMenu(null);
  document.addEventListener("click", handleClickOutside);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-full overflow-x-auto relative">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  col.className || ""
                }`}
              >
                {col.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="px-6 py-10 text-center"
              >
                <Loader />
              </td>
            </tr>
          ) : data?.length > 0 ? (
            data.map((row) => (
              <tr key={String(row[rowKey])} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      col.className || "text-gray-500"
                    }`}
                  >
                    {row[col.key]}
                  </td>
                ))}

                {actions.length > 0 && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium relative">
                    <button
                      onClick={(e) => toggleMenu(e, String(row[rowKey]))}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 rounded hover:bg-gray-100"
                    >
                      <FiMoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Floating Dropdown */}
      {openMenu && (
        <div
          className="fixed z-50 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200"
          style={{ top: openMenu.y + 10, left: openMenu.x - 180 }}
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                const row = data.find((r) => String(r[rowKey]) === openMenu.id);
                if (row) action.onClick(row);
                setOpenMenu(null);
              }}
              className={`flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left ${
                action.className || ""
              }`}
            >
              {action.icon && <span className="mr-3">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;
