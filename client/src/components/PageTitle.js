import React from "react";

function PageTitle({ title }) {
  return (
    <div className="mt-2">
      <h1 style={{
        fontSize: "1.5rem",
        fontWeight: 700,
        color: "var(--gray-900)"
      }}>{title}</h1>
    </div>
  );
}

export default PageTitle;
