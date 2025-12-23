import React from 'react';
import AdminFormComponent from './AdminFormComponent';

const AdminUpdateComponent = (props) => {
  return (
    <AdminFormComponent
      {...props}
      title="Update 모드"
      showResetButton={false}
      readOnlyFirstField={true}
    />
  );
};

export default AdminUpdateComponent;