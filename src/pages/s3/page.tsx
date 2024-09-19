import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { RootState } from '@/store';
import { AWS_REGION, credentials } from '@/vars';
import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import { useQuery } from '@tanstack/react-query';

const S3Page: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const selectedRegion = useSelector((state: RootState) => state.region.region);

  const { data: buckets = [], isLoading } = useQuery({
    queryKey: ['s3Buckets', selectedRegion],
    queryFn: async () => {
      const client = new S3Client({ region: selectedRegion === 'all' ? AWS_REGION : selectedRegion, credentials });
      const command = new ListBucketsCommand({});
      const response = await client.send(command);
      return response.Buckets ?? [];
    },
  });

  const filteredBuckets = buckets.filter(bucket => bucket.Name?.includes(search));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>S3 Buckets</h1>
      <input
        type='text'
        placeholder='Search by Bucket Name'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='input-bordered input mb-4'
      />
      {isLoading ? (
        <Loading />
      ) : filteredBuckets.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4'>
          {filteredBuckets.map(bucket => (
            <motion.div
              key={bucket.Name}
              className='rounded-lg border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <h2 className='font-bold'>Bucket Name: {bucket.Name}</h2>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default S3Page;
