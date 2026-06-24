"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { PageHeader } from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { Trash2, Shield, UserCog } from "lucide-react"
import { getAllUsers, updateUserRole, deleteUser } from "@/src/actions/auth"
import type { UserRole } from "@/src/types"

type User = {
  id: string
  email: string
  name: string | null
  role: UserRole
  created_at: string
}

const ROLE_BADGE: Record<UserRole, { label: string; variant: "default" | "secondary" | "outline" }> = {
  admin: { label: "Admin", variant: "default" },
  team: { label: "Team", variant: "secondary" },
  client: { label: "Client", variant: "outline" },
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res.success) setUsers(res.data as User[])
      setLoading(false)
    })
  }, [])

  async function changeRole(userId: string, newRole: UserRole) {
    const res = await updateUserRole(userId, newRole)
    if (res.success) {
      toast.success("Role Updated", { description: `User role changed to ${newRole}.` })
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
    } else {
      toast.error("Error", { description: res.error })
    }
  }

  async function handleDelete() {
    if (!deleteUserId) return
    const res = await deleteUser(deleteUserId)
    if (res.success) {
      toast.success("User Deleted", { description: "User has been removed." })
      setDeleteUserId(null)
      getAllUsers().then((res) => {
        if (res.success) setUsers(res.data as User[])
      })
    } else {
      toast.error("Error", { description: res.error })
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="View and manage all platform users. Change roles and permissions."
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5" />
            Users
          </CardTitle>
          <CardDescription>
            {users.length} user{users.length !== 1 ? "s" : ""} registered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
              No users found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => {
                    const badge = ROLE_BADGE[user.role]
                    return (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">
                          {user.name || "—"}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant={badge.variant} className="capitalize">
                            {badge.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Select
                              defaultValue={user.role}
                              onValueChange={(val: UserRole) => changeRole(user.id, val)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">
                                  <span className="flex items-center gap-2">
                                    <Shield className="h-3.5 w-3.5" />
                                    Admin
                                  </span>
                                </SelectItem>
                                <SelectItem value="team">
                                  <span className="flex items-center gap-2">
                                    <UserCog className="h-3.5 w-3.5" />
                                    Team
                                  </span>
                                </SelectItem>
                                <SelectItem value="client">Client</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => setDeleteUserId(user.id)}
                              aria-label="Delete user"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteUserId}
        onOpenChange={(open) => { if (!open) setDeleteUserId(null) }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteUserId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
