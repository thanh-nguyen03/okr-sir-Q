import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/Auth/AuthContext';
import Swal from 'sweetalert2';

import { getAllObjectives } from '../../api/http';
import Header from './Header';
import OKR from './OKR';

const AllObjectives = () => {
  const [data, setData] = useState([]);
  const [, setIsAuth] = useContext(AuthContext);
  useEffect(() => {
    getAllObjectives().then((response) => {
      if (response.status === 200) {
        setData(response.data.objectives);
      } else if (response.status === 401) {
        setIsAuth(false);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }, []);

  return (
    <>
      <Header />
      {data.map((OkrData, index) => (
        <OKR OkrData={OkrData} key={index} />
      ))}
    </>
  );
};

export default AllObjectives;
