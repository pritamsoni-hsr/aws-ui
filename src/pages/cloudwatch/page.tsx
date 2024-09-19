import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { RootState } from '@/store';
import { AWS_REGION, credentials } from '@/vars';
import { CloudWatchClient, DescribeAlarmsCommand } from '@aws-sdk/client-cloudwatch';
import { useQuery } from '@tanstack/react-query';

const CloudWatchPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const selectedRegion = useSelector((state: RootState) => state.region.region);

  const { data: alarms = [], isLoading } = useQuery({
    queryKey: ['cloudWatchAlarms', selectedRegion],
    queryFn: async () => {
      const client = new CloudWatchClient({
        region: selectedRegion === 'all' ? AWS_REGION : selectedRegion,
        credentials,
      });
      const command = new DescribeAlarmsCommand({});
      const response = await client.send(command);
      return response.MetricAlarms ?? [];
    },
  });

  const filteredAlarms = alarms.filter(alarm => alarm.AlarmName?.includes(search));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>CloudWatch Alarms</h1>
      <input
        type='text'
        placeholder='Search by Alarm Name'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='input-bordered input mb-4'
      />
      {isLoading ? (
        <Loading />
      ) : filteredAlarms.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {filteredAlarms.map(alarm => (
            <motion.div
              key={alarm.AlarmName}
              className='rounded-lg border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <h2 className='font-bold'>Alarm Name: {alarm.AlarmName}</h2>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CloudWatchPage;
