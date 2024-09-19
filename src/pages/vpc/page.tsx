import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RootState } from '@/store';
import { AWS_REGION, credentials } from '@/vars';
import { DescribeVpcsCommand, EC2Client } from '@aws-sdk/client-ec2';
import { useQuery } from '@tanstack/react-query';

const VPCPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const selectedRegion = useSelector((state: RootState) => state.region.region); // Accessing the region from global state

  const { data: vpcs = [], isLoading } = useQuery({
    queryKey: ['vpcs', selectedRegion],
    queryFn: async () => {
      const client = new EC2Client({ region: selectedRegion === 'all' ? AWS_REGION : selectedRegion, credentials });
      const command = new DescribeVpcsCommand({});
      const response = await client.send(command);
      return response.Vpcs ?? []; // Return the VPCs
    },
  });

  const filteredVpcs = vpcs.filter(vpc => (filter === 'all' || vpc.State === filter) && vpc.VpcId?.includes(search));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>VPCs</h1>
      <div className='mb-4 flex space-x-4'>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className='border p-2'>
            <SelectValue placeholder='Select a filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='available'>Available</SelectItem>
            <SelectItem value='pending'>Pending</SelectItem>
          </SelectContent>
        </Select>
        <input
          type='text'
          placeholder='Search by VPC ID'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='input-bordered input'
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : filteredVpcs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredVpcs.map(vpc => (
            <motion.div
              key={vpc.VpcId}
              className='rounded-lg border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <h2 className='font-bold'>VPC ID: {vpc.VpcId}</h2>
              <p>CIDR Block: {vpc.CidrBlock}</p>
              <p>State: {vpc.State}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default VPCPage;
