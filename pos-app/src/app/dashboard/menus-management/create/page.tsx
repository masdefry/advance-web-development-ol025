'use client';
import { useFormik } from 'formik';

export default function CreateNewMenuPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      price: 0,
      isAvailable: false,
      files: [] as File[],
    },
    onSubmit: ({ name, price, isAvailable, files }: any) => {
      console.log(name);
      console.log(price);
      console.log(isAvailable);
      console.log(files);
    },
  });

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>Create New Menu</h2>
      <form onSubmit={formik?.handleSubmit}>
        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Menu Name</legend>
          <input
            type='text'
            name='name'
            onChange={formik?.handleChange}
            className='input w-full'
            placeholder='Type here'
          />
          <p className='label'>Optional</p>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Price</legend>
          <input
            type='text'
            name='price'
            onChange={formik?.handleChange}
            className='input w-full'
            placeholder='Type here'
          />
          <p className='label'>Optional</p>
        </fieldset>

        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Menu Image(s)</legend>
          <input
            type='file'
            name='files'
            onChange={(e) => {
              if (e.currentTarget.files) {
                formik?.setFieldValue(
                  'files',
                  Array.from(e.currentTarget.files),
                );
              }
            }}
            className='file-input w-full'
            multiple
          />
          <label className='label'>Max size 2MB</label>
        </fieldset>

        <div className='form-control mb-3'>
          <label className='label cursor-pointer justify-start gap-3'>
            <input
              type='checkbox'
              name='isAvailable'
              onChange={formik?.handleChange}
              className='toggle toggle-primary'
            />
            <span className='label-text'>Is Available</span>
          </label>
        </div>

        <div className='form-control'>
          <button type='submit' className='btn btn-primary w-full'>
            Save Menu
          </button>
        </div>
      </form>
    </>
  );
}
