import React from 'react';

import { motion } from 'framer-motion';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='flex h-screen flex-col items-center justify-center text-center'>
      <h2 className='text-2xl font-bold'>No Data Available</h2>
      <p className='mt-2 text-gray-600'>It seems there are no resources to display.</p>
      <motion.button whileHover={{ scale: 1.1 }} className='mt-4 rounded bg-blue-500 px-4 py-2 text-white'>
        Refresh
      </motion.button>
    </motion.div>
  );
};

export default EmptyState;
