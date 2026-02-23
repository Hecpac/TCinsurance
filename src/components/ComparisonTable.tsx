import React from 'react';

export interface ComparisonRow {
  label: string;
  values: (string | boolean)[];
}

export interface ComparisonTableProps {
  title?: string;
  columns: string[];
  rows: ComparisonRow[];
}

export default function ComparisonTable({ title, columns, rows }: ComparisonTableProps) {
  return (
    <div className="w-full my-8 overflow-hidden rounded-xl border border-swiss-black/15 bg-white">
      {title && (
        <div className="bg-swiss-gray/5 border-b border-swiss-black/15 px-6 py-4">
          <h3 className="text-lg font-semibold text-swiss-black">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-swiss-gray/5 border-b border-swiss-black/15 text-sm font-semibold text-swiss-black/80">
              <th className="p-4 pl-6 min-w-[200px]">Característica</th>
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 min-w-[150px] border-l border-swiss-black/5 text-center">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-body text-swiss-black/90">
            {rows.map((row, rIdx) => (
              <tr 
                key={rIdx} 
                className="border-b border-swiss-black/10 last:border-0 hover:bg-swiss-gray/5 transition-colors"
              >
                <td className="p-4 pl-6 font-medium text-swiss-black/80">{row.label}</td>
                {row.values.map((val, cIdx) => (
                  <td key={cIdx} className="p-4 border-l border-swiss-black/5 text-center">
                    {typeof val === 'boolean' ? (
                      val ? (
                        <span className="mx-auto text-green-600 text-lg font-bold">✓</span>
                      ) : (
                        <span className="mx-auto text-red-500 text-lg font-bold">✕</span>
                      )
                    ) : (
                      <span className="text-sm">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
