import ViewAllServices from '@/components/shared/ViewAllServices';
import React from 'react'

function layout({children}) {
  return (
    <>
        {children}
        <ViewAllServices/>
    </>
  )
}

export default layout