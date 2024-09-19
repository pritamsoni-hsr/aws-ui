import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { AWS_REGION, credentials } from '@/vars';
import { IAMClient, ListRolesCommand, Role } from '@aws-sdk/client-iam';

const IAMRolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      const client = new IAMClient({ region: AWS_REGION, credentials });
      const command = new ListRolesCommand({});
      const response = await client.send(command);
      setRoles(response.Roles || []);
      setLoading(false);
    };
    fetchRoles();
  }, []);

  if (loading) return <Loading />;
  if (roles.length === 0) return <EmptyState />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>IAM Roles</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {roles.map(role => (
          <div
            key={role.RoleName}
            className='rounded border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
            <h2 className='font-bold'>{role.RoleName}</h2>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IAMRolesPage;
