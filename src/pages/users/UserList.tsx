import { useState } from 'react';
import { useUsers } from '@/hooks/useUser';
import { Pagination2 } from '@/components/common/Pagination2';
import { UserTable2 } from '@/components/features/users/UserTable2';

export const UserList = () => {
  const [page, setPage] = useState(1);

  const {
    users,
    totalPages,
    isFirst,
    isLast,
    isLoading,
    lockUser,
    unlockUser,
    deleteUser,
  } = useUsers({ page, size: 3 });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">User accounts</h1>
        <p className="text-gray-600 mt-1">
          Manage user accounts
        </p>
      </div>


      <UserTable2
        users={users}
        isLoading={isLoading}
        onLock={(id) => lockUser(id)}
        onUnlock={(id) => unlockUser(id)}
        onDelete={(id) => deleteUser(id)}
      />


      <Pagination2
        page={page}
        totalPages={totalPages}
        isFirst={isFirst}
        isLast={isLast}
        setPage={setPage}
      />
    </div>
  );
};
