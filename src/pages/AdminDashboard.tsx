import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2, LogOut, RefreshCw, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type OrderStatus = "pending" | "validated" | "cancelled";

interface Order {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  product: string | null;
  message: string | null;
  status: OrderStatus;
}

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/admin");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      if (roleError || !roleData) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits d'administrateur",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        navigate("/admin");
        return;
      }

      setIsCheckingAuth(false);
      fetchOrders();
    };

    checkAuthAndFetch();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        navigate("/admin");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const fetchOrders = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("customer_orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les commandes",
        variant: "destructive",
      });
    } else {
      setOrders((data as Order[]) || []);
    }
    setIsLoading(false);
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    const { error } = await supabase
      .from("customer_orders")
      .update({ status })
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    } else {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      toast({
        title: status === "validated" ? "Commande validée" : "Commande annulée",
        description: `La commande a été ${status === "validated" ? "validée" : "annulée"} avec succès`,
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    const { error } = await supabase
      .from("customer_orders")
      .delete()
      .eq("id", orderId);

    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la commande",
        variant: "destructive",
      });
    } else {
      setOrders(orders.filter((order) => order.id !== orderId));
      toast({
        title: "Commande supprimée",
        description: "La commande a été supprimée avec succès",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "validated":
        return <Badge className="bg-green-500 hover:bg-green-600">Validée</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge variant="secondary">En attente</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cacao" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-cacao">
                Tableau de bord
              </h1>
              <p className="text-muted-foreground mt-1">
                Gérez les commandes des clients
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={fetchOrders} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto text-cacao" />
                <p className="mt-4 text-muted-foreground">Chargement des commandes...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-muted-foreground">Aucune commande pour le moment</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(order.created_at)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {order.first_name} {order.last_name}
                        </TableCell>
                        <TableCell>{order.email}</TableCell>
                        <TableCell>{order.phone || "-"}</TableCell>
                        <TableCell>{order.product || "-"}</TableCell>
                        <TableCell className="max-w-xs truncate">
                          {order.message || "-"}
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => updateOrderStatus(order.id, "validated")}
                              disabled={order.status === "validated"}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              onClick={() => updateOrderStatus(order.id, "cancelled")}
                              disabled={order.status === "cancelled"}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Supprimer la commande ?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Cette action est irréversible. La commande sera définitivement
                                    supprimée de la base de données.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteOrder(order.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
