import React from "react";
import { Button } from "@/components/ui/button";
import { AITool } from "@/data/tools";
import { Download } from "lucide-react";

interface ExportToolsProps {
  tools: AITool[];
  fileName?: string;
}

export const ExportTools: React.FC<ExportToolsProps> = ({
  tools,
  fileName = "tools",
}) => {
  const handleExportCSV = () => {
    const headers = ["Name", "Description", "URL", "Category", "Pricing", "Rating", "Reviews"];
    const rows = tools.map((tool) => [
      tool.name,
      tool.description.replace(/"/g, '""'), // Escape quotes
      tool.url,
      tool.category,
      tool.pricing,
      tool.rating,
      tool.reviews,
    ]);

    const csv =
      [headers, ...rows].map((row) => row.map((val) => `"${val}"`).join(",")).join("\n") +
      "\n";

    downloadFile(csv, `${fileName}.csv`, "text/csv");
  };

  const handleExportJSON = () => {
    const json = JSON.stringify(tools, null, 2);
    downloadFile(json, `${fileName}.json`, "application/json");
  };

  const downloadFile = (content: string, name: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportCSV}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        CSV
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExportJSON}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        JSON
      </Button>
    </div>
  );
};
