'use client';
import useGetMenus from '@/features/dashboard/menus-management/hooks/useGetMenus';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePhoto,
} from 'react-icons/hi2';

export default function MenusManagementPage() {
  const { loading, products, meta } = useGetMenus();

  return (
    <>
      <div className='flex flex-wrap items-center gap-3'>
        {/* Search */}
        <div className='relative flex-1 min-w-[240px]'>
          <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search product name, SKU, or category...'
            className='w-full rounded-xl bg-gray-100 py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
          />
        </div>

        {/* Category Filter */}
        <div className='relative inline-block'>
          <select className='appearance-none rounded-xl bg-gray-100 px-4 py-2.5 pr-10 text-sm text-gray-700 hover:bg-gray-50 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'>
            <option>All Categories</option>
            <option>Coffee</option>
            <option>Non-Coffee</option>
            <option>Pastries</option>
            <option>Main Course</option>
            <option>Desserts</option>
            <option>Snacks</option>
          </select>
          <FiChevronDown
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={16}
          />
        </div>

        <Link
          href={`/dashboard/menus-management/create`}
          className='btn bg-blue-500 text-white rounded-xl'
        >
          Create New Menu
        </Link>
      </div>

      <div className='p-6'>
        <div className='rounded-2xl border border-gray-200 bg-white shadow-sm'>
          {/* Table */}
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-500'>
                <tr>
                  <th className='px-6 py-4 text-left'>Product</th>
                  <th className='px-6 py-4 text-left'>Category</th>
                  <th className='px-6 py-4 text-left'>Price</th>
                  <th className='px-6 py-4 text-left'>Status</th>
                  <th className='px-6 py-4 text-right'>Actions</th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-100'>
                {products?.map((product) => {
                  return (
                    <tr className='hover:bg-gray-50' key={product?.id}>
                      <td className='px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='relative w-20 h-20'>
                            <Image
                              src={product?.productImages[0]?.url}
                              alt={product?.name}
                              fill
                              className='object-cover rounded-xl'
                            />
                          </div>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {product?.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              SKU: {product?.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4'>
                        <span className='rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-700'>
                          -
                        </span>
                      </td>
                      <td className='px-6 py-4 font-medium'>
                        Rp.{product?.price?.toLocaleString('id-ID')}
                      </td>
                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full ${product?.isAvailable ? 'bg-green-100' : 'bg-red-100'} px-3 py-1 text-xs font-medium text-green-700`}
                        >
                          {product?.isAvailable ? 'Available' : 'Not Available'}
                        </span>
                      </td>
                      <td className='px-6 py-4'>
                        <div className='flex justify-end gap-4 text-gray-500'>
                          <button className='hover:text-blue-600'>
                            <HiOutlinePencil className='h-5 w-5' />
                          </button>
                          <button className='hover:text-red-600'>
                            <HiOutlineTrash className='h-5 w-5' />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className='flex items-center justify-between px-6 py-4 text-sm text-gray-500'>
            <span>Showing {meta?.total} products</span>

            <div className='flex items-center gap-2'>
              <button className='rounded-lg border px-2 py-1 hover:bg-gray-100'>
                <HiOutlineChevronLeft />
              </button>
              {Array.from({ length: meta?.totalPage }, (_, i) => i + 1).map(
                (page) => {
                  return (
                    <button className='rounded-lg bg-blue-600 px-3 py-1 text-white'>
                      {page}
                    </button>
                  );
                },
              )}

              <button className='rounded-lg border px-2 py-1 hover:bg-gray-100'>
                <HiOutlineChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
