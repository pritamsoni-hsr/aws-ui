import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { AWS_REGION, credentials } from '@/vars';
import { Group, IAMClient, ListGroupsCommand } from '@aws-sdk/client-iam';

const IAMGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const client = new IAMClient({ region: AWS_REGION, credentials });
      const command = new ListGroupsCommand({});
      const response = await client.send(command);
      setGroups(response.Groups || []);
      setLoading(false);
    };
    fetchGroups();
  }, []);

  if (loading) return <Loading />;
  if (groups.length === 0) return <EmptyState />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>IAM Groups</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {groups.map(group => (
          <div
            key={group.GroupName}
            className='rounded border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
            <h2 className='font-bold'>{group.GroupName}</h2>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IAMGroupsPage;
