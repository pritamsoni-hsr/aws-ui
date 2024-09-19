import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { AWS_REGION, credentials } from '@/vars';
import { IAMClient, ListPoliciesCommand, Policy } from '@aws-sdk/client-iam';

const IAMPoliciesPage: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      const client = new IAMClient({ region: AWS_REGION, credentials });
      const command = new ListPoliciesCommand({});
      const response = await client.send(command);
      setPolicies(response.Policies || []);
      setLoading(false);
    };
    fetchPolicies();
  }, []);

  if (loading) return <Loading />;
  if (policies.length === 0) return <EmptyState />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>IAM Policies</h1>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {policies.map(policy => (
          <div
            key={policy.PolicyId}
            className='rounded border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
            <h2 className='font-bold'>{policy.PolicyName}</h2>
            <p>Policy ID: {policy.PolicyId}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IAMPoliciesPage;
