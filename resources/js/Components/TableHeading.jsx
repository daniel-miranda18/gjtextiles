export default function TableHeading({
    name,
    sortable = true,
    sort_field = null,
    sort_direction = null,
    sortChanged = () => {},
    children,
  }) {
    return (
      <th onClick={(e) => sortChanged(name)}>
        <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
          {children}
          {sortable && (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  "w-4 h-4 " +
                  (sort_field === name && sort_direction === "asc"
                    ? "text-gray-300"
                    : "")
                }
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={
                  "w-4 h-4 " +
                  (sort_field === name && sort_direction === "desc"
                    ? "text-gray-300"
                    : "")
                }
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </th>
    );
  }