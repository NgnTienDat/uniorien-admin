import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Lock, Unlock } from "lucide-react";
import type { User } from "@/types/user.types";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

interface UserTable2Props {
    users: User[];
    isLoading: boolean;
    onLock: (id: string, reason?: string) => void;
    onUnlock: (id: string) => void;
    onDelete: (id: string) => void;
}

export const UserTable2 = ({
    users,
    isLoading,
    onLock,
    onUnlock,
    onDelete,
}: UserTable2Props) => {
    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500">Loading users...</div>
        );
    }

    if (!users || users.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">No users found.</div>
        );
    }

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((u) => (
                        <TableRow key={u.id}>
                            <TableCell className="font-medium flex items-center gap-2">
                                {u.fullName}
                            </TableCell>
                            <TableCell>{u.email}</TableCell>


                            <TableCell>
                                <Badge
                                    className={`bg-blue-500 text-white 
                                        ${u.active ? "dark:bg-blue-600" : "bg-red-500"} dark:bg-blue-600`}
                                    variant={u.active ? "secondary" : "destructive"}>
                                    {u.active ? "Active" : "Inactive"}
                                </Badge>
                            </TableCell>


                            <TableCell>{u.createdAt
                                ? formatDistanceToNow(new Date(u.createdAt), {
                                    addSuffix: true,
                                })
                                : 'N/A'}
                            </TableCell>


                            <TableCell className="text-right flex items-center gap-3 justify-end">
                                {/* LOCK / UNLOCK */}
                                {u.active ? (
                                    <button onClick={() => onLock(u.id)}>
                                        <Lock className="w-5 h-5 cursor-pointer text-gray-600 hover:text-yellow-600" />
                                    </button>
                                ) : (
                                    <button onClick={() => onUnlock(u.id)}>
                                        <Unlock className="w-5 h-5 cursor-pointer text-gray-600 hover:text-green-600" />
                                    </button>
                                )}

                                {/* DELETE */}
                                <button onClick={() => onDelete(u.id)}>
                                    <Trash2 className="w-5 h-5 cursor-pointer text-gray-600 hover:text-red-600" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
