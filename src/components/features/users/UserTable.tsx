// src/components/features/users/UserTable.tsx
import { useState } from 'react';
import type { User } from '@/types/user.types';
import { formatDistanceToNow } from 'date-fns';
import {
  Lock,
  Unlock,
  Trash2,
  Eye,
  Shield,
  User as UserIcon,
} from 'lucide-react';

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onLock: (id: string, reason?: string) => void;
  onUnlock: (id: string) => void;
  onDelete: (id: string) => void;
  onViewDetail?: (id: string) => void;
}

export const UserTable = ({
  users,
  isLoading,
  onLock,
  onUnlock,
  onDelete,
  onViewDetail,
}: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showLockModal, setShowLockModal] = useState(false);
  const [lockReason, setLockReason] = useState('');

  console.log('Rendering UserTable with users:', users);

  const handleLockClick = (userId: string) => {
    setSelectedUser(userId);
    setShowLockModal(true);
  };

  const handleLockConfirm = () => {
    if (selectedUser) {
      onLock(selectedUser, lockReason);
      setShowLockModal(false);
      setLockReason('');
      setSelectedUser(null);
    }
  };

  const handleDeleteClick = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      onDelete(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          <span className="ml-3 text-gray-600">Loading users...</span>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center text-gray-500">
          <UserIcon size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">No users found</p>
          <p className="text-sm mt-1">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  {/* User Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="shrink-0 h-10 w-10">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role.roleName === 'ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.role.roleName === 'ADMIN' && <Shield size={12} />}
                      {user.role.roleName}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.active ? 'Active' : 'Locked'}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createdAt
                      ? formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                        })
                      : 'N/A'}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Details */}
                      {onViewDetail && (
                        <button
                          onClick={() => onViewDetail(user.id)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                      )}

                      {/* Lock/Unlock */}
                      {user.active ? (
                        <button
                          onClick={() => handleLockClick(user.id)}
                          className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50 transition-colors"
                          title="Lock user"
                        >
                          <Lock size={18} />
                        </button>
                      ) : (
                        <button
                          onClick={() => onUnlock(user.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="Unlock user"
                        >
                          <Unlock size={18} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDeleteClick(user.id, user.fullName)
                        }
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lock User Modal */}
      {showLockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lock User Account
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide a reason for locking this account:
            </p>
            <textarea
              value={lockReason}
              onChange={(e) => setLockReason(e.target.value)}
              placeholder="Enter reason (optional)"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowLockModal(false);
                  setLockReason('');
                  setSelectedUser(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLockConfirm}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Lock User
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};