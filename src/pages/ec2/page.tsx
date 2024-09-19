import React, { useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Region, setRegion, useAppDispatch, useAppSelector } from '@/store';
import { AWS_REGION, credentials } from '@/vars';
import { DescribeInstancesCommand, EC2Client, Instance } from '@aws-sdk/client-ec2';
import { useQuery } from '@tanstack/react-query';

const EC2Page: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const selectedRegion = useAppSelector(state => state.region.region); // Accessing the region from global state
  const dispatch = useAppDispatch();

  const { data: instances = [], isLoading } = useQuery({
    queryKey: ['ec2Instances', selectedRegion],
    queryFn: async () => {
      const client = new EC2Client({ region: selectedRegion === 'all' ? AWS_REGION : selectedRegion, credentials });
      const command = new DescribeInstancesCommand({});
      const response = await client.send(command);
      return response.Reservations?.flatMap(res => res.Instances ?? []) as Instance[];
    },
  });

  const filteredInstances = instances.filter(
    instance => (filter === 'all' || instance.State?.Name === filter) && instance.InstanceId?.includes(search),
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>EC2 Instances</h1>
      <div className='mb-4 flex space-x-4'>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className='border p-2'>
            <SelectValue placeholder='Select a filter' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All</SelectItem>
            <SelectItem value='running'>Running</SelectItem>
            <SelectItem value='stopped'>Stopped</SelectItem>
          </SelectContent>
        </Select>
        <input
          type='text'
          placeholder='Search by Instance ID'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='input-bordered input'
        />
        <Select
          value={selectedRegion}
          onValueChange={(value: Region) => {
            dispatch(setRegion(value)); // Update region in global state
          }}>
          <SelectTrigger className='border p-2'>
            <SelectValue placeholder='Select a region' />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Region).map(region => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <Loading />
      ) : filteredInstances.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {filteredInstances.map(instance => (
            <motion.div
              key={instance.InstanceId}
              className='rounded-lg border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <h2 className='font-bold'>Instance ID: {instance.InstanceId}</h2>
              <p>Type: {instance.InstanceType}</p>
              <p>State: {instance.State?.Name}</p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EC2Page;
