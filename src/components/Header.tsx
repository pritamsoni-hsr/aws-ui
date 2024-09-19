import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <header className='bg-gray-800 p-4 text-white'>
      <nav className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>New pied piper</h1>
        <div className='relative'>
          <button onClick={toggleDropdown} className='text-white focus:outline-none md:hidden'>
            Menu
          </button>
          <div
            className={`absolute right-0 mt-2 w-48 rounded-md bg-gray-700 shadow-lg ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <div className='flex flex-col'>
              <Link to='/ec2' className='block px-4 py-2 hover:bg-gray-600'>
                EC2 Instances
              </Link>
              <Link to='/vpc' className='block px-4 py-2 hover:bg-gray-600'>
                VPCs
              </Link>
              <Link to='/s3' className='block px-4 py-2 hover:bg-gray-600'>
                S3 Buckets
              </Link>
              <Link to='/rds' className='block px-4 py-2 hover:bg-gray-600'>
                RDS Instances
              </Link>
              <Link to='/cloudwatch' className='block px-4 py-2 hover:bg-gray-600'>
                CloudWatch
              </Link>
              <Link to='/iam' className='block px-4 py-2 hover:bg-gray-600'>
                IAM
              </Link>
              <Link to='/subnet' className='block px-4 py-2 hover:bg-gray-600'>
                Subnets
              </Link>
              <Link to='/security-group' className='block px-4 py-2 hover:bg-gray-600'>
                Security Groups
              </Link>
              <Link to='/iam/policies' className='block px-4 py-2 hover:bg-gray-600'>
                IAM Policies
              </Link>
              <Link to='/iam/groups' className='block px-4 py-2 hover:bg-gray-600'>
                IAM Groups
              </Link>
              <Link to='/iam/roles' className='block px-4 py-2 hover:bg-gray-600'>
                IAM Roles
              </Link>
            </div>
          </div>
        </div>
        <div className='hidden space-x-4 md:flex'>
          <Link to='/ec2' className='hover:underline'>
            EC2 Instances
          </Link>
          <Link to='/vpc' className='hover:underline'>
            VPCs
          </Link>
          <Link to='/s3' className='hover:underline'>
            S3 Buckets
          </Link>
          <Link to='/rds' className='hover:underline'>
            RDS Instances
          </Link>
          <Link to='/cloudwatch' className='hover:underline'>
            CloudWatch
          </Link>
          <Link to='/iam' className='hover:underline'>
            IAM
          </Link>
          <Link to='/subnet' className='hover:underline'>
            Subnets
          </Link>
          <Link to='/security-group' className='hover:underline'>
            Security Groups
          </Link>
          <Link to='/iam/policies' className='hover:underline'>
            IAM Policies
          </Link>
          <Link to='/iam/groups' className='hover:underline'>
            IAM Groups
          </Link>
          <Link to='/iam/roles' className='hover:underline'>
            IAM Roles
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
