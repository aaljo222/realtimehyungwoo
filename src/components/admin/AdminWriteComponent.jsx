import React from 'react';
import AdminFormComponent from './AdminFormComponent';

const AdminWriteComponent = (props) => {
  console.log(props);

  return (
    <AdminFormComponent
      {...props}
      title="Write 모드"
      showResetButton={true}
      readOnlyFirstField={false}
    />


  );
};

export default AdminWriteComponent;