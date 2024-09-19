import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import EmptyState from '@/components/EmptyState';
import Loading from '@/components/Loading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AWS_REGION, credentials } from '@/vars';
import { DescribeSubnetsCommand, EC2Client, Subnet } from '@aws-sdk/client-ec2';

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

const SubnetPage: React.FC = () => {
  const [subnets, setSubnets] = useState<Subnet[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubnets = async () => {
      setLoading(true);
      const client = new EC2Client({ region: selectedRegion === 'all' ? AWS_REGION : selectedRegion, credentials });
      const command = new DescribeSubnetsCommand({});
      const response = await client.send(command);
      setSubnets(response.Subnets || []);
      setLoading(false);
    };
    fetchSubnets();
  }, [selectedRegion]);

  if (loading) return <Loading />;
  if (subnets.length === 0) return <EmptyState />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Subnets</h1>
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
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {subnets.map(subnet => (
          <div
            key={subnet.SubnetId}
            className='rounded border p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
            <h2 className='font-bold'>{subnet.SubnetId}</h2>
            <p>CIDR Block: {subnet.CidrBlock}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SubnetPage;
