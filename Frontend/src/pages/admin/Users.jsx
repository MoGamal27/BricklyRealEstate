import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUser, getUsers, deleteUser } from "@/lib/mockStorage";
import { useToast } from "@/hooks/use-toast";
import { Home, Trash2 } from "lucide-react";

export default function Users() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
      return;
    }
    if (currentUser.role !== "ADMIN") {
      navigate("/");
      return;
    }
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const allUsers = await getUsers();
    setUsers(allUsers);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      toast({ variant: "destructive", title: "You cannot delete your own admin account" });
      return;
    }
    if (!window.confirm("Delete this user?")) return;
    const deleted = await deleteUser(id);
    if (!deleted) {
      toast({ variant: "destructive", title: "Could not delete user" });
      return;
    }
    toast({ title: "User deleted" });
    loadUsers();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold">Manage Users</h1>
              <p className="text-muted-foreground">View and remove Brickly accounts.</p>
            </div>
            <Button variant="outline" onClick={() => navigate("/ADMIN/dashboard")}>
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </div>
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <div className="py-8 text-center text-muted-foreground">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                        <TableCell>{user.full_name || user.fullName || user.name || "Unnamed user"}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={user.id === currentUser?.id}
                            onClick={() => handleDelete(user.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
