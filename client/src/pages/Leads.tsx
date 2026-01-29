import { Layout } from "@/components/Layout";
import { useLeads, useUpdateLeadStatus, useProfile } from "@/hooks/use-ems";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

export default function Leads() {
  const { data: leads, isLoading } = useLeads();
  const { data: profile } = useProfile();
  const updateStatus = useUpdateLeadStatus();

  if (profile?.role !== "institute" && profile?.role !== "admin") {
    return <Layout><div>Access Denied</div></Layout>;
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case "applied": return "bg-blue-100 text-blue-700";
      case "contacted": return "bg-yellow-100 text-yellow-700";
      case "joined": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-display text-slate-900">Manage Leads</h1>
        <p className="text-slate-500 mt-1">Track student applications for your institute.</p>
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Student Name</TableHead>
              <TableHead>Applied At</TableHead>
              <TableHead>Current Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">Loading leads...</TableCell>
              </TableRow>
            ) : leads?.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  {lead.student?.firstName} {lead.student?.lastName}
                </TableCell>
                <TableCell>
                  {lead.appliedAt && format(new Date(lead.appliedAt), "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(lead.status || "")} variant="secondary">
                    {(lead.status || "applied").toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Select 
                    defaultValue={lead.status || "applied"} 
                    onValueChange={(val: any) => updateStatus.mutate({ id: lead.id, status: val })}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-xs">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applied">Applied</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="joined">Joined</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {leads?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No leads found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </Layout>
  );
}
