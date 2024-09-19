import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AWS_REGION, credentials } from '@/vars';
import { DBInstance, DescribeDBInstancesCommand, RDSClient } from '@aws-sdk/client-rds';

const regions = [
  'eu-central-1',
  'us-east-1',
  'us-west-1',
  'us-west-2',
  'ap-south-1',
  'ap-northeast-1',
  'ap-northeast-2',
  'ap-southeast-1',
  'ap-southeast-2',
  'ca-central-1',
  'sa-east-1',
];

const RDSPage: React.FC = () => {
  const [instances, setInstances] = useState<DBInstance[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRDSInstances = async () => {
      setLoading(true);
      const client = new RDSClient({ region: selectedRegion === 'all' ? AWS_REGION : selectedRegion, credentials });
      const command = new DescribeDBInstancesCommand({});
      const response = await client.send(command);
      const fetchedInstances = response.DBInstances?.map(instance => ({
        DBInstanceIdentifier: instance.DBInstanceIdentifier!,
        DBInstanceClass: instance.DBInstanceClass!,
        Engine: instance.Engine!,
        DBInstanceStatus: instance.DBInstanceStatus!,
      }));
      setInstances(fetchedInstances || []);
      setLoading(false);
    };
    fetchRDSInstances();
  }, [selectedRegion]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>RDS Instances</h1>
      <div className='mb-4 flex space-x-4'>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger>
            <SelectValue placeholder='Select a region' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Regions</SelectItem>
            {regions.map(region => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {loading ? (
        <Loading />
      ) : instances.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {instances.map(instance => (
            <div
              key={instance.DBInstanceIdentifier}
              className='rounded border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
              <h2 className='font-bold'>{instance.DBInstanceIdentifier}</h2>
              <p>Class: {instance.DBInstanceClass}</p>
              <p>Engine: {instance.Engine}</p>
              <p>Status: {instance.DBInstanceStatus}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RDSPage;
